'use client';

import { useLang } from '@/lib/LangContext';
import Link from 'next/link';
import PageHero from '@/components/PageHero';

export default function AboutPage() {
  const { t, lang } = useLang();

  return (
    <>
      <PageHero
        label="About PSMA"
        title={t('about.title')}
        subtitle="POCUS Students and Residents Medical Alliance"
      />

      {/* Mission & Vision */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-slate-100">
            <div className="bg-white p-10 lg:p-14">
              <p className="text-[10px] tracking-[0.25em] uppercase text-slate-400 font-medium mb-6">
                01 — {t('about.mission_title')}
              </p>
              <p className="text-xl lg:text-2xl text-slate-900 leading-relaxed font-medium">
                {t('about.mission_text')}
              </p>
            </div>
            <div className="bg-white p-10 lg:p-14">
              <p className="text-[10px] tracking-[0.25em] uppercase text-slate-400 font-medium mb-6">
                02 — {t('about.vision_title')}
              </p>
              <p className="text-xl lg:text-2xl text-slate-900 leading-relaxed font-medium">
                {t('about.vision_text')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-3">
              <p className="text-[10px] tracking-[0.25em] uppercase text-slate-400 font-medium mb-2">
                {t('about.history_title')}
              </p>
              <div className="w-6 h-px bg-slate-900" />
            </div>
            <div className="lg:col-span-7">
              <p className="text-slate-600 text-lg leading-relaxed mb-10">
                {t('about.history_text')}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="border border-slate-200 px-5 py-3">
                  <p className="text-[10px] tracking-widest uppercase text-slate-400 mb-1">Founded</p>
                  <p className="text-sm font-bold text-slate-900">{t('about.founding_year')}</p>
                </div>
                <div className="border border-slate-200 px-5 py-3">
                  <p className="text-[10px] tracking-widest uppercase text-slate-400 mb-1">Location</p>
                  <p className="text-sm font-bold text-slate-900">{t('about.location')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <p className="text-2xl font-bold">{t('members.join_cta')}</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-slate-900 text-[12px] tracking-widest uppercase font-bold px-6 py-3.5 hover:bg-slate-100 transition-colors shrink-0"
          >
            {t('members.join_button')} →
          </Link>
        </div>
      </section>
    </>
  );
}
