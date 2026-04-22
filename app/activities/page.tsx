'use client';

import { useLang } from '@/lib/LangContext';
import Link from 'next/link';
import PageHero from '@/components/PageHero';

const pastActivities = [
  {
    date: '2024.11',
    title_ja: 'POCUS基礎ハンズオンセミナー（東京）',
    title_en: 'POCUS Basics Hands-On Seminar (Tokyo)',
    type_ja: 'Seminar',
    type_en: 'Seminar',
  },
  {
    date: '2024.09',
    title_ja: 'オンライン症例発表会 第1回',
    title_en: 'Online Case Presentation Session #1',
    type_ja: 'Workshop',
    type_en: 'Workshop',
  },
  {
    date: '2024.08',
    title_ja: '日本超音波医学会 学生企画参加',
    title_en: 'JSUM Annual Meeting — Student Program',
    type_ja: 'Conference',
    type_en: 'Conference',
  },
];

const activityTypes = [
  {
    num: '01',
    titleKey: 'activities.seminar_title',
    textKey: 'activities.seminar_text',
  },
  {
    num: '02',
    titleKey: 'activities.workshop_title',
    textKey: 'activities.workshop_text',
  },
  {
    num: '03',
    titleKey: 'activities.conference_title',
    textKey: 'activities.conference_text',
  },
];

export default function ActivitiesPage() {
  const { t, lang } = useLang();

  return (
    <>
      <PageHero
        label="Activities & Events"
        title={t('activities.title')}
        subtitle={t('activities.subtitle')}
      />

      {/* Activity types */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-100">
            {activityTypes.map((act) => (
              <div key={act.num} className="bg-white p-8 lg:p-10">
                <p className="text-[11px] tracking-[0.25em] text-slate-400 font-medium mb-6">
                  {act.num}
                </p>
                <h2 className="text-xl font-bold text-slate-900 mb-4">{t(act.titleKey)}</h2>
                <p className="text-slate-500 text-sm leading-relaxed">{t(act.textKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-[10px] tracking-[0.25em] uppercase text-slate-400 font-medium mb-2">
              {t('activities.upcoming_title')}
            </p>
            <div className="w-6 h-px bg-slate-900" />
          </div>
          <div className="border border-dashed border-slate-300 p-12 text-center">
            <p className="text-[10px] tracking-widest uppercase text-slate-400 mb-2">Coming soon</p>
            <p className="text-slate-500">{t('activities.upcoming_empty')}</p>
          </div>
        </div>
      </section>

      {/* Past activities */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-[10px] tracking-[0.25em] uppercase text-slate-400 font-medium mb-2">
              {t('activities.past_title')}
            </p>
            <div className="w-6 h-px bg-slate-900" />
          </div>

          <div className="divide-y divide-slate-100">
            {pastActivities.map((act) => (
              <div
                key={act.date + act.title_ja}
                className="flex items-center gap-8 py-6 group hover:bg-slate-50 -mx-4 px-4 transition-colors"
              >
                <p className="shrink-0 text-[11px] tracking-widest text-slate-400 font-mono w-20">
                  {act.date}
                </p>
                <span className="shrink-0 text-[10px] tracking-[0.15em] uppercase text-slate-400 border border-slate-200 px-2.5 py-1 font-medium w-28 text-center">
                  {lang === 'ja' ? act.type_ja : act.type_en}
                </span>
                <p className="font-medium text-slate-900 group-hover:text-blue-700 transition-colors">
                  {lang === 'ja' ? act.title_ja : act.title_en}
                </p>
              </div>
            ))}
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
