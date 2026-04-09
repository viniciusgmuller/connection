#!/usr/bin/env node
/**
 * Fix media filenames that contain URL-encoded sequences, spaces,
 * parentheses, or accents. Renames files on disk (inside staticDir)
 * and updates the matching `media` docs in Payload via the REST API.
 *
 * Run this INSIDE the running app container so it has access both to
 * the mounted /app/public/media volume and to Payload on localhost:3000.
 *
 * Usage:
 *   node scripts/fix-media-filenames.mjs \
 *     --server http://localhost:3000 \
 *     --email admin@connection.com \
 *     --password '...'                     # dry run
 *
 *   node scripts/fix-media-filenames.mjs ... --apply   # actually rename + update
 *
 * Safe to re-run — already-clean filenames are skipped.
 */

import path from 'path';
import fs from 'fs/promises';

const args = process.argv.slice(2);
function getArg(name, def) {
  const i = args.indexOf(`--${name}`);
  return i !== -1 && args[i + 1] ? args[i + 1] : def;
}
const APPLY = args.includes('--apply');
const SERVER = getArg('server', 'http://localhost:3000');
const EMAIL = getArg('email', 'admin@connection.com');
const PASSWORD = getArg('password', 'admin');
const STATIC_DIR = getArg('static-dir', path.resolve(process.cwd(), 'public/media'));

function sanitize(name) {
  const ext = path.extname(name);
  let base = path.basename(name, ext);
  for (let i = 0; i < 3; i++) {
    try {
      const decoded = decodeURIComponent(base);
      if (decoded === base) break;
      base = decoded;
    } catch { break; }
  }
  base = base.normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
  base = base.replace(/[^a-zA-Z0-9._-]+/g, '-');
  base = base.replace(/-+/g, '-').replace(/^-|-$/g, '');
  return (base || 'file') + ext.toLowerCase();
}

function isDirty(name) {
  return /%[0-9A-Fa-f]{2}|[^a-zA-Z0-9._-]/.test(name);
}

async function fileExists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

async function uniqueName(dir, desired, usedNames) {
  const ext = path.extname(desired);
  const base = path.basename(desired, ext);
  let candidate = desired;
  let n = 1;
  while (usedNames.has(candidate) || (await fileExists(path.join(dir, candidate)))) {
    candidate = `${base}-${n}${ext}`;
    n++;
  }
  usedNames.add(candidate);
  return candidate;
}

let TOKEN = null;

async function login() {
  const res = await fetch(`${SERVER}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  });
  if (!res.ok) throw new Error(`login failed: ${res.status} ${await res.text()}`);
  const data = await res.json();
  TOKEN = data.token;
}

async function listMedia() {
  const res = await fetch(`${SERVER}/api/media?limit=1000&depth=0`, {
    headers: { Authorization: `JWT ${TOKEN}` },
  });
  if (!res.ok) throw new Error(`list media failed: ${res.status}`);
  const data = await res.json();
  return data.docs;
}

async function updateMediaFilename(id, filename) {
  const res = await fetch(`${SERVER}/api/media/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${TOKEN}`,
    },
    body: JSON.stringify({ filename }),
  });
  if (!res.ok) throw new Error(`update ${id} failed: ${res.status} ${await res.text()}`);
}

async function main() {
  console.log(`[fix-media] mode=${APPLY ? 'APPLY' : 'DRY RUN'}  server=${SERVER}  staticDir=${STATIC_DIR}`);

  await login();
  const docs = await listMedia();
  console.log(`[fix-media] loaded ${docs.length} media docs`);

  const used = new Set();
  let dirty = 0, renamed = 0, missing = 0, failed = 0;

  for (const doc of docs) {
    const current = doc.filename;
    if (!current || !isDirty(current)) continue;
    dirty++;

    const srcPath = path.join(STATIC_DIR, current);
    if (!(await fileExists(srcPath))) {
      console.warn(`  [miss] id=${doc.id} "${current}" not found on disk`);
      missing++;
      continue;
    }

    let target = sanitize(current);
    if (target === current) continue;
    target = await uniqueName(STATIC_DIR, target, used);
    const dstPath = path.join(STATIC_DIR, target);

    console.log(`  ${APPLY ? '[rename]' : '[plan]  '} ${doc.id}  "${current}"  ->  "${target}"`);
    if (!APPLY) continue;

    try {
      await fs.rename(srcPath, dstPath);
      await updateMediaFilename(doc.id, target);
      renamed++;
    } catch (err) {
      console.error(`  [fail] ${doc.id}: ${err.message}`);
      if ((await fileExists(dstPath)) && !(await fileExists(srcPath))) {
        try { await fs.rename(dstPath, srcPath); } catch {}
      }
      failed++;
    }
  }

  console.log(`\n[fix-media] dirty=${dirty} renamed=${renamed} missing=${missing} failed=${failed}`);
}

main().catch((err) => {
  console.error('[fix-media] fatal:', err);
  process.exit(1);
});
