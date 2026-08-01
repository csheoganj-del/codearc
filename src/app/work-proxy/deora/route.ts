/**
 * Same-origin live preview of Deora Plaza homepage
 * (spark "DEORA PLAZA" text reveal + Enter System).
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const UPSTREAM = 'https://deora.vercel.app/';

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

    if (!/<base\s/i.test(html)) {
      html = html.replace(
        /<head([^>]*)>/i,
        `<head$1><base href="${UPSTREAM}">`,
      );
    }

    html = html.replace(
      /<meta[^>]+http-equiv=["']?X-Frame-Options["']?[^>]*>/gi,
      '',
    );

    // Fit the luxury entry screen into the work-card frame
    const polish = `
<style id="codearc-work-polish">
  html, body {
    overflow: hidden !important;
    background: #0a0806 !important;
  }
  .deora-luxury-viewport {
    min-height: 100% !important;
    height: 100vh !important;
  }
  .deora-brand-name,
  .deora-brand-name > div {
    font-size: clamp(28px, 7.2vw, 56px) !important;
  }
  .deora-brand-subtitle {
    font-size: clamp(11px, 2.2vw, 15px) !important;
  }
  .deora-luxury-content {
    transform: scale(0.96);
    transform-origin: center center;
  }
  .deora-instagram-container {
    transform: scale(0.9);
  }
</style>
`;
    if (/<\/head>/i.test(html)) {
      html = html.replace(/<\/head>/i, `${polish}</head>`);
    } else {
      html = polish + html;
    }

    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=86400',
        'Content-Security-Policy': "frame-ancestors 'self'",
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'proxy failed';
    return new Response(`Deora Plaza preview unavailable: ${message}`, {
      status: 502,
    });
  }
}
