import React from 'react';
import { Mail, MessageSquare } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { name: 'What We Do', href: '#services' },
    { name: 'Our Promise', href: '#why-us' },
    { name: 'How It Works', href: '#process' },
    { name: 'Cost Estimator', href: '#estimator' },
  ];

  return (
    <footer className="py-16 border-t border-[#E7E5E4] bg-[#FAFAF9] z-10 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center md:items-start justify-between gap-12">
        
        {/* Brand Column */}
        <div className="text-center md:text-left space-y-4 max-w-sm">
          <a href="#" className="flex items-center justify-center md:justify-start space-x-3 group select-none">
            <div className="relative w-8 h-8 rounded-xl overflow-hidden bg-[#1C1917] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <img src="/assets/codearc_logo.png" alt="CodeArc Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-[#1C1917]">
              CodeArc
            </span>
          </a>
          <p className="text-sm leading-relaxed text-[#78716C] font-semibold">
            We build websites and mobile apps. Simply. We talk in everyday English, charge honest fixed prices, and design software that anyone can use instantly.
          </p>
        </div>

        {/* Quick Links Column */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <h4 className="text-xs font-black tracking-widest uppercase text-[#1C1917]">
            Navigation
          </h4>
          <div className="flex flex-col items-center md:items-start space-y-3">
            {links.map((lnk) => (
              <a
                key={lnk.name}
                href={lnk.href}
                className="text-sm font-bold text-[#78716C] hover:text-[#1C1917] transition-colors"
              >
                {lnk.name}
              </a>
            ))}
          </div>
        </div>

        {/* Contact Column */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <h4 className="text-xs font-black tracking-widest uppercase text-[#1C1917]">
            Say Hello
          </h4>
          <div className="flex flex-col items-center md:items-start space-y-3">
            <a
              href="mailto:hello@codearc.dev"
              className="text-sm font-bold flex items-center gap-2 text-[#78716C] hover:text-[#1C1917] transition-colors"
            >
              <Mail className="w-4 h-4 text-[#1C1917]" />
              hello@codearc.dev
            </a>
            <a
              href="#contact"
              className="text-sm font-bold flex items-center gap-2 text-[#78716C] hover:text-[#1C1917] transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-[#1C1917]" />
              Send a simple message
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Legal bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm font-semibold text-[#78716C]">
        <span>&copy; {currentYear} CodeArc. Built simply for growing businesses.</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-[#1C1917] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#1C1917] transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
