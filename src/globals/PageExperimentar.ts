import type { GlobalConfig } from "payload";

export const PageExperimentar: GlobalConfig = {
  slug: "page-experimentar",
  access: { read: () => true },
  fields: [
    {
      type: "group",
      name: "hero",
      fields: [
        { name: "subtitle", type: "text", defaultValue: "EIXO 2" },
        { name: "title", type: "text", defaultValue: "Experimentar" },
        { name: "description", type: "textarea" },
      ],
    },
    {
      type: "group",
      name: "features",
      fields: [
        {
          name: "items",
          type: "array",
          fields: [
            { name: "title", type: "text" },
            { name: "description", type: "textarea" },
            { name: "icon", type: "text" },
          ],
        },
      ],
    },
    {
      type: "group",
      name: "experiences",
      fields: [
        { name: "title", type: "text", defaultValue: "Experiências Exclusivas" },
        { name: "subtitle", type: "textarea" },
        {
          name: "cards",
          type: "array",
          fields: [
            { name: "title", type: "text" },
            { name: "description", type: "textarea" },
          ],
        },
      ],
    },
    {
      type: "group",
      name: "productsSection",
      fields: [
        { name: "title", type: "text", defaultValue: "Produtos com Indicação Geográfica" },
        { name: "subtitle", type: "textarea" },
      ],
    },
    {
      type: "group",
      name: "testimonialsSection",
      fields: [
        { name: "title", type: "text", defaultValue: "Experiências reais" },
      ],
    },
    {
      type: "group",
      name: "cta",
      fields: [
        { name: "headline", type: "text", defaultValue: "Pronto para viver experiências únicas?" },
        { name: "buttonText", type: "text", defaultValue: "Garantir meu ingresso" },
        { name: "buttonLink", type: "text", defaultValue: "/ingressos" },
      ],
    },
  ],
};
