import { useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
import type { Locale } from '@/i18n/config';
import { getAlternateLocale, getLocaleHrefFromWindow } from '@/i18n/locale-switch';
import BulletTimeSlotOverlay from '@/features/navigation/BulletTimeSlotOverlay';
import ThemeGlassSwitch from '@/features/navigation/ThemeGlassSwitch';
import LanguageGlassSwitch from '@/features/navigation/LanguageGlassSwitch';
import LanguageMotionText from '@/features/language/LanguageMotionText';
import useThemeMode from '@/hooks/useThemeMode';
import { toggleTheme } from '@/styles/theme';

import { OVERLAY_DEBUG, OVERLAY_DEBUG_SHOW_LAYOUT, OVERLAY_LAYOUT_CLASS, OVERLAY_SWITCH_FRAME_CLASS, MENU_CARD_DEFS, OVERLAY_ITEM_CLASS_NAMES, OVERLAY_ITEM_CONFIGS, NAV_TEXT } from '@/features/navigation/config';

type OverlayMenuCardProps = { title: string; emoji: string; description?: string; href: string };

function OverlayMenuCard({ title, emoji, description, href }: OverlayMenuCardProps) {
  return <a href={href} className="menu-card">
    <div className="menu-card-title"><LanguageMotionText text={title} /><span aria-hidden="true">{emoji}</span></div>
    {description && <p><LanguageMotionText text={description} subtle /></p>}
  </a>;
}

interface NavBarProps {
  lang: Locale;
  alternateHref: string;
}

export default function NavBar({ lang, alternateHref }: NavBarProps) {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [keyboardActivated, setKeyboardActivated] = useState(false);
  const [overlayRunKey, setOverlayRunKey] = useState(0);
  const alternateLocale = getAlternateLocale(lang);
  const [alternateLocaleHref, setAlternateLocaleHref] = useState(alternateHref);
  const isDark = useThemeMode() === 'dark';
  const text = NAV_TEXT[lang];
  const overlayCards = MENU_CARD_DEFS.map((def) => ({
    ...text[def.key],
    id: def.key,
    href: def.href(lang)
  }));

  useEffect(() => {
    const update = () => setAlternateLocaleHref(getLocaleHrefFromWindow(alternateLocale));
    update();
    document.addEventListener('astro:page-load', update);
    window.addEventListener('hashchange', update);
    window.addEventListener('popstate', update);
    return () => {
      document.removeEventListener('astro:page-load', update);
      window.removeEventListener('hashchange', update);
      window.removeEventListener('popstate', update);
    };
  }, [alternateLocale]);

  const openOverlay = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setOverlayRunKey((prev) => prev + 1);
    setKeyboardActivated(event.detail === 0);
    setOverlayOpen(true);
  };

  return (
    <>
      <nav className="site-nav" lang={lang}>
        <a
          href={`/${lang}/`}
          className="site-brand"
        >
          chenyfz.github.io
        </a>
        <div />
        <div className="flex items-center gap-2">
          <LanguageGlassSwitch lang={lang} href={alternateLocaleHref} />

          <button
            type="button"
            onClick={openOverlay}
            className="site-menu-trigger"
            aria-label={text.openMenu}
            aria-expanded={overlayOpen}
            aria-controls="navigation-overlay"
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
        keyboardActivated={keyboardActivated}
        label={text.openMenu}
        closeLabel={lang === 'zh' ? '关闭菜单' : 'Close menu'}
        onClose={() => setOverlayOpen(false)}
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
            size="md"
            className="h-full w-full"
          />
        </div>
        <div className={OVERLAY_SWITCH_FRAME_CLASS}>
          <ThemeGlassSwitch isDark={isDark} onToggle={toggleTheme} className="h-full w-full" />
        </div>

        {overlayCards.map((card) => (
          <OverlayMenuCard
            key={card.id}
            title={card.title}
            emoji={card.emoji}
            description={card.description}
            href={card.href}
          />
        ))}
      </BulletTimeSlotOverlay>
    </>
  );
}
