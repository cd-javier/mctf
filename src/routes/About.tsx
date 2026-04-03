import { useLoaderData } from 'react-router-dom';
import classNames from 'classnames';
import { PortableText } from '@portabletext/react';
import { imgUrl } from '../lib/imgUrl';

import { usePageMeta } from '../lib/usePageData';
import { SEO } from '../lib/SEO';

import styles from './About.module.css';

import DefaultLayout from '../layouts/DefaultLayout';
import Section from '../layouts/Section';
import Button from '../components/Button';

import type { BIO_QUERY_RESULT } from '../lib/sanity.types';
import { useState } from 'react';

type BioData = NonNullable<BIO_QUERY_RESULT>;
type HeroData = BioData['hero'];
type LetterData = BioData['letter'];
type QuoteData = BioData['quote'];
type ProBioData = BioData['proBio'];
type CertsData = BioData['certs'];
type Certificate = NonNullable<CertsData['certifications']>[number];

export default function About() {
  const data = useLoaderData<BioData>();

  const { hero, letter, quote, proBio, certs } = data;

  usePageMeta(SEO.about);

  return (
    <>
      <DefaultLayout>
        <Hero data={hero} />
        <Letter data={letter} heroImg={hero.imageUrl} />
        <Quote data={quote} />
        <ProBio data={proBio} />
        <Certs data={certs} />
      </DefaultLayout>
    </>
  );
}

export function Hero({ data }: { data: HeroData }) {
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
          backgroundImage: `url(${imgUrl(data.imageUrl!).format('webp').url()})`,
        }}
      ></div>
      <h1 className={classNames(styles.heading, 'multiline')}>
        {data.heading}
      </h1>
      <p className={classNames(styles.subheading, 'large-body', 'multiline')}>
        {data.subheading}
      </p>
    </Section>
  );
}

function Letter({
  data,
  heroImg,
}: {
  data: LetterData;
  heroImg: HeroData['imageUrl'];
}) {
  return (
    <Section
      wrapperClassName={styles.letterWrapper}
      className={styles.letterSection}
      noPadding
      flex
    >
      <div className={styles.letterPortrait}>
        <img
          src={imgUrl(heroImg!).width(900).height(1200).format('webp').url()}
          alt=""
        />
      </div>
      <div className={styles.letter}>
        <PortableText value={data!} />
      </div>
    </Section>
  );
}

function Quote({ data }: { data: QuoteData }) {
  return (
    <Section
      wrapperClassName={styles.quoteWrapper}
      className={styles.quoteSection}
    >
      <p className="large-body">{data}</p>
    </Section>
  );
}

function ProBio({ data }: { data: ProBioData }) {
  return (
    <Section
      wrapperClassName={styles.proBioWrapper}
      className={styles.proBioSection}
      flex
    >
      <h2>{data.heading}</h2>
      <div className={styles.textBody}>
        <PortableText value={data.body!} />
      </div>
    </Section>
  );
}

function Certs({ data }: { data: CertsData }) {
  return (
    <Section
      wrapperClassName={styles.certsWrapper}
      className={styles.certsSection}
      flex
    >
      <h2>{data.heading}</h2>
      <div className={styles.textBody}>
        <PortableText value={data.preText!} />
      </div>
      <CertsAccordion certs={data.certifications!} />
      <div className={styles.textBody}>
        <PortableText value={data.postText!} />
        <br   />
        <Button to="/#contact">Let's Talk</Button>
      </div>
    </Section>
  );
}

function CertsAccordion({ certs }: { certs: Certificate[] }) {
  const [openIndex, setOpenIndex] = useState<number>(-1);

  function handleClick(index: number) {
    setOpenIndex((curr) => (index === curr ? -1 : index));
  }

  return (
    <div className={styles.certsAccordion}>
      {certs.map((cert, index) => (
        <Certificate
          key={cert.title}
          index={index}
          cert={cert}
          isOpen={index === openIndex}
          onClick={handleClick}
        />
      ))}
    </div>
  );
}

function Certificate({
  cert,
  index,
  isOpen,
  onClick,
}: {
  cert: Certificate;
  index: number;
  isOpen: boolean;
  onClick: (index: number) => void;
}) {
  return (
    <div className={styles.certificate}>
      <div
        className={styles.heading}
        onClick={() => onClick(index)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick(index);
          }
        }}
        role="button"
        aria-expanded={isOpen}
        tabIndex={0}
      >
        <h3>{cert.title}</h3>
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>minus-thick</title>
            <path d="M20 14H4V10H20" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>plus-thick</title>
            <path d="M20 14H14V20H10V14H4V10H10V4H14V10H20V14Z" />
          </svg>
        )}
      </div>
      {isOpen && <div className={styles.description}>{cert.description}</div>}
    </div>
  );
}
