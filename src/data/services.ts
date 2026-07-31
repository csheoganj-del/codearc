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
    subtitle: 'Stunning, Conversion-Focused Visual Design',
    metaTitle: 'Website Design Company India | Professional Web Design Services',
    metaDescription: 'Looking for a premier website design company in India? We create bespoke, mobile-responsive, and high-converting websites tailored to grow your small business.',
    description: 'We craft beautiful, high-converting websites designed specifically to turn search traffic into loyal clients. Every pixel, layout, and line of copy is optimized to tell your story clearly and drive actions.',
    icon: 'Monitor',
    accentColor: '#174C3C',
    accentSoft: '#E7EFE9',
    keywords: ['Website Design Company India', 'Small Business Website Design', 'Responsive Web Design', 'Custom UI/UX Design'],
    features: [
      { title: 'Mobile-first responsive layouts', detail: 'Every page is designed and tested on phone screens first, then scaled up — since most Indian visitors will meet your site on mobile.' },
      { title: 'High-conversion landing architectures', detail: 'Page structure follows a proven attention flow: hook, proof, offer, and a clear call to action, so visitors know exactly what to do next.' },
      { title: 'Custom graphics and UI iconography', detail: 'Icons, illustrations, and imagery are chosen or created to match your brand — never generic stock art dropped into a template.' },
      { title: 'Sleek animations & micro-interactions', detail: 'Subtle hover states, transitions, and scroll reveals add polish without slowing the page down or distracting from your content.' },
    ],
    faqs: [
      {
        question: 'How long does it take to design a custom website?',
        answer: 'A standard custom website design typically takes 2 to 4 weeks. This includes wireframing, UI mockup feedback loops, and design polishing before we write code.',
      },
      {
        question: 'Will my website work on mobile devices?',
        answer: 'Yes, absolutely. Over 60% of web traffic in India is mobile. We design mobile-first to ensure your site is fast, responsive, and easy to read on screens of all sizes.',
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
        title: 'Why Professional Web Design Matters in 2026',
        content: 'Your website is your digital storefront. Within 0.05 seconds, users form an opinion about your business based on your design. A generic template screams unprofessionalism, while a polished, custom-designed user interface creates instant credibility. At CodeArc, a leading website design company in India, we blend visual aesthetics with modern conversion practices to build digital experiences that drive phone calls, lead forms, and digital purchases.',
      },
      {
        title: 'Our Custom Design Methodology',
        content: 'Our process starts with visual wireframing. We map out user journeys, identifying how customers discover your service and what steps they take to make an inquiry. We then build interactive, clickable high-fidelity design mockups. You can open these mockups directly on your mobile device to test layouts, spacing, and buttons before we begin coding. This ensures zero surprises and a polished final product.',
      },
      {
        title: 'High Performance Meets Creative Design',
        content: 'Many designers build bloated websites filled with heavy images and slow scripts. We balance visual elements with code optimization. By leveraging modern layouts, SVG illustrations, and optimized web fonts, we guarantee that your website is not only beautiful but also scores 95+ on Lighthouse audits. Speed is a vital ranking factor on Google, and we design with speed in mind from day one.',
      },
    ],
  },
  'web-development': {
    slug: 'web-development',
    title: 'Custom Web Development',
    subtitle: 'Robust, Scaleable Web Applications & Systems',
    metaTitle: 'Web Development Company India | Custom Web App Services',
    metaDescription: 'Searching for a trusted web development company in India? CodeArc builds robust, fast, and secure custom web applications, SaaS tools, and business backends.',
    description: 'We develop secure, responsive, and robust web portals and tools designed to run your business operations smoothly. We eliminate complex spreadsheet dependencies and replace them with intuitive databases.',
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
        answer: 'We specialize in React, Next.js, Node.js, and TypeScript, backed by robust database platforms like PostgreSQL. This ensures your systems are secure, scalable, and fast.',
      },
      {
        question: 'Can you integrate third-party APIs into my portal?',
        answer: 'Yes, we regularly integrate payment gateways (Razorpay, Stripe), SMS/WhatsApp APIs, shipping aggregators, and CRM platforms like Salesforce or HubSpot.',
      },
      {
        question: 'How do you guarantee the security of our data?',
        answer: 'We implement industry best practices: HTTPS protocols, end-to-end data encryption, secure environment variables, sanitized SQL inputs to prevent injection, and JWT authorization.',
      },
    ],
    sections: [
      {
        title: 'Custom Web Apps: Built to Automate Operations',
        content: 'Off-the-shelf software is expensive and rarely fits your specific business workflow. Custom web applications solve this by acting as tools designed to match your exact processes. Whether you need an online booking calendar, customer management database, or team timesheet system, CodeArc delivers systems that run in the cloud, work on all devices, and scale without per-user licensing fees.',
      },
      {
        title: 'Engineered for Performance and Security',
        content: 'At CodeArc, our engineering standards are built around efficiency. We write modular, well-typed TypeScript code that keeps bugs out of production. We ensure databases are indexed for rapid queries, servers are configured for auto-scaling, and code loads incrementally so your pages load in milliseconds.',
      },
    ],
  },
  'react-development': {
    slug: 'react-development',
    title: 'React.js Development Services',
    subtitle: 'Dynamic, Highly-Interactive Frontends',
    metaTitle: 'React Development Services | Custom SPA & Dashboard Development',
    metaDescription: 'Boost your digital products with expert React development services. We build responsive, modular, and high-performance user interfaces and Single Page Apps.',
    description: 'We build interactive, component-driven user interfaces that feel native. Leverage React.js to build smooth client dashboards, CRM interfaces, and booking forms with fast responses.',
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
        answer: 'React allows developers to build modular, reusable components, ensuring faster development cycles and consistent UI styling across complex portals.',
      },
      {
        question: 'Can you migrate our existing HTML/PHP system to React?',
        answer: 'Yes, we can wrap your legacy backend in a RESTful API and build a modern, interactive React frontend to improve user satisfaction.',
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
        content: 'Modern web users expect applications to react instantly without full-page reloads. React makes this possible. By rendering state changes in memory before updating the UI, React applications provide responsive interactions, ensuring user attention is maintained during complex tasks.',
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
    subtitle: 'Server-Side Rendered Web Applications',
    metaTitle: 'Next.js Development Services | High-Performance Server-Side Rendering',
    metaDescription: 'Optimize SEO and load speeds with our Next.js development services. We specialize in Next.js App Router, Static Site Generation (SSG), and API routes.',
    description: 'Combine React interactive styling with Server-Side Rendering (SSR) and Static Generation (SSG) for SEO. Next.js is the framework of choice for modern, search-rankable web apps.',
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
        answer: 'Yes. React renders purely on the client side, showing bots an empty shell until JS loads. Next.js renders HTML on the server, serving crawlers fully-formed pages instantly.',
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
        title: 'The SEO Powerhouse: Server-Side Rendering',
        content: 'For any public-facing portal, landing page, or content blog, Google ranking is critical. Next.js bridges the gap between interactive React frontends and search crawler compatibility. By pre-rendering routes during build or on demand, crawlers receive semantic HTML pages, complete with title tags, canonical links, and JSON-LD schema schemas.',
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
    subtitle: 'High-Converting Online Stores & Custom Carts',
    metaTitle: 'Ecommerce Website Development India | Custom Online Stores',
    metaDescription: 'Scale your online sales with our ecommerce website development services in India. We design custom e-shops, Shopify templates, and custom carts.',
    description: 'We design custom web stores designed to turn casual browsers into paying customers. Secure checkouts, smooth product sorting, and WhatsApp invoices are built-in.',
    icon: 'Smartphone',
    accentColor: '#F04E2F',
    accentSoft: '#F8E4DE',
    keywords: ['Ecommerce Website Development', 'Custom Online Store India', 'Shopify Development', 'Payment Gateway Integration'],
    features: [
      { title: 'Advanced product listings & category filters', detail: 'Shoppers can filter by price, size, or category and find what they want in seconds, even in large catalogs.' },
      { title: 'Secure payment integrations (Razorpay, Stripe)', detail: 'Checkout runs through trusted, PCI-compliant payment gateways, so customers pay confidently and you get settled fast.' },
      { title: 'Automated WhatsApp invoices & tracking', detail: 'Order confirmations and shipping updates are sent automatically over WhatsApp, cutting support questions and no-shows.' },
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
        content: 'E-commerce success is a game of friction. Every extra second a page takes to load, or every confusing input field on checkout, drops sales. We design clean checkouts, optimized search bars, and high-performance product pages that keep user flows smooth.',
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
    subtitle: 'Custom Lead Capture & Sales Architecture',
    metaTitle: 'Landing Page Design India | Conversion Rate Optimization',
    metaDescription: 'Generate more leads with custom landing page design services. Optimized layouts, clear CTAs, and automated sheet integrations to capture leads.',
    description: 'We construct high-converting, single-purpose landing pages aimed at maximizing your ad spend returns. Includes custom analytics hooks and clean visual structures.',
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
        content: 'If you run Google Ads or Facebook campaigns, sending traffic to your homepage is a waste of money. A dedicated landing page strips away distracting navigation links, focusing entirely on a value statement, social proof, and a straightforward lead capture form.',
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
    subtitle: 'Revitalize Your Brand & Technical Performance',
    metaTitle: 'Website Redesign Services India | Modernize & Speed Up Your Site',
    metaDescription: 'Modernize your online presence. Our website redesign services in India upgrade your site with modern UI/UX design, mobile responsiveness, and page speed.',
    description: 'Transform your outdated, slow website into a modern, mobile-friendly digital experience. We import your existing content while overhauling your visual design and load speeds.',
    icon: 'Eye',
    accentColor: '#E11D48',
    accentSoft: '#FFF1F2',
    keywords: ['Website Redesign Services India', 'Modernize Outdated Website', 'Improve Website Performance', 'SEO Migration Services'],
    features: [
      { title: 'Complete brand identity revitalization', detail: 'Colors, type, and imagery are refreshed to look current, while keeping the brand recognizable to returning customers.' },
      { title: 'Clean layouts and layout shifts fixed', detail: 'Common culprits like unsized images and late-loading fonts are addressed so pages stop jumping around as they load.' },
      { title: 'SEO rank protection (URL mapping)', detail: 'Existing URLs are mapped to their new equivalents with proper redirects, so your rankings and backlinks carry over.' },
      { title: 'Page load time reductions', detail: 'Bloated scripts and unoptimized images from the old site are replaced, often cutting load times by more than half.' },
    ],
    faqs: [
      {
        question: 'Will our current Google rankings drop during a redesign?',
        answer: 'Not with us. We handle redesigns with strict SEO migration protocols: maintaining URL paths, setting up 301 redirects, and mapping headings to protect your traffic.',
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
        content: 'Web standards move fast. A website built 3-4 years ago likely loads slowly, lacks mobile optimization, and uses outdated web fonts. Redesigning allows you to re-introduce your business to modern clients with clean aesthetics, fast loaders, and responsive layouts.',
      },
      {
        title: 'Our Redesign Safety Net',
        content: 'The biggest risk in any redesign is losing the traffic and rankings you already have. Before touching any design, we audit your existing URLs, top-performing pages, and inbound links, then plan the new sitemap around protecting what already works rather than starting from a blank page.',
      },
    ],
  },
};
