import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, ArrowDown, MessageSquare, Sparkles } from 'lucide-react';

// Components
import Navbar from './components/Navbar';
import Services from './components/Services';
import PromiseSection from './components/Promise';
import Process from './components/Process';
import Showcase from './components/Showcase';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import { Magnetic } from './components/Motion';

const marqueeItems = [
  'Websites',
  'Web Applications',
  'Android Apps',
  'Dashboards',
  'Booking Systems',
  'Customer Portals',
  'Online Stores',
  'Business Tools',
];

export default function App() {
  const heroRef = useRef<HTMLElement>(null);

  // Cursor-follow parallax for the hero orbs (springy, very gentle)
  const mx = useSpring(0, { stiffness: 40, damping: 20 });
  const my = useSpring(0, { stiffness: 40, damping: 20 });
  const orbX1 = useTransform(mx, (v) => v * 28);
  const orbY1 = useTransform(my, (v) => v * 28);
  const orbX2 = useTransform(mx, (v) => v * -20);
  const orbY2 = useTransform(my, (v) => v * -20);

  const handleHeroMouse = (e: React.MouseEvent) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  // Scroll parallax — hero content drifts up slightly as you scroll away
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <div className="min-h-screen bg-[#FCFCFD] text-[#0F172A] overflow-x-hidden font-sans relative">

      {/* Sticky Navigation Header */}
      <Navbar />

      {/* Hero Section */}
      <header
        ref={heroRef}
        onMouseMove={handleHeroMouse}
        className="relative min-h-[92vh] pt-36 md:pt-44 pb-24 flex flex-col items-center justify-center text-center z-10 overflow-hidden"
      >
        {/* Blueprint grid backdrop */}
        <div className="absolute inset-0 bg-grid mask-fade-bottom pointer-events-none" />

        {/* Drifting, cursor-aware gradient orbs */}
        <motion.div
          style={{ x: orbX1, y: orbY1 }}
          className="absolute top-[-18%] left-[50%] -translate-x-1/2 w-[72%] aspect-square bg-[radial-gradient(circle,_rgba(79,70,229,0.13)_0%,_transparent_65%)] pointer-events-none rounded-full animate-drift-a"
        />
        <motion.div
          style={{ x: orbX2, y: orbY2 }}
          className="absolute top-[8%] left-[-15%] w-[46%] aspect-square bg-[radial-gradient(circle,_rgba(6,182,212,0.10)_0%,_transparent_70%)] pointer-events-none rounded-full animate-drift-b"
        />
        <motion.div
          style={{ x: orbX1, y: orbY2 }}
          className="absolute bottom-[-12%] right-[-12%] w-[46%] aspect-square bg-[radial-gradient(circle,_rgba(124,58,237,0.10)_0%,_transparent_70%)] pointer-events-none rounded-full animate-drift-a"
        />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-5xl mx-auto px-6 relative z-10"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E2E8F0] text-[#4F46E5] text-xs font-bold uppercase tracking-wider mb-10 shadow-[0_4px_16px_-6px_rgba(79,70,229,0.25)]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            A studio for growing businesses
          </motion.div>

          {/* Headline — staggered word reveal */}
          <h1 className="text-5xl md:text-7xl lg:text-[5.75rem] font-extrabold tracking-tight leading-[1.05] text-[#0F172A] mb-4">
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="block"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                Software that feels
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-3">
              <motion.span
                className="block font-accent text-gradient"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                effortless.
              </motion.span>
            </span>
          </h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-[#475569] max-w-2xl mx-auto mb-12 leading-relaxed font-medium"
          >
            We are CodeArc. We craft clean websites, custom web systems, and Android
            apps for growing brands — explained in plain English and built with care,
            so your business feels as good online as it does in person.
          </motion.p>

          {/* CTAs — magnetic */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Magnetic className="w-full sm:w-auto">
              <a
                href="#work"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white font-bold text-base hover:shadow-[0_16px_40px_-12px_rgba(79,70,229,0.55)] transition-shadow duration-300 flex items-center justify-center gap-2 group"
              >
                See What We Build
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Magnetic>

            <Magnetic className="w-full sm:w-auto">
              <a
                href="#contact"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white border border-[#E2E8F0] text-[#0F172A] font-bold text-base hover:border-[#4F46E5]/40 hover:bg-[#EEF2FF]/50 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-[#4F46E5]" />
                Talk to Us
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.a
          href="#services"
          aria-label="Scroll to services"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-float-soft text-[#94A3B8] hover:text-[#4F46E5] transition-colors"
        >
          <ArrowDown className="w-5 h-5" />
        </motion.a>
      </header>

      {/* Capability marquee — a breath between hero and content */}
      <div className="relative py-8 border-y border-[#E2E8F0]/80 bg-white/60 backdrop-blur-sm overflow-hidden mask-fade-x">
        <div className="flex w-max animate-marquee gap-0">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-8 px-8 text-sm font-bold uppercase tracking-[0.2em] text-[#94A3B8] whitespace-nowrap"
            >
              {item}
              <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5]/40" />
            </span>
          ))}
        </div>
      </div>

      {/* Main layout blocks */}
      <main className="relative z-20">
        <Services />
        <PromiseSection />
        <Process />
        <Showcase />
        <ContactForm />
      </main>

      <Footer />
    </div>
  );
}
