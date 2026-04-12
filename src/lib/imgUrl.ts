import { createImageUrlBuilder } from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';
import { client } from './client';

const builder = createImageUrlBuilder(client);

export function imgUrl(source: SanityImageSource) {
  return builder.image(source);
}

export function sanitySrcSet(
  source: SanityImageSource,
  widths: number[],
  height?: number,
): string {
  return widths
    .map((w) => {
      let img = builder.image(source).width(w).format('webp');
      if (height) img = img.height(height);
      return `${img.url()} ${w}w`;
    })
    .join(', ');
}
