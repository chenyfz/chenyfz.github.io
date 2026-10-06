export type ThemeMode = 'light' | 'dark';
export const DEFAULT_THEME: ThemeMode = 'light';
export const THEME_STORAGE_KEY = 'site-theme';
export const THEME_CHANGE_EVENT = 'site-theme-change';
export const isThemeMode = (value: unknown): value is ThemeMode => value === 'light' || value === 'dark';
export const resolveTheme = (saved: unknown, systemDark: boolean): ThemeMode =>
  isThemeMode(saved) ? saved : systemDark ? 'dark' : 'light';

let sessionPreference: ThemeMode | null = null;
function readSavedTheme(): string | null {
  try { return window.localStorage.getItem(THEME_STORAGE_KEY) ?? sessionPreference; } catch { return sessionPreference; }
}
const systemTheme = () => window.matchMedia('(prefers-color-scheme: dark)');
export const getThemeSnapshot = (): ThemeMode => {
  if (typeof window === 'undefined') return DEFAULT_THEME;
  const theme = document.documentElement.dataset.theme;
  return isThemeMode(theme) ? theme : resolveTheme(readSavedTheme(), systemTheme().matches);
};
export const setTheme = (theme: ThemeMode) => {
  if (typeof window === 'undefined') return;
  document.documentElement.dataset.theme = theme;
  sessionPreference = theme;
  try { window.localStorage.setItem(THEME_STORAGE_KEY, theme); } catch { /* Session-only preference. */ }
  window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: theme }));
};
export const toggleTheme = () => setTheme(getThemeSnapshot() === 'dark' ? 'light' : 'dark');
export const subscribeTheme = (listener: () => void) => {
  if (typeof window === 'undefined') return () => undefined;
  const media = systemTheme();
  const sync = () => {
    document.documentElement.dataset.theme = resolveTheme(readSavedTheme(), media.matches);
    listener();
  };
  const storage = (event: StorageEvent) => {
    if (event.key === null || event.key === THEME_STORAGE_KEY) { sessionPreference = null; sync(); }
  };
  window.addEventListener(THEME_CHANGE_EVENT, listener);
  window.addEventListener('storage', storage);
  media.addEventListener('change', sync);
  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, listener);
    window.removeEventListener('storage', storage);
    media.removeEventListener('change', sync);
  };
};
