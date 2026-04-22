'use client';

import { useLang } from '@/lib/LangContext';

const articles = [
  {
    slug: 'pocus-basics-interview',
    categoryKey: 'articles.category_interview',
    title_ja: '【インタビュー】POCUS指導医が語る「医学生がエコーを学ぶべき理由」',
    title_en: '[Interview] A POCUS Educator on "Why Medical Students Should Learn Ultrasound"',
    excerpt_ja:
      'POCUS教育の第一線で活躍する指導医に、医学生がなぜ早期からPOCUSを学ぶべきかをお聞きしました。',
    excerpt_en:
      'We spoke with a leading POCUS educator about why medical students should start learning ultrasound early.',
    date: '2024-11-10',
    emoji: '🩺',
  },
  {
    slug: 'conference-report-2024',
    categoryKey: 'articles.category_report',
    title_ja: '【学会レポート】日本超音波医学会2024年総会 参加報告',
    title_en: '[Report] Japan Society of Ultrasonics in Medicine 2024 Annual Meeting',
    excerpt_ja:
      '2024年の日本超音波医学会総会に参加したPSMAメンバーによる報告レポートです。最新のPOCUS動向をまとめました。',
    excerpt_en:
      "A report from PSMA members who attended the Japan Society of Ultrasonics in Medicine's 2024 annual meeting.",
    date: '2024-10-28',
    emoji: '📋',
  },
  {
    slug: 'pocus-tips-for-beginners',
    categoryKey: 'articles.category_tips',
    title_ja: '【初心者向け】POCUS学習を始める前に知っておきたい5つのこと',
    title_en: '[Tips] 5 Things to Know Before You Start Learning POCUS',
    excerpt_ja:
      'POCUSを初めて学ぶ医学生に向けて、最初に知っておくべき基礎知識や心構えをまとめました。',
    excerpt_en:
      'Essential knowledge and mindset for medical students starting their POCUS journey for the first time.',
    date: '2024-09-15',
    emoji: '📡',
  },
];

const categories = [
  'articles.category_interview',
  'articles.category_report',
  'articles.category_tips',
  'articles.category_news',
];

export default function ArticlesPage() {
  const { t, lang } = useLang();

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-950 to-blue-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('articles.title')}</h1>
          <p className="text-blue-200 text-lg">{t('articles.subtitle')}</p>
        </div>
      </section>

      {/* Category filter */}
      <section className="py-8 bg-white border-b border-gray-100 sticky top-16 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-1.5 bg-blue-700 text-white text-sm font-medium rounded-full">
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className="px-4 py-1.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-full hover:border-blue-400 hover:text-blue-700 transition-colors"
              >
                {t(cat)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles list */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <article
                key={article.slug}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group cursor-pointer"
              >
                <div className="h-44 bg-gradient-to-br from-blue-100 to-cyan-50 flex items-center justify-center">
                  <span className="text-6xl opacity-60">{article.emoji}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                      {t(article.categoryKey)}
                    </span>
                    <span className="text-xs text-gray-400">{article.date}</span>
                  </div>
                  <h2 className="font-bold text-blue-950 leading-snug mb-3 group-hover:text-blue-700 transition-colors">
                    {lang === 'ja' ? article.title_ja : article.title_en}
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    {lang === 'ja' ? article.excerpt_ja : article.excerpt_en}
                  </p>
                  <span className="text-sm text-blue-600 font-medium">{t('articles.read_more')} →</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
