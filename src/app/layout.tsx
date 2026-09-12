import type { Metadata } from 'next';
import { Fraunces, IBM_Plex_Mono, IBM_Plex_Sans, Syne } from 'next/font/google';
import ScrollToTop from '../components/ScrollToTop';
import FloatingContact from '../components/FloatingContact';
import BrandIntro from '../components/BrandIntro';
import { site } from '../config/site';
import { absoluteOgImageUrl, socialMetadata } from '../lib/seo';
import './globals.css';

const sans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const display = Syne({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const serif = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: site.seo.defaultTitle,
    template: site.seo.titleTemplate,
  },
  description: site.seo.description,
  keywords: [...site.seo.keywords],
  authors: [{ name: site.brand, url: site.domain }],
  creator: site.brand,
  publisher: site.brand,
  ...socialMetadata({
    title: site.seo.defaultTitle,
    description: site.seo.description,
    url: site.domain,
  }),
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/brand/codearc-mark.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/brand/codearc-mark.svg' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgId = `${site.domain}/#organization`;
  const ogImageUrl = absoluteOgImageUrl();

  return (
    <html lang={site.htmlLang} className={`${sans.variable} ${display.variable} ${serif.variable} ${mono.variable} scroll-smooth`}>
      <head>
        {/* Hard-coded absolute tags for WhatsApp / Facebook scrapers (belt-and-braces) */}
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:secure_url" content={ogImageUrl} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={`${site.brand} — ${site.region.label}`} />
        <meta name="twitter:image" content={ogImageUrl} />
        <link rel="image_src" href={ogImageUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': orgId,
                  name: site.brand,
                  url: `${site.domain}/`,
                  logo: {
                    '@type': 'ImageObject',
                    url: `${site.domain}/brand/codearc-symbol-color.svg`,
                  },
                  description: `${site.brand} is a small software team in ${site.region.label} building websites, apps, and products: RestroSuite, StaySuite, MediSuite.`,
                  email: site.email,
                  telephone: site.phone.e164,
                  sameAs: [site.productHosts.restrosuite, site.productHosts.medisuite],
                },
                {
                  '@type': 'LocalBusiness',
                  '@id': `${site.domain}/#localbusiness`,
                  name: site.brand,
                  url: `${site.domain}/`,
                  logo: `${site.domain}/brand/codearc-symbol-color.svg`,
                  image: `${site.domain}/brand/codearc-mark-3d.jpg`,
                  description: `Software team in ${site.region.label} — client projects and product family RestroSuite, StaySuite, MediSuite.`,
                  telephone: site.phone.e164,
                  email: site.email,
                  address: {
                    '@type': 'PostalAddress',
                    addressLocality: site.region.addressLocality,
                    addressRegion: site.region.addressRegion,
                    addressCountry: site.region.addressCountry,
                  },
                  priceRange: '$$',
                  currenciesAccepted: site.currency.code,
                  areaServed: [...site.region.areaServed],
                },
                {
                  '@type': 'WebSite',
                  '@id': `${site.domain}/#website`,
                  name: site.brand,
                  url: `${site.domain}/`,
                },
                {
                  '@type': 'Service',
                  '@id': `${site.domain}/#software-services`,
                  name: 'Software design and development services',
                  provider: { '@id': orgId },
                  areaServed: [...site.region.areaServed],
                  serviceType: [
                    'Website design',
                    'Restaurant POS',
                    'Hotel PMS',
                    'Clinic software',
                    'Custom web applications',
                    'Workflow automation',
                  ],
                },
                {
                  '@type': 'SoftwareApplication',
                  '@id': `${site.domain}/#restrosuite`,
                  name: 'RestroSuite',
                  applicationCategory: 'BusinessApplication',
                  operatingSystem: 'Web, Windows, Android',
                  url: `${site.domain}/products/restrosuite`,
                  description: 'Offline-first restaurant POS by CodeArc — billing, kitchen display, WhatsApp receipts.',
                  provider: { '@id': orgId },
                },
                {
                  '@type': 'SoftwareApplication',
                  '@id': `${site.domain}/#staysuite`,
                  name: 'StaySuite',
                  applicationCategory: 'BusinessApplication',
                  operatingSystem: 'Web',
                  url: `${site.domain}/products/staysuite`,
                  description: 'Hotel PMS by CodeArc for rooms, bookings, guest folio and room service.',
                  provider: { '@id': orgId },
                },
                {
                  '@type': 'SoftwareApplication',
                  '@id': `${site.domain}/#medisuite`,
                  name: 'MediSuite',
                  applicationCategory: 'BusinessApplication',
                  operatingSystem: 'Web',
                  url: `${site.domain}/products/medisuite`,
                  description: 'Clinic / OPD console by CodeArc for appointments, queue and billing.',
                  provider: { '@id': orgId },
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id': `${site.domain}/#breadcrumbs`,
                  itemListElement: [
                    {
                      '@type': 'ListItem',
                      position: 1,
                      name: 'Home',
                      item: `${site.domain}/`,
                    },
                    {
                      '@type': 'ListItem',
                      position: 2,
                      name: 'Products',
                      item: `${site.domain}/products`,
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body className="bg-[#F5F1E8] text-[#181713] font-sans antialiased overflow-x-hidden">
        {/* Nuclear failsafe: if React never hydrates on mobile, still clear the logo splash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var k='codearc-brand-intro-seen';if(sessionStorage.getItem(k)==='1'){var s=document.createElement('style');s.textContent='[data-brand-intro]{display:none!important}';document.head.appendChild(s);return;}setTimeout(function(){if(!document.querySelector('[data-brand-intro]'))return;var s=document.createElement('style');s.textContent='[data-brand-intro]{opacity:0!important;visibility:hidden!important;pointer-events:none!important}';document.head.appendChild(s);try{sessionStorage.setItem(k,'1');}catch(e){}},3800);}catch(e){}})();`,
          }}
        />
        <BrandIntro />
        <a href="#main-content" className="v2-skip-link">
          Skip to content
        </a>
        <ScrollToTop />
        {children}
        <FloatingContact />
      </body>
    </html>
  );
}
