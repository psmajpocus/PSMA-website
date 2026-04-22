'use client';

import Link from 'next/link';
import { useLang } from '@/lib/LangContext';

const sampleArticles = [
  {
    slug: 'pocus-basics-interview',
    categoryKey: 'articles.category_interview',
    title_ja: 'POCUS指導医が語る「医学生がエコーを学ぶべき理由」',
    title_en: 'A POCUS Educator on Why Medical Students Should Learn Ultrasound',
    date: '2024.11.10',
  },
  {
    slug: 'conference-report-2024',
    categoryKey: 'articles.category_report',
    title_ja: '日本超音波医学会2024年総会 参加報告',
    title_en: 'JSUM 2024 Annual Meeting — Participation Report',
    date: '2024.10.28',
  },
  {
    slug: 'pocus-tips-for-beginners',
    categoryKey: 'articles.category_tips',
    title_ja: 'POCUS学習を始める前に知っておきたい5つのこと',
    title_en: '5 Things to Know Before You Start Learning POCUS',
    date: '2024.09.15',
  },
];

const features = [
  {
    num: '01',
    titleKey: 'home.feature_1_title',
    textKey: 'home.feature_1_text',
  },
  {
    num: '02',
    titleKey: 'home.feature_2_title',
    textKey: 'home.feature_2_text',
  },
  {
    num: '03',
    titleKey: 'home.feature_3_title',
    textKey: 'home.feature_3_text',
  },
];

export default function Home() {
  const { t, lang } = useLang();

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative bg-slate-950 text-white min-h-[90vh] flex flex-col justify-end overflow-hidden">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, #fff 0 1px, transparent 1px 60px), repeating-linear-gradient(90deg, #fff 0 1px, transparent 1px 60px)',
          }}
        />

        {/* Top label */}
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full pt-24">
          <p className="text-[10px] tracking-[0.3em] uppercase text-slate-500 font-medium mb-8">
            POCUS Students and Residents Medical Alliance — Est. 2024
          </p>
        </div>

        {/* Main heading */}
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full pb-20">
          <h1 className="text-6xl sm:text-7xl lg:text-[96px] font-bold leading-[1.0] tracking-tight mb-10">
            {lang === 'ja' ? (
              <>
                POCUSで、<br />
                <span className="text-slate-300">医学生をつなぐ。</span>
              </>
            ) : (
              <>
                Connecting<br />
                <span className="text-slate-300">Medical Students</span><br />
                Through POCUS.
              </>
            )}
          </h1>

          <p className="text-slate-400 text-base lg:text-lg max-w-xl leading-relaxed mb-12">
            {t('home.hero_description')}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-slate-900 text-[12px] tracking-widest uppercase font-bold px-6 py-3.5 hover:bg-slate-100 transition-colors"
            >
              {t('home.cta_join')} →
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-slate-700 text-slate-300 text-[12px] tracking-widest uppercase font-bold px-6 py-3.5 hover:border-slate-400 hover:text-white transition-colors"
            >
              {t('home.cta_learn')}
            </Link>
          </div>
        </div>

        {/* Bottom divider */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-800" />
      </section>

      {/* ── About strip ─────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <div className="lg:col-span-3">
              <p className="text-[10px] tracking-[0.25em] uppercase text-slate-400 font-medium mb-2">
                About
              </p>
              <div className="w-6 h-px bg-slate-900" />
            </div>
            <div className="lg:col-span-9">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 leading-snug mb-6">
                {t('home.about_title')}
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed max-w-2xl">
                {t('home.about_text')}
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 mt-8 text-[12px] tracking-widest uppercase font-bold text-slate-900 border-b border-slate-900 pb-0.5 hover:text-slate-500 hover:border-slate-500 transition-colors"
              >
                {lang === 'ja' ? '詳しく見る' : 'Learn more'} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-16">
            <p className="text-[10px] tracking-[0.25em] uppercase text-slate-400 font-medium mb-2">
              What we offer
            </p>
            <div className="w-6 h-px bg-slate-900" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {features.map((f, i) => (
              <div
                key={f.num}
                className={`py-10 px-8 ${i < 2 ? 'md:border-r border-slate-200' : ''} border-b md:border-b-0 border-slate-200`}
              >
                <p className="text-[11px] tracking-[0.25em] text-slate-400 font-medium mb-6">
                  {f.num}
                </p>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{t(f.titleKey)}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{t(f.textKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recent articles ──────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-slate-400 font-medium mb-2">
                Articles
              </p>
              <div className="w-6 h-px bg-slate-900" />
            </div>
            <Link
              href="/articles"
              className="text-[11px] tracking-widest uppercase font-bold text-slate-500 hover:text-slate-900 transition-colors"
            >
              {t('home.view_all')} →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-100">
            {sampleArticles.map((article) => (
              <article
                key={article.slug}
                className="bg-white p-8 group cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <p className="text-[10px] tracking-[0.2em] uppercase text-slate-400 mb-4 font-medium">
                  {t(article.categoryKey)} · {article.date}
                </p>
                <h3 className="font-bold text-slate-900 text-base leading-snug mb-6 group-hover:text-blue-700 transition-colors">
                  {lang === 'ja' ? article.title_ja : article.title_en}
                </h3>
                <span className="text-[11px] tracking-widest uppercase font-bold text-slate-400 group-hover:text-slate-900 transition-colors">
                  {t('articles.read_more')} →
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8">
              <p className="text-[10px] tracking-[0.25em] uppercase text-slate-500 font-medium mb-6">
                Join PSMA
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-white">
                {t('members.join_cta')}
              </h2>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-slate-900 text-[12px] tracking-widest uppercase font-bold px-8 py-4 hover:bg-slate-100 transition-colors"
              >
                {t('home.cta_join')} →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
