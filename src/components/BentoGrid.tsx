import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Zap, Server, LayoutTemplate, LineChart, Cpu, LifeBuoy } from 'lucide-react';

interface BentoGridProps {
  isDark: boolean;
}

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
}

function BentoCard({ children, className = '' }: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Ratios between -0.5 and 0.5
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    
    x.set(mouseX * 12); // Max 12deg horizontal tilt
    y.set(mouseY * -12); // Max 12deg vertical tilt
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(y, springConfig);
  const rotateY = useSpring(x, springConfig);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={`relative rounded-3xl p-8 md:p-10 shadow-2xl border border-white/5 bg-[#090915]/40 backdrop-blur-md hover:border-brand-indigo/25 transition-colors duration-300 overflow-hidden group min-h-[300px] flex flex-col justify-between ${className}`}
    >
      <div className="absolute inset-0 bg-grid-field opacity-[0.03] pointer-events-none" />
      {children}
    </motion.div>
  );
}

export default function BentoGrid({}: BentoGridProps) {
  return (
    <section id="why-us" className="py-24 md:py-36 relative overflow-hidden transition-colors duration-300">
      
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-field opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-magenta/5 blur-blob" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-brand-indigo/10 border border-brand-indigo/25 text-brand-indigo tracking-wider uppercase inline-block mb-5">
              Architectural Values
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6.5xl font-black tracking-tight leading-none text-white"
          >
            Tactile Controls. Clean Pipelines.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg leading-relaxed mt-6 text-gray-400 font-medium max-w-2xl mx-auto"
          >
            Every project we ship is optimized to deliver incredible frame rates, responsive layout designs, and clean, resilient codebases.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Fast Development (Col Span 2) */}
          <BentoCard className="md:col-span-2">
            <div className="flex justify-between items-start mb-6" style={{ transform: 'translateZ(30px)' }}>
              <div className="space-y-4 max-w-md text-left">
                <div className="w-11 h-11 rounded-xl bg-brand-indigo/10 border border-brand-indigo/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-brand-indigo" />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-white">
                  Spring-Velocity Workflows
                </h3>
                <p className="text-sm leading-relaxed text-gray-400 font-medium">
                  We leverage modular component states, native sharding frameworks, and pre-compiled libraries to build custom web and mobile solutions 3x faster with extreme stability.
                </p>
              </div>
              <div className="text-right">
                <span className="text-5xl font-black tracking-tighter bg-gradient-to-r from-brand-indigo to-brand-cyan bg-clip-text text-transparent">3X</span>
                <p className="text-[9px] text-gray-500 uppercase tracking-widest font-black mt-1">Dev Acceleration</p>
              </div>
            </div>

            {/* Speed Simulation Graphics */}
            <div className="mt-8 flex gap-2 overflow-hidden h-16 items-end" style={{ transform: 'translateZ(10px)' }}>
              {[60, 95, 55, 110, 85, 130, 75, 105, 140, 95, 120, 135, 150, 110, 130].map((val, idx) => (
                <motion.div
                  key={idx}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${(val / 150) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 100, delay: idx * 0.03 }}
                  className={`w-full rounded-t-md ${
                    idx % 3 === 0 ? 'bg-brand-cyan' : idx % 2 === 0 ? 'bg-brand-indigo' : 'bg-brand-magenta/30'
                  }`}
                />
              ))}
            </div>
          </BentoCard>

          {/* Card 2: Scalable Architecture (Col Span 1) */}
          <BentoCard className="md:col-span-1 bg-[#05050C]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/5 rounded-full blur-2xl" />
            
            <div className="space-y-4 text-left" style={{ transform: 'translateZ(40px)' }}>
              <div className="w-11 h-11 rounded-xl bg-brand-cyan/10 border border-brand-cyan/25 flex items-center justify-center">
                <Server className="w-5 h-5 text-brand-cyan" />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-white">
                Elastic Cloud Scaling
              </h3>
              <p className="text-sm leading-relaxed text-gray-400 font-medium">
                Server systems constructed on AWS serverless lambda functions and regional SQLite replication pools, auto-scaling to handle extreme traffic.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-500 font-bold uppercase tracking-widest" style={{ transform: 'translateZ(20px)' }}>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-brand-cyan rounded-full animate-ping" />
                <span>Auto-Scaling Online</span>
              </div>
              <span className="font-mono text-brand-cyan">VM LOAD: 8%</span>
            </div>
          </BentoCard>

          {/* Card 3: Clean UI/UX Design (Col Span 1) */}
          <BentoCard className="md:col-span-1">
            <div className="space-y-4 text-left" style={{ transform: 'translateZ(40px)' }}>
              <div className="w-11 h-11 rounded-xl bg-brand-magenta/10 border border-brand-magenta/25 flex items-center justify-center">
                <LayoutTemplate className="w-5 h-5 text-brand-magenta" />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-white">
                Ultra-Breathing UI/UX
              </h3>
              <p className="text-sm leading-relaxed text-gray-400 font-medium">
                We believe in clean structural grids, glassmorphism filters, and magnetic elements. We avoid bulky wrappers to ensure every pixel has room to breathe.
              </p>
            </div>

            {/* Figma like layer box mock */}
            <div className="mt-8 flex flex-col gap-2.5" style={{ transform: 'translateZ(15px)' }}>
              <div className="h-8.5 rounded-xl border border-white/5 bg-white/5 flex items-center px-3 justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded bg-brand-indigo" />
                  <span className="text-[10px] font-mono text-gray-400">#viewport-header</span>
                </div>
                <span className="text-[8px] font-extrabold uppercase text-gray-600">Auto</span>
              </div>
              <div className="h-8.5 rounded-xl border border-white/5 bg-white/5 flex items-center px-3 justify-between w-11/12">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded bg-brand-cyan" />
                  <span className="text-[10px] font-mono text-gray-400">#mobile-view-slider</span>
                </div>
                <span className="text-[8px] font-extrabold uppercase text-gray-600">Flex</span>
              </div>
            </div>
          </BentoCard>

          {/* Card 4: Business, Design & Android Focus (Col Span 2) */}
          <BentoCard className="md:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 h-full" style={{ transform: 'translateZ(30px)' }}>
              
              {/* Left Side: Product Impact */}
              <div className="flex flex-col justify-between h-full space-y-4 text-left">
                <div className="space-y-4">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center">
                    <LineChart className="w-5 h-5 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-white">
                    Design Impact Metrics
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-400 font-medium">
                    We evaluate our design work using conversion ratios, customer bounce rates, and load performance indices. Every layout is calibrated to deliver immediate activation results.
                  </p>
                </div>
              </div>

              {/* Right Side: Android Hardware Integration */}
              <div className="flex flex-col justify-between h-full border-t sm:border-t-0 sm:border-l border-white/5 pt-6 sm:pt-0 sm:pl-8 space-y-4 text-left">
                <div className="space-y-4">
                  <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/25 flex items-center justify-center">
                    <LifeBuoy className="w-5 h-5 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-white">
                    24/7 Deployment SLA
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-400 font-medium">
                    Continuous server monitoring, automated diagnostic reports, and instant web/mobile patch updates backed by our premium service agreements.
                  </p>
                </div>
              </div>

            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
}
