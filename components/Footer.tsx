'use client';

import Link from 'next/link';
import { useLang } from '@/lib/LangContext';

export default function Footer() {
  const { t } = useLang();

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/activities', label: t('nav.activities') },
    { href: '/articles', label: t('nav.articles') },
    { href: '/members', label: t('nav.members') },
    { href: '/contact', label: t('nav.contact') },
  ];

  return (
    <footer className="bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between gap-12 pb-12 border-b border-slate-800">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[11px] font-bold tracking-[0.2em] text-white bg-slate-700 px-2 py-1">
                PSMA
              </span>
            </div>
            <p className="text-[12px] text-slate-400 leading-relaxed tracking-wide uppercase">
              POCUS Students and<br />Residents Medical Alliance
            </p>
            <p className="text-[12px] text-slate-500 mt-3 leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-slate-500 mb-5 font-medium">
              {t('footer.links_title')}
            </p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[12px] tracking-widest uppercase text-slate-400 hover:text-white transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-slate-500 mb-5 font-medium">
              {t('footer.contact_title')}
            </p>
            <a
              href="mailto:moriyankoyuto0430@gmail.com"
              className="text-[12px] text-slate-400 hover:text-white transition-colors"
            >
              moriyankoyuto0430@gmail.com
            </a>
            <div className="mt-4">
              <Link
                href="/contact"
                className="inline-block text-[11px] tracking-widest uppercase font-medium border border-slate-700 hover:border-white text-slate-400 hover:text-white px-4 py-2 transition-colors"
              >
                {t('nav.contact')} →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-8">
          <p className="text-[11px] text-slate-600 tracking-wide">
            © {new Date().getFullYear()} PSMA. {t('footer.rights')}
          </p>
          <p className="text-[11px] text-slate-600 tracking-widest uppercase">
            Founded 2024 · Tokyo, Japan
          </p>
        </div>
      </div>
    </footer>
  );
}
