import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import classNames from 'classnames';

import WBHLogo from './WBHLogo';

import styles from './Navbar.module.css';

const showWBH = true;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className={styles.navbar}>
      <NavLink to="/" className={styles.logo}>
        MatthewCTFuller
      </NavLink>
      <nav>
        <div
          className={styles.navToggle}
          role="button"
          tabIndex={0}
          onClick={() => setIsOpen((isOpen) => !isOpen)}
        >
          <svg xmlns="http:   //www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>menu</title>
            <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
          </svg>
        </div>
        <ul className={classNames(styles.navLinks, { [styles.open]: isOpen })}>
          <li>
            <NavLink
              to={'/'}
              className={(isActive) => (isActive ? styles.active : '')}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to={''}>About</NavLink>
          </li>
          <li>
            <NavLink to={''}>Services</NavLink>
          </li>
          <li>
            <NavLink to={''}>Get in touch</NavLink>
          </li>
          {showWBH && (
            <li>
              <a href="">
                <WBHLogo />
              </a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
