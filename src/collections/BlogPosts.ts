import type { CollectionConfig } from 'payload';

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: { useAsTitle: 'title' },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'publishedAt', type: 'date' },
    { name: 'status', type: 'select', options: ['draft', 'published'], defaultValue: 'draft' },
    { name: 'author', type: 'relationship', relationTo: 'authors' },
    { name: 'excerpt', type: 'textarea' },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    { name: 'content', type: 'richText' },
    { name: 'legacyHtml', type: 'textarea', admin: { description: 'HTML backup from Webflow import' } },
    { name: 'seo', type: 'group', fields: [
      { name: 'metaTitle', type: 'text' },
      { name: 'metaDescription', type: 'textarea' },
    ]},
  ],
};
