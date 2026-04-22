'use client';

import { useLang } from '@/lib/LangContext';
import Link from 'next/link';
import PageHero from '@/components/PageHero';

const members = [
  {
    name: 'Yuto Moriya / 森谷 優人',
    roleKey: 'members.role_president',
    university_ja: '浜松医科大学医学部',
    university_en: 'Hamamatsu University School of Medicine',
    bio_ja: 'PSMAの設立者・代表。IELTS C1取得、トロント大・グラスゴー大への留学経験あり。',
    bio_en: 'Founder and President. IELTS C1, study abroad at U of Toronto and U of Glasgow.',
    tags: ['POCUS', 'IELTS C1', 'Study Abroad'],
  },
  {
    name: 'Recruiting / 募集中',
    roleKey: 'members.role_vice',
    university_ja: 'あなたの大学',
    university_en: 'Your University',
    bio_ja: '副代表ポジション募集中。積極的に活動に関わりたい方、ぜひご連絡を。',
    bio_en: 'Vice President position open. If you want to be actively involved, reach out.',
    tags: ['Recruiting'],
  },
  {
    name: 'Recruiting / 募集中',
    roleKey: 'members.role_member',
    university_ja: 'あなたの大学',
    university_en: 'Your University',
    bio_ja: 'メンバー募集中。医学生・研修医であれば誰でも参加できます。',
    bio_en: 'Open to all medical students and residents.',
    tags: ['Recruiting'],
  },
];

export default function MembersPage() {
  const { t, lang } = useLang();

  return (
    <>
      <PageHero
        label="Members"
        title={t('members.title')}
        subtitle={t('members.subtitle')}
      />

      {/* Members grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-100">
            {members.map((member) => (
              <div
                key={member.name}
                className="bg-white p-8 lg:p-10 group hover:bg-slate-50 transition-colors"
              >
                {/* Avatar placeholder */}
                <div className="w-16 h-16 bg-slate-100 mb-6 flex items-center justify-center">
                  <span className="text-slate-300 text-[10px] tracking-widest uppercase font-medium">Photo</span>
                </div>

                <p className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium mb-2">
                  {t(member.roleKey)}
                </p>
                <h3 className="font-bold text-slate-900 text-lg mb-1">{member.name}</h3>
                <p className="text-sm text-slate-400 mb-4">
                  {lang === 'ja' ? member.university_ja : member.university_en}
                </p>
                <p className="text-sm text-slate-500 leading-relaxed mb-5">
                  {lang === 'ja' ? member.bio_ja : member.bio_en}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {member.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] tracking-wide uppercase text-slate-400 border border-slate-200 px-2.5 py-1 font-medium"
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
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <p className="text-[10px] tracking-[0.25em] uppercase text-slate-400 font-medium mb-4">
                Join PSMA
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                {t('members.join_cta')}
              </h2>
              <p className="text-slate-500 text-lg">
                {lang === 'ja'
                  ? '医学生・研修医であれば誰でも参加可能。大学不問。'
                  : "Open to all medical students and residents, regardless of university."}
              </p>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-slate-900 text-white text-[12px] tracking-widest uppercase font-bold px-8 py-4 hover:bg-slate-700 transition-colors"
              >
                {t('members.join_button')} →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
