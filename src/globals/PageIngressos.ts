import type { GlobalConfig } from "payload";

export const PageIngressos: GlobalConfig = {
  slug: "page-ingressos",
  access: { read: () => true },
  fields: [
    {
      type: "group",
      name: "hero",
      fields: [
        { name: "title", type: "text", defaultValue: "Ingressos" },
        { name: "subtitle", type: "textarea" },
      ],
    },
    {
      type: "group",
      name: "groupSales",
      fields: [
        { name: "title", type: "text", defaultValue: "Vendas para Grupos" },
        { name: "description", type: "textarea" },
      ],
    },
    {
      type: "group",
      name: "cta",
      fields: [
        { name: "headline", type: "text" },
        { name: "description", type: "textarea" },
        { name: "buttonText", type: "text" },
        { name: "buttonLink", type: "text" },
      ],
    },
  ],
};
