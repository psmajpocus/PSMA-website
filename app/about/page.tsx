'use client';

import { useLang } from '@/lib/LangContext';
import Link from 'next/link';

export default function AboutPage() {
  const { t } = useLang();

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-950 to-blue-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('about.title')}</h1>
          <p className="text-blue-200 text-lg">POCUS Students and Residents Medical Alliance</p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-blue-50 rounded-2xl p-8">
              <div className="w-12 h-12 bg-blue-700 rounded-xl flex items-center justify-center mb-6">
                <span className="text-white text-xl">🎯</span>
              </div>
              <h2 className="text-2xl font-bold text-blue-950 mb-4">{t('about.mission_title')}</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{t('about.mission_text')}</p>
            </div>
            <div className="bg-cyan-50 rounded-2xl p-8">
              <div className="w-12 h-12 bg-cyan-700 rounded-xl flex items-center justify-center mb-6">
                <span className="text-white text-xl">🔭</span>
              </div>
              <h2 className="text-2xl font-bold text-blue-950 mb-4">{t('about.vision_title')}</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{t('about.vision_text')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-blue-950 mb-6">{t('about.history_title')}</h2>
          <div className="w-12 h-1 bg-blue-600 mb-8 rounded-full" />
          <p className="text-gray-700 leading-relaxed text-lg mb-8">{t('about.history_text')}</p>

          <div className="flex flex-wrap gap-4">
            <div className="bg-white border border-blue-100 rounded-xl px-5 py-3 flex items-center gap-3 shadow-sm">
              <span className="text-blue-600 text-lg">📅</span>
              <span className="font-medium text-blue-950">{t('about.founding_year')}</span>
            </div>
            <div className="bg-white border border-blue-100 rounded-xl px-5 py-3 flex items-center gap-3 shadow-sm">
              <span className="text-blue-600 text-lg">📍</span>
              <span className="font-medium text-blue-950">{t('about.location')}</span>
            </div>
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
