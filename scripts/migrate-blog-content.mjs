#!/usr/bin/env node

/**
 * Migrate blog posts: convert legacyHtml to Lexical richText content field
 * Usage: node scripts/migrate-blog-content.mjs [--server URL] [--email EMAIL] [--password PASSWORD] [--dry-run]
 */

const args = process.argv.slice(2);
function getArg(name, defaultValue) {
  const idx = args.indexOf(`--${name}`);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : defaultValue;
}

const SERVER = getArg("server", "http://localhost:3000");
const EMAIL = getArg("email", "admin@connection.com");
const PASSWORD = getArg("password", "admin");
const DRY_RUN = args.includes("--dry-run");

let TOKEN = null;

async function login() {
  console.log(`Logging in to ${SERVER}...`);
  const res = await fetch(`${SERVER}/api/users/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  });
  if (res.ok) {
    const data = await res.json();
    TOKEN = data.token;
    console.log("Logged in successfully.");
  } else {
    console.error("Login failed:", res.status, await res.text());
    process.exit(1);
  }
}

/**
 * Parse HTML string into Lexical node tree
 */
function htmlToLexical(html) {
  if (!html || !html.trim()) return null;

  const nodes = [];
  // Remove leading/trailing whitespace
  html = html.trim();

  // Split HTML into blocks by matching tags
  // We'll parse iteratively
  let pos = 0;

  while (pos < html.length) {
    // Skip whitespace between blocks
    const wsMatch = html.slice(pos).match(/^[\s\n\r]+/);
    if (wsMatch) {
      pos += wsMatch[0].length;
      if (pos >= html.length) break;
    }

    // Check for block-level tags
    const tagMatch = html.slice(pos).match(/^<(h[1-6]|p|div|blockquote|ul|ol|figure|br|hr|img)(\s[^>]*)?\/?>/i);

    if (tagMatch) {
      const tagName = tagMatch[1].toLowerCase();

      if (tagName === 'br' || tagName === 'hr') {
        // Self-closing - add empty paragraph
        nodes.push(makeParagraph([makeText("")]));
        pos += tagMatch[0].length;
        continue;
      }

      if (tagName === 'img') {
        // Skip images for now, or extract as text
        const imgEnd = html.indexOf('>', pos);
        pos = imgEnd + 1;
        continue;
      }

      if (tagName === 'figure') {
        // Skip figure blocks (usually images with captions)
        const closeTag = '</figure>';
        const closeIdx = html.indexOf(closeTag, pos);
        if (closeIdx !== -1) {
          // Try to extract figcaption text
          const figContent = html.slice(pos, closeIdx + closeTag.length);
          const captionMatch = figContent.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/i);
          if (captionMatch) {
            const captionText = stripHtml(captionMatch[1]).trim();
            if (captionText) {
              nodes.push(makeParagraph([makeText(captionText, 2)])); // italic
            }
          }
          pos = closeIdx + closeTag.length;
        } else {
          pos += tagMatch[0].length;
        }
        continue;
      }

      // Find closing tag
      const closeTag = `</${tagName}>`;
      const closeIdx = findClosingTag(html, tagName, pos + tagMatch[0].length);

      if (closeIdx === -1) {
        // No closing tag found, skip this tag
        pos += tagMatch[0].length;
        continue;
      }

      const innerHtml = html.slice(pos + tagMatch[0].length, closeIdx).trim();

      if (tagName.match(/^h[1-6]$/)) {
        const inlineNodes = parseInlineHtml(innerHtml);
        nodes.push(makeHeading(tagName, inlineNodes));
      } else if (tagName === 'ul' || tagName === 'ol') {
        const listItems = parseListItems(innerHtml);
        nodes.push(makeList(tagName, listItems));
      } else if (tagName === 'blockquote') {
        const inlineNodes = parseInlineHtml(stripBlockTags(innerHtml));
        nodes.push(makeQuote(inlineNodes));
      } else {
        // p, div
        if (innerHtml) {
          const inlineNodes = parseInlineHtml(innerHtml);
          nodes.push(makeParagraph(inlineNodes));
        }
      }

      pos = closeIdx + closeTag.length;
    } else {
      // Text content without wrapping tag - collect until next block tag
      const nextTag = html.slice(pos).match(/<(h[1-6]|p|div|blockquote|ul|ol|figure|br|hr)\b/i);
      let textEnd;
      if (nextTag) {
        textEnd = pos + nextTag.index;
      } else {
        textEnd = html.length;
      }

      const text = html.slice(pos, textEnd).trim();
      if (text) {
        // Split by <br> or newlines into paragraphs
        const lines = text.split(/\s*<br\s*\/?>\s*|\n\n/);
        for (const line of lines) {
          const cleaned = stripHtml(line).trim();
          if (cleaned) {
            nodes.push(makeParagraph([makeText(cleaned)]));
          }
        }
      }
      pos = textEnd;
    }
  }

  // If no nodes were created but we have text, create paragraphs from plain text
  if (nodes.length === 0 && html.trim()) {
    const plainText = stripHtml(html).trim();
    if (plainText) {
      const paragraphs = plainText.split(/\n\s*\n/);
      for (const p of paragraphs) {
        const trimmed = p.trim();
        if (trimmed) {
          nodes.push(makeParagraph([makeText(trimmed)]));
        }
      }
    }
  }

  if (nodes.length === 0) return null;

  return {
    root: {
      type: "root",
      children: nodes,
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
    },
  };
}

function findClosingTag(html, tagName, startPos) {
  let depth = 1;
  let pos = startPos;
  const openPattern = new RegExp(`<${tagName}(\\s|>)`, 'gi');
  const closePattern = new RegExp(`</${tagName}>`, 'gi');

  while (pos < html.length) {
    openPattern.lastIndex = pos;
    closePattern.lastIndex = pos;

    const openMatch = openPattern.exec(html);
    const closeMatch = closePattern.exec(html);

    if (!closeMatch) return -1;

    if (openMatch && openMatch.index < closeMatch.index) {
      depth++;
      pos = openMatch.index + openMatch[0].length;
    } else {
      depth--;
      if (depth === 0) return closeMatch.index;
      pos = closeMatch.index + closeMatch[0].length;
    }
  }
  return -1;
}

function stripHtml(html) {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}

function stripBlockTags(html) {
  return html.replace(/<\/?(p|div|br)\s*\/?>/gi, ' ').trim();
}

function parseInlineHtml(html) {
  if (!html || !html.trim()) return [makeText("")];

  const nodes = [];
  let pos = 0;

  while (pos < html.length) {
    // Look for inline tags: strong, b, em, i, u, a, span, br
    const inlineMatch = html.slice(pos).match(/^<(strong|b|em|i|u|a|span|br|sup|sub)(\s[^>]*)?\/?>/i);

    if (inlineMatch) {
      const tag = inlineMatch[1].toLowerCase();

      if (tag === 'br') {
        nodes.push(makeLineBreak());
        pos += inlineMatch[0].length;
        continue;
      }

      const closeTag = `</${tag}>`;
      const closeIdx = html.indexOf(closeTag, pos + inlineMatch[0].length);

      if (closeIdx === -1) {
        pos += inlineMatch[0].length;
        continue;
      }

      const innerText = stripHtml(html.slice(pos + inlineMatch[0].length, closeIdx)).trim();

      if (innerText) {
        let format = 0;
        if (tag === 'strong' || tag === 'b') format = 1;
        if (tag === 'em' || tag === 'i') format = 2;
        if (tag === 'u') format = 8;

        nodes.push(makeText(innerText, format));
      }

      pos = closeIdx + closeTag.length;
    } else if (html[pos] === '<') {
      // Unknown/other tag - skip it
      const tagEnd = html.indexOf('>', pos);
      if (tagEnd !== -1) {
        pos = tagEnd + 1;
      } else {
        pos++;
      }
    } else {
      // Plain text - collect until next tag
      const nextTag = html.indexOf('<', pos);
      const textEnd = nextTag !== -1 ? nextTag : html.length;
      const text = html.slice(pos, textEnd)
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");

      if (text) {
        nodes.push(makeText(text));
      }
      pos = textEnd;
    }
  }

  return nodes.length > 0 ? nodes : [makeText("")];
}

function parseListItems(html) {
  const items = [];
  const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
  let match;
  while ((match = liRegex.exec(html)) !== null) {
    const innerHtml = match[1].trim();
    const inlineNodes = parseInlineHtml(stripBlockTags(innerHtml));
    items.push(makeListItem(inlineNodes));
  }
  return items;
}

// Lexical node constructors
function makeText(text, format = 0) {
  return {
    type: "text",
    text: text,
    format: format,
    detail: 0,
    mode: "normal",
    style: "",
    version: 1,
  };
}

function makeLineBreak() {
  return {
    type: "linebreak",
    version: 1,
  };
}

function makeParagraph(children) {
  return {
    type: "paragraph",
    children: children,
    direction: "ltr",
    format: "",
    indent: 0,
    textFormat: 0,
    version: 1,
  };
}

function makeHeading(tag, children) {
  return {
    type: "heading",
    tag: tag,
    children: children,
    direction: "ltr",
    format: "",
    indent: 0,
    version: 1,
  };
}

function makeList(tag, items) {
  return {
    type: "list",
    tag: tag,
    listType: tag === 'ol' ? 'number' : 'bullet',
    children: items,
    direction: "ltr",
    format: "",
    indent: 0,
    start: 1,
    version: 1,
  };
}

function makeListItem(children) {
  return {
    type: "listitem",
    children: children,
    direction: "ltr",
    format: "",
    indent: 0,
    value: 1,
    version: 1,
  };
}

function makeQuote(children) {
  return {
    type: "quote",
    children: children,
    direction: "ltr",
    format: "",
    indent: 0,
    version: 1,
  };
}

async function fetchAllPosts() {
  let allPosts = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const res = await fetch(`${SERVER}/api/blog-posts/?limit=100&page=${page}&depth=0`, {
      headers: { Authorization: `JWT ${TOKEN}` },
    });
    const data = await res.json();
    allPosts = allPosts.concat(data.docs);
    hasMore = data.hasNextPage;
    page++;
  }

  return allPosts;
}

async function updatePost(id, content) {
  const res = await fetch(`${SERVER}/api/blog-posts/${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${TOKEN}`,
    },
    body: JSON.stringify({ content }),
  });
  return res.ok;
}

async function main() {
  await login();

  console.log("\nFetching all blog posts...");
  const posts = await fetchAllPosts();
  console.log(`Found ${posts.length} posts total.`);

  let migrated = 0;
  let skipped = 0;
  let failed = 0;
  let noHtml = 0;

  for (const post of posts) {
    // Skip posts that already have richText content
    if (post.content?.root?.children?.length > 0) {
      skipped++;
      continue;
    }

    if (!post.legacyHtml || !post.legacyHtml.trim()) {
      noHtml++;
      continue;
    }

    const lexical = htmlToLexical(post.legacyHtml);
    if (!lexical) {
      console.log(`  [SKIP] "${post.title}" - could not parse HTML`);
      failed++;
      continue;
    }

    if (DRY_RUN) {
      console.log(`  [DRY-RUN] "${post.title}" - ${lexical.root.children.length} nodes`);
      migrated++;
      continue;
    }

    const ok = await updatePost(post.id, lexical);
    if (ok) {
      console.log(`  [OK] "${post.title}"`);
      migrated++;
    } else {
      console.log(`  [FAIL] "${post.title}"`);
      failed++;
    }
  }

  console.log(`\nDone! Migrated: ${migrated}, Skipped (already has content): ${skipped}, No HTML: ${noHtml}, Failed: ${failed}`);
}

main().catch(console.error);
