import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, MouseEvent } from 'react';
import type { Locale } from '@/i18n/config';
import { getAlternateLocale } from '@/i18n/locale-switch';

type LanguageGlassSwitchProps = {
  lang: Locale;
  href: string;
  isDark: boolean;
  size?: 'sm' | 'md';
  navigationDelayMs?: number;
  className?: string;
};

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => unknown;
};

const MOTION_MS = 220;
const BASE_CLASS =
  'relative inline-block rounded-full border font-semibold transition-colors duration-300';

const SIZE_CONFIG = {
  sm: {
    shellClass: 'h-8 w-[66px] shrink-0',
    labelClass: 'text-[11px]'
  },
  md: {
    shellClass: 'h-full w-full',
    labelClass: 'text-base'
  }
} as const;

const SIZE_PADDING_PX = {
  sm: 4,
  md: 8
} as const;

export default function LanguageGlassSwitch({
  lang,
  href,
  isDark,
  size = 'sm',
  navigationDelayMs = MOTION_MS,
  className = ''
}: LanguageGlassSwitchProps) {
  const [displayLocale, setDisplayLocale] = useState<Locale>(lang);
  const [isNavigating, setIsNavigating] = useState(false);
  const navigateTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setDisplayLocale(lang);
    setIsNavigating(false);
  }, [lang]);

  useEffect(() => {
    return () => {
      if (navigateTimerRef.current !== null) {
        window.clearTimeout(navigateTimerRef.current);
      }
    };
  }, []);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (isNavigating) {
      event.preventDefault();
      return;
    }

    event.preventDefault();

    const nextLocale = getAlternateLocale(displayLocale);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    setDisplayLocale(nextLocale);
    setIsNavigating(true);

    const navigateToHref = () => {
      const transitionDoc = document as ViewTransitionDocument;
      if (!reducedMotion && transitionDoc.startViewTransition) {
        transitionDoc.startViewTransition(() => {
          window.location.assign(href);
        });
        return;
      }
      window.location.assign(href);
    };

    navigateTimerRef.current = window.setTimeout(() => {
      navigateToHref();
    }, reducedMotion ? 0 : navigationDelayMs);
  };

  const switchToLabel = displayLocale === 'zh' ? '切换到英文' : 'Switch to Chinese';
  const targetLang = getAlternateLocale(lang);
  const sizeConfig = SIZE_CONFIG[size];
  const cssVars = {
    '--language-switch-padding': `${SIZE_PADDING_PX[size]}px`
  } as CSSProperties;
  const trackFrameStyle = {
    left: 'var(--language-switch-padding)',
    top: 'var(--language-switch-padding)',
    width: 'calc(100% - (var(--language-switch-padding) * 2))',
    height: 'calc(100% - (var(--language-switch-padding) * 2))'
  } as const;
  const thumbTransform =
    displayLocale === 'zh'
      ? 'translateX(100%)'
      : 'translateX(0px)';

  return (
    <a
      href={href}
      lang={targetLang}
      role="switch"
      aria-checked={displayLocale === 'zh'}
      aria-label={switchToLabel}
      onClick={handleClick}
      style={cssVars}
      className={`${BASE_CLASS} ${sizeConfig.shellClass} ${
        isDark
          ? 'border-white/20 bg-gradient-to-b from-white/14 to-white/6 text-white/85'
          : 'border-white/50 bg-gradient-to-b from-white/40 to-stone-200/20 text-neutral-700 shadow-[0_8px_14px_rgba(88,92,98,0.16)]'
      } ${className}`}
    >
      <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-white/18 to-white/0" />
      <span
        style={{
          ...trackFrameStyle,
          width: 'calc((100% - (var(--language-switch-padding) * 2)) / 2)',
          transform: thumbTransform
        }}
        className={`pointer-events-none absolute rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.22)] transition-transform duration-300 ease-out ${
          isDark ? 'bg-slate-900/75' : 'bg-white/88'
        }`}
      />
      <span
        style={trackFrameStyle}
        className="pointer-events-none absolute z-10 grid grid-cols-2"
      >
        <span
          className={`flex items-center justify-center leading-none transition-colors duration-200 ${sizeConfig.labelClass} ${
            displayLocale === 'en' ? 'text-current' : 'text-current/60'
          }`}
        >
          EN
        </span>
        <span
          className={`flex items-center justify-center leading-none transition-colors duration-200 ${sizeConfig.labelClass} ${
            displayLocale === 'zh' ? 'text-current' : 'text-current/60'
          }`}
        >
          中
        </span>
      </span>
    </a>
  );
}
