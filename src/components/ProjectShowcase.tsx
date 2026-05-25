import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ShoppingBag, TrendingUp, BarChart2 } from 'lucide-react';

interface ProjectShowcaseProps {
  isDark: boolean;
}

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
}

export default function ProjectShowcase({}: ProjectShowcaseProps) {
  const [activeProject, setActiveProject] = useState<string>('safari');

  const projects: ProjectItem[] = [
    {
      id: 'safari',
      title: 'Safari Expedition Engine',
      category: 'Web App & Design',
      description: 'A breathtaking high-performance travel booking system featuring map overlays, localized safari booking filters, and 60FPS fluid transitions.',
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'GraphQL'],
    },
    {
      id: 'restaurant',
      title: 'QuickBite Ordering Suite',
      category: 'Android Mobile App',
      description: 'A native Android ordering platform that integrates custom physics animations, active shopping carts, and Stripe payments with under 2s latencies.',
      tags: ['Kotlin', 'Android SDK', 'Jetpack Compose', 'Node.js'],
    },
    {
      id: 'crm',
      title: 'FinEdge Core SaaS Dashboard',
      category: 'Enterprise Web Application',
      description: 'High-end corporate database web application monitoring leads, computing commissions, and generating responsive invoices with extreme speed.',
      tags: ['Next.js', 'PostgreSQL', 'Serverless Compute', 'Tailwind'],
    },
    {
      id: 'ecommerce',
      title: 'Aura Luxury Storefront',
      category: 'Android App & UI/UX',
      description: 'An elegant Android storefront featuring 3D product view capabilities, instant swipe gestures, and intelligent automated suggestions.',
      tags: ['Kotlin', 'Android Jetpack', 'MongoDB', 'AI Search'],
    }
  ];

  return (
    <section id="projects" className="py-24 md:py-36 relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-indigo/5 blur-mesh" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 md:mb-28">
          <div className="max-w-2xl text-left">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-brand-indigo/10 border border-brand-indigo/25 text-brand-indigo tracking-wider uppercase inline-block mb-5">
              Visual Case Studies
            </span>
            <h2 className="text-4xl md:text-6.5xl font-black tracking-tight leading-none text-white">
              Creative Portfolios.
            </h2>
            <p className="text-sm leading-relaxed text-gray-400 mt-4 max-w-lg">
              Explore live sandbox mockups of digital systems we have designed and engineered across Web and Android environments.
            </p>
          </div>
          
          {/* Project Navigation tab pills */}
          <div className="flex bg-white/5 rounded-2xl p-1 border border-white/5 overflow-x-auto self-start lg:self-auto max-w-full">
            {projects.map((proj) => (
              <button
                key={proj.id}
                onClick={() => setActiveProject(proj.id)}
                className={`px-5 py-2.5 text-xs font-extrabold uppercase tracking-widest rounded-xl transition-all whitespace-nowrap ${
                  activeProject === proj.id ? 'bg-brand-indigo text-white shadow-lg' : 'text-gray-400 hover:text-white'
                }`}
              >
                {proj.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Project View Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Project Details */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <AnimatePresence mode="wait">
              {projects.filter((p) => p.id === activeProject).map((proj) => (
                <motion.div
                  key={proj.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <span className="text-[10px] uppercase font-black tracking-widest bg-gradient-to-r from-brand-indigo via-brand-magenta to-brand-cyan bg-clip-text text-transparent text-glow-electric">
                    {proj.category}
                  </span>
                  
                  <h3 className="text-3xl md:text-4.5xl font-black tracking-tight text-white">
                    {proj.title}
                  </h3>
                  
                  <p className="text-sm md:text-base leading-relaxed text-gray-400 font-medium">
                    {proj.description}
                  </p>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {proj.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-bold px-3 py-1.5 rounded-lg border border-white/5 bg-white/5 text-gray-300 uppercase tracking-wider"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="pt-6">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-cyan hover:text-white transition-colors group"
                    >
                      Request Sandbox Code
                      <ExternalLink className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Right Column: Dynamic "Fan Card Deck" Mockup */}
          <div className="lg:col-span-7 flex justify-center w-full min-h-[460px] relative items-center">
            <AnimatePresence mode="wait">
              
              {/* 1. Safari Safari Browser Fan */}
              {activeProject === 'safari' && (
                <motion.div
                  key="safari"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full max-w-[540px] h-[360px] group/fan"
                >
                  {/* Layer 3: Background Code Sheet (Fans Left) */}
                  <div className="absolute inset-0 rounded-2xl border border-white/5 bg-[#05050C] p-6 shadow-2xl transition-all duration-500 group-hover/fan:-translate-x-32 group-hover/fan:-rotate-6 group-hover/fan:scale-95 -z-20 font-mono text-[9px] text-gray-500 text-left space-y-1">
                    <div className="text-brand-indigo">// safari expedition router</div>
                    <div>import {"{ createRoute }"} from '@codearc/router';</div>
                    <div>export const SafariRoute = createRoute({"{"}</div>
                    <div className="pl-4">path: '/expedition',</div>
                    <div className="pl-4">resolver: SafariResolver,</div>
                    <div className="pl-4">animations: 'spring-physics',</div>
                    <div>{"}"});</div>
                  </div>

                  {/* Layer 2: Design Sheet (Fans Right) */}
                  <div className="absolute inset-0 rounded-2xl border border-white/5 bg-[#090915] p-6 shadow-2xl transition-all duration-500 group-hover/fan:translate-x-32 group-hover/fan:rotate-6 group-hover/fan:scale-95 -z-10 text-left flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-black uppercase text-brand-cyan tracking-widest">DESIGN MODULE</div>
                      <div className="h-0.5 w-12 bg-brand-cyan mt-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-bold text-white">Auto-Layout Matrix</div>
                      <div className="text-[9px] text-gray-400">Flexbox • Gap: 24px • Align: Center</div>
                    </div>
                  </div>

                  {/* Layer 1: Central Visual Mockup (Mac Safari Viewport) */}
                  <div className="absolute inset-0 rounded-2xl border border-white/10 bg-[#090915] shadow-2xl transition-transform duration-500 group-hover/fan:scale-105 overflow-hidden flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#05050C]">
                      <div className="flex items-center space-x-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                      </div>
                      <div className="text-[9px] font-mono px-4 py-0.5 rounded border border-white/5 w-44 text-center bg-white/5 text-gray-500">
                        https://wildsafari.dev
                      </div>
                      <div className="w-8" />
                    </div>
                    
                    {/* Visual Body */}
                    <div className="p-5 flex-1 bg-[#FCFCFD] text-[#0F172A] flex flex-col justify-between text-left">
                      <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <span className="text-xs font-black tracking-tight text-brand-space">WILD<span className="text-brand-indigo">ARC</span></span>
                        <div className="flex space-x-3 text-[9px] font-extrabold text-gray-500 uppercase tracking-wider">
                          <span>Lodges</span>
                          <span>Safari</span>
                        </div>
                      </div>
                      
                      <div className="space-y-1.5">
                        <h4 className="text-xs font-black text-brand-space leading-tight">Explore the Kenyan Savannah</h4>
                        <div className="grid grid-cols-2 gap-2 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
                          <div className="text-[8px] text-gray-400 pl-1.5">
                            <span className="font-extrabold text-gray-600">Location</span>
                            <div>Masai Mara</div>
                          </div>
                          <button className="bg-brand-indigo text-white text-[8px] font-extrabold uppercase rounded-lg py-1">Search</button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white rounded-lg border border-gray-200 p-1.5 shadow-sm">
                          <div className="h-14 bg-gradient-to-tr from-brand-indigo/15 to-brand-blue/10 rounded-md mb-1.5" />
                          <div className="text-[8px] font-extrabold">Serengeti View</div>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200 p-1.5 shadow-sm">
                          <div className="h-14 bg-gradient-to-tr from-brand-cyan/15 to-brand-blue/10 rounded-md mb-1.5" />
                          <div className="text-[8px] font-extrabold">Amboseli Lodge</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 2. QuickBite Android Fan */}
              {activeProject === 'restaurant' && (
                <motion.div
                  key="restaurant"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full max-w-[280px] h-[480px] group/fan flex items-center justify-center"
                >
                  {/* Background Code Sheet (Fans Left) */}
                  <div className="absolute inset-0 rounded-[32px] border border-white/5 bg-[#05050C] p-6 pt-10 shadow-2xl transition-all duration-500 group-hover/fan:-translate-x-20 group-hover/fan:-rotate-6 group-hover/fan:scale-95 -z-20 font-mono text-[9px] text-gray-500 text-left space-y-1">
                    <div className="text-brand-magenta">// Compose Native View</div>
                    <div>@Composable</div>
                    <div>fun QuickBiteLayout() {"{"}</div>
                    <div className="pl-4">Column(modifier = Modifier</div>
                    <div className="pl-6">.fillMaxSize()</div>
                    <div className="pl-6">.animateContentSize()</div>
                    <div className="pl-4">) {"{"} ... {"}"}</div>
                    <div>{"}"}</div>
                  </div>

                  {/* Layer 2: Design Sheet (Fans Right) */}
                  <div className="absolute inset-0 rounded-[32px] border border-white/5 bg-[#090915] p-6 pt-10 shadow-2xl transition-all duration-500 group-hover/fan:translate-x-20 group-hover/fan:rotate-6 group-hover/fan:scale-95 -z-10 text-left flex flex-col justify-between">
                    <div>
                      <div className="text-[9px] font-black uppercase text-brand-magenta tracking-widest">ANDROID VIEW</div>
                      <div className="h-0.5 w-8 bg-brand-magenta mt-1.5" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-white">Touch Area Grid</span>
                      <p className="text-[8px] text-gray-500 font-medium">Density Independent Pixels (DP)</p>
                    </div>
                  </div>

                  {/* Layer 1: Android phone Casing */}
                  <div className="absolute inset-0 rounded-[32px] border-[6px] border-gray-800 bg-[#0F172A] shadow-2xl transition-transform duration-500 group-hover/fan:scale-105 overflow-hidden p-2.5">
                    {/* Screen Content */}
                    <div className="w-full h-full bg-[#FAFAFA] rounded-[22px] overflow-hidden flex flex-col justify-between p-3 text-brand-space pt-5">
                      <div className="flex justify-between items-center border-b border-gray-100 pb-1.5">
                        <span className="text-[10px] font-black uppercase">QuickBite</span>
                        <div className="relative w-5 h-5 bg-brand-indigo/10 rounded-full flex items-center justify-center">
                          <ShoppingBag className="w-3 h-3 text-brand-indigo" />
                          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full text-[6px] text-white flex items-center justify-center font-bold">2</span>
                        </div>
                      </div>

                      <div className="text-left mt-2 flex-1">
                        <h4 className="text-xs font-black">Satisfy Cravings</h4>
                        <p className="text-[7px] text-gray-400">Order Delivery in 10m</p>

                        <div className="space-y-2 mt-4">
                          <div className="bg-white rounded-lg border border-gray-100 p-1.5 flex justify-between items-center shadow-sm">
                            <div className="flex items-center gap-2 text-left">
                              <span className="text-xs">🍔</span>
                              <div>
                                <div className="text-[7.5px] font-extrabold">Truffle Burger</div>
                                <span className="text-[6.5px] text-gray-400">$12.50</span>
                              </div>
                            </div>
                            <span className="w-4 h-4 bg-brand-indigo text-white rounded-md text-[10px] font-bold flex items-center justify-center">+</span>
                          </div>
                          
                          <div className="bg-white rounded-lg border border-gray-100 p-1.5 flex justify-between items-center shadow-sm">
                            <div className="flex items-center gap-2 text-left">
                              <span className="text-xs">🥗</span>
                              <div>
                                <div className="text-[7.5px] font-extrabold">Garden Salad</div>
                                <span className="text-[6.5px] text-gray-400">$8.99</span>
                              </div>
                            </div>
                            <span className="w-4 h-4 bg-brand-indigo text-white rounded-md text-[10px] font-bold flex items-center justify-center">+</span>
                          </div>
                        </div>
                      </div>

                      <button className="w-full bg-brand-indigo text-white font-extrabold uppercase py-2 rounded-xl text-[8px] tracking-wider shadow-md mt-2">
                        View Cart • $21.49
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 3. FinEdge CRM Fan */}
              {activeProject === 'crm' && (
                <motion.div
                  key="crm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full max-w-[540px] h-[360px] group/fan"
                >
                  {/* Background Code Sheet (Fans Left) */}
                  <div className="absolute inset-0 rounded-2xl border border-white/5 bg-[#05050C] p-6 shadow-2xl transition-all duration-500 group-hover/fan:-translate-x-32 group-hover/fan:-rotate-6 group-hover/fan:scale-95 -z-20 font-mono text-[9px] text-gray-500 text-left space-y-1">
                    <div className="text-brand-cyan">// Next.js API endpoint</div>
                    <div>import {"{ NextResponse }"} from 'next/server';</div>
                    <div>export async function GET() {"{"}</div>
                    <div className="pl-4">const data = await fetchLeads();</div>
                    <div className="pl-4">return NextResponse.json(data);</div>
                    <div>{"}"}</div>
                  </div>

                  {/* Layer 2: Design Sheet (Fans Right) */}
                  <div className="absolute inset-0 rounded-2xl border border-white/5 bg-[#090915] p-6 shadow-2xl transition-all duration-500 group-hover/fan:translate-x-32 group-hover/fan:rotate-6 group-hover/fan:scale-95 -z-10 text-left flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-black uppercase text-brand-indigo tracking-widest">SaaS CORE</div>
                      <div className="h-0.5 w-12 bg-brand-indigo mt-2" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-bold text-white">Database Indexing</div>
                      <div className="text-[9px] text-gray-400">Postgres Index B-Tree</div>
                    </div>
                  </div>

                  {/* Layer 1: Visual Mockup (CRM Web App) */}
                  <div className="absolute inset-0 rounded-2xl border border-white/10 bg-[#090915] shadow-2xl transition-transform duration-500 group-hover/fan:scale-105 overflow-hidden flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#05050C]">
                      <div className="flex items-center space-x-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                      </div>
                      <div className="text-[9px] font-mono px-4 py-0.5 rounded border border-white/5 w-44 text-center bg-white/5 text-gray-500">
                        https://finedge.codearc.io
                      </div>
                      <div className="w-8" />
                    </div>
                    
                    {/* Visual Body */}
                    <div className="p-5 flex-1 bg-[#0F172A] text-white flex flex-col justify-between text-left">
                      <div className="flex justify-between items-center border-b border-white/5 pb-2">
                        <span className="text-xs font-black tracking-tight text-white">FIN<span className="text-brand-cyan">EDGE</span></span>
                        <span className="text-[8px] bg-brand-cyan/10 border border-brand-cyan/25 text-brand-cyan px-2.5 py-0.5 rounded-full">ACTIVE DB</span>
                      </div>

                      <div className="grid grid-cols-3 gap-3 my-2">
                        <div className="bg-[#1E293B] rounded-xl p-2.5 border border-white/5">
                          <div className="text-[7px] text-gray-400 font-bold uppercase">REVENUE</div>
                          <div className="text-sm font-extrabold text-white mt-0.5">$142K</div>
                          <span className="text-[6.5px] text-emerald-400 font-bold flex items-center gap-0.5 mt-0.5">
                            <TrendingUp className="w-2 h-2" /> +18.4%
                          </span>
                        </div>
                        <div className="bg-[#1E293B] rounded-xl p-2.5 border border-white/5">
                          <div className="text-[7px] text-gray-400 font-bold uppercase">CONTACTS</div>
                          <div className="text-sm font-extrabold text-white mt-0.5">1,842</div>
                        </div>
                        <div className="bg-[#1E293B] rounded-xl p-2.5 border border-white/5">
                          <div className="text-[7px] text-gray-400 font-bold uppercase">CONVERSION</div>
                          <div className="text-sm font-extrabold text-white mt-0.5">4.8%</div>
                        </div>
                      </div>

                      <div className="bg-[#1E293B] rounded-xl border border-white/5 p-2.5">
                        <div className="text-[7px] font-black text-gray-400 tracking-wider mb-1.5 uppercase">Lead Streams</div>
                        <div className="flex justify-between items-center text-[7px] border-b border-white/5 pb-1 mb-1">
                          <span>Sarah J. • Stripe</span>
                          <span className="text-emerald-400">+$14.2K</span>
                        </div>
                        <div className="flex justify-between items-center text-[7px]">
                          <span>Alex M. • Vercel</span>
                          <span className="text-emerald-400">+$9.8K</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 4. Aura Luxury Android Fan */}
              {activeProject === 'ecommerce' && (
                <motion.div
                  key="ecommerce"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full max-w-[280px] h-[480px] group/fan flex items-center justify-center"
                >
                  {/* Background Code Sheet (Fans Left) */}
                  <div className="absolute inset-0 rounded-[32px] border border-white/5 bg-[#05050C] p-6 pt-10 shadow-2xl transition-all duration-500 group-hover/fan:-translate-x-20 group-hover/fan:-rotate-6 group-hover/fan:scale-95 -z-20 font-mono text-[9px] text-gray-500 text-left space-y-1">
                    <div className="text-brand-cyan">// Android Jetpack UI</div>
                    <div>@Composable</div>
                    <div>fun StorefrontProductGrid() {"{"}</div>
                    <div className="pl-4">LazyVerticalGrid(</div>
                    <div className="pl-6">columns = GridCells.Fixed(2)</div>
                    <div className="pl-4">) {"{"} ... {"}"}</div>
                    <div>{"}"}</div>
                  </div>

                  {/* Layer 2: Design Sheet (Fans Right) */}
                  <div className="absolute inset-0 rounded-[32px] border border-white/5 bg-[#090915] p-6 pt-10 shadow-2xl transition-all duration-500 group-hover/fan:translate-x-20 group-hover/fan:rotate-6 group-hover/fan:scale-95 -z-10 text-left flex flex-col justify-between">
                    <div>
                      <div className="text-[9px] font-black uppercase text-brand-cyan tracking-widest">PRODUCT INTERFACE</div>
                      <div className="h-0.5 w-8 bg-brand-cyan mt-1.5" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-white">Tactile Slider</span>
                      <p className="text-[8px] text-gray-500 font-medium">Auto-Responsive Swipe Vectors</p>
                    </div>
                  </div>

                  {/* Layer 1: Android phone Casing */}
                  <div className="absolute inset-0 rounded-[32px] border-[6px] border-gray-800 bg-[#0F172A] shadow-2xl transition-transform duration-500 group-hover/fan:scale-105 overflow-hidden p-2.5">
                    {/* Screen Content */}
                    <div className="w-full h-full bg-[#111827] rounded-[22px] overflow-hidden flex flex-col justify-between p-3 text-white pt-5">
                      <div className="flex justify-between items-center border-b border-white/5 pb-1.5">
                        <span className="text-[9px] font-black uppercase tracking-widest">Aura Luxury</span>
                        <div className="w-4 h-4 bg-white/5 rounded-full flex items-center justify-center">
                          <ShoppingBag className="w-2.5 h-2.5 text-white" />
                        </div>
                      </div>

                      <div className="bg-gradient-to-tr from-brand-indigo/40 to-brand-cyan/20 rounded-xl p-3 border border-white/5 text-left mt-3">
                        <span className="text-[6.5px] uppercase font-bold text-brand-cyan tracking-wider">NEW COLLECTION</span>
                        <h4 className="text-[9.5px] font-black mt-0.5">Classic Leather Chrono</h4>
                        <p className="text-[6.5px] text-gray-400 mt-1">Sleek carbon dials meeting micro-stitched straps.</p>
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-[8px] font-bold">$299</span>
                          <button className="bg-white text-black text-[6.5px] font-bold px-2 py-0.5 rounded-md">Order</button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-3 flex-1 overflow-y-auto">
                        <div className="bg-white/5 rounded-xl border border-white/5 p-2 text-left">
                          <div className="h-14 bg-[#1F2937] rounded-lg mb-1 flex items-center justify-center text-[15px]">⌚</div>
                          <div className="text-[6.5px] font-bold">Midnight</div>
                          <span className="text-[5.5px] text-gray-400">$340</span>
                        </div>
                        <div className="bg-white/5 rounded-xl border border-white/5 p-2 text-left">
                          <div className="h-14 bg-[#1F2937] rounded-lg mb-1 flex items-center justify-center text-[15px]">🕶</div>
                          <div className="text-[6.5px] font-bold">Aviation</div>
                          <span className="text-[5.5px] text-gray-400">$180</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
