import type { ReactNode } from 'react';
import styles from './Anchor.module.css'

export default function Anchor({ id }: { id: string }) {
  return <div id={id} className={styles.anchor}></div>;
}
