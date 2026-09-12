export type ServiceIconName =
  | 'Monitor'
  | 'AppWindow'
  | 'Sparkles'
  | 'Rocket'
  | 'Smartphone'
  | 'MessageSquare'
  | 'Eye';

export interface ServiceDetails {
  slug: string;
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  description: string;
  icon: ServiceIconName;
  accentColor: string;
  accentSoft: string;
  keywords: string[];
  features: { title: string; detail: string }[];
  faqs: { question: string; answer: string }[];
  sections: { title: string; content: string }[];
}

export const servicesData: Record<string, ServiceDetails> = {
  'website-design': {
    slug: 'website-design',
    title: 'Website Design Services',
    subtitle: 'Distinctive design with a clear business purpose',
    metaTitle: 'Website Design Company India | Professional Web Design Services',
    metaDescription: 'Custom website design in India for hospitality brands and growing businesses. Clear strategy, responsive layouts, distinctive visuals, and purposeful conversion journeys.',
    description: 'We design distinctive websites that explain your value clearly and make the next step easy. Every page is shaped around your brand, your customers, and the action you want them to take.',
    icon: 'Monitor',
    accentColor: '#174C3C',
    accentSoft: '#E7EFE9',
    keywords: ['Website Design Company India', 'Small Business Website Design', 'Responsive Web Design', 'Custom UI/UX Design'],
    features: [
      { title: 'Mobile-first responsive layouts', detail: 'Every page is designed and tested on phone screens first, then scaled up — since most Indian visitors will meet your site on mobile.' },
      { title: 'Clear, conversion-focused page structure', detail: 'We organise the message around what visitors need to understand, trust, and do next—without forcing every project into the same formula.' },
      { title: 'Brand-led graphics and interface details', detail: 'Icons, illustrations, and imagery are selected or created to support your brand rather than make the site feel generic.' },
      { title: 'Sleek animations & micro-interactions', detail: 'Subtle hover states, transitions, and scroll reveals add polish without slowing the page down or distracting from your content.' },
    ],
    faqs: [
      {
        question: 'How long does it take to design a custom website?',
        answer: 'A standard custom website design typically takes 2 to 4 weeks. This includes wireframing, UI mockup feedback loops, and design polishing before we write code.',
      },
      {
        question: 'Will my website work on mobile devices?',
        answer: 'Yes. We design mobile-first and test the important pages across phone, tablet, laptop, and large desktop sizes.',
      },
      {
        question: 'Do you design custom graphics or use stock templates?',
        answer: 'We design entirely custom layouts tailored to your brand identity. We do not use generic templates. Any assets or illustrations are crafted specifically for your project.',
      },
      {
        question: 'Can I update the website content myself?',
        answer: 'Yes. We build sites with simple, user-friendly CMS options or modular structures, meaning you can easily update text, swap images, or add blog posts without writing code.',
      },
    ],
    sections: [
      {
        title: 'Why thoughtful web design matters',
        content: 'People decide quickly whether a website feels credible, relevant, and easy to use. Strong design supports that decision with clear information, confident visuals, and an obvious next step. We bring those elements together to help your website earn enquiries, bookings, or purchases.',
      },
      {
        title: 'Our Custom Design Methodology',
        content: 'We begin by mapping what visitors need and how they move from interest to enquiry. Interactive mockups let you review the hierarchy, wording, spacing, and key actions on real devices before development begins. That makes decisions visible early and keeps the finished site aligned with the agreed direction.',
      },
      {
        title: 'Creative design without unnecessary weight',
        content: 'Rich visuals should not make a website frustrating to use. We optimise images, fonts, motion, and code throughout the build, then test performance against targets agreed for the project. The aim is a site that feels distinctive and remains fast in everyday conditions.',
      },
    ],
  },
  'web-development': {
    slug: 'web-development',
    title: 'Custom Web Development',
    subtitle: 'Reliable web applications shaped around your workflow',
    metaTitle: 'Web Development Company India | Custom Web App Services',
    metaDescription: 'Custom web development in India for business portals, subscription products, workflow tools, and secure data-backed applications.',
    description: 'We build secure web portals and business tools around the way your team actually works—from bookings and customer records to inventory, reporting, and approvals.',
    icon: 'AppWindow',
    accentColor: '#174C3C',
    accentSoft: '#E7EFE9',
    keywords: ['Web Development Company India', 'Custom Web Applications', 'Business Portals', 'Full Stack Development'],
    features: [
      { title: 'Database integration and data modeling', detail: 'Your data — customers, orders, bookings, inventory — is structured properly from day one, so reports and search stay fast as you grow.' },
      { title: 'Secure customer and partner logins', detail: 'Role-based accounts mean staff, clients, and admins each see only what they need, protected behind proper authentication.' },
      { title: 'Real-time automated business tools', detail: 'Calculators, dashboards, and status updates refresh live, replacing manual re-entry and end-of-day spreadsheet reconciliation.' },
      { title: 'Custom API creation & third-party hooks', detail: 'We connect your app to the payment, messaging, or logistics providers you already use, instead of forcing you onto new ones.' },
    ],
    faqs: [
      {
        question: 'What technologies do you use for web development?',
        answer: 'We specialise in React, Next.js, Node.js, TypeScript, and databases such as PostgreSQL. The final stack depends on your workflow, data, integrations, security needs, and expected scale.',
      },
      {
        question: 'Can you integrate third-party APIs into my portal?',
        answer: 'Yes, we regularly integrate payment gateways (Razorpay, Stripe), SMS/WhatsApp APIs, shipping aggregators, and CRM platforms like Salesforce or HubSpot.',
      },
      {
        question: 'How do you protect our data?',
        answer: 'We apply security controls appropriate to the system, including encrypted connections, protected credentials, validated inputs, role-based access, and careful handling of sensitive data. We agree any specialist compliance requirements before work begins.',
      },
    ],
    sections: [
      {
        title: 'Custom Web Apps: Built to Automate Operations',
        content: 'Off-the-shelf software is expensive and rarely fits your specific business workflow. Custom web applications solve this by acting as tools designed to match your exact processes. Whether you need an online booking calendar, customer management database, or team timesheet system, CodeArc delivers systems that run in the cloud, work on all devices, and scale without per-user licensing fees.',
      },
      {
        title: 'Engineered for Performance and Security',
        content: 'We use modular, well-typed code, sensible database design, and focused testing to reduce avoidable failures. Performance is measured against the real journeys that matter to your team, with infrastructure chosen for expected traffic and growth.',
      },
    ],
  },
  'react-development': {
    slug: 'react-development',
    title: 'React.js Development Services',
    subtitle: 'Fast, consistent interfaces for complex web products',
    metaTitle: 'React Development Services | Custom SPA & Dashboard Development',
    metaDescription: 'Boost your digital products with expert React development services. We build responsive, modular, and high-performance user interfaces and Single Page Apps.',
    description: 'We use React to build responsive dashboards, portals, booking journeys, and product interfaces that stay consistent as new screens and features are added.',
    icon: 'Sparkles',
    accentColor: '#174C3C',
    accentSoft: '#E7EFE9',
    keywords: ['React Development Services', 'React Developer India', 'Single Page Applications', 'Interactive Dashboards'],
    features: [
      { title: 'Reusable, well-structured components', detail: 'Buttons, forms, and cards are built once and reused everywhere, so your interface stays visually consistent as new screens get added.' },
      { title: 'Seamless state management integration', detail: 'Complex screens — multi-step forms, live filters, nested dashboards — stay predictable and bug-free as they scale.' },
      { title: 'Virtual DOM rendering for instant updates', detail: 'Only the parts of the screen that actually changed get redrawn, so interactions feel instant even on data-heavy pages.' },
      { title: 'Dynamic client data visualization tools', detail: 'Charts, tables, and live counters update in place as your underlying data changes, no manual refresh required.' },
    ],
    faqs: [
      {
        question: 'Why choose React for my frontend product?',
        answer: 'React is a strong fit for products with repeated interface patterns, live data, and complex interactions. Its component model helps teams keep behaviour and design consistent as the product grows.',
      },
      {
        question: 'Can you migrate our existing HTML/PHP system to React?',
        answer: 'Often, yes. We first assess the existing system, data, and business risk, then plan a staged migration so essential workflows remain available while the interface is modernised.',
      },
      {
        question: 'How long does a typical React project take?',
        answer: 'A focused dashboard or portal usually takes 3 to 6 weeks depending on the number of screens and integrations. We scope this precisely after our first planning conversation.',
      },
      {
        question: 'Do you write tests for the components you build?',
        answer: 'Yes, for anything customer-facing or business-critical we add component and integration tests, so future changes don’t silently break existing functionality.',
      },
    ],
    sections: [
      {
        title: 'Building Interactive User Experiences',
        content: 'People expect forms, filters, dashboards, and navigation to respond without interrupting their flow. React gives us a structured way to build those interactions while keeping each part of the interface understandable and testable.',
      },
      {
        title: 'Performance at Scale',
        content: 'A dashboard that feels fast with 10 records needs to still feel fast with 10,000. We use code-splitting, memoization, and virtualized lists so large tables and busy screens stay smooth instead of slowing down as your data grows.',
      },
      {
        title: 'Our React Development Process',
        content: 'We start by mapping the screens and data your team actually touches daily, then build a shared component library so every new screen looks and behaves consistently. You review working builds at each milestone rather than waiting until the very end.',
      },
    ],
  },
  'nextjs-development': {
    slug: 'nextjs-development',
    title: 'Next.js Development Services',
    subtitle: 'Fast, search-ready websites and web applications',
    metaTitle: 'Next.js Development Services | High-Performance Server-Side Rendering',
    metaDescription: 'Optimize SEO and load speeds with our Next.js development services. We specialize in Next.js App Router, Static Site Generation (SSG), and API routes.',
    description: 'We use Next.js to create fast public websites and capable web applications, choosing the right rendering approach for search visibility, content freshness, and product behaviour.',
    icon: 'Rocket',
    accentColor: '#171714',
    accentSoft: '#F1F5F9',
    keywords: ['Next.js Development Services', 'Next.js Company India', 'SEO Friendly React Apps', 'Static Site Generation'],
    features: [
      { title: 'Server-side rendering & static generation', detail: 'Pages are pre-built into fast, fully-formed HTML, so both visitors and search crawlers get instant, complete content on first load.' },
      { title: 'Optimized Next.js Metadata API integration', detail: 'Every page ships with correct titles, descriptions, and social preview cards, generated from a single source of truth per page.' },
      { title: 'Next Image and Font system layouts', detail: 'Images are automatically resized and lazy-loaded, and fonts are self-hosted and pre-loaded, cutting layout shift and load time.' },
      { title: 'Incremental Static Regeneration (ISR) blogs', detail: 'New blog posts and content updates go live without a full site rebuild, keeping pages fast while content stays current.' },
    ],
    faqs: [
      {
        question: 'Is Next.js better than standard React for SEO?',
        answer: 'Next.js adds routing, server rendering, static generation, and metadata tools around React. Those capabilities can make public content easier for search engines to discover while preserving rich interactions.',
      },
      {
        question: 'Can you migrate my existing React app to Next.js?',
        answer: 'Yes. Most React component code can be reused directly; the migration work is mainly in routing, data fetching, and rendering strategy, which we handle without disrupting your current users.',
      },
      {
        question: 'Do you support the App Router or Pages Router?',
        answer: 'We build new projects on the modern App Router for its performance and layout benefits, and can maintain or gradually migrate existing Pages Router projects.',
      },
    ],
    sections: [
      {
        title: 'A stronger foundation for search visibility',
        content: 'Next.js can deliver complete, semantic HTML with clear titles, canonical links, structured data, and useful page content before client-side interactions begin. That creates a sound technical foundation for SEO, while content quality and authority still determine the wider result.',
      },
      {
        title: 'Choosing Between SSR, SSG, and ISR',
        content: 'Not every page needs to be rebuilt on every request. We choose static generation for pages that rarely change, incremental regeneration for content like blogs that update periodically, and server rendering for anything that must reflect real-time data — keeping your site both fast and current.',
      },
    ],
  },
  'ecommerce-development': {
    slug: 'ecommerce-development',
    title: 'Ecommerce Website Development',
    subtitle: 'Online stores designed around confident buying',
    metaTitle: 'Ecommerce Website Development India | Custom Online Stores',
    metaDescription: 'Scale your online sales with our ecommerce website development services in India. We design custom e-shops, Shopify templates, and custom carts.',
    description: 'We create online stores that make products easy to find, understand, and buy. Checkout, payments, stock, and customer communication are tailored to your operation.',
    icon: 'Smartphone',
    accentColor: '#F04E2F',
    accentSoft: '#F8E4DE',
    keywords: ['Ecommerce Website Development', 'Custom Online Store India', 'Shopify Development', 'Payment Gateway Integration'],
    features: [
      { title: 'Advanced product listings & category filters', detail: 'Shoppers can filter by price, size, or category and find what they want in seconds, even in large catalogs.' },
      { title: 'Secure payment integrations (Razorpay, Stripe)', detail: 'Checkout runs through trusted, PCI-compliant payment gateways, so customers pay confidently and you get settled fast.' },
      { title: 'WhatsApp order updates when required', detail: 'Where it fits the project, confirmations and delivery updates can be connected to an approved WhatsApp messaging provider.' },
      { title: 'Admin dashboard for stock & order management', detail: 'You manage inventory, pricing, and order status from one simple screen, no spreadsheet exports required.' },
    ],
    faqs: [
      {
        question: 'Do you build custom ecommerce sites or use platforms like Shopify?',
        answer: 'We do both. For small stores, Shopify is often the most cost-effective solution. For businesses with complex logistics, custom pricing, or membership rules, we build custom carts.',
      },
      {
        question: 'Can you migrate my store from another platform?',
        answer: 'Yes, we migrate products, customer records, and order history from platforms like WooCommerce or Shopify with minimal downtime, and set up redirects to protect existing SEO rankings.',
      },
      {
        question: 'Do you handle GST-compliant invoicing for Indian sellers?',
        answer: 'Yes. Checkout and invoicing are built to generate GST-compliant bills automatically, and can be configured for your specific tax and HSN code setup.',
      },
    ],
    sections: [
      {
        title: 'Converting Carts to Customers',
        content: 'Online stores lose customers when products are difficult to find or checkout asks for more effort than necessary. We simplify search, product pages, and payment steps while keeping the information shoppers need to make a confident choice.',
      },
      {
        title: 'Built for Indian Payment & Delivery Realities',
        content: 'We design around how Indian shoppers actually buy: UPI and card payments alongside cash-on-delivery where it makes sense, WhatsApp order confirmations, and shipping integrations with the couriers you already use, so nothing about checkout feels unfamiliar to your customers.',
      },
    ],
  },
  'landing-page-design': {
    slug: 'landing-page-design',
    title: 'High-Converting Landing Pages',
    subtitle: 'Focused campaign pages built around one clear action',
    metaTitle: 'Landing Page Design India | Conversion Rate Optimization',
    metaDescription: 'Generate more leads with custom landing page design services. Optimized layouts, clear CTAs, and automated sheet integrations to capture leads.',
    description: 'We design focused landing pages that connect an advert or campaign to one clear next step, with useful analytics and fewer distractions.',
    icon: 'MessageSquare',
    accentColor: '#10B981',
    accentSoft: '#ECFDF5',
    keywords: ['Landing Page Design India', 'Lead Generation Landing Page', 'PPC Landing Page Services', 'Conversion Rate Optimization'],
    features: [
      { title: 'Conversion-focused visual structure', detail: 'Navigation and distractions are stripped away, keeping every visitor focused on a single next step.' },
      { title: 'Clear, call-to-action hooks', detail: 'Buttons and forms use direct, benefit-led language so visitors always know what happens when they click.' },
      { title: 'A/B testable modular layouts', detail: 'Sections are built as swappable blocks, so you can test a new headline or offer without rebuilding the page.' },
      { title: 'Automated Google Sheets & CRM inputs', detail: 'Every submitted lead lands automatically in your spreadsheet or CRM, ready to follow up on without manual copying.' },
    ],
    faqs: [
      {
        question: 'What is the difference between a landing page and a website?',
        answer: 'A website is a multi-page portal designed to introduce a brand. A landing page is a single, focused page with one specific goal: converting search visitors from ads into leads.',
      },
      {
        question: 'How many landing page variations can I test?',
        answer: 'Because sections are built as modular blocks, you can test different headlines, offers, or hero images without a full rebuild — we typically start with 2-3 variants of the highest-impact section.',
      },
      {
        question: 'Do you handle the ad copy and creative too?',
        answer: 'Our core focus is the landing page itself, but we regularly collaborate with your ad manager or agency to make sure headline and creative match the page message exactly.',
      },
    ],
    sections: [
      {
        title: 'Turning Clicks into Calls',
        content: 'Campaign traffic often arrives with a specific question or intent. A dedicated landing page can answer it directly, support the offer with relevant proof, and guide visitors towards one clear enquiry or purchase action.',
      },
      {
        title: 'Designed for Ad Spend ROI',
        content: 'Every element on the page is built to justify its place: page speed is optimized so ad clicks don’t bounce before they load, forms are kept short to reduce drop-off, and event tracking is wired in from day one so you can see exactly which campaigns are converting.',
      },
    ],
  },
  'website-redesign': {
    slug: 'website-redesign',
    title: 'Website Redesign Services',
    subtitle: 'A clearer brand, faster experience, and safer migration',
    metaTitle: 'Website Redesign Services India | Modernize & Speed Up Your Site',
    metaDescription: 'Modernize your online presence. Our website redesign services in India upgrade your site with modern UI/UX design, mobile responsiveness, and page speed.',
    description: 'We improve outdated or underperforming websites without losing the content, search visibility, and brand recognition that already have value.',
    icon: 'Eye',
    accentColor: '#E11D48',
    accentSoft: '#FFF1F2',
    keywords: ['Website Redesign Services India', 'Modernize Outdated Website', 'Improve Website Performance', 'SEO Migration Services'],
    features: [
      { title: 'Complete brand identity revitalization', detail: 'Colors, type, and imagery are refreshed to look current, while keeping the brand recognizable to returning customers.' },
      { title: 'Clean layouts and layout shifts fixed', detail: 'Common culprits like unsized images and late-loading fonts are addressed so pages stop jumping around as they load.' },
      { title: 'SEO rank protection (URL mapping)', detail: 'Existing URLs are mapped to their new equivalents with proper redirects, so your rankings and backlinks carry over.' },
      { title: 'Measured performance improvements', detail: 'We identify heavy scripts, images, fonts, and third-party tools, then compare the redesigned site against the original using agreed performance measures.' },
    ],
    faqs: [
      {
        question: 'Will our current Google rankings drop during a redesign?',
        answer: 'Any redesign carries some search risk, so we reduce it by auditing important pages, preserving useful URLs, mapping redirects, carrying over metadata, and monitoring the site after launch.',
      },
      {
        question: 'How long does a redesign typically take?',
        answer: 'Most redesigns take 3 to 5 weeks depending on page count and how much content needs to be reorganized, not just restyled.',
      },
      {
        question: 'Can you redesign the site while it stays live?',
        answer: 'Yes. We build and review the new design in a private staging environment and only switch it live once you’ve approved it, so visitors never see a half-finished site.',
      },
    ],
    sections: [
      {
        title: 'Why Redesign an Outdated Website?',
        content: 'A redesign is worthwhile when the current site no longer represents the business, performs poorly on important devices, or makes essential information difficult to find. We keep what still works and improve the structure, visual language, speed, and content where evidence supports the change.',
      },
      {
        title: 'Our Redesign Safety Net',
        content: 'The biggest risk in any redesign is losing the traffic and rankings you already have. Before touching any design, we audit your existing URLs, top-performing pages, and inbound links, then plan the new sitemap around protecting what already works rather than starting from a blank page.',
      },
    ],
  },
};
