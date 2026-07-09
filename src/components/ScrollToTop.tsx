"use client";

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Next.js's App Router doesn't reset scroll position on every client-side
 * navigation, which meant visitors could land on a brand-new page already
 * scrolled to wherever the previous page left off (e.g. the footer).
 * This resets scroll to the top whenever the pathname changes, but skips
 * the very first render so it doesn't fight in-page anchor links (#contact
 * etc.) or a deep link that should land mid-page on initial load.
 */
export default function ScrollToTop() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
