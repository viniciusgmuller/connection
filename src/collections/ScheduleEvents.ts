import type { CollectionConfig } from "payload";

export const ScheduleEvents: CollectionConfig = {
  slug: "schedule-events",
  admin: { useAsTitle: "title" },
  access: { read: () => true },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "date", type: "date", required: true },
    { name: "startTime", type: "text", required: true },
    { name: "endTime", type: "text" },
    { name: "speaker", type: "relationship", relationTo: "speakers" },
    { name: "location", type: "text" },
    {
      name: "type",
      type: "select",
      options: [
        { label: "Palestra", value: "palestra" },
        { label: "Workshop", value: "workshop" },
        { label: "Networking", value: "networking" },
        { label: "Intervalo", value: "break" },
        { label: "Especial", value: "special" },
      ],
    },
    { name: "description", type: "textarea" },
  ],
};
