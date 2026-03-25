import type { GlobalConfig } from "payload";

export const NavigationFooter: GlobalConfig = {
  slug: "navigation-footer",
  access: { read: () => true },
  fields: [
    {
      type: "group",
      name: "navigation",
      fields: [
        {
          name: "menuItems",
          type: "array",
          fields: [
            { name: "label", type: "text" },
            { name: "href", type: "text" },
            {
              name: "subItems",
              type: "array",
              fields: [
                { name: "label", type: "text" },
                { name: "href", type: "text" },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "group",
      name: "footer",
      fields: [
        { name: "tagline", type: "textarea", defaultValue: "Experiências que inspiram, conteúdo que transforma. A maior vitrine de produtos com Indicação Geográfica do Brasil." },
        {
          name: "linkGroups",
          type: "array",
          fields: [
            { name: "title", type: "text" },
            {
              name: "links",
              type: "array",
              fields: [
                { name: "label", type: "text" },
                { name: "href", type: "text" },
              ],
            },
          ],
        },
        {
          name: "socialLinks",
          type: "array",
          fields: [
            {
              name: "platform",
              type: "select",
              options: [
                { label: "Instagram", value: "instagram" },
                { label: "LinkedIn", value: "linkedin" },
                { label: "Facebook", value: "facebook" },
                { label: "YouTube", value: "youtube" },
              ],
            },
            { name: "url", type: "text" },
          ],
        },
        {
          name: "legalLinks",
          type: "array",
          fields: [
            { name: "label", type: "text" },
            { name: "href", type: "text" },
          ],
        },
      ],
    },
  ],
};
