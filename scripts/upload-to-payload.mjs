#!/usr/bin/env node

/**
 * Upload imported blog posts to Payload CMS
 * Reads from /content/blog-import/posts/ and uploads to Payload REST API
 *
 * Usage:
 *   node scripts/upload-to-payload.mjs [--server URL] [--email EMAIL] [--password PASSWORD]
 *
 * Defaults to http://localhost:3000 for local development
 */

import { readFile, readdir } from "fs/promises";
import { createReadStream, existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = path.join(__dirname, "..", "content", "blog-import", "posts");
const IMAGES_DIR = path.join(__dirname, "..", "content", "blog-import", "images");

// Parse CLI args
const args = process.argv.slice(2);
function getArg(name, defaultValue) {
  const idx = args.indexOf(`--${name}`);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : defaultValue;
}

const SERVER = getArg("server", "http://localhost:3000");
const EMAIL = getArg("email", "admin@connectionexperience.com.br");
const PASSWORD = getArg("password", "connection2026");

const CONCURRENCY = 3;
const DELAY_MS = 500;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Parse date from various formats to ISO string
 */
function parseDate(dateStr) {
  if (!dateStr) return null;

  // ISO format already
  if (dateStr.includes("T")) return dateStr;

  // dd/mm/yyyy format
  const dmyMatch = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (dmyMatch) {
    const [, day, month, year] = dmyMatch;
    return new Date(Number(year), Number(month) - 1, Number(day)).toISOString();
  }

  // Try native parsing
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? null : d.toISOString();
}

class PayloadUploader {
  constructor(serverUrl) {
    this.serverUrl = serverUrl;
    this.token = null;
    this.mediaCache = new Map(); // URL -> media ID
  }

  async login(email, password) {
    console.log(`Logging in to ${this.serverUrl}...`);
    const res = await fetch(`${this.serverUrl}/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Login failed (${res.status}): ${text}`);
    }

    const data = await res.json();
    this.token = data.token;
    console.log("Login successful!\n");
  }

  async createFirstUser(email, password) {
    console.log("Creating first admin user...");
    const res = await fetch(`${this.serverUrl}/api/users/first-register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        name: "Admin",
      }),
    });

    if (!res.ok) {
      // Maybe user already exists, try login
      console.log("First user may already exist, trying login...");
      return this.login(email, password);
    }

    const data = await res.json();
    this.token = data.token;
    console.log("First user created and logged in!\n");
  }

  get headers() {
    return {
      Authorization: `JWT ${this.token}`,
    };
  }

  async uploadMedia(imagePath, altText) {
    // Check cache
    if (this.mediaCache.has(imagePath)) {
      return this.mediaCache.get(imagePath);
    }

    const fullPath = path.join(IMAGES_DIR, path.basename(imagePath));
    if (!existsSync(fullPath)) {
      return null;
    }

    const fileBuffer = await readFile(fullPath);
    const fileName = path.basename(fullPath);
    const ext = path.extname(fileName).toLowerCase();
    const mimeTypes = {
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".gif": "image/gif",
      ".svg": "image/svg+xml",
      ".webp": "image/webp",
    };
    const mimeType = mimeTypes[ext] || "image/jpeg";

    const formData = new FormData();
    formData.append("file", new Blob([fileBuffer], { type: mimeType }), fileName);
    formData.append("alt", altText || fileName.replace(/[-_%]/g, " ").replace(/\.[^.]+$/, "") || "Imagem do blog");

    const res = await fetch(`${this.serverUrl}/api/media`, {
      method: "POST",
      headers: this.headers,
      body: formData,
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`  Failed to upload ${fileName}: ${text}`);
      return null;
    }

    const data = await res.json();
    const mediaId = data.doc?.id;
    if (mediaId) {
      this.mediaCache.set(imagePath, mediaId);
    }
    return mediaId;
  }

  async createBlogPost(post, featuredMediaId) {
    const body = {
      title: post.title,
      slug: post.slug,
      publishedAt: parseDate(post.date),
      status: "published",
      author: post.author || "Connection Experience",
      excerpt: post.description || "",
      legacyHtml: post.bodyHtml || "",
      featuredImage: featuredMediaId || undefined,
      seo: {
        metaTitle: post.title,
        metaDescription: post.description || "",
      },
    };

    const res = await fetch(`${this.serverUrl}/api/blog-posts`, {
      method: "POST",
      headers: {
        ...this.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      // Check if slug already exists
      if (text.includes("unique") || text.includes("duplicate")) {
        console.log(`  ⏩ Skipped (already exists): ${post.slug}`);
        return "skipped";
      }
      throw new Error(`Failed to create post (${res.status}): ${text}`);
    }

    return "created";
  }

  async checkExistingPost(slug) {
    const res = await fetch(
      `${this.serverUrl}/api/blog-posts?where[slug][equals]=${encodeURIComponent(slug)}&limit=1`,
      { headers: { ...this.headers, "Content-Type": "application/json" } }
    );
    if (!res.ok) return false;
    const data = await res.json();
    return data.docs?.length > 0;
  }
}

async function main() {
  console.log("=== Payload CMS Blog Uploader ===\n");

  const files = (await readdir(POSTS_DIR)).filter((f) => f.endsWith(".json"));
  console.log(`Found ${files.length} posts to upload`);
  console.log(`Server: ${SERVER}\n`);

  const uploader = new PayloadUploader(SERVER);

  // Try to create first user or login
  try {
    await uploader.createFirstUser(EMAIL, PASSWORD);
  } catch (err) {
    console.error("Auth failed:", err.message);
    process.exit(1);
  }

  let created = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    try {
      const post = JSON.parse(
        await readFile(path.join(POSTS_DIR, file), "utf-8")
      );

      // Check if already exists
      const exists = await uploader.checkExistingPost(post.slug);
      if (exists) {
        skipped++;
        process.stdout.write(
          `\r[${i + 1}/${files.length}] Skipped: ${skipped} | Created: ${created} | Failed: ${failed}`
        );
        continue;
      }

      // Upload featured image
      let featuredMediaId = null;
      if (post.featuredImageLocal) {
        featuredMediaId = await uploader.uploadMedia(
          post.featuredImageLocal,
          post.title
        );
      }

      // Create post
      const result = await uploader.createBlogPost(post, featuredMediaId);
      if (result === "created") created++;
      else if (result === "skipped") skipped++;

      process.stdout.write(
        `\r[${i + 1}/${files.length}] Skipped: ${skipped} | Created: ${created} | Failed: ${failed}`
      );

      await sleep(DELAY_MS);
    } catch (err) {
      failed++;
      console.error(`\n✗ Failed: ${file} - ${err.message}`);
    }
  }

  console.log("\n\n=== Upload Complete ===");
  console.log(`Created: ${created}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Failed: ${failed}`);
}

main().catch(console.error);
