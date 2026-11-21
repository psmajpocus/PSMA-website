'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLang } from '@/lib/LangContext';
import type { Event } from '@/lib/microcms';

const TYPE_LABELS: Record<string, { ja: string; en: string }> = {
  seminar:    { ja: 'Seminar',    en: 'Seminar' },
  workshop:   { ja: 'Workshop',   en: 'Workshop' },
  conference: { ja: 'Conference', en: 'Conference' },
  other:      { ja: 'Other',      en: 'Other' },
};

export default function EventDetailClient({ event }: { event: Event }) {
  const { lang, t } = useLang();

  const title = lang === 'ja' ? event.title_ja : event.title_en;
  const description = lang === 'ja' ? event.description_ja : event.description_en;
  const type = event.type[0];
  const typeLabel = lang === 'ja' ? (TYPE_LABELS[type]?.ja ?? type) : (TYPE_LABELS[type]?.en ?? type);
  const isUpcoming = event.status.includes('upcoming');

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
            href="/activities"
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-slate-500 hover:text-slate-300 transition-colors mb-8"
          >
            ← {t('common.back')}
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-[11px] tracking-[0.15em] uppercase font-medium px-2.5 py-1 border ${
              isUpcoming
                ? 'text-blue-400 border-blue-800 bg-blue-950'
                : 'text-slate-400 border-slate-700'
            }`}>
              {typeLabel}
            </span>
            <span className={`text-[11px] tracking-[0.15em] uppercase font-medium px-2.5 py-1 border ${
              isUpcoming
                ? 'text-emerald-400 border-emerald-800 bg-emerald-950'
                : 'text-slate-400 border-slate-700'
            }`}>
              {isUpcoming ? (lang === 'ja' ? '開催予定' : 'Upcoming') : (lang === 'ja' ? '終了' : 'Past')}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold leading-snug tracking-tight mb-4">
            {title}
          </h1>
          <p className="text-slate-400 text-sm tracking-widest font-mono">
            {formatDate(event.date)}
          </p>
        </div>
      </section>

      {/* サムネイル（ポスターなど） */}
      {event.thumbnail && (
        <div className="max-w-2xl mx-auto px-6 lg:px-8 pt-10">
          <Image
            src={event.thumbnail.url}
            alt={title}
            width={event.thumbnail.width}
            height={event.thumbnail.height}
            sizes="(max-width: 672px) 100vw, 672px"
            className="w-full h-auto rounded-sm"
            priority
          />
        </div>
      )}

      {/* 詳細 */}
      <section className="max-w-2xl mx-auto px-6 lg:px-8 py-16">
        {description ? (
          <div className="article-body whitespace-pre-wrap">
            {description}
          </div>
        ) : (
          <p className="text-slate-400 text-sm">
            {lang === 'ja' ? '詳細情報はありません。' : 'No details available.'}
          </p>
        )}
      </section>

      {/* 戻るリンク */}
      <div className="max-w-2xl mx-auto px-6 lg:px-8 pb-24 border-t border-slate-100 pt-8">
        <Link
          href="/activities"
          className="inline-flex items-center gap-2 text-[11px] tracking-widest uppercase font-bold text-slate-400 hover:text-slate-900 transition-colors"
        >
          ← {lang === 'ja' ? 'イベント一覧へ' : 'Back to Activities'}
        </Link>
      </div>
    </>
  );
}
