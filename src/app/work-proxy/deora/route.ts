/**
 * Self-contained Deora Plaza entry animation for Work cards.
 * Recreates the live deora.vercel.app spark title reveal (no building photo).
 */

export const runtime = 'nodejs';
export const dynamic = 'force-static';

const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Deora Plaza</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: #0a0806;
      color: #f5f5f7;
      font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, Inter, "Segoe UI", system-ui, sans-serif;
    }
    .viewport {
      width: 100%;
      height: 100%;
      display: grid;
      place-items: center;
      position: relative;
      background:
        radial-gradient(ellipse 70% 55% at 50% 42%, rgba(242, 185, 75, 0.07), transparent 55%),
        #0a0806;
    }
    .content {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: clamp(18px, 4.5vmin, 32px);
      padding: 6% 4%;
      text-align: center;
      width: min(100%, 920px);
    }
    .title {
      position: relative;
      display: inline-flex;
      gap: 0.02em;
      font-size: clamp(34px, 10.5vmin, 68px);
      font-weight: 600;
      letter-spacing: 0.14em;
      line-height: 1;
      white-space: nowrap;
    }
    .letter {
      display: inline-block;
      opacity: 0;
      color: #f5f5f7;
      transition: opacity 0.35s ease, text-shadow 0.35s ease;
    }
    .letter.is-on {
      opacity: 1;
      text-shadow: 0 0 18px rgba(242, 185, 75, 0.28), 0 0 40px rgba(242, 185, 75, 0.12);
    }
    .spark {
      position: absolute;
      top: 50%;
      left: 0;
      width: clamp(7px, 1.4vmin, 11px);
      height: clamp(7px, 1.4vmin, 11px);
      border-radius: 50%;
      background: radial-gradient(circle, #fff 0%, #f2b94b 45%, transparent 72%);
      box-shadow: 0 0 14px rgba(242, 185, 75, 0.95), 0 0 28px rgba(242, 185, 75, 0.45);
      transform: translate(-50%, -50%);
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.2s ease;
      z-index: 5;
    }
    .spark.is-on { opacity: 1; }
    .subtitle {
      font-size: clamp(12px, 2.8vmin, 16px);
      letter-spacing: 0.16em;
      text-transform: none;
      color: rgba(245, 245, 247, 0.55);
      font-weight: 400;
      opacity: 0;
      transform: translateY(8px);
      transition: opacity 0.55s ease 0.15s, transform 0.55s ease 0.15s;
    }
    .subtitle.is-on {
      opacity: 1;
      transform: translateY(0);
    }
    .btn {
      margin-top: clamp(4px, 1.5vmin, 12px);
      appearance: none;
      border: none;
      cursor: default;
      padding: clamp(12px, 2.4vmin, 16px) clamp(28px, 5.5vmin, 40px);
      border-radius: 999px;
      background: linear-gradient(180deg, #f2b94b 0%, #d9a441 100%);
      color: #1a1206;
      font-size: clamp(13px, 2.8vmin, 16px);
      font-weight: 600;
      letter-spacing: 0.02em;
      box-shadow:
        0 10px 28px rgba(242, 185, 75, 0.28),
        inset 0 1px 0 rgba(255, 255, 255, 0.35);
      opacity: 0;
      transform: translateY(10px) scale(0.96);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    .btn.is-on {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    .ig {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-top: clamp(6px, 2vmin, 14px);
      color: rgba(242, 185, 75, 0.75);
      font-size: clamp(11px, 2.4vmin, 13px);
      text-decoration: none;
      opacity: 0;
      transition: opacity 0.5s ease;
    }
    .ig.is-on { opacity: 1; }
    .ig svg { width: 16px; height: 16px; flex-shrink: 0; }
  </style>
</head>
<body>
  <div class="viewport">
    <div class="content">
      <div class="title" id="title" aria-label="DEORA PLAZA">
        <!-- letters injected -->
        <div class="spark" id="spark"></div>
      </div>
      <p class="subtitle" id="subtitle">Hospitality Management System</p>
      <button class="btn" id="btn" type="button" tabindex="-1">Enter System</button>
      <a class="ig" id="ig" href="https://instagram.com/pixncraftstudio" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" fill="#F2B94B"/>
        </svg>
        <span>Created by @pixncraftstudio</span>
      </a>
    </div>
  </div>
  <script>
    (function () {
      var TEXT = 'DEORA PLAZA';
      var SPEED = 120;
      var PAUSE = 2800;
      var title = document.getElementById('title');
      var spark = document.getElementById('spark');
      var subtitle = document.getElementById('subtitle');
      var btn = document.getElementById('btn');
      var ig = document.getElementById('ig');

      // Build letter spans (preserve space)
      TEXT.split('').forEach(function (ch) {
        var span = document.createElement('span');
        span.className = 'letter';
        span.textContent = ch === ' ' ? '\\u00A0' : ch;
        title.insertBefore(span, spark);
      });

      var letters = title.querySelectorAll('.letter');
      var timer = null;
      var loopTimer = null;

      function reset() {
        letters.forEach(function (el) {
          el.classList.remove('is-on');
        });
        spark.classList.remove('is-on');
        subtitle.classList.remove('is-on');
        btn.classList.remove('is-on');
        ig.classList.remove('is-on');
      }

      function run() {
        reset();
        var i = 0;
        spark.classList.add('is-on');
        if (timer) clearInterval(timer);
        timer = setInterval(function () {
          if (i >= letters.length) {
            clearInterval(timer);
            spark.classList.remove('is-on');
            subtitle.classList.add('is-on');
            btn.classList.add('is-on');
            ig.classList.add('is-on');
            loopTimer = setTimeout(run, PAUSE);
            return;
          }
          var letter = letters[i];
          var rect = letter.getBoundingClientRect();
          var parent = title.getBoundingClientRect();
          spark.style.left = (rect.left - parent.left + rect.width / 2) + 'px';
          letter.classList.add('is-on');
          i += 1;
        }, SPEED);
      }

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        letters.forEach(function (el) { el.classList.add('is-on'); });
        subtitle.classList.add('is-on');
        btn.classList.add('is-on');
        ig.classList.add('is-on');
        return;
      }

      setTimeout(run, 350);
    })();
  </script>
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
