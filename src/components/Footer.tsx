import { Link } from 'react-router-dom';

import Icon from './SocialIcon';

import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.footer}>
        <div>
          <div className={styles.logo}>MatthewCTFuller</div>
          <nav className={styles.socialLinks}>
            <ul>
              <li>
                <a
                  href="https://www.linkedin.com/in/matthewctfuller"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Matthew CT Fuller on Linkedin (opens in a new tab)"
                >
                  <Icon.LinkedIn />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/matthewctfuller"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Matthew CT Fuller on Instagram (opens in a new tab)"
                >
                  <Icon.Instagram />
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@matthewctfuller"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Matthew CT Fuller on Instagram (opens in a new tab)"
                >
                  <Icon.TikTok />
                </a>
              </li>
            </ul>
          </nav>
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
