'use client';

import { useLang } from '@/lib/LangContext';
import PageHero from '@/components/PageHero';

export default function AboutPage() {
  const { t } = useLang();

  const promises = [
    {
      label: t('about.promise_1_label'),
      statement: t('about.promise_1_statement'),
      body: t('about.promise_1_body'),
    },
    {
      label: t('about.promise_2_label'),
      statement: t('about.promise_2_statement'),
      body: t('about.promise_2_body'),
    },
    {
      label: t('about.promise_3_label'),
      statement: t('about.promise_3_statement'),
      body: t('about.promise_3_body'),
    },
  ];

  return (
    <>
      <PageHero
        label="About PSMA"
        title={t('about.title')}
        subtitle="POCUS Students and Residents Medical Alliance"
      />

      {/* ── MISSION (白) ────────────────────────────────────── */}
      <section className="bg-white py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-3">
              <p className="text-[17px] tracking-[0.3em] uppercase text-slate-400 font-medium mb-2">
                {t('about.mission_title')}
              </p>
              <div className="w-6 h-px bg-slate-900" />
            </div>
            <div className="lg:col-span-9">
              <p className="text-[20px] tracking-[0.2em] uppercase text-slate-400 font-medium mb-10">
                {t('about.mission_subtitle')}
              </p>
              <p className="text-2xl lg:text-3xl text-slate-900 font-medium leading-relaxed mb-14">
                {t('about.mission_statement')}
              </p>
              <div className="space-y-4 border-l border-slate-200 pl-6">
                <p className="text-slate-500 text-base">{t('about.mission_tagline_1')}</p>
                <p className="text-slate-500 text-base">{t('about.mission_tagline_2')}</p>
                <p className="text-slate-500 text-base">{t('about.mission_tagline_3')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VISION (slate-50) ───────────────────────────────── */}
      <section className="bg-slate-50 py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-3">
              <p className="text-[17px] tracking-[0.3em] uppercase text-slate-400 font-medium mb-2">
                {t('about.vision_title')}
              </p>
              <div className="w-6 h-px bg-slate-900" />
            </div>
            <div className="lg:col-span-9">
              <p className="text-[20px] tracking-[0.2em] uppercase text-slate-400 font-medium mb-10">
                {t('about.vision_subtitle')}
              </p>
              <p className="text-2xl lg:text-3xl text-slate-900 font-bold leading-relaxed mb-12">
                {t('about.vision_statement')}
              </p>
              <div className="space-y-6 max-w-2xl">
                <p className="text-slate-600 text-base leading-relaxed">{t('about.vision_body_1')}</p>
                <p className="text-slate-600 text-base leading-relaxed">{t('about.vision_body_2')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROMISES (白) ───────────────────────────────────── */}
      <section className="bg-white py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16">
            <div className="lg:col-span-3">
              <p className="text-[17px] tracking-[0.3em] uppercase text-slate-400 font-medium mb-2">
                {t('about.promises_title')}
              </p>
              <div className="w-6 h-px bg-slate-900" />
            </div>
            <div className="lg:col-span-9">
              <p className="text-[20px] tracking-[0.2em] uppercase text-slate-400 font-medium">
                {t('about.promises_subtitle')}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-100">
            {promises.map((p) => (
              <div key={p.label} className="bg-slate-50 p-10 lg:p-12">
                <p className="text-[17px] tracking-[0.3em] uppercase text-slate-400 font-medium mb-8">
                  {p.label}
                </p>
                <p className="text-xl font-bold text-slate-900 leading-snug mb-5">
                  {p.statement}
                </p>
                <p className="text-slate-500 text-sm leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Story (slate-50) ────────────────────────────────── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-3">
              <p className="text-[20px] tracking-[0.25em] uppercase text-slate-400 font-medium mb-2">
                {t('about.history_title')}
              </p>
              <div className="w-6 h-px bg-slate-900" />
            </div>
            <div className="lg:col-span-7">
              <p className="text-slate-600 text-lg leading-relaxed mb-10">
                {t('about.history_text')}
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: t('about.stat_founded_label'), value: t('about.stat_founded_value') },
                  { label: t('about.stat_open_label'), value: t('about.stat_open_value') },
                  { label: t('about.stat_universities_label'), value: t('about.stat_universities_value') },
                ].map((item) => (
                  <div key={item.label} className="border border-slate-200 px-5 py-3 bg-white">
                    <p className="text-[10px] tracking-widest uppercase text-slate-400 mb-1">{item.label}</p>
                    <p className="text-sm font-bold text-slate-900">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
