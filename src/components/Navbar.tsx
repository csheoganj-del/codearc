import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Springy reading-progress bar
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });

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
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Scroll progress indicator */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60] bg-gradient-to-r from-[#4F46E5] via-[#7C3AED] to-[#06B6D4]"
      />

      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-5 md:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div
            className={`flex items-center justify-between rounded-2xl px-4 md:px-6 transition-all duration-300 ${
              scrolled
                ? 'bg-white/80 backdrop-blur-xl border border-[#E2E8F0] shadow-[0_8px_30px_-12px_rgba(15,23,42,0.12)] py-3'
                : 'bg-transparent border border-transparent py-2'
            }`}
          >
            {/* Logo Brand Mark */}
            <a href="#" className="flex items-center space-x-2.5 group select-none">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-[0_4px_14px_-4px_rgba(79,70,229,0.5)]">
                <img src="/assets/codearc_logo.png" alt="CodeArc Logo" className="w-full h-full object-cover mix-blend-luminosity" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-[#0F172A]">
                Code<span className="text-[#4F46E5]">Arc</span>
              </span>
            </a>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 rounded-full text-sm font-semibold text-[#64748B] hover:text-[#0F172A] hover:bg-[#EEF2FF] transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Right Action CTA Button */}
            <div className="hidden md:flex items-center">
              <a
                href="#contact"
                className="group inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-bold rounded-full text-white bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:shadow-[0_8px_24px_-8px_rgba(79,70,229,0.6)] transition-all duration-300"
              >
                Start a Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Mobile Menu Trigger */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
                className="p-2 rounded-xl text-[#0F172A] hover:bg-[#EEF2FF] transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-[80px] z-40 md:hidden p-6 bg-white rounded-3xl border border-[#E2E8F0] shadow-2xl"
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-bold text-[#0F172A] py-3.5 px-4 rounded-xl hover:bg-[#EEF2FF] transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 w-full py-4 rounded-2xl bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white font-bold text-center block shadow-[0_8px_24px_-8px_rgba(79,70,229,0.5)]"
              >
                Start a Project
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
