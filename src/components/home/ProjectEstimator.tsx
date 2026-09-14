'use client';

import { useState, useMemo } from 'react';
import { site, whatsappUrl } from '../../config/site';

interface SectorOption {
  id: string;
  name: string;
  subtitle: string;
  baseWeeks: number;
  recommendedStack: string;
}

const SECTORS: SectorOption[] = [
  {
    id: 'hospitality',
    name: 'Hospitality & Luxury Safaris',
    subtitle: 'Resorts, wilderness lodges, boutique stays & safari tours',
    baseWeeks: 3,
    recommendedStack: 'Next.js 16 · Tailwind · Framer Motion · Direct Booking & WhatsApp Concierge',
  },
  {
    id: 'dining',
    name: 'Restaurants, Cafes & Bars',
    subtitle: 'Counter billing, kitchen orders, inventory & multi-outlets',
    baseWeeks: 3,
    recommendedStack: 'Next.js · Offline SQLite POS · Thermal Printer · WhatsApp Digital Receipts',
  },
  {
    id: 'healthcare',
    name: 'Clinics & OPD Practices',
    subtitle: 'Specialty doctors, live patient token queues & visit billing',
    baseWeeks: 4,
    recommendedStack: 'Secure Web Core · Live Queue Token Engine · OPD History · GST Billing',
  },
  {
    id: 'bespoke',
    name: 'Custom Web & Business Systems',
    subtitle: 'Bespoke customer portals, internal workflows & cloud databases',
    baseWeeks: 4,
    recommendedStack: 'Full-Stack Next.js · PostgreSQL / SQLite · Type-Safe API · Role Permissions',
  },
];

interface FeatureOption {
  id: string;
  label: string;
  description: string;
  weeksAdded: number;
}

const FEATURES: FeatureOption[] = [
  {
    id: 'booking',
    label: 'Direct Booking & Enquiry Flow',
    description: 'Frictionless room, table, or safari reservations without third-party commissions',
    weeksAdded: 1,
  },
  {
    id: 'offline',
    label: 'Offline-First Counter Architecture',
    description: 'Keep billing and orders running smoothly when the local internet drops',
    weeksAdded: 1.5,
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp Business Automations',
    description: 'Automated booking confirmations, PDF receipts, and direct customer messaging',
    weeksAdded: 0.5,
  },
  {
    id: 'gst',
    label: 'GST & Multi-Outlet Invoicing',
    description: 'Native Indian GST compliance, HSN codes, and split billing for multi-branch ops',
    weeksAdded: 0.5,
  },
  {
    id: 'cinematic',
    label: 'Cinematic Art Direction & Motion',
    description: 'Bespoke editorial typography, curated media layouts, and smooth scroll transitions',
    weeksAdded: 1,
  },
  {
    id: 'roles',
    label: 'Role-Based Staff Access & Security',
    description: 'Admin, manager, and counter roles with strict audit trails and permission boundaries',
    weeksAdded: 0.5,
  },
];

export default function ProjectEstimator() {
  const [selectedSectorId, setSelectedSectorId] = useState<string>('hospitality');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'booking',
    'whatsapp',
    'cinematic',
  ]);

  const selectedSector = useMemo(
    () => SECTORS.find((s) => s.id === selectedSectorId) || SECTORS[0],
    [selectedSectorId],
  );

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  const calculatedWeeks = useMemo(() => {
    let total = selectedSector.baseWeeks;
    for (const fId of selectedFeatures) {
      const feat = FEATURES.find((f) => f.id === fId);
      if (feat) total += feat.weeksAdded;
    }
    const min = Math.max(2, Math.floor(total));
    const max = Math.ceil(total + 1.5);
    return `${min} – ${max} Weeks`;
  }, [selectedSector, selectedFeatures]);

  const selectedFeatureNames = useMemo(() => {
    return selectedFeatures
      .map((id) => FEATURES.find((f) => f.id === id)?.label)
      .filter(Boolean)
      .join(', ');
  }, [selectedFeatures]);

  const whatsappMessage = useMemo(() => {
    return `Hi CodeArc, I configured an estimate on codearc.co.in:\n\n• Sector: ${selectedSector.name}\n• Requirements: ${selectedFeatureNames || 'Core Setup'}\n• Estimated Timeline: ${calculatedWeeks}\n\nCan we discuss shaping this project together?`;
  }, [selectedSector, selectedFeatureNames, calculatedWeeks]);

  const emailSubject = encodeURIComponent(
    `Project Scope Inquiry: ${selectedSector.name} — CodeArc`,
  );
  const emailBody = encodeURIComponent(
    `Hi CodeArc,\n\nI used your online project estimator and would like to discuss this scope:\n\nSector: ${selectedSector.name}\nRequirements: ${selectedFeatureNames}\nEstimated Timeline: ${calculatedWeeks}\n\nLooking forward to speaking with your engineering team.`,
  );

  return (
    <section id="estimate" className="w-full bg-[#F5F1E8] py-16 sm:py-24 lg:py-32 border-b border-[rgba(24,23,19,0.1)]">
      <div className="w-[calc(100%-clamp(32px,5vw,96px))] max-w-[1536px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-8 sm:pb-10 mb-10 sm:mb-14 border-b border-[rgba(24,23,19,0.14)]">
          <div>
            <span className="font-mono text-[12px] sm:text-[14px] uppercase tracking-[0.22em] text-[#C43C11] font-bold block mb-2 sm:mb-4">
              Interactive Scope &amp; Timeline
            </span>
            <h2 className="font-serif text-[32px] sm:text-[48px] lg:text-[68px] font-normal leading-[1.04] sm:leading-[1.0] tracking-[-0.035em] text-[#181713]">
              Shape your project. <br className="hidden sm:inline" />
              Estimate your timeline.
            </h2>
          </div>
          <p className="max-w-[480px] text-[15px] sm:text-[18px] leading-[1.62] text-[#2C2923] font-normal">
            Select your industry and operational needs to see our recommended architecture and typical delivery milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* Step 1 & 2: Controls (Left Column) */}
          <div className="lg:col-span-7 flex flex-col space-y-8 sm:space-y-10">
            
            {/* Step 1: Industry Selection */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-[12px] text-[#C43C11] font-bold">01 /</span>
                <h3 className="font-mono text-[13px] uppercase tracking-wider text-[#181713] font-semibold">
                  Select Your Sector
                </h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SECTORS.map((sector) => {
                  const isSelected = sector.id === selectedSectorId;
                  return (
                    <button
                      key={sector.id}
                      type="button"
                      onClick={() => setSelectedSectorId(sector.id)}
                      className={`p-4 rounded-[12px] text-left border transition-all duration-200 ${
                        isSelected
                          ? 'bg-[#FCFAF5] border-[#181713] shadow-sm ring-1 ring-[#181713]'
                          : 'bg-[rgba(24,23,19,0.03)] border-[rgba(24,23,19,0.1)] hover:border-[rgba(24,23,19,0.3)] hover:bg-[#FAF6F0]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-serif text-[18px] text-[#181713] font-medium">
                          {sector.name}
                        </span>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-[#C43C11]" />
                        )}
                      </div>
                      <p className="text-[13px] text-[#6B675F] leading-snug">
                        {sector.subtitle}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Requirements Selection */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-[12px] text-[#C43C11] font-bold">02 /</span>
                <h3 className="font-mono text-[13px] uppercase tracking-wider text-[#181713] font-semibold">
                  Choose Operational Capabilities
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FEATURES.map((feature) => {
                  const isChecked = selectedFeatures.includes(feature.id);
                  return (
                    <button
                      key={feature.id}
                      type="button"
                      onClick={() => toggleFeature(feature.id)}
                      className={`p-4 rounded-[12px] text-left border transition-all duration-200 flex items-start gap-3 ${
                        isChecked
                          ? 'bg-[#FCFAF5] border-[#C43C11]/50 shadow-xs'
                          : 'bg-[rgba(24,23,19,0.03)] border-[rgba(24,23,19,0.08)] hover:bg-[#FAF6F0]'
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold transition-colors ${
                          isChecked
                            ? 'bg-[#C43C11] text-white'
                            : 'border border-[rgba(24,23,19,0.3)] text-transparent'
                        }`}
                      >
                        ✓
                      </span>
                      <div>
                        <span className="font-sans font-semibold text-[15px] text-[#181713] block">
                          {feature.label}
                        </span>
                        <span className="text-[12px] text-[#6B675F] leading-snug block mt-1">
                          {feature.description}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Blueprint Card (Right Column) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="rounded-[16px] bg-[#1C1A16] text-[#FAF7F2] p-6 sm:p-8 border border-white/10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)]">
              
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#E85A2F] font-bold">
                  Engineering Scope Blueprint
                </span>
                <span className="font-mono text-[11px] text-[#A8A29E]">
                  CodeArc Rajasthan
                </span>
              </div>

              {/* Estimated Timeline Display */}
              <div className="py-6 border-b border-white/10">
                <span className="font-mono text-[12px] uppercase text-[#A8A29E] block mb-1">
                  Estimated Delivery Timeline
                </span>
                <div className="font-serif text-[38px] sm:text-[44px] text-white font-normal leading-none tracking-tight">
                  {calculatedWeeks}
                </div>
                <p className="mt-2 text-[13px] text-[#D6D3CD] leading-relaxed">
                  Includes discovery, architecture design, front-end refinement, real testing, and live launch handover.
                </p>
              </div>

              {/* Recommended Architecture */}
              <div className="py-5 border-b border-white/10">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#A8A29E] block mb-1.5">
                  Core Architecture Stack
                </span>
                <div className="font-mono text-[13px] text-[#E85A2F] font-medium leading-snug">
                  {selectedSector.recommendedStack}
                </div>
              </div>

              {/* Included Deliverables */}
              <div className="py-5 border-b border-white/10">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#A8A29E] block mb-2">
                  Configured Scope Modules ({selectedFeatures.length})
                </span>
                <div className="space-y-1.5">
                  {selectedFeatures.length === 0 ? (
                    <span className="text-[13px] text-[#8C887B] italic">Core foundational setup only</span>
                  ) : (
                    selectedFeatures.map((fId) => {
                      const f = FEATURES.find((item) => item.id === fId);
                      return (
                        <div key={fId} className="flex items-center gap-2 text-[13px] text-[#FAF7F2]">
                          <span className="text-[#10B981] text-xs">●</span>
                          <span>{f?.label}</span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 space-y-3">
                <a
                  href={whatsappUrl(whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#E85A2F] text-[#FAF7F2] font-semibold text-[14px] hover:bg-[#C43C11] transition-all shadow-md transform hover:-translate-y-0.5 text-center"
                >
                  <span>Discuss this scope on WhatsApp</span>
                  <span className="text-base leading-none">↗</span>
                </a>

                <a
                  href={`mailto:${site.email}?subject=${emailSubject}&body=${emailBody}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full border border-white/20 text-[#FAF7F2] font-medium text-[13px] hover:bg-white/10 transition-colors text-center"
                >
                  <span>Send scope summary by email</span>
                  <span>↗</span>
                </a>

                <p className="text-center font-mono text-[11px] text-[#8C887B] pt-1">
                  100% code ownership · No supplier lock-in · Clear handover
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
