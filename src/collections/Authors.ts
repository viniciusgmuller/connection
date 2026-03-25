import type { CollectionConfig } from "payload";

export const Authors: CollectionConfig = {
  slug: "authors",
  labels: { singular: "Autor", plural: "Autores" },
  admin: { useAsTitle: "name" },
  access: { read: () => true },
  fields: [
    { name: "name", type: "text", required: true, label: "Nome" },
    { name: "photo", type: "upload", relationTo: "media", label: "Foto" },
    { name: "bio", type: "textarea", label: "Biografia" },
    { name: "role", type: "text", label: "Função" },
  ],
};
