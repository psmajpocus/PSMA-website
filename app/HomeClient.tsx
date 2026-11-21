'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLang } from '@/lib/LangContext';
import HeroSlideshow from '@/components/HeroSlideshow';
import type { Article } from '@/lib/microcms';

const CATEGORY_LABELS: Record<string, { ja: string; en: string }> = {
  interview: { ja: 'インタビュー', en: 'Interview' },
  report:    { ja: 'レポート', en: 'Report' },
  tips:      { ja: '学習Tips',    en: 'Tips' },
  news:      { ja: 'お知らせ',    en: 'News' },
};

const features = [
  { num: '01', titleKey: 'home.feature_1_title', textKey: 'home.feature_1_text' },
  { num: '02', titleKey: 'home.feature_2_title', textKey: 'home.feature_2_text' },
  { num: '03', titleKey: 'home.feature_3_title', textKey: 'home.feature_3_text' },
];

export default function HomeClient({ articles }: { articles: Article[] }) {
  const { t, lang } = useLang();

  const title = (a: Article) => lang === 'ja' ? a.title_ja : a.title_en;
  const catLabel = (cats: Article['category']) => {
    const cat = cats[0];
    return lang === 'ja' ? (CATEGORY_LABELS[cat]?.ja ?? cat) : (CATEGORY_LABELS[cat]?.en ?? cat);
  };
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(lang === 'ja' ? 'ja-JP' : 'en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });

  return (
    <>
      {/* ── Hero Slideshow ───────────────────────────────────── */}
      <HeroSlideshow />

      {/* ── About ────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <div className="lg:col-span-3">
              <p className="text-[20px] tracking-[0.25em] uppercase text-slate-400 font-medium mb-2">
                {t('home.section_about_label')}
              </p>
              <div className="w-6 h-px bg-slate-900" />
            </div>
            <div className="lg:col-span-9">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 leading-snug mb-6">
                {t('home.about_title')}
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed max-w-2xl">{t('home.about_text')}</p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 mt-8 text-[12px] tracking-widest uppercase font-bold text-slate-900 border-b border-slate-900 pb-0.5 hover:text-slate-500 hover:border-slate-500 transition-colors"
              >
                {t('home.learn_more')} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────── */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-16">
            <p className="text-[20px] tracking-[0.25em] uppercase text-slate-400 font-medium mb-2">
              {t('home.section_features_label')}
            </p>
            <div className="w-6 h-px bg-slate-900" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {features.map((f, i) => (
              <div key={f.num}
                className={`py-10 px-8 ${i < 2 ? 'md:border-r border-slate-200' : ''} border-b md:border-b-0 border-slate-200`}>
                <p className="text-[22px] tracking-[0.25em] text-slate-400 font-medium mb-6">{f.num}</p>
                <h3 className="text-[24px] font-bold text-slate-900 mb-4">{t(f.titleKey)}</h3>
                <p className="text-slate-500 text-sm leading-relaxed whitespace-pre-line">{t(f.textKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recent Articles ───────────────────────────────────── */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-[20px] tracking-[0.25em] uppercase text-slate-400 font-medium mb-2">Articles</p>
              <div className="w-6 h-px bg-slate-900" />
            </div>
            <Link href="/articles"
              className="text-[11px] tracking-widest uppercase font-bold text-slate-500 hover:text-slate-900 transition-colors">
              {t('home.view_all')} →
            </Link>
          </div>

          {articles.length === 0 ? (
            <div className="border border-dashed border-slate-300 p-12 text-center">
              <p className="text-slate-400 text-sm">
                {lang === 'ja' ? '記事を準備中です。お楽しみに！' : 'Articles coming soon!'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-100">
              {articles.map((article) => (
                <Link key={article.id} href={`/articles/${article.id}`} className="flex flex-col h-full">
                <article
                  className="flex flex-col h-full bg-white group cursor-pointer hover:bg-slate-50 transition-colors">
                  <div className="relative w-full h-44 bg-slate-100 overflow-hidden shrink-0">
                    {article.thumbnail ? (
                      <Image
                        src={article.thumbnail.url}
                        alt={title(article)}
                        fill sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col flex-1 p-8">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-slate-400 mb-4 font-medium">
                      {catLabel(article.category)} · {formatDate(article.publishedAt)}
                    </p>
                    <h3 className="font-bold text-slate-900 text-base leading-snug mb-6 group-hover:text-blue-700 transition-colors flex-1">
                      {title(article)}
                    </h3>
                    <span className="text-[11px] tracking-widest uppercase font-bold text-slate-400 group-hover:text-slate-900 transition-colors">
                      {t('articles.read_more')} →
                    </span>
                  </div>
                </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
