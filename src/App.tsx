import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Code2, Globe, Shield, Star, MousePointerClick } from 'lucide-react';

// Components
import Navbar from './components/Navbar';
import LogoStrip from './components/LogoStrip';
import ServicesSection from './components/ServiceCard';
import BentoGrid from './components/BentoGrid';
import ProjectShowcase from './components/ProjectShowcase';
import ProcessTimeline from './components/ProcessTimeline';
import Testimonials from './components/Testimonials';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import InteractiveDashboard from './components/InteractiveDashboard';

export default function App() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Pre-loader Splash Percentage Tick
  useEffect(() => {
    if (loadingProgress < 100) {
      const duration = Math.random() * 80 + 20; // Variable speed
      const timer = setTimeout(() => {
        setLoadingProgress((prev) => Math.min(prev + Math.floor(Math.random() * 8 + 3), 100));
      }, duration);
      return () => clearTimeout(timer);
    } else {
      const doneTimer = setTimeout(() => {
        setIsLoaded(true);
      }, 550);
      return () => clearTimeout(doneTimer);
    }
  }, [loadingProgress]);

  // Animation variants for loading split curtains
  const leftCurtain = {
    hidden: { x: 0 },
    exit: { 
      x: '-100%', 
      transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] as any } 
    }
  };

  const rightCurtain = {
    hidden: { x: 0 },
    exit: { 
      x: '100%', 
      transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] as any } 
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as any } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <>
      {/* 1. ELITE SPLASH PRE-LOADER */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div 
            className="fixed inset-0 z-[100] flex overflow-hidden select-none pointer-events-none"
            exit={{ opacity: 0, transition: { delay: 0.8 } }}
          >
            {/* Left Curtain Pane */}
            <motion.div 
              variants={leftCurtain}
              initial="hidden"
              exit="exit"
              className="w-1/2 h-full bg-[#030307] border-r border-white/5 flex items-center justify-end pr-8 relative"
            >
              <div className="absolute inset-0 bg-grid-field opacity-10" />
            </motion.div>

            {/* Right Curtain Pane */}
            <motion.div 
              variants={rightCurtain}
              initial="hidden"
              exit="exit"
              className="w-1/2 h-full bg-[#030307] flex items-center justify-start pl-8 relative"
            >
              <div className="absolute inset-0 bg-grid-field opacity-10" />
            </motion.div>

            {/* Central Animated Counters */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-[110] pointer-events-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.4 } }}
                className="text-center space-y-6"
              >
                <div className="flex items-center space-x-2.5 justify-center">
                  <span className="text-xl font-bold tracking-widest text-gradient-electric">CODEARC</span>
                </div>
                <div className="text-7xl md:text-9xl font-black font-mono tracking-tighter text-glow-electric text-white">
                  {loadingProgress}%
                </div>
                <div className="text-[10px] uppercase font-bold tracking-widest text-gray-500 flex items-center gap-1.5 justify-center">
                  <span className="w-1.5 h-1.5 bg-brand-indigo rounded-full animate-ping" />
                  <span>Synthesizing Design Systems</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. MAIN AGENCY REDESIGN EXPERIENCE */}
      {isLoaded && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen relative bg-brand-space text-brand-darkText overflow-x-hidden"
        >
          {/* Base Backdrop Grids & Glow Meshes */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            {/* Micro grid overlay */}
            <div className="absolute inset-0 bg-grid-field opacity-75" />

            {/* Blending Abstract Arc graphic in background */}
            <div className="absolute top-0 right-0 w-[60%] h-[900px] overflow-hidden opacity-25 select-none">
              <img 
                src="/assets/abstract_arc.png" 
                alt="CodeArc Abstract Arc Logo"
                className="w-full h-full object-cover blur-sm mix-blend-screen"
              />
            </div>

            {/* Glowing gas meshes (Stripe/Linear look) */}
            <div className="absolute top-[100px] left-[5%] w-[450px] h-[450px] bg-brand-indigo rounded-full blur-mesh" />
            <div className="absolute top-[250px] right-[10%] w-[500px] h-[500px] bg-brand-cyan rounded-full blur-mesh" />
            <div className="absolute top-[500px] left-[35%] w-[380px] h-[380px] bg-brand-magenta rounded-full blur-mesh" />
          </div>

          {/* Sticky Navbar */}
          <Navbar isDark={true} toggleDark={() => {}} />

          {/* HERO HEADER */}
          <header className="relative pt-44 md:pt-56 pb-24 md:pb-36 overflow-hidden z-10">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
                
                {/* Editorial Headline Column */}
                <motion.div 
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="lg:col-span-7 text-left space-y-8"
                >
                  <motion.div variants={fadeInUp}>
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-extrabold bg-brand-indigo/10 border border-brand-indigo/25 text-brand-cyanLight tracking-widest uppercase">
                      <Sparkles className="w-3.5 h-3.5 text-brand-cyan" /> Interactive Studio Design
                    </span>
                  </motion.div>

                  <motion.h1 
                    variants={fadeInUp}
                    className="text-5.5xl md:text-8.5xl font-black tracking-tight leading-[0.98] text-white"
                  >
                    We Engineer <span className="text-gradient-electric text-glow-electric">Digital</span> Masterpieces.
                  </motion.h1>

                  <motion.p 
                    variants={fadeInUp}
                    className="text-sm md:text-base leading-relaxed text-gray-400 font-medium max-w-xl"
                  >
                    CodeArc is a premium digital solutions company. We specialize in breathtaking web design, highly interactive web applications, and native Android app engineering built with absolute precision.
                  </motion.p>

                  {/* Magnetic interactive CTA Row */}
                  <motion.div 
                    variants={fadeInUp}
                    className="flex flex-col sm:flex-row items-center gap-4 pt-4"
                  >
                    <a
                      href="#contact"
                      className="w-full sm:w-auto px-9 py-4.5 rounded-2xl bg-gradient-to-r from-brand-indigo via-brand-blue to-brand-cyan hover:scale-[1.03] active:scale-[0.98] text-white font-bold text-center shadow-2xl transition-all duration-300 inline-flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      Book Design Strategy <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                    <a
                      href="#projects"
                      className="w-full sm:w-auto px-9 py-4.5 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/15 text-white font-bold text-center transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      View Live Sandboxes
                    </a>
                  </motion.div>

                  {/* Micro Specs Indicators */}
                  <motion.div 
                    variants={fadeInUp}
                    className="pt-10 border-t border-white/5 grid grid-cols-3 gap-6 text-[10px] font-extrabold text-gray-500 uppercase tracking-widest"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-lg bg-brand-indigo inline-block" />
                      <span>Elite UI/UX Architecture</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-lg bg-brand-cyan inline-block" />
                      <span>Next.js & Native Android</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-lg bg-brand-magenta inline-block" />
                      <span>Tactile Physics Engine</span>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Perspective 3D Tilt Dashboard Column */}
                <motion.div
                  initial={{ opacity: 0, x: 50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:col-span-5 flex items-center justify-center z-10"
                >
                  <InteractiveDashboard isDark={true} />
                </motion.div>

              </div>
            </div>
          </header>

          {/* Infinite trust marquee strip */}
          <LogoStrip isDark={true} />

          {/* Redesigned Services section (Creative Web/Android focused) */}
          <ServicesSection isDark={true} />

          {/* Redesigned Bento Grid why us (3D Parallax Tilt) */}
          <BentoGrid isDark={true} />

          {/* Fan Card Showcase case studies */}
          <ProjectShowcase isDark={true} />

          {/* Vertical scroll linked timeline process */}
          <ProcessTimeline isDark={true} />

          {/* Founder Testimonials */}
          <Testimonials isDark={true} />

          {/* Particle based glowing CTA */}
          <CTASection isDark={true} />

          {/* Minimalist Footer */}
          <Footer isDark={true} />

        </motion.div>
      )}
    </>
  );
}
