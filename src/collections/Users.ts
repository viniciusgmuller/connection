import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Usuário', plural: 'Usuários' },
  auth: true,
  admin: { useAsTitle: 'email' },
  fields: [{ name: 'name', type: 'text', label: 'Nome' }],
};
