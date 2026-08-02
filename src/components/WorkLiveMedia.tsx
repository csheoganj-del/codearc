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
 * These are light HTML/CSS animations — safe to always mount on mobile.
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

/** Full live-site previews (scaled desktop canvas + auto-scroll proxy) */
function isFullSitePreview(src?: string): boolean {
  if (!src) return false;
  return (
    src.includes('/work-proxy/jawai') ||
    src.includes('/work-proxy/wildjawai') ||
    src.includes('/work-proxy/leopardtrails')
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
  const shellRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [iframeScale, setIframeScale] = useState(0.3);
  const [design, setDesign] = useState({ w: 1440, h: 900 });

  const fillMode = isFillPreview(iframeSrc);
  const jawai = isFullSitePreview(iframeSrc);
  const isLive = liveMode === 'iframe' && !failed && Boolean(iframeSrc);

  // Mobile detection — never gate fill previews on IntersectionObserver alone
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)');
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  // Soft "near viewport" for heavy Jawai only — very generous margins for mobile
  useEffect(() => {
    const el = shellRef.current;
    if (!el) return;

    // Fill previews always considered near so they mount immediately
    if (fillMode) {
      setNear(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true);
      },
      { rootMargin: '80% 0px', threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [fillMode]);

  // Scale for full-site previews (Jawai). Phone uses phone canvas so motion is visible.
  useEffect(() => {
    if (liveMode !== 'iframe' || fillMode) return;
    const el = shellRef.current;
    if (!el) return;

    const measure = () => {
      const w = el.clientWidth || 320;
      const h = el.clientHeight || 180;
      const mobile = window.matchMedia('(max-width: 900px)').matches;
      // Phone-sized canvas on mobile so scroll/anim reads; desktop uses wide canvas
      const dw = mobile ? 390 : 1280;
      const dh = mobile ? 700 : 800;
      setDesign({ w: dw, h: dh });
      setIframeScale(Math.max(w / dw, h / dh));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    window.addEventListener('orientationchange', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
      window.removeEventListener('orientationchange', measure);
    };
  }, [liveMode, fillMode]);

  // Reveal iframe: fill previews ASAP; others after near + short fallback
  useEffect(() => {
    if (!isLive) return;
    if (fillMode) {
      setReady(true);
      return;
    }
    if (!near) return;
    const t = window.setTimeout(() => setReady(true), 400);
    return () => window.clearTimeout(t);
  }, [isLive, fillMode, near]);

  // Mount policy:
  // - fill previews (bros/deora/logo): always when live (mobile-safe)
  // - jawai: when near viewport
  const mountIframe = isLive && (fillMode || near);

  return (
    <div
      ref={shellRef}
      className={`v2-work-media${isLive ? ' is-live' : ''}${fillMode ? ' is-logo' : ''}${
        jawai ? ' is-jawai' : ''
      }${isMobile ? ' is-mobile' : ''}`}
    >
      {/* Solid dark posters for entry animations — never watermarked screenshots */}
      {fillMode &&
      (iframeSrc?.includes('/work-proxy/deora') ||
        iframeSrc?.includes('/work-proxy/brosbar')) ? (
        <div
          className={`v2-work-live-poster v2-work-entry-poster${
            iframeSrc?.includes('/work-proxy/deora') ? ' is-deora' : ' is-bros'
          }${mountIframe && ready ? ' is-covered' : ''}`}
          aria-hidden
        />
      ) : (
        <Image
          src={image}
          alt={`${title} — ${tag}`}
          fill
          sizes="(max-width: 720px) 100vw, (max-width: 960px) 50vw, 33vw"
          className={`object-cover v2-work-live-poster${
            mountIframe && ready ? ' is-covered' : ''
          }`}
          priority={false}
        />
      )}

      {mountIframe ? (
        <div
          className={`v2-work-iframe-wrap${ready ? ' is-ready' : ''}`}
          aria-hidden="true"
        >
          <iframe
            key={iframeSrc}
            src={iframeSrc}
            title={`${title} live preview`}
            loading="eager"
            tabIndex={-1}
            // Same-origin previews need scripts for Deora spark; pure CSS still works
            sandbox="allow-scripts allow-same-origin"
            referrerPolicy="no-referrer"
            onLoad={() => setReady(true)}
            onError={() => setFailed(true)}
            // iOS: promote to own layer so CSS animations run in the iframe
            style={
              fillMode
                ? {
                    width: '100%',
                    height: '100%',
                    border: 0,
                    transform: 'translateZ(0)',
                    WebkitTransform: 'translateZ(0)',
                  }
                : {
                    width: design.w,
                    height: design.h,
                    border: 0,
                    transform: `scale(${iframeScale}) translateZ(0)`,
                    WebkitTransform: `scale(${iframeScale}) translateZ(0)`,
                    transformOrigin: 'top left',
                    WebkitTransformOrigin: 'top left',
                  }
            }
          />
        </div>
      ) : null}

      {/* Hit target — NOT wrapping the iframe (invalid + broken on iOS Safari) */}
      <Link
        href={href}
        className="v2-work-media-hit"
        aria-label={`${title} — ${tag}`}
      />

      {isLive ? (
        <span className="v2-live-badge" aria-hidden="true">
          <span className="v2-live-dot" />
          Live
        </span>
      ) : null}
    </div>
  );
}
