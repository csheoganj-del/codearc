import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Terminal, Shield, Cpu, Code2, Layers, Sparkles } from 'lucide-react';

interface InteractiveDashboardProps {
  isDark: boolean;
}

export default function InteractiveDashboard({}: InteractiveDashboardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'canvas' | 'code'>('canvas');
  const [terminalLineIndex, setTerminalLineIndex] = useState(0);

  // Simulated code compiler lines
  const codeLines = [
    { text: 'arc compile --target "web-app"', color: 'text-gray-400' },
    { text: '✔ Transpiling TypeScript React nodes...', color: 'text-brand-cyan' },
    { text: '✔ Injecting spring-physics hooks...', color: 'text-brand-cyan' },
    { text: '✔ Optimizing viewport asset CDNs...', color: 'text-brand-cyan' },
    { text: '✔ Bundling mobile Android APK package...', color: 'text-brand-cyan' },
    { text: '🚀 CodeArc compilation complete! (1.46s)', color: 'text-emerald-400 font-semibold' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTerminalLineIndex((prev) => (prev + 1) % (codeLines.length + 1));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // Mouse tilt spring setup
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Ratios between -0.5 and 0.5
    const mouseX = (event.clientX - rect.left) / width - 0.5;
    const mouseY = (event.clientY - rect.top) / height - 0.5;
    
    x.set(mouseX * 22); // Max 22deg rotate
    y.set(mouseY * -22); 
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const springConfig = { stiffness: 120, damping: 18 };
  const rotateX = useSpring(y, springConfig);
  const rotateY = useSpring(x, springConfig);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[620px] mx-auto perspective-1200 select-none cursor-grab active:cursor-grabbing"
    >
      {/* Decorative radial gradient glow */}
      <div className="absolute -inset-6 bg-gradient-to-tr from-brand-indigo/35 via-brand-magenta/15 to-brand-cyan/25 rounded-[36px] blur-3xl opacity-50 z-0 animate-pulse-slow" />

      {/* Main Perspective card */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative w-full rounded-2xl border border-white/5 bg-[#090915]/80 backdrop-blur-xl shadow-2xl overflow-hidden z-10"
      >
        {/* Mac OS Header bar */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-white/5 bg-[#05050C]">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <div className="flex bg-white/5 rounded-lg p-0.5 border border-white/5">
            <button
              onClick={() => setActiveTab('canvas')}
              className={`px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-md transition-all ${
                activeTab === 'canvas' ? 'bg-brand-indigo text-white shadow-sm' : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Figma Canvas
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-md transition-all ${
                activeTab === 'code' ? 'bg-brand-indigo text-white shadow-sm' : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              React Code
            </button>
          </div>
        </div>

        {/* Dynamic Inner tabs */}
        <div className="p-1 relative min-h-[380px] flex items-center justify-center bg-[#07070F]">
          
          {activeTab === 'canvas' ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full h-full relative p-2"
            >
              {/* Grid backdrop overlay for design feel */}
              <div className="absolute inset-0 bg-grid-field opacity-20 pointer-events-none" />

              {/* Gemini Generated SaaS dashboard mockup */}
              <img
                src="/assets/dashboard_mockup.png"
                alt="SaaS Analytics Canvas"
                className="w-full object-cover rounded-xl border border-white/5 shadow-inner"
              />

              {/* SVG Wireframe Guideline paths */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                {/* Horizontal Guide */}
                <line x1="0" y1="120" x2="600" y2="120" stroke="rgba(6, 182, 212, 0.25)" strokeWidth="1" strokeDasharray="3 3" />
                {/* Vertical Guide */}
                <line x1="280" y1="0" x2="280" y2="400" stroke="rgba(99, 102, 241, 0.25)" strokeWidth="1" strokeDasharray="3 3" />
              </svg>

              {/* Figma-like cursor node overlay (Design Theme) */}
              <motion.div
                animate={{ x: [40, 280, 140, 40], y: [160, 80, 240, 160] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute w-3 h-3 bg-brand-cyan z-20"
                style={{ clipPath: 'polygon(0 0, 100% 0, 70% 70%, 40% 70%, 0 100%)' }}
              >
                <div className="absolute top-4 left-4 bg-brand-cyan text-white text-[7px] font-extrabold uppercase px-1 py-0.5 rounded tracking-wide shadow-md">
                  Designer
                </div>
              </motion.div>

              {/* Layer Parallax widget (3D Depth) */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ translateZ: 85 }}
                className="absolute bottom-6 right-6 p-4 rounded-xl border border-white/10 bg-[#090915]/90 text-white shadow-2xl max-w-[190px] text-left"
              >
                <div className="flex items-center space-x-1.5 mb-1">
                  <span className="w-2 h-2 rounded-full bg-brand-magenta animate-pulse" />
                  <span className="text-[9px] uppercase font-black tracking-widest text-brand-magenta">Layout Node</span>
                </div>
                <div className="text-sm font-black tracking-tight">Responsive Grid</div>
                <div className="text-[8px] text-gray-500 mt-0.5 font-bold uppercase tracking-wider">Auto-Layout: Horizontal</div>
              </motion.div>

              {/* Android Mockup Spec overlay (3D Depth) */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                style={{ translateZ: 50 }}
                className="absolute top-10 left-6 p-3.5 rounded-xl border border-white/10 bg-[#090915]/95 text-white shadow-2xl flex items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-indigo/20 flex items-center justify-center">
                  <Cpu className="w-4 h-4 text-brand-indigo" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] font-black">Android VM</div>
                  <div className="text-[8px] text-gray-400 font-bold uppercase tracking-wider">60FPS Spring Physics</div>
                </div>
              </motion.div>

            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full p-6 font-mono text-xs text-left text-gray-300 leading-relaxed bg-[#05050C] min-h-[370px] rounded-b-xl flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-gray-500 mb-4 border-b border-white/5 pb-2">
                  <Code2 className="w-4.5 h-4.5 text-brand-cyan" />
                  <span>bash - react-engine</span>
                </div>

                {codeLines.slice(0, terminalLineIndex).map((line, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={line.color}
                  >
                    {line.text}
                  </motion.div>
                ))}

                {terminalLineIndex < codeLines.length && (
                  <div className="flex items-center space-x-1.5 text-gray-500 mt-2.5">
                    <span className="w-1.5 h-3 bg-brand-cyan animate-pulse inline-block" />
                    <span className="text-[9px] italic">Optimizing responsive views...</span>
                  </div>
                )}
              </div>

              <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center text-[9px] text-gray-500 font-bold uppercase tracking-widest">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-brand-cyan" />
                  <span>Typescript Secure</span>
                </div>
                <span>React-ts v19</span>
              </div>
            </motion.div>
          )}

        </div>
      </motion.div>

      {/* Floating ambient vector dots */}
      <div className="absolute top-1/3 -right-6 w-1.5 h-1.5 bg-brand-cyan rounded-full animate-bounce duration-1000" />
      <div className="absolute bottom-1/3 -left-6 w-2 h-2 bg-brand-magenta rounded-full animate-bounce duration-700" />
    </div>
  );
}
