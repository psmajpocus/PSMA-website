'use client';

import Link from 'next/link';
import { useLang } from '@/lib/LangContext';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-blue-950 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="font-bold text-xl">PSMA</span>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">
              POCUS Students and Residents Medical Alliance
            </p>
            <p className="text-blue-300 text-sm mt-2">{t('footer.description')}</p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-blue-100 mb-4">{t('footer.links_title')}</h3>
            <ul className="space-y-2">
              {[
                { href: '/', label: t('nav.home') },
                { href: '/about', label: t('nav.about') },
                { href: '/activities', label: t('nav.activities') },
                { href: '/articles', label: t('nav.articles') },
                { href: '/members', label: t('nav.members') },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-blue-300 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-blue-100 mb-4">{t('footer.contact_title')}</h3>
            <Link
              href="/contact"
              className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium transition-colors"
            >
              {t('nav.contact')}
            </Link>
          </div>
        </div>

        <div className="border-t border-blue-900 mt-8 pt-6 text-center">
          <p className="text-blue-400 text-sm">
            © {new Date().getFullYear()} PSMA — POCUS Students and Residents Medical Alliance. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
