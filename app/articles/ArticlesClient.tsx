'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLang } from '@/lib/LangContext';
import PageHero from '@/components/PageHero';
import type { Article } from '@/lib/microcms';

const CATEGORY_LABELS: Record<string, { ja: string; en: string }> = {
  interview: { ja: 'インタビュー', en: 'Interview' },
  report:    { ja: 'レポート', en: 'Report' },
  tips:      { ja: '学習Tips',    en: 'Tips' },
  news:      { ja: 'お知らせ',    en: 'News' },
};

const CATEGORIES = [
  { key: 'all', ja: 'すべて', en: 'All' },
  { key: 'interview', ja: 'インタビュー', en: 'Interview' },
  { key: 'report',    ja: 'レポート', en: 'Report' },
  { key: 'tips',      ja: '学習Tips',    en: 'Tips' },
  { key: 'news',      ja: 'お知らせ',    en: 'News' },
];

function ThumbnailPlaceholder({ size = 'lg' }: { size?: 'lg' | 'sm' }) {
  return (
    <div className="w-full h-full flex items-center justify-center text-slate-300">
      <svg xmlns="http://www.w3.org/2000/svg"
        className={size === 'lg' ? 'w-16 h-16' : 'w-10 h-10'}
        fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
  );
}

export default function ArticlesClient({ articles }: { articles: Article[] }) {
  const { t, lang } = useLang();
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? articles
    : articles.filter((a) => a.category.includes(activeCategory as Article['category'][number]));

  const title = (a: Article) => lang === 'ja' ? a.title_ja : a.title_en;
  const excerpt = (a: Article) => lang === 'ja' ? a.excerpt_ja : a.excerpt_en;
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
      <PageHero
        label="Articles"
        title={t('articles.title')}
        subtitle={t('articles.subtitle')}
      />

      {/* カテゴリタブ */}
      <div className="bg-white border-b border-slate-100 sticky top-14 z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-6 overflow-x-auto py-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`shrink-0 text-[14px] tracking-widest uppercase font-medium pb-1 transition-colors border-b-2 ${
                  activeCategory === cat.key
                    ? 'text-slate-900 border-slate-900'
                    : 'text-slate-400 hover:text-slate-700 border-transparent'
                }`}
              >
                {lang === 'ja' ? cat.ja : cat.en}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 記事一覧 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="border border-dashed border-slate-300 p-16 text-center">
              <p className="text-[10px] tracking-widest uppercase text-slate-400 mb-2">No articles</p>
              <p className="text-slate-500">{t('articles.coming_soon')}</p>
            </div>
          ) : (
            <>
              {/* 先頭記事（大きく表示） */}
              <Link href={`/articles/${filtered[0].id}`} className="block mb-2">
              <article className="group cursor-pointer">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-slate-100">
                  <div className="lg:col-span-7 relative min-h-[240px] bg-slate-100 overflow-hidden">
                    {filtered[0].thumbnail ? (
                      <Image
                        src={filtered[0].thumbnail.url}
                        alt={title(filtered[0])}
                        fill sizes="(max-width: 1024px) 100vw, 58vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : <ThumbnailPlaceholder size="lg" />}
                  </div>
                  <div className="lg:col-span-5 bg-white p-8 lg:p-10 flex flex-col justify-between">
                    <div>
                      <p className="text-[10px] tracking-[0.2em] uppercase text-slate-400 mb-4 font-medium">
                        {catLabel(filtered[0].category)} · {formatDate(filtered[0].publishedAt)}
                      </p>
                      <h2 className="font-bold text-slate-900 text-xl lg:text-2xl leading-snug mb-4 group-hover:text-blue-700 transition-colors truncate">
                        {title(filtered[0])}
                      </h2>
                      <p className="text-sm text-slate-500 leading-relaxed">{excerpt(filtered[0])}</p>
                    </div>
                    <span className="inline-flex items-center gap-2 mt-6 text-[11px] tracking-widest uppercase font-bold text-slate-400 group-hover:text-slate-900 transition-colors">
                      {t('articles.read_more')} →
                    </span>
                  </div>
                </div>
              </article>
              </Link>

              {/* 残りの記事グリッド */}
              {filtered.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-100 mt-px">
                  {filtered.slice(1).map((article) => (
                    <Link key={article.id} href={`/articles/${article.id}`} className="flex flex-col h-full">
                    <article
                      className="flex flex-col h-full bg-white group cursor-pointer hover:bg-slate-50 transition-colors">
                      <div className="relative w-full h-40 bg-slate-100 overflow-hidden shrink-0">
                        {article.thumbnail ? (
                          <Image
                            src={article.thumbnail.url}
                            alt={title(article)}
                            fill sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : <ThumbnailPlaceholder size="sm" />}
                      </div>
                      <div className="flex flex-col flex-1 p-8">
                        <p className="text-[10px] tracking-[0.2em] uppercase text-slate-400 mb-4 font-medium">
                          {catLabel(article.category)} · {formatDate(article.publishedAt)}
                        </p>
                        <h3 className="font-bold text-slate-900 text-base leading-snug mb-4 group-hover:text-blue-700 transition-colors truncate">
                          {title(article)}
                        </h3>
                        <p className="text-sm text-slate-500 leading-relaxed flex-1">{excerpt(article)}</p>
                        <span className="mt-6 text-[11px] tracking-widest uppercase font-bold text-slate-400 group-hover:text-slate-900 transition-colors">
                          {t('articles.read_more')} →
                        </span>
                      </div>
                    </article>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
