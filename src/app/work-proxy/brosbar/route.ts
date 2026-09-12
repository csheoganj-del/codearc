/**
 * Same-origin live preview of Bro's Bar (brosbar.vercel.app).
 * Always serves the latest live upstream version with zero caching.
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

    // Ensure relative assets resolve against the live site
    if (!/<base\s/i.test(html)) {
      html = html.replace(
        /<head([^>]*)>/i,
        `<head$1><base href="${UPSTREAM}">`,
      );
    }

    // Strip frame-busting headers or meta tags
    html = html.replace(/<meta[^>]+http-equiv=["']?X-Frame-Options["']?[^>]*>/gi, '');

    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
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
