'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Project {
  id: string;
  number: string;
  category: string;
  title: string;
  tagline: string;
  location: string;
  year: string;
  image: string;
  liveUrl: string;
  caseStudyUrl: string;
  displayUrl: string;
  tags: string[];
  highlight: string;
}

const projects: Project[] = [
  {
    id: 'wild-jawai-safari',
    number: '01',
    category: 'Hospitality & Wildlife Expedition',
    title: 'Wild Jawai',
    tagline: 'A cinematic website and direct-enquiry journey shaped around Jawai’s granite hills, wildlife, and local character.',
    location: 'Jawai, Rajasthan',
    year: '2026',
    image: '/assets/wild_jawai_live.webp',
    liveUrl: 'https://wildjawai.in/',
    caseStudyUrl: '/case-studies/wild-jawai-safari',
    displayUrl: 'wildjawai.in',
    tags: ['Next.js', 'Editorial Art', 'Safari Bookings', 'WhatsApp Flow'],
    highlight: 'Direct expedition enquiries increased with cinematic storytelling',
  },
  {
    id: 'leopard-trails',
    number: '02',
    category: 'Ultra-Luxury Safari Resort',
    title: 'Leopard Trails Jawai',
    tagline: 'A refined resort website presenting private suites, wilderness dining, and tailored Jawai expeditions with clarity.',
    location: 'Jawai Outpost, Rajasthan',
    year: '2026',
    image: '/assets/leopard_trails_live.png',
    liveUrl: 'https://leopardtrails.vercel.app',
    caseStudyUrl: '/case-studies/leopard-trails',
    displayUrl: 'leopardtrails.vercel.app',
    tags: ['Luxury Resort', 'Suite Gallery', 'Wilderness Dining', 'Concierge'],
    highlight: 'High-touch guest reservation journey with zero friction',
  },
  {
    id: 'bros-bar',
    number: '03',
    category: 'Hospitality & Counter POS',
    title: "Bro's Bar & Lounge",
    tagline: 'Fast bar billing, order routing, and counter controls designed for the pressure of busy service hours.',
    location: 'Rajasthan',
    year: '2025',
    image: '/assets/brosbar_poster.png',
    liveUrl: 'https://brosbar.vercel.app',
    caseStudyUrl: '/case-studies/bros-bar',
    displayUrl: 'brosbar.vercel.app',
    tags: ['Offline-First POS', 'Sub-second Billing', 'Kitchen Routing'],
    highlight: 'Zero downtime during peak rush hours, even when offline',
  },
  {
    id: 'deora-plaza',
    number: '04',
    category: 'Commercial Hospitality Hub',
    title: 'Deora Plaza',
    tagline: 'One hospitality system connecting hotel reception, café service, billing, and daily management.',
    location: 'Sumerpur, Rajasthan',
    year: '2025',
    image: '/assets/deora_poster.png',
    liveUrl: 'https://deora.vercel.app',
    caseStudyUrl: '/case-studies/deora-plaza',
    displayUrl: 'deora.vercel.app',
    tags: ['Multi-Unit ERP', 'Hotel Reception', 'Cafe Billing', 'Staff Roles'],
    highlight: 'Unified operations dashboard connecting reception with cafe desk',
  },
];

export default function SelectedWork() {
  const [activeId, setActiveId] = useState<string>(projects[0].id);
  const activeProject = projects.find((p) => p.id === activeId) || projects[0];

  return (
    <section id="work" className="w-full bg-[#F5F1E8] py-16 sm:py-24 lg:py-32 border-b border-[rgba(24,23,19,0.1)]">
      <div className="w-[calc(100%-clamp(32px,5vw,96px))] max-w-[1536px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-8 sm:pb-10 mb-8 sm:mb-14 border-b border-[rgba(24,23,19,0.14)]">
          <div>
            <span className="font-mono text-[12px] sm:text-[14px] uppercase tracking-[0.22em] text-[#C43C11] font-bold block mb-2 sm:mb-4">
              01 / Selected Work
            </span>
            <h2 className="font-serif text-[32px] sm:text-[48px] lg:text-[68px] font-normal leading-[1.04] sm:leading-[1.0] tracking-[-0.035em] text-[#181713]">
              Crafted in Rajasthan. <br className="hidden sm:inline" />
              Built around real businesses.
            </h2>
          </div>
          <p className="max-w-[480px] text-[15px] sm:text-[18px] leading-[1.62] text-[#2C2923] font-normal">
            Explore websites and business software we have designed, built, and shipped for hospitality brands across Rajasthan.
          </p>
        </div>

        {/* Mobile Project Selector Tabs */}
        <div className="flex lg:hidden items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6 -mx-2 px-2">
          {projects.map((p) => {
            const isAct = p.id === activeId;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveId(p.id)}
                className={`shrink-0 px-4 py-2.5 rounded-full font-mono text-[12px] tracking-wider uppercase transition-all duration-200 ${
                  isAct
                    ? 'bg-[#181713] text-[#FAF7F2] shadow-sm font-semibold ring-1 ring-[#181713]'
                    : 'bg-[rgba(24,23,19,0.06)] text-[#4A463E] hover:bg-[rgba(24,23,19,0.12)]'
                }`}
              >
                <span className={isAct ? 'text-[#C43C11]' : ''}>{p.number}</span>
                <span className="ml-1.5 font-sans font-medium normal-case">{p.title}</span>
              </button>
            );
          })}
        </div>

        {/* The Interactive Studio Atelier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 xl:gap-20 items-start">
          
          {/* Left: Typographic Commission Ledger */}
          <div className="hidden lg:flex lg:col-span-6 flex-col divide-y divide-[rgba(24,23,19,0.14)]">
            {projects.map((project) => {
              const isActive = project.id === activeId;
              return (
                <div
                  key={project.id}
                  onMouseEnter={() => setActiveId(project.id)}
                  onClick={() => setActiveId(project.id)}
                  className={`py-7 sm:py-8 cursor-pointer transition-all duration-300 group ${
                    isActive ? 'opacity-100' : 'opacity-60 hover:opacity-95'
                  }`}
                >
                  {/* Meta tag */}
                  <div className="flex items-center justify-between font-mono text-[12px] sm:text-[13px] tracking-wider uppercase mb-2">
                    <span className={isActive ? 'text-[#C43C11] font-bold' : 'text-[#4A463E] font-medium'}>
                      {project.number} &mdash; {project.category}
                    </span>
                    <span className="text-[#4A463E] font-medium">{project.location}</span>
                  </div>

                  {/* Title */}
                  <div className="flex items-center justify-between gap-4">
                    <h3
                      className={`font-serif text-[30px] sm:text-[40px] xl:text-[44px] font-normal leading-[1.06] tracking-[-0.03em] transition-colors ${
                        isActive ? 'text-[#181713]' : 'text-[#181713] group-hover:text-[#C43C11]'
                      }`}
                    >
                      {project.title}
                    </h3>
                    <span
                      className={`font-mono text-2xl transition-transform duration-300 ${
                        isActive
                          ? 'text-[#C43C11] translate-x-1 -translate-y-1'
                          : 'text-[#4A463E] opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      ↗
                    </span>
                  </div>

                  {/* Active project extended story & links */}
                  {isActive ? (
                    <div className="mt-4 pt-4 border-t border-[rgba(24,23,19,0.1)] animate-in fade-in duration-200">
                      <p className="text-[16px] sm:text-[17px] leading-[1.65] text-[#2C2923] max-w-[52ch]">
                        {project.tagline}
                      </p>

                      {/* Tags */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-md bg-[rgba(24,23,19,0.06)] text-[#4A453C] font-mono text-[11px] tracking-wide"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-5 flex items-center gap-6 text-[14px] sm:text-[15px]">
                        <Link
                          href={project.caseStudyUrl}
                          className="font-semibold text-[#181713] hover:text-[#C43C11] transition-colors underline underline-offset-4 decoration-[rgba(24,23,19,0.3)] hover:decoration-[#C43C11]"
                        >
                          Read case study →
                        </Link>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-[#C43C11] hover:text-[#8F290B] transition-colors flex items-center gap-1.5"
                        >
                          <span>Open live site</span>
                          <span className="text-xs">↗</span>
                        </a>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          {/* Right: High-Performance Device Frame Showcase */}
          <div className="w-full lg:col-span-6 lg:sticky lg:top-28">
            <div className="relative rounded-[16px] overflow-hidden bg-[#14120E] border border-[rgba(24,23,19,0.15)] shadow-[0_24px_60px_-20px_rgba(24,23,19,0.25)]">
              
              {/* Device Frame Window Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#1F1D19] border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#EF4444]/80" />
                  <div className="w-3 h-3 rounded-full bg-[#F59E0B]/80" />
                  <div className="w-3 h-3 rounded-full bg-[#10B981]/80" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#14120E] text-[#FAF7F2] font-mono text-[11px] border border-white/10 max-w-[200px] truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  <span>https://{activeProject.displayUrl}</span>
                </div>
                <span className="font-mono text-[10px] text-[#A8A29E] uppercase tracking-wider hidden sm:inline">
                  Live Production
                </span>
              </div>

              {/* Viewport Image Canvas */}
              <div className="relative aspect-[16/10] w-full bg-[#181713] overflow-hidden group">
                <Image
                  src={activeProject.image}
                  alt={`${activeProject.title} preview`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  priority
                />

                {/* Subtle bottom shadow overlay */}
                <div
                  className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[rgba(18,16,13,0.95)] via-[rgba(18,16,13,0.4)] to-transparent pointer-events-none"
                  aria-hidden="true"
                />

                {/* Overlay Caption & Live CTA */}
                <div className="absolute bottom-4 inset-x-4 sm:inset-x-6 flex items-center justify-between text-[#FAF7F2] z-20">
                  <div>
                    <span className="font-mono text-[11px] sm:text-[12px] uppercase tracking-wider text-[#E85A2F] block font-semibold">
                      {activeProject.category}
                    </span>
                    <h4 className="font-serif text-[18px] sm:text-[22px] font-normal text-white">
                      {activeProject.title}
                    </h4>
                  </div>
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FAF6F0] text-[#181713] font-semibold text-[12px] sm:text-[13px] hover:bg-[#E85A2F] hover:text-white transition-all shadow-md transform hover:-translate-y-0.5"
                  >
                    <span>Visit Live</span>
                    <span className="text-xs">↗</span>
                  </a>
                </div>
              </div>

              {/* Highlight summary bar under viewport */}
              <div className="px-5 py-3.5 bg-[#1C1A16] border-t border-white/10 flex items-center justify-between text-[12px] sm:text-[13px] font-mono text-[#D6D3CD]">
                <span className="flex items-center gap-2">
                  <span className="text-[#C43C11] font-bold">Outcome:</span>
                  <span className="truncate max-w-[280px] sm:max-w-[420px]">{activeProject.highlight}</span>
                </span>
                <span className="text-[#8C887B] hidden sm:inline">{activeProject.year}</span>
              </div>
            </div>

            {/* Mobile Info details */}
            <div className="block lg:hidden mt-4 pt-3 border-t border-[rgba(24,23,19,0.1)]">
              <p className="text-[15px] leading-relaxed text-[#2C2923]">
                {activeProject.tagline}
              </p>
              <div className="mt-3 flex items-center gap-4">
                <Link
                  href={activeProject.caseStudyUrl}
                  className="font-semibold text-[14px] text-[#181713] underline underline-offset-4 hover:text-[#C43C11]"
                >
                  Read full case study →
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
