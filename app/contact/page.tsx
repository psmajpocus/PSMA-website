'use client';

import { useLang } from '@/lib/LangContext';
import PageHero from '@/components/PageHero';

const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeMnUZg68AeSeVt0whG_CqSJNdTUMo7NRyLalQRaSQXGBNdlg/viewform?embedded=true';

export default function ContactPage() {
  const { t } = useLang();

  return (
    <>
      <PageHero
        label="Join / Contact"
        title={t('contact.title')}
        subtitle={t('contact.subtitle')}
      />

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Google Form */}
            <div className="lg:col-span-8">
              <p className="text-[15px] tracking-[0.25em] uppercase text-slate-400 font-medium mb-2">
                {t('contact.join_title')}
              </p>
              <div className="w-6 h-px bg-slate-900 mb-8" />
              <p className="text-slate-500 mb-10 leading-relaxed whitespace-pre-line">{t('contact.join_text')}</p>

              <iframe
                src={GOOGLE_FORM_URL}
                width="100%"
                height="900"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                className="w-full"
              >
                読み込んでいます…
              </iframe>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-10">
              <div>
                <p className="text-[15px] tracking-[0.25em] uppercase text-slate-400 font-medium mb-2">
                  {t('contact.inquiry_title')}
                </p>
                <div className="w-6 h-px bg-slate-900 mb-6" />
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{t('contact.inquiry_text')}</p>
                <a
                  href="mailto:psma.jpocus@gmail.com"
                  className="text-[17px] font-medium text-slate-900 border-b border-slate-200 pb-0.5 hover:border-slate-900 transition-colors"
                >
                  psma.jpocus@gmail.com
                </a>
              </div>

              <div>
                <p className="text-[15px] tracking-[0.25em] uppercase text-slate-400 font-medium mb-2">
                  {t('contact.social_title')}
                </p>
                <div className="w-6 h-px bg-slate-900 mb-6" />
                <div className="flex items-center gap-5">
                  <a href="#" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors" aria-label="Instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
                    </svg>
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors" aria-label="X (Twitter)">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors" aria-label="Facebook">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
