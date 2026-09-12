'use client';

import { useState, useEffect, useRef } from 'react';
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
  previewUrl: string;
  caseStudyUrl: string;
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
    previewUrl: '/work-proxy/jawai',
    caseStudyUrl: '/case-studies/wild-jawai-safari',
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
    previewUrl: '/work-proxy/leopardtrails',
    caseStudyUrl: '/case-studies/leopard-trails',
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
    previewUrl: '/work-proxy/brosbar',
    caseStudyUrl: '/case-studies/bros-bar',
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
    previewUrl: '/work-proxy/deora',
    caseStudyUrl: '/case-studies/deora-plaza',
  },
];

export default function SelectedWork() {
  const [activeId, setActiveId] = useState<string>(projects[0].id);
  const activeProject = projects.find((p) => p.id === activeId) || projects[0];
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  const [loadedMap, setLoadedMap] = useState<Record<string, boolean>>({});
  const [mountedMap, setMountedMap] = useState<Record<string, boolean>>({
    [projects[0].id]: true,
  });

  useEffect(() => {
    const t = setTimeout(() => {
      setLoadedMap((prev) => ({ ...prev, [activeId]: true }));
    }, 700);
    return () => clearTimeout(t);
  }, [activeId]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth || 640;
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

  const selectProject = (id: string) => {
    setMountedMap((prev) => ({ ...prev, [id]: true }));
    setActiveId(id);
  };

  return (
    <section id="work" className="w-full bg-[#F5F1E8] py-16 sm:py-24 lg:py-36 border-b border-[rgba(24,23,19,0.1)]">
      <div className="w-[calc(100%-clamp(32px,5vw,96px))] max-w-[1536px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-8 sm:pb-10 mb-8 sm:mb-16 border-b border-[rgba(24,23,19,0.14)]">
          <div>
            <span className="font-mono text-[12px] sm:text-[14px] uppercase tracking-[0.22em] text-[#C43C11] font-bold block mb-2 sm:mb-4">
              01 / Selected Work
            </span>
            <h2 className="font-serif text-[32px] sm:text-[48px] lg:text-[68px] font-normal leading-[1.04] sm:leading-[1.0] tracking-[-0.035em] text-[#181713]">
              Crafted in Rajasthan. <br className="hidden sm:inline" />
              Built around real businesses.
            </h2>
          </div>
          <p className="max-w-[480px] text-[15px] sm:text-[19px] leading-[1.62] text-[#2C2923] font-normal">
            Explore websites and business software we have designed, built, and shipped for hospitality brands across Rajasthan.
          </p>
        </div>

        {/* Mobile Project Selector Tabs (Mobile Only: lg:hidden) */}
        <div className="flex lg:hidden items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6 -mx-2 px-2">
          {projects.map((p) => {
            const isAct = p.id === activeId;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => selectProject(p.id)}
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 xl:gap-24 items-start">
          
          {/* Left: Typographic Commission Ledger (Desktop: lg:flex, hidden on mobile) */}
          <div className="hidden lg:flex lg:col-span-6 xl:col-span-6 flex-col divide-y divide-[rgba(24,23,19,0.14)]">
            {projects.map((project) => {
              const isActive = project.id === activeId;
              return (
                <div
                  key={project.id}
                  onMouseEnter={() => selectProject(project.id)}
                  onClick={() => selectProject(project.id)}
                  className={`py-8 sm:py-9 cursor-pointer transition-all duration-300 group ${
                    isActive ? 'opacity-100' : 'opacity-60 hover:opacity-95'
                  }`}
                >
                  {/* Meta tag */}
                  <div className="flex items-center justify-between font-mono text-[12px] sm:text-[13px] tracking-wider uppercase mb-2.5">
                    <span className={isActive ? 'text-[#C43C11] font-bold' : 'text-[#4A463E] font-medium'}>
                      {project.number} &mdash; {project.category}
                    </span>
                    <span className="text-[#4A463E] font-medium">{project.location}</span>
                  </div>

                  {/* Title */}
                  <div className="flex items-center justify-between gap-4">
                    <h3
                      className={`font-serif text-[32px] sm:text-[42px] xl:text-[48px] font-normal leading-[1.05] tracking-[-0.03em] transition-colors ${
                        isActive ? 'text-[#181713]' : 'text-[#181713] group-hover:text-[#C43C11]'
                      }`}
                    >
                      {project.title}
                    </h3>
                    <span
                      className={`font-mono text-2xl sm:text-3xl transition-transform duration-300 ${
                        isActive
                          ? 'text-[#C43C11] translate-x-1.5 -translate-y-1.5'
                          : 'text-[#4A463E] opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      ↗
                    </span>
                  </div>

                  {/* Active project extended story & links */}
                  {isActive ? (
                    <div className="mt-5 pt-4 border-t border-[rgba(24,23,19,0.1)] animate-in fade-in duration-200">
                      <p className="text-[17px] sm:text-[18px] leading-[1.65] text-[#2C2923] max-w-[50ch]">
                        {project.tagline}
                      </p>

                      <div className="mt-6 flex items-center gap-7 text-[15px] sm:text-[16px]">
                        <Link
                          href={project.caseStudyUrl}
                          className="font-semibold text-[#181713] hover:text-[#C43C11] transition-colors underline underline-offset-4 decoration-[rgba(24,23,19,0.3)] hover:decoration-[#C43C11]"
                        >
                          Read case study
                        </Link>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-[#C43C11] hover:text-[#8F290B] transition-colors flex items-center gap-1.5"
                        >
                          <span>Open live platform</span>
                          <span className="text-xs">↗</span>
                        </a>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          {/* Right (and Mobile Top): Single Cinematic Focus Stage */}
          <div className="w-full lg:col-span-6 xl:col-span-6 lg:sticky lg:top-28">
            <div
              ref={stageRef}
              className="relative aspect-[16/11] w-full rounded-[12px] sm:rounded-[16px] overflow-hidden bg-[#181713] border border-[rgba(24,23,19,0.12)] shadow-[0_20px_50px_-20px_rgba(24,23,19,0.14)]"
            >
              {/* Top Live Status Indicator */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-30 flex items-center gap-2">
                <span className="px-2.5 sm:px-3 py-1 rounded-full bg-[rgba(18,16,13,0.85)] backdrop-blur-md text-[#34D399] font-mono text-[10px] sm:text-[11px] font-bold tracking-wider uppercase flex items-center gap-1.5 border border-white/10 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  {loadedMap[activeId] ? 'Latest Live Preview' : 'Loading preview...'}
                </span>
              </div>

              {projects.map((project) => {
                const isActive = project.id === activeId;
                const isMounted = Boolean(mountedMap[project.id]);

                if (!isMounted) return null;

                return (
                  <div
                    key={project.id}
                    className={`absolute inset-0 transition-opacity duration-400 ease-in-out bg-[#14120E] ${
                      isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                  >
                    {/* Live Same-Origin Upstream Preview */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <iframe
                        src={project.previewUrl}
                        title={`${project.title} live preview`}
                        loading="eager"
                        tabIndex={-1}
                        onLoad={() => setLoadedMap((prev) => ({ ...prev, [project.id]: true }))}
                        style={{
                          width: 1280,
                          height: 880,
                          border: 0,
                          transform: `scale(${scale}) translateZ(0)`,
                          transformOrigin: 'top left',
                        }}
                      />
                    </div>

                    {/* Subtle bottom shadow overlay */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-28 sm:h-32 bg-gradient-to-t from-[rgba(18,16,13,0.92)] via-[rgba(18,16,13,0.35)] to-transparent pointer-events-none z-20"
                      aria-hidden="true"
                    />

                    {/* Stage Meta Caption */}
                    <div className="absolute bottom-3.5 sm:bottom-5 inset-x-4 sm:inset-x-6 flex items-center justify-between text-[#FAF7F2] text-[12px] sm:text-[14px] font-mono tracking-wider uppercase z-30">
                      <span className="font-medium text-shadow-sm truncate pr-2">
                        {project.title} &mdash; {project.year}
                      </span>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 px-3 sm:px-4 py-1.5 rounded-full bg-[rgba(250,246,240,0.95)] text-[#181713] text-[11px] sm:text-[12px] font-mono font-bold hover:bg-[#E85A2F] hover:text-[#FAF7F2] transition-colors shadow-sm"
                      >
                        Visit ↗
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile Active Project Card (Mobile Only: lg:hidden) */}
            <div className="block lg:hidden mt-5 pt-4 border-t border-[rgba(24,23,19,0.12)]">
              <div className="flex items-center justify-between font-mono text-[11px] tracking-wider uppercase mb-1.5">
                <span className="text-[#C43C11] font-bold">
                  {activeProject.number} &mdash; {activeProject.category}
                </span>
                <span className="text-[#4A463E] font-medium">{activeProject.location}</span>
              </div>
              <h3 className="font-serif text-[26px] font-normal leading-tight text-[#181713]">
                {activeProject.title}
              </h3>
              <p className="mt-2 text-[15px] leading-[1.6] text-[#2C2923]">
                {activeProject.tagline}
              </p>
              <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={activeProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 h-[44px] px-6 rounded-full bg-[#181713] text-[#FAF7F2] font-semibold text-[14px] shadow-sm text-center"
                >
                  <span>Open live platform</span>
                  <span className="text-xs">↗</span>
                </a>
                <Link
                  href={activeProject.caseStudyUrl}
                  className="text-[14px] font-semibold text-[#181713] hover:text-[#C43C11] text-center underline underline-offset-4 decoration-[rgba(24,23,19,0.3)] py-1.5"
                >
                  Read case study
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
