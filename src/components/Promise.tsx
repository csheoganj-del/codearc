"use client";

import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { Reveal } from './Motion';

export default function PromiseSection() {
  const painPoints = [
    'Complex technical jargon that gives you a headache',
    'Endless back-and-forth with no clear owner',
    'Waiting days or weeks for simple updates',
    'Systems so complicated you need a manual to run them',
  ];

  const promises = [
    'Plain everyday English — we listen, then explain simply',
    'One dedicated team that knows your business by name',
    'Quick, friendly support — minutes, not days',
    'Tools designed for real people — no training needed',
  ];

  return (
    <section id="why-us" className="py-20 md:py-28 bg-[#F8FAFC] relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-[-20%] right-[-10%] w-[40%] aspect-square bg-[radial-gradient(circle,_rgba(79,70,229,0.08)_0%,_transparent_70%)] rounded-full pointer-events-none animate-drift-b" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Header */}
        <Reveal className="max-w-3xl mb-14 md:mb-20 text-left">
          <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#EEF2FF] text-[#4F46E5] text-xs uppercase tracking-widest font-bold mb-5">
            Our Difference
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
            A software studio that <span className="font-accent text-gradient">speaks your language.</span>
          </h2>
          <p className="text-lg md:text-xl text-[#475569] mt-6 leading-relaxed">
            Most software companies make things more complicated than they need to be. We built CodeArc to be the friendliest, simplest partner for your business.
          </p>
        </Reveal>

        {/* Side-by-Side Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-stretch">

          {/* Traditional Agencies */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl p-8 md:p-10 bg-white/60 border border-[#E2E8F0] flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-bold text-[#64748B] mb-8">
                Typical Tech Agencies
              </h3>
              <div className="space-y-5">
                {painPoints.map((pain) => (
                  <div key={pain} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center text-red-500 shrink-0 mt-0.5">
                      <X className="w-4 h-4" />
                    </div>
                    <span className="text-base text-[#64748B] font-medium leading-relaxed">
                      {pain}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 p-5 bg-[#F1F5F9] rounded-2xl text-sm font-semibold text-[#64748B] text-center">
              Result: stress, delays, and frustration.
            </div>
          </motion.div>

          {/* CodeArc Promise */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl p-8 md:p-10 bg-white border-2 border-[#4F46E5]/60 shadow-[0_24px_60px_-24px_rgba(79,70,229,0.3)] flex flex-col justify-between relative overflow-hidden"
          >
            {/* Highlight banner */}
            <div className="absolute top-0 right-0 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white text-xs font-bold uppercase tracking-widest px-6 py-2.5 rounded-bl-2xl">
              Our Promise
            </div>

            {/* Soft glow */}
            <div className="absolute bottom-[-30%] right-[-20%] w-[60%] aspect-square bg-[radial-gradient(circle,_rgba(79,70,229,0.08)_0%,_transparent_70%)] rounded-full pointer-events-none" />

            <div className="relative z-10">
              <h3 className="text-2xl font-extrabold text-[#0F172A] mb-8">
                The CodeArc Way
              </h3>
              <div className="space-y-5">
                {promises.map((promise) => (
                  <div key={promise} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#EEF2FF] flex items-center justify-center text-[#4F46E5] shrink-0 mt-0.5">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-base text-[#0F172A] font-semibold leading-relaxed">
                      {promise}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-10 p-5 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white rounded-2xl text-sm font-bold text-center">
              Result: clear progress, simple tools, and smiling clients.
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
