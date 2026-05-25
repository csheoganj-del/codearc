import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Compass, PenTool, Brackets, CheckSquare, Rocket } from 'lucide-react';

interface ProcessTimelineProps {
  isDark: boolean;
}

interface Step {
  num: string;
  title: string;
  icon: React.ComponentType<any>;
  description: string;
  deliverable: string;
}

export default function ProcessTimeline({}: ProcessTimelineProps) {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps: Step[] = [
    {
      num: '01',
      title: 'Discovery & Briefing',
      icon: Search,
      description: 'Analyzing user needs, compiling benchmark design models, defining the scope of web apps, and cataloging target Android screen ratios.',
      deliverable: 'Scope Specification & Product Sitemap',
    },
    {
      num: '02',
      title: 'Strategy & Wireframe',
      icon: Compass,
      description: 'Architecting database indexes, server routes, user flow wireframes, and detailing the mobile integration pipelines.',
      deliverable: 'Database Schema & Structural Wireframes',
    },
    {
      num: '03',
      title: 'High-Fidelity UI/UX',
      icon: PenTool,
      description: 'Engineering breathtaking visual mockups, responsive grid rules, typography hierarchies, and custom glassmorphism styles in Figma.',
      deliverable: 'Figma Design Tokens & UI Prototypes',
    },
    {
      num: '04',
      title: 'Full-Stack Development',
      icon: Brackets,
      description: 'Writing clean, typed TypeScript code for frontends and Android Compose modules, and configuring secure server APIs.',
      deliverable: 'GitHub Repository & Working Alpha Build',
    },
    {
      num: '05',
      title: 'Stress & Responsive Audit',
      icon: CheckSquare,
      description: 'Conducting automated E2E tests, verifying page speeds on PageSpeed Insights, and testing physical Android screen responsiveness.',
      deliverable: 'QA Testing Reports & Load Speed Certifications',
    },
    {
      num: '06',
      title: 'Cloud Deploy & Support',
      icon: Rocket,
      description: 'Launching static edge assets, setting up global CDN caches, optimizing SEO metadata, and activating continuous SLA maintenance.',
      deliverable: 'Live Production URL & Active SLA Monitoring',
    },
  ];

  return (
    <section id="process" className="py-24 md:py-36 relative overflow-hidden transition-colors duration-300">
      
      {/* Glow path backdrop */}
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-brand-cyan/5 blur-blob" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20 md:mb-28 text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-brand-indigo/10 border border-brand-indigo/25 text-brand-indigo tracking-wider uppercase inline-block mb-5">
              Production Journey
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6.5xl font-black tracking-tight leading-none text-white"
          >
            The Engineering Timeline.
          </motion.h2>
        </div>

        {/* Tactile Vertical Process Grid */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Vertical Track laser line (Left aligned on desktop) */}
          <div className="absolute left-[36px] top-0 bottom-0 w-0.5 bg-white/5 -z-10 hidden md:block">
            {/* Active shooting laser gradient */}
            <motion.div
              className="absolute top-0 w-full bg-gradient-to-b from-brand-indigo via-brand-magenta to-brand-cyan"
              style={{
                height: `${(activeStep / (steps.length - 1)) * 100}%`,
              }}
              transition={{ type: 'spring', stiffness: 100, damping: 18 }}
            />
            {/* Laser shooting bulb */}
            <motion.div
              className="absolute w-3 h-3 bg-brand-cyan rounded-full -left-1 shadow-lg shadow-brand-cyan/50"
              style={{
                top: `${(activeStep / (steps.length - 1)) * 100}%`,
                transform: 'translateY(-50%)',
              }}
              transition={{ type: 'spring', stiffness: 100, damping: 18 }}
            />
          </div>

          <div className="space-y-12 md:space-y-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index <= activeStep;
              const isCurrent = index === activeStep;

              return (
                <div
                  key={step.num}
                  onMouseEnter={() => setActiveStep(index)}
                  className="flex flex-col md:flex-row items-start gap-6 md:gap-12 cursor-pointer group text-left"
                >
                  {/* Circle Step indicator (acting as timeline node) */}
                  <div className="flex-shrink-0 relative">
                    <motion.div
                      animate={{
                        scale: isCurrent ? 1.12 : 1,
                        borderColor: isCurrent ? '#6366F1' : isActive ? '#06B6D4' : 'rgba(255,255,255,0.05)',
                        backgroundColor: isCurrent ? '#090915' : '#030307',
                      }}
                      className="w-18 h-18 rounded-2xl border-2 flex items-center justify-center relative transition-all duration-300 shadow-xl"
                    >
                      <Icon className={`w-5.5 h-5.5 transition-colors duration-300 ${
                        isCurrent ? 'text-brand-indigo' : isActive ? 'text-brand-cyan' : 'text-gray-500'
                      }`} />
                    </motion.div>
                  </div>

                  {/* Step Description Card */}
                  <motion.div
                    animate={{
                      opacity: isCurrent ? 1 : 0.65,
                      x: isCurrent ? 8 : 0,
                    }}
                    className={`flex-1 p-8 rounded-3xl border transition-all duration-300 ${
                      isCurrent
                        ? 'bg-[#090915]/60 border-brand-indigo/25 shadow-premium-hover'
                        : 'bg-transparent border-transparent'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 mb-3">
                      <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-brand-cyan transition-colors">
                        {step.title}
                      </h3>
                      <span className="text-[9px] font-black uppercase tracking-widest text-brand-cyan bg-brand-cyan/10 px-2.5 py-0.5 rounded border border-brand-cyan/25 self-start md:self-auto">
                        STEP {step.num}
                      </span>
                    </div>
                    
                    <p className="text-sm leading-relaxed text-gray-400 font-medium max-w-3xl mb-4">
                      {step.description}
                    </p>

                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-indigo mt-6 pt-4 border-t border-white/5">
                      <span className="text-gray-500">Deliverable:</span>
                      <span className="text-white">{step.deliverable}</span>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
