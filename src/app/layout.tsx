import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const sans = Plus_Jakarta_Sans({
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
    default: 'CodeArc | Websites, Web Apps & Android Apps Built Simply',
    template: '%s | CodeArc',
  },
  description: 'We design clean, fast, and beautiful websites, custom web tools, and Android apps for growing businesses. Simple software that helps you grow.',
  keywords: [
    'Web Development Company India',
    'Website Design Company India',
    'React Development Services',
    'Next.js Development Services',
    'Ecommerce Website Development',
    'Small Business Website Design',
    'Custom Web Applications',
  ],
  authors: [{ name: 'CodeArc Team', url: 'https://codearc.co.in' }],
  creator: 'CodeArc',
  publisher: 'CodeArc',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://codearc.co.in/',
    siteName: 'CodeArc',
    title: 'CodeArc | Websites, Web Apps & Android Apps Built Simply',
    description: 'We design clean, fast, and beautiful websites, custom web tools, and Android apps for growing businesses. Simple software that helps you grow.',
    images: [
      {
        url: '/assets/codearc_og.png',
        width: 1200,
        height: 630,
        alt: 'CodeArc Software Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CodeArc | Websites, Web Apps & Android Apps Built Simply',
    description: 'We design clean, fast, and beautiful websites, custom web tools, and Android apps for growing businesses. Simple software that helps you grow.',
    images: ['/assets/codearc_og.png'],
  },
  alternates: {
    canonical: 'https://codearc.co.in/',
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
                    "url": "https://codearc.co.in/assets/codearc_logo.png"
                  },
                  "description": "We design clean, fast, and beautiful websites, custom web tools, and Android apps for growing businesses. Simple software that helps you grow.",
                  "email": "hello@codearc.dev",
                  "telephone": "+919983721179"
                },
                {
                  "@type": "LocalBusiness",
                  "@id": "https://codearc.co.in/#localbusiness",
                  "name": "CodeArc",
                  "url": "https://codearc.co.in/",
                  "logo": "https://codearc.co.in/assets/codearc_logo.png",
                  "image": "https://codearc.co.in/assets/codearc_og.png",
                  "description": "We design clean, fast, and beautiful websites, custom web tools, and Android apps for growing businesses.",
                  "telephone": "+919983721179",
                  "email": "hello@codearc.dev",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Jaipur",
                    "addressRegion": "Rajasthan",
                    "postalCode": "302001",
                    "addressCountry": "IN"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": "26.9124",
                    "longitude": "75.7873"
                  },
                  "priceRange": "$$"
                },
                {
                  "@type": "WebSite",
                  "@id": "https://codearc.co.in/#website",
                  "name": "CodeArc",
                  "url": "https://codearc.co.in/"
                }
              ]
            })
          }}
        />
      </head>
      <body className="bg-[#FCFCFD] text-[#0F172A] font-sans antialiased overflow-x-hidden selection:bg-[#4F46E5]/10 selection:text-[#4F46E5] transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
