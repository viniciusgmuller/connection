import type { CollectionConfig } from "payload";

export const ScheduleEvents: CollectionConfig = {
  slug: "schedule-events",
  labels: { singular: "Evento da Programação", plural: "Eventos da Programação" },
  admin: { useAsTitle: "title" },
  access: { read: () => true },
  fields: [
    { name: "title", type: "text", required: true, label: "Título" },
    { name: "date", type: "date", required: true, label: "Data" },
    { name: "startTime", type: "text", required: true, label: "Horário de Início" },
    { name: "endTime", type: "text", label: "Horário de Término" },
    { name: "speaker", type: "relationship", relationTo: "speakers", label: "Palestrante" },
    { name: "location", type: "text", label: "Local" },
    {
      name: "type", type: "select", label: "Tipo",
      options: [
        { label: "Palestra", value: "palestra" },
        { label: "Workshop", value: "workshop" },
        { label: "Networking", value: "networking" },
        { label: "Intervalo", value: "break" },
        { label: "Especial", value: "special" },
      ],
    },
    { name: "description", type: "textarea", label: "Descrição" },
  ],
};
