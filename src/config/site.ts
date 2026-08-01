/**
 * CodeArc market profile — India branch.
 * TheoMedia (UK / Ireland / Europe) lives at theomedia.co.uk with its own market config.
 */

export type MarketId = 'IN' | 'GB';

export const site = {
  market: 'IN' as const satisfies MarketId,
  brand: 'CodeArc',
  legalName: 'CodeArc',
  /** Canonical origin with www (apex redirects here on Vercel). */
  domain: 'https://www.codearc.co.in',
  email: 'hello@codearc.co.in',

  phone: {
    display: '+91 99837 21179',
    e164: '+919983721179',
    whatsapp: '919983721179',
  },

  locale: 'en-IN',
  openGraphLocale: 'en_IN',
  htmlLang: 'en',

  region: {
    label: 'Rajasthan, India',
    shortLabel: 'Based in Rajasthan · Working across India',
    proofLabel: 'Rajasthan',
    proofDetail: 'Remote-friendly with businesses across India',
    addressLocality: 'Rajasthan',
    addressRegion: 'Rajasthan',
    addressCountry: 'IN',
    areaServed: ['IN'] as const,
  },

  currency: {
    code: 'INR' as const,
    minorUnitName: 'paise',
    displayLocale: 'en-IN',
  },

  tax: {
    label: 'GST',
    longLabel: 'GST (Goods and Services Tax)',
    invoiceNote: 'Checkout and invoicing can be configured for GST and HSN codes.',
  },

  payments: {
    provider: 'Razorpay' as const,
    providerLabel: 'Secured by Razorpay',
    methodsNote: 'UPI, cards and netbanking via Razorpay.',
    methodsList: 'UPI, cards, netbanking and wallets',
    forbiddenMethods: [] as const,
  },

  seo: {
    defaultTitle: 'CodeArc — websites, apps & RestroSuite',
    titleTemplate: '%s | CodeArc',
    description:
      'CodeArc builds websites, apps and business tools from Rajasthan. Product family: RestroSuite, StaySuite, MediSuite.',
    keywords: [
      'Web Development Company India',
      'Restaurant POS Software',
      'RestroSuite',
      'StaySuite',
      'MediSuite',
      'Software company Rajasthan',
    ],
  },

  sister: {
    brand: 'TheoMedia',
    domain: 'https://theomedia.co.uk',
    marketLabel: 'UK, Ireland & Europe',
    blurb: 'Outside India? Visit our UK / Europe branch for local contact and pricing.',
  },

  productHosts: {
    restrosuite: 'https://restrosuite.codearc.co.in',
    medisuite: 'https://codearc-medisuite.vercel.app',
  },
} as const;

export type SiteConfig = typeof site;

export function mailTo(subject?: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const q = params.toString();
  return q ? `mailto:${site.email}?${q}` : `mailto:${site.email}`;
}

export function whatsappUrl(text?: string): string {
  const base = `https://wa.me/${site.phone.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function telHref(): string {
  return `tel:${site.phone.e164}`;
}

export function formatMoney(amountMinor: number, maximumFractionDigits = 0): string {
  return (amountMinor / 100).toLocaleString(site.currency.displayLocale, {
    style: 'currency',
    currency: site.currency.code,
    maximumFractionDigits,
  });
}
