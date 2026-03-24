import type { CollectionConfig } from "payload";

export const BlogPosts: CollectionConfig = {
  slug: "blog-posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "publishedAt", "status"],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
        date: {
          pickerAppearance: "dayOnly",
          displayFormat: "dd/MM/yyyy",
        },
      },
    },
    {
      name: "status",
      type: "select",
      defaultValue: "draft",
      options: [
        { label: "Rascunho", value: "draft" },
        { label: "Publicado", value: "published" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "author",
      type: "text",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "excerpt",
      type: "textarea",
      admin: {
        description: "Resumo do post para listagens e SEO",
      },
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "content",
      type: "richText",
    },
    {
      name: "legacyHtml",
      type: "textarea",
      admin: {
        description: "HTML original importado do Webflow (backup)",
        condition: (data) => Boolean(data?.legacyHtml),
      },
    },
    {
      name: "seo",
      type: "group",
      fields: [
        {
          name: "metaTitle",
          type: "text",
        },
        {
          name: "metaDescription",
          type: "textarea",
        },
      ],
    },
  ],
};
