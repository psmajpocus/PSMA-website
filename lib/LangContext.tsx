'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Lang, t as translate } from './i18n';

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: (key: string) => string;
}

const LangContext = createContext<LangContextType>({
  lang: 'ja',
  setLang: () => {},
  toggleLang: () => {},
  t: (key) => key,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ja');

  const setLang = (l: Lang) => setLangState(l);
  const toggleLang = () => setLangState((l) => (l === 'ja' ? 'en' : 'ja'));
  const t = (key: string) => translate(lang, key);

  return (
    <LangContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
