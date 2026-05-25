import React from 'react';
import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';

export default function PromiseSection() {
  const painPoints = [
    'Complex technical words that give you a headache',
    'Surprise extra fees and hourly rates',
    'Waiting days or weeks for simple updates',
    'Systems so complicated you need a manual to run them'
  ];

  const promises = [
    'Simple everyday English (we listen, we explain simply)',
    'Fixed upfront pricing (no surprises, no hidden costs)',
    'Quick, friendly support (we respond in minutes, not days)',
    'Tools designed for real people (no training needed)'
  ];

  return (
    <section id="why-us" className="py-20 md:py-32 bg-[#FAFAF9] border-t border-[#E7E5E4]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-24 text-left">
          <span className="text-xs uppercase tracking-widest text-[#78716C] font-semibold block mb-3">
            Our Difference
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1C1917] leading-tight">
            A software studio that speaks your language.
          </h2>
          <p className="text-lg md:text-xl text-[#78716C] mt-6 leading-relaxed">
            Most software companies make things more complicated than they need to be. We built CodeArc to be the friendliest and simplest partner for your business.
          </p>
        </div>

        {/* Side-by-Side Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-stretch">
          
          {/* Traditional Agencies */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[32px] p-8 md:p-12 bg-white/50 border border-[#E7E5E4] flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-bold text-[#78716C] mb-8">
                Typical Tech Agencies
              </h3>
              <div className="space-y-6">
                {painPoints.map((pain) => (
                  <div key={pain} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center text-red-500 shrink-0 mt-0.5">
                      <X className="w-4 h-4" />
                    </div>
                    <span className="text-base text-[#78716C] font-medium leading-relaxed">
                      {pain}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-12 p-5 bg-stone-100 rounded-2xl text-sm font-semibold text-[#78716C] text-center">
              Result: Stress, delays, and wasted money.
            </div>
          </motion.div>

          {/* CodeArc Promise */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[32px] p-8 md:p-12 bg-white border-2 border-[#1C1917] shadow-lg flex flex-col justify-between relative overflow-hidden"
          >
            {/* Soft highlight banner */}
            <div className="absolute top-0 right-0 bg-[#1C1917] text-white text-xs font-bold uppercase tracking-widest px-6 py-2.5 rounded-bl-2xl">
              Our Promise
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#1C1917] mb-8">
                The CodeArc Way
              </h3>
              <div className="space-y-6">
                {promises.map((promise) => (
                  <div key={promise} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0 mt-0.5">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-base text-[#1C1917] font-semibold leading-relaxed">
                      {promise}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-12 p-5 bg-[#1C1917] text-white rounded-2xl text-sm font-bold text-center">
              Result: Clear progress, simple tools, and smiling clients.
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
