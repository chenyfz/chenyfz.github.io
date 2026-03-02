import { locales } from './config';
import type { Locale } from './config';

const localePrefixPattern = new RegExp(`^/(${locales.join('|')})(?=/|$)`);

export const getAlternateLocale = (locale: Locale): Locale => (locale === 'en' ? 'zh' : 'en');

const ensureLeadingSlash = (path: string): string => (path.startsWith('/') ? path : `/${path}`);

export const replaceLocaleInPath = (pathname: string, targetLocale: Locale): string => {
  const normalizedPath = ensureLeadingSlash(pathname);
  const localizedPath = localePrefixPattern.test(normalizedPath)
    ? normalizedPath.replace(localePrefixPattern, `/${targetLocale}`)
    : `/${targetLocale}${normalizedPath === '/' ? '/' : normalizedPath}`;

  return localizedPath.replace(/\/{2,}/g, '/');
};

export const buildLocaleHref = (
  targetLocale: Locale,
  pathname: string,
  search = '',
  hash = ''
): string => `${replaceLocaleInPath(pathname, targetLocale)}${search}${hash}`;

export const getLocaleHrefFromWindow = (targetLocale: Locale): string => {
  if (typeof window === 'undefined') return `/${targetLocale}/`;

  return buildLocaleHref(targetLocale, window.location.pathname, window.location.search, window.location.hash);
};
