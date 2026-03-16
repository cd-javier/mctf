import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import classNames from 'classnames';
import { HashLink } from 'react-router-hash-link';

import WBHLogo from './WBHLogo';

import styles from './Navbar.module.css';

const showWBH = true;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function close() {
    setIsOpen(false);
  }

  return (
    <>
      {isOpen && <div className={styles.backdrop} onClick={close} aria-hidden="true" />}
      <header className={styles.navbar}>
        <NavLink to="/" className={styles.logo}>
          Matthew CT Fuller
        </NavLink>
        <nav>
          <div
            className={styles.navToggle}
            role="button"
            tabIndex={0}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((isOpen) => !isOpen)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setIsOpen((o) => !o);
            }}
          >
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>close</title>
                <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>menu</title>
                <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
              </svg>
            )}
          </div>
          <ul className={classNames(styles.navLinks, { [styles.open]: isOpen })}>
            <li>
              <NavLink to={'/'} onClick={close}>Home</NavLink>
            </li>
            <li>
              <NavLink to={'/about'} onClick={close}>About</NavLink>
            </li>
            <li>
              <NavLink to={'/services'} onClick={close}>Services</NavLink>
            </li>
            <li>
              <HashLink smooth to={'/#contact'} onClick={close}>
                Get in touch
              </HashLink>
            </li>
            {showWBH && (
              <li>
                <a href="" onClick={close}>
                  <WBHLogo />
                </a>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
}