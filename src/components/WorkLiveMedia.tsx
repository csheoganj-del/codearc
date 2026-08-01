'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export type WorkLiveMode = 'iframe' | 'static';

export type WorkLiveMediaProps = {
  href: string;
  title: string;
  tag: string;
  image: string;
  liveMode?: WorkLiveMode;
  /** Same-origin proxy URL for the live site preview */
  iframeSrc?: string;
};

/**
 * Full-bleed card previews (no desktop scale-down).
 * Logo loops + Deora entry animation are designed for the card frame.
 */
function isFillPreview(src?: string): boolean {
  if (!src) return false;
  return (
    src.includes('/work-proxy/theomedia') ||
    src.includes('/work-proxy/codearc') ||
    src.includes('/work-proxy/deora') ||
    src.includes('/work-proxy/brosbar')
  );
}

export default function WorkLiveMedia({
  href,
  title,
  tag,
  image,
  liveMode = 'static',
  iframeSrc,
}: WorkLiveMediaProps) {
  const shellRef = useRef<HTMLAnchorElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [iframeScale, setIframeScale] = useState(0.3);

  const fillMode = isFillPreview(iframeSrc);

  useEffect(() => {
    const el = shellRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '120px', threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    if (liveMode !== 'iframe' || fillMode) return;
    const el = shellRef.current;
    if (!el) return;

    const measure = () => {
      const w = el.clientWidth || 320;
      const h = el.clientHeight || 180;
      // Desktop canvas sized so full live sites stay readable in the card
      setIframeScale(Math.max(w / 1440, h / 900));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [liveMode, fillMode]);

  useEffect(() => {
    if (!inView) {
      setReady(false);
      setFailed(false);
    }
  }, [inView]);

  // If onLoad is flaky, still reveal the iframe so animation is visible
  useEffect(() => {
    if (!inView || liveMode !== 'iframe' || !iframeSrc || reduceMotion) return;
    const t = window.setTimeout(() => setReady(true), 900);
    return () => window.clearTimeout(t);
  }, [inView, liveMode, iframeSrc, reduceMotion]);

  const showIframe =
    liveMode === 'iframe' && !reduceMotion && !failed && Boolean(iframeSrc) && inView;
  const isLive = liveMode === 'iframe' && !failed;

  return (
    <Link
      ref={shellRef}
      href={href}
      className={`v2-work-media${isLive ? ' is-live' : ''}${fillMode ? ' is-logo' : ''}`}
      aria-label={`${title} — ${tag}`}
    >
      {/* Solid dark posters for entry animations — never watermarked screenshots */}
      {fillMode &&
      (iframeSrc?.includes('/work-proxy/deora') ||
        iframeSrc?.includes('/work-proxy/brosbar')) ? (
        <div
          className={`v2-work-live-poster v2-work-entry-poster${
            iframeSrc?.includes('/work-proxy/deora') ? ' is-deora' : ' is-bros'
          }${showIframe && ready ? ' is-covered' : ''}`}
          aria-hidden
        />
      ) : (
        <Image
          src={image}
          alt={`${title} — ${tag}`}
          fill
          sizes="(max-width: 720px) 100vw, (max-width: 960px) 50vw, 33vw"
          className={`object-cover v2-work-live-poster${
            showIframe && ready ? ' is-covered' : ''
          }`}
          priority={false}
        />
      )}

      {showIframe ? (
        <div className={`v2-work-iframe-wrap${ready ? ' is-ready' : ''}`} aria-hidden="true">
          <iframe
            ref={iframeRef}
            key={iframeSrc}
            src={iframeSrc}
            title={`${title} live preview`}
            loading="eager"
            tabIndex={-1}
            // allow-scripts needed for Deora spark JS; CSS-only previews still fine
            sandbox="allow-scripts allow-same-origin"
            referrerPolicy="no-referrer"
            onLoad={() => setReady(true)}
            onError={() => setFailed(true)}
            style={
              fillMode
                ? {
                    width: '100%',
                    height: '100%',
                    border: 0,
                    transform: 'none',
                  }
                : {
                    width: 1440,
                    height: 900,
                    border: 0,
                    transform: `scale(${iframeScale})`,
                  }
            }
          />
        </div>
      ) : null}

      {isLive && !reduceMotion ? (
        <span className="v2-live-badge" aria-hidden="true">
          <span className="v2-live-dot" />
          Live
        </span>
      ) : null}
    </Link>
  );
}
