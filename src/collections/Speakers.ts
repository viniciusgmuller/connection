import type { CollectionConfig } from "payload";

export const Speakers: CollectionConfig = {
  slug: "speakers",
  labels: { singular: "Palestrante", plural: "Palestrantes" },
  admin: { useAsTitle: "name" },
  access: { read: () => true },
  fields: [
    { name: "name", type: "text", required: true, label: "Nome" },
    { name: "title", type: "text", label: "Cargo/Título" },
    { name: "bio", type: "textarea", label: "Biografia" },
    { name: "photo", type: "upload", relationTo: "media", label: "Foto" },
    { name: "credentials", type: "array", label: "Credenciais", fields: [{ name: "credential", type: "text", label: "Credencial" }] },
    { name: "order", type: "number", defaultValue: 0, label: "Ordem" },
  ],
};
