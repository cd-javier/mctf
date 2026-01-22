import { useLoaderData } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

import styles from './Root.module.css';

import type { HOMEPAGE_QUERY_RESULT } from '../lib/sanity.types';
import { imgUrl } from '../lib/imgUrl';

import DefaultLayout from '../layouts/DefaultLayout';
import Section from '../layouts/Section';
import Button from '../components/Button';
import WBHLogo from '../components/WBHLogo';
import PlatformIcon from '../components/PlatformIcon';
import mediaPlaceholder from '../assets/media-placeholder.png';
import SocialLinks from '../components/SocialLinks';
import Anchor from '../components/Anchor';
import TrustedByGrid from '../components/TrustedByGrid';

type HomepageData = NonNullable<HOMEPAGE_QUERY_RESULT>;
type HeroData = HomepageData['hero'];
type WBHData = HomepageData['wbh'];
type BioData = HomepageData['bio'];
type TestimonialsData = HomepageData['testimonials'];
type CollabsData = HomepageData['collabs'];
type ServicesData = HomepageData['services'];
type ContactData = HomepageData['contact'];
type TrustedByData = HomepageData['trustedBy'];

export default function Root() {
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
        style={{ backgroundImage: `url(${imgUrl(data.imageUrl!).url()})` }}
      ></div>
      <h1 className={classNames(styles.heading, 'multiline')}>
        {data.heading}
      </h1>
      <div className={classNames(styles.subheading, 'multiline')}>
        {data.subheading}
      </div>
      <Button to="/services">{data.cta}</Button>
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
      <Button color="wbh">{data.cta}</Button>
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
      {data.imageUrl && (
        <img
          src={imgUrl(data.imageUrl)
            .width(1800)
            .height(1200)
            .format('webp')
            .url()}
          alt=""
        />
      )}
      <div className={styles.bioSnippet}>
        <p className="multiline">{data.snippet}</p>
        <Button>{data.cta}</Button>
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

  function nextQuote() {
    if (!data) return;
    changeToIndex(index === data.length - 1 ? 0 : index + 1);
  }

  function prevQuote() {
    if (!data) return;
    changeToIndex(index === 0 ? data.length - 1 : index - 1);
  }

  useEffect(() => {
    const timer = setInterval(nextQuote, 6000); // every 6 seconds
    return () => clearInterval(timer);
  });

  return (
    <Section
      wrapperClassName={styles.testimonialsWrapper}
      className={styles.testimonialsSection}
      flex
    >
      <div className={styles.arrow} onClick={prevQuote}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>chevron-left</title>
          <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
        </svg>
      </div>
      <div
        className={classNames(styles.testimonial, [
          { [styles.visible]: isVisible },
          { [styles.hidden]: !isVisible },
        ])}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className={classNames(styles.quote, 'multiline')}>
          {data![index].quote}
        </div>
        <div className={styles.author}>{data![index].person}</div>
      </div>
      <div className={styles.arrow} onClick={nextQuote}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>chevron-right</title>
          <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
        </svg>
      </div>
      <div className={styles.dots}>
        {data!.map((_q, i) => (
          <div
            key={i}
            onClick={() => changeToIndex(i)}
            className={classNames([{ [styles.selected]: i === index }])}
          ></div>
        ))}
      </div>
    </Section>
  );
}

function Collabs({ data }: { data: CollabsData }) {
  if (!data.collaborations || data.collaborations.length < 1) return;

  return (
    <Section
      wrapperClassName={styles.collabsWrapper}
      className={styles.collabsSection}
      flex
    >
      <h2>{data.heading}</h2>
      <div className={styles.collabGrid}>
        {data.collaborations.map((collab, index) => (
          <Collab data={collab} key={index} />
        ))}
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
        {data.imageUrl ? (
          <img
            src={imgUrl(data.imageUrl).width(150).height(150).url()}
            className={styles.thumbnail}
            alt={`Thumbnail of ${data.title}`}
          />
        ) : (
          <img src={mediaPlaceholder} className={styles.thumbnail} alt="" />
        )}
        {data.platform && (
          <img src={PlatformIcon[data.platform]} className={styles.platform} />
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
        {data.map((service, index) => {
          return (
            <div className={styles.service} key={index}>
              <img
                src={imgUrl(service.imageUrl!).width(900).height(300).url()}
                alt=""
              />
              <div className={styles.content}>
                {' '}
                <h3>{service.title}</h3>
                <p className="multiline">{service.body}</p>
                <Button to="/services">{service.cta}</Button>
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
      flex
    >
      <Anchor id="contact" />
      <h2>{data.heading}</h2>
      <div className={styles.content}>
        <img
          src={imgUrl(data.imageUrl!)
            .width(1800)
            .height(1200)
            .format('webp')
            .url()}
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
