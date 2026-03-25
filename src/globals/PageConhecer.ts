import type { GlobalConfig } from "payload";

export const PageConhecer: GlobalConfig = {
  slug: "page-conhecer",
  access: { read: () => true },
  fields: [
    {
      type: "group",
      name: "hero",
      fields: [
        { name: "subtitle", type: "text", defaultValue: "EIXO 1" },
        { name: "title", type: "text", defaultValue: "Conhecer" },
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
      name: "speakersSection",
      fields: [
        { name: "title", type: "text", defaultValue: "Palestrantes" },
        { name: "subtitle", type: "textarea" },
      ],
    },
    {
      type: "group",
      name: "testimonialsSection",
      fields: [
        { name: "title", type: "text", defaultValue: "O que dizem os participantes" },
      ],
    },
    {
      type: "group",
      name: "cta",
      fields: [
        { name: "headline", type: "text", defaultValue: "Pronto para transformar seu conhecimento?" },
        { name: "buttonText", type: "text", defaultValue: "Garantir meu ingresso" },
        { name: "buttonLink", type: "text", defaultValue: "/ingressos" },
      ],
    },
  ],
};
