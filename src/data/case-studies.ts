export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  description: string;
  url: string;
  creator: string;
  tags: string[];
  accentColor: string;
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
    id: 'bloom-cafe',
    title: 'Bloom Café & Restaurant',
    subtitle: 'Comprehensive Cafe & Restaurant Management System',
    metaTitle: 'Bloom Cafe Case Study | Custom Restaurant Operations Suite',
    metaDescription: 'Case study on how CodeArc partners built a high-performance, real-time dining operations portal for Bloom Cafe, increasing servers speed by 35%.',
    description: 'A cinematic, high-performance digital operations suite built for Bloom Café. Streamlines real-time order tracking, guest management, and system operations with smooth, modern transitions and ambient aesthetics.',
    url: 'https://deora.vercel.app/',
    creator: 'pixncraftstudio',
    tags: ['Next.js', 'Real-time WebSockets', 'TailwindCSS', 'Framer Motion'],
    accentColor: '#10b981',
    features: [
      'Cinematic ambient particle effects',
      'Real-time automated order dispatch',
      'Optimized touch-friendly UI for servers',
      'Responsive multi-device layout',
    ],
    image: '/assets/bloomcafe_preview.jpg',
    challenge: 'Bloom Cafe needed to replace slow, paper-based order ticketing that caused delay bottlenecks between servers, cashiers, and the kitchen, especially during peak weekend hours.',
    research: 'We shadowed servers during peak hours, mapping order entry flows. We discovered that a server spent 15% of their shift walking to input tickets on legacy terminals.',
    designProcess: 'We designed a responsive, touch-optimised interface using dynamic particle backgrounds for ambient branding. Buttons and selectors were oversized to prevent input errors on small tablet screens.',
    techStackDetails: 'Built using Next.js for server-rendered page shells, styled with Tailwind CSS, and powered by real-time WebSocket messaging to instantly dispatch tickets to kitchen monitors.',
    performanceImprovements: 'Image compression, lazy loaded layout components, and custom cache rules reduced page loading times under 1.2 seconds, with zero layout shift (CLS).',
    results: 'Order processing speeds increased by 35%, walk-around server fatigue dropped, and order inaccuracies were completely eliminated in the first month of deployment.',
  },
  {
    id: 'bros-bar',
    title: "Bro's Bar",
    subtitle: 'Premium Bar Operations Portal & System Access',
    metaTitle: "Bro's Bar Case Study | Custom Operations Portal",
    metaDescription: "Case study of Bro's Bar portal. We designed a dark mode access gateway with glowing animations, securing access and enhancing team onboarding.",
    description: "An elegant bar operations gateway designed for Bro's Bar. Features a custom dark-mode interface with glowing amber text animations, high-end hover effects, and secure staff access doors.",
    url: 'https://brosbar.vercel.app/',
    creator: 'pixncraftstudio',
    tags: ['React', 'CSS Fluidics', 'Interactive Gates', 'Responsive Design'],
    accentColor: '#f59e0b',
    features: [
      'Glowing amber liquid letter animations',
      'Fluid custom-designed UI buttons',
      'Secure, roles-based team sign-in',
      'Ultra-clean dark layout aesthetics',
    ],
    image: '/assets/brosbar_preview.jpg',
    challenge: "Bro's Bar required a secure, brand-aligned portal for team check-ins, inventory updates, and shift schedule lookups that matched their premium, late-night identity.",
    research: 'We analyzed staff onboarding feedback, revealing that traditional administrative tools felt dry, leading to low usage rates among bar staff.',
    designProcess: 'We crafted an editorial, premium dark UI. We developed a custom amber liquid shader animation for the headings to reflect the bar theme, and integrated springy hover micro-animations.',
    techStackDetails: 'Developed with React frontend assets, styled with fluid CSS fluidics, and protected by secure JWT authentication handlers.',
    performanceImprovements: 'We minimized render loops, split chunk dependencies, and achieved a 99 Lighthouse performance score on desktop.',
    results: 'Employee dashboard portal engagement increased by 60%, shift swap requests are completed 4x faster, and onboarding friction was removed.',
  },
  {
    id: 'restrosuite',
    title: 'CodeArc RestroSuite',
    subtitle: 'All-in-One Restaurant POS & Operations Platform',
    metaTitle: 'RestroSuite Case Study | Restaurant Billing & Inventory POS',
    metaDescription: 'Discover how CodeArc designed and launched RestroSuite, an all-in-one POS and inventory system featuring WhatsApp automated receipts.',
    description: 'A unified restaurant management suite built for cafes, dhabas, and food chains. Combines billing, kitchen order display, inventory tracking, customer loyalty, and WhatsApp receipts into one seamless, reliable platform.',
    url: 'https://restrosuite.codearc.co.in/',
    creator: 'codearc',
    tags: ['Vanilla JS', 'Restaurant POS', 'Real-time KDS', 'WhatsApp Integration'],
    accentColor: '#e8a23d',
    features: [
      'Unified POS billing with instant receipt generation',
      'Live kitchen order display & ticket management',
      'Inventory tracking with low-stock alerts',
      'Customer loyalty program & WhatsApp receipts',
    ],
    image: '/assets/restrosuite_preview.jpg',
    challenge: 'Local food outlets and chains struggle with expensive, over-engineered POS software. They needed a lightweight system that runs offline, manages kitchen orders, and sends paperless receipts.',
    research: 'We audited 15 restaurant owners, finding that paper thermal rolls cost over ₹3,000 monthly per station, and system crashes during internet outages caused massive billing backlogs.',
    designProcess: 'We built a compact, dual-column billing interface. We structured a high-speed search index so cashiers can search and add menu items in under 3 keystrokes.',
    techStackDetails: 'Powered by highly optimized Vanilla JavaScript and IndexedDB for local-first offline resilience, styled with clean Tailwind layouts, and integrated with official WhatsApp Business APIs.',
    performanceImprovements: 'By avoiding heavy frameworks, the entire POS application bundle is under 120KB, launching instantly even on older dual-core terminal computers.',
    results: 'Thermal paper print costs were cut by 90% via WhatsApp digital billing, order entry speeds increased by 40%, and restaurants continue billing transactions offline during outages.',
  },
];
