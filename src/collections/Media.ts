import path from 'path';
import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    mimeTypes: ['image/*', 'video/*', 'application/pdf'],
    staticDir: path.resolve(process.cwd(), 'public/media'),
  },
  admin: { useAsTitle: 'alt' },
  access: {
    read: () => true,
  },
  fields: [{ name: 'alt', type: 'text', required: true }],
};
