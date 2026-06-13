export interface ServiceDetails {
  slug: string;
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  description: string;
  icon: string;
  accentColor: string;
  accentSoft: string;
  keywords: string[];
  features: string[];
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
    accentColor: '#4F46E5',
    accentSoft: '#EEF2FF',
    keywords: ['Website Design Company India', 'Small Business Website Design', 'Responsive Web Design', 'Custom UI/UX Design'],
    features: [
      'Mobile-first responsive layouts',
      'High-conversion landing architectures',
      'Custom graphics and UI iconography',
      'Sleek animations & micro-interactions',
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
    accentColor: '#7C3AED',
    accentSoft: '#F5F3FF',
    keywords: ['Web Development Company India', 'Custom Web Applications', 'Business Portals', 'Full Stack Development'],
    features: [
      'Database integration and data modeling',
      'Secure customer and partner logins',
      'Real-time automated business tools',
      'Custom API creation & third-party hooks',
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
    accentColor: '#4F46E5',
    accentSoft: '#EEF2FF',
    keywords: ['React Development Services', 'React Developer India', 'Single Page Applications', 'Interactive Dashboards'],
    features: [
      'Reusable, well-structured components',
      'Seamless state management integration',
      'Virtual DOM rendering for instant updates',
      'Dynamic client data visualization tools',
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
    ],
    sections: [
      {
        title: 'Building Interactive User Experiences',
        content: 'Modern web users expect applications to react instantly without full-page reloads. React makes this possible. By rendering state changes in memory before updating the UI, React applications provide responsive interactions, ensuring user attention is maintained during complex tasks.',
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
    accentColor: '#0F172A',
    accentSoft: '#F1F5F9',
    keywords: ['Next.js Development Services', 'Next.js Company India', 'SEO Friendly React Apps', 'Static Site Generation'],
    features: [
      'Server-side rendering & static generation',
      'Optimized Next.js Metadata API integration',
      'Next Image and Font system layouts',
      'Incremental Static Regeneration (ISR) blogs',
    ],
    faqs: [
      {
        question: 'Is Next.js better than standard React for SEO?',
        answer: 'Yes. React renders purely on the client side, showing bots an empty shell until JS loads. Next.js renders HTML on the server, serving crawlers fully-formed pages instantly.',
      },
    ],
    sections: [
      {
        title: 'The SEO Powerhouse: Server-Side Rendering',
        content: 'For any public-facing portal, landing page, or content blog, Google ranking is critical. Next.js bridges the gap between interactive React frontends and search crawler compatibility. By pre-rendering routes during build or on demand, crawlers receive semantic HTML pages, complete with title tags, canonical links, and JSON-LD schema schemas.',
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
    accentColor: '#06B6D4',
    accentSoft: '#ECFEFF',
    keywords: ['Ecommerce Website Development', 'Custom Online Store India', 'Shopify Development', 'Payment Gateway Integration'],
    features: [
      'Advanced product listings & category filters',
      'Secure payment integrations (Razorpay, Stripe)',
      'Automated WhatsApp invoices & tracking',
      'Admin dashboard for stock & order management',
    ],
    faqs: [
      {
        question: 'Do you build custom ecommerce sites or use platforms like Shopify?',
        answer: 'We do both. For small stores, Shopify is often the most cost-effective solution. For businesses with complex logistics, custom pricing, or membership rules, we build custom carts.',
      },
    ],
    sections: [
      {
        title: 'Converting Carts to Customers',
        content: 'E-commerce success is a game of friction. Every extra second a page takes to load, or every confusing input field on checkout, drops sales. We design clean checkouts, optimized search bars, and high-performance product pages that keep user flows smooth.',
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
      'Conversion-focused visual structure',
      'Clear, call-to-action hooks',
      'A/B testable modular layouts',
      'Automated Google Sheets & CRM inputs',
    ],
    faqs: [
      {
        question: 'What is the difference between a landing page and a website?',
        answer: 'A website is a multi-page portal designed to introduce a brand. A landing page is a single, focused page with one specific goal: converting search visitors from ads into leads.',
      },
    ],
    sections: [
      {
        title: 'Turning Clicks into Calls',
        content: 'If you run Google Ads or Facebook campaigns, sending traffic to your homepage is a waste of money. A dedicated landing page strips away distracting navigation links, focusing entirely on a value statement, social proof, and a straightforward lead capture form.',
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
      'Complete brand identity revitalization',
      'Clean layouts and layout shifts fixed',
      'SEO rank protection (URL mapping)',
      'Page load time reductions',
    ],
    faqs: [
      {
        question: 'Will our current Google rankings drop during a redesign?',
        answer: 'Not with us. We handle redesigns with strict SEO migration protocols: maintaining URL paths, setting up 301 redirects, and mapping headings to protect your traffic.',
      },
    ],
    sections: [
      {
        title: 'Why Redesign an Outdated Website?',
        content: 'Web standards move fast. A website built 3-4 years ago likely loads slowly, lacks mobile optimization, and uses outdated web fonts. Redesigning allows you to re-introduce your business to modern clients with clean aesthetics, fast loaders, and responsive layouts.',
      },
    ],
  },
};
