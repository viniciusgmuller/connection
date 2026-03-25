#!/usr/bin/env node

import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOGOS_DIR = path.join(__dirname, "..", "public", "images", "parceiros");

const args = process.argv.slice(2);
function getArg(name, defaultValue) {
  const idx = args.indexOf(`--${name}`);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : defaultValue;
}

const SERVER = getArg("server", "http://localhost:3000");
const EMAIL = getArg("email", "admin@connection.com");
const PASSWORD = getArg("password", "admin");

let TOKEN = null;

async function login() {
  const res = await fetch(`${SERVER}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  });
  if (!res.ok) throw new Error(`Login failed: ${res.status}`);
  TOKEN = (await res.json()).token;
  console.log("Logged in!\n");
}

async function uploadMedia(filePath, altText) {
  const fileBuffer = await readFile(filePath);
  const fileName = path.basename(filePath);
  const formData = new FormData();
  formData.append("file", new Blob([fileBuffer], { type: "image/png" }), fileName);
  formData.append("_payload", JSON.stringify({ alt: altText }));

  const res = await fetch(`${SERVER}/api/media`, {
    method: "POST",
    headers: { Authorization: `JWT ${TOKEN}` },
    body: formData,
  });
  if (!res.ok) {
    console.error(`  Failed to upload ${fileName}: ${await res.text()}`);
    return null;
  }
  const data = await res.json();
  return data.doc?.id;
}

async function api(path, body) {
  const res = await fetch(`${SERVER}${path}`, {
    method: "POST",
    headers: { Authorization: `JWT ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) return null;
  return (await res.json()).doc;
}

async function getAll(collection) {
  const res = await fetch(`${SERVER}/api/${collection}?limit=100`, {
    headers: { Authorization: `JWT ${TOKEN}` },
  });
  return (await res.json()).docs || [];
}

const partnersData = [
  { name: "SEBRAE", logo: "sebrae.png", tier: "Correalização", order: 1 },
  { name: "Prefeitura de Gramado - Secretaria de Turismo", logo: "gramado.png", tier: "Correalização", order: 2 },
  { name: "Rossi & Zorzanello Eventos e Empreendimentos", logo: "rossi-zorzanello.png", tier: "Realização", order: 1 },
  { name: "Governo do Estado do Rio Grande do Sul", logo: "rio-grande-do-sul.png", tier: "Estado Anfitrião", order: 1 },
  { name: "Sicredi Pioneira", logo: "sicredi.png", tier: "Apoio", order: 1 },
  { name: "Laghetto Hotéis, Resorts & Experiências", logo: "laghetto.png", tier: "Hotel Oficial", order: 1 },
  { name: "Chocolataria Gramado", logo: "chocolataria-gramado.png", tier: "Chocolate Oficial", order: 1 },
  { name: "Turistur Turismo", logo: "turistur.png", tier: "Transporte Terrestre Oficial", order: 1 },
  { name: "SKYTEAM", logo: "skyteam.png", tier: "Parceria", order: 1 },
  { name: "MultiServiços Operadora", logo: "multiservicos.png", tier: "Parceria", order: 2 },
];

async function main() {
  await login();

  // Check if partners already exist
  const existing = await getAll("partners");
  if (existing.length > 0) {
    console.log(`Partners: ${existing.length} already exist, skipping`);
    return;
  }

  // Get tier IDs
  const tiers = await getAll("partner-tiers");
  const tierMap = {};
  for (const t of tiers) tierMap[t.name] = t.id;

  console.log("Uploading partner logos and creating partners...");
  for (const p of partnersData) {
    const tierId = tierMap[p.tier];
    if (!tierId) {
      console.error(`  No tier found for: ${p.tier}`);
      continue;
    }

    const logoPath = path.join(LOGOS_DIR, p.logo);
    const mediaId = await uploadMedia(logoPath, p.name);
    if (!mediaId) continue;

    const doc = await api("/api/partners", {
      name: p.name,
      logo: mediaId,
      tier: tierId,
      order: p.order,
    });

    console.log(`  ✓ ${p.name} (${p.tier})`);
  }

  console.log("\n=== Partners seeded ===");
}

main().catch(console.error);
