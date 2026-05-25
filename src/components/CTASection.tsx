import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Check, Send, X, Palette, Code2, Smartphone } from 'lucide-react';

interface CTASectionProps {
  isDark: boolean;
}

export default function CTASection({}: CTASectionProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [emailInput, setEmailInput] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleService = (service: string) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((s) => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setModalOpen(false);
      setEmailInput('');
      setSelectedServices([]);
    }, 2500);
  };

  const projectCategories = [
    { id: 'design', name: 'Creative Web Design', icon: Palette },
    { id: 'web', name: 'Full-Stack Web App', icon: Code2 },
    { id: 'mobile', name: 'Android Application', icon: Smartphone },
  ];

  return (
    <section id="contact" className="py-24 md:py-36 relative overflow-hidden transition-colors duration-300">
      
      {/* Space Background */}
      <div className="absolute inset-0 bg-[#030307] z-0" />
      <div className="absolute inset-0 bg-grid-field opacity-20 pointer-events-none z-10" />
      
      {/* Ambient Electric Arc vectors */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-40">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M-100,250 C350,100 650,400 1500,150"
            fill="none"
            stroke="url(#ctaGlow1)"
            strokeWidth="3"
            className="arc-line"
          />
          <path
            d="M-50,420 C450,450 750,100 1550,280"
            fill="none"
            stroke="url(#ctaGlow2)"
            strokeWidth="2"
            className="arc-line"
            style={{ animationDelay: '2.5s' }}
          />

          <defs>
            <linearGradient id="ctaGlow1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366F1" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#D946EF" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="ctaGlow2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D946EF" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#6366F1" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Floating neon light blobs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[500px] h-[500px] bg-[#6366F1]/10 rounded-full blur-[130px] z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-[500px] h-[500px] bg-[#06B6D4]/10 rounded-full blur-[130px] z-10 pointer-events-none" />

      {/* Interactive Box */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl border border-white/5 bg-[#090915]/50 backdrop-blur-md p-10 md:p-20 shadow-2xl relative overflow-hidden text-center flex flex-col items-center justify-center"
        >
          {/* Sparkle badge */}
          <span className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-8 animate-bounce duration-[4000ms]">
            <Sparkles className="w-5 h-5 text-brand-cyan" />
          </span>

          <h2 className="text-3xl md:text-6xl font-black tracking-tight text-white leading-none max-w-3xl">
            Let's Engineer Your Next Product.
          </h2>

          <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-2xl mt-6 font-medium">
            We bridge high-end layouts and robust full-stack engineering. Tap in to book an immediate sandbox design strategy call.
          </p>

          {/* Interactive buttons */}
          <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => setModalOpen(true)}
              className="px-9 py-4.5 rounded-2xl bg-gradient-to-r from-brand-indigo via-brand-blue to-brand-cyan text-white font-bold shadow-lg shadow-brand-indigo/15 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] inline-flex items-center gap-2 group cursor-pointer"
            >
              Start a Project <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <a
              href="#services"
              className="px-9 py-4.5 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/15 text-white font-bold transition-all duration-300"
            >
              Explore Solutions
            </a>
          </div>
        </motion.div>
      </div>

      {/* Interactive Project Wizard Dialog Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg rounded-3xl bg-[#090915] border border-white/10 p-8 shadow-2xl text-white z-10"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-6 right-6 p-1.5 rounded-lg border border-white/5 bg-white/5 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-left">
                <span className="text-[10px] tracking-widest font-extrabold text-brand-cyan uppercase">PROJECT BUILDER</span>
                <h3 className="text-xl font-bold tracking-tight text-white mt-1.5">Configure Your Brief</h3>
                <p className="text-xs text-gray-400 mt-1">Select the solutions your business needs below.</p>
              </div>

              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <span className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                    <Check className="w-6 h-6 text-emerald-400" />
                  </span>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold">brief Sent Successfully!</h4>
                    <p className="text-xs text-gray-400">Our engineering lead will reach out within 2 hours.</p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmitInquiry} className="mt-8 space-y-6 text-left">
                  
                  {/* Service selections */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Core Requirements</label>
                    <div className="grid grid-cols-3 gap-2">
                      {projectCategories.map((cat) => {
                        const Icon = cat.icon;
                        const isSelected = selectedServices.includes(cat.name);

                        return (
                          <div
                            key={cat.id}
                            onClick={() => toggleService(cat.name)}
                            className={`rounded-2xl p-4 border cursor-pointer select-none transition-all flex flex-col justify-between min-h-[95px] ${
                              isSelected
                                ? 'border-brand-indigo bg-brand-indigo/10'
                                : 'border-white/5 bg-white/5 hover:border-white/10 hover:bg-white/10'
                            }`}
                          >
                            <Icon className={`w-4 h-4 ${isSelected ? 'text-brand-indigo' : 'text-gray-400'}`} />
                            <span className="text-[9px] font-black uppercase tracking-tight mt-4 leading-tight">{cat.name.split(' ')[1] || cat.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Work Email */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Work Email</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. founder@company.com"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl border border-white/5 bg-white/5 text-xs text-white focus:outline-none focus:border-brand-indigo transition-all font-medium"
                    />
                  </div>

                  {/* Submission */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-indigo to-brand-cyan text-white font-bold text-center text-xs uppercase tracking-widest shadow-lg flex items-center justify-center gap-1.5"
                  >
                    Submit Brief <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
