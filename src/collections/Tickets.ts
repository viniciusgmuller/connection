import type { CollectionConfig } from "payload";

export const Tickets: CollectionConfig = {
  slug: "tickets",
  admin: { useAsTitle: "name" },
  access: { read: () => true },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "price", type: "number", required: true },
    { name: "previousPrice", type: "number" },
    { name: "description", type: "text" },
    {
      name: "features",
      type: "array",
      fields: [{ name: "feature", type: "text" }],
    },
    { name: "highlighted", type: "checkbox", defaultValue: false },
    { name: "order", type: "number", defaultValue: 0 },
  ],
};
