import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Work-proxy previews need a free CSP so the live sites' GSAP/Lenis/CDN
 * assets can load. The global next.config CSP would otherwise block them.
 */
export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith('/work-proxy')) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  // Drop any inherited CSP from the global headers matcher
  response.headers.delete('Content-Security-Policy');
  response.headers.set('Content-Security-Policy', "frame-ancestors 'self'");
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  return response;
}

export const config = {
  matcher: ['/work-proxy/:path*'],
};
