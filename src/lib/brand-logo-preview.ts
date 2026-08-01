/**
 * Self-contained looping logo animation HTML for Work-card live previews.
 * Sized to fill a 16:9 work card (iframe is 100% of the card, no desktop scale-down).
 */

export type BrandLogoPreview = {
  brand: string;
  /** Letters in display order */
  letters: string[];
  /** 0-based indexes that use the accent (orange) colour */
  accentIndexes: number[];
  region: string;
  tagline: string;
};

export function brandLogoPreviewHtml(opts: BrandLogoPreview): string {
  const { brand, letters, accentIndexes, region, tagline } = opts;
  const accentSet = new Set(accentIndexes);

  const letterSpans = letters
    .map((ch, i) => {
      const cls = accentSet.has(i) ? 'letter accent' : 'letter';
      return `<span class="${cls}" style="--i:${i}">${escapeHtml(ch)}</span>`;
    })
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(brand)} — logo</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: #0b0c0b;
      color: #f3f0e8;
      font-family: Manrope, Inter, system-ui, sans-serif;
    }
    .screen {
      width: 100%;
      height: 100%;
      display: grid;
      place-items: center;
      padding: 4% 5%;
      background:
        radial-gradient(circle at 50% 44%, rgba(61, 155, 106, 0.12), transparent 34%),
        radial-gradient(circle at 70% 34%, rgba(232, 90, 47, 0.1), transparent 30%),
        #0b0c0b;
    }
    .stage {
      display: grid;
      place-items: center;
      gap: clamp(14px, 4.5vmin, 28px);
      width: min(100%, 920px);
      /* Fill the work-card frame boldly */
      transform: scale(1.08);
    }
    .brand-row {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: nowrap;
      gap: clamp(14px, 3.5vmin, 28px);
      animation: stageCycle 3.6s ease-in-out infinite;
      max-width: 100%;
    }
    .mark-wrap {
      position: relative;
      flex-shrink: 0;
      /* Large mark so it reads in the card thumbnail */
      width: clamp(88px, 28vmin, 168px);
      height: clamp(88px, 28vmin, 168px);
      filter: drop-shadow(0 18px 32px rgba(0, 0, 0, 0.4));
    }
    .mark-wrap::before {
      content: "";
      position: absolute;
      inset: -18%;
      z-index: -1;
      border: 1px solid rgba(243, 240, 232, 0.07);
      border-radius: 50%;
      animation: haloIn 3.6s ease-in-out infinite;
    }
    .mark { width: 100%; height: 100%; overflow: visible; }
    .base {
      fill: #f7f2ea;
      transform-origin: center;
      animation: baseIn 3.6s cubic-bezier(0.2, 0.75, 0.2, 1) infinite;
    }
    .outer-arch {
      fill: none;
      stroke: #171917;
      stroke-width: 11;
      stroke-linecap: round;
      stroke-dasharray: 230;
      stroke-dashoffset: 230;
      animation: drawArch 3.6s cubic-bezier(0.45, 0, 0.2, 1) infinite;
    }
    .inner-arch {
      fill: #171917;
      transform-box: fill-box;
      transform-origin: center bottom;
      animation: innerRise 3.6s cubic-bezier(0.2, 0.75, 0.2, 1) infinite;
    }
    .keystone {
      fill: #e85a2f;
      transform-box: fill-box;
      transform-origin: center;
      animation: keystone 3.6s cubic-bezier(0.2, 0.9, 0.25, 1.15) infinite;
    }
    .wordmark {
      display: flex;
      font-size: clamp(36px, 11.5vmin, 72px);
      font-weight: 780;
      line-height: 1;
      letter-spacing: -0.045em;
    }
    .letter {
      display: inline-block;
      opacity: 0;
      transform: translateY(14px) scale(0.88);
      animation: letterBounce 3.6s cubic-bezier(0.2, 0.75, 0.2, 1) infinite;
      animation-delay: calc(0.55s + var(--i) * 0.065s);
    }
    .letter.accent { color: #e85a2f; }
    .meta {
      text-align: center;
      opacity: 0;
      animation: metaIn 3.6s ease infinite;
      padding: 0 8px;
    }
    .meta .region {
      font-size: clamp(11px, 2.6vmin, 15px);
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #3d9b6a;
      margin-bottom: 8px;
    }
    .meta .tag {
      font-size: clamp(13px, 3.2vmin, 18px);
      color: rgba(243, 240, 232, 0.68);
      max-width: 34rem;
      line-height: 1.4;
    }

    @keyframes stageCycle {
      0%, 8% { opacity: 0; transform: translateY(8px); }
      18%, 78% { opacity: 1; transform: translateY(0); }
      92%, 100% { opacity: 0; transform: translateY(-4px); }
    }
    @keyframes baseIn {
      0%, 6% { opacity: 0; transform: scale(0.82) rotate(-3deg); }
      18%, 80% { opacity: 1; transform: scale(1) rotate(0); }
      94%, 100% { opacity: 0; transform: scale(0.92); }
    }
    @keyframes drawArch {
      0%, 8% { stroke-dashoffset: 230; }
      28%, 80% { stroke-dashoffset: 0; }
      94%, 100% { stroke-dashoffset: 230; }
    }
    @keyframes innerRise {
      0%, 14% { opacity: 0; transform: scaleY(0.2); }
      30%, 80% { opacity: 1; transform: scaleY(1); }
      94%, 100% { opacity: 0; transform: scaleY(0.4); }
    }
    @keyframes keystone {
      0%, 18% { opacity: 0; transform: translateY(-11px) scale(0.72); }
      30%, 45% { opacity: 1; transform: translateY(0) scale(1); }
      55% { opacity: 1; transform: scale(1.06); filter: drop-shadow(0 0 7px rgba(232, 90, 47, 0.55)); }
      65%, 80% { opacity: 1; transform: scale(1); filter: none; }
      94%, 100% { opacity: 0; transform: scale(0.9); }
    }
    @keyframes haloIn {
      0%, 10% { opacity: 0; transform: scale(0.78); }
      28%, 80% { opacity: 1; transform: scale(1); }
      94%, 100% { opacity: 0; }
    }
    @keyframes letterBounce {
      0%, 5% { opacity: 0; transform: translateY(14px) scale(0.88); }
      18% { opacity: 1; transform: translateY(-6px) scale(1.05); }
      26% { opacity: 1; transform: translateY(2px) scale(0.98); }
      34%, 80% { opacity: 1; transform: translateY(0) scale(1); }
      94%, 100% { opacity: 0; transform: translateY(-6px) scale(0.96); }
    }
    @keyframes metaIn {
      0%, 28% { opacity: 0; transform: translateY(8px); }
      40%, 78% { opacity: 1; transform: translateY(0); }
      92%, 100% { opacity: 0; }
    }

    @media (prefers-reduced-motion: reduce) {
      .brand-row, .mark-wrap::before, .base, .outer-arch, .inner-arch,
      .keystone, .letter, .meta { animation: none !important; opacity: 1 !important; transform: none !important; }
      .outer-arch { stroke-dashoffset: 0; }
    }
  </style>
</head>
<body>
  <div class="screen">
    <div class="stage">
      <div class="brand-row">
        <div class="mark-wrap" aria-hidden="true">
          <svg class="mark" viewBox="0 0 128 128">
            <rect class="base" width="128" height="128" rx="30" />
            <path class="outer-arch" d="M32 102V65C32 35 48 20 64 20s32 15 32 45v37" />
            <path class="inner-arch" d="M48 102V67c0-17 7-27 16-27s16 10 16 27v35" />
            <rect class="keystone" x="55" y="13" width="18" height="13" rx="4" />
          </svg>
        </div>
        <div class="wordmark" aria-label="${escapeHtml(brand)}">${letterSpans}</div>
      </div>
      <div class="meta">
        <div class="region">${escapeHtml(region)}</div>
        <div class="tag">${escapeHtml(tagline)}</div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export const THEOMEDIA_LOGO_PREVIEW: BrandLogoPreview = {
  brand: 'TheoMedia',
  letters: ['T', 'h', 'e', 'o', 'M', 'e', 'd', 'i', 'a'],
  accentIndexes: [4, 5, 6, 7, 8],
  region: 'UK · Ireland · Europe',
  tagline: 'Sister brand — software people actually use.',
};

export const CODEARC_LOGO_PREVIEW: BrandLogoPreview = {
  brand: 'CodeArc',
  letters: ['C', 'o', 'd', 'e', 'A', 'r', 'c'],
  accentIndexes: [4, 5, 6],
  region: 'Rajasthan · Working across India',
  tagline: 'Sister brand — websites, apps & RestroSuite.',
};
