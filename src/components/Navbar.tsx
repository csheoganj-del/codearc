"use client";

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const navLinks = [
  { name: 'Work', href: '/#work' },
  { name: 'Studio', href: '/#studio' },
  { name: 'Capabilities', href: '/#capabilities' },
  { name: 'Suite', href: '/#suite' },
  { name: 'Estimate', href: '/#estimate' },
  { name: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const threshold = 40;
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const nav = mobileNavRef.current;
    const firstLink = nav?.querySelector<HTMLElement>('a, button');
    firstLink?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuBtnRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab' || !nav) return;

      const focusable = Array.from(
        nav.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[rgba(24,23,19,0.1)] shadow-[0_4px_20px_-4px_rgba(24,23,19,0.06)]'
          : 'py-4 sm:py-6 bg-transparent'
      }`}
    >
      <div className="w-[calc(100%-clamp(24px,5vw,96px))] max-w-[1536px] mx-auto flex items-center justify-between gap-4">
        
        {/* Logo container */}
        <div
          className={`transition-all duration-300 ${
            !scrolled && isHome
              ? 'px-3.5 sm:px-4 py-2 rounded-full bg-[#FAF6F0] border border-[rgba(24,23,19,0.12)] shadow-[0_4px_24px_-4px_rgba(24,23,19,0.12)]'
              : ''
          }`}
        >
          <Logo variant="dark" onClick={() => setOpen(false)} />
        </div>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Primary"
          className={`hidden md:flex items-center gap-6 lg:gap-8 text-[14px] font-medium tracking-wide transition-all duration-300 ${
            !scrolled && isHome
              ? 'px-6 lg:px-8 py-2.5 rounded-full bg-[#FAF6F0] border border-[rgba(24,23,19,0.12)] shadow-[0_4px_24px_-4px_rgba(24,23,19,0.12)] text-[#181713]'
              : 'text-[#5A554C]'
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-[#C43C11] transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right CTA + Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <Link
            href="/#contact"
            className="hidden sm:inline-flex items-center gap-1.5 h-[42px] px-5 rounded-full bg-[#181713] text-[#FAF7F2] text-[13px] font-semibold tracking-wide hover:bg-[#C43C11] transition-all duration-200 shadow-sm transform hover:-translate-y-0.5"
          >
            <span>Start a project</span>
            <span className="text-xs">↗</span>
          </Link>

          {/* Mobile hamburger button */}
          <button
            ref={menuBtnRef}
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((v) => !v)}
            className={`md:hidden flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ${
              !scrolled && isHome
                ? 'bg-[#FAF6F0] border border-[rgba(24,23,19,0.12)] shadow-sm text-[#181713]'
                : 'bg-[rgba(24,23,19,0.06)] hover:bg-[rgba(24,23,19,0.12)] text-[#181713]'
            }`}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 top-[64px] z-40 bg-[#FAF6F0]/98 backdrop-blur-xl border-t border-[rgba(24,23,19,0.1)] animate-in fade-in slide-in-from-top-4 duration-200">
          <nav
            ref={mobileNavRef}
            id={menuId}
            aria-label="Mobile"
            className="flex flex-col px-6 py-8 space-y-4 text-[18px] font-serif"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-2.5 border-b border-[rgba(24,23,19,0.08)] text-[#181713] hover:text-[#C43C11] transition-colors flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-xs font-mono text-[#6B675F]">→</span>
              </Link>
            ))}
            <div className="pt-4">
              <Link
                href="/#contact"
                onClick={() => setOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#181713] text-[#FAF7F2] text-[15px] font-sans font-semibold tracking-wide hover:bg-[#C43C11] transition-colors shadow-sm"
              >
                <span>Start a project</span>
                <span>↗</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
