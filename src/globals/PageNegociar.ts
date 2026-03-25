import type { GlobalConfig } from "payload";

export const PageNegociar: GlobalConfig = {
  slug: "page-negociar",
  label: "Página Negociar",
  access: { read: () => true },
  fields: [
    { type: "group", name: "hero", label: "Hero", fields: [
      { name: "subtitle", type: "text", label: "Subtítulo", defaultValue: "EIXO 3" },
      { name: "title", type: "text", label: "Título", defaultValue: "Negociar" },
      { name: "description", type: "textarea", label: "Descrição" },
    ]},
    { type: "group", name: "features", label: "Características", fields: [
      { name: "items", type: "array", label: "Itens", fields: [
        { name: "title", type: "text", label: "Título" },
        { name: "description", type: "textarea", label: "Descrição" },
        { name: "icon", type: "text", label: "Ícone" },
      ]},
    ]},
    { type: "group", name: "benefits", label: "Benefícios", fields: [
      { name: "title", type: "text", label: "Título", defaultValue: "Benefícios para você" },
      { name: "groups", type: "array", label: "Grupos", fields: [
        { name: "title", type: "text", label: "Título" },
        { name: "image", type: "upload", relationTo: "media", label: "Imagem" },
        { name: "items", type: "array", label: "Itens", fields: [{ name: "text", type: "text", label: "Texto" }] },
        { name: "ctaText", type: "text", label: "Texto do CTA" },
        { name: "ctaLink", type: "text", label: "Link do CTA" },
      ]},
    ]},
    { type: "group", name: "process", label: "Processo", fields: [
      { name: "title", type: "text", label: "Título", defaultValue: "Como funcionam as Rodadas de Negócio" },
      { name: "steps", type: "array", label: "Passos", fields: [
        { name: "title", type: "text", label: "Título" },
        { name: "description", type: "textarea", label: "Descrição" },
      ]},
    ]},
    { type: "group", name: "testimonialsSection", label: "Seção de Depoimentos", fields: [
      { name: "title", type: "text", label: "Título", defaultValue: "Resultados reais" },
    ]},
    { type: "group", name: "cta", label: "CTA", fields: [
      { name: "headline", type: "text", label: "Manchete", defaultValue: "Pronto para expandir seus negócios?" },
      { name: "description", type: "textarea", label: "Descrição" },
      { name: "buttonText", type: "text", label: "Texto do Botão", defaultValue: "Quero participar" },
      { name: "buttonLink", type: "text", label: "Link do Botão", defaultValue: "/ingressos" },
      { name: "contactEmail", type: "text", label: "Email de Contato" },
      { name: "contactButtonText", type: "text", label: "Texto do Botão de Contato", defaultValue: "Falar com nossa equipe" },
    ]},
  ],
};
