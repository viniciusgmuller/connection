import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import { getPayload } from 'payload';
import config from '@payload-config';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

const SECRET = 'fix-media-5d4b21e4-connection-2026';
const STATIC_DIR = path.resolve(process.cwd(), 'public/media');

function sanitize(name: string): string {
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

function isDirty(name: string): boolean {
  return /%[0-9A-Fa-f]{2}|[^a-zA-Z0-9._-]/.test(name);
}

async function fileExists(p: string): Promise<boolean> {
  try { await fs.access(p); return true; } catch { return false; }
}

async function uniqueName(dir: string, desired: string, used: Set<string>): Promise<string> {
  const ext = path.extname(desired);
  const base = path.basename(desired, ext);
  let candidate = desired;
  let n = 1;
  while (used.has(candidate) || (await fileExists(path.join(dir, candidate)))) {
    candidate = `${base}-${n}${ext}`;
    n++;
  }
  used.add(candidate);
  return candidate;
}

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get('secret') !== SECRET) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  }
  const apply = req.nextUrl.searchParams.get('apply') === '1';
  const log: string[] = [];
  log.push(`mode=${apply ? 'APPLY' : 'DRY RUN'} staticDir=${STATIC_DIR}`);

  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: 'media',
    limit: 1000,
    depth: 0,
    overrideAccess: true,
  });
  log.push(`loaded ${docs.length} media docs`);

  const used = new Set<string>();
  let dirty = 0, renamed = 0, missing = 0, failed = 0;

  for (const doc of docs as Array<{ id: string; filename?: string | null }>) {
    const current = doc.filename;
    if (!current || !isDirty(current)) continue;
    dirty++;

    const srcPath = path.join(STATIC_DIR, current);
    if (!(await fileExists(srcPath))) {
      log.push(`[miss] id=${doc.id} "${current}"`);
      missing++;
      continue;
    }

    let target = sanitize(current);
    if (target === current) continue;
    target = await uniqueName(STATIC_DIR, target, used);
    const dstPath = path.join(STATIC_DIR, target);

    log.push(`${apply ? '[rename]' : '[plan]'} ${doc.id} "${current}" -> "${target}"`);
    if (!apply) continue;

    try {
      await fs.rename(srcPath, dstPath);
      await payload.update({
        collection: 'media',
        id: doc.id,
        data: { filename: target },
        overrideAccess: true,
      });
      renamed++;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      log.push(`[fail] ${doc.id}: ${msg}`);
      if ((await fileExists(dstPath)) && !(await fileExists(srcPath))) {
        try { await fs.rename(dstPath, srcPath); } catch {}
      }
      failed++;
    }
  }

  log.push(`summary: dirty=${dirty} renamed=${renamed} missing=${missing} failed=${failed}`);
  return NextResponse.json({ ok: true, log });
}
