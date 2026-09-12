/**
 * Same-origin live preview of Deora Plaza (deora.vercel.app).
 * Always serves the latest live upstream version with zero caching.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const UPSTREAM = 'https://deora.vercel.app/';

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

    // Reveal luxury typography letters and containers (initial CSS has opacity:0)
    html = html.replace(/class="deora-brand-container\s*"/g, 'class="deora-brand-container visible"');
    html = html.replace(/class="deora-brand-subtitle"/g, 'class="deora-brand-subtitle visible"');
    html = html.replace(/class="deora-cta-container\s*"/g, 'class="deora-cta-container visible"');

    // Strip crashing Next.js App Router client scripts that throw route mismatch exceptions
    html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

    // Inject upstream golden animations:
    // 1. Interactive Golden Spark Trail across letters
    // 2. Floating Golden Embers (using upstream .particle & floatUp keyframes)
    // 3. Luxury breathing glow on button and typography
    const liveAnimationScript = `
      <style>
        .deora-brand-container.visible,
        .deora-brand-subtitle.visible,
        .deora-cta-container.visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
          visibility: visible !important;
        }
        .letter {
          display: inline-block !important;
          color: #F5F5F7 !important;
          opacity: 0;
          transition: opacity 0.35s ease, text-shadow 0.35s ease;
        }
        .spark {
          position: absolute;
          top: 50%;
          left: 0;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: radial-gradient(circle, #FFE9A6, #F2B94B 60%, transparent 70%);
          box-shadow: 0 0 16px rgba(242, 185, 75, 0.95), 0 0 30px rgba(242, 185, 75, 0.6);
          transform: translate(-50%, -50%);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 10;
        }
        .deora-luxury-button {
          box-shadow: 0 0 24px rgba(242, 185, 75, 0.3), 0 4px 14px rgba(0, 0, 0, 0.5);
          animation: buttonGlow 3s ease-in-out infinite alternate;
        }
        @keyframes buttonGlow {
          0% { box-shadow: 0 0 16px rgba(242, 185, 75, 0.25); }
          100% { box-shadow: 0 0 30px rgba(242, 185, 75, 0.55); }
        }
      </style>
      <script>
        (function() {
          function initLiveDeora() {
            var brand = document.querySelector('.deora-brand-container');
            var subtitle = document.querySelector('.deora-brand-subtitle');
            var cta = document.querySelector('.deora-cta-container');
            var container = document.querySelector('.deora-brand-name > div');
            var spark = document.querySelector('.spark');
            var letters = document.querySelectorAll('.letter');
            var bg = document.querySelector('.deora-luxury-background');

            // Spawn floating embers in background using upstream .particle class
            if (bg && !bg.dataset.particlesCreated) {
              bg.dataset.particlesCreated = 'true';
              for (var p = 0; p < 22; p++) {
                var particle = document.createElement('div');
                particle.className = 'particle';
                var size = (Math.random() * 3 + 2).toFixed(1);
                var left = (Math.random() * 100).toFixed(1);
                var duration = (Math.random() * 6 + 7).toFixed(1);
                var delay = (Math.random() * 8).toFixed(1);
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                particle.style.left = left + '%';
                particle.style.animationDuration = duration + 's';
                particle.style.animationDelay = delay + 's';
                bg.appendChild(particle);
              }
            }

            if (!container || !spark || !letters.length) return;

            if (brand) brand.classList.add('visible');
            if (subtitle) subtitle.classList.add('visible');
            if (cta) cta.classList.add('visible');

            function runSparkTrace() {
              var idx = 0;
              letters.forEach(function(l) {
                l.style.opacity = '0';
                l.style.textShadow = 'none';
              });
              spark.style.opacity = '1';

              var interval = setInterval(function() {
                if (idx >= letters.length) {
                  clearInterval(interval);
                  spark.style.opacity = '0';
                  // Pause with fully lit text before re-tracing
                  setTimeout(runSparkTrace, 4500);
                  return;
                }
                var cur = letters[idx];
                var lRect = cur.getBoundingClientRect();
                var cRect = container.getBoundingClientRect();
                var sparkX = (lRect.left - cRect.left + lRect.width / 2);
                spark.style.left = sparkX + 'px';

                cur.style.opacity = '1';
                cur.style.textShadow = '0 0 18px rgba(242, 185, 75, 0.65), 0 0 32px rgba(255, 233, 166, 0.4)';
                idx++;
              }, 130);
            }

            setTimeout(runSparkTrace, 350);
          }

          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initLiveDeora);
          } else {
            initLiveDeora();
          }
        })();
      </script>
    `;
    html = html.replace('</head>', `${liveAnimationScript}</head>`);

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
    return new Response(`Deora preview unavailable: ${message}`, {
      status: 502,
    });
  }
}
