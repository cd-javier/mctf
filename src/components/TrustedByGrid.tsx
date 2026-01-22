import { imgUrl } from "../lib/imgUrl";
import styles from './TrustedByGrid.module.css'

export default function trustedByGrid({
  companies,
}: {
  companies: { name: string | null; logoUrl: string | null }[];
}) {
  return (
    <div className={styles.trustedByGrid}>
      {companies.map((company, index) => {
        return (
          <div className={styles.company} key={index}>
            <img
              src={imgUrl(company.logoUrl!).width(200).format('webp').url()}
              alt={`${company.name}'s logo`}
            />
          </div>
        );
      })}
    </div>
  );
}
