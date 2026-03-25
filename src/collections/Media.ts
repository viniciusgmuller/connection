import path from 'path';
import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Mídia', plural: 'Mídias' },
  upload: {
    mimeTypes: ['image/*', 'video/*', 'application/pdf'],
    staticDir: path.resolve(process.cwd(), 'public/media'),
  },
  admin: { useAsTitle: 'alt' },
  access: {
    read: () => true,
  },
  fields: [{ name: 'alt', type: 'text', required: true, label: 'Texto Alternativo' }],
};
