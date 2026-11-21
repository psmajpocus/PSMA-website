'use client';

import Link from 'next/link';
import { useLang } from '@/lib/LangContext';

export default function Footer() {
  const { lang } = useLang();

  const navLinks = [
    { href: '/',           label_ja: 'ホーム',     label_en: 'Home' },
    { href: '/about',      label_ja: '団体紹介',   label_en: 'About' },
    { href: '/activities', label_ja: 'イベント',   label_en: 'Events' },
    { href: '/articles',   label_ja: '特集記事',   label_en: 'Articles' },
    { href: '/members',    label_ja: 'メンバー',   label_en: 'Members' },
    { href: '/contact',    label_ja: '参加・お問い合わせ',   label_en: 'Join / Contact' },
  ];

  const socialLinks = [
    { href: '#', label: 'Instagram' },
    { href: '#', label: 'X (Twitter)' },
    { href: '#', label: 'Facebook' },
  ];

  return (
    <footer style={{ backgroundColor: '#020826' }} className="text-white">

      {/* ── Layer 2: Main Footer Content ──────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 border-b border-white/[0.07]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 lg:gap-28">

          {/* Column 1: Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/psma-logo.png"
                alt="PSMA logo"
                style={{ height: '52px', width: 'auto' }}
              />
              <p className="text-[40px] font-bold leading-snug text-white">
                PSMA
              </p>
            </div>
            <p className="text-[13px] tracking-[0.2em] uppercase text-blue-400/50 font-medium leading-relaxed mb-5">
              POCUS Students &amp;<br />Residents Medical Alliance
            </p>
            <p className="text-slate-500 text-[13px] leading-relaxed">
              {lang === 'ja'
                ? '日本ポイントオブケア超音波学会　学生・研修医部会'
                : 'Student and Resident Division of the Japanese Society of Point-of-Care Ultrasound'}
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-slate-600 font-medium mb-8">
              Navigation
            </p>
            <ul className="space-y-[14px]">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[17px] text-slate-400 hover:text-white transition-colors duration-200 font-medium"
                  >
                    {lang === 'ja' ? link.label_ja : link.label_en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Community / Contact */}
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-slate-600 font-medium mb-8">
              Community
            </p>
            <ul className="space-y-[14px]">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[17px] text-slate-400 hover:text-white transition-colors duration-200 font-medium"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-3 border-t border-white/[0.06]">
                <a
                  href="mailto:psma.jpocus@gmail.com"
                  className="text-[17px] text-slate-500 hover:text-white transition-colors duration-200"
                >
                  psma.jpocus@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Layer 3: Bottom Bar ────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-7">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <span className="text-[11px] text-slate-700 tracking-wide">
            © {new Date().getFullYear()} PSMA. All rights reserved.
          </span>
          <span className="text-[11px] text-slate-700 tracking-[0.2em] uppercase">
            Founded 2024 · Tokyo, Japan
          </span>
          <span className="text-[11px] text-slate-700 tracking-wide">
            Built by Students for Future Clinicians
          </span>
        </div>
      </div>

    </footer>
  );
}
