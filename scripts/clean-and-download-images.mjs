#!/usr/bin/env node

/**
 * Clean blog post data and download content images
 * - Removes ", Connection Experience Blog" from titles
 * - Filters out site-wide images (appearing in 50%+ of posts)
 * - Tries to extract featured image from og:image by re-fetching
 * - Downloads all content images locally
 */

import { writeFile, readFile, readdir, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = path.join(__dirname, "..", "content", "blog-import", "posts");
const IMAGES_DIR = path.join(__dirname, "..", "content", "blog-import", "images");
const OUTPUT_DIR = path.join(__dirname, "..", "content", "blog-import");
const BASE_URL = "https://www.connectionexperience.com.br";

const CONCURRENCY = 5;
const DELAY_MS = 300;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log("=== Clean & Download Blog Images ===\n");

  await mkdir(IMAGES_DIR, { recursive: true });

  // Step 1: Identify site-wide images
  const files = await readdir(POSTS_DIR);
  const jsonFiles = files.filter((f) => f.endsWith(".json"));
  const totalPosts = jsonFiles.length;

  console.log(`Total posts: ${totalPosts}`);

  // Count image occurrences
  const urlCounts = {};
  for (const f of jsonFiles) {
    const post = JSON.parse(await readFile(path.join(POSTS_DIR, f), "utf-8"));
    for (const img of post.images) {
      urlCounts[img.url] = (urlCounts[img.url] || 0) + 1;
    }
  }

  // Images appearing in >50% of posts are site-wide
  const siteWideThreshold = Math.floor(totalPosts * 0.5);
  const siteWideUrls = new Set(
    Object.entries(urlCounts)
      .filter(([_, count]) => count > siteWideThreshold)
      .map(([url]) => url)
  );

  console.log(`Site-wide images (excluded): ${siteWideUrls.size}`);

  // Step 2: Clean posts and collect content images
  const allContentImages = new Map(); // url -> { slug, alt }
  let cleanedCount = 0;

  for (const f of jsonFiles) {
    const filePath = path.join(POSTS_DIR, f);
    const post = JSON.parse(await readFile(filePath, "utf-8"));

    // Clean title
    post.title = post.title
      .replace(/,?\s*Connection Experience Blog\s*$/i, "")
      .trim();

    // Filter out site-wide images
    post.images = post.images.filter((img) => !siteWideUrls.has(img.url));

    // Set featured image as the first content image if not set
    if (!post.featuredImage && post.images.length > 0) {
      // Prefer non-SVG images for featured
      const featured = post.images.find(
        (img) => !img.url.endsWith(".svg")
      ) || post.images[0];
      post.featuredImage = featured.url;
    }

    // Track content images for download
    for (const img of post.images) {
      if (!allContentImages.has(img.url)) {
        allContentImages.set(img.url, {
          slug: post.slug,
          alt: img.alt,
        });
      }
    }

    // Save cleaned post
    await writeFile(filePath, JSON.stringify(post, null, 2));
    cleanedCount++;
  }

  console.log(`Cleaned ${cleanedCount} posts`);
  console.log(`Content images to download: ${allContentImages.size}\n`);

  // Step 3: Re-fetch posts to get og:image for featured images
  console.log("Fetching og:image for featured images...\n");

  let featuredFound = 0;
  const slugsToFetch = [];

  for (const f of jsonFiles) {
    const post = JSON.parse(await readFile(path.join(POSTS_DIR, f), "utf-8"));
    slugsToFetch.push({ file: f, slug: post.slug });
  }

  // Fetch in batches
  for (let i = 0; i < slugsToFetch.length; i += CONCURRENCY) {
    const batch = slugsToFetch.slice(i, i + CONCURRENCY);
    const promises = batch.map(async ({ file, slug }) => {
      try {
        const url = `${BASE_URL}/blog/${slug}`;
        const res = await fetch(url, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
          },
          signal: AbortSignal.timeout(15000),
        });
        const html = await res.text();

        // Extract og:image
        const ogMatch = html.match(
          /<meta\s+(?:property|name)="og:image"\s+content="([^"]+)"/i
        ) || html.match(
          /<meta\s+content="([^"]+)"\s+(?:property|name)="og:image"/i
        );

        if (ogMatch && ogMatch[1]) {
          const filePath = path.join(POSTS_DIR, file);
          const post = JSON.parse(await readFile(filePath, "utf-8"));
          post.featuredImage = ogMatch[1];

          // Add to download list if not already there
          if (!allContentImages.has(ogMatch[1]) && !siteWideUrls.has(ogMatch[1])) {
            allContentImages.set(ogMatch[1], { slug, alt: "featured" });
          }

          await writeFile(filePath, JSON.stringify(post, null, 2));
          featuredFound++;
        }
      } catch {
        // skip errors
      }
    });

    await Promise.all(promises);
    process.stdout.write(`\r  Progress: ${Math.min(i + CONCURRENCY, slugsToFetch.length)}/${slugsToFetch.length}`);
    await sleep(DELAY_MS);
  }

  console.log(`\n  Found ${featuredFound} og:image featured images\n`);

  // Step 4: Download content images
  console.log("Downloading content images...\n");

  const imageEntries = Array.from(allContentImages.entries());
  let downloaded = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 0; i < imageEntries.length; i += CONCURRENCY) {
    const batch = imageEntries.slice(i, i + CONCURRENCY);
    const promises = batch.map(async ([rawUrl, meta]) => {
      // Clean HTML entities from URL
      const url = rawUrl.replace(/&quot;/g, "").replace(/&amp;/g, "&").replace(/&#x2F;/g, "/").trim();

      // Skip invalid URLs
      if (!url.startsWith("http")) {
        failed++;
        return { url, localPath: null, status: "failed", error: "invalid URL" };
      }

      // Generate filename from URL
      const urlPath = new URL(url).pathname;
      const originalName = urlPath.split("/").pop();
      const ext = path.extname(originalName) || ".jpg";
      const baseName = originalName.replace(ext, "").substring(0, 60);
      const fileName = `${baseName}${ext}`;
      const filePath = path.join(IMAGES_DIR, fileName);

      // Skip if already downloaded
      if (existsSync(filePath)) {
        skipped++;
        return { url, localPath: `images/${fileName}`, status: "skipped" };
      }

      try {
        const res = await fetch(url, {
          signal: AbortSignal.timeout(30000),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const buffer = Buffer.from(await res.arrayBuffer());
        await writeFile(filePath, buffer);
        downloaded++;
        return { url, localPath: `images/${fileName}`, status: "ok" };
      } catch (err) {
        failed++;
        return { url, localPath: null, status: "failed", error: err.message };
      }
    });

    const results = await Promise.all(promises);

    // Update posts with local image paths
    for (const result of results) {
      if (result.localPath) {
        // Store mapping for later use
        allContentImages.set(result.url, {
          ...allContentImages.get(result.url),
          localPath: result.localPath,
        });
      }
    }

    process.stdout.write(
      `\r  Downloaded: ${downloaded} | Skipped: ${skipped} | Failed: ${failed} / ${imageEntries.length}`
    );
    await sleep(DELAY_MS);
  }

  console.log("\n");

  // Step 5: Update posts with local image paths
  console.log("Updating posts with local image paths...");

  for (const f of jsonFiles) {
    const filePath = path.join(POSTS_DIR, f);
    const post = JSON.parse(await readFile(filePath, "utf-8"));

    // Update image references
    post.images = post.images.map((img) => ({
      ...img,
      localPath: allContentImages.get(img.url)?.localPath || null,
    }));

    // Update featured image local path
    if (post.featuredImage) {
      post.featuredImageLocal =
        allContentImages.get(post.featuredImage)?.localPath || null;
    }

    await writeFile(filePath, JSON.stringify(post, null, 2));
  }

  // Step 6: Update index
  const index = [];
  for (const f of jsonFiles) {
    const post = JSON.parse(await readFile(path.join(POSTS_DIR, f), "utf-8"));
    index.push({
      slug: post.slug,
      title: post.title,
      date: post.date,
      author: post.author,
      featuredImage: post.featuredImage,
      featuredImageLocal: post.featuredImageLocal,
      url: post.url,
      hasContent: !!post.bodyHtml,
      imageCount: post.images.length,
    });
  }

  await writeFile(
    path.join(OUTPUT_DIR, "index.json"),
    JSON.stringify(index, null, 2)
  );

  // Step 7: Save image mapping
  const imageMapping = {};
  for (const [url, meta] of allContentImages) {
    if (meta.localPath) {
      imageMapping[url] = meta.localPath;
    }
  }
  await writeFile(
    path.join(OUTPUT_DIR, "image-mapping.json"),
    JSON.stringify(imageMapping, null, 2)
  );

  console.log("\n=== Done ===");
  console.log(`Posts cleaned: ${cleanedCount}`);
  console.log(`Images downloaded: ${downloaded}`);
  console.log(`Images skipped (already exists): ${skipped}`);
  console.log(`Images failed: ${failed}`);
  console.log(`Featured images found: ${featuredFound}`);
}

main().catch(console.error);
