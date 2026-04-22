'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLang } from '@/lib/LangContext';

export default function Navbar() {
  const { t, toggleLang, lang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '/about', label: t('nav.about') },
    { href: '/activities', label: t('nav.activities') },
    { href: '/articles', label: t('nav.articles') },
    { href: '/members', label: t('nav.members') },
    { href: '/contact', label: t('nav.contact') },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <span className="text-[11px] font-bold tracking-[0.2em] text-white bg-slate-900 px-2 py-1">
              PSMA
            </span>
            <span className="hidden sm:block text-[11px] tracking-widest text-slate-400 font-medium uppercase">
              POCUS Medical Alliance
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[12px] tracking-widest uppercase text-slate-500 hover:text-slate-900 transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Lang toggle + mobile */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLang}
              className="text-[11px] tracking-widest uppercase text-slate-400 hover:text-slate-900 transition-colors font-medium"
            >
              {lang === 'ja' ? 'EN' : 'JP'}
            </button>
            <button
              className="md:hidden text-slate-500 hover:text-slate-900 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-3 text-[12px] tracking-widest uppercase text-slate-500 hover:text-slate-900 transition-colors font-medium"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
