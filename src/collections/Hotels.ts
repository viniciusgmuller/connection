import type { CollectionConfig } from "payload";

export const Hotels: CollectionConfig = {
  slug: "hotels",
  labels: { singular: "Hotel", plural: "Hotéis" },
  admin: { useAsTitle: "name" },
  access: { read: () => true },
  fields: [
    { name: "name", type: "text", required: true, label: "Nome" },
    { name: "image", type: "upload", relationTo: "media", label: "Foto" },
    { name: "description", type: "textarea", label: "Descrição" },
    { name: "address", type: "text", label: "Endereço" },
    { name: "distance", type: "text", label: "Distância do Evento", admin: { description: 'Ex: "2,3 km do evento"' } },
    { name: "phone", type: "text", label: "Telefone" },
    { name: "website", type: "text", label: "Site / Link de Reserva" },
    { name: "priceRange", type: "select", label: "Faixa de Preço", options: [
      { label: "$", value: "$" },
      { label: "$$", value: "$$" },
      { label: "$$$", value: "$$$" },
      { label: "$$$$", value: "$$$$" },
    ]},
    { name: "order", type: "number", defaultValue: 0, label: "Ordem" },
  ],
};
