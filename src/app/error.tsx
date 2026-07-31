'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[app-error]', error);
  }, [error]);

  return (
    <div className="v2-page">
      <main id="main-content" className="v2-inner v2-inner-hero" style={{ minHeight: '70vh' }}>
        <p className="v2-kicker">Something went wrong</p>
        <h1>
          Page hiccup. <em>Try again.</em>
        </h1>
        <p className="v2-inner-lede">
          We hit an unexpected error. You can retry this page, or head back home.
        </p>
        <div className="v2-inline-actions">
          <button type="button" className="v2-btn v2-btn-primary" onClick={reset}>
            Try again
          </button>
          <Link className="v2-btn v2-btn-ghost" href="/">
            Go home
          </Link>
        </div>
      </main>
    </div>
  );
}
