'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLang } from '@/lib/LangContext';

/*
  実際の写真が用意できたら:
  1. /public/images/ に画像ファイルを置く（例: seminar.jpg）
  2. 各スライドの imageSrc に '/images/seminar.jpg' を設定する
  3. gradient プロパティは不要になる（削除可）
*/
const slides = [
  {
    imageSrc: '/images/slide-hands-on-v2.jpg',
    gradient: 'from-slate-800 via-blue-900 to-slate-900',
    label_ja: 'ハンズオンセミナー',
    label_en: 'Hands-On Seminar',
    desc_ja: 'プローブを手に、実践で学ぶ POCUS',
    desc_en: 'Hands-on POCUS training with real probes',
  },
  {
    imageSrc: '/images/slide-online.jpg',
    gradient: 'from-blue-950 via-cyan-900 to-blue-900',
    label_ja: 'オンライン勉強会',
    label_en: 'Online Study Sessions',
    desc_ja: '全国の医学生とオンラインでつながる',
    desc_en: 'Connecting medical students nationwide',
  },
  {
    imageSrc: '/images/slide-conference.jpg',
    gradient: 'from-slate-900 via-slate-700 to-blue-950',
    label_ja: '学会・カンファレンス参加',
    label_en: 'Conferences & Events',
    desc_ja: 'POCUS最前線の知識を現場で',
    desc_en: 'At the frontline of POCUS education',
  },
  {
    imageSrc: '/images/slide-exchange.jpg',
    gradient: 'from-cyan-950 via-blue-900 to-slate-800',
    label_ja: '大学間交流',
    label_en: 'Inter-University Exchange',
    desc_ja: '大学の壁を越えたコミュニティ',
    desc_en: 'A community beyond university borders',
  },
  {
    imageSrc: '/images/slide-spl.jpg',
    gradient: 'from-slate-900 via-blue-950 to-slate-800',
    label_ja: 'Student POCUS Leagueの運営',
    label_en: 'Student POCUS League',
    desc_ja: '日本唯一、最大規模の全国学生エコー大会',
    desc_en: 'Japan\'s only and largest national student POCUS competition',
  },
];

export default function HeroSlideshow() {
  const { t, lang } = useLang();
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="flex flex-col md:flex-row w-full min-h-[72vh] shadow-[0_8px_32px_rgba(0,0,0,0.10)] relative z-10">

      {/* ── 左パネル: テキスト ─────────────────────── */}
      <div className="md:w-[38%] bg-white flex flex-col justify-center items-center text-center px-10 lg:px-16 py-16 md:py-0 border-r border-gray-100">
        <p className="text-[10px] tracking-[0.3em] uppercase text-slate-400 font-medium mb-8">
          POCUS Students and Residents Medical Alliance
        </p>

        <h1 className="text-[2.4rem] md:text-[2rem] lg:text-[3.25rem] font-bold text-slate-900 leading-[1.15] tracking-tight mb-6 break-words">
          {lang === 'ja' ? (
            <>POCUSで<br />未来の医療者をつなぐ</>
          ) : (
            <>Connecting<br />Future Healthcare<br />Professionals.</>
          )}
        </h1>

        <p className="text-slate-500 text-sm leading-relaxed mb-10 max-w-[348px]">
          {t('home.hero_description_1')}<br />
          {t('home.hero_description_1b')}<br />
          {t('home.hero_description_2')}<br />
          {t('home.hero_description_2b')}
        </p>

        <div className="flex flex-col gap-3 w-full max-w-[220px]">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white text-[17px] tracking-widest uppercase font-bold px-6 py-3.5 hover:bg-slate-700 transition-colors"
          >
            {t('home.cta_join')}
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center gap-2 border border-slate-200 text-slate-500 text-[17px] tracking-widest uppercase font-bold px-6 py-3.5 hover:border-slate-900 hover:text-slate-900 transition-colors"
          >
            {t('home.cta_learn')}
          </Link>
        </div>
      </div>

      {/* ── 右パネル: スライドショー ───────────────── */}
      <div className="md:w-[62%] relative overflow-hidden min-h-[400px] md:min-h-0 bg-slate-900">

        {/* スライド */}
        {slides.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === current ? 1 : 0 }}
          >
            {slide.imageSrc ? (
              <Image
                src={slide.imageSrc}
                alt={lang === 'ja' ? slide.label_ja : slide.label_en}
                fill
                className="object-cover object-[center_30%]"
                priority={i === 0}
              />
            ) : (
              /* ── 写真がない間のプレースホルダー ── */
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} flex items-center justify-center`}>
                <div className="text-center select-none pointer-events-none">
                  <div
                    className="w-20 h-20 mx-auto mb-4 opacity-10"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(45deg, #fff 0 1px, transparent 1px 10px)',
                    }}
                  />
                  <p className="text-[10px] tracking-[0.25em] uppercase text-white/20">
                    {lang === 'ja' ? '写真を追加予定' : 'Photo coming soon'}
                  </p>
                </div>
              </div>
            )}

            {/* キャプション */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-8 py-7">
              <p className="text-[10px] tracking-[0.25em] uppercase text-white/50 mb-1.5 font-medium">
                PSMA Activities
              </p>
              <p className="text-white font-bold text-xl leading-snug">
                {lang === 'ja' ? slide.label_ja : slide.label_en}
              </p>
              <p className="text-white/60 text-sm mt-1">
                {lang === 'ja' ? slide.desc_ja : slide.desc_en}
              </p>
            </div>
          </div>
        ))}

        {/* 前へ / 次へ ボタン */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-black/30 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={next}
          aria-label="Next"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-black/30 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* ドットインジケーター */}
        <div className="absolute bottom-6 right-7 z-10 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              className="transition-all duration-300"
              style={{
                width: i === current ? '20px' : '6px',
                height: '4px',
                backgroundColor: i === current ? '#fff' : 'rgba(255,255,255,0.35)',
              }}
            />
          ))}
        </div>

        {/* スライド番号 */}
        <div className="absolute top-5 right-6 z-10">
          <span className="text-[11px] font-mono text-white/40">
            {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  );
}
