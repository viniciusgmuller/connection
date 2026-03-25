#!/usr/bin/env node

/**
 * Seed all CMS collections with current hardcoded/JSON data
 * Usage: node scripts/seed-cms.mjs --server URL --email EMAIL --password PASSWORD
 */

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
  console.log(`Logging in to ${SERVER}...`);
  try {
    const res = await fetch(`${SERVER}/api/users/first-register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: EMAIL, password: PASSWORD, name: "Admin" }),
    });
    if (res.ok) {
      const data = await res.json();
      TOKEN = data.token;
      console.log("First user created!\n");
      return;
    }
  } catch {}
  const res = await fetch(`${SERVER}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  });
  if (!res.ok) throw new Error(`Login failed: ${res.status}`);
  const data = await res.json();
  TOKEN = data.token;
  console.log("Logged in!\n");
}

async function api(path, body) {
  const res = await fetch(`${SERVER}${path}`, {
    method: "POST",
    headers: { Authorization: `JWT ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    if (text.includes("unique") || text.includes("duplicate")) return null;
    console.error(`  Error ${path}: ${text.slice(0, 200)}`);
    return null;
  }
  const data = await res.json();
  return data.doc;
}

async function getCount(collection) {
  const res = await fetch(`${SERVER}/api/${collection}?limit=0`, {
    headers: { Authorization: `JWT ${TOKEN}` },
  });
  const data = await res.json();
  return data.totalDocs || 0;
}

// --- DATA ---

const speakers = [
  { name: "Dado Schneider", title: "Comunicador e Palestrante", bio: "Mestre e Doutor em Comunicação, destacado pelo BuzzFeed como 'palestrante imperdível'.", credentials: [{ credential: "Mestre em Comunicação" }, { credential: "Doutor em Comunicação" }, { credential: "Branded Claro" }], order: 1 },
  { name: "José Luiz Tejon", title: "Especialista em Agronegócio", bio: "TOP 10 Agro pela Forbes 2024, Doutor em Educação com vasta experiência no setor.", credentials: [{ credential: "TOP 10 Agro Forbes 2024" }, { credential: "Doutor em Educação" }], order: 2 },
  { name: "Guilherme Paulus", title: "Fundador da CVC", bio: "Visionário do turismo brasileiro, fundador da maior operadora de viagens da América Latina.", credentials: [{ credential: "Fundador CVC" }, { credential: "Executivo de Turismo" }], order: 3 },
];

const tickets = [
  { name: "Day Pass", price: 290, description: "Acesso a um dia do evento", features: [{ feature: "Acesso às palestras do dia" }, { feature: "Acesso à feira de expositores" }, { feature: "Acesso às degustações" }, { feature: "Material do evento" }, { feature: "Coffee break incluso" }], highlighted: false, order: 1 },
  { name: "Full Pass", price: 690, previousPrice: 890, description: "Acesso completo aos 3 dias", features: [{ feature: "Acesso total aos 3 dias" }, { feature: "Todas as palestras e painéis" }, { feature: "Workshops exclusivos" }, { feature: "Rodadas de negócio (mediante inscrição)" }, { feature: "Degustações guiadas" }, { feature: "Kit participante completo" }, { feature: "Acesso à área VIP" }, { feature: "Almoços inclusos" }], highlighted: true, order: 2 },
  { name: "VIP Experience", price: 1490, description: "Experiência premium exclusiva", features: [{ feature: "Todos os benefícios do Full Pass" }, { feature: "Acesso prioritário às atividades" }, { feature: "Jantar de gala incluso" }, { feature: "Meet & greet com palestrantes" }, { feature: "Lounge VIP com open bar" }, { feature: "Transfer hotel-evento" }, { feature: "Concierge dedicado" }, { feature: "Brindes exclusivos" }], highlighted: false, order: 3 },
];

const testimonials = [
  { name: "Maria Santos", role: "Sommelier", company: "Restaurante Terroir", quote: "O Connection me abriu os olhos para a riqueza dos produtos brasileiros. As palestras foram transformadoras e agora trabalho exclusivamente com produtores IG.", axis: "conhecer" },
  { name: "João Oliveira", role: "Chef de Cozinha", company: "Bistrô Raízes", quote: "Experimentar os produtos diretamente com os produtores mudou minha forma de cozinhar. Cada ingrediente tem uma história que agora conto aos meus clientes.", axis: "experimentar" },
  { name: "Ana Costa", role: "Diretora Comercial", company: "Rede Sabores do Brasil", quote: "Fechamos parcerias com 12 novos produtores nas rodadas de negócio. O retorno sobre o investimento foi imediato e duradouro.", axis: "negociar" },
  { name: "Carlos Silva", role: "Produtor de Cacau", company: "Fazenda Rondônia", quote: "Consegui expandir minha rede de distribuição para todo o Sul do Brasil. O Connection é o ponto de encontro que faltava no mercado.", axis: "negociar" },
  { name: "Fernanda Lima", role: "Jornalista Gastronômica", company: "Portal Sabor Brasil", quote: "O conteúdo apresentado no Connection é de altíssimo nível. Saio de cada edição com material para meses de reportagens.", axis: "conhecer" },
  { name: "Ricardo Mendes", role: "Barista Campeão", company: "Café Especial Minas", quote: "A Arena Café é simplesmente o melhor espaço para quem ama café especial. As degustações guiadas são inesquecíveis.", axis: "experimentar" },
];

const categories = ["Vinhos", "Cafés", "Queijos", "Ervas", "Geleias"];

const faqItems = [
  { question: "Posso transferir meu ingresso?", answer: { root: { type: "root", children: [{ type: "paragraph", children: [{ type: "text", text: "Sim, você pode transferir seu ingresso para outra pessoa até 7 dias antes do evento." }] }] } }, order: 1 },
  { question: "Qual a política de cancelamento?", answer: { root: { type: "root", children: [{ type: "paragraph", children: [{ type: "text", text: "Cancelamentos com mais de 30 dias de antecedência têm reembolso integral. Entre 15 e 30 dias, 50%. Menos de 15 dias, sem reembolso." }] }] } }, order: 2 },
  { question: "O que está incluso no ingresso?", answer: { root: { type: "root", children: [{ type: "paragraph", children: [{ type: "text", text: "Cada categoria de ingresso inclui diferentes benefícios conforme descrito acima. Hospedagem e transporte não estão inclusos, exceto no pacote VIP que inclui transfer." }] }] } }, order: 3 },
  { question: "Como funcionam as Rodadas de Negócio?", answer: { root: { type: "root", children: [{ type: "paragraph", children: [{ type: "text", text: "Portadores do Full Pass e VIP podem se inscrever para as rodadas de negócio. Nossa equipe faz o matchmaking entre produtores e compradores, e você recebe uma agenda personalizada de reuniões." }] }] } }, order: 4 },
];

const partnerTiers = [
  { name: "Correalização", order: 1 },
  { name: "Realização", order: 2 },
  { name: "Estado Anfitrião", order: 3 },
  { name: "Apoio", order: 4 },
  { name: "Hotel Oficial", order: 5 },
  { name: "Chocolate Oficial", order: 6 },
  { name: "Transporte Terrestre Oficial", order: 7 },
  { name: "Parceria", order: 8 },
];

// Schedule events for June 2026
const scheduleEvents = [
  // Day 1 - Wed June 10
  { title: "Credenciamento", date: "2026-06-10", startTime: "08:00", type: "special", location: "Entrada Principal" },
  { title: "Cerimônia de Abertura", date: "2026-06-10", startTime: "09:00", type: "special", location: "Auditório Principal" },
  { title: "Palestra: O Futuro das IGs no Brasil", date: "2026-06-10", startTime: "10:00", endTime: "12:00", type: "palestra", location: "Auditório Principal", speakerName: "José Luiz Tejon" },
  { title: "Almoço de Networking", date: "2026-06-10", startTime: "12:00", endTime: "14:00", type: "networking", location: "Restaurante Parceiro" },
  { title: "Workshop: Introdução às Indicações Geográficas", date: "2026-06-10", startTime: "14:00", endTime: "16:00", type: "workshop", location: "Sala 1" },
  { title: "Degustação de Vinhos da Serra Gaúcha", date: "2026-06-10", startTime: "14:00", endTime: "16:00", type: "workshop", location: "Arena IG" },
  { title: "Painel: Terroirs Brasileiros", date: "2026-06-10", startTime: "16:00", endTime: "18:00", type: "palestra", location: "Auditório Principal" },
  { title: "Coquetel de Boas-Vindas", date: "2026-06-10", startTime: "18:00", type: "networking", location: "Área Externa" },
  // Day 2 - Thu June 11
  { title: "Rodadas de Negócio - Bloco 1", date: "2026-06-11", startTime: "08:30", endTime: "09:30", type: "networking", location: "Área de Negócios" },
  { title: "Palestra: Comunicação e Branding", date: "2026-06-11", startTime: "09:30", endTime: "11:00", type: "palestra", location: "Auditório Principal", speakerName: "Dado Schneider" },
  { title: "Aula Show: Cacau de Rondônia", date: "2026-06-11", startTime: "11:00", endTime: "12:30", type: "workshop", location: "Arena Gastronômica" },
  { title: "Almoço", date: "2026-06-11", startTime: "12:30", endTime: "14:00", type: "break", location: "Livre" },
  { title: "Rodadas de Negócio - Bloco 2", date: "2026-06-11", startTime: "14:00", endTime: "15:00", type: "networking", location: "Área de Negócios" },
  { title: "Workshop: Café Especial Brasileiro", date: "2026-06-11", startTime: "15:00", endTime: "17:00", type: "workshop", location: "Arena Café" },
  { title: "Palestra: Turismo e Experiências", date: "2026-06-11", startTime: "17:00", endTime: "19:00", type: "palestra", location: "Auditório Principal", speakerName: "Guilherme Paulus" },
  { title: "Jantar de Gala", date: "2026-06-11", startTime: "19:00", type: "special", location: "Restaurante Parceiro" },
  // Day 3 - Fri June 12
  { title: "Rodadas de Negócio - Bloco 3", date: "2026-06-12", startTime: "09:00", endTime: "10:00", type: "networking", location: "Área de Negócios" },
  { title: "Painel: Cases de Sucesso", date: "2026-06-12", startTime: "10:00", endTime: "11:30", type: "palestra", location: "Auditório Principal" },
  { title: "Degustação: Queijos Artesanais", date: "2026-06-12", startTime: "11:30", endTime: "12:30", type: "workshop", location: "Arena IG" },
  { title: "Almoço", date: "2026-06-12", startTime: "12:30", endTime: "14:00", type: "break", location: "Livre" },
  { title: "Workshop: Produtos com IG na Gastronomia", date: "2026-06-12", startTime: "14:00", endTime: "16:00", type: "workshop", location: "Arena Gastronômica" },
  { title: "Painel: Sustentabilidade e Origem", date: "2026-06-12", startTime: "16:00", endTime: "18:00", type: "palestra", location: "Auditório Principal" },
  { title: "Happy Hour Networking", date: "2026-06-12", startTime: "18:00", type: "networking", location: "Área Externa" },
  // Day 4 - Sat June 13
  { title: "Rodadas de Negócio - Bloco 4", date: "2026-06-13", startTime: "09:00", endTime: "10:00", type: "networking", location: "Área de Negócios" },
  { title: "Painel: O Mercado Internacional", date: "2026-06-13", startTime: "10:00", endTime: "11:30", type: "palestra", location: "Auditório Principal" },
  { title: "Degustação: Queijos Artesanais", date: "2026-06-13", startTime: "11:30", endTime: "12:30", type: "workshop", location: "Arena IG" },
  { title: "Almoço de Encerramento", date: "2026-06-13", startTime: "12:30", endTime: "14:30", type: "networking", location: "Área Central" },
  { title: "Cerimônia de Premiação", date: "2026-06-13", startTime: "14:30", endTime: "16:00", type: "special", location: "Auditório Principal" },
  { title: "Encerramento Oficial", date: "2026-06-13", startTime: "16:00", type: "special", location: "Auditório Principal" },
];

// Products from experimentar.json (loaded dynamically)
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  await login();

  // 1. Speakers
  let speakerCount = await getCount("speakers");
  if (speakerCount === 0) {
    console.log("Seeding speakers...");
    for (const s of speakers) {
      await api("/api/speakers", s);
    }
    console.log(`  ${speakers.length} speakers created`);
  } else {
    console.log(`Speakers: ${speakerCount} already exist, skipping`);
  }

  // 2. Tickets
  let ticketCount = await getCount("tickets");
  if (ticketCount === 0) {
    console.log("Seeding tickets...");
    for (const t of tickets) {
      await api("/api/tickets", t);
    }
    console.log(`  ${tickets.length} tickets created`);
  } else {
    console.log(`Tickets: ${ticketCount} already exist, skipping`);
  }

  // 3. Testimonials
  let testCount = await getCount("testimonials");
  if (testCount === 0) {
    console.log("Seeding testimonials...");
    for (const t of testimonials) {
      await api("/api/testimonials", t);
    }
    console.log(`  ${testimonials.length} testimonials created`);
  } else {
    console.log(`Testimonials: ${testCount} already exist, skipping`);
  }

  // 4. FAQ
  let faqCount = await getCount("faq");
  if (faqCount === 0) {
    console.log("Seeding FAQ...");
    for (const f of faqItems) {
      await api("/api/faq", f);
    }
    console.log(`  ${faqItems.length} FAQ items created`);
  } else {
    console.log(`FAQ: ${faqCount} already exist, skipping`);
  }

  // 5. Partner Tiers
  let tierCount = await getCount("partner-tiers");
  if (tierCount === 0) {
    console.log("Seeding partner tiers...");
    for (const t of partnerTiers) {
      await api("/api/partner-tiers", t);
    }
    console.log(`  ${partnerTiers.length} partner tiers created`);
  } else {
    console.log(`Partner tiers: ${tierCount} already exist, skipping`);
  }

  // 6. Product Categories
  let catCount = await getCount("product-categories");
  const categoryMap = {};
  if (catCount === 0) {
    console.log("Seeding product categories...");
    for (const name of categories) {
      const doc = await api("/api/product-categories", { name });
      if (doc) categoryMap[name] = doc.id;
    }
    console.log(`  ${categories.length} categories created`);
  } else {
    console.log(`Product categories: ${catCount} already exist, loading IDs...`);
    const res = await fetch(`${SERVER}/api/product-categories?limit=100`, {
      headers: { Authorization: `JWT ${TOKEN}` },
    });
    const data = await res.json();
    for (const doc of data.docs) {
      categoryMap[doc.name] = doc.id;
    }
  }

  // 7. Products
  let prodCount = await getCount("products");
  if (prodCount === 0) {
    console.log("Seeding products...");
    const productsJson = JSON.parse(
      await readFile(path.join(__dirname, "..", "src", "content", "experimentar.json"), "utf-8")
    );
    let created = 0;
    for (const p of productsJson.products) {
      const catId = categoryMap[p.category];
      if (!catId) {
        console.error(`  No category ID for: ${p.category}`);
        continue;
      }
      await api("/api/products", {
        name: p.name,
        origin: p.origin,
        state: p.state,
        description: p.description,
        category: catId,
      });
      created++;
      if (created % 10 === 0) process.stdout.write(`\r  ${created} products...`);
    }
    console.log(`\r  ${created} products created`);
  } else {
    console.log(`Products: ${prodCount} already exist, skipping`);
  }

  // 8. Schedule Events (need speaker IDs)
  let schedCount = await getCount("schedule-events");
  if (schedCount === 0) {
    console.log("Seeding schedule events...");
    // Get speaker IDs
    const speakersRes = await fetch(`${SERVER}/api/speakers?limit=100`, {
      headers: { Authorization: `JWT ${TOKEN}` },
    });
    const speakersData = await speakersRes.json();
    const speakerMap = {};
    for (const s of speakersData.docs) {
      speakerMap[s.name] = s.id;
    }

    for (const evt of scheduleEvents) {
      const body = {
        title: evt.title,
        date: evt.date,
        startTime: evt.startTime,
        endTime: evt.endTime || undefined,
        type: evt.type,
        location: evt.location,
        speaker: evt.speakerName ? speakerMap[evt.speakerName] : undefined,
      };
      await api("/api/schedule-events", body);
    }
    console.log(`  ${scheduleEvents.length} schedule events created`);
  } else {
    console.log(`Schedule events: ${schedCount} already exist, skipping`);
  }

  console.log("\n=== Seed complete ===");
}

main().catch(console.error);
