import { useLoaderData } from 'react-router-dom';
import { useEffect, useState, useCallback, useRef } from 'react';
import classNames from 'classnames';

import styles from './Home.module.css';

import type { HOMEPAGE_QUERY_RESULT } from '../lib/sanity.types';
import type { SanityImageSource } from '@sanity/image-url';
import { imgUrl, sanitySrcSet } from '../lib/imgUrl';
import { usePageMeta } from '../lib/usePageData';
import { SEO } from '../lib/SEO';

import DefaultLayout from '../layouts/DefaultLayout';
import Section from '../layouts/Section';
import Button from '../components/Button';
import WBHLogo from '../components/WBHLogo';
import PlatformIcon from '../components/PlatformIcon';
import mediaPlaceholder from '../assets/media-placeholder.png';
import SocialLinks from '../components/SocialLinks';
import TrustedByGrid from '../components/TrustedByGrid';

type _Gen = NonNullable<HOMEPAGE_QUERY_RESULT>;
type HomepageData = Omit<_Gen, 'hero' | 'bio' | 'collabs' | 'services' | 'contact' | 'trustedBy'> & {
  hero: Omit<_Gen['hero'], 'imageUrl'> & { image: SanityImageSource | null };
  bio: Omit<_Gen['bio'], 'imageUrl'> & { image: SanityImageSource | null };
  collabs: Omit<_Gen['collabs'], 'collaborations'> & {
    collaborations: Array<
      Omit<NonNullable<_Gen['collabs']['collaborations']>[number], 'imageUrl'> & { image: SanityImageSource | null }
    > | null;
  };
  services: Array<
    Omit<NonNullable<_Gen['services']>[number], 'imageUrl'> & { image: SanityImageSource | null }
  > | null;
  contact: Omit<_Gen['contact'], 'imageUrl'> & { image: SanityImageSource | null };
  trustedBy: Omit<_Gen['trustedBy'], 'companies'> & {
    companies: Array<
      Omit<NonNullable<_Gen['trustedBy']['companies']>[number], 'logoUrl'> & { logo: SanityImageSource | null }
    > | null;
  };
};
type HeroData = HomepageData['hero'];
type WBHData = HomepageData['wbh'];
type BioData = HomepageData['bio'];
type TestimonialsData = HomepageData['testimonials'];
type CollabsData = HomepageData['collabs'];
type ServicesData = HomepageData['services'];
type ContactData = HomepageData['contact'];
type TrustedByData = HomepageData['trustedBy'];

export default function Home() {
  const data = useLoaderData<HomepageData>();

  const {
    hero,
    wbh,
    bio,
    testimonials,
    collabs,
    services,
    contact,
    trustedBy,
  } = data;

  usePageMeta(SEO.home);

  return (
    <>
      <DefaultLayout>
        <Hero data={hero} />
        {wbh.show && <WBH data={wbh} />}
        <Bio data={bio} />
        <Testimonials data={testimonials} />
        <Services data={services} />
        <Collabs data={collabs} />
        {trustedBy.show && <TrustedBy data={trustedBy} />}
        <Contact data={contact} />
      </DefaultLayout>
    </>
  );
}

function Hero({ data }: { data: HeroData }) {
  return (
    <Section
      wrapperClassName={styles.heroWrapper}
      className={styles.heroSection}
      noPadding
      flex
    >
      <div
        className={styles.heroBg}
        style={{
          backgroundImage: `url(${imgUrl(data.image!).dpr(3).url()})`,
        }}
      ></div>
      <h1 className={classNames(styles.heading, 'multiline')}>
        {data.heading}
      </h1>
      <div className={classNames(styles.subheading, 'multiline')}>
        {data.subheading}
      </div>
      <Button to={data.ctaUrl!}>{data.cta}</Button>
    </Section>
  );
}

function WBH({ data }: { data: WBHData }) {
  return (
    <Section
      wrapperClassName={styles.wbhWrapper}
      className={styles.wbhSection}
      flex
    >
      <WBHLogo />
      <div className={classNames(styles.subheading, 'multiline')}>
        {data.subheading}
      </div>
      <Button color="wbh" href={data.ctaUrl!}>
        {data.cta}
      </Button>
    </Section>
  );
}

function Bio({ data }: { data: BioData }) {
  return (
    <Section
      wrapperClassName={styles.bioWrapper}
      className={styles.bioSection}
      flex
    >
      {data.image && (
        <img
          src={imgUrl(data.image).width(900).format('webp').dpr(3).url()}
          srcSet={sanitySrcSet(data.image, [900, 1800, 2700])}
          sizes="(min-width: 1024px) 50vw, 100vw"
          alt=""
        />
      )}
      <div className={styles.bioSnippet}>
        <p className="multiline">{data.snippet}</p>
        <Button to="/about">{data.cta}</Button>
      </div>
    </Section>
  );
}

function Testimonials({ data }: { data: TestimonialsData }) {
  const [index, setIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [targetIndex, setTargetIndex] = useState<number | null>(null);

  function handleTransitionEnd() {
    if (!isVisible && targetIndex !== null) {
      setIndex(targetIndex);
      setTargetIndex(null);
      setIsVisible(true);
    }
  }

  function changeToIndex(newIndex: number) {
    setIsVisible(false);
    setTargetIndex(newIndex);
  }

  const nextQuote = useCallback(() => {
    if (!data) return;
    changeToIndex(index === data.length - 1 ? 0 : index + 1);
  }, [index, data]);

  function prevQuote() {
    if (!data) return;
    changeToIndex(index === 0 ? data.length - 1 : index - 1);
  }

  useEffect(() => {
    const timer = setInterval(nextQuote, 6000);
    return () => clearInterval(timer);
  }, [index, nextQuote]);

  return (
    <Section
      wrapperClassName={styles.testimonialsWrapper}
      className={styles.testimonialsSection}
      flex
    >
      <button
        className={styles.arrow}
        onClick={prevQuote}
        aria-label="Previous testimonial"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
        </svg>
      </button>

      <div
        className={classNames(styles.testimonial, [
          { [styles.visible]: isVisible },
          { [styles.hidden]: !isVisible },
        ])}
        onTransitionEnd={handleTransitionEnd}
        aria-live="polite"
        aria-atomic="true"
      >
        <div className={classNames(styles.quote, 'multiline')}>
          {data![index].quote}
        </div>
        <div className={styles.author}>{data![index].person}</div>
      </div>

      <button
        className={styles.arrow}
        onClick={nextQuote}
        aria-label="Next testimonial"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
        </svg>
      </button>

      <div className={styles.dots} role="tablist" aria-label="Testimonials">
        {data!.map((_q, i) => (
          <button
            key={_q.person}
            role="tab"
            aria-selected={i === index}
            aria-label={`Testimonial ${i + 1} of ${data!.length}`}
            onClick={() => changeToIndex(i)}
            className={classNames([{ [styles.selected]: i === index }])}
          />
        ))}
      </div>
    </Section>
  );
}

function Collabs({ data }: { data: CollabsData }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    updateArrows();
    const el = trackRef.current;
    el?.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    return () => {
      el?.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, [updateArrows]);

  const scroll = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 166, behavior: 'smooth' });
  };

  if (!data.collaborations || data.collaborations.length < 1) return;

  return (
    <Section
      wrapperClassName={styles.collabsWrapper}
      className={styles.collabsSection}
      anchor="collabs"
      flex
    >
      <h2>{data.heading}</h2>
      <div className={styles.collabCarousel}>
        <button
          className={styles.collabArrow}
          onClick={() => scroll(-1)}
          aria-label="Scroll left"
          style={{ visibility: canScrollLeft ? 'visible' : 'hidden' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
          </svg>
        </button>
        <div className={styles.collabTrack} ref={trackRef}>
          {data.collaborations.map((collab) => (
            <Collab data={collab} key={collab.url} />
          ))}
        </div>
        <button
          className={styles.collabArrow}
          onClick={() => scroll(1)}
          aria-label="Scroll right"
          style={{ visibility: canScrollRight ? 'visible' : 'hidden' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
          </svg>
        </button>
      </div>
    </Section>
  );
}

function Collab({
  data,
}: {
  data: NonNullable<CollabsData['collaborations']>[number];
}) {
  return (
    <a
      className={styles.collab}
      href={data.url!}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Matthew's collaboration with ${data.title} (opens in a new tab)`}
    >
      <div className={styles.collabImage}>
        {data.image ? (
          <img
            src={imgUrl(data.image)
              .width(300)
              .height(300)
              .format('webp')
              .dpr(3)
              .url()}
            className={styles.thumbnail}
            alt={`Thumbnail of ${data.title}`}
          />
        ) : (
          <img src={mediaPlaceholder} className={styles.thumbnail} alt="" />
        )}
        {data.platform && (
          <img
            src={PlatformIcon[data.platform]}
            className={styles.platform}
            alt={`${data.platform} logo`}
          />
        )}
      </div>
      <div className={styles.collabTitle}>{data.title}</div>
      <div className={styles.collabSubtitle}>{data.subtitle}</div>
    </a>
  );
}

function Services({ data }: { data: ServicesData }) {
  if (!data) return;
  return (
    <Section
      wrapperClassName={styles.servicesWrapper}
      className={styles.servicesSection}
      flex
    >
      <h2>Services</h2>
      <div className={styles.servicesGrid}>
        {data.map((service) => {
          return (
            <div className={styles.service} key={service.title}>
              <img
                src={imgUrl(service.image!)
                  .width(900)
                  .height(300)
                  .dpr(3)
                  .url()}
                alt=""
              />
              <div className={styles.content}>
                <h3>{service.title}</h3>
                <p className="multiline">{service.body}</p>
                <Button to={service.ctaUrl!}>{service.cta}</Button>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function TrustedBy({ data }: { data: TrustedByData }) {
  if (!data.companies || data.companies.length < 1) return;

  return (
    <Section
      wrapperClassName={styles.trustedByWrapper}
      className={styles.trustedBySection}
      flex
    >
      <h2>Trusted by</h2>
      <TrustedByGrid companies={data.companies} />
    </Section>
  );
}

function Contact({ data }: { data: ContactData }) {
  return (
    <Section
      wrapperClassName={styles.contactWrapper}
      className={styles.contactSection}
      anchor="contact"
      flex
    >
      <h2>{data.heading}</h2>
      <div className={styles.content}>
        <img
          src={imgUrl(data.image!).width(900).format('webp').dpr(3).url()}
          srcSet={sanitySrcSet(data.image!, [900, 1800, 2700])}
          sizes="(min-width: 1024px) 50vw, 100vw"
          alt=""
        />
        <div className={styles.contactText}>
          <p className="multiline">{data.body}</p>
          <div className={styles.links}>
            <Button href={data.ctaUrl!}>{data.cta}</Button>
            <SocialLinks />
          </div>
        </div>
      </div>
    </Section>
  );
}
