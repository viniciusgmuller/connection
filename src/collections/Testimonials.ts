import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  labels: { singular: "Depoimento", plural: "Depoimentos" },
  admin: { useAsTitle: "name" },
  access: { read: () => true },
  fields: [
    { name: "name", type: "text", required: true, label: "Nome" },
    { name: "role", type: "text", label: "Cargo" },
    { name: "company", type: "text", label: "Empresa" },
    { name: "quote", type: "textarea", required: true, label: "Citação" },
    { name: "photo", type: "upload", relationTo: "media", label: "Foto" },
    {
      name: "axis", type: "select", required: true, label: "Eixo",
      options: [
        { label: "Conhecer", value: "conhecer" },
        { label: "Experimentar", value: "experimentar" },
        { label: "Negociar", value: "negociar" },
      ],
    },
  ],
};
