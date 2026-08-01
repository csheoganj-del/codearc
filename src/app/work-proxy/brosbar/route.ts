/**
 * Same-origin live preview of Bro's Bar (liquid letter animation intact).
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const UPSTREAM = 'https://brosbar.vercel.app/';

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

    html = html.replace(/<meta[^>]+http-equiv=["']?X-Frame-Options["']?[^>]*>/gi, '');

    // Soft zoom so the liquid title fills the card better
    const polish = `
<style id="codearc-work-polish">
  html, body { overflow: hidden !important; }
  .main-title { font-size: clamp(2.4rem, 9vw, 4.6rem) !important; margin-top: 0 !important; }
  .center-content { transform: scale(0.92); }
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
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        'Content-Security-Policy': "frame-ancestors 'self'",
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'proxy failed';
    return new Response(`Bro's Bar preview unavailable: ${message}`, {
      status: 502,
    });
  }
}
