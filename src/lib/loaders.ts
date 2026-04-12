import { client } from './client';

import type { SanityDocument } from '@sanity/client';
import { defineQuery } from 'groq';

const HOMEPAGE_QUERY = defineQuery(`*[_type == "homepage"][0] {
    "hero": {
      "heading": hero_heading,
      "subheading": hero_subheading,
      "image": hero_image { asset->, hotspot, crop },
      "cta": hero_cta,
      "ctaUrl": hero_cta_link
    },

    "wbh": {
      "show": show_WBH_hero,
      "subheading": WBH_subheading,
      "cta": WBH_CTA,
      "ctaUrl": WBH_CTA_link
    },

    "bio": {
      "snippet": bio_snippet,
      "cta": bio_CTA,
      "image": bio_image { asset->, hotspot, crop }
    },

    "testimonials": testimonials[]{quote, person},

    "collabs": {
      "heading": collab_heading,
  
      "collaborations": collaborations[]{
        title,
        subtitle,
        url,
        "image": image { asset->, hotspot, crop },
        platform
      }
    },

    "services": services[]{
      title,
      body,
      cta,
      "ctaUrl": cta_link,
      "image": image { asset->, hotspot, crop }
    },

    "contact": {
      "heading": contact_heading,
      "body": contact_body,
      "cta": contact_cta_text,
      "ctaUrl": contact_cta_link,
      "image": contact_image { asset->, hotspot, crop }
    },

    "trustedBy": {
      "show": show_trusted_by,
      "companies": trusted_by->companies[]{
        name,
        "logo": image { asset->, hotspot, crop }
      }
    }
  }`);

const BIO_QUERY = defineQuery(`*[_type == "bio"][0] {
    "hero": {
      heading,
      subheading,
      "image": hero_image { asset->, hotspot, crop }
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
    "whyWorkWithMe": {
      "heading": why_work_with_me_heading,
      "body": why_work_with_me_body
    },

    "hero": {
      heading,
      subheading,
      "image": hero_image { asset->, hotspot, crop }
    },

    services[]{
      title,
      body,
      "image": image { asset->, hotspot, crop },
      "cta": cta_text,
      "ctaUrl": cta_link
    },

    "trustedBy": {
      "show": show_trusted_by,
      "companies": trusted_by->companies[]{
        name,
        "logo": image { asset->, hotspot, crop }
      }
    },

    "cta": {
      "heading": cta_heading,
      "body": cta_body,
      "buttonText": cta_button_text,
      "buttonLink": cta_button_link
    }
  }`);

const LINKS_QUERY = defineQuery(`*[_type == "links"][0] {
    "profilePhoto": profile_photo { asset->, hotspot, crop },

    "links": other_links[]{
      title,
      url,
      "image": image { asset->, hotspot, crop }
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
    return cache.get(cacheKey);
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
    return cache.get(cacheKey);
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
    return cache.get(cacheKey);
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
