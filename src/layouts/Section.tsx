import type { ReactNode } from 'react';
import classNames from 'classnames';

import styles from './Section.module.css';

type SectionWrapperProps = {
  children?: ReactNode;
  className?: string;
  wrapperClassName?: string;
  anchor?: string;
  noPadding?: boolean;
  flex?: boolean;
};

export default function Section({
  children,
  className,
  wrapperClassName,
  anchor,
  noPadding,
  flex,
}: SectionWrapperProps) {
  return (
    <section
      className={classNames(styles.sectionWrapper, wrapperClassName, [
        { [styles.noPadding]: noPadding },
      ])}
      id={anchor}
    >
      <div
        className={classNames(
          styles.section,
          [{ [styles.flex]: flex }],
          className
        )}
      >
        {children}
      </div>
    </section>
  );
}
