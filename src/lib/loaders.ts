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

// FOR DEV ONLY
const homepageData = {
  bio: {
    cta: 'More about me',
    imageUrl:
      'https://cdn.sanity.io/images/7bbik5p3/production/98fe0b80511725d72216f7e19f29eb75489f3b9f-4754x3169.jpg',
    snippet:
      "I’m Matthew — a Change & Accountability Coach, speaker, and queer wellbeing advocate. My work helps people get clear, connected, and courageous in their personal or professional lives. Whether it's sobriety, leadership, or navigating messy transitions, I bring both sharp strategy and big-hearted compassion.",
  },
  collabs: {
    collaborations: [
      {
        imageUrl:
          'https://cdn.sanity.io/images/7bbik5p3/production/c0b86499284c6f3655175702f3896efb7c7266af-3091x2048.jpg',
        platform: 'spotify',
        subtitle: 'Subtitle',
        title: 'Title',
      },
      {
        imageUrl:
          'https://cdn.sanity.io/images/7bbik5p3/production/c0b86499284c6f3655175702f3896efb7c7266af-3091x2048.jpg',
        platform: 'instagram',
        subtitle: 'Subtitle',
        title: 'Title',
      },
      {
        imageUrl:
          'https://cdn.sanity.io/images/7bbik5p3/production/c0b86499284c6f3655175702f3896efb7c7266af-3091x2048.jpg',
        platform: 'youtube',
        subtitle: 'Subtitle',
        title: 'Title',
      },
    ],
    heading: 'Collaborations',
  },
  hero: {
    cta: 'Explore My Work',
    heading: 'Compassion meets accountability. Growth that actually sticks.',
    imageUrl:
      'https://cdn.sanity.io/images/7bbik5p3/production/8835aacb323208338d0c11cb833b56ae3210574f-2000x1333.jpg',
    subheading:
      'Coach, speaker, and wellbeing advocate — helping people take brave steps through clarity, compassion, and strategic change.',
  },
  services: [
    {
      body: 'Level up, reset, or re-align with 1:1 and group coaching that blends science, strategy, and soul.',
      cta: 'Learn More',
      imageUrl:
        'https://cdn.sanity.io/images/7bbik5p3/production/d30684e6df012351cb84d08b7f8f47200701413d-3091x2048.jpg',
      title: 'Coaching',
    },
    {
      body: 'Judgement-free, specialist support for those navigating substance use, chemsex, or recovery. Real talk, real change.',
      cta: 'Find Out How',
      imageUrl:
        'https://cdn.sanity.io/images/7bbik5p3/production/d30684e6df012351cb84d08b7f8f47200701413d-3091x2048.jpg',
      title: 'Sobriety Coaching',
    },
    {
      body: 'Book me to speak with insight and impact on topics like chemsex, wellbeing, and allyship.',
      cta: 'Explore Topics',
      imageUrl:
        'https://cdn.sanity.io/images/7bbik5p3/production/d30684e6df012351cb84d08b7f8f47200701413d-3091x2048.jpg',
      title: 'Speaking & Advocacy',
    },
  ],
  testimonials: [
    {
      person: 'Daniele, Belgium',
      quote:
        'He engages with you with compassion and authenticity, kindly prompts you to challenge your old beliefs, and encourages you (with empathy) to take small positive actions every day.',
    },
    {
      person: 'Alex Johnson, USA',
      quote:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      person: 'Li Wei, China',
      quote:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      person: 'John Smith, UK',
      quote:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
  ],
  trustedBy: {
    companies: [
      {
        logoUrl:
          'https://cdn.sanity.io/images/7bbik5p3/production/a5c91d1b367e9273684734458bef0c2a00bb39de-1206x364.png',
        name: 'Amazon',
      },
      {
        logoUrl:
          'https://cdn.sanity.io/images/7bbik5p3/production/08cbd3a4592e5898620a738675128311250ca9c2-3000x1250.png',
        name: 'Google',
      },
    ],
    show: true,
  },
  wbh: {
    cta: 'Join the club',
    show: true,
    subheading:
      'A space for wellbeing professionals to connect, vent, and find support—without pretending to have it all together.',
  },
};
cache.set('homepage', homepageData);
//

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
