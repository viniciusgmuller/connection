import type { GlobalConfig } from "payload";

export const PageHome: GlobalConfig = {
  slug: "page-home",
  label: "Página Inicial",
  access: { read: () => true },
  fields: [
    {
      type: "group", name: "hero", label: "Hero",
      fields: [
        { name: "headline", type: "text", label: "Manchete", defaultValue: "Deguste, conheça e sinta os melhores produtos de origem do Brasil." },
        { name: "subtitle", type: "textarea", label: "Subtítulo", defaultValue: "O maior evento de produtos de origem do Brasil. Quatro dias de experiências gastronômicas, culturais e de conteúdo em Gramado." },
        { name: "videoUrl", type: "text", label: "URL do Vídeo", defaultValue: "/videos/hero.mp4" },
        { name: "secondaryButtonText", type: "text", label: "Texto Botão Secundário", defaultValue: "Saiba mais" },
        { name: "secondaryButtonLink", type: "text", label: "Link Botão Secundário", defaultValue: "#sobre" },
        { type: "group", name: "preEventCta", label: "CTA Pré-evento", fields: [
          { name: "buttonText", type: "text", label: "Texto do Botão", defaultValue: "Garanta seu Ingresso" },
          { name: "buttonLink", type: "text", label: "Link do Botão", defaultValue: "/ingressos" },
        ]},
        { type: "group", name: "duringEventCta", label: "CTA Durante o Evento", fields: [
          { name: "buttonText", type: "text", label: "Texto do Botão", defaultValue: "Confira a Programação" },
          { name: "buttonLink", type: "text", label: "Link do Botão", defaultValue: "/programacao" },
        ]},
        { type: "group", name: "postEventCta", label: "CTA Pós-evento", fields: [
          { name: "buttonText", type: "text", label: "Texto do Botão", defaultValue: "Reviva a Experiência" },
          { name: "buttonLink", type: "text", label: "Link do Botão", defaultValue: "/blog" },
        ]},
      ],
    },
    {
      type: "group", name: "seloIG", label: "Selo IG",
      fields: [
        { name: "headline", type: "text", label: "Manchete", defaultValue: "A maior vitrine de produtos de origem do Brasil" },
        { name: "stats", type: "array", label: "Estatísticas", fields: [
        { name: "number", type: "text", label: "Número" },
        { name: "label", type: "text", label: "Rótulo" },
        { name: "suffix", type: "text", label: "Sufixo" },
      ]}],
    },
    {
      type: "group", name: "credencialCta", label: "CTA de Credencial",
      fields: [
        { name: "headline", type: "text", label: "Manchete", defaultValue: "Viva o Connection por completo" },
        { name: "description", type: "textarea", label: "Descrição" },
        { name: "benefits", type: "array", label: "Benefícios", fields: [
          { name: "icon", type: "text", label: "Ícone" },
          { name: "title", type: "text", label: "Título" },
          { name: "description", type: "textarea", label: "Descrição" },
        ]},
      ],
    },
    {
      type: "group", name: "oQueEIG", label: "O que é IG",
      fields: [
        { name: "title", type: "text", label: "Título", defaultValue: "O que é Indicação Geográfica?" },
        { name: "body", type: "richText", label: "Corpo" },
        { name: "ctaText", type: "text", label: "Texto do CTA", defaultValue: "Saiba mais" },
        { name: "ctaLink", type: "text", label: "Link do CTA", defaultValue: "/conhecer#ig" },
      ],
    },
    {
      type: "group", name: "ctaFinal", label: "CTA Final",
      fields: [
        { name: "headline", type: "text", label: "Manchete" },
        { name: "subtitle", type: "textarea", label: "Subtítulo" },
        { name: "buttons", type: "array", label: "Botões", fields: [
          { name: "text", type: "text", label: "Texto" },
          { name: "link", type: "text", label: "Link" },
          { name: "variant", type: "select", label: "Variante", options: [{ label: "Primário", value: "primary" }, { label: "Contorno", value: "outline" }] },
        ]},
      ],
    },
    {
      type: "group", name: "infoPraticas", label: "Informações Práticas",
      fields: [{ name: "items", type: "array", label: "Itens", fields: [
        { name: "icon", type: "text", label: "Ícone" },
        { name: "title", type: "text", label: "Título" },
        { name: "detail", type: "text", label: "Detalhe" },
      ]}],
    },
  ],
};
