#!/usr/bin/env node

/**
 * Blog Scraper for connectionexperience.com.br
 * Extracts all 120 blog posts with content, metadata, and images
 * Saves to /content/blog-import/ for later upload to Payload CMS
 */

import { writeFile, readFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_URL = "https://www.connectionexperience.com.br";
const OUTPUT_DIR = path.join(__dirname, "..", "content", "blog-import");
const POSTS_DIR = path.join(OUTPUT_DIR, "posts");
const IMAGES_DIR = path.join(OUTPUT_DIR, "images");
const PROGRESS_FILE = path.join(OUTPUT_DIR, "progress.json");

// All 120 blog post slugs from sitemap
const SLUGS = [
  "10-a-13-de-junho-connection-terroirs-do-brasil-confirma-data-do-evento-em-gramado",
  "5-motivos-para-garantir-seu-ingresso-no-connection-terroirs-brasil",
  "5a-edicao-do-connection-sera-em-setembro-em-canela",
  "6a-edicao-do-connection-gera-conexoes-de-norte-a-sul-do-pais-e-bate-todos-os-recorde",
  "a-diversidade-das-estancias-da-argentina-serao-destaque-no-connection-experience",
  "a-forca-da-origem-no-sul-do-brasil-e-o-tema-no-novo-podcast-do-connection",
  "a-forca-da-producao-do-vinho-no-inverno-da-serra-gaucha",
  "a-imersao-nas-novas-tendencias-do-turismo-esta-chegando",
  "a-transformacao-do-turismo-passara-por-canela-dias-9-e-10-de-setembro",
  "acafrao-de-mara-rosa-consolida-posicao-no-mercado-nacional-com-forca-da-ig",
  "alameda-terroir-uma-vitrine-para-o-produto-nacional",
  "alpen-park-recebe-450-criancas-no-dia-nacional-da-alegria",
  "aprovale-empossa-nova-diretoria",
  "arena-gastronomica-sera-um-show-de-cozinha-com-renomados-chefs",
  "arena-gastronomica-vai-exaltar-ingredientes-de-origem",
  "benchmarking-connection-uma-imersao-de-aprendizado-no-universo-dos-produtos-de-origem",
  "benchmarking-do-connection-vai-mostrar-os-segredos-de-sucesso-de-empreendimentos-da-serra",
  "bom-jesus-da-lapa-ba-tem-banana-reconhecida-como-ig",
  "brasil-alcanca-141-produtos-com-ig-e-avanca-na-valorizacao-de-produtos-de-origem",
  "brasil-alcanca-150-indicacoes-geograficas-e-celebra-reconhecimento-de-cachacas-de-areia-pb-e-orizona-go",
  "brasil-chega-a-125-indicacoes-geograficas-reconhecidas-pelo-inpi",
  "brasil-conquista-nova-indicacao-geografica-para-as-tradicionais-figureiras-de-taubate",
  "cafe-da-serra-de-baturite-ce-conquista-indicacao-geografica-e-brasil-chega-a-157-produtos-certificados",
  "cafes-especiais-serao-destaque-no-connection-terroirs-do-brasil",
  "camarao-do-nordeste-e-o-primeiro-crustaceo-no-mundo-a-ter-registro-de-ig",
  "capital-nacional-do-chocolate-confirma-participacao-no-connection-terroirs-do-brasil",
  "chocolate-e-o-anfitriao-do-connection",
  "com-apoio-ao-pama-connection-reforca-seu-compromisso-social",
  "com-cafe-da-serra-de-apucarana-parana-conquista-sua-24a-indicacao-geografica",
  "comeca-hoje-o-connection-terroirs-do-brasil",
  "como-o-selo-de-indicacao-geografica-pode-alavancar-negocios",
  "conectar-para-reconstruir-conexoes-e-troca-de-experiencias-como-inspiracao-para-a-recuperacao-da-economia-por-eduardo-zorzanello",
  "conexao-com-a-espanha-vai-debater-o-tema-quando-o-produto-se-torna-destino-na-6a-edicao-do-connection",
  "conexao-entre-produtos-unicos-e-publico-supera-expectativas-nas-primeiras-horas-do-connection-terroirs-do-brasil",
  "conheca-os-palestrantes-do-connection-ja-confirmados-para-este-ano",
  "connection-celebra-os-150-anos-da-imigracao-italiana-com-exposicao-fotografica-de-leonid-streliaev",
  "connection-confirma-palestra-com-dado-schneider",
  "connection-e-secretaria-de-agricultura-alinham-detalhes-para-evento-deste-ano",
  "connection-e-uma-viagem-gastronomica-pelos-sabores-brasileiros",
  "connection-escolhe-mercado-publico-da-capital-para-apresentar-edicao-2025-2",
  "connection-experience-abre-primeiro-lote-de-inscricoes",
  "connection-experience-debate-as-novas-tendencias-de-turismo-natureza-gastronomia-e-rural",
  "connection-festuris-encerra-com-sucesso-absoluto-e-projeta-nova-edicao-para-setembro",
  "connection-participa-de-evento-sobre-indicacoes-geograficas-em-sao-paulo",
  "connection-promove-integracao-da-agricultura-familiar-com-igs",
  "connection-proporciona-acesso-exclusivo-aos-melhores-parques-de-gramado",
  "connection-proporciona-experiencia-cultural-e-turistica-para-jornalistas",
  "connection-recebera-exposicao-com-obras-texteis-da-artista-jeannine-krischke",
  "connection-se-consolida-como-maior-evento-dedicado-as-indicacoes-geograficas-do-brasil",
  "connection-tera-encontro-com-doutor-luiz-tejon",
  "connection-tera-palestras-com-conteudo-especializado",
  "connection-terroir-do-brasil-abrira-espaco-para-agroindustrias-familiares",
  "connection-terroirs-do-brasil-amplia-edicao-e-tem-nova-data",
  "connection-terroirs-do-brasil-amplia-presenca-da-agricultura-familiar-gaucha",
  "connection-terroirs-do-brasil-faz-divulgacao-dentro-do-festuris",
  "connection-terroirs-do-brasil-formaliza-convite-a-secretaria-de-agricultura-de-gramado",
  "connection-terroirs-do-brasil-impulsiona-indicacoes-geograficas-e-novos-negocios-em-gramado",
  "connection-terroirs-do-brasil-renova-parceria-com-o-sebrae-para-edicao-2026",
  "connection-terroirs-do-brasil-tera-14-paineis-com-especialistas",
  "connection-terroirs-do-brasil-tera-arena-do-cafe-de-origem-controlada",
  "copos-de-cafe-sao-transformados-em-cachepos-para-mini-suculentas",
  "cresce-numero-de-produtos-com-indicacao-geografica-no-brasil",
  "da-ficcao-a-realidade-a-era-dos-jetsons-esta-chegando",
  "da-ficcao-a-realidade-gramado-recebe-a-5a-edicao-do-connection-em-maio",
  "daniel-panizzi-e-reconduzido-a-presidencia-da-uvibra",
  "desastres-naturais-como-o-de-brumadinho-pautam-palestra-no-connection",
  "em-15-dias-tres-novos-produtos-recebem-selo-de-indicacao-geografica",
  "em-palestras-conteudos-que-valorizam-o-terroir",
  "em-setembro-viva-experiencias-no-connection-experience",
  "erva-mate-de-machadinho-alcanca-registro-de-indicacao-geografica",
  "estariam-todas-as-regioes-do-brasil-devidamente-preparadas-para-recepcionar-tantos-projetos-audiovisuais-simultaneos",
  "evento-connection-experience-terroirs-do-brasil-ira-discutir-a-valorizacao-dos-produtos-originalmente-brasileiros",
  "evento-connection-terroirs-do-brasil-e-adiado",
  "evento-connection-terroirs-do-brasil-sera-em-agosto",
  "evento-de-experiencias-conecta-palestrantes-internacionais-com-cases-brasileiros",
  "evento-em-gramado-ira-colocar-os-terroirs-brasileiros-em-pauta",
  "evento-em-gramado-vai-ajudar-a-cidade-de-santa-tereza",
  "experiencias-inesqueciveis-em-nova-petropolis-estao-na-programacao-do-connection-terroirs-do-brasil",
  "faca-uma-imersao-nos-ambientes-dos-produtos-de-origem",
  "falta-um-mes-para-o-connection-terroirs-do-brasil",
  "falta-um-mes-para-o-connection-terroirs-do-brasil-2",
  "festuris-connection-lanca-quarta-edicao-com-a-imersao-em-vendas-top-performer",
  "garden-park-gramado-realiza-acao-de-preservacao-ambiental",
  "geraldo-rufino-e-palestrante-confirmado-no-festuris-connection",
  "gostinho-de-brasil-descubra-os-restaurantes-de-gramado-que-estarao-no-circuito-gastronomico-do-connection-terroirs-2024",
  "governador-eduardo-leite-recebeu-convite-para-a-6a-edicao-do-connection-que-acontecera-em-gramado",
  "gramado-e-vitrine-para-produtos-com-riquezas-unicas",
  "gramado-e-vitrine-para-produtos-com-riquezas-unicas-ate-domingo",
  "gramado-parks-marca-presenca-na-7a-edicao-do-connection---terroirs-do-brasil",
  "inpi-reconhece-ig-chapada-de-minas-para-cafes-produzidos-em-22-municipios",
  "inscreva-se-para-o-connection-e-concorra-a-viagens-para-o-rj-e-nordeste",
  "inscricao-no-connection-garante-visitacao-gratuita-em-parques-da-regiao",
  "inscricoes-para-o-connection-abrem-segunda-feira-dia-10",
  "joia-da-serra-gaucha---autenticidade-e-vinhos-excepcionais-em-meio-a-beleza-da-serra-gaucha-com-a-vinicola-don-giovanni",
  "leo-farah-participa-de-evento-em-gramado-no-mes-de-agosto",
  "maior-evento-de-indicacao-geografica-do-pais-comeca-em-uma-semana",
  "mais-de-30-indicacoes-geograficas-ja-estao-confirmadas-para-o-connection",
  "mais-uma-edicao-do-connection-experience-vem-ai",
  "mais-uma-edicao-do-connection-experience-vem-ai-2",
  "marta-rossi-fala-em-nome-do-trade-no-lancamento-da-frente-parlamentar-em-defesa-e-fomento-do-turismo-gaucho-na-assembleia-legislativa",
  "mendoza-arg-sera-destaque-na-arena-de-conteudo-do-connection",
  "museu-do-turismo-e-inaugurado-em-gramado",
  "nesta-quarta-comeca-mais-uma-edicao-do-connection-terroirs-do-brasil",
  "networking-de-negocios-conecta-empresarios-e-produtores-do-brasil",
  "novas-fronteiras-e-tendencias-do-mundo-moderno",
  "novo-episodio-do-podcast-connection-revela-a-forca-dos-terroirs-do-brasil-e-o-poder-das-indicacoes-geograficas",
  "o-1o-lote-do-connection-terroirs-do-brasil-ja-esta-disponivel",
  "o-brasil-tem-que-falar-de-terroir-tudo-e-terroir-diz-especialista",
  "o-cinema-como-elemento-fomentador-de-destinos-turisticos",
  "o-despertar-para-o-turismo-rural-e-o-desenvolvimento-economico",
  "o-mago-da-cozinha-do-fogo-vai-palestrar-em-gramado",
  "o-poder-do-artesanato-para-a-transformacao-de-um-destino",
  "o-que-esperar-da-7a-edicao-do-connection-experience",
  "olivas-de-gramado-promove-festival-do-azeite-com-experiencias-imersivas-e-sensoriais",
  "olivicultura-e-a-nova-fronteira-do-turismo",
  "os-melhores-cafes-do-brasil-estarao-em-gramado",
  "os-melhores-produtos-de-origem-do-brasil-se-encontrarao-em-gramado",
  "os-segredos-da-maca-fuji-de-sao-joaquim-o-frio-do-terroir-o-pingo-de-mel-a-crocancia-e-a-suculencia",
  "os-segredos-do-cafe-mais-desejado-do-mundo-sera-desvendado-em-gramado",
  "participantes-do-connection-terao-20-de-desconto-nos-restaurantes-da-rua-coberta",
  "pela-primeira-vez-produtos-com-indicacao-geografica-serao-apresentados-a-empresarios-compradores-durante-rodada-de-negocios",
  "potencial-do-turismo-rural-e-da-enogastronomia-sao-destaques-no-segundo-dia-do-connection-experience",
  "primeiro-lote-de-ingressos-presenciais-do-connection-experience-esta-acabando",
  "primeiro-podcast-do-connection-terroirs-do-brasil-ja-esta-no-ar",
  "producao-de-alimentos-e-saude-caminham-juntos",
  "queijo-da-canastra-uma-tradicao-secular-na-serra-mineira",
  "restam-poucas-vagas-presenciais-para-o-connection-experience",
  "reuniao-em-brasilia-projeta-proxima-edicao-do-connection-terroirs-do-brasil",
  "rossi-zorzanello-prestigia-posse-do-novo-secretario-de-turismo-de-gramado",
  "sabor-gaucho-tera-14-agroindustrias-no-connection",
  "santa-catarina-conquista-a-oitava-indicacao-geografica-do-estado",
  "sao-paulo-lanca-manual-para-incentivar-indicacao-geografica",
  "sebrae-confirma-correalizacao-do-connection-2025",
  "secretario-ronaldo-santini-no-connection-experience",
  "selo-de-origem-do-campo-ao-artesanato-brasil-atinge-142-igs",
  "semana-do-dia-dos-pais-tem-1o-lote-do-connection-experience-prorrogado",
  "sergipe-conquista-segunda-indicacao-geografica-com-artesanato-de-barro-de-santana-do-sao-francisco",
  "sua-empresa-da-dinheiro",
  "ton-zuanazzi-fara-palestra-sobre-estrategias-de-desenvolvimento",
  "tortas-de-carambei-conquistam-indicacao-geografica-e-reforcam-protagonismo-do-parana-no-cenario-nacional",
  "troca-de-experiencias-de-produtos-com-alma-connection-valoriza-itens-com-indicacao-geografica",
  "turismo-alem-dos-pontos-turisticos",
  "uniao-dos-produtores-e-tema-de-destaque-em-gramado",
  "valorizacao-dos-terroirs-do-brasil-e-pauta-em-brasilia",
  "valorizar-produtos-com-indicacao-geografica-no-brasil-uma-corrida-com-dificuldades-que-poucos-estao-vencendo",
  "vindima-um-periodo-para-colher-alegria",
  "vinhos-com-ip-e-do-marcam-presenca-em-evento-sobre-terroirs-brasileiros-em-gramado",
  "vinhos-de-inverno-sao-a-nova-indicacao-geografica-do-pais",
];

const CONCURRENCY = 5;
const DELAY_MS = 500;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Parse HTML and extract blog post data using regex (no external deps)
 */
function extractPostData(html, slug) {
  const post = {
    slug,
    url: `${BASE_URL}/blog/${slug}`,
    title: "",
    date: "",
    author: "",
    readTime: "",
    categories: [],
    featuredImage: "",
    bodyHtml: "",
    bodyText: "",
    images: [],
    extractedAt: new Date().toISOString(),
  };

  // Extract title from og:title or <title> tag
  const ogTitle = html.match(
    /<meta\s+(?:property|name)="og:title"\s+content="([^"]+)"/i
  );
  if (ogTitle) {
    post.title = decodeHtmlEntities(ogTitle[1]);
  } else {
    const titleTag = html.match(/<title>([^<]+)<\/title>/i);
    if (titleTag) {
      post.title = decodeHtmlEntities(titleTag[1]).replace(
        /\s*\|.*$/,
        ""
      );
    }
  }

  // Extract og:image for featured image
  const ogImage = html.match(
    /<meta\s+(?:property|name)="og:image"\s+content="([^"]+)"/i
  );
  if (ogImage) {
    post.featuredImage = ogImage[1];
  }

  // Extract og:description
  const ogDesc = html.match(
    /<meta\s+(?:property|name)="og:description"\s+content="([^"]+)"/i
  );
  if (ogDesc) {
    post.description = decodeHtmlEntities(ogDesc[1]);
  }

  // Extract article:published_time
  const pubTime = html.match(
    /<meta\s+property="article:published_time"\s+content="([^"]+)"/i
  );
  if (pubTime) {
    post.date = pubTime[1];
  }

  // Try to find date in visible text (format: d/m/yyyy or dd/mm/yyyy)
  if (!post.date) {
    const dateMatch = html.match(
      /(\d{1,2}\/\d{1,2}\/\d{4})/
    );
    if (dateMatch) {
      post.date = dateMatch[1];
    }
  }

  // Extract the main content area - Webflow uses .w-richtext for blog body
  const richTextMatch = html.match(
    /<div[^>]*class="[^"]*w-richtext[^"]*"[^>]*>([\s\S]*?)<\/div>\s*(?:<\/div>|<div[^>]*class="(?!.*w-richtext))/i
  );

  if (richTextMatch) {
    post.bodyHtml = richTextMatch[1].trim();
  } else {
    // Fallback: try to find the article/post body by common patterns
    const articleMatch = html.match(
      /<article[^>]*>([\s\S]*?)<\/article>/i
    );
    if (articleMatch) {
      post.bodyHtml = articleMatch[1].trim();
    } else {
      // Try finding content between common blog post markers
      const bodyMatch = html.match(
        /class="[^"]*(?:post-body|blog-content|article-content|rich-text|post-content)[^"]*"[^>]*>([\s\S]*?)<\/div>/i
      );
      if (bodyMatch) {
        post.bodyHtml = bodyMatch[1].trim();
      }
    }
  }

  // Extract all images from the page content
  const imgRegex = /<img[^>]+src="([^"]+)"[^>]*>/gi;
  let imgMatch;
  const seenImages = new Set();
  while ((imgMatch = imgRegex.exec(html)) !== null) {
    const src = imgMatch[1];
    // Only include content images (from Webflow CDN), skip tiny icons/tracking pixels
    if (
      src.includes("website-files.com") &&
      !src.includes("favicon") &&
      !seenImages.has(src)
    ) {
      seenImages.add(src);
      post.images.push({
        url: src,
        alt: (imgMatch[0].match(/alt="([^"]*)"/) || [])[1] || "",
      });
    }
  }

  // Also check for background images in style attributes
  const bgRegex = /background-image:\s*url\(["']?([^"')]+)["']?\)/gi;
  let bgMatch;
  while ((bgMatch = bgRegex.exec(html)) !== null) {
    const src = bgMatch[1];
    if (src.includes("website-files.com") && !seenImages.has(src)) {
      seenImages.add(src);
      post.images.push({ url: src, alt: "" });
    }
  }

  // Also look for srcset images
  const srcsetRegex = /srcset="([^"]+)"/gi;
  let srcsetMatch;
  while ((srcsetMatch = srcsetRegex.exec(html)) !== null) {
    const urls = srcsetMatch[1].split(",").map((s) => s.trim().split(" ")[0]);
    for (const src of urls) {
      if (src.includes("website-files.com") && !seenImages.has(src)) {
        seenImages.add(src);
        post.images.push({ url: src, alt: "" });
      }
    }
  }

  // Convert HTML to plain text for bodyText
  if (post.bodyHtml) {
    post.bodyText = htmlToText(post.bodyHtml);
  }

  return post;
}

function decodeHtmlEntities(str) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, "/")
    .replace(/&aacute;/g, "á")
    .replace(/&eacute;/g, "é")
    .replace(/&iacute;/g, "í")
    .replace(/&oacute;/g, "ó")
    .replace(/&uacute;/g, "ú")
    .replace(/&atilde;/g, "ã")
    .replace(/&otilde;/g, "õ")
    .replace(/&ccedil;/g, "ç")
    .replace(/&Aacute;/g, "Á")
    .replace(/&Eacute;/g, "É")
    .replace(/&Iacute;/g, "Í")
    .replace(/&Oacute;/g, "Ó")
    .replace(/&Uacute;/g, "Ú")
    .replace(/&Atilde;/g, "Ã")
    .replace(/&Otilde;/g, "Õ")
    .replace(/&Ccedil;/g, "Ç")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

function htmlToText(html) {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/h[1-6]>/gi, "\n\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<li[^>]*>/gi, "• ")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/&nbsp;/g, " ")
    .trim();
}

async function loadProgress() {
  try {
    const data = await readFile(PROGRESS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return { completed: [], failed: [] };
  }
}

async function saveProgress(progress) {
  await writeFile(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

async function fetchPost(slug, retries = 3) {
  const url = `${BASE_URL}/blog/${slug}`;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "text/html,application/xhtml+xml",
          "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8",
        },
        signal: AbortSignal.timeout(30000),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const html = await response.text();
      return extractPostData(html, slug);
    } catch (err) {
      if (attempt === retries) {
        throw err;
      }
      console.log(
        `  ⚠ Attempt ${attempt} failed for ${slug}: ${err.message}. Retrying...`
      );
      await sleep(2000 * attempt);
    }
  }
}

async function processChunk(slugs, progress) {
  const results = [];
  for (const slug of slugs) {
    if (progress.completed.includes(slug)) {
      continue;
    }

    try {
      const post = await fetchPost(slug);
      const filePath = path.join(POSTS_DIR, `${slug}.json`);
      await writeFile(filePath, JSON.stringify(post, null, 2));

      progress.completed.push(slug);
      await saveProgress(progress);

      const total = SLUGS.length;
      const done = progress.completed.length;
      console.log(
        `✓ [${done}/${total}] ${post.title || slug}`
      );

      results.push(post);
      await sleep(DELAY_MS);
    } catch (err) {
      console.error(`✗ FAILED: ${slug} - ${err.message}`);
      if (!progress.failed.includes(slug)) {
        progress.failed.push(slug);
      }
      await saveProgress(progress);
    }
  }
  return results;
}

async function main() {
  console.log("=== Connection Blog Scraper ===\n");
  console.log(`Total posts to scrape: ${SLUGS.length}`);

  await mkdir(POSTS_DIR, { recursive: true });
  await mkdir(IMAGES_DIR, { recursive: true });

  const progress = await loadProgress();
  console.log(`Already completed: ${progress.completed.length}`);
  console.log(`Previously failed: ${progress.failed.length}\n`);

  const remaining = SLUGS.filter(
    (s) => !progress.completed.includes(s)
  );

  if (remaining.length === 0) {
    console.log("All posts already scraped!");
  } else {
    console.log(`Scraping ${remaining.length} remaining posts...\n`);

    // Split into concurrent chunks
    const chunkSize = Math.ceil(remaining.length / CONCURRENCY);
    const chunks = [];
    for (let i = 0; i < remaining.length; i += chunkSize) {
      chunks.push(remaining.slice(i, i + chunkSize));
    }

    await Promise.all(
      chunks.map((chunk) => processChunk(chunk, progress))
    );
  }

  // Generate summary
  const summary = {
    totalPosts: SLUGS.length,
    scraped: progress.completed.length,
    failed: progress.failed.length,
    failedSlugs: progress.failed,
    scrapedAt: new Date().toISOString(),
  };

  await writeFile(
    path.join(OUTPUT_DIR, "summary.json"),
    JSON.stringify(summary, null, 2)
  );

  console.log("\n=== Summary ===");
  console.log(`Total: ${summary.totalPosts}`);
  console.log(`Scraped: ${summary.scraped}`);
  console.log(`Failed: ${summary.failed}`);

  if (summary.failed > 0) {
    console.log(`\nFailed slugs:`);
    summary.failedSlugs.forEach((s) => console.log(`  - ${s}`));
  }

  // Generate master index
  const allPosts = [];
  for (const slug of progress.completed) {
    try {
      const data = await readFile(
        path.join(POSTS_DIR, `${slug}.json`),
        "utf-8"
      );
      const post = JSON.parse(data);
      allPosts.push({
        slug: post.slug,
        title: post.title,
        date: post.date,
        author: post.author,
        featuredImage: post.featuredImage,
        url: post.url,
        hasContent: !!post.bodyHtml,
      });
    } catch {
      // skip
    }
  }

  await writeFile(
    path.join(OUTPUT_DIR, "index.json"),
    JSON.stringify(allPosts, null, 2)
  );

  console.log(`\nIndex saved to content/blog-import/index.json`);
}

main().catch(console.error);
