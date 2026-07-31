export type ProductStatus = 'live' | 'building' | 'planned';

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  status: ProductStatus;
  category: string;
  image: string;
  href: string;
  externalUrl?: string;
  highlights: string[];
  audience: string;
  story: string;
  metaTitle: string;
  metaDescription: string;
}

export const productsData: Product[] = [
  {
    slug: 'restrosuite',
    name: 'RestroSuite',
    tagline: 'Offline-first restaurant POS — bill even when Wi-Fi drops.',
    description:
      'POS billing, kitchen display, WhatsApp receipts, inventory and multi-outlet management. Built for cafés, dhabas and restaurants that need something solid at rush hour.',
    status: 'live',
    category: 'Restaurants',
    image: '/assets/restrosuite_preview.png',
    href: '/products/restrosuite',
    externalUrl: 'https://restrosuite.codearc.co.in',
    highlights: [
      'Offline-first billing at the counter',
      'Kitchen display (KDS) for order flow',
      'WhatsApp receipts for guests',
      'QR table ordering',
      'Windows + Android installers',
    ],
    audience: 'Restaurants, cafés and food outlets that need reliable day-to-day tools.',
    story:
      'RestroSuite is our live product under CodeArc. Web, Windows and Android options are available. We keep tightening it with every outlet that uses it.',
    metaTitle: 'RestroSuite — Restaurant POS',
    metaDescription:
      'RestroSuite by CodeArc: offline-first restaurant POS with billing, kitchen display, WhatsApp receipts and QR ordering.',
  },
  {
    slug: 'staysuite',
    name: 'StaySuite',
    tagline: 'Hotel PMS — rooms, bookings, folio and room service.',
    description:
      'Property management for boutique hotels and lodges: rooms, check-in/out, guest folio, GST and room service. Sibling of RestroSuite — hotel and cafe can wire together when you need it.',
    status: 'building',
    category: 'Hotels',
    image: '/assets/staysuite_preview.jpg',
    href: '/products/staysuite',
    highlights: [
      'Rooms and booking calendar',
      'Check-in / check-out and guest folio',
      'Hotel GST reporting',
      'Room service linked to kitchen flow',
    ],
    audience: 'Boutique hotels, lodges and properties that also run food service.',
    story:
      'StaySuite grew out of real hotel work. It sits next to RestroSuite in the CodeArc family — built for the front desk first, not a generic hotel template.',
    metaTitle: 'StaySuite — Hotel PMS',
    metaDescription:
      'StaySuite by CodeArc: hotel PMS for rooms, bookings, guest folio, GST and room service. Sibling of RestroSuite.',
  },
  {
    slug: 'medisuite',
    name: 'MediSuite',
    tagline: 'Clinic / OPD desk — appointments, queue and billing.',
    description:
      'A simple console for clinics: appointments, patient queue and billing in one place. Same CodeArc product family as RestroSuite and StaySuite.',
    status: 'building',
    category: 'Clinics',
    image: '/assets/medisuite_preview.jpg',
    href: '/products/medisuite',
    externalUrl: 'https://codearc-medisuite.vercel.app',
    highlights: [
      'Clinic / OPD appointments',
      'Patient queue on the desk',
      'Billing for everyday visits',
      'Clean ink-and-copper brand for clinics',
    ],
    audience: 'Clinics and OPD practices that want one calm desk, not hospital enterprise software.',
    story:
      'MediSuite is the clinic sibling in the CodeArc suite family. A live preview is up; we are still shaping it with real clinic feedback.',
    metaTitle: 'MediSuite — Clinic management',
    metaDescription:
      'MediSuite by CodeArc: clinic and OPD software for appointments, queue and billing. Sibling of RestroSuite and StaySuite.',
  },
];

export function getProduct(slug: string): Product | undefined {
  return productsData.find((p) => p.slug === slug);
}

export function statusLabel(status: ProductStatus): string {
  switch (status) {
    case 'live':
      return 'Live';
    case 'building':
      return 'Early access';
    case 'planned':
      return 'Planned';
  }
}

export function productStatusClass(status: ProductStatus): string {
  if (status === 'live') return 'v2-status-live';
  if (status === 'building') return 'v2-status-building';
  return 'v2-status-planned';
}
