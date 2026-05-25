import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Eye, Rocket } from 'lucide-react';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  detail: string;
  icon: React.ElementType;
}

export default function Process() {
  const steps: ProcessStep[] = [
    {
      number: '01',
      title: 'We Talk & Listen',
      description: 'You tell us about your business and your goals in plain, simple language.',
      detail: 'No need to prepare specifications or learn tech terms. We listen, brainstorm together, and sketch a clean plan that solves your problem.',
      icon: MessageSquare
    },
    {
      number: '02',
      title: 'You Try the Design',
      description: 'We build interactive, clickable mockups of your website or app.',
      detail: 'Before we write any computer code, you will get a visual mockup to tap and click on your phone. You see exactly how it looks and works, so we can make adjustments together.',
      icon: Eye
    },
    {
      number: '03',
      title: 'We Launch & Support',
      description: 'We code your project, launch it, and make sure it stays fast and secure.',
      detail: 'We handle all the technical heavy lifting—getting it on the web, publishing to mobile platforms, and providing ongoing support so you are never left alone.',
      icon: Rocket
    }
  ];

  return (
    <section id="process" className="py-20 md:py-32 bg-white border-t border-[#E7E5E4]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <span className="text-xs uppercase tracking-widest text-[#78716C] font-semibold block mb-3">
            Our Process
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1C1917] leading-tight">
            How we bring your idea to life.
          </h2>
          <p className="text-lg md:text-xl text-[#78716C] mt-6 leading-relaxed">
            Building websites and apps should be exciting, not stressful. We break the entire process down into three simple, cooperative stages.
          </p>
        </div>

        {/* Step Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col p-8 md:p-10 rounded-[32px] bg-[#FAFAF9] border border-[#E7E5E4] hover:shadow-sm transition-shadow duration-300"
              >
                {/* Big Step Number on top-right */}
                <span className="absolute top-8 right-8 text-5xl font-black text-[#E7E5E4] select-none leading-none">
                  {step.number}
                </span>

                {/* Icon Wrapper */}
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-[#E7E5E4] flex items-center justify-center mb-8">
                  <Icon className="w-5 h-5 text-[#1C1917]" />
                </div>

                {/* Title & Desc */}
                <h3 className="text-2xl font-bold tracking-tight text-[#1C1917] mb-4">
                  {step.title}
                </h3>
                <p className="text-base text-[#1C1917] font-semibold leading-relaxed mb-4">
                  {step.description}
                </p>
                <p className="text-sm text-[#78716C] leading-relaxed">
                  {step.detail}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
