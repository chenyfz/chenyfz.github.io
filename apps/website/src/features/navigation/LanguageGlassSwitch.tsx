import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import gsap from 'gsap';
import { navigate } from 'astro:transitions/client';
import type { Locale } from '@/i18n/config';
import { getAlternateLocale, getLocaleHrefFromWindow } from '@/i18n/locale-switch';
import { shouldAnimateNavigation } from '@/lib/navigation';
import useReducedMotion from '@/hooks/useReducedMotion';
import { motionDuration } from '@/lib/motion';

type Props = { lang: Locale; href: string; size?: 'sm' | 'md'; className?: string };

export default function LanguageGlassSwitch({ lang, href, size = 'sm', className = '' }: Props) {
  const [displayLocale, setDisplayLocale] = useState(lang);
  const [busy, setBusy] = useState(false);
  const pending = useRef(false);
  const thumb = useRef<HTMLSpanElement>(null);
  const initialLocale = useRef(lang);
  const reducedMotion = useReducedMotion();
  const targetLang = getAlternateLocale(lang);
  useEffect(() => { setDisplayLocale(lang); }, [lang]);
  useLayoutEffect(() => {
    const tween = gsap.to(thumb.current, { '--switch-position': displayLocale === 'zh' ? 1 : 0,
      duration: reducedMotion ? 0 : motionDuration('control'), ease: 'power3.inOut', overwrite: true });
    return () => { tween.kill(); };
  }, [displayLocale, reducedMotion]);
  const handleClick = async (event: MouseEvent<HTMLAnchorElement>) => {
    // The URL can commit before this persisted island receives its new props.
    const nextLocale = getAlternateLocale(document.documentElement.lang === 'zh' ? 'zh' : 'en');
    const currentHref = getLocaleHrefFromWindow(nextLocale);
    event.currentTarget.href = currentHref;
    if (!shouldAnimateNavigation(event)) return;
    event.preventDefault();
    if (pending.current) return;
    pending.current = true; setBusy(true); setDisplayLocale(nextLocale);
    try { await navigate(currentHref, { sourceElement: event.currentTarget }); }
    finally {
      pending.current = false; setBusy(false);
      setDisplayLocale(document.documentElement.lang === 'zh' ? 'zh' : 'en');
    }
  };
  return <a href={href} lang={targetLang} hrefLang={targetLang === 'zh' ? 'zh-CN' : 'en'}
    aria-label={lang === 'zh' ? '切换到英文' : 'Switch to Chinese'} aria-busy={busy || undefined}
    onClick={handleClick} className={`language-switch language-switch--${size} ${className}`}>
    <span className="glass-switch-shine" />
    <span ref={thumb} className="glass-switch-thumb"
      style={{ '--switch-position': initialLocale.current === 'zh' ? 1 : 0 } as CSSProperties} />
    <span className="glass-switch-labels">
      <span data-active={displayLocale === 'en'}>EN</span>
      <span data-active={displayLocale === 'zh'}>中</span>
    </span>
  </a>;
}
