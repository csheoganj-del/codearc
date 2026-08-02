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
    title: 'Wild Jawai',
    subtitle: 'Cinematic leopard brand experience',
    metaTitle: 'Wild Jawai — land of leopards brand site',
    metaDescription:
      'Wild Jawai: cinematic brand website for the land of leopards — walking leopard hero, granite sky story and safari booking — built by CodeArc.',
    description:
      'A cinematic brand site for Wild Jawai — leopard on the granite sky, slow scroll storytelling and a clear path to book a safari.',
    url: 'https://wild-jawai-safari.vercel.app',
    isExternal: true,
    creator: 'codearc',
    kind: 'client',
    statusLabel: 'Live site',
    tags: ['Tourism', 'Brand', 'Cinematic', 'Rajasthan'],
    features: [
      'Walking leopard hero sequence',
      'Cinematic scroll storytelling',
      'Safari booking CTA',
      'Mobile-friendly motion layout',
    ],
    image: '/assets/wild_jawai_live.webp',
    challenge:
      'A Jawai brand needed a first impression that felt wild and premium — not a stock tourism brochure.',
    research:
      'Guests remember the landscape and the leopard; the site had to lead with motion and place, then invite booking.',
    designProcess:
      'Bone-white sky canvas, full-bleed leopard walk, typography-led sections and a quiet booking path.',
    techStackDetails:
      'Lightweight marketing site with cinematic hero media and smooth scroll.',
    performanceImprovements:
      'Hero frames and assets tuned so motion stays smooth on mobile networks.',
    results: 'Live at wild-jawai-safari.vercel.app as the brand flagship experience.',
  },
  {
    id: 'wild-jawai',
    title: 'Wild Jawai Safari',
    subtitle: 'Safari tours & guest enquiry site',
    metaTitle: 'Wild Jawai Safari — tourism website',
    metaDescription:
      'Wild Jawai Safari: website for leopard safaris, dam trips and stays in Jawai, Rajasthan — built by CodeArc.',
    description:
      'A practical tourism site for Jawai leopard safaris, dam experiences, Rabari culture and guest enquiries.',
    url: 'https://wild-jawai.vercel.app',
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
    image: '/assets/wild_jawai_safari_live.webp',
    challenge:
      'Guests needed a clear path from “I want to see leopards” to a real enquiry, without a cluttered brochure site.',
    research:
      'Tour questions are practical: when, what is included, how to reach, and who to call or WhatsApp.',
    designProcess:
      'Strong hero media, short sections, obvious contact — built for phones first.',
    techStackDetails:
      'Next.js marketing website with enquiry form and structured tour pages.',
    performanceImprovements:
      'Images and pages tuned so the site loads cleanly on mobile networks.',
    results: 'Live at wild-jawai.vercel.app for safari enquiries.',
  },
  {
    id: 'leopard-trails',
    title: 'Leopard Trails',
    subtitle: 'Ultra-luxury Jawai leopard safari resort',
    metaTitle: 'Leopard Trails — luxury safari resort website',
    metaDescription:
      'Leopard Trails Jawai: ultra-luxury leopard safari resort website with suites, expeditions and reservations — built by CodeArc.',
    description:
      'A cinematic luxury resort site for Leopard Trails Jawai — granite-hill safaris, plunge-pool suites, bush dining and concierge booking.',
    url: 'https://leopardtrails.vercel.app',
    isExternal: true,
    creator: 'codearc',
    kind: 'client',
    statusLabel: 'Live site',
    tags: ['Tourism', 'Luxury', 'Resort', 'Rajasthan'],
    features: [
      'Luxury suite storytelling',
      'Safari & expedition pages',
      'Reservation / concierge flow',
      'Photo-led wilderness brand',
    ],
    image: '/assets/leopard_trails_live.png',
    challenge:
      'A high-end Jawai resort needed a brand site that felt exclusive — not a generic hotel template.',
    research:
      'Guests book on feeling and clarity: suites, safaris, dining, and how to reach the outpost.',
    designProcess:
      'Dark luxury palette, full-bleed wilderness media, clear paths to reserve and explore.',
    techStackDetails:
      'Marketing site with multi-page resort content and reservation request flow.',
    performanceImprovements:
      'Hero and gallery assets tuned for mobile while keeping a cinematic desktop feel.',
    results: 'Live at leopardtrails.vercel.app for resort and safari enquiries.',
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
    image: '/assets/brosbar_poster.png',
    challenge: 'Bars need faster item entry and settlement than a full restaurant stack.',
    research: 'Watched peak-hour order and settle patterns on a bar counter.',
    designProcess: 'Lean POS UI, fewer steps, readable under low light.',
    techStackDetails: 'Bar billing interface built for speed at the counter.',
    performanceImprovements: 'Short paths from item to bill.',
    results: 'Live bar POS in use.',
  },
  {
    id: 'deora-plaza',
    title: 'Deora Plaza',
    subtitle: 'Hospitality management system',
    metaTitle: 'Deora Plaza — hospitality management',
    metaDescription:
      'Deora Plaza hospitality management system by CodeArc — cafe, hotel and operations in one dark-luxury entry experience.',
    description:
      'Full hospitality OS for Deora Plaza — hotel, cafe and floor ops behind a dark luxury entry with spark brand reveal.',
    url: 'https://deora.vercel.app',
    isExternal: true,
    creator: 'codearc',
    kind: 'client',
    statusLabel: 'Live system',
    tags: ['Hospitality', 'Hotel', 'Cafe', 'Operations'],
    features: [
      'Hotel + cafe modules',
      'Staff dashboards',
      'Billing and floor ops',
      'Dark luxury entry screen',
    ],
    // Dark entry frame (animation lives in /work-proxy/deora — not the building photo)
    image: '/assets/deora_poster.png',
    challenge:
      'A multi-unit hospitality venue needed one system for hotel and cafe ops — without a plain admin shell.',
    research:
      'Mapped reception, F&B and owner views so each desk opens the right module in seconds.',
    designProcess:
      'Cinematic entry with spark text reveal, then role-based dashboards for real service hours.',
    techStackDetails:
      'Next.js hospitality platform with auth, billing and multi-unit workflows (live at deora.vercel.app).',
    performanceImprovements:
      'Fast entry path and modular dashboards so staff are not lost in a generic ERP.',
    results: 'Live hospitality management system for Deora Plaza.',
  },
  {
    id: 'theo-media',
    title: 'TheoMedia',
    subtitle: 'UK / Ireland / Europe sister site',
    metaTitle: 'TheoMedia — CodeArc UK & Europe branch',
    metaDescription:
      'TheoMedia is CodeArc’s UK, Ireland and Europe branch — websites, apps and the same product family for international clients.',
    description:
      'Our sister brand for UK, Ireland and Europe. Same studio DNA — websites, apps, RestroSuite and more — with local contact and pricing.',
    url: 'https://www.theomedia.co.uk',
    isExternal: true,
    creator: 'codearc',
    kind: 'client',
    statusLabel: 'Live site',
    tags: ['Sister brand', 'UK & Europe', 'Marketing site'],
    features: ['UK / EU market site', 'Local contact & currency', 'Shared product family'],
    image: '/assets/theo_live.png',
    challenge:
      'International clients needed a clear CodeArc-family presence without India-only contact and INR pricing.',
    research:
      'Sister-brand sites work when the story stays consistent and the market details (phone, currency, legal) are local.',
    designProcess:
      'Matched CodeArc’s product story with TheoMedia branding for UK, Ireland and Europe.',
    techStackDetails: 'Next.js marketing site aligned with the CodeArc codebase and product pages.',
    performanceImprovements: 'Fast static pages with the same product family narrative as CodeArc.',
    results: 'Live at theomedia.co.uk for international enquiries.',
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
    image: '/assets/bloomcafe_poster.png',
    challenge: 'Cafe staff needed screens that match busy service, not a generic admin theme.',
    research: 'Peak hours: tickets, status, who is waiting.',
    designProcess: 'Calm surfaces, clear status, touch-friendly controls.',
    techStackDetails: 'Operations interface shaped for cafe service hours.',
    performanceImprovements: 'UI tuned for repeated counter use.',
    results: 'Live operations system for the café team.',
  },
];
