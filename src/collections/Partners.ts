import type { CollectionConfig } from "payload";

export const Partners: CollectionConfig = {
  slug: "partners",
  labels: { singular: "Parceiro", plural: "Parceiros" },
  admin: { useAsTitle: "name" },
  access: { read: () => true },
  fields: [
    { name: "name", type: "text", required: true, label: "Nome" },
    { name: "logo", type: "upload", relationTo: "media", required: true, label: "Logo" },
    { name: "tier", type: "relationship", relationTo: "partner-tiers", required: true, label: "Nível de Parceria" },
    { name: "order", type: "number", defaultValue: 0, label: "Ordem" },
    { name: "website", type: "text", label: "Website" },
  ],
};
