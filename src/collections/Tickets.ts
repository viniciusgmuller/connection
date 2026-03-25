import type { CollectionConfig } from "payload";

export const Tickets: CollectionConfig = {
  slug: "tickets",
  labels: { singular: "Ingresso", plural: "Ingressos" },
  admin: { useAsTitle: "name" },
  access: { read: () => true },
  fields: [
    { name: "name", type: "text", required: true, label: "Nome" },
    { name: "price", type: "number", required: true, label: "Preço" },
    { name: "previousPrice", type: "number", label: "Preço Anterior" },
    { name: "description", type: "text", label: "Descrição" },
    { name: "features", type: "array", label: "Benefícios", fields: [{ name: "feature", type: "text", label: "Benefício" }] },
    { name: "highlighted", type: "checkbox", defaultValue: false, label: "Destacado" },
    { name: "order", type: "number", defaultValue: 0, label: "Ordem" },
  ],
};
