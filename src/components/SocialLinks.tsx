import styles from './SocialLinks.module.css';
import Icon from './SocialIcon';

export default function SocialLinks() {
  return (
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
  );
}
