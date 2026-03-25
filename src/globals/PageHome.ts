import type { GlobalConfig } from "payload";

export const PageHome: GlobalConfig = {
  slug: "page-home",
  access: { read: () => true },
  fields: [
    {
      type: "group",
      name: "hero",
      fields: [
        { name: "headline", type: "text", defaultValue: "Deguste, conheça e sinta os melhores produtos de origem do Brasil." },
        { name: "subtitle", type: "textarea", defaultValue: "O maior evento de produtos de origem do Brasil. Quatro dias de experiências gastronômicas, culturais e de conteúdo em Gramado." },
        { name: "videoUrl", type: "text", defaultValue: "/videos/hero.mp4" },
        { name: "secondaryButtonText", type: "text", defaultValue: "Saiba mais" },
        { name: "secondaryButtonLink", type: "text", defaultValue: "#sobre" },
        {
          type: "group",
          name: "preEventCta",
          fields: [
            { name: "buttonText", type: "text", defaultValue: "Garanta seu Ingresso" },
            { name: "buttonLink", type: "text", defaultValue: "/ingressos" },
          ],
        },
        {
          type: "group",
          name: "duringEventCta",
          fields: [
            { name: "buttonText", type: "text", defaultValue: "Confira a Programação" },
            { name: "buttonLink", type: "text", defaultValue: "/programacao" },
          ],
        },
        {
          type: "group",
          name: "postEventCta",
          fields: [
            { name: "buttonText", type: "text", defaultValue: "Reviva a Experiência" },
            { name: "buttonLink", type: "text", defaultValue: "/blog" },
          ],
        },
      ],
    },
    {
      type: "group",
      name: "seloIG",
      fields: [
        {
          name: "stats",
          type: "array",
          fields: [
            { name: "number", type: "text" },
            { name: "label", type: "text" },
            { name: "suffix", type: "text" },
          ],
        },
      ],
    },
    {
      type: "group",
      name: "credencialCta",
      fields: [
        { name: "headline", type: "text", defaultValue: "Viva o Connection por completo" },
        { name: "description", type: "textarea" },
        {
          name: "benefits",
          type: "array",
          fields: [
            { name: "icon", type: "text" },
            { name: "title", type: "text" },
            { name: "description", type: "textarea" },
          ],
        },
      ],
    },
    {
      type: "group",
      name: "oQueEIG",
      fields: [
        { name: "title", type: "text", defaultValue: "O que é Indicação Geográfica?" },
        { name: "body", type: "richText" },
        { name: "ctaText", type: "text", defaultValue: "Saiba mais" },
        { name: "ctaLink", type: "text", defaultValue: "/conhecer#ig" },
      ],
    },
    {
      type: "group",
      name: "ctaFinal",
      fields: [
        { name: "headline", type: "text" },
        { name: "subtitle", type: "textarea" },
        {
          name: "buttons",
          type: "array",
          fields: [
            { name: "text", type: "text" },
            { name: "link", type: "text" },
            { name: "variant", type: "select", options: ["primary", "outline"] },
          ],
        },
      ],
    },
    {
      type: "group",
      name: "infoPraticas",
      fields: [
        {
          name: "items",
          type: "array",
          fields: [
            { name: "icon", type: "text" },
            { name: "title", type: "text" },
            { name: "detail", type: "text" },
          ],
        },
      ],
    },
  ],
};
