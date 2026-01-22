import { client } from './client';

import type { SanityDocument } from '@sanity/client';
import { defineQuery } from 'groq';

const HOMEPAGE_QUERY = defineQuery(`*[_type == "homepage"][0] {
    "hero": {
      "heading": hero_heading,
      "subheading": hero_subheading,
      "imageUrl": hero_image.asset->url,
      "cta": hero_cta
    },

    "wbh": {
      "show": show_WBH_hero,
      "subheading": WBH_subheading,
      "cta": WBH_CTA
    },

    "bio": {
      "snippet": bio_snippet,
      "cta": bio_CTA,
      "imageUrl": bio_image.asset->url
    },

    "testimonials": testimonials[]{quote, person},

    "collabs": {
      "heading": collab_heading,
  
      "collaborations": collaborations[]{
        title,
        subtitle,
        url,
        "imageUrl": image.asset->url,
        platform
      }
    },

    "services": services[]{
      title,
      body,
      cta,
      "imageUrl": image.asset->url
    },

    "contact": {
      "heading": contact_heading,
      "body": contact_body,
      "cta": contact_cta_text,
      "ctaUrl": contact_cta_link,
      "imageUrl": contact_image.asset->url
    },

    "trustedBy": {
      "show": show_trusted_by,
      "companies": trusted_by->companies[]{
        name,
        "logoUrl": image.asset->url
      }
    }
  }`);

const BIO_QUERY = defineQuery(`*[_type == "bio"][0] {
    "hero": {
      heading,
      subheading
    },

    letter,

    quote,

    "proBio": {
      "heading": bio_heading,
      "body": pro_bio
    },

    "certs": {
      "heading": certs_heading,
      "preText": certs_pre,
      certifications[]{title, description},
      "postText": certs_post
    }
  }`);

const SERVICES_QUERY = defineQuery(`*[_type == "services"][0] {
    "hero": {
      heading,
      subheading
    },

    services[]{
      title,
      body,
      "imageUrl": image.asset->url
    },

    "trustedBy": {
      "show": show_trusted_by,
      "companies": trusted_by->companies[]{
        name,
        "logoUrl": image.asset->url
      }
    }
  }`);

const LINKS_QUERY = defineQuery(`*[_type == "links"][0] {
    "social": social_links[]{
      platform,
      url
    },

    "other": other_links[]{
      title,
      description,
      url,
      "imageUrl": image.asset->url
    }
  }`);

const cache = new Map<string, SanityDocument>();

export async function homepageLoader() {
  const cacheKey = 'homepage';

  if (cache.has(cacheKey)) {
    console.log('[cache hit]', cacheKey);
    return cache.get(cacheKey);
  }

  try {
    const data = await client.fetch<SanityDocument>(HOMEPAGE_QUERY);

    if (data) {
      cache.set(cacheKey, data);
      console.log('[cache set]', cacheKey);
      console.log(data);
    }

    return data;
  } catch (err) {
    console.error('Homepage fetch failed:', err);
    throw new Response('Failed to load homepage', { status: 500 });
  }
}

export async function bioLoader() {
  const cacheKey = 'bio';

  if (cache.has(cacheKey)) {
    console.log('[cache hit]', cacheKey);
    return cacheKey;
  }

  try {
    const data = await client.fetch<SanityDocument>(BIO_QUERY);

    if (data) {
      cache.set(cacheKey, data);
      console.log('[cache set]', cacheKey);
    }

    return data;
  } catch (err) {
    console.error('Bio fetch failed:', err);
    throw new Response('Failed to load bio', { status: 500 });
  }
}

export async function servicesLoader() {
  const cacheKey = 'services';

  if (cache.has(cacheKey)) {
    console.log('[cache hit]', cacheKey);
    return cacheKey;
  }

  try {
    const data = await client.fetch<SanityDocument>(SERVICES_QUERY);

    if (data) {
      cache.set(cacheKey, data);
      console.log('[cache set]', cacheKey);
    }

    return data;
  } catch (err) {
    console.error('Services fetch failed:', err);
    throw new Response('Failed to load services', { status: 500 });
  }
}

export async function linksLoader() {
  const cacheKey = 'links';

  if (cache.has(cacheKey)) {
    console.log('[cache hit]', cacheKey);
    return cacheKey;
  }

  try {
    const data = await client.fetch<SanityDocument>(LINKS_QUERY);

    if (data) {
      cache.set(cacheKey, data);
      console.log('[cache set]', cacheKey);
    }

    return data;
  } catch (err) {
    console.error('Links fetch failed:', err);
    throw new Response('Failed to load links', { status: 500 });
  }
}
