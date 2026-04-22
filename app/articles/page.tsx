'use client';

import { useLang } from '@/lib/LangContext';
import PageHero from '@/components/PageHero';

const articles = [
  {
    slug: 'pocus-basics-interview',
    categoryKey: 'articles.category_interview',
    title_ja: 'POCUS指導医が語る「医学生がエコーを学ぶべき理由」',
    title_en: 'A POCUS Educator on Why Medical Students Should Learn Ultrasound',
    excerpt_ja: 'POCUS教育の第一線で活躍する指導医に、医学生がなぜ早期からPOCUSを学ぶべきかをお聞きしました。',
    excerpt_en: 'We spoke with a leading POCUS educator about why medical students should start learning ultrasound early.',
    date: '2024.11.10',
  },
  {
    slug: 'conference-report-2024',
    categoryKey: 'articles.category_report',
    title_ja: '日本超音波医学会2024年総会 参加報告',
    title_en: 'JSUM 2024 Annual Meeting — Participation Report',
    excerpt_ja: '2024年の日本超音波医学会総会に参加したPSMAメンバーによる報告レポートです。',
    excerpt_en: "A report from PSMA members who attended JSUM's 2024 annual meeting.",
    date: '2024.10.28',
  },
  {
    slug: 'pocus-tips-for-beginners',
    categoryKey: 'articles.category_tips',
    title_ja: 'POCUS学習を始める前に知っておきたい5つのこと',
    title_en: '5 Things to Know Before You Start Learning POCUS',
    excerpt_ja: 'POCUSを初めて学ぶ医学生に向けて、最初に知っておくべき基礎知識をまとめました。',
    excerpt_en: 'Essential knowledge for medical students starting their POCUS journey.',
    date: '2024.09.15',
  },
  {
    slug: 'inter-university-event',
    categoryKey: 'articles.category_news',
    title_ja: '他大学との合同勉強会を開催しました',
    title_en: 'We Hosted a Joint Study Session with Other Universities',
    excerpt_ja: '複数大学の医学生が集まって、POCUS画像読影を中心とした勉強会を行いました。',
    excerpt_en: 'Medical students from multiple universities gathered for a POCUS image interpretation workshop.',
    date: '2024.08.20',
  },
];

const categories = [
  { key: 'all', label_ja: 'すべて', label_en: 'All' },
  { key: 'articles.category_interview', label_ja: 'インタビュー', label_en: 'Interview' },
  { key: 'articles.category_report', label_ja: '学会レポート', label_en: 'Report' },
  { key: 'articles.category_tips', label_ja: '学習Tips', label_en: 'Tips' },
  { key: 'articles.category_news', label_ja: 'お知らせ', label_en: 'News' },
];

export default function ArticlesPage() {
  const { t, lang } = useLang();

  return (
    <>
      <PageHero
        label="Articles"
        title={t('articles.title')}
        subtitle={t('articles.subtitle')}
      />

      {/* Filter tabs */}
      <div className="bg-white border-b border-slate-100 sticky top-14 z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-6 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.key}
                className={`shrink-0 text-[11px] tracking-widest uppercase font-medium pb-1 transition-colors ${
                  cat.key === 'all'
                    ? 'text-slate-900 border-b-2 border-slate-900'
                    : 'text-slate-400 hover:text-slate-700 border-b-2 border-transparent'
                }`}
              >
                {lang === 'ja' ? cat.label_ja : cat.label_en}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles list */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Featured article (first one larger) */}
          <article className="group cursor-pointer mb-2">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-slate-100">
              <div className="lg:col-span-7 bg-slate-100 min-h-[240px] flex items-center justify-center">
                <div className="text-slate-300 text-center">
                  <div className="text-6xl mb-2">📡</div>
                  <p className="text-[10px] tracking-widest uppercase">POCUS / Ultrasound</p>
                </div>
              </div>
              <div className="lg:col-span-5 bg-white p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-slate-400 mb-4 font-medium">
                    {t(articles[0].categoryKey)} · {articles[0].date}
                  </p>
                  <h2 className="font-bold text-slate-900 text-xl lg:text-2xl leading-snug mb-4 group-hover:text-blue-700 transition-colors">
                    {lang === 'ja' ? articles[0].title_ja : articles[0].title_en}
                  </h2>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {lang === 'ja' ? articles[0].excerpt_ja : articles[0].excerpt_en}
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 mt-6 text-[11px] tracking-widest uppercase font-bold text-slate-400 group-hover:text-slate-900 transition-colors">
                  {t('articles.read_more')} →
                </span>
              </div>
            </div>
          </article>

          {/* Grid articles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-100 mt-px">
            {articles.slice(1).map((article) => (
              <article
                key={article.slug}
                className="bg-white p-8 group cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <p className="text-[10px] tracking-[0.2em] uppercase text-slate-400 mb-4 font-medium">
                  {t(article.categoryKey)} · {article.date}
                </p>
                <h3 className="font-bold text-slate-900 text-base leading-snug mb-4 group-hover:text-blue-700 transition-colors">
                  {lang === 'ja' ? article.title_ja : article.title_en}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-6">
                  {lang === 'ja' ? article.excerpt_ja : article.excerpt_en}
                </p>
                <span className="text-[11px] tracking-widest uppercase font-bold text-slate-400 group-hover:text-slate-900 transition-colors">
                  {t('articles.read_more')} →
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
