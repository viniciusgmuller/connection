import type { CollectionConfig } from "payload";

export const PartnerTiers: CollectionConfig = {
  slug: "partner-tiers",
  labels: { singular: "Nível de Parceria", plural: "Níveis de Parceria" },
  admin: { useAsTitle: "name" },
  access: { read: () => true },
  fields: [
    { name: "name", type: "text", required: true, label: "Nome" },
    { name: "order", type: "number", defaultValue: 0, label: "Ordem" },
  ],
};
