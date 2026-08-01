/**
 * Same-origin live preview of Wild Jawai with slow auto-scroll.
 * Served without the main-site CSP so GSAP/Lenis/CDN assets can load.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const UPSTREAM = 'https://wild-jawai-safari.vercel.app/';

const AUTO_SCROLL = `
<script id="codearc-work-autoscroll">
(function () {
  var DURATION = 26; // seconds one way — slow cinematic scroll
  var PAUSE = 1.2;
  var started = false;

  function easeInOut(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  function maxY() {
    var space = document.getElementById('scroll-space');
    if (space) return Math.max(0, space.offsetHeight - window.innerHeight);
    return Math.max(
      0,
      (document.documentElement.scrollHeight || 0) - window.innerHeight,
    );
  }

  function scrollToY(y, immediate) {
    if (window.lenis && typeof window.lenis.scrollTo === 'function') {
      try {
        window.lenis.scrollTo(y, immediate
          ? { immediate: true }
          : { duration: DURATION, easing: easeInOut });
        return;
      } catch (e) {}
    }
    if (immediate) {
      window.scrollTo(0, y);
      return;
    }
    var from = window.scrollY || window.pageYOffset || 0;
    var t0 = performance.now();
    var ms = DURATION * 1000;
    function frame(now) {
      var p = Math.min(1, (now - t0) / ms);
      var e = easeInOut(p);
      window.scrollTo(0, from + (y - from) * e);
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function loop() {
    var max = maxY();
    if (max < 80) {
      setTimeout(loop, 600);
      return;
    }
    scrollToY(max, false);
    setTimeout(function () {
      scrollToY(0, false);
      setTimeout(loop, DURATION * 1000 + PAUSE * 1000);
    }, DURATION * 1000 + PAUSE * 1000);
  }

  function start() {
    if (started) return;
    started = true;
    // Let Lenis / ScrollTrigger / frames finish booting
    setTimeout(loop, 1400);
  }

  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start);
})();
</script>
`;

export async function GET() {
  try {
    const res = await fetch(UPSTREAM, {
      headers: { Accept: 'text/html' },
      cache: 'no-store',
    });
    if (!res.ok) {
      return new Response(`Upstream error ${res.status}`, { status: 502 });
    }
    let html = await res.text();

    // Keep relative assets resolving against the live site
    if (!/<base\s/i.test(html)) {
      html = html.replace(
        /<head([^>]*)>/i,
        `<head$1><base href="${UPSTREAM}">`,
      );
    }

    // Strip any frame-busting so the card can host the preview
    html = html.replace(/<meta[^>]+http-equiv=["']?X-Frame-Options["']?[^>]*>/gi, '');

    if (/<\/body>/i.test(html)) {
      html = html.replace(/<\/body>/i, `${AUTO_SCROLL}</body>`);
    } else {
      html += AUTO_SCROLL;
    }

    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        // Allow embedding only on our own origin
        'Content-Security-Policy': "frame-ancestors 'self'",
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'proxy failed';
    return new Response(`Wild Jawai preview unavailable: ${message}`, {
      status: 502,
    });
  }
}
