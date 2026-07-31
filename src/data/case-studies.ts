export type CaseStudyKind = 'client' | 'product';

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  description: string;
  url: string;
  isExternal: boolean;
  creator: string;
  kind: CaseStudyKind;
  statusLabel: string;
  tags: string[];
  features: string[];
  image: string;
  challenge: string;
  research: string;
  designProcess: string;
  techStackDetails: string;
  performanceImprovements: string;
  results: string;
}

export const caseStudiesData: CaseStudy[] = [
  {
    id: 'restrosuite',
    title: 'RestroSuite',
    subtitle: 'Offline-first restaurant POS by CodeArc',
    metaTitle: 'RestroSuite — live restaurant POS',
    metaDescription:
      'RestroSuite: CodeArc’s restaurant POS with billing, kitchen display, WhatsApp receipts and multi-outlet support.',
    description:
      'Our own product for restaurants — counter billing that still works when the network drops, kitchen display, WhatsApp receipts and QR ordering.',
    url: 'https://restrosuite.codearc.co.in',
    isExternal: true,
    creator: 'codearc',
    kind: 'product',
    statusLabel: 'Live product',
    tags: ['POS', 'Restaurants', 'Offline-friendly', 'WhatsApp'],
    features: [
      'POS billing',
      'Kitchen display',
      'WhatsApp receipts',
      'QR table ordering',
      'Windows and Android apps',
    ],
    image: '/assets/restrosuite_preview.png',
    challenge:
      'Food outlets were stuck between paper bills and cloud POS that fails when Wi-Fi dies mid-service.',
    research:
      'We watched real shifts: add items, fire kitchen, settle bill, fix a wrong order — all under time pressure.',
    designProcess:
      'Screens stay dense where counters need speed. Restaurant UI lives as its own product, not a one-off client theme.',
    techStackDetails:
      'Web app plus desktop and Android options, with WhatsApp receipts and multi-outlet accounts for growing restaurants.',
    performanceImprovements:
      'Billing still works when the connection drops — so rush hour does not stop at the counter.',
    results:
      'Live product. Open the app or product page. Outlet-specific numbers stay private unless the owner agrees to share.',
  },
  {
    id: 'wild-jawai-safari',
    title: 'Wild Jawai Safari',
    subtitle: 'Leopard safari & Jawai tourism site',
    metaTitle: 'Wild Jawai Safari — tourism website',
    metaDescription:
      'Wild Jawai Safari: website for leopard safaris, dam trips and stays in Jawai, Rajasthan — built by CodeArc.',
    description:
      'A premium tourism site for Jawai leopard safaris, dam experiences, Rabari culture and guest enquiries.',
    url: 'https://wild-jawai-safari.vercel.app',
    isExternal: true,
    creator: 'codearc',
    kind: 'client',
    statusLabel: 'Live site',
    tags: ['Tourism', 'Website', 'Enquiry', 'Rajasthan'],
    features: [
      'Safari and experience pages',
      'Enquiry flow',
      'Photo-led Jawai storytelling',
      'Mobile-friendly layout',
    ],
    image: '/assets/wild_jawai_live.webp',
    challenge:
      'Guests needed a clear path from “I want to see leopards” to a real enquiry, without a cluttered brochure site.',
    research:
      'Tour questions are practical: when, what is included, how to reach, and who to call or WhatsApp.',
    designProcess:
      'Strong hero media, short sections, obvious contact — built for phones first.',
    techStackDetails:
      'Fast marketing website with enquiry form and structured tour pages.',
    performanceImprovements:
      'Images and pages tuned so the site loads cleanly on mobile networks.',
    results: 'Live and open to guests for safari enquiries.',
  },
  {
    id: 'bros-bar',
    title: "Bro's Bar",
    subtitle: 'Bar POS & operations',
    metaTitle: "Bro's Bar POS",
    metaDescription: "Bro's Bar POS — billing and bar operations software by CodeArc.",
    description:
      'POS-focused build for a bar environment — fast billing and floor flow for service hours.',
    url: 'https://brosbar.vercel.app',
    isExternal: true,
    creator: 'codearc',
    kind: 'client',
    statusLabel: 'Live site',
    tags: ['Bar', 'POS', 'Operations'],
    features: ['Counter billing', 'Bar operations screens', 'Service-hour speed'],
    image: '/assets/brosbar_live.webp',
    challenge: 'Bars need faster item entry and settlement than a full restaurant stack.',
    research: 'Watched peak-hour order and settle patterns on a bar counter.',
    designProcess: 'Lean POS UI, fewer steps, readable under low light.',
    techStackDetails: 'Bar billing interface built for speed at the counter.',
    performanceImprovements: 'Short paths from item to bill.',
    results: 'Live bar POS in use.',
  },
  {
    id: 'theo-media',
    title: 'Theo Media',
    subtitle: 'Agency marketing site',
    metaTitle: 'Theo Media',
    metaDescription: 'Theo Media site built with CodeArc.',
    description:
      'Marketing site for Theo Media — design and engineering studio positioning, shipped live.',
    url: 'https://theo-media-house.vercel.app',
    isExternal: true,
    creator: 'codearc',
    kind: 'client',
    statusLabel: 'Live site',
    tags: ['Agency', 'Marketing site'],
    features: ['Studio positioning', 'Responsive layout', 'Modern motion'],
    image: '/assets/theo_live.webp',
    challenge: 'Agency needed a distinctive site that still loads cleanly and reads clearly.',
    research: 'Portfolio sites fail when the story is vague; we kept sections short and visual.',
    designProcess: 'Strong hero, clear services and work narrative.',
    techStackDetails: 'Marketing website for the studio brand.',
    performanceImprovements: 'Polished visuals without a heavy page feel.',
    results: 'Live studio website.',
  },
  {
    id: 'bloom-cafe',
    title: 'Bloom Café',
    subtitle: 'Cafe operations interface',
    metaTitle: 'Bloom Café',
    metaDescription: 'Bloom Café operations and digital experience work by CodeArc.',
    description:
      'Cafe operations UI work for Bloom Café — order and floor visibility patterns we reuse in hospitality builds.',
    url: 'https://deora.vercel.app',
    isExternal: true,
    creator: 'codearc',
    kind: 'client',
    statusLabel: 'Live system',
    tags: ['Cafe', 'Operations'],
    features: ['Order visibility', 'Cafe floor patterns', 'Hospitality UI'],
    image: '/assets/bloomcafe_live.webp',
    challenge: 'Cafe staff needed screens that match busy service, not a generic admin theme.',
    research: 'Peak hours: tickets, status, who is waiting.',
    designProcess: 'Calm surfaces, clear status, touch-friendly controls.',
    techStackDetails: 'Operations interface shaped for cafe service hours.',
    performanceImprovements: 'UI tuned for repeated counter use.',
    results: 'Live operations system for the café team.',
  },
];
