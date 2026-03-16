import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import SocialLinks from './SocialLinks';

import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.footer}>
        <div className={styles.footerInfo}>
          <div className={styles.logo}>MatthewCTFuller</div>
          <p className={styles.tagline}>
            Behavioural change · Addiction recovery · LGBTQ+ wellbeing ·
            Performance coaching
          </p>
          <SocialLinks />
          <a href="mailto:info@MatthewCTFuller.com">info@MatthewCTFuller.com</a>
        </div>
        <nav className={styles.links}>
          <ul>
            <li>
              <Link to={'/'}>Home</Link>
            </li>
            <li>
              <Link to={'/about'}>About</Link>
            </li>
            <li>
              <Link to={'/services'}>Services</Link>
            </li>
            <li>
              <HashLink to={'/#contact'}>Get in touch</HashLink>
            </li>
            <li>
              <a href="/">The Wellbeing Hypocrite Club</a>
            </li>
          </ul>
        </nav>
        <div className={styles.disclaimer}>
          @ {new Date().getFullYear()} MatthewCTFuller - Website by{' '}
          <a
            href="http://www.javierquiroga.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Javier Quiroga
          </a>
        </div>
      </div>
    </footer>
  );
}
