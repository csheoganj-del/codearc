import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  isDark: boolean;
  toggleDark: () => void;
}

export default function Navbar({}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Case Studies', href: '#projects' },
    { name: 'Process', href: '#process' },
    { name: 'Partnerships', href: '#testimonials' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'glass-card-dark py-4 shadow-glass-dark border-b border-white/5 backdrop-blur-lg'
            : 'bg-transparent py-7'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Elite Animated Logo */}
          <a href="#" className="flex items-center space-x-2.5 group select-none">
            <div className="relative w-8 h-8 rounded-xl overflow-hidden shadow-lg shadow-brand-indigo/15 transition-transform duration-300 group-hover:scale-105">
              <img src="/assets/codearc_logo.png" alt="CodeArc Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              Code<span className="bg-gradient-to-r from-brand-indigo to-brand-cyan bg-clip-text text-transparent">Arc</span>
            </span>
          </a>

          {/* Center Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs uppercase font-extrabold tracking-widest text-gray-400 hover:text-white transition-colors duration-200 relative py-1.5 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-indigo to-brand-cyan transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right Action CTA Button */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="#contact"
              className="relative inline-flex items-center justify-center px-5 py-2.5 text-xs font-extrabold uppercase tracking-widest rounded-xl text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/15 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                Book a Call <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-brand-cyan" />
              </span>
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-300 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation (using AnimatePresence) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[72px] z-40 md:hidden p-6 shadow-2xl border-b bg-brand-space/95 backdrop-blur-xl border-white/5 text-white"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs uppercase font-extrabold tracking-widest py-2.5 border-b border-white/5 hover:text-brand-cyan transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-indigo to-brand-cyan text-white font-extrabold text-xs uppercase tracking-widest text-center shadow-lg flex items-center justify-center gap-1.5"
              >
                Book a Call <ArrowRight className="w-4 h-4 text-white" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
