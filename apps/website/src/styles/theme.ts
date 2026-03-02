export type ThemeMode = 'light' | 'dark';

export const DEFAULT_THEME: ThemeMode = 'light';
export const THEME_STORAGE_KEY = 'site-theme';
export const THEME_CHANGE_EVENT = 'site-theme-change';

export const isThemeMode = (value: unknown): value is ThemeMode => {
  return value === 'light' || value === 'dark';
};

const resolveSystemTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return DEFAULT_THEME;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const getThemeSnapshot = (): ThemeMode => {
  if (typeof window === 'undefined') return DEFAULT_THEME;

  const rootTheme = document.documentElement.dataset.theme;
  if (isThemeMode(rootTheme)) return rootTheme;

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (isThemeMode(savedTheme)) return savedTheme;

  return resolveSystemTheme();
};

const broadcastThemeChange = (theme: ThemeMode) => {
  window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: theme }));
};

export const setTheme = (theme: ThemeMode) => {
  if (typeof window === 'undefined') return;

  document.documentElement.dataset.theme = theme;
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  broadcastThemeChange(theme);
};

export const toggleTheme = () => {
  const currentTheme = getThemeSnapshot();
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
};

export const subscribeTheme = (listener: () => void) => {
  if (typeof window === 'undefined') return () => undefined;

  const handleThemeEvent = () => listener();
  const handleStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === THEME_STORAGE_KEY) {
      if (isThemeMode(event.newValue)) {
        document.documentElement.dataset.theme = event.newValue;
      }
      listener();
    }
  };

  window.addEventListener(THEME_CHANGE_EVENT, handleThemeEvent as EventListener);
  window.addEventListener('storage', handleStorage);

  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, handleThemeEvent as EventListener);
    window.removeEventListener('storage', handleStorage);
  };
};
