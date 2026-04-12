import { imgUrl } from "../lib/imgUrl";
import type { SanityImageSource } from '@sanity/image-url';
import styles from './TrustedByGrid.module.css'

export default function TrustedByGrid({
  companies,
}: {
  companies: { name: string | null; logo: SanityImageSource | null }[];
}) {
  return (
    <div className={styles.trustedByGrid}>
      {companies.map((company) => {
        return (
          <div className={styles.company} key={company.name}>
            <img
              src={imgUrl(company.logo!).width(200).format('webp').dpr(3).url()}
              alt={`${company.name}'s logo`}
            />
          </div>
        );
      })}
    </div>
  );
}
