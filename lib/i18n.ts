'use client';

import ja from './translations/ja.json';
import en from './translations/en.json';

export type Lang = 'ja' | 'en';

const translations = { ja, en } as const;

type DeepKeys<T> = T extends object
  ? { [K in keyof T]: K extends string ? `${K}` | `${K}.${DeepKeys<T[K]>}` : never }[keyof T]
  : never;

export type TranslationKey = DeepKeys<typeof ja>;

export function t(lang: Lang, key: string): string {
  const keys = key.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = translations[lang];
  for (const k of keys) {
    value = value?.[k];
  }
  return typeof value === 'string' ? value : key;
}
