import type { CollectionConfig } from "payload";

export const PartnerTiers: CollectionConfig = {
  slug: "partner-tiers",
  admin: { useAsTitle: "name" },
  access: { read: () => true },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "order", type: "number", defaultValue: 0 },
  ],
};
