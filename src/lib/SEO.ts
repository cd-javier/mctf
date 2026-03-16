import type { PageMeta } from './usePageData';

export const SEO: Record<string, PageMeta> = {
  home: {
    title: 'Matthew CT Fuller | Coach, Speaker, and Wellbeing Advocate',
    description:
      'Matthew CT Fuller is an ICF-accredited coach, speaker, and behavioural change expert helping individuals and organisations create meaningful change in performance, wellbeing, and life.',
    path: '/',
  },
  about: {
    title: 'About | Matthew CT Fuller',
    description:
      'Matthew CT Fuller is an ICF-accredited coach, behavioural change specialist, and drug and alcohol practitioner. His work draws on experience in coaching, addiction recovery, LGBTQ+ wellbeing, and performance psychology to help people create meaningful and sustainable change.',
    path: '/about',
  },
  services: {
    title: 'Services | Matthew CT Fuller',
    description:
      'Matthew CT Fuller provides one-to-one coaching, group programmes, wellbeing workshops, and keynote speaking designed to help individuals and organisations create lasting behavioural change.',
    path: '/services',
  },
  links: {
    title: 'Matthew CT Fuller | Instagram, TikTok, LinkedIn & More',
    description:
      'Find Matthew CT Fuller on Instagram, TikTok, and LinkedIn. Plus links to his latest content, programmes, and the Wellbeing Hypocrite Club.',
    path: '/links',
  },
} as const;
