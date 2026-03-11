import { useLoaderData } from 'react-router-dom';
import { PortableText } from '@portabletext/react';
import { imgUrl } from '../lib/imgUrl';

import { usePageMeta } from '../lib/usePageData';
import { SEO } from '../lib/SEO';

import styles from './Services.module.css';

import DefaultLayout from '../layouts/DefaultLayout';
import Section from '../layouts/Section';

import type { SERVICES_QUERY_RESULT } from '../lib/sanity.types';
import { Hero } from './About';
import TrustedByGrid from '../components/TrustedByGrid';
import Button from '../components/Button';

type ServicesPageData = NonNullable<SERVICES_QUERY_RESULT>;
// type HeroData = ServicesPageData['hero'];
type ServicesData = ServicesPageData['services'];
type TrustedByData = ServicesPageData['trustedBy'];

export default function Services() {
  const data = useLoaderData<ServicesPageData>();

  const { hero, services, trustedBy } = data;

  usePageMeta(SEO.services);

  return (
    <>
      <DefaultLayout>
        <Hero data={hero} />
        <ServicesSection data={services} />
        <TrustedBy data={trustedBy} />
        <CTA />
      </DefaultLayout>
    </>
  );
}

function ServicesSection({ data }: { data: ServicesData }) {
  if (!data) return;

  return data.map((service, index) => {
    return (
      <Section
        wrapperClassName={styles.serviceWrapper}
        className={styles.serviceSection}
        key={index}
        flex
      >
        <h2>{service.title}</h2>
        <img
          src={imgUrl(service.imageUrl!)
            .width(1800)
            .height(300)
            .format('webp')
            .url()}
          alt=""
        />
        <div className={styles.body}>
          <PortableText value={service.body!} />
        </div>
      </Section>
    );
  });
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

function CTA() {
  return (
    <Section
      wrapperClassName={styles.CTAWrapper}
      className={styles.CTASection}
      flex
    >
      <h2>Let's work together</h2>
      <p>Ready to make take the leap?</p>
      <Button to="/#contact">Get in touch</Button>
    </Section>
  );
}
