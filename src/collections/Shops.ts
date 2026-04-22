import type { CollectionConfig } from "payload";

export const Shops: CollectionConfig = {
  slug: "shops",
  labels: { singular: "Loja", plural: "Lojas" },
  admin: { useAsTitle: "name" },
  access: { read: () => true },
  fields: [
    { name: "name", type: "text", required: true, label: "Nome" },
    { name: "logo", type: "upload", relationTo: "media", label: "Logo / Foto" },
    { name: "description", type: "textarea", label: "Descrição" },
    { name: "category", type: "text", label: "Categoria", admin: { description: 'Ex: "Vinhos", "Queijos", "Artesanato"' } },
    { name: "address", type: "text", label: "Endereço / Localização no evento" },
    { name: "phone", type: "text", label: "Telefone" },
    { name: "website", type: "text", label: "Site / Redes sociais" },
    { name: "order", type: "number", defaultValue: 0, label: "Ordem" },
  ],
};
