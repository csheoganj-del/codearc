/**
 * Self-contained Bro's Bar entry animation for Work cards.
 * No third-party credits.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-static';

const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>BRO'S BAR</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      width: 100%; height: 100%; overflow: hidden;
      background: #050505; color: #fff;
      font-family: Outfit, Inter, system-ui, sans-serif;
    }
    body {
      display: grid; place-items: center;
      background:
        radial-gradient(circle at 50% 45%, rgba(242, 185, 75, 0.06), transparent 45%),
        #050505;
    }
    .center {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: clamp(14px, 3.5vmin, 24px);
      padding: 6% 4%;
      transform: scale(0.98);
    }
    .title {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      gap: clamp(6px, 1.2vmin, 12px);
      font-size: clamp(36px, 11vmin, 72px);
      font-weight: 800;
      letter-spacing: 0.02em;
      text-transform: uppercase;
      line-height: 1;
      filter: drop-shadow(0 16px 28px rgba(0,0,0,0.9));
    }
    .title span {
      position: relative;
      display: inline-block;
      color: transparent;
      -webkit-text-stroke: 1px rgba(255,255,255,0.32);
      animation: letterIn 0.7s ease both;
    }
    .title span:nth-child(1) { animation-delay: 0.05s; }
    .title span:nth-child(2) { animation-delay: 0.12s; }
    .title span:nth-child(3) { animation-delay: 0.19s; }
    .title span:nth-child(4) { animation-delay: 0.26s; }
    .title span:nth-child(5) { animation-delay: 0.33s; }
    .title span:nth-child(6) { animation-delay: 0.4s; }
    .title span:nth-child(7) { animation-delay: 0.5s; }
    .title span:nth-child(8) { animation-delay: 0.58s; }
    .title span:nth-child(9) { animation-delay: 0.66s; }
    /* Amber liquid fill on A and R of BAR */
    .title .fill {
      background: linear-gradient(180deg, #f6d27a 0%, #e0a93a 55%, #c48a1f 100%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      -webkit-text-stroke: 0;
      animation: letterIn 0.7s ease both, liquid 2.8s ease-in-out infinite;
    }
    .sub {
      font-size: clamp(11px, 2.6vmin, 14px);
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.45);
      animation: fadeUp 0.8s ease 0.55s both;
    }
    .btn {
      margin-top: clamp(4px, 1.5vmin, 10px);
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: clamp(12px, 2.4vmin, 15px) clamp(26px, 5vmin, 36px);
      border-radius: 999px;
      background: #f0c14b;
      color: #15110a;
      font-weight: 700;
      font-size: clamp(13px, 2.8vmin, 15px);
      text-decoration: none;
      box-shadow: 0 10px 28px rgba(240, 193, 75, 0.28);
      animation: fadeUp 0.8s ease 0.75s both, pulse 2.4s ease-in-out 1.2s infinite;
    }
    @keyframes letterIn {
      from { opacity: 0; transform: translateY(16px) scale(0.92); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes liquid {
      0%, 100% { filter: brightness(1); }
      50% { filter: brightness(1.12) drop-shadow(0 0 10px rgba(240,193,75,0.45)); }
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.03); }
    }
    @media (prefers-reduced-motion: reduce) {
      .title span, .sub, .btn { animation: none !important; opacity: 1 !important; transform: none !important; }
      .title .fill { -webkit-text-stroke: 0; color: #e0a93a; background: none; }
    }
  </style>
</head>
<body>
  <div class="center">
    <h1 class="title" aria-label="BRO'S BAR">
      <span>B</span><span>R</span><span>O</span><span>'</span><span>S</span>
      <span style="width:0.35em"></span>
      <span>B</span><span class="fill">A</span><span class="fill">R</span>
    </h1>
    <p class="sub">Premium Bar Operations Portal</p>
    <span class="btn">Pour In</span>
  </div>
</body>
</html>`;

export function GET() {
  return new Response(HTML, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
      'Content-Security-Policy': "frame-ancestors 'self'",
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
