export const defaultLocale = 'en';

export const locales = ['en', 'zh'] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function requireLocaleParam(lang: string | undefined): Locale {
  if (!lang || !isLocale(lang)) {
    throw new Error(`Unsupported locale: ${lang}`);
  }

  return lang;
}
