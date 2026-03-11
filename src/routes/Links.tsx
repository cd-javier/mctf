import { useLoaderData } from 'react-router-dom';
import styles from './Links.module.css';

import { imgUrl } from '../lib/imgUrl';
import SocialLinks from '../components/SocialLinks';

import { usePageMeta } from '../lib/usePageData';
import { SEO } from '../lib/SEO';

import type { LINKS_QUERY_RESULT } from '../lib/sanity.types';
import classNames from 'classnames';

type LinksData = NonNullable<LINKS_QUERY_RESULT>;
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
            .url()}
          alt=""
          className={styles.profilePhoto}
        />
        <h1>Matthew CT Fuller</h1>
        <SocialLinks />
      </header>
      <main>
        {data.links &&
          data.links.map((link, index) => <Link data={link} key={index} />)}
      </main>
    </div>
  );
}

function Link({ data }: { data: LinkListData[number] }) {
  const { title, url, imageUrl } = data;

  if (imageUrl)
    return (
      <a href={url!} target="_blank" rel="noopener noreferrer">
        <div className={styles.link}>
          <img
            src={imgUrl(imageUrl).height(400).width(1600).format('webp').url()}
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
