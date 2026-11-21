'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLang } from '@/lib/LangContext';
import type { Article } from '@/lib/microcms';

const CATEGORY_LABELS: Record<string, { ja: string; en: string }> = {
  interview: { ja: 'インタビュー', en: 'Interview' },
  report:    { ja: 'レポート',     en: 'Report' },
  tips:      { ja: '学習Tips',     en: 'Tips' },
  news:      { ja: 'お知らせ',     en: 'News' },
};

export default function ArticleDetailClient({ article }: { article: Article }) {
  const { lang, t } = useLang();

  const title = lang === 'ja' ? article.title_ja : article.title_en;
  const body  = lang === 'ja' ? article.body_ja  : article.body_en;
  const cat   = article.category[0];
  const catLabel = lang === 'ja'
    ? (CATEGORY_LABELS[cat]?.ja ?? cat)
    : (CATEGORY_LABELS[cat]?.en ?? cat);
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(lang === 'ja' ? 'ja-JP' : 'en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });

  return (
    <>
      {/* ヘッダー */}
      <section className="bg-slate-950 text-white pt-20 pb-16 border-b border-slate-800">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-slate-500 hover:text-slate-300 transition-colors mb-8"
          >
            ← {t('common.back')}
          </Link>
          <p className="text-[10px] tracking-[0.25em] uppercase text-slate-500 font-medium mb-4">
            {catLabel} · {formatDate(article.publishedAt)}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold leading-snug tracking-tight">
            {title}
          </h1>
        </div>
      </section>

      {/* サムネイル */}
      {article.thumbnail && (
        <div className="max-w-2xl mx-auto px-6 lg:px-8 pt-10">
          <Image
            src={article.thumbnail.url}
            alt={title}
            width={article.thumbnail.width}
            height={article.thumbnail.height}
            sizes="(max-width: 672px) 100vw, 672px"
            className="w-full h-auto rounded-sm"
            priority
          />
        </div>
      )}

      {/* 本文 */}
      <article className="max-w-2xl mx-auto px-6 lg:px-8 py-12">
        <div
          className="article-body"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </article>

      {/* 戻るリンク */}
      <div className="max-w-2xl mx-auto px-6 lg:px-8 pb-24 border-t border-slate-100 pt-8">
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 text-[11px] tracking-widest uppercase font-bold text-slate-400 hover:text-slate-900 transition-colors"
        >
          ← {lang === 'ja' ? '記事一覧へ' : 'Back to Articles'}
        </Link>
      </div>
    </>
  );
}
