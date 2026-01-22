import { createImageUrlBuilder } from '@sanity/image-url';
import { client } from './client';

const builder = createImageUrlBuilder(client);

export function imgUrl(source: string) {
  return builder.image(source);
}
