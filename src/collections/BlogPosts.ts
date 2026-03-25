import type { CollectionConfig } from 'payload';

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  labels: { singular: 'Artigo de Blog', plural: 'Artigos de Blog' },
  admin: { useAsTitle: 'title' },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Título' },
    { name: 'slug', type: 'text', required: true, unique: true, label: 'URL Amigável (Slug)' },
    { name: 'publishedAt', type: 'date', label: 'Data de Publicação' },
    { name: 'status', type: 'select', label: 'Status', options: [{ label: 'Rascunho', value: 'draft' }, { label: 'Publicado', value: 'published' }], defaultValue: 'draft' },
    { name: 'authorRef', type: 'relationship', relationTo: 'authors', label: 'Autor' },
    { name: 'author', type: 'text', label: 'Autor (Legado)', admin: { description: 'Campo de texto legado - use o campo Autor acima para novos posts' } },
    { name: 'excerpt', type: 'textarea', label: 'Resumo' },
    { name: 'featuredImage', type: 'upload', relationTo: 'media', label: 'Imagem Destaque' },
    { name: 'content', type: 'richText', label: 'Conteúdo' },
    { name: 'legacyHtml', type: 'textarea', label: 'Backup HTML (Legado)', admin: { description: 'HTML importado do Webflow' } },
    { name: 'seo', type: 'group', label: 'SEO', fields: [
      { name: 'metaTitle', type: 'text', label: 'Meta Título' },
      { name: 'metaDescription', type: 'textarea', label: 'Meta Descrição' },
    ]},
  ],
};
