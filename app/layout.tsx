import type { Metadata } from 'next';
import './globals.css';
import { LangProvider } from '@/lib/LangContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'PSMA — POCUS Students and Residents Medical Alliance',
  description:
    '日本全国の医学生・研修医のためのPOCUS学習コミュニティ。大学の壁を超えてともに学ぶ。 / A POCUS learning community for medical students and residents across Japan.',
  openGraph: {
    title: 'PSMA — POCUS Students and Residents Medical Alliance',
    description: '日本全国の医学生・研修医のためのPOCUS学習コミュニティ',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen flex flex-col">
        <LangProvider>
          <Navbar />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
