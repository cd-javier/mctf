import { imgUrl } from "../lib/imgUrl";
import styles from './TrustedByGrid.module.css'

export default function TrustedByGrid({
  companies,
}: {
  companies: { name: string | null; logoUrl: string | null }[];
}) {
  return (
    <div className={styles.trustedByGrid}>
      {companies.map((company) => {
        return (
          <div className={styles.company} key={company.name}>
            <img
              src={imgUrl(company.logoUrl!).width(200).format('webp').dpr(3).url()}
              alt={`${company.name}'s logo`}
            />
          </div>
        );
      })}
    </div>
  );
}
