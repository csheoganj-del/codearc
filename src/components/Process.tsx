"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Eye, Rocket } from 'lucide-react';
import { TiltCard, Reveal } from './Motion';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  detail: string;
  icon: React.ElementType;
  accent: string;
  accentSoft: string;
}

export default function Process() {
  const steps: ProcessStep[] = [
    {
      number: '01',
      title: 'We Talk & Listen',
      description: 'You tell us about your business and goals in plain, simple language.',
      detail: 'No specifications to prepare, no tech terms to learn. We listen, brainstorm together, and sketch a clean plan that solves your problem.',
      icon: MessageSquare,
      accent: '#4F46E5',
      accentSoft: '#EEF2FF',
    },
    {
      number: '02',
      title: 'You Try the Design',
      description: 'We build interactive, clickable mockups of your website or app.',
      detail: 'Before we write a single line of code, you get a visual mockup to tap and click on your phone — so we can adjust everything together first.',
      icon: Eye,
      accent: '#7C3AED',
      accentSoft: '#F5F3FF',
    },
    {
      number: '03',
      title: 'We Launch & Support',
      description: 'We build it, launch it, and keep it fast and secure.',
      detail: 'We handle all the technical heavy lifting — hosting, publishing to mobile platforms, and ongoing support — so you are never left alone.',
      icon: Rocket,
      accent: '#06B6D4',
      accentSoft: '#ECFEFF',
    },
  ];

  return (
    <section id="process" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <Reveal className="max-w-3xl mb-14 md:mb-20">
          <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#EEF2FF] text-[#4F46E5] text-xs uppercase tracking-widest font-bold mb-5">
            Our Process
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
            From idea to launch in <span className="font-accent text-gradient">three simple steps.</span>
          </h2>
          <p className="text-lg md:text-xl text-[#475569] mt-6 leading-relaxed">
            Building websites and apps should be exciting, not stressful. We break the entire journey into three cooperative stages.
          </p>
        </Reveal>

        {/* Step Cards with connector */}
        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-14 left-[12%] right-[12%] h-px bg-gradient-to-r from-[#4F46E5]/30 via-[#7C3AED]/30 to-[#06B6D4]/30 pointer-events-none" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <TiltCard
                  max={4}
                  className="card-lift relative flex h-full flex-col p-8 md:p-9 rounded-3xl bg-white border border-[#E2E8F0]"
                >
                  {/* Big Step Number on top-right */}
                  <span
                    className="absolute top-7 right-7 text-5xl font-extrabold select-none leading-none opacity-20"
                    style={{ color: step.accent }}
                  >
                    {step.number}
                  </span>

                  {/* Icon Wrapper */}
                  <div
                    className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center mb-7 shadow-sm"
                    style={{ backgroundColor: step.accentSoft }}
                  >
                    <Icon className="w-6 h-6" style={{ color: step.accent }} />
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-2xl font-extrabold tracking-tight text-[#0F172A] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-base text-[#0F172A] font-semibold leading-relaxed mb-3">
                    {step.description}
                  </p>
                  <p className="text-sm text-[#64748B] leading-relaxed">
                    {step.detail}
                  </p>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
