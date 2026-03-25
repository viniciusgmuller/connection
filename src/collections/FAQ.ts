import type { CollectionConfig } from "payload";

export const FAQ: CollectionConfig = {
  slug: "faq",
  admin: { useAsTitle: "question" },
  access: { read: () => true },
  fields: [
    { name: "question", type: "text", required: true },
    { name: "answer", type: "richText", required: true },
    { name: "order", type: "number", defaultValue: 0 },
  ],
};
