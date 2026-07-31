import type { Metadata } from 'next';
import { Manrope, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import ScrollToTop from '../components/ScrollToTop';
import FloatingContact from '../components/FloatingContact';
import BrandIntro from '../components/BrandIntro';
import './globals.css';

const sans = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://codearc.co.in'),
  title: {
    default: 'CodeArc — websites, apps & RestroSuite',
    template: '%s | CodeArc',
  },
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
  authors: [{ name: 'CodeArc', url: 'https://codearc.co.in' }],
  creator: 'CodeArc',
  publisher: 'CodeArc',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'CodeArc',
    title: 'CodeArc — websites, apps & RestroSuite',
    description:
      'Small team in Rajasthan. Client work plus RestroSuite, StaySuite and MediSuite.',
    images: [
      {
        url: '/brand/codearc-og.jpg',
        width: 1200,
        height: 630,
        alt: 'CodeArc',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CodeArc — websites, apps & RestroSuite',
    description:
      'Small team in Rajasthan. Client work plus RestroSuite, StaySuite and MediSuite.',
    images: ['/brand/codearc-og.jpg'],
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/brand/codearc-mark.svg' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://codearc.co.in/#organization",
                  "name": "CodeArc",
                  "url": "https://codearc.co.in/",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://codearc.co.in/brand/codearc-symbol-color.svg"
                  },
                  "description": "CodeArc is a small software team in Rajasthan building websites, apps, and products: RestroSuite, StaySuite, MediSuite.",
                  "email": "hello@codearc.co.in",
                  "telephone": "+919983721179",
                  "sameAs": [
                    "https://restrosuite.codearc.co.in",
                    "https://codearc-medisuite.vercel.app"
                  ]
                },
                {
                  "@type": "LocalBusiness",
                  "@id": "https://codearc.co.in/#localbusiness",
                  "name": "CodeArc",
                  "url": "https://codearc.co.in/",
                  "logo": "https://codearc.co.in/brand/codearc-symbol-color.svg",
                  "image": "https://codearc.co.in/brand/codearc-mark-3d.jpg",
                  "description": "Software team in Rajasthan — client projects and product family RestroSuite, StaySuite, MediSuite.",
                  "telephone": "+919983721179",
                  "email": "hello@codearc.co.in",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Rajasthan",
                    "addressRegion": "Rajasthan",
                    "addressCountry": "IN"
                  },
                  "priceRange": "$$"
                },
                {
                  "@type": "WebSite",
                  "@id": "https://codearc.co.in/#website",
                  "name": "CodeArc",
                  "url": "https://codearc.co.in/"
                },
                {
                  "@type": "Service",
                  "@id": "https://codearc.co.in/#software-services",
                  "name": "Software design and development services",
                  "provider": { "@id": "https://codearc.co.in/#organization" },
                  "areaServed": "IN",
                  "serviceType": [
                    "Website design",
                    "Restaurant POS",
                    "Hotel PMS",
                    "Clinic software",
                    "Custom web applications",
                    "Workflow automation"
                  ]
                },
                {
                  "@type": "SoftwareApplication",
                  "@id": "https://codearc.co.in/#restrosuite",
                  "name": "RestroSuite",
                  "applicationCategory": "BusinessApplication",
                  "operatingSystem": "Web, Windows, Android",
                  "url": "https://codearc.co.in/products/restrosuite",
                  "description": "Offline-first restaurant POS by CodeArc — billing, kitchen display, WhatsApp receipts.",
                  "provider": { "@id": "https://codearc.co.in/#organization" }
                },
                {
                  "@type": "SoftwareApplication",
                  "@id": "https://codearc.co.in/#staysuite",
                  "name": "StaySuite",
                  "applicationCategory": "BusinessApplication",
                  "operatingSystem": "Web",
                  "url": "https://codearc.co.in/products/staysuite",
                  "description": "Hotel PMS by CodeArc for rooms, bookings, guest folio and room service.",
                  "provider": { "@id": "https://codearc.co.in/#organization" }
                },
                {
                  "@type": "SoftwareApplication",
                  "@id": "https://codearc.co.in/#medisuite",
                  "name": "MediSuite",
                  "applicationCategory": "BusinessApplication",
                  "operatingSystem": "Web",
                  "url": "https://codearc.co.in/products/medisuite",
                  "description": "Clinic / OPD console by CodeArc for appointments, queue and billing.",
                  "provider": { "@id": "https://codearc.co.in/#organization" }
                },

                {
                  "@type": "BreadcrumbList",
                  "@id": "https://codearc.co.in/#breadcrumbs",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "Home",
                      "item": "https://codearc.co.in/"
                    },
                    {
                      "@type": "ListItem",
                      "position": 2,
                      "name": "Products",
                      "item": "https://codearc.co.in/products"
                    }
                  ]
                }
              ]
            })
          }}
        />
      </head>
      <body className="bg-[#0b0c0b] text-[#f3f0e8] font-sans antialiased overflow-x-hidden">
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
