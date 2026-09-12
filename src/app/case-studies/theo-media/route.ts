import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

const GONE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <title>410 Gone | CodeArc</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #FAF6F0;
      color: #181713;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      padding: 24px;
      box-sizing: border-box;
      text-align: center;
    }
    .card {
      max-width: 480px;
    }
    h1 {
      font-size: 48px;
      margin: 0 0 16px;
      font-weight: 400;
      letter-spacing: -0.03em;
    }
    p {
      font-size: 16px;
      line-height: 1.6;
      color: #6B675F;
      margin: 0 0 24px;
    }
    a {
      display: inline-block;
      color: #181713;
      text-decoration: none;
      font-weight: 600;
      border: 1px solid #181713;
      padding: 10px 24px;
      border-radius: 9999px;
      transition: all 0.2s;
    }
    a:hover {
      background: #181713;
      color: #FAF6F0;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>410 Gone</h1>
    <p>This case study has been permanently removed from CodeArc.</p>
    <a href="/">Return to CodeArc Home</a>
  </div>
</body>
</html>`;

export function GET() {
  return new NextResponse(GONE_HTML, {
    status: 410,
    statusText: 'Gone',
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  });
}

export function HEAD() {
  return new NextResponse(null, {
    status: 410,
    statusText: 'Gone',
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  });
}
