import { useLoaderData } from 'react-router-dom';
import { PortableText } from '@portabletext/react';
import classNames from 'classnames';
import { imgUrl } from '../lib/imgUrl';

import { usePageMeta } from '../lib/usePageData';
import { SEO } from '../lib/SEO';

import styles from './Services.module.css';

import DefaultLayout from '../layouts/DefaultLayout';
import Section from '../layouts/Section';

import type { SERVICES_QUERY_RESULT } from '../lib/sanity.types';
import TrustedByGrid from '../components/TrustedByGrid';
import Button from '../components/Button';

type ServicesPageData = NonNullable<SERVICES_QUERY_RESULT>;
type HeroData = ServicesPageData['hero'];
type ServicesData = ServicesPageData['services'];
type TrustedByData = ServicesPageData['trustedBy'];
type CTAData = ServicesPageData['cta'];

export default function Services() {
  const data = useLoaderData<ServicesPageData>();

  const { hero, services, trustedBy, cta, whyWorkWithMe } = data;

  usePageMeta(SEO.services);

  return (
    <>
      <DefaultLayout>
        <Hero data={hero} />
        <WhyWorkWithMe data={whyWorkWithMe} />
        <ServicesSection data={services} />
        <TrustedBy data={trustedBy} />
        <CTA data={cta} />
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

function WhyWorkWithMe({ data }: { data: ServicesPageData['whyWorkWithMe'] }) {
  if (!data?.heading && !data?.body) return null;
  return (
    <Section
      wrapperClassName={styles.whyWorkWithMeWrapper}
      className={styles.whyWorkWithMeSection}
      flex
    >
      <h2>{data.heading}</h2>
      <div className={styles.body}>
        <PortableText value={data.body!} />
      </div>
    </Section>
  );
}

function ServicesSection({ data }: { data: ServicesData }) {
  if (!data) return;

  return (
    <Section
      wrapperClassName={styles.servicesWrapper}
      className={styles.servicesSection}
      flex
    >
      <div className={styles.servicesGrid}>
        {data.map((service, index) => {
          return (
            <div key={index} className={styles.service}>
              <img
                src={imgUrl(service.imageUrl!)
                  .width(1800)
                  .height(300)
                  .format('webp')
                  .url()}
                alt=""
              />
              <h2 id={service.title?.split(' ')[0].toLowerCase()}>
                {service.title}
              </h2>
              <div className={styles.body}>
                <PortableText value={service.body!} />
              </div>
              <Button href={service.ctaUrl!}>{service.cta}</Button>
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

function CTA({ data }: { data: CTAData }) {
  return (
    <Section
      wrapperClassName={styles.CTAWrapper}
      className={styles.CTASection}
      flex
    >
      <h2>{data.heading}</h2>
      <p className="large-body multiline">{data.body}</p>
      <Button to={data.buttonLink!}>{data.buttonText}</Button>
    </Section>
  );
}
