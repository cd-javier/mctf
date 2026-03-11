import { useEffect } from 'react';

const BASE_URL = 'https://www.matthewctfuller.com';
const SITE_NAME = 'Matthew CT Fuller';

export type PageMeta = {
  title: string;
  description: string;
  path: string;
};

export function usePageMeta({ title, description, path }: PageMeta) {
  useEffect(() => {
    document.title = title || SITE_NAME;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${BASE_URL}${path}`);
  }, [title, description, path]);
}
