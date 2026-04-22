'use client';

import { useLang } from '@/lib/LangContext';
import Link from 'next/link';

const activities = [
  { icon: '🔬', titleKey: 'activities.seminar_title', textKey: 'activities.seminar_text' },
  { icon: '💻', titleKey: 'activities.workshop_title', textKey: 'activities.workshop_text' },
  { icon: '📋', titleKey: 'activities.conference_title', textKey: 'activities.conference_text' },
];

const pastActivities = [
  {
    date: '2024-11',
    title_ja: 'POCUS基礎ハンズオンセミナー（東京）',
    title_en: 'POCUS Basics Hands-On Seminar (Tokyo)',
    type_ja: 'セミナー',
    type_en: 'Seminar',
  },
  {
    date: '2024-09',
    title_ja: 'オンライン症例発表会 第1回',
    title_en: 'Online Case Presentation Session #1',
    type_ja: 'ワークショップ',
    type_en: 'Workshop',
  },
  {
    date: '2024-08',
    title_ja: '日本超音波医学会 学生企画参加',
    title_en: 'JSUM Annual Meeting — Student Program Participation',
    type_ja: '学会',
    type_en: 'Conference',
  },
];

export default function ActivitiesPage() {
  const { t, lang } = useLang();

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-950 to-blue-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('activities.title')}</h1>
          <p className="text-blue-200 text-lg">{t('activities.subtitle')}</p>
        </div>
      </section>

      {/* Activity types */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activities.map((act) => (
              <div
                key={act.titleKey}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="text-4xl mb-5">{act.icon}</div>
                <h2 className="text-xl font-bold text-blue-950 mb-3">{t(act.titleKey)}</h2>
                <p className="text-gray-600 leading-relaxed">{t(act.textKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-blue-950 mb-8">{t('activities.upcoming_title')}</h2>
          <div className="bg-white rounded-2xl p-8 border border-blue-100 text-center">
            <span className="text-5xl mb-4 block">📅</span>
            <p className="text-gray-500 text-lg">{t('activities.upcoming_empty')}</p>
          </div>
        </div>
      </section>

      {/* Past activities */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-blue-950 mb-8">{t('activities.past_title')}</h2>
          <div className="space-y-4">
            {pastActivities.map((act) => (
              <div
                key={act.date + act.title_ja}
                className="flex items-start gap-5 bg-gray-50 rounded-xl p-5 border border-gray-100 hover:border-blue-200 transition-colors"
              >
                <div className="shrink-0 bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-lg">
                  {act.date}
                </div>
                <div className="flex-1">
                  <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded-full mr-2">
                    {lang === 'ja' ? act.type_ja : act.type_en}
                  </span>
                  <p className="mt-1 font-medium text-blue-950">
                    {lang === 'ja' ? act.title_ja : act.title_en}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-950 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xl font-semibold">{t('members.join_cta')}</p>
          <Link
            href="/contact"
            className="px-6 py-3 bg-white text-blue-900 font-semibold rounded-xl hover:bg-blue-50 transition-colors shrink-0"
          >
            {t('members.join_button')}
          </Link>
        </div>
      </section>
    </>
  );
}
