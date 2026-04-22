'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Lang, t as translate } from './i18n';

interface LangContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (key: string) => string;
}

const LangContext = createContext<LangContextType>({
  lang: 'ja',
  toggleLang: () => {},
  t: (key) => key,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ja');

  const toggleLang = () => setLang((l) => (l === 'ja' ? 'en' : 'ja'));
  const t = (key: string) => translate(lang, key);

  return (
    <LangContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
