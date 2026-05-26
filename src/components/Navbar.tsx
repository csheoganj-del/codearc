import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
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
    { name: 'What We Do', href: '#services' },
    { name: 'Our Promise', href: '#why-us' },
    { name: 'How It Works', href: '#process' },
    { name: 'Our Work', href: '#work' },
    { name: 'Cost Estimator', href: '#estimator' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#FAFAF9]/80 backdrop-blur-xl border-b border-[#E7E5E4] py-4 shadow-sm'
            : 'bg-transparent py-6 md:py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo Brand Mark */}
          <a href="#" className="flex items-center space-x-3 group select-none">
            <div className="relative w-8 h-8 rounded-xl overflow-hidden bg-[#1C1917] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <img src="/assets/codearc_logo.png" alt="CodeArc Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-[#1C1917]">
              CodeArc
            </span>
          </a>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-bold text-[#78716C] hover:text-[#1C1917] transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Action CTA Button */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="#contact"
              className="px-5 py-2.5 text-sm font-bold rounded-full text-white bg-[#1C1917] hover:bg-stone-800 transition-all duration-300"
            >
              Get in Touch
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="p-2 rounded-xl text-[#1C1917] hover:bg-[#E7E5E4]/50 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[72px] z-40 md:hidden p-6 bg-[#FAFAF9] border-b border-[#E7E5E4] shadow-xl"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-bold text-[#1C1917] py-3 border-b border-stone-200"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 w-full py-4 rounded-2xl bg-[#1C1917] text-white font-bold text-center block"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
