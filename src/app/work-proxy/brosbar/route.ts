/**
 * Self-contained Bro's Bar entry animation (liquid amber letters).
 * No third-party credits. Matches brosbar.vercel.app entry look.
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
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;600;800&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: #050505;
      color: #fff;
      font-family: Outfit, Inter, system-ui, sans-serif;
    }
    body {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    body::after {
      content: "";
      position: absolute;
      inset: 0;
      background-image: url("data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
      opacity: 0.08;
      pointer-events: none;
      z-index: 10;
    }
    body::before {
      content: "";
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.85) 100%);
      z-index: 9;
      pointer-events: none;
    }
    .center {
      position: relative;
      z-index: 15;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: clamp(12px, 3vmin, 22px);
      padding: 4%;
      width: 100%;
    }
    .main-title {
      margin: 0;
      font-size: clamp(40px, 12vmin, 80px);
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      gap: clamp(6px, 1.4vmin, 12px);
      filter: drop-shadow(0 16px 28px rgba(0,0,0,0.9));
      line-height: 1;
    }
    .main-title span {
      position: relative;
      display: inline-block;
      color: transparent;
      -webkit-text-stroke: 1px rgba(255,255,255,0.3);
    }
    .main-title span::before {
      content: attr(data-char);
      position: absolute;
      inset: 0;
      color: transparent;
      background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 40%, transparent 100%);
      -webkit-background-clip: text;
      background-clip: text;
      pointer-events: none;
      z-index: 3;
    }
    /* Authentic amber liquid fill (from Bro's Bar entry.css) */
    .liq-amber {
      background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300' preserveAspectRatio='none'><path d='M0,150 C75,120 75,180 150,150 C225,120 225,180 300,150 L300,300 L0,300 Z' fill='%238a5a19' opacity='0.8'/><path d='M0,160 C75,190 75,130 150,160 C225,190 225,130 300,160 L300,300 L0,300 Z' fill='%23d68e22'/><path d='M0,160 C75,190 75,130 150,160 C225,190 225,130 300,160' fill='none' stroke='%23ffeab3' stroke-width='4' opacity='0.9'/></svg>") repeat-x;
      background-size: 300px 200%;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      color: transparent;
      -webkit-text-stroke: 0;
      /* Force animation on iOS */
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
      animation:
        wave-motion 1.5s linear infinite,
        fill-up 8s ease-in-out infinite;
    }
    @keyframes wave-motion {
      from { background-position-x: 0; }
      to { background-position-x: 300px; }
    }
    @keyframes fill-up {
      0%, 15% { background-position-y: 0%; }
      40%, 85% { background-position-y: 100%; }
      100% { background-position-y: 0%; }
    }
    .subtitle {
      color: #c4c4c4;
      font-size: clamp(11px, 2.8vmin, 15px);
      letter-spacing: 0.28em;
      text-transform: uppercase;
      font-weight: 300;
      text-shadow: 0 2px 10px rgba(0,0,0,0.8);
    }
    .btn-enter {
      margin-top: clamp(8px, 2vmin, 18px);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: clamp(12px, 2.6vmin, 16px) clamp(28px, 6vmin, 40px);
      border-radius: 999px;
      background: #f0c14b;
      color: #15110a;
      font-weight: 700;
      font-size: clamp(13px, 2.8vmin, 15px);
      border: none;
      box-shadow: 0 10px 28px rgba(240, 193, 75, 0.28);
      animation: btn-glow 2.4s ease-in-out infinite;
    }
    @keyframes btn-glow {
      0%, 100% { box-shadow: 0 10px 28px rgba(240, 193, 75, 0.22); transform: scale(1); }
      50% { box-shadow: 0 12px 34px rgba(240, 193, 75, 0.4); transform: scale(1.03); }
    }
    @media (prefers-reduced-motion: reduce) {
      .liq-amber, .btn-enter { animation: none !important; }
      .liq-amber {
        background: linear-gradient(180deg, #f6d27a, #d68e22);
        -webkit-background-clip: text;
        background-clip: text;
      }
    }
  </style>
</head>
<body>
  <div class="center">
    <h1 class="main-title" aria-label="BRO'S BAR">
      <span class="liq-amber" data-char="B" style="animation-delay: 0s, 0s;">B</span>
      <span class="liq-amber" data-char="R" style="animation-delay: 0s, 0.4s;">R</span>
      <span class="liq-amber" data-char="O" style="animation-delay: 0s, 0.8s;">O</span>
      <span class="liq-amber" data-char="'" style="animation-delay: 0s, 1.2s;">'</span>
      <span class="liq-amber" data-char="S" style="animation-delay: 0s, 1.6s;">S</span>
      <span style="width: clamp(10px, 2.5vmin, 20px)"></span>
      <span class="liq-amber" data-char="B" style="animation-delay: 0s, 2s;">B</span>
      <span class="liq-amber" data-char="A" style="animation-delay: 0s, 2.4s;">A</span>
      <span class="liq-amber" data-char="R" style="animation-delay: 0s, 2.8s;">R</span>
    </h1>
    <p class="subtitle">Premium Bar Operations Portal</p>
    <div class="btn-enter">Pour In</div>
  </div>
</body>
</html>`;

export function GET() {
  return new Response(HTML, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      // Short cache so credit/animation fixes show up immediately
      'Cache-Control': 'public, max-age=60, must-revalidate',
      'Content-Security-Policy': "frame-ancestors 'self'",
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
