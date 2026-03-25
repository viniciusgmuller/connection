import type { CollectionConfig } from "payload";

export const Partners: CollectionConfig = {
  slug: "partners",
  admin: { useAsTitle: "name" },
  access: { read: () => true },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "logo", type: "upload", relationTo: "media", required: true },
    { name: "tier", type: "relationship", relationTo: "partner-tiers", required: true },
    { name: "order", type: "number", defaultValue: 0 },
    { name: "website", type: "text" },
  ],
};
