'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export type WorkLiveMode = 'sequence' | 'iframe' | 'static';

export type WorkLiveMediaProps = {
  href: string;
  title: string;
  tag: string;
  image: string;
  liveMode?: WorkLiveMode;
  frames?: string[];
  iframeSrc?: string;
  fps?: number;
};

const JAWAI_FRAMES = Array.from({ length: 16 }, (_, i) =>
  `/assets/work-live/jawai-f${String(i).padStart(2, '0')}.jpg`,
);

export default function WorkLiveMedia({
  href,
  title,
  tag,
  image,
  liveMode = 'static',
  frames = JAWAI_FRAMES,
  iframeSrc,
  fps = 10,
}: WorkLiveMediaProps) {
  const shellRef = useRef<HTMLAnchorElement>(null);
  const [inView, setInView] = useState(false);
  const [frame, setFrame] = useState(0);
  const [ready, setReady] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [iframeScale, setIframeScale] = useState(0.28);

  useEffect(() => {
    const el = shellRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '100px', threshold: 0.15 },
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

  // Preload sequence + play ping-pong (walk toward → ease back)
  useEffect(() => {
    if (liveMode !== 'sequence' || !inView || reduceMotion || frames.length < 2) return;

    let cancelled = false;
    let idx = 0;
    let dir: 1 | -1 = 1;
    const interval = Math.max(40, Math.round(1000 / fps));

    Promise.all(
      frames.map(
        (src) =>
          new Promise<void>((resolve) => {
            const im = new window.Image();
            im.onload = () => resolve();
            im.onerror = () => resolve();
            im.src = src;
          }),
      ),
    ).then(() => {
      if (!cancelled) setReady(true);
    });

    const timer = window.setInterval(() => {
      if (cancelled) return;
      idx += dir;
      if (idx >= frames.length - 1) {
        idx = frames.length - 1;
        dir = -1;
      } else if (idx <= 0) {
        idx = 0;
        dir = 1;
      }
      setFrame(idx);
    }, interval);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [liveMode, inView, reduceMotion, frames, fps]);

  useEffect(() => {
    if (liveMode !== 'iframe') return;
    const el = shellRef.current;
    if (!el) return;

    const measure = () => {
      const w = el.clientWidth || 320;
      const h = el.clientHeight || 180;
      setIframeScale(Math.max(w / 1280, h / 800));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [liveMode]);

  const showSequence = liveMode === 'sequence' && !reduceMotion && inView;
  const showIframe = liveMode === 'iframe' && !reduceMotion && Boolean(iframeSrc);
  const isLive = liveMode === 'sequence' || liveMode === 'iframe';

  return (
    <Link
      ref={shellRef}
      href={href}
      className={`v2-work-media${isLive ? ' is-live' : ''}`}
      aria-label={`${title} — ${tag}`}
    >
      {/* Static poster always present (fallback + first paint) */}
      <Image
        src={image}
        alt={`${title} — ${tag}`}
        fill
        sizes="(max-width: 720px) 100vw, (max-width: 960px) 50vw, 33vw"
        className={`object-cover v2-work-live-poster${
          (showSequence && ready) || showIframe ? ' is-covered' : ''
        }`}
      />

      {showSequence ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={frames[frame]}
          alt=""
          className={`v2-work-live-frame${ready ? ' is-on' : ''}`}
          draggable={false}
        />
      ) : null}

      {showIframe ? (
        <div className="v2-work-iframe-wrap" aria-hidden="true">
          <iframe
            src={iframeSrc}
            title={`${title} live preview`}
            loading="lazy"
            tabIndex={-1}
            sandbox="allow-scripts allow-same-origin"
            onLoad={() => setReady(true)}
            style={{
              width: 1280,
              height: 800,
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


