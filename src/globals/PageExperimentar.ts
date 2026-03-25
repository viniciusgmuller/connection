import type { GlobalConfig } from "payload";

export const PageExperimentar: GlobalConfig = {
  slug: "page-experimentar",
  label: "Página Experimentar",
  access: { read: () => true },
  fields: [
    { type: "group", name: "hero", label: "Hero", fields: [
      { name: "subtitle", type: "text", label: "Subtítulo", defaultValue: "EIXO 2" },
      { name: "title", type: "text", label: "Título", defaultValue: "Experimentar" },
      { name: "description", type: "textarea", label: "Descrição" },
    ]},
    { type: "group", name: "features", label: "Características", fields: [
      { name: "items", type: "array", label: "Itens", fields: [
        { name: "title", type: "text", label: "Título" },
        { name: "description", type: "textarea", label: "Descrição" },
        { name: "icon", type: "text", label: "Ícone" },
      ]},
    ]},
    { type: "group", name: "experiences", label: "Experiências", fields: [
      { name: "title", type: "text", label: "Título", defaultValue: "Experiências Exclusivas" },
      { name: "subtitle", type: "textarea", label: "Subtítulo" },
      { name: "cards", type: "array", label: "Cartões", fields: [
        { name: "title", type: "text", label: "Título" },
        { name: "description", type: "textarea", label: "Descrição" },
      ]},
    ]},
    { type: "group", name: "productsSection", label: "Seção de Produtos", fields: [
      { name: "title", type: "text", label: "Título", defaultValue: "Produtos com Indicação Geográfica" },
      { name: "subtitle", type: "textarea", label: "Subtítulo" },
    ]},
    { type: "group", name: "testimonialsSection", label: "Seção de Depoimentos", fields: [
      { name: "title", type: "text", label: "Título", defaultValue: "Experiências reais" },
    ]},
    { type: "group", name: "cta", label: "CTA", fields: [
      { name: "headline", type: "text", label: "Manchete", defaultValue: "Pronto para viver experiências únicas?" },
      { name: "buttonText", type: "text", label: "Texto do Botão", defaultValue: "Garantir meu ingresso" },
      { name: "buttonLink", type: "text", label: "Link do Botão", defaultValue: "/ingressos" },
    ]},
  ],
};
