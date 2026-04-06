import type { CollectionConfig } from "payload";

export const Experiences: CollectionConfig = {
  slug: "experiences",
  labels: { singular: "Parque / Experiência", plural: "Parques e Experiências" },
  admin: { useAsTitle: "name" },
  access: { read: () => true },
  fields: [
    { name: "name", type: "text", required: true, label: "Nome" },
    { name: "logo", type: "upload", relationTo: "media", required: true, label: "Logotipo" },
    { name: "description", type: "textarea", label: "Descrição" },
    { name: "website", type: "text", label: "Link / Website" },
    { name: "order", type: "number", defaultValue: 0, label: "Ordem" },
  ],
};
