import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: { useAsTitle: "name" },
  access: { read: () => true },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "role", type: "text" },
    { name: "company", type: "text" },
    { name: "quote", type: "textarea", required: true },
    { name: "photo", type: "upload", relationTo: "media" },
    {
      name: "axis",
      type: "select",
      required: true,
      options: [
        { label: "Conhecer", value: "conhecer" },
        { label: "Experimentar", value: "experimentar" },
        { label: "Negociar", value: "negociar" },
      ],
    },
  ],
};
