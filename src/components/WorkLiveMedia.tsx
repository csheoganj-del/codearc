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
    if (liveMode !== 'iframe') return;
    const el = shellRef.current;
    if (!el) return;

    const measure = () => {
      const w = el.clientWidth || 320;
      const h = el.clientHeight || 180;
      // Desktop canvas sized so site chrome + type stay readable in the card
      setIframeScale(Math.max(w / 1440, h / 900));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [liveMode]);

  // Reset load state when leaving viewport so next entry reloads cleanly
  useEffect(() => {
    if (!inView) {
      setReady(false);
    }
  }, [inView]);

  const showIframe =
    liveMode === 'iframe' && !reduceMotion && !failed && Boolean(iframeSrc) && inView;
  const isLive = liveMode === 'iframe' && !failed;

  return (
    <Link
      ref={shellRef}
      href={href}
      className={`v2-work-media${isLive ? ' is-live' : ''}`}
      aria-label={`${title} — ${tag}`}
    >
      <Image
        src={image}
        alt={`${title} — ${tag}`}
        fill
        sizes="(max-width: 720px) 100vw, (max-width: 960px) 50vw, 33vw"
        className={`object-cover v2-work-live-poster${showIframe && ready ? ' is-covered' : ''}`}
        priority={false}
      />

      {showIframe ? (
        <div className={`v2-work-iframe-wrap${ready ? ' is-ready' : ''}`} aria-hidden="true">
          <iframe
            ref={iframeRef}
            src={iframeSrc}
            title={`${title} live preview`}
            loading="eager"
            tabIndex={-1}
            // Same-origin proxy: scripts + same-origin so injected auto-scroll can run
            sandbox="allow-scripts allow-same-origin allow-popups-to-escape-sandbox"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setReady(true)}
            onError={() => setFailed(true)}
            style={{
              width: 1440,
              height: 900,
              transform: `scale(${iframeScale})`,
            }}
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
