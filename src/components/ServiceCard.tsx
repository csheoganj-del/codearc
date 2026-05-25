import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Code2, Smartphone, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface ServiceCardProps {
  isDark: boolean;
}

interface CardItem {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<any>;
  gradient: string;
  features: string[];
}

function Card({ title, subtitle, description, icon: Icon, gradient, features }: CardItem) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Mouse vector tracking for Spotlight
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -10 }}
      transition={{ type: 'spring', stiffness: 180, damping: 15 }}
      className="relative rounded-3xl p-10 md:p-12 shadow-premium cursor-pointer overflow-hidden bg-[#090915]/50 border border-white/5 hover:border-brand-indigo/35 transition-all duration-300"
    >
      {/* 1. Dynamic Cursor Spotlight (Follows mouse x/y) */}
      {isHovered && (
        <span
          className="absolute pointer-events-none rounded-full blur-[90px] opacity-25 mix-blend-screen"
          style={{
            width: '320px',
            height: '320px',
            background: `radial-gradient(circle, #6366F1 0%, transparent 70%)`,
            left: `${coords.x - 160}px`,
            top: `${coords.y - 160}px`,
          }}
        />
      )}

      {/* 2. Glowing Spotlight Border Frame */}
      {isHovered && (
        <span
          className="absolute inset-0 pointer-events-none rounded-3xl"
          style={{
            border: '1.5px solid transparent',
            background: `radial-gradient(circle 220px at ${coords.x}px ${coords.y}px, rgba(99, 102, 241, 0.45), transparent 80%)`,
            WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />
      )}

      {/* 3. Subtle inner grid overlay */}
      <div className="absolute inset-0 bg-grid-field opacity-[0.03] pointer-events-none" />

      {/* Header Info */}
      <div className="flex justify-between items-start mb-10">
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center relative">
          <Icon className="w-7 h-7 text-brand-cyan group-hover:scale-115 transition-transform" />
          <span className={`absolute inset-0 rounded-2xl bg-gradient-to-tr ${gradient} blur-lg opacity-20`} />
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-brand-indigo bg-brand-indigo/10 border border-brand-indigo/25 px-3 py-1 rounded-full">
          {subtitle}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-2.5xl font-black tracking-tight mb-4 text-white">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-sm leading-relaxed text-gray-400 font-medium mb-8">
        {description}
      </p>

      {/* Core Capability Tags */}
      <div className="space-y-3 pt-6 border-t border-white/5 mb-8">
        {features.map((feat) => (
          <div key={feat} className="flex items-center gap-2.5 text-xs text-gray-300 font-semibold">
            <CheckCircle2 className="w-4.5 h-4.5 text-brand-cyan" />
            <span>{feat}</span>
          </div>
        ))}
      </div>

      {/* Interactive explore trigger */}
      <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-brand-cyan hover:text-white transition-colors">
        <span>Explore Stack</span>
        <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </div>

    </motion.div>
  );
}

export default function ServicesSection({}: ServiceCardProps) {
  const services: CardItem[] = [
    {
      title: 'Creative UI/UX & Web Design',
      subtitle: 'Elite Web Aesthetics',
      description: 'Breathtaking user interfaces defined by generous visual space, fluid micro-interactions, editorial typography layout, and thin aesthetic frames inspired by Vercel & Apple.',
      icon: Palette,
      gradient: 'from-brand-indigo to-brand-magenta',
      features: [
        'Responsive Design Systems',
        'Tactile Parallax Animations',
        'Brand Identity Guidelines',
        'High-Fidelity Wireframes'
      ]
    },
    {
      title: 'High-Performance Web App Development',
      subtitle: 'React & Edge Stack',
      description: 'Engineered web applications compiling into ultra-fast static payloads. Utilizing modern scalable structures like React, TypeScript, Next.js, and multi-region serverless cloud databases.',
      icon: Code2,
      gradient: 'from-brand-indigo to-brand-blue',
      features: [
        'Next.js SSR Architectures',
        'TypeScript Full-Stack Logic',
        'Elastic API & GraphQL Nodes',
        'Serverless Compute & Cache'
      ]
    },
    {
      title: 'Tactile Android App Engineering',
      subtitle: 'Native Mobile Solutions',
      description: 'Stunning native mobile solutions tailored to performant mobile operations. We configure custom views, local storage, background processing, and highly responsive spring transitions.',
      icon: Smartphone,
      gradient: 'from-brand-cyan to-brand-blue',
      features: [
        'High-Performance Native Code',
        'Tactile Spring Physics Layouts',
        'Offline Synchronization Grids',
        'Device Hardware Integrations'
      ]
    }
  ];

  return (
    <section id="services" className="py-24 md:py-36 relative overflow-hidden transition-colors duration-300">
      
      {/* Decorative Blur Blobs */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-brand-indigo/5 blur-blob" />
      <div className="absolute bottom-1/4 left-0 w-[450px] h-[450px] bg-brand-cyan/5 blur-blob" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-28 text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-brand-indigo/10 border border-brand-indigo/25 text-brand-indigo tracking-wider uppercase inline-block mb-5">
              Focused Capabilities
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6.5xl font-black tracking-tight leading-none text-white"
          >
            Our Core Pillars.
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg leading-relaxed mt-6 text-gray-400 font-medium"
          >
            We don't try to do everything. We focus exclusively on the intersections of beautiful layout designs and high-performance Web and Android app engineering.
          </motion.p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: index * 0.15 }}
              className="group"
            >
              <Card {...service} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
