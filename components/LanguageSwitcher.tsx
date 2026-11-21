'use client';

import { useLang } from '@/lib/LangContext';
import { Lang } from '@/lib/i18n';

const langs: { code: Lang; label: string }[] = [
  { code: 'ja', label: 'JP' },
  { code: 'en', label: 'EN' },
];

interface Props {
  className?: string;
}

export default function LanguageSwitcher({ className = '' }: Props) {
  const { lang, setLang } = useLang();

  return (
    <div className={`flex items-center ${className}`}>
      {langs.map((l, i) => (
        <span key={l.code} className="flex items-center">
          {i > 0 && (
            <span className="text-slate-300 mx-2 text-[11px] select-none">|</span>
          )}
          <button
            onClick={() => setLang(l.code)}
            className={`text-[13px] tracking-widest uppercase transition-colors duration-200 ${
              lang === l.code
                ? 'text-slate-900 font-bold'
                : 'text-slate-400 hover:text-slate-600 font-medium'
            }`}
          >
            {l.label}
          </button>
        </span>
      ))}
    </div>
  );
}
