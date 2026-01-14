import type { ReactNode } from 'react';
import classNames from 'classnames';

import styles from './Section.module.css';

type SectionWrapperProps = {
  children?: ReactNode;
  className?: string;
  wrapperClassName?: string;
  anchor?: string;
};

export default function Section({
  children,
  className,
  wrapperClassName,
  anchor,

}: SectionWrapperProps) {
  return (
    <section
      className={classNames(styles.sectionWrapper, wrapperClassName)}
      id={anchor}
    >
      <div className={classNames(styles.section, className)}>{children}</div>
    </section>
  );
}
