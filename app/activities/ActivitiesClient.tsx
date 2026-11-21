'use client';

import Link from 'next/link';
import { useLang } from '@/lib/LangContext';
import PageHero from '@/components/PageHero';
import type { Event } from '@/lib/microcms';

const TYPE_LABELS: Record<string, { ja: string; en: string }> = {
  seminar:    { ja: 'Seminar',    en: 'Seminar' },
  workshop:   { ja: 'Workshop',   en: 'Workshop' },
  conference: { ja: 'Conference', en: 'Conference' },
  other:      { ja: 'Other',      en: 'Other' },
};

const activities = [
  {
    num: '01',
    labelKey: 'activities.act_1_label',
    titleKey: 'activities.act_1_title',
    bodyKeys: ['activities.act_1_body_1', 'activities.act_1_body_2', 'activities.act_1_body_3'],
  },
  {
    num: '02',
    labelKey: 'activities.act_2_label',
    titleKey: 'activities.act_2_title',
    bodyKeys: ['activities.act_2_body_1', 'activities.act_2_body_2', 'activities.act_2_body_3'],
  },
  {
    num: '03',
    labelKey: 'activities.act_3_label',
    titleKey: 'activities.act_3_title',
    bodyKeys: ['activities.act_3_body_1', 'activities.act_3_body_2', 'activities.act_3_body_3'],
  },
];

export default function ActivitiesClient({
  upcoming,
  past,
}: {
  upcoming: Event[];
  past: Event[];
}) {
  const { t, lang } = useLang();

  const title = (e: Event) => lang === 'ja' ? e.title_ja : e.title_en;
  const typeLabel = (types: Event['type']) => {
    const type = types[0];
    return lang === 'ja' ? (TYPE_LABELS[type]?.ja ?? type) : (TYPE_LABELS[type]?.en ?? type);
  };
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(lang === 'ja' ? 'ja-JP' : 'en-US', {
      year: 'numeric', month: 'short',
    });

  return (
    <>
      <PageHero
        label="OUR ACTIVITIES"
        title={t('activities.title')}
        subtitle={t('activities.subtitle')}
      />

      {/* 直近イベント */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-[17px] tracking-[0.25em] uppercase text-slate-400 font-medium mb-2">
              {t('activities.upcoming_title')}
            </p>
            <div className="w-6 h-px bg-slate-900" />
          </div>
          {upcoming.length === 0 ? (
            <div className="border border-dashed border-slate-300 p-12 text-center">
              <p className="text-[10px] tracking-widest uppercase text-slate-400 mb-2">Coming soon</p>
              <p className="text-slate-500">{t('activities.upcoming_empty')}</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {upcoming.map((event) => (
                <Link key={event.id} href={`/activities/${event.id}`} className="block">
                  <div className="flex items-center gap-8 py-6 group hover:bg-slate-50 -mx-4 px-4 transition-colors">
                    <p className="shrink-0 text-[13px] tracking-widest text-slate-400 font-mono w-20">
                      {formatDate(event.date)}
                    </p>
                    <span className="shrink-0 text-[12px] tracking-[0.15em] uppercase text-blue-600 border border-blue-200 bg-blue-50 px-2.5 py-1 font-medium w-28 flex items-center justify-center">
                      {typeLabel(event.type)}
                    </span>
                    <p className="text-[21px] font-medium text-slate-900 group-hover:text-blue-700 transition-colors">
                      {title(event)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 過去の活動 */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-[17px] tracking-[0.25em] uppercase text-slate-400 font-medium mb-2">
              {t('activities.past_title')}
            </p>
            <div className="w-6 h-px bg-slate-900" />
          </div>
          {past.length === 0 ? (
            <p className="text-slate-400 text-sm">
              {lang === 'ja' ? '活動記録はまだありません。' : 'No past activities yet.'}
            </p>
          ) : (
            <div className="divide-y divide-slate-100">
              {past.map((event) => (
                <Link key={event.id} href={`/activities/${event.id}`} className="block">
                  <div className="flex items-center gap-8 py-6 group hover:bg-white -mx-4 px-4 transition-colors">
                    <p className="shrink-0 text-[13px] tracking-widest text-slate-400 font-mono w-20">
                      {formatDate(event.date)}
                    </p>
                    <span className="shrink-0 text-[12px] tracking-[0.15em] uppercase text-slate-400 border border-slate-200 px-2.5 py-1 font-medium w-28 flex items-center justify-center">
                      {typeLabel(event.type)}
                    </span>
                    <p className="text-[21px] font-medium text-slate-900 group-hover:text-blue-700 transition-colors">
                      {title(event)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 活動内容：LEARN / SHARE / CONNECT */}
      <section className="bg-white py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-5">
            <p className="text-[17px] tracking-[0.3em] uppercase text-slate-400 font-medium mb-2">
              {lang === 'ja' ? '活動内容' : 'What We Do'}
            </p>
            <div className="w-6 h-px bg-slate-900" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-100">
            {activities.map((act) => (
              <div key={act.num} className="bg-white p-10 lg:p-12">
                <p className="text-[11px] tracking-[0.3em] uppercase text-slate-400 font-medium mb-1">
                  {act.num}
                </p>
                <p className="text-[17px] tracking-[0.3em] uppercase text-slate-900 font-bold mb-3">
                  {t(act.labelKey)}
                </p>
                <div className="w-6 h-px bg-slate-900 mb-8" />
                <h2 className="text-xl font-bold text-slate-900 mb-6">
                  {t(act.titleKey)}
                </h2>
                <div className="space-y-4">
                  {act.bodyKeys.map((key) => t(key) ? (
                    <p key={key} className="text-slate-500 text-sm leading-relaxed">
                      {t(key)}
                    </p>
                  ) : null)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
