'use client';

import Link from 'next/link';
import { useLang } from '@/lib/LangContext';

const sampleArticles = [
  {
    slug: 'pocus-basics-interview',
    categoryKey: 'articles.category_interview',
    title_ja: '【インタビュー】POCUS指導医が語る「医学生がエコーを学ぶべき理由」',
    title_en: '[Interview] A POCUS Educator on "Why Medical Students Should Learn Ultrasound"',
    date: '2024-11-10',
  },
  {
    slug: 'conference-report-2024',
    categoryKey: 'articles.category_report',
    title_ja: '【学会レポート】日本超音波医学会2024年総会 参加報告',
    title_en: '[Report] Japan Society of Ultrasonics in Medicine 2024 Annual Meeting',
    date: '2024-10-28',
  },
  {
    slug: 'pocus-tips-for-beginners',
    categoryKey: 'articles.category_tips',
    title_ja: '【初心者向け】POCUS学習を始める前に知っておきたい5つのこと',
    title_en: '[Tips] 5 Things to Know Before You Start Learning POCUS',
    date: '2024-09-15',
  },
];

export default function Home() {
  const { t, lang } = useLang();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-blue-400 blur-3xl" />
          <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-cyan-400 blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-blue-800/50 border border-blue-600/40 rounded-full px-4 py-1.5 text-sm text-blue-200 mb-6">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              {t('home.hero_subtitle')}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {t('home.hero_title')}
            </h1>
            <p className="text-lg md:text-xl text-blue-200 leading-relaxed mb-10 max-w-2xl">
              {t('home.hero_description')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="px-6 py-3 bg-white text-blue-900 font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
              >
                {t('home.cta_join')}
              </Link>
              <Link
                href="/about"
                className="px-6 py-3 border border-blue-400/50 text-white font-semibold rounded-xl hover:bg-blue-800/50 transition-colors"
              >
                {t('home.cta_learn')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About summary */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-blue-950 mb-4">{t('home.about_title')}</h2>
            <div className="w-12 h-1 bg-blue-600 mx-auto mb-6 rounded-full" />
            <p className="text-gray-600 text-lg leading-relaxed">{t('home.about_text')}</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-blue-950 text-center mb-12">{t('home.features_title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🔬',
                title: t('home.feature_1_title'),
                text: t('home.feature_1_text'),
              },
              {
                icon: '🤝',
                title: t('home.feature_2_title'),
                text: t('home.feature_2_text'),
              },
              {
                icon: '📖',
                title: t('home.feature_3_title'),
                text: t('home.feature_3_text'),
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-blue-950 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent articles */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-blue-950">{t('home.recent_articles')}</h2>
            <Link
              href="/articles"
              className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1"
            >
              {t('home.view_all')} →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sampleArticles.map((article) => (
              <article
                key={article.slug}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow group"
              >
                <div className="h-36 bg-gradient-to-br from-blue-100 to-cyan-50 flex items-center justify-center">
                  <span className="text-4xl opacity-50">📡</span>
                </div>
                <div className="p-5">
                  <span className="inline-block text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full mb-3">
                    {t(article.categoryKey)}
                  </span>
                  <h3 className="font-semibold text-blue-950 text-sm leading-snug mb-3 group-hover:text-blue-700 transition-colors">
                    {lang === 'ja' ? article.title_ja : article.title_en}
                  </h3>
                  <p className="text-xs text-gray-400">{article.date}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-20 bg-blue-950 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">{t('members.join_cta')}</h2>
          <p className="text-blue-200 text-lg mb-8 max-w-xl mx-auto">{t('home.hero_description')}</p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-blue-900 font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-lg text-lg"
          >
            {t('home.cta_join')} →
          </Link>
        </div>
      </section>
    </>
  );
}
