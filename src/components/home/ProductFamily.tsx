'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface Product {
  slug: string;
  number: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  statusText: string;
  image: string;
  previewUrl?: string;
  architecture: string;
  keySpecs: { label: string; detail: string }[];
  externalUrl?: string;
  internalUrl: string;
}

const products: Product[] = [
  {
    slug: 'restrosuite',
    number: '01',
    name: 'RestroSuite',
    category: 'Restaurants, Cafes & Bars',
    tagline: 'Restaurant billing that keeps service moving.',
    description:
      'An offline-first restaurant POS for billing, kitchen orders, table service, WhatsApp receipts, and shared menus across multiple outlets.',
    statusText: 'Live & Deployed',
    image: '/assets/restrosuite_preview.png',
    previewUrl: '/work-proxy/restrosuite',
    architecture: 'Offline Billing + Cloud Sync',
    keySpecs: [
      { label: 'Counter Billing', detail: 'Fast billing, even when the internet drops' },
      { label: 'Kitchen Orders', detail: 'Live, colour-coded order queues for the kitchen' },
      { label: 'Guest Receipts', detail: 'Paperless receipts sent through WhatsApp' },
      { label: 'Multiple Outlets', detail: 'Shared menu, inventory, and tax settings' },
    ],
    externalUrl: 'https://restrosuite.codearc.co.in',
    internalUrl: '/products/restrosuite',
  },
  {
    slug: 'staysuite',
    number: '02',
    name: 'StaySuite',
    category: 'Boutique Hotels & Lodges',
    tagline: 'A calmer front desk for independent stays.',
    description:
      'A property management system for wilderness lodges, heritage havelis, and boutique retreats, bringing reservations, guest bills, rooms, and dining into one calm workspace.',
    statusText: 'Live & Deployed',
    image: '/assets/staysuite_preview.jpg',
    previewUrl: '/work-proxy/staysuite',
    architecture: 'Secure Cloud Property Management',
    keySpecs: [
      { label: 'Room Calendar', detail: 'Room availability, reservations, and check-in' },
      { label: 'Guest Billing', detail: 'Room charges connected to kitchen and bar orders' },
      { label: 'Tax Invoicing', detail: 'GST-ready invoices with simple exports' },
      { label: 'Housekeeping', detail: 'Live room readiness and maintenance updates' },
    ],
    externalUrl: 'https://staysuite.codearc.co.in',
    internalUrl: '/products/staysuite',
  },
  {
    slug: 'medisuite',
    number: '03',
    name: 'MediSuite',
    category: 'Clinics & OPD Practices',
    tagline: 'A clear, focused desk for everyday clinic work.',
    description:
      'A focused workspace for specialty clinics and OPD practices, with appointments, live patient queues, and visit billing in one place.',
    statusText: 'Active Pilot',
    image: '/assets/medisuite_preview.jpg',
    previewUrl: '/work-proxy/medisuite',
    architecture: 'Secure Clinic Workflow',
    keySpecs: [
      { label: 'Patient Queue', detail: 'Live token display for the reception desk' },
      { label: 'Appointments', detail: 'Quick booking and repeat-visit scheduling' },
      { label: 'Visit Billing', detail: 'Consultation and treatment billing' },
      { label: 'Clinic Records', detail: 'Clear visit history for authorised staff' },
    ],
    externalUrl: 'https://codearc-medisuite.vercel.app',
    internalUrl: '/products/medisuite',
  },
];

export default function ProductFamily() {
  const [activeSlug, setActiveSlug] = useState<string>(products[0].slug);
  const activeProduct = products.find((p) => p.slug === activeSlug) || products[0];
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  const [loadedMap, setLoadedMap] = useState<Record<string, boolean>>({});
  const [mountedMap, setMountedMap] = useState<Record<string, boolean>>({
    [products[0].slug]: true,
  });

  useEffect(() => {
    const t = setTimeout(() => {
      setLoadedMap((prev) => ({ ...prev, [activeSlug]: true }));
    }, 700);
    return () => clearTimeout(t);
  }, [activeSlug]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth || 720;
      setScale(Math.max(w / 1280, 0.25));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const selectProduct = (slug: string) => {
    setMountedMap((prev) => ({ ...prev, [slug]: true }));
    setActiveSlug(slug);
  };

  return (
    <section id="suite" className="w-full bg-[#EDE6DA] py-16 sm:py-24 lg:py-36 border-b border-[rgba(24,23,19,0.1)]">
      <div className="w-[calc(100%-clamp(32px,5vw,96px))] max-w-[1536px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-8 sm:pb-10 mb-8 sm:mb-16 border-b border-[rgba(24,23,19,0.14)]">
          <div>
            <span className="font-mono text-[12px] sm:text-[14px] uppercase tracking-[0.22em] text-[#C43C11] font-bold block mb-2 sm:mb-4">
              03 / The CodeArc Suite
            </span>
            <h2 className="font-serif text-[32px] sm:text-[48px] lg:text-[74px] font-normal leading-[1.04] sm:leading-[1.0] tracking-[-0.035em] text-[#181713]">
              Software built for <br className="hidden sm:inline" />
              everyday work.
            </h2>
          </div>
          <p className="max-w-[480px] text-[15px] sm:text-[19px] leading-[1.62] text-[#2C2923] font-normal">
            Alongside client work, we build focused products for restaurants, independent hotels, and clinics—each shaped around real daily routines.
          </p>
        </div>

        {/* The Interactive OS Switcher Tabs */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-4 p-1.5 sm:p-2.5 rounded-[12px] sm:rounded-[14px] bg-[rgba(24,23,19,0.06)] border border-[rgba(24,23,19,0.08)] mb-8 sm:mb-16">
          {products.map((item) => {
            const isActive = item.slug === activeSlug;
            return (
              <button
                key={item.slug}
                type="button"
                onClick={() => selectProduct(item.slug)}
                className={`flex flex-col text-left px-2.5 sm:px-8 py-2.5 sm:py-6 rounded-[8px] sm:rounded-[10px] transition-all duration-300 ${
                  isActive
                    ? 'bg-[#FCFAF5] shadow-[0_4px_20px_-4px_rgba(24,23,19,0.12)] border border-[rgba(24,23,19,0.12)] text-[#181713]'
                    : 'text-[#4A463E] hover:text-[#181713] hover:bg-[rgba(255,255,255,0.45)]'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-[10px] sm:text-[13px] tracking-wider uppercase mb-0.5 sm:mb-1.5">
                  <span className={isActive ? 'text-[#C43C11] font-bold' : 'text-[#5A554C] font-semibold'}>
                    {item.number}
                  </span>
                  <span className={`hidden sm:inline text-[11px] sm:text-[12px] font-semibold ${isActive ? 'text-[#181713]' : 'text-[#6B675F]'}`}>
                    {item.statusText}
                  </span>
                </div>
                <span className="font-serif text-[15px] sm:text-[26px] lg:text-[30px] font-normal leading-tight text-[#181713] truncate">
                  {item.name}
                </span>
                <span className="hidden sm:block text-[13px] sm:text-[15px] font-medium text-[#4A463E] mt-1 truncate">
                  {item.category}
                </span>
              </button>
            );
          })}
        </div>

        {/* The Cinematic OS Console Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 xl:gap-24 items-center animate-in fade-in duration-300">
          
          {/* Product Architecture & Operational Specs */}
          <div className="order-2 lg:order-1 lg:col-span-6 xl:col-span-5 flex flex-col justify-between">
            <div>
              {/* Sector & Architecture badge line */}
              <div className="flex items-center justify-between font-mono text-[12px] sm:text-[14px] uppercase tracking-wider text-[#2C2923] pb-3 border-b border-[rgba(24,23,19,0.14)]">
                <span className="text-[#C43C11] font-bold">{activeProduct.category}</span>
                <span className="font-semibold text-[#181713]">{activeProduct.architecture}</span>
              </div>

              {/* Title & Tagline */}
              <h3 className="mt-4 sm:mt-6 font-serif text-[32px] sm:text-[48px] lg:text-[62px] font-normal text-[#181713] leading-[1.02] sm:leading-[1.0] tracking-[-0.035em]">
                {activeProduct.name}
              </h3>
              
              <p className="mt-2 sm:mt-3 font-serif text-[17px] sm:text-[23px] italic text-[#181713] font-normal">
                &ldquo;{activeProduct.tagline}&rdquo;
              </p>

              <p className="mt-4 sm:mt-5 text-[15px] sm:text-[19px] leading-[1.68] text-[#2C2923]">
                {activeProduct.description}
              </p>

              {/* 4 Architectural Specifications */}
              <div className="mt-6 sm:mt-10 pt-5 sm:pt-7 border-t border-[rgba(24,23,19,0.14)] grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {activeProduct.keySpecs.map((spec) => (
                  <div key={spec.label} className="flex flex-col">
                    <span className="font-mono text-[11px] sm:text-[13px] uppercase tracking-wider text-[#C43C11] font-bold mb-1">
                      {spec.label}
                    </span>
                    <span className="text-[14px] sm:text-[16px] text-[#181713] font-medium leading-snug">
                      {spec.detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Row */}
            <div className="mt-8 sm:mt-12 pt-5 sm:pt-7 border-t border-[rgba(24,23,19,0.14)] flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-7">
              {activeProduct.externalUrl ? (
                <a
                  href={activeProduct.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 h-[46px] sm:h-[48px] px-8 rounded-full bg-[#181713] text-[#FCFAF5] text-[14px] sm:text-[16px] font-semibold hover:bg-[#E85A2F] transition-colors shadow-sm text-center"
                >
                  <span>Open live product</span>
                  <span className="text-xs">↗</span>
                </a>
              ) : null}

              <Link
                href={activeProduct.internalUrl}
                className="text-[14px] sm:text-[16px] font-semibold text-[#181713] hover:text-[#C43C11] transition-colors underline underline-offset-4 decoration-[rgba(24,23,19,0.3)] hover:decoration-[#C43C11] text-center py-1 sm:py-0"
              >
                View product details →
              </Link>
            </div>
          </div>

          {/* Right: Large Cinematic Interface Visual Frame (Order 1 on mobile) */}
          <div className="order-1 lg:order-2 lg:col-span-6 xl:col-span-7">
            <div
              ref={stageRef}
              className="relative aspect-[16/10] w-full rounded-[12px] overflow-hidden bg-[#181713] border border-[rgba(24,23,19,0.12)] shadow-[0_20px_50px_-20px_rgba(24,23,19,0.14)]"
            >
              {/* Top Live Status Indicator */}
              <div className="absolute top-4 left-4 z-30 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[rgba(18,16,13,0.85)] backdrop-blur-md text-[#34D399] font-mono text-[11px] font-bold tracking-wider uppercase flex items-center gap-1.5 border border-white/10 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  {loadedMap[activeProduct.slug] ? 'Latest Live Console' : 'Loading console...'}
                </span>
              </div>

              {/* Live Same-Origin Upstream Preview (No Sandbox, Streams in immediately) */}
              {products
                .filter((p) => Boolean(p.previewUrl))
                .map((p) => {
                  const isActive = p.slug === activeSlug;
                  const isMounted = Boolean(mountedMap[p.slug]);

                  if (!isMounted) return null;

                  return (
                    <div
                      key={p.slug}
                      className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-400 bg-[#14120E] ${
                        isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
                      }`}
                    >
                      <iframe
                        src={p.previewUrl}
                        title={`${p.name} live preview`}
                        loading="eager"
                        tabIndex={-1}
                        onLoad={() =>
                          setLoadedMap((prev) => ({ ...prev, [p.slug]: true }))
                        }
                        style={{
                          width: 1280,
                          height: 800,
                          border: 0,
                          transform: `scale(${scale}) translateZ(0)`,
                          transformOrigin: 'top left',
                        }}
                      />
                    </div>
                  );
                })}

              {/* Bottom gradient caption */}
              <div
                className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[rgba(18,16,13,0.92)] via-[rgba(18,16,13,0.35)] to-transparent pointer-events-none z-20"
                aria-hidden="true"
              />

              <div className="absolute bottom-5 inset-x-7 flex items-center justify-between text-[#FAF7F2] font-mono text-[12px] sm:text-[13px] tracking-wider uppercase z-30">
                <span className="font-semibold text-shadow-sm">
                  {activeProduct.name} &mdash; {activeProduct.architecture}
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-[rgba(250,246,240,0.95)] text-[#181713] text-[11px] font-bold shadow-sm">
                  {activeProduct.statusText}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
