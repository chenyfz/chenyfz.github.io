import { useEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import type { Locale } from '@/i18n/config';
import { getAlternateLocale, getLocaleHrefFromWindow } from '@/i18n/locale-switch';
import BulletTimeSlotOverlay from '@/components/BulletTimeSlotOverlay';
import ThemeGlassSwitch from '@/components/ThemeGlassSwitch';
import LanguageGlassSwitch from '@/components/LanguageGlassSwitch';
import useThemeMode from '@/hooks/useThemeMode';
import { toggleTheme } from '@/styles/theme';

const OVERLAY_DEBUG = false;
const OVERLAY_DEBUG_SHOW_LAYOUT = OVERLAY_DEBUG;

const OVERLAY_LAYOUT_CLASS =
  'inline-grid grid-cols-[repeat(2,max-content)] items-start content-start gap-x-3 gap-y-4 md:grid-cols-[repeat(3,max-content)] md:gap-x-5 md:gap-y-6 lg:grid-cols-[repeat(5,max-content)] lg:gap-x-6 lg:gap-y-8';
const OVERLAY_SWITCH_FRAME_CLASS = 'h-16 w-32 select-none';
const OVERLAY_LANGUAGE_NAV_DELAY_MS = 980;
const OVERLAY_MENU_NAV_DELAY_MS = 980;
const ROUND_GLASS_ITEM = { glassUi: { root: 'rounded-full', inner: 'rounded-full' } };
type MenuCardKey = 'staticCv' | 'mastersCourses' | 'graduationThesis';

const MENU_CARD_DEFS = [
  { key: 'staticCv', href: (lang: Locale) => `/${lang}/` },
  { key: 'mastersCourses', href: (lang: Locale) => `/${lang}/masters-courses` },
  { key: 'graduationThesis', href: (lang: Locale) => `/${lang}/graduation-thesis` }
] as const satisfies ReadonlyArray<{ key: MenuCardKey; href: (lang: Locale) => string; external?: boolean }>;
const SWITCH_COUNT = 2;
const OVERLAY_ITEM_COUNT = SWITCH_COUNT + MENU_CARD_DEFS.length;

const OVERLAY_ITEM_CLASS_NAMES = Array.from({ length: OVERLAY_ITEM_COUNT }, (_, index) => {
  if (index < SWITCH_COUNT) return 'col-span-1 justify-self-start self-start';
  if (index === SWITCH_COUNT) return 'col-start-1';
  return '';
});

const OVERLAY_ITEM_CONFIGS = Array.from({ length: OVERLAY_ITEM_COUNT }, (_, index) => {
  if (index < SWITCH_COUNT) return { ...ROUND_GLASS_ITEM, interactive: index === 0 };
  return {};
});

const NAV_FONT_FAMILY = '"PingFang SC", "Microsoft YaHei", "Source Han Sans SC", "Noto Sans SC", sans-serif';

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

const NAV_TEXT: Record<Locale, NavText> = {
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

const getOverlayCardClass = (isDark: boolean) =>
  `group block h-[92px] w-[148px] max-w-full select-none rounded-[4px] px-3 py-2 md:h-[108px] md:w-[168px] md:px-3.5 md:py-2.5 lg:h-[120px] lg:w-[180px] lg:px-4 lg:py-3 no-underline transition-all duration-200 ${
    isDark ? 'text-white hover:bg-white/8 active:bg-white/12' : 'text-neutral-900 hover:bg-black/6 active:bg-black/10'
  }`;

type OverlayMenuCardProps = {
  title: string;
  emoji: string;
  description?: string;
  href: string;
  isDark: boolean;
  onNavigate: (event: MouseEvent<HTMLAnchorElement>, href: string, external?: boolean) => void;
  external?: boolean;
};

function OverlayMenuCard({ title, emoji, description, href, isDark, onNavigate, external = false }: OverlayMenuCardProps) {
  const titleClass = isDark
    ? 'text-white/95 group-hover:text-white'
    : 'text-neutral-900';
  const descClass = isDark
    ? 'text-white/55 group-hover:text-white/75'
    : 'text-neutral-500 group-hover:text-neutral-700';

  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      onClick={(event) => onNavigate(event, href, external)}
      className={`${getOverlayCardClass(isDark)} flex flex-col items-start justify-start`}
    >
      <div className="flex items-baseline gap-2">
        <span className="text-[16px] leading-tight tracking-wide">{title}</span>
        <span className="text-[16px]" aria-hidden="true">{emoji}</span>
      </div>
      {description && (
        <p className={`mt-1 text-[12px] leading-relaxed md:text-[14px] ${descClass}`}>{description}</p>
      )}
    </a>
  );
}

interface NavBarProps {
  lang: Locale;
}

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => unknown;
};

export default function NavBar({ lang }: NavBarProps) {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [overlayRunKey, setOverlayRunKey] = useState(0);
  const [menuNavigating, setMenuNavigating] = useState(false);
  const alternateLocale = getAlternateLocale(lang);
  const [alternateLocaleHref, setAlternateLocaleHref] = useState(`/${alternateLocale}/`);
  const menuNavigateTimerRef = useRef<number | null>(null);
  const isDark = useThemeMode() === 'dark';
  const text = NAV_TEXT[lang];
  const overlayCards = MENU_CARD_DEFS.map((def) => ({
    ...text[def.key],
    href: def.href(lang),
    external: 'external' in def ? def.external : undefined
  }));

  const clearMenuNavigateTimer = () => {
    if (menuNavigateTimerRef.current !== null) {
      window.clearTimeout(menuNavigateTimerRef.current);
      menuNavigateTimerRef.current = null;
    }
  };

  useEffect(() => {
    setAlternateLocaleHref(getLocaleHrefFromWindow(alternateLocale));
  }, [alternateLocale]);

  useEffect(() => {
    return () => {
      clearMenuNavigateTimer();
    };
  }, []);

  const handleToggleTheme = () => {
    toggleTheme();
  };

  const openOverlay = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    clearMenuNavigateTimer();
    setOverlayRunKey((prev) => prev + 1);
    setMenuNavigating(false);
    setOverlayOpen(true);
  };

  const closeOverlay = () => {
    clearMenuNavigateTimer();
    setMenuNavigating(false);
    setOverlayOpen(false);
  };

  const navigateMenuCard = (event: MouseEvent<HTMLAnchorElement>, href: string, external?: boolean) => {
    if (menuNavigating) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    clearMenuNavigateTimer();
    setMenuNavigating(true);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const delay = reducedMotion ? 0 : OVERLAY_MENU_NAV_DELAY_MS;

    menuNavigateTimerRef.current = window.setTimeout(() => {
      if (external) {
        window.open(href, '_blank', 'noopener,noreferrer');
        closeOverlay();
        return;
      }

      const transitionDoc = document as ViewTransitionDocument;
      if (!reducedMotion && transitionDoc.startViewTransition) {
        transitionDoc.startViewTransition(() => {
          window.location.assign(href);
        });
        return;
      }

      window.location.assign(href);
    }, delay);
  };

  return (
    <>
      <nav
        className="sticky top-0 z-50 grid min-h-16 grid-cols-[auto_1fr_auto] items-center gap-3 px-3 py-2 text-lg font-semibold backdrop-blur-[20px] transition-colors duration-[280ms] sm:px-4 lg:px-6"
        style={{ fontFamily: NAV_FONT_FAMILY }}
      >
        <a
          href={`/${lang}/`}
          className={`select-none transition-colors duration-[280ms] hover:underline ${isDark ? 'text-white/90' : 'text-neutral-900'}`}
        >
          chenyfz.github.io
        </a>
        <div />
        <div className="flex items-center gap-2">
          <LanguageGlassSwitch lang={lang} href={alternateLocaleHref} isDark={isDark} />

          <button
            type="button"
            onClick={openOverlay}
            className={`block cursor-pointer select-none rounded p-1 transition-colors duration-[280ms] ${
              isDark ? 'text-white/85 hover:bg-white/12' : 'text-neutral-700 hover:bg-black/10'
            }`}
            aria-label={text.openMenu}
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
        </div>
      </nav>

      <BulletTimeSlotOverlay
        key={overlayRunKey}
        isOpen={overlayOpen}
        onClose={closeOverlay}
        debug={OVERLAY_DEBUG}
        debugShowLayout={OVERLAY_DEBUG_SHOW_LAYOUT}
        maskTintColor={isDark ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 0.1)'}
        layoutClassName={OVERLAY_LAYOUT_CLASS}
        layoutItemClassNames={OVERLAY_ITEM_CLASS_NAMES}
        itemConfigs={OVERLAY_ITEM_CONFIGS}
      >
        <div className={OVERLAY_SWITCH_FRAME_CLASS}>
          <LanguageGlassSwitch
            lang={lang}
            href={alternateLocaleHref}
            isDark={isDark}
            size="md"
            navigationDelayMs={OVERLAY_LANGUAGE_NAV_DELAY_MS}
            className="h-full w-full"
          />
        </div>
        <div className={OVERLAY_SWITCH_FRAME_CLASS}>
          <ThemeGlassSwitch isDark={isDark} onToggle={handleToggleTheme} className="h-full w-full" />
        </div>

        {overlayCards.map((card) => (
          <OverlayMenuCard
            key={`${card.title}-${card.href}`}
            title={card.title}
            emoji={card.emoji}
            description={card.description}
            href={card.href}
            isDark={isDark}
            onNavigate={navigateMenuCard}
            external={card.external}
          />
        ))}
      </BulletTimeSlotOverlay>
    </>
  );
}
