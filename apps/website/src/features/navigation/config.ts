import type { Locale } from '@/i18n/config';

export const OVERLAY_DEBUG = false;
export const OVERLAY_DEBUG_SHOW_LAYOUT = OVERLAY_DEBUG;

export const OVERLAY_LAYOUT_CLASS =
  'inline-grid grid-cols-[repeat(2,max-content)] items-start content-start gap-x-3 gap-y-4 md:grid-cols-[repeat(3,max-content)] md:gap-x-5 md:gap-y-6 lg:grid-cols-[repeat(5,max-content)] lg:gap-x-6 lg:gap-y-8';
export const OVERLAY_SWITCH_FRAME_CLASS = 'h-16 w-32 select-none';
export const ROUND_GLASS_ITEM = { glassRadius: '999px' };
type MenuCardKey = 'staticCv' | 'mastersCourses' | 'graduationThesis';

export const MENU_CARD_DEFS = [
  { key: 'staticCv', href: (lang: Locale) => `/${lang}/` },
  { key: 'mastersCourses', href: (lang: Locale) => `/${lang}/masters-courses/` },
  { key: 'graduationThesis', href: (lang: Locale) => `/${lang}/graduation-thesis/` }
] as const satisfies ReadonlyArray<{ key: MenuCardKey; href: (lang: Locale) => string; external?: boolean }>;
export const SWITCH_COUNT = 2;
export const OVERLAY_ITEM_COUNT = SWITCH_COUNT + MENU_CARD_DEFS.length;

export const OVERLAY_ITEM_CLASS_NAMES = Array.from({ length: OVERLAY_ITEM_COUNT }, (_, index) => {
  if (index < SWITCH_COUNT) return 'col-span-1 justify-self-start self-start';
  if (index === SWITCH_COUNT) return 'col-start-1';
  return '';
});

export const OVERLAY_ITEM_CONFIGS = Array.from({ length: OVERLAY_ITEM_COUNT }, (_, index) => {
  if (index < SWITCH_COUNT) return { ...ROUND_GLASS_ITEM, interactive: false };
  return {};
});


type NavCardText = {
  title: string;
  emoji: string;
  description?: string;
};

type NavText = {
  openMenu: string;
  staticCv: NavCardText;
  mastersCourses: NavCardText;
  graduationThesis: NavCardText;
};

export const NAV_TEXT: Record<Locale, NavText> = {
  en: {
    openMenu: 'Open menu',
    staticCv: { title: 'Static CV', emoji: '📄', description: 'Resume / CV' },
    mastersCourses: { title: 'Master\'s Courses', emoji: '📚', description: 'MSc Courses' },
    graduationThesis: { title: 'Graduation Thesis', emoji: '🎓', description: 'MSc Thesis' }
  },
  zh: {
    openMenu: '打开菜单',
    staticCv: { title: '简历', emoji: '📄', description: 'CV' },
    mastersCourses: { title: '硕士课程', emoji: '📚', description: 'MSc 课程' },
    graduationThesis: { title: '毕业设计', emoji: '🎓', description: '硕士论文' }
  }
};
