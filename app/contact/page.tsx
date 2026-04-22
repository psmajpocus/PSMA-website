'use client';

import { useState } from 'react';
import { useLang } from '@/lib/LangContext';

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
    // In production, send to a backend or form service (e.g. Formspree, Resend)
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-950 to-blue-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('contact.title')}</h1>
          <p className="text-blue-200 text-lg">{t('contact.subtitle')}</p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
            {/* Form */}
            <div className="md:col-span-3">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-blue-950 mb-6">{t('contact.join_title')}</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">{t('contact.join_text')}</p>

                {submitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                    <span className="text-4xl block mb-3">✅</span>
                    <p className="text-green-800 font-medium">{t('contact.submit_success')}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t('contact.name_label')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder={t('contact.name_placeholder')}
                        value={form.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t('contact.email_label')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder={t('contact.email_placeholder')}
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t('contact.university_label')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="university"
                        required
                        placeholder={t('contact.university_placeholder')}
                        value={form.university}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t('contact.year_label')}
                      </label>
                      <input
                        type="text"
                        name="year"
                        placeholder={t('contact.year_placeholder')}
                        value={form.year}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t('contact.message_label')}
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        placeholder={t('contact.message_placeholder')}
                        value={form.message}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition-colors text-base"
                    >
                      {t('contact.submit')}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Sidebar info */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-blue-950 mb-3">{t('contact.inquiry_title')}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{t('contact.inquiry_text')}</p>
                <a
                  href="mailto:moriyankoyuto0430@gmail.com"
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
                >
                  <span>✉️</span>
                  moriyankoyuto0430@gmail.com
                </a>
              </div>

              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="font-bold text-blue-950 mb-3">PSMA</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-center gap-2">
                    <span>📅</span>
                    <span>2024年設立 / Founded 2024</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>📍</span>
                    <span>東京・全国 / Tokyo & Nationwide</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>🎓</span>
                    <span>医学生・研修医歓迎 / Open to all medical students & residents</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
