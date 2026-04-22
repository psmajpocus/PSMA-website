'use client';

import { useState } from 'react';
import { useLang } from '@/lib/LangContext';
import PageHero from '@/components/PageHero';

export default function ContactPage() {
  const { t } = useLang();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    university: '',
    year: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
            {/* Form */}
            <div className="lg:col-span-7">
              <p className="text-[10px] tracking-[0.25em] uppercase text-slate-400 font-medium mb-2">
                {t('contact.join_title')}
              </p>
              <div className="w-6 h-px bg-slate-900 mb-8" />
              <p className="text-slate-500 mb-10 leading-relaxed">{t('contact.join_text')}</p>

              {submitted ? (
                <div className="border border-slate-200 p-10 text-center">
                  <p className="text-[10px] tracking-widest uppercase text-slate-400 mb-3">Sent</p>
                  <p className="text-slate-700 font-medium">{t('contact.submit_success')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[11px] tracking-widest uppercase text-slate-400 font-medium mb-2">
                        {t('contact.name_label')} <span className="text-slate-900">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder={t('contact.name_placeholder')}
                        value={form.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:border-slate-900 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] tracking-widest uppercase text-slate-400 font-medium mb-2">
                        {t('contact.email_label')} <span className="text-slate-900">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder={t('contact.email_placeholder')}
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:border-slate-900 transition-colors"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[11px] tracking-widest uppercase text-slate-400 font-medium mb-2">
                        {t('contact.university_label')} <span className="text-slate-900">*</span>
                      </label>
                      <input
                        type="text"
                        name="university"
                        required
                        placeholder={t('contact.university_placeholder')}
                        value={form.university}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:border-slate-900 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] tracking-widest uppercase text-slate-400 font-medium mb-2">
                        {t('contact.year_label')}
                      </label>
                      <input
                        type="text"
                        name="year"
                        placeholder={t('contact.year_placeholder')}
                        value={form.year}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:border-slate-900 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] tracking-widest uppercase text-slate-400 font-medium mb-2">
                      {t('contact.message_label')}
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder={t('contact.message_placeholder')}
                      value={form.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:border-slate-900 transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 bg-slate-900 hover:bg-slate-700 text-white text-[12px] tracking-widest uppercase font-bold transition-colors"
                  >
                    {t('contact.submit')} →
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase text-slate-400 font-medium mb-2">
                  {t('contact.inquiry_title')}
                </p>
                <div className="w-6 h-px bg-slate-900 mb-6" />
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{t('contact.inquiry_text')}</p>
                <a
                  href="mailto:moriyankoyuto0430@gmail.com"
                  className="text-sm font-medium text-slate-900 border-b border-slate-200 pb-0.5 hover:border-slate-900 transition-colors"
                >
                  moriyankoyuto0430@gmail.com
                </a>
              </div>

              <div className="border border-slate-100 p-8">
                <p className="text-[10px] tracking-[0.25em] uppercase text-slate-400 font-medium mb-6">
                  PSMA Info
                </p>
                <dl className="space-y-4">
                  {[
                    { label: 'Founded', value: '2024' },
                    { label: 'Location', value: 'Tokyo, Japan' },
                    { label: 'Open to', value: 'Medical students & residents' },
                  ].map((item) => (
                    <div key={item.label} className="flex gap-4">
                      <dt className="text-[10px] tracking-widest uppercase text-slate-400 w-20 shrink-0 pt-0.5 font-medium">
                        {item.label}
                      </dt>
                      <dd className="text-sm text-slate-700 font-medium">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
