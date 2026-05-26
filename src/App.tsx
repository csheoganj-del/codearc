import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Calculator } from 'lucide-react';

// Components
import Navbar from './components/Navbar';
import Services from './components/Services';
import PromiseSection from './components/Promise';
import Process from './components/Process';
import Showcase from './components/Showcase';
import Estimator from './components/Estimator';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

export default function App() {
  const [prefilledText, setPrefilledText] = useState('');

  const handleSelectEstimate = (estimateText: string) => {
    setPrefilledText(estimateText);
    
    // Smooth scroll directly to the contact form
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#1C1917] selection:bg-[#E7E5E4] selection:text-[#1C1917] overflow-x-hidden font-sans relative">
      
      {/* Sticky Navigation Header */}
      <Navbar />

      {/* Hero Section */}
      <header className="relative pt-36 md:pt-48 pb-20 md:pb-32 flex flex-col items-center justify-center text-center z-10 overflow-hidden">
        
        {/* Soft, warm background gradients */}
        <div className="absolute top-[-10%] left-[-20%] w-[60%] aspect-square bg-[radial-gradient(circle,_rgba(231,229,228,0.3)_0%,_transparent_70%)] pointer-events-none rounded-full" />
        <div className="absolute bottom-[0%] right-[-10%] w-[50%] aspect-square bg-[radial-gradient(circle,_rgba(231,229,228,0.25)_0%,_transparent_75%)] pointer-events-none rounded-full" />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          
          {/* Fresh badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E7E5E4] text-[#78716C] text-xs font-bold uppercase tracking-wider mb-8 shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-stone-500 animate-pulse" />
            Simple software for your business
          </motion.div>
          
          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] text-[#1C1917] mb-8"
          >
            We build websites and mobile apps. <br className="hidden md:block"/>
            <span className="text-[#78716C]">Simply.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-2xl text-[#78716C] max-w-3xl mx-auto mb-12 leading-relaxed font-semibold"
          >
            We are CodeArc. We design clean, easy-to-understand websites, custom web systems, and Android apps for growing brands. No jargon. Just tools that help you grow.
          </motion.p>

          {/* Call to Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <a
              href="#estimator"
              className="w-full sm:w-auto px-8 py-4.5 rounded-2xl bg-[#1C1917] text-white font-bold text-base hover:bg-stone-800 transition-colors duration-300 shadow-sm active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              Calculate Cost
            </a>
            
            <a
              href="#contact"
              className="w-full sm:w-auto px-8 py-4.5 rounded-2xl bg-white border border-[#E7E5E4] text-[#1C1917] font-bold text-base hover:border-stone-400 hover:bg-stone-50/50 transition-colors duration-300 flex items-center justify-center gap-2 group"
            >
              <MessageSquare className="w-4 h-4" />
              Talk to us <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

        </div>
      </header>

      {/* Main layout blocks */}
      <main className="relative z-20">
        
        {/* Pillar Services */}
        <Services />

        {/* Side-by-Side Values Comparison */}
        <PromiseSection />

        {/* Co-operative 3-Step Process */}
        <Process />

        {/* Dynamic Project Showcase Slideshow */}
        <Showcase />

        {/* Interactive Plain-English Cost Estimator */}
        <Estimator onSelectEstimate={handleSelectEstimate} />

        {/* Simple Contact Form */}
        <ContactForm prefilledText={prefilledText} />

      </main>

      {/* Sober Minimalist Footer */}
      <Footer />

    </div>
  );
}
