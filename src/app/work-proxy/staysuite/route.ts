/**
 * Same-origin live preview of StaySuite (staysuite.codearc.co.in).
 * Always serves the latest live upstream version with zero caching.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const UPSTREAM = 'https://staysuite.codearc.co.in/';

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

    // Ensure relative assets (images, stylesheets, fonts) resolve against upstream
    if (!/<base\s/i.test(html)) {
      html = html.replace(
        /<head([^>]*)>/i,
        `<head$1><base href="${UPSTREAM}">`,
      );
    }

    // Strip frame-busting meta tags
    html = html.replace(/<meta[^>]+http-equiv=["']?X-Frame-Options["']?[^>]*>/gi, '');

    // Unhide StaySuite main marketing content (streamed in S:0)
    html = html.replace('<div hidden id="S:0">', '<div id="S:0">');

    // Remove the 3D rotating fallback spinner container so the real site displays immediately
    html = html.replace(
      /<!--\$\?--><template id="B:0"><\/template><div class="min-h-screen[\s\S]*?<!--\/\$-->/,
      '',
    );

    // Strip crashing Next.js App Router client scripts
    html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

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
    return new Response(`StaySuite preview unavailable: ${message}`, {
      status: 502,
    });
  }
}
