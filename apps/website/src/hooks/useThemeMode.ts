import { useSyncExternalStore } from 'react';
import { DEFAULT_THEME, getThemeSnapshot, subscribeTheme } from '@/styles/theme';

export default function useThemeMode() {
  return useSyncExternalStore(subscribeTheme, getThemeSnapshot, () => DEFAULT_THEME);
}
