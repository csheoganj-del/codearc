"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, AppWindow, Smartphone, Check } from 'lucide-react';
import { TiltCard, Reveal } from './Motion';
import Link from 'next/link';

interface ServiceItem {
  title: string;
  badge: string;
  description: string;
  purpose: string;
  features: string[];
  icon: React.ElementType;
  accent: string;       // hex accent
  accentSoft: string;   // soft tint bg
}

export default function Services() {
  const services: ServiceItem[] = [
    {
      title: 'Websites',
      badge: 'Your Online Front Door',
      description: 'A beautiful, easy-to-read website that tells people who you are, what you do, and how to reach you.',
      purpose: 'Best for: local shops, family businesses, service providers, and getting found on Google.',
      features: [
        'Works perfectly on phones & tablets',
        'Fast-loading and easy to read',
        'Includes contact info & maps',
        'Simple to update yourself',
      ],
      icon: Monitor,
      accent: '#4F46E5',
      accentSoft: '#EEF2FF',
    },
    {
      title: 'Web Applications',
      badge: 'Your Custom Business Tools',
      description: 'A private tool or portal that runs in the browser, built to help you run your business day to day.',
      purpose: 'Best for: booking calendars, customer records, staff portals, and custom order tracking.',
      features: [
        'Secure logins for you & your clients',
        'Calculates & organizes data automatically',
        'Replaces messy Excel sheets',
        'Accessible from anywhere',
      ],
      icon: AppWindow,
      accent: '#7C3AED',
      accentSoft: '#F5F3FF',
    },
    {
      title: 'Android Apps',
      badge: 'Your App in Pockets',
      description: 'A dedicated, high-quality mobile app designed specifically for Android phones and tablets.',
      purpose: 'Best for: loyalty programs, mobile ordering, field worker tools, and offline utility.',
      features: [
        'Smooth and fast to swipe through',
        'Sends notifications directly to phones',
        'Can work even without internet',
        'Designed specifically for touchscreens',
      ],
      icon: Smartphone,
      accent: '#06B6D4',
      accentSoft: '#ECFEFF',
    },
  ];

  return (
    <section id="services" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <Reveal className="max-w-3xl mb-14 md:mb-20">
          <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#EEF2FF] text-[#4F46E5] text-xs uppercase tracking-widest font-bold mb-5">
            Our Services
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
            Everything your business needs to grow. <span className="font-accent text-gradient">Simply.</span>
          </h2>
          <p className="text-lg md:text-xl text-[#475569] mt-6 leading-relaxed">
            No technical details to decode. Tell us what you want to achieve, and we'll build the perfect tool for the job.
          </p>
        </Reveal>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <TiltCard
                  max={4}
                  className="card-lift group relative flex h-full flex-col bg-white rounded-3xl p-8 md:p-9 border border-[#E2E8F0] overflow-hidden"
                >
                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 opacity-80"
                    style={{ background: `linear-gradient(90deg, ${service.accent}, transparent)` }}
                  />

                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-7 transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundColor: service.accentSoft }}
                  >
                    <Icon className="w-6 h-6" style={{ color: service.accent }} />
                  </div>

                  {/* Badge & Title */}
                  <span className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: service.accent }}>
                    {service.badge}
                  </span>
                  <h3 className="text-2xl font-extrabold tracking-tight text-[#0F172A] mb-4">
                    {service.title === 'Websites' ? (
                      <Link href="/website-design" className="hover:text-[#4F46E5] hover:underline transition-colors">{service.title}</Link>
                    ) : service.title === 'Web Applications' ? (
                      <Link href="/web-development" className="hover:text-[#4F46E5] hover:underline transition-colors">{service.title}</Link>
                    ) : (
                      service.title
                    )}
                  </h3>

                  {/* Description */}
                  <p className="text-base text-[#475569] leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Sub-services links */}
                  {service.title === 'Websites' && (
                    <div className="flex flex-wrap gap-x-2 gap-y-1 mb-5 text-xs font-extrabold text-[#64748B]">
                      <span>Includes:</span>
                      <Link href="/website-design" className="text-[#4F46E5] hover:underline">Design</Link>
                      <span className="text-[#94A3B8] font-normal">•</span>
                      <Link href="/ecommerce-development" className="text-[#4F46E5] hover:underline">Ecommerce</Link>
                      <span className="text-[#94A3B8] font-normal">•</span>
                      <Link href="/landing-page-design" className="text-[#4F46E5] hover:underline">Landings</Link>
                      <span className="text-[#94A3B8] font-normal">•</span>
                      <Link href="/website-redesign" className="text-[#4F46E5] hover:underline">Redesigns</Link>
                    </div>
                  )}

                  {service.title === 'Web Applications' && (
                    <div className="flex flex-wrap gap-x-2 gap-y-1 mb-5 text-xs font-extrabold text-[#64748B]">
                      <span>Includes:</span>
                      <Link href="/web-development" className="text-[#7C3AED] hover:underline">Web Apps</Link>
                      <span className="text-[#94A3B8] font-normal">•</span>
                      <Link href="/react-development" className="text-[#7C3AED] hover:underline">React</Link>
                      <span className="text-[#94A3B8] font-normal">•</span>
                      <Link href="/nextjs-development" className="text-[#7C3AED] hover:underline">Next.js</Link>
                    </div>
                  )}

                  {/* Purpose */}
                  <p
                    className="text-sm font-semibold text-[#0F172A] px-4 py-3 rounded-xl mb-7 leading-relaxed"
                    style={{ backgroundColor: service.accentSoft }}
                  >
                    {service.purpose}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mt-auto pt-6 border-t border-[#E2E8F0]">
                    {service.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-3">
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                          style={{ backgroundColor: service.accentSoft }}
                        >
                          <Check className="w-3 h-3" style={{ color: service.accent }} />
                        </span>
                        <span className="text-sm text-[#475569] font-medium leading-snug">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
