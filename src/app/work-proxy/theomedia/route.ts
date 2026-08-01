import {
  brandLogoPreviewHtml,
  THEOMEDIA_LOGO_PREVIEW,
} from '../../../lib/brand-logo-preview';

export const runtime = 'nodejs';
export const dynamic = 'force-static';

export function GET() {
  const html = brandLogoPreviewHtml(THEOMEDIA_LOGO_PREVIEW);
  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
      'Content-Security-Policy': "frame-ancestors 'self'",
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
