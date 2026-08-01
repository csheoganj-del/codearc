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
      'Cache-Control': 'public, max-age=60, must-revalidate',
      'Content-Security-Policy': "frame-ancestors 'self'",
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
