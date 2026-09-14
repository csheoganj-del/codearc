'use client';

import { useState } from 'react';
import Image from 'next/image';
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
  architecture: string;
  displayUrl: string;
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
    architecture: 'Offline-First SQLite + Cloud Sync',
    displayUrl: 'restrosuite.codearc.co.in',
    keySpecs: [
      { label: 'Counter Billing', detail: 'Fast billing, even when the internet drops' },
      { label: 'Kitchen Orders', detail: 'Live, colour-coded order queues for kitchen' },
      { label: 'Guest Receipts', detail: 'Paperless receipts sent directly through WhatsApp' },
      { label: 'Multiple Outlets', detail: 'Shared menu, inventory, and GST tax settings' },
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
    architecture: 'Cloud Property Management',
    displayUrl: 'staysuite.codearc.co.in',
    keySpecs: [
      { label: 'Room Calendar', detail: 'Real-time room availability and check-in' },
      { label: 'Guest Billing', detail: 'Room charges unified with dining and activities' },
      { label: 'Tax Invoicing', detail: 'GST-compliant invoices with automated exports' },
      { label: 'Housekeeping', detail: 'Live room readiness and housekeeping status' },
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
    architecture: 'Secure Clinic Workflow Engine',
    displayUrl: 'codearc-medisuite.vercel.app',
    keySpecs: [
      { label: 'Patient Queue', detail: 'Live token display for the front desk' },
      { label: 'Appointments', detail: 'Instant booking and repeat-visit scheduling' },
      { label: 'Visit Billing', detail: 'Consultation, tests, and procedure billing' },
      { label: 'Clinic Records', detail: 'Clear visit history for authorised staff' },
    ],
    externalUrl: 'https://codearc-medisuite.vercel.app',
    internalUrl: '/products/medisuite',
  },
];

export default function ProductFamily() {
  const [activeSlug, setActiveSlug] = useState<string>(products[0].slug);
  const activeProduct = products.find((p) => p.slug === activeSlug) || products[0];

  return (
    <section id="suite" className="w-full bg-[#EDE6DA] py-16 sm:py-24 lg:py-32 border-b border-[rgba(24,23,19,0.1)]">
      <div className="w-[calc(100%-clamp(32px,5vw,96px))] max-w-[1536px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-8 sm:pb-10 mb-8 sm:mb-14 border-b border-[rgba(24,23,19,0.14)]">
          <div>
            <span className="font-mono text-[12px] sm:text-[14px] uppercase tracking-[0.22em] text-[#C43C11] font-bold block mb-2 sm:mb-4">
              03 / The CodeArc Suite
            </span>
            <h2 className="font-serif text-[32px] sm:text-[48px] lg:text-[74px] font-normal leading-[1.04] sm:leading-[1.0] tracking-[-0.035em] text-[#181713]">
              Software built for <br className="hidden sm:inline" />
              everyday work.
            </h2>
          </div>
          <p className="max-w-[480px] text-[15px] sm:text-[18px] leading-[1.62] text-[#2C2923] font-normal">
            Alongside client work, we build focused products for restaurants, independent hotels, and clinics—each shaped around real daily routines.
          </p>
        </div>

        {/* The Interactive OS Switcher Tabs */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 p-2 rounded-[14px] bg-[rgba(24,23,19,0.06)] border border-[rgba(24,23,19,0.08)] mb-8 sm:mb-14">
          {products.map((item) => {
            const isActive = item.slug === activeSlug;
            return (
              <button
                key={item.slug}
                type="button"
                onClick={() => setActiveSlug(item.slug)}
                className={`flex flex-col text-left px-3 sm:px-6 py-3 sm:py-5 rounded-[10px] transition-all duration-300 ${
                  isActive
                    ? 'bg-[#FCFAF5] shadow-[0_4px_20px_-4px_rgba(24,23,19,0.12)] border border-[rgba(24,23,19,0.12)] text-[#181713]'
                    : 'text-[#4A463E] hover:text-[#181713] hover:bg-[rgba(255,255,255,0.45)]'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-[10px] sm:text-[12px] tracking-wider uppercase mb-1">
                  <span className={isActive ? 'text-[#C43C11] font-bold' : 'text-[#5A554C] font-semibold'}>
                    {item.number}
                  </span>
                  <span className={`hidden sm:inline text-[11px] font-semibold ${isActive ? 'text-[#10B981]' : 'text-[#6B675F]'}`}>
                    ● {item.statusText}
                  </span>
                </div>
                <span className="font-serif text-[16px] sm:text-[24px] lg:text-[28px] font-normal leading-tight text-[#181713] truncate">
                  {item.name}
                </span>
                <span className="hidden sm:block text-[13px] font-medium text-[#4A463E] mt-0.5 truncate">
                  {item.category}
                </span>
              </button>
            );
          })}
        </div>

        {/* The Interactive OS Console Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 xl:gap-20 items-center">
          
          {/* Left: Product Architecture & Operational Specs */}
          <div className="order-2 lg:order-1 lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Sector & Architecture badge line */}
              <div className="flex items-center justify-between font-mono text-[12px] sm:text-[13px] uppercase tracking-wider text-[#2C2923] pb-3 border-b border-[rgba(24,23,19,0.14)]">
                <span className="text-[#C43C11] font-bold">{activeProduct.category}</span>
                <span className="font-semibold text-[#181713]">{activeProduct.architecture}</span>
              </div>

              {/* Title & Tagline */}
              <h3 className="mt-4 sm:mt-5 font-serif text-[32px] sm:text-[44px] lg:text-[54px] font-normal text-[#181713] leading-[1.04] sm:leading-[1.0] tracking-[-0.035em]">
                {activeProduct.name}
              </h3>
              
              <p className="mt-2 font-serif text-[18px] sm:text-[21px] italic text-[#181713] font-normal">
                &ldquo;{activeProduct.tagline}&rdquo;
              </p>

              <p className="mt-4 text-[15px] sm:text-[18px] leading-[1.65] text-[#2C2923]">
                {activeProduct.description}
              </p>

              {/* 4 Architectural Specifications */}
              <div className="mt-6 sm:mt-8 pt-5 border-t border-[rgba(24,23,19,0.14)] grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeProduct.keySpecs.map((spec) => (
                  <div key={spec.label} className="flex flex-col bg-[rgba(24,23,19,0.03)] p-3 rounded-lg border border-[rgba(24,23,19,0.06)]">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[#C43C11] font-bold mb-1">
                      {spec.label}
                    </span>
                    <span className="text-[13px] sm:text-[14px] text-[#181713] font-medium leading-snug">
                      {spec.detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Row */}
            <div className="mt-8 pt-6 border-t border-[rgba(24,23,19,0.14)] flex flex-wrap items-center gap-4">
              {activeProduct.externalUrl && (
                <a
                  href={activeProduct.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 h-[46px] px-7 rounded-full bg-[#181713] text-[#FCFAF5] text-[14px] font-semibold hover:bg-[#E85A2F] transition-all shadow-sm"
                >
                  <span>Open live product</span>
                  <span className="text-xs">↗</span>
                </a>
              )}
              <Link
                href={activeProduct.internalUrl}
                className="inline-flex items-center gap-1.5 text-[14px] sm:text-[15px] font-medium text-[#181713] hover:text-[#C43C11] transition-colors underline underline-offset-4 decoration-[rgba(24,23,19,0.3)] hover:decoration-[#C43C11]"
              >
                <span>Read detailed architecture</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Right: High-Resolution Application Preview Window */}
          <div className="order-1 lg:order-2 lg:col-span-6">
            <div className="rounded-[16px] overflow-hidden bg-[#181713] border border-[rgba(24,23,19,0.15)] shadow-[0_24px_60px_-20px_rgba(24,23,19,0.25)]">
              
              {/* App Bezel Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#1F1D19] border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#EF4444]/80" />
                  <div className="w-3 h-3 rounded-full bg-[#F59E0B]/80" />
                  <div className="w-3 h-3 rounded-full bg-[#10B981]/80" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#14120E] text-[#FAF7F2] font-mono text-[11px] border border-white/10 max-w-[220px] truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  <span>https://{activeProduct.displayUrl}</span>
                </div>
                <span className="font-mono text-[10px] text-[#A8A29E] uppercase tracking-wider hidden sm:inline">
                  {activeProduct.statusText}
                </span>
              </div>

              {/* Viewport Image */}
              <div className="relative aspect-[16/11] w-full bg-[#14120E] group overflow-hidden">
                <Image
                  src={activeProduct.image}
                  alt={`${activeProduct.name} application preview`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </div>

              {/* App Bezel Footer */}
              <div className="px-5 py-3 bg-[#1C1A16] border-t border-white/10 flex items-center justify-between text-[12px] font-mono text-[#FAF7F2]">
                <span className="text-[#E85A2F] font-semibold">{activeProduct.name} Operational Core</span>
                <span className="text-[#8C887B]">Native Indian GST &amp; UPI Ready</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
