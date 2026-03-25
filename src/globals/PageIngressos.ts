import type { GlobalConfig } from "payload";

export const PageIngressos: GlobalConfig = {
  slug: "page-ingressos",
  label: "Página Ingressos",
  access: { read: () => true },
  fields: [
    { type: "group", name: "hero", label: "Hero", fields: [
      { name: "title", type: "text", label: "Título", defaultValue: "Ingressos" },
      { name: "subtitle", type: "textarea", label: "Subtítulo" },
    ]},
    { type: "group", name: "groupSales", label: "Vendas para Grupos", fields: [
      { name: "title", type: "text", label: "Título", defaultValue: "Vendas para Grupos" },
      { name: "description", type: "textarea", label: "Descrição" },
    ]},
    { type: "group", name: "cta", label: "CTA", fields: [
      { name: "headline", type: "text", label: "Manchete" },
      { name: "description", type: "textarea", label: "Descrição" },
      { name: "buttonText", type: "text", label: "Texto do Botão" },
      { name: "buttonLink", type: "text", label: "Link do Botão" },
    ]},
  ],
};
