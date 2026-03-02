import type { Locale } from './config';

export type LocaleMap<T> = Record<Locale, T>;

export function t<T>(map: LocaleMap<T>, locale: Locale): T {
  return map[locale];
}
