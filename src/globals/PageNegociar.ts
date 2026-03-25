import type { GlobalConfig } from "payload";

export const PageNegociar: GlobalConfig = {
  slug: "page-negociar",
  access: { read: () => true },
  fields: [
    {
      type: "group",
      name: "hero",
      fields: [
        { name: "subtitle", type: "text", defaultValue: "EIXO 3" },
        { name: "title", type: "text", defaultValue: "Negociar" },
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
      name: "benefits",
      fields: [
        { name: "title", type: "text", defaultValue: "Benefícios para você" },
        {
          name: "groups",
          type: "array",
          fields: [
            { name: "title", type: "text" },
            { name: "image", type: "upload", relationTo: "media" },
            {
              name: "items",
              type: "array",
              fields: [{ name: "text", type: "text" }],
            },
            { name: "ctaText", type: "text" },
            { name: "ctaLink", type: "text" },
          ],
        },
      ],
    },
    {
      type: "group",
      name: "process",
      fields: [
        { name: "title", type: "text", defaultValue: "Como funcionam as Rodadas de Negócio" },
        {
          name: "steps",
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
      name: "testimonialsSection",
      fields: [
        { name: "title", type: "text", defaultValue: "Resultados reais" },
      ],
    },
    {
      type: "group",
      name: "cta",
      fields: [
        { name: "headline", type: "text", defaultValue: "Pronto para expandir seus negócios?" },
        { name: "description", type: "textarea" },
        { name: "buttonText", type: "text", defaultValue: "Quero participar" },
        { name: "buttonLink", type: "text", defaultValue: "/ingressos" },
        { name: "contactEmail", type: "text" },
        { name: "contactButtonText", type: "text", defaultValue: "Falar com nossa equipe" },
      ],
    },
  ],
};
