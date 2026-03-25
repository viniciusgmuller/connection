import type { CollectionConfig } from "payload";

export const Speakers: CollectionConfig = {
  slug: "speakers",
  admin: { useAsTitle: "name" },
  access: { read: () => true },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "title", type: "text" },
    { name: "bio", type: "textarea" },
    { name: "photo", type: "upload", relationTo: "media" },
    {
      name: "credentials",
      type: "array",
      fields: [{ name: "credential", type: "text" }],
    },
    { name: "order", type: "number", defaultValue: 0 },
  ],
};
