import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  url: string;
  creator: string;
  tags: string[];
  themeColor: string; // Tailwind color or hex
  accentColor: string;
  glowColor: string;
  features: string[];
  mockupType: 'bar' | 'cafe';
  image: string;
}

const projects: Project[] = [
  {
    id: 'bloom-cafe',
    title: 'Bloom Café & Restaurant',
    subtitle: 'Comprehensive Cafe & Restaurant Management System',
    description: 'A cinematic, high-performance digital operations suite built for Bloom Café. Streamlines real-time order tracking, guest management, and system operations with smooth, modern transitions and ambient aesthetics.',
    url: 'https://deora.vercel.app/',
    creator: 'pixncraftstudio',
    tags: ['Next.js', 'Real-time WebSockets', 'TailwindCSS', 'Framer Motion'],
    themeColor: 'from-[#052e16] to-[#022c22]',
    accentColor: '#10b981', // emerald-500
    glowColor: 'rgba(16, 185, 129, 0.15)',
    features: [
      'Cinematic ambient particle effects',
      'Real-time automated order dispatch',
      'Optimized touch-friendly UI for servers',
      'Responsive multi-device layout'
    ],
    mockupType: 'cafe',
    image: '/assets/bloomcafe_preview.jpg'
  },
  {
    id: 'bros-bar',
    title: "Bro's Bar",
    subtitle: 'Premium Bar Operations Portal & System Access',
    description: 'An elegant bar operations gateway designed for Bro\'s Bar. Features a custom dark-mode interface with glowing amber text animations, high-end hover effects, and secure staff access doors.',
    url: 'https://brosbar.vercel.app/',
    creator: 'pixncraftstudio',
    tags: ['React', 'CSS Fluidics', 'Interactive Gates', 'Responsive Design'],
    themeColor: 'from-[#1c1917] to-[#0c0a09]',
    accentColor: '#f59e0b', // amber-500
    glowColor: 'rgba(245, 158, 11, 0.15)',
    features: [
      'Glowing amber liquid letter animations',
      'Fluid custom-designed UI buttons',
      'Secure, roles-based team sign-in',
      'Ultra-clean dark layout aesthetics'
    ],
    mockupType: 'bar',
    image: '/assets/brosbar_preview.jpg'
  }
];

export default function Showcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 100 : -100,
      opacity: 0
    })
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  const activeProject = projects[currentIndex];

  return (
    <section id="work" className="py-20 md:py-32 bg-[#F5F5F4] relative overflow-hidden">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-stone-300/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-stone-400/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest text-[#78716C] font-semibold block mb-3">
              Live Showcase
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1C1917] leading-tight">
              Real systems built for real results.
            </h2>
            <p className="text-lg text-[#78716C] mt-4 leading-relaxed">
              Explore some of our active systems built to automate and elevate local business operations.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 mt-8 md:mt-0">
            <button
              onClick={handlePrev}
              className="p-4 rounded-2xl bg-white border border-[#E7E5E4] hover:bg-stone-50 active:scale-95 transition-all text-[#1C1917]"
              aria-label="Previous project"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-4 rounded-2xl bg-white border border-[#E7E5E4] hover:bg-stone-50 active:scale-95 transition-all text-[#1C1917]"
              aria-label="Next project"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dynamic Showcase Stage */}
        <div className="relative min-h-[580px] lg:min-h-[520px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeProject.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              {/* Info Column */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                {/* Project Title */}
                <h3 className="text-3xl md:text-4xl font-extrabold text-[#1C1917] tracking-tight mb-2">
                  {activeProject.title}
                </h3>
                
                {/* Subtitle */}
                <h4 className="text-md font-bold uppercase tracking-wider mb-6" style={{ color: activeProject.accentColor }}>
                  {activeProject.subtitle}
                </h4>

                {/* Description */}
                <p className="text-base text-[#78716C] leading-relaxed mb-8">
                  {activeProject.description}
                </p>

                {/* Feature Checklist */}
                <div className="space-y-3.5 mb-8">
                  {activeProject.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: activeProject.accentColor }} />
                      <span className="text-sm font-medium text-[#44403C]">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {activeProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg bg-stone-200/50 text-[#57534E] text-xs font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                  <a
                    href={activeProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#1C1917] text-white font-bold text-sm hover:bg-stone-850 transition-colors shadow-sm active:scale-98"
                  >
                    Open Live Portal
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Visual Interactive Mockup Column */}
              <div className="lg:col-span-7 relative">
                {/* Ambient glow backing */}
                <div
                  className="absolute -inset-4 rounded-[40px] opacity-30 blur-2xl transition-all duration-700 pointer-events-none"
                  style={{ backgroundColor: activeProject.accentColor }}
                />

                {/* Browser Mockup Container */}
                <div className="relative rounded-[28px] border border-[#E7E5E4] bg-white shadow-2xl overflow-hidden aspect-[16/10] flex flex-col">
                  {/* Browser Header Bar */}
                  <div className="h-10 bg-stone-100 border-b border-[#E7E5E4] px-5 flex items-center shrink-0">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                      <div className="w-3 h-3 rounded-full bg-green-400/80" />
                    </div>
                  </div>

                  {/* Browser Content Area */}
                  <div className="flex-1 relative overflow-hidden bg-stone-950 select-none">
                    <img 
                      src={activeProject.image} 
                      alt={`${activeProject.title} Preview`}
                      className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-[1.02]"
                    />
                    
                    {/* Interactive Frame Overlay Hover effect */}
                    <div className="absolute inset-0 bg-stone-950/0 hover:bg-stone-950/20 transition-colors flex items-center justify-center group/screen cursor-pointer">
                      <span className="opacity-0 group-hover/screen:opacity-100 transition-opacity bg-[#1C1917]/90 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-xl border border-stone-850">
                        Visit Site <ExternalLink className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Progress Indicators */}
        <div className="flex items-center justify-center gap-2.5 mt-16">
          {projects.map((proj, idx) => (
            <button
              key={proj.id}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-10 bg-[#1C1917]' : 'w-2.5 bg-stone-300 hover:bg-stone-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
