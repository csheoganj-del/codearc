'use client';

import { useEffect, useState } from 'react';
import BrandLoader from './BrandLoader';
import styles from './BrandIntro.module.css';

/** Visible hold before fade starts */
const INTRO_DURATION_MS = 2600;
/** Fade-out length (keep in sync with BrandIntro.module.css) */
const EXIT_DURATION_MS = 420;
/** Absolute ceiling — never leave mobile users stuck on the logo */
const SAFETY_MAX_MS = 4200;
const SESSION_KEY = 'codearc-brand-intro-seen';

export default function BrandIntro() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // Skip the splash on later visits in the same tab session
    try {
      if (sessionStorage.getItem(SESSION_KEY) === '1') {
        setVisible(false);
        return;
      }
    } catch {
      // private mode / blocked storage — still show once
    }

    // Do NOT lock document overflow. On iOS Safari that can leave the page
    // unscrollable if hydration aborts or timers are cancelled mid-intro.
    // The fixed overlay already blocks interaction.

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const displayDuration = reduceMotion ? 350 : INTRO_DURATION_MS;
    const exitDuration = reduceMotion ? 100 : EXIT_DURATION_MS;

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      setVisible(false);
      try {
        sessionStorage.setItem(SESSION_KEY, '1');
      } catch {
        // ignore
      }
    };

    const leaveTimer = window.setTimeout(() => setLeaving(true), displayDuration);
    const hideTimer = window.setTimeout(finish, displayDuration + exitDuration);
    // Failsafe if something interrupts the normal timers
    const safetyTimer = window.setTimeout(finish, SAFETY_MAX_MS);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(hideTimer);
      window.clearTimeout(safetyTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      data-brand-intro
      className={`${styles.overlay} ${styles.autoHide} ${leaving ? styles.leaving : ''}`}
      aria-hidden={leaving || undefined}
    >
      <BrandLoader />
    </div>
  );
}
