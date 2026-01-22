import { Link } from 'react-router-dom';

import SocialLinks from './SocialLinks';

import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.footer}>
        <div className={styles.footerInfo}>
          <div className={styles.logo}>MatthewCTFuller</div>
          <SocialLinks />
          <a href="mailto:info@MatthewCTFuller.com">info@MatthewCTFuller.com</a>
        </div>
        <nav className={styles.links}>
          <ul>
            <li>
              <Link to={'/'}>Home</Link>
            </li>
            <li>
              <Link to={'/'}>About</Link>
            </li>
            <li>
              <Link to={'/'}>Services</Link>
            </li>
            <li>
              <Link to={'/'}>Get in touch</Link>
            </li>
            <li>
              <a href="/">The Wellbeing Hypocrite Club</a>
            </li>
          </ul>
        </nav>
        <div className={styles.disclaimer}>
          @ 2026 MatthewCTFuller | Website by{' '}
          <a href="http://www.javierquiroga.com">Javier Quiroga</a>
        </div>
      </div>
    </footer>
  );
}
