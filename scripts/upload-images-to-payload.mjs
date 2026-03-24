#!/usr/bin/env node

/**
 * Upload featured images and link them to existing blog posts in Payload CMS
 */

import { readFile, readdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = path.join(__dirname, "..", "content", "blog-import", "posts");
const IMAGES_DIR = path.join(__dirname, "..", "content", "blog-import", "images");

const args = process.argv.slice(2);
function getArg(name, defaultValue) {
  const idx = args.indexOf(`--${name}`);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : defaultValue;
}

const SERVER = getArg("server", "http://localhost:3001");
const EMAIL = getArg("email", "admin@connectionexperience.com.br");
const PASSWORD = getArg("password", "connection2026");

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  console.log("=== Upload Featured Images ===\n");

  // Login
  const loginRes = await fetch(`${SERVER}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  });
  const { token } = await loginRes.json();
  const headers = { Authorization: `JWT ${token}` };

  // Get all posts from Payload
  let allPosts = [];
  let page = 1;
  while (true) {
    const res = await fetch(`${SERVER}/api/blog-posts?limit=50&page=${page}`, { headers });
    const data = await res.json();
    allPosts.push(...data.docs);
    if (!data.hasNextPage) break;
    page++;
  }
  console.log(`Found ${allPosts.length} posts in Payload\n`);

  const postsNeedingImage = allPosts.filter((p) => !p.featuredImage);
  console.log(`Posts without featured image: ${postsNeedingImage.length}\n`);

  let uploaded = 0;
  let linked = 0;
  let failed = 0;

  for (const post of postsNeedingImage) {
    // Find the local post data
    const localFile = path.join(POSTS_DIR, `${post.slug}.json`);
    if (!existsSync(localFile)) {
      failed++;
      continue;
    }

    const localPost = JSON.parse(await readFile(localFile, "utf-8"));
    if (!localPost.featuredImageLocal) {
      failed++;
      continue;
    }

    // Try both URL-encoded and decoded filenames
    let imgPath = path.join(IMAGES_DIR, path.basename(localPost.featuredImageLocal));
    if (!existsSync(imgPath)) {
      imgPath = path.join(IMAGES_DIR, decodeURIComponent(path.basename(localPost.featuredImageLocal)));
    }
    if (!existsSync(imgPath)) {
      // Try to find by partial match (first part of filename before %)
      const prefix = path.basename(localPost.featuredImageLocal).split("%")[0];
      const allFiles = await readdir(IMAGES_DIR);
      const match = allFiles.find((f) => f.startsWith(prefix));
      if (match) {
        imgPath = path.join(IMAGES_DIR, match);
      } else {
        failed++;
        continue;
      }
    }

    // Upload image
    const fileBuffer = await readFile(imgPath);
    const fileName = path.basename(imgPath);
    const ext = path.extname(fileName).toLowerCase();
    const mimeTypes = {
      ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png",
      ".gif": "image/gif", ".svg": "image/svg+xml", ".webp": "image/webp",
    };

    const altText = localPost.title || fileName.replace(/[-_%]/g, " ").replace(/\.[^.]+$/, "") || "Blog image";
    const formData = new FormData();
    formData.append("file", new Blob([fileBuffer], { type: mimeTypes[ext] || "image/jpeg" }), fileName);
    formData.append("_payload", JSON.stringify({ alt: altText }));

    const uploadRes = await fetch(`${SERVER}/api/media`, {
      method: "POST",
      headers,
      body: formData,
    });

    if (!uploadRes.ok) {
      console.error(`  ✗ Upload failed for ${fileName}`);
      failed++;
      continue;
    }

    const mediaDoc = await uploadRes.json();
    const mediaId = mediaDoc.doc?.id;
    uploaded++;

    // Link to post
    if (mediaId) {
      const patchRes = await fetch(`${SERVER}/api/blog-posts/${post.id}`, {
        method: "PATCH",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({ featuredImage: mediaId }),
      });

      if (patchRes.ok) {
        linked++;
      }
    }

    process.stdout.write(`\r  Uploaded: ${uploaded} | Linked: ${linked} | Failed: ${failed}`);
    await sleep(300);
  }

  console.log(`\n\n=== Done ===`);
  console.log(`Images uploaded: ${uploaded}`);
  console.log(`Posts linked: ${linked}`);
  console.log(`Failed: ${failed}`);
}

main().catch(console.error);
