import type { PageMeta } from './usePageData';

export const SEO: Record<string, PageMeta> = {
  home: {
    title: 'Matthew CT Fuller | Coach, Speaker, and Wellbeing Advocate',
    description:
      'Matthew CT Fuller is a certified coach and speaker, and wellbeing advocate, helping people close the gap between knowing what to do and actually doing it.',
    path: '/',
  },
  about: {
    title: 'About | Matthew CT Fuller',
    description:
      "Matthew CT Fuller's background in coaching, psychology, and performance — plus the honest admission that he doesn't always practice what he preaches.",
    path: '/about',
  },
  services: {
    title: 'Services | Matthew CT Fuller',
    description:
      'One-to-one coaching, group programmes, and keynote speaking from Matthew CT Fuller. Built for people who want real change, not just motivation.',
    path: '/services',
  },
  links: {
    title: 'Matthew CT Fuller | Instagram, TikTok, LinkedIn & More',
    description:
      'Find Matthew CT Fuller on Instagram, TikTok, and LinkedIn. Plus links to his latest content, programmes, and the Wellbeing Hypocrite Club.',
    path: '/links',
  },
} as const;
