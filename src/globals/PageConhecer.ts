import type { GlobalConfig } from "payload";

export const PageConhecer: GlobalConfig = {
  slug: "page-conhecer",
  label: "Página Conhecer",
  access: { read: () => true },
  fields: [
    { type: "group", name: "hero", label: "Hero", fields: [
      { name: "subtitle", type: "text", label: "Subtítulo", defaultValue: "EIXO 1" },
      { name: "title", type: "text", label: "Título", defaultValue: "Conhecer" },
      { name: "description", type: "textarea", label: "Descrição" },
    ]},
    { type: "group", name: "features", label: "Características", fields: [
      { name: "items", type: "array", label: "Itens", fields: [
        { name: "title", type: "text", label: "Título" },
        { name: "description", type: "textarea", label: "Descrição" },
        { name: "icon", type: "text", label: "Ícone" },
      ]},
    ]},
    { type: "group", name: "speakersSection", label: "Seção de Palestrantes", fields: [
      { name: "visible", type: "checkbox", label: "Visível", defaultValue: true },
      { name: "title", type: "text", label: "Título", defaultValue: "Palestrantes" },
      { name: "subtitle", type: "textarea", label: "Subtítulo" },
    ]},
    { type: "group", name: "testimonialsSection", label: "Seção de Depoimentos", fields: [
      { name: "title", type: "text", label: "Título", defaultValue: "O que dizem os participantes" },
    ]},
    { type: "group", name: "cta", label: "CTA", fields: [
      { name: "headline", type: "text", label: "Manchete", defaultValue: "Pronto para transformar seu conhecimento?" },
      { name: "buttonText", type: "text", label: "Texto do Botão", defaultValue: "Garantir meu ingresso" },
      { name: "buttonLink", type: "text", label: "Link do Botão", defaultValue: "/ingressos" },
    ]},
  ],
};
