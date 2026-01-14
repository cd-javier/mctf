import type { MouseEventHandler, ReactNode } from 'react';

import styles from './Button.module.css';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

type ButtonProps = {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: MouseEventHandler;
  color?: 'main' | 'light' | 'dark' | 'wbh';
};

export default function Button({
  children,
  to,
  href,
  onClick,
  color = 'main',
}: ButtonProps) {
  if (href)
    return (
      <a
        href={href}
        className={classNames(styles.button, styles[color])}
        role="button"
        tabIndex={0}
      >
        {children}
      </a>
    );

  if (to) {
    return (
      <NavLink
        to={to}
        className={classNames(styles.button, styles[color])}
        role="button"
        tabIndex={0}
      >
        {children}
      </NavLink>
    );
  }

  return (
    <div
      className={classNames(styles.button, styles[color])}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      {children}
    </div>
  );
}
