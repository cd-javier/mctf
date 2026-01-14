import type { ReactNode } from 'react';

import styles from './DefaultLayout.module.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

type DefaultLayoutProps = {
  children: ReactNode;
};

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <div className={styles.wrapper}>
        <Navbar />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </div>
    </>
  );
}
