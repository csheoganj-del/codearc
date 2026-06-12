import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, CheckCircle2 } from 'lucide-react';
import { Reveal, Magnetic } from './Motion';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  url: string;
  creator: string;
  tags: string[];
  accentColor: string;
  features: string[];
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
    accentColor: '#10b981',
    features: [
      'Cinematic ambient particle effects',
      'Real-time automated order dispatch',
      'Optimized touch-friendly UI for servers',
      'Responsive multi-device layout',
    ],
    image: '/assets/bloomcafe_preview.jpg',
  },
  {
    id: 'bros-bar',
    title: "Bro's Bar",
    subtitle: 'Premium Bar Operations Portal & System Access',
    description: "An elegant bar operations gateway designed for Bro's Bar. Features a custom dark-mode interface with glowing amber text animations, high-end hover effects, and secure staff access doors.",
    url: 'https://brosbar.vercel.app/',
    creator: 'pixncraftstudio',
    tags: ['React', 'CSS Fluidics', 'Interactive Gates', 'Responsive Design'],
    accentColor: '#f59e0b',
    features: [
      'Glowing amber liquid letter animations',
      'Fluid custom-designed UI buttons',
      'Secure, roles-based team sign-in',
      'Ultra-clean dark layout aesthetics',
    ],
    image: '/assets/brosbar_preview.jpg',
  },
  {
    id: 'restrosuite',
    title: 'CodeArc RestroSuite',
    subtitle: 'All-in-One Restaurant POS & Operations Platform',
    description: 'A unified restaurant management suite built for cafes, dhabas, and food chains. Combines billing, kitchen order display, inventory tracking, customer loyalty, and WhatsApp receipts into one seamless, reliable platform.',
    url: 'https://codearc-restrosuite.vercel.app/',
    creator: 'codearc',
    tags: ['Vanilla JS', 'Restaurant POS', 'Real-time KDS', 'WhatsApp Integration'],
    accentColor: '#e8a23d',
    features: [
      'Unified POS billing with instant receipt generation',
      'Live kitchen order display & ticket management',
      'Inventory tracking with low-stock alerts',
      'Customer loyalty program & WhatsApp receipts',
    ],
    image: '/assets/restrosuite_preview.jpg',
  },
];

export default function Showcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  // Subtle scroll parallax for the browser mockup
  const stageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start end', 'end start'],
  });
  const mockupY = useSpring(useTransform(scrollYProgress, [0, 1], [36, -36]), {
    stiffness: 60,
    damping: 20,
  });

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 100 : -100,
      opacity: 0,
    }),
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
    <section id="work" className="py-20 md:py-28 bg-[#F8FAFC] relative overflow-hidden">
      {/* Decorative gradient blobs */}
      <div className="absolute top-1/4 left-[-5%] w-96 h-96 rounded-full bg-[#4F46E5]/8 blur-3xl pointer-events-none animate-drift-a" />
      <div className="absolute bottom-1/4 right-[-5%] w-96 h-96 rounded-full bg-[#06B6D4]/8 blur-3xl pointer-events-none animate-drift-b" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 md:mb-16">
          <Reveal className="max-w-3xl">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#EEF2FF] text-[#4F46E5] text-xs uppercase tracking-widest font-bold mb-5">
              Live Showcase
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
              Real systems, <span className="font-accent text-gradient">real results.</span>
            </h2>
            <p className="text-lg text-[#475569] mt-4 leading-relaxed">
              Explore some of our active systems built to automate and elevate local business operations.
            </p>
          </Reveal>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 mt-8 md:mt-0">
            <Magnetic strength={0.4}>
              <button
                onClick={handlePrev}
                className="p-4 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#4F46E5]/40 hover:bg-[#EEF2FF]/50 active:scale-95 transition-all text-[#0F172A]"
                aria-label="Previous project"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            </Magnetic>
            <Magnetic strength={0.4}>
              <button
                onClick={handleNext}
                className="p-4 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#4F46E5]/40 hover:bg-[#EEF2FF]/50 active:scale-95 transition-all text-[#0F172A]"
                aria-label="Next project"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </Magnetic>
          </div>
        </div>

        {/* Dynamic Showcase Stage */}
        <div ref={stageRef} className="relative min-h-[580px] lg:min-h-[520px]">
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
                <h3 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-2">
                  {activeProject.title}
                </h3>

                {/* Subtitle */}
                <h4 className="text-sm font-bold uppercase tracking-wider mb-6" style={{ color: activeProject.accentColor }}>
                  {activeProject.subtitle}
                </h4>

                {/* Description */}
                <p className="text-base text-[#475569] leading-relaxed mb-8">
                  {activeProject.description}
                </p>

                {/* Feature Checklist */}
                <div className="space-y-3.5 mb-8">
                  {activeProject.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: activeProject.accentColor }} />
                      <span className="text-sm font-medium text-[#334155]">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {activeProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-lg bg-white border border-[#E2E8F0] text-[#475569] text-xs font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                  <Magnetic>
                    <a
                      href={activeProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white font-bold text-sm hover:shadow-[0_12px_32px_-10px_rgba(79,70,229,0.55)] transition-all active:scale-[0.98]"
                    >
                      Open Live Portal
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Magnetic>
                </div>
              </div>

              {/* Visual Interactive Mockup Column */}
              <motion.div style={{ y: mockupY }} className="lg:col-span-7 relative">
                {/* Ambient glow backing */}
                <div
                  className="absolute -inset-4 rounded-[40px] opacity-25 blur-2xl transition-all duration-700 pointer-events-none"
                  style={{ backgroundColor: activeProject.accentColor }}
                />

                {/* Browser Mockup Container */}
                <div className="relative rounded-3xl border border-[#E2E8F0] bg-white shadow-2xl overflow-hidden aspect-[16/10] flex flex-col">
                  {/* Browser Header Bar */}
                  <div className="h-10 bg-[#F8FAFC] border-b border-[#E2E8F0] px-5 flex items-center gap-4 shrink-0">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                      <div className="w-3 h-3 rounded-full bg-green-400/80" />
                    </div>
                    <div className="flex-1 max-w-xs h-5 rounded-md bg-white border border-[#E2E8F0] px-2.5 flex items-center">
                      <span className="text-[10px] text-[#94A3B8] font-medium truncate">
                        {activeProject.url.replace('https://', '')}
                      </span>
                    </div>
                  </div>

                  {/* Browser Content Area */}
                  <a
                    href={activeProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 relative overflow-hidden bg-slate-950 select-none block"
                  >
                    <img
                      src={activeProject.image}
                      alt={`${activeProject.title} Preview`}
                      className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-[1.02]"
                    />

                    {/* Interactive Frame Overlay Hover effect */}
                    <div className="absolute inset-0 bg-slate-950/0 hover:bg-slate-950/20 transition-colors flex items-center justify-center group/screen cursor-pointer">
                      <span className="opacity-0 group-hover/screen:opacity-100 transition-opacity bg-[#0F172A]/90 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-xl">
                        Visit Site <ExternalLink className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </a>
                </div>
              </motion.div>
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
                idx === currentIndex
                  ? 'w-10 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED]'
                  : 'w-2.5 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
