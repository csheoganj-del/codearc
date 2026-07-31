'use client';

import { useEffect, useState } from 'react';
import BrandLoader from './BrandLoader';
import styles from './BrandIntro.module.css';

const INTRO_DURATION_MS = 3000;
const EXIT_DURATION_MS = 420;

export default function BrandIntro() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const displayDuration = reduceMotion ? 450 : INTRO_DURATION_MS;
    const exitDuration = reduceMotion ? 120 : EXIT_DURATION_MS;

    const leaveTimer = window.setTimeout(() => setLeaving(true), displayDuration);
    const hideTimer = window.setTimeout(
      () => {
        setVisible(false);
        document.documentElement.style.overflow = previousOverflow;
      },
      displayDuration + exitDuration,
    );

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(hideTimer);
      document.documentElement.style.overflow = previousOverflow;
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`${styles.overlay} ${leaving ? styles.leaving : ''}`}>
      <BrandLoader />
    </div>
  );
}
