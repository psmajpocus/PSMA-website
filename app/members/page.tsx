'use client';

import { useLang } from '@/lib/LangContext';
import Link from 'next/link';

const members = [
  {
    name: '森谷 優人 / Yuto Moriya',
    roleKey: 'members.role_president',
    university_ja: '浜松医科大学医学部',
    university_en: 'Hamamatsu University School of Medicine',
    bio_ja: 'PSMAの設立者・代表。IELTS C1取得、トロント大・グラスゴー大への留学経験あり。POCUSを全国の医学生に広めるためPSMAを設立。',
    bio_en: 'Founder and President of PSMA. IELTS C1, study abroad at University of Toronto and University of Glasgow. Founded PSMA to spread POCUS education to medical students nationwide.',
    tags: ['POCUS', 'IELTS C1', '留学経験 / Study Abroad'],
    emoji: '👨‍⚕️',
  },
  {
    name: 'メンバー募集中 / Recruiting',
    roleKey: 'members.role_vice',
    university_ja: 'あなたの大学',
    university_en: 'Your University',
    bio_ja: '副代表ポジション募集中。PSMA活動に積極的に関わりたい方、ご連絡ください。',
    bio_en: 'Vice President position open. If you want to be actively involved in PSMA, please reach out.',
    tags: ['募集中 / Recruiting'],
    emoji: '🙋',
  },
];

export default function MembersPage() {
  const { t, lang } = useLang();

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-950 to-blue-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('members.title')}</h1>
          <p className="text-blue-200 text-lg">{t('members.subtitle')}</p>
        </div>
      </section>

      {/* Members grid */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((member) => (
              <div
                key={member.name}
                className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-shadow"
              >
                {/* Avatar */}
                <div className="w-20 h-20 bg-gradient-to-br from-blue-200 to-cyan-100 rounded-full flex items-center justify-center text-4xl mb-5 shadow-sm">
                  {member.emoji}
                </div>
                {/* Role badge */}
                <span className="inline-block text-xs font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-full mb-3">
                  {t(member.roleKey)}
                </span>
                <h3 className="font-bold text-blue-950 text-lg mb-1">{member.name}</h3>
                <p className="text-sm text-gray-500 mb-3">
                  {lang === 'ja' ? member.university_ja : member.university_en}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {lang === 'ja' ? member.bio_ja : member.bio_en}
                </p>
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {member.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-gray-500 bg-white border border-gray-200 px-2.5 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-blue-950 mb-4">{t('members.join_cta')}</h2>
          <p className="text-gray-600 text-lg mb-8">
            {lang === 'ja'
              ? '医学生・研修医であれば誰でも参加可能。大学不問。一緒にPOCUSを学びましょう。'
              : "Open to all medical students and residents, regardless of university. Let's learn POCUS together."}
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-colors text-lg"
          >
            {t('members.join_button')} →
          </Link>
        </div>
      </section>
    </>
  );
}
