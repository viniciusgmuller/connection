import type { CollectionConfig } from "payload";

export const Authors: CollectionConfig = {
  slug: "authors",
  admin: { useAsTitle: "name" },
  access: { read: () => true },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "photo", type: "upload", relationTo: "media" },
    { name: "bio", type: "textarea" },
    { name: "role", type: "text" },
  ],
};
