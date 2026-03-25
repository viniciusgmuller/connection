import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  admin: { useAsTitle: "name" },
  access: { read: () => true },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "origin", type: "text" },
    { name: "state", type: "text" },
    { name: "description", type: "textarea" },
    { name: "category", type: "relationship", relationTo: "product-categories", required: true },
    { name: "image", type: "upload", relationTo: "media" },
  ],
};
