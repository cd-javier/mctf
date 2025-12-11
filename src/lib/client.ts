import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: '7bbik5p3',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});
