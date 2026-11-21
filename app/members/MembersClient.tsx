'use client';

import { useLang } from '@/lib/LangContext';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import dynamic from 'next/dynamic';
import type { Organization } from '@/lib/microcms';

const UniversityMap = dynamic(() => import('@/components/UniversityMap'), { ssr: false });

// 幹部メンバーはコードで管理（変更頻度が低いため）
const members = [
  {
    name: '森谷 優人',
    roleKey: 'members.role_president',
    university_ja: '浜松医科大学',
    university_en: 'Hamamatsu University School of Medicine',
    bio_ja: 'POCUSを通じて全国の医学生・研修医をつなぐことを目指し、PSMAの立ち上げから活動しています。ハンズオンセミナーの企画・運営を中心に、学生主体の学びの場づくりに取り組んでいます。',
    bio_en: 'Leading PSMA since its founding with a vision to connect medical students and residents across Japan through POCUS. Focused on organizing hands-on seminars and building student-led learning communities.',
    tags: ['浜松医科大学', 'HERUS'],
  },
  {
    name: '荘原 直人',
    roleKey: 'members.role_vice',
    university_ja: '研修医',
    university_en: 'Resident Physician',
    bio_ja: '学生とのつながりを大切にするとともに、研修医としての経験も活かし、超音波を学ぶきっかけや挑戦できる環境づくりに取り組んでいます。学生超音波教育のさらなる発展に貢献していきます。',
    bio_en: 'I value connections with students and leverage my experience as a resident physician to create opportunities to learn ultrasound and environments where students can take on new challenges. I am committed to contributing to the further development of ultrasound education for medical students.',
    tags: ['研修医'],
  },
  {
    name: '本庄 優希',
    roleKey: 'members.role_vice',
    university_ja: '和歌山県立医科大学',
    university_en: 'Wakayama Medical University',
    bio_ja: '',
    bio_en: '',
    tags: ['和歌山県立医科大学'],
  },
  {
    name: '河内 真央',
    roleKey: 'members.role_vice',
    university_ja: '浜松医科大学',
    university_en: 'Hamamatsu University School of Medicine',
    bio_ja: '',
    bio_en: '',
    tags: ['浜松医科大学'],
  },
];

const STATIC_ORGANIZATIONS: Organization[] = [
  {
    id: 'static-herus',
    name_ja: '浜松医科大学',
    name_en: 'Hamamatsu University School of Medicine',
    organization_ja: 'HERUS',
    organization_en: 'HERUS',
    prefecture: '静岡県',
    lat: 34.7163,
    lng: 137.7282,
    description_ja: '浜松医科大学を拠点とするPOCUS学習団体。学生・研修医が垣根なく集い、ハンズオンセミナーや症例検討を通じてエコーの実践的な使い方を学んでいます。臨床の現場で即戦力となる超音波スキルの習得を目指し、仲間と共に切磋琢磨しています。',
    description_en: 'A POCUS study group based at Hamamatsu University School of Medicine. Students and residents come together through hands-on seminars and case reviews to build practical ultrasound skills ready for clinical use.',
    photo: { url: '/images/herus.jpg' },
  },
  {
    id: 'static-wakayama',
    name_ja: '和歌山県立医科大学',
    name_en: 'Wakayama Medical University',
    organization_ja: 'K-PICS',
    organization_en: 'K-PICS',
    prefecture: '和歌山県',
    lat: 34.1983,
    lng: 135.1981,
  },
  {
    id: 'static-shimane',
    name_ja: '島根大学',
    name_en: 'Shimane University',
    organization_ja: '島根大学医学部',
    organization_en: 'Shimane University School of Medicine',
    prefecture: '島根県',
    lat: 35.3694,
    lng: 132.7591,
  },
  {
    id: 'static-jichi',
    name_ja: '自治医科大学',
    name_en: 'Jichi Medical University',
    organization_ja: '自治医科大学',
    organization_en: 'Jichi Medical University',
    prefecture: '栃木県',
    lat: 36.3765,
    lng: 139.8553,
  },
  {
    id: 'static-shinshu',
    name_ja: '信州大学',
    name_en: 'Shinshu University',
    organization_ja: 'SinUS',
    organization_en: 'SinUS',
    prefecture: '長野県',
    lat: 36.2349,
    lng: 137.9791,
    description_ja: '信州大学エコーサークルのSinUS(サイナス)です！2024年秋に創部し、月に2-3回ほど、学生同士でエコーを教え合いながら活動しています。普段の活動では、POCUS手技や実習で学んだ各自の症例紹介、大会に向けた練習や救命救急センターでの実践練習を行っています。',
    description_en: 'We are SinUS (Sinus), the echo circle of Shinshu University! Founded in autumn 2024, we meet 2–3 times a month to teach each other ultrasound techniques. Our regular activities include case presentations from clinical rotations, competition practice, and hands-on training at the emergency and critical care center.',
    photo: { url: '/images/sinus.jpg' },
  },
  {
    id: 'static-tokushima',
    name_ja: '徳島大学',
    name_en: 'Tokushima University',
    organization_ja: '先端医療研究会',
    organization_en: '先端医療研究会',
    prefecture: '徳島県',
    lat: 34.0713,
    lng: 134.5592,
  },
  {
    id: 'static-ryukyu',
    name_ja: '琉球大学',
    name_en: 'University of the Ryukyus',
    organization_ja: '琉球大学医学部',
    organization_en: 'University of the Ryukyus School of Medicine',
    prefecture: '沖縄県',
    lat: 26.2494,
    lng: 127.7688,
  },
  {
    id: 'static-hokkaido',
    name_ja: '北海道大学',
    name_en: 'Hokkaido University',
    organization_ja: '北海道大学医学部',
    organization_en: 'Hokkaido University School of Medicine',
    prefecture: '北海道',
    lat: 43.0731,
    lng: 141.3393,
  },
  {
    id: 'static-iwate',
    name_ja: '岩手医科大学',
    name_en: 'Iwate Medical University',
    organization_ja: 'IMUA',
    organization_en: 'IMUA',
    prefecture: '岩手県',
    lat: 39.5869,
    lng: 141.1541,
    description_ja: '腹部を中心に、幅広い分野の超音波検査について勉強している団体です。技術の習得によって将来の地域医療への貢献を目指しています！よろしくお願いいたします。',
    description_en: 'We are a group studying ultrasound across a wide range of fields, with a focus on abdominal imaging. Through developing our skills, we aim to contribute to regional healthcare in the future. Nice to meet you!',
  },
  {
    id: 'static-kumamoto',
    name_ja: '熊本大学',
    name_en: 'Kumamoto University',
    organization_ja: '熊本大学医学部',
    organization_en: 'Kumamoto University School of Medicine',
    prefecture: '熊本県',
    lat: 32.8031,
    lng: 130.7219,
  },
  {
    id: 'static-ehime',
    name_ja: '愛媛大学',
    name_en: 'Ehime University',
    organization_ja: '愛媛大学医学部',
    organization_en: 'Ehime University School of Medicine',
    prefecture: '愛媛県',
    lat: 33.8342,
    lng: 132.8891,
  },
  {
    id: 'static-yokohama',
    name_ja: '横浜市立大学',
    name_en: 'Yokohama City University',
    organization_ja: '横浜市立大学医学部',
    organization_en: 'Yokohama City University School of Medicine',
    prefecture: '神奈川県',
    lat: 35.3529,
    lng: 139.6175,
  },
  {
    id: 'static-tokyo',
    name_ja: '東京大学',
    name_en: 'The University of Tokyo',
    organization_ja: '東京大学医学部',
    organization_en: 'The University of Tokyo School of Medicine',
    prefecture: '東京都',
    lat: 35.7127,
    lng: 139.7627,
  },
  {
    id: 'static-kanazawa',
    name_ja: '金沢大学',
    name_en: 'Kanazawa University',
    organization_ja: '金沢大学医学部',
    organization_en: 'Kanazawa University School of Medicine',
    prefecture: '石川県',
    lat: 36.5613,
    lng: 136.6625,
  },
  {
    id: 'static-hyogo',
    name_ja: '兵庫医科大学',
    name_en: 'Hyogo Medical University',
    organization_ja: '兵庫医科大学',
    organization_en: 'Hyogo Medical University',
    prefecture: '兵庫県',
    lat: 34.7271,
    lng: 135.3683,
  },
  {
    id: 'static-mie',
    name_ja: '三重大学',
    name_en: 'Mie University',
    organization_ja: '三重大学医学部',
    organization_en: 'Mie University School of Medicine',
    prefecture: '三重県',
    lat: 34.7303,
    lng: 136.5086,
  },
  {
    id: 'static-toho',
    name_ja: '東邦大学',
    name_en: 'Toho University',
    organization_ja: '東邦大学医学部',
    organization_en: 'Toho University School of Medicine',
    prefecture: '東京都',
    lat: 35.5603,
    lng: 139.7128,
  },
  {
    id: 'static-tokyo-med',
    name_ja: '東京医科大学',
    name_en: 'Tokyo Medical University',
    organization_ja: '東京医科大学',
    organization_en: 'Tokyo Medical University',
    prefecture: '東京都',
    lat: 35.6938,
    lng: 139.7016,
  },
  {
    id: 'static-tohoku-mpу',
    name_ja: '東北医科薬科大学',
    name_en: 'Tohoku Medical and Pharmaceutical University',
    organization_ja: '東北医科薬科大学医学部',
    organization_en: 'Tohoku Medical and Pharmaceutical University School of Medicine',
    prefecture: '宮城県',
    lat: 38.2682,
    lng: 140.8694,
  },
  {
    id: 'static-kitasato',
    name_ja: '北里大学',
    name_en: 'Kitasato University',
    organization_ja: '北里大学医学部',
    organization_en: 'Kitasato University School of Medicine',
    prefecture: '神奈川県',
    lat: 35.3864,
    lng: 139.3097,
  },
  {
    id: 'static-nihon',
    name_ja: '日本大学',
    name_en: 'Nihon University',
    organization_ja: 'NUSMUS',
    organization_en: 'NUSMUS',
    prefecture: '東京都',
    lat: 35.7068,
    lng: 139.7283,
  },
];

export default function MembersClient({ organizations }: { organizations: Organization[] }) {
  const { t, lang } = useLang();

  const allOrganizations = [
    ...STATIC_ORGANIZATIONS.filter(
      (s) => !organizations.some((o) => o.name_ja === s.name_ja)
    ),
    ...organizations,
  ];

  return (
    <>
      <PageHero
        label="Members"
        title={t('members.title')}
        subtitle={t('members.subtitle')}
      />

      {/* 幹部メンバー */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white">
            {members.map((member) => (
              <div key={member.name}
                className="bg-white p-8 lg:p-10 group hover:bg-slate-50 transition-colors">
                <p className="text-[15px] tracking-[0.2em] uppercase text-slate-400 font-medium mb-2">
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
                    <span key={tag}
                      className="text-[10px] tracking-wide uppercase text-slate-400 border border-slate-200 px-2.5 py-1 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 参加大学マップ（microCMSから動的取得） */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-12">
            <div className="lg:col-span-3">
              <p className="text-[13px] tracking-[0.25em] uppercase text-slate-400 font-medium mb-2">
                {lang === 'ja' ? '参加団体マップ' : 'Member Organizations Map'}
              </p>
              <div className="w-6 h-px bg-slate-900" />
            </div>
            <div className="lg:col-span-7">
              <p className="text-slate-600 text-lg leading-relaxed">
                {lang === 'ja' ? (
                  <>全国の医療系大学からメンバーが参加しています。<br />地図上のピンをクリックして、各団体の詳細をご覧ください。</>
                ) : (
                  <>Members join from medical schools and hospitals across Japan.<br />Click a pin to learn more about each institution.</>
                )}
              </p>
            </div>
          </div>
          <UniversityMap lang={lang} organizations={allOrganizations} />
        </div>
      </section>
    </>
  );
}
