import { useLoaderData } from 'react-router-dom';
import styles from './Links.module.css';

import { imgUrl } from '../lib/imgUrl';
import type { SanityImageSource } from '@sanity/image-url';
import SocialLinks from '../components/SocialLinks';

import { usePageMeta } from '../lib/usePageData';
import { SEO } from '../lib/SEO';

import type { LINKS_QUERY_RESULT } from '../lib/sanity.types';
import classNames from 'classnames';

type _Gen = NonNullable<LINKS_QUERY_RESULT>;
type LinksData = Omit<_Gen, 'profilePhoto' | 'links'> & {
  profilePhoto: SanityImageSource | null;
  links: Array<
    Omit<NonNullable<_Gen['links']>[number], 'imageUrl'> & { image: SanityImageSource | null }
  > | null;
};
type LinkListData = NonNullable<LinksData['links']>;

export default function Links() {
  const data = useLoaderData<LinksData>();

  usePageMeta(SEO.links);

  return (
    <div className={styles.linksWrapper}>
      <header>
        <img
          src={imgUrl(data.profilePhoto!)
            .width(600)
            .height(600)
            .format('webp')
            .dpr(3)
            .url()}
          alt=""
          className={styles.profilePhoto}
        />
        <h1>Matthew CT Fuller</h1>
        <SocialLinks />
      </header>
      <main>
        {data.links &&
          data.links.map((link) => <Link data={link} key={link.url} />)}
      </main>
    </div>
  );
}

function Link({ data }: { data: LinkListData[number] }) {
  const { title, url, image } = data;

  if (image)
    return (
      <a href={url!} target="_blank" rel="noopener noreferrer">
        <div className={styles.link}>
          <img
            src={imgUrl(image)
              .height(400)
              .width(1600)
              .format('webp')
              .dpr(3)
              .url()}
            alt=""
          />

          <div className={classNames([styles.content, styles.withImage])}>
            <div className={styles.title}>{title}</div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>chevron-right</title>
              <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
            </svg>
          </div>
        </div>
      </a>
    );

  return (
    <a href={url!} target="_blank" rel="noopener noreferrer">
      <div className={styles.link}>
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>chevron-right</title>
            <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
          </svg>
        </div>
      </div>
    </a>
  );
}
