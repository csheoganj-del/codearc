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
    const threshold = isHome ? 640 : 16;
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

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

  if (isHome && !scrolled) {
    return null;
  }

  return (
    <header className={`v2-nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="v2-nav-inner">
        <Logo variant="dark" onClick={() => setOpen(false)} />

        <nav className="v2-desktop-nav" aria-label="Primary">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              {link.name}
            </Link>
          ))}
        </nav>

        <a className="v2-nav-cta" href="/#contact">
          Start a project ↗
        </a>

        <button
          ref={menuBtnRef}
          className="v2-menu-btn"
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open ? (
        <nav
          ref={mobileNavRef}
          id={menuId}
          className="v2-mobile-nav"
          aria-label="Mobile"
        >
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} onClick={() => setOpen(false)}>
              {link.name}
            </Link>
          ))}
          <a
            className="v2-mobile-cta"
            href="/#contact"
            onClick={() => setOpen(false)}
          >
            Start a project ↗
          </a>
        </nav>
      ) : null}
    </header>
  );
}
