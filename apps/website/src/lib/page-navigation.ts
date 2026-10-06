import type { TransitionBeforePreparationEvent, TransitionBeforeSwapEvent } from 'astro:transitions/client';
import { getThemeSnapshot } from '@/styles/theme';
import { isLocaleNavigation } from '@/i18n/locale-switch';
import type { TransitionMotion } from '@/lib/transition-motion';

const contentPath = (url: URL) => url.pathname.replace(/^\/(en|zh)(?=\/|$)/, '');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let cancelNavigation = () => {};
let cancelAnimation = () => {};

// Theme must also survive swaps without an animated navigation.
document.addEventListener('astro:before-swap', (event: TransitionBeforeSwapEvent) => {
  event.newDocument.documentElement.dataset.theme = getThemeSnapshot();
});
reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) cancelAnimation(); });

document.addEventListener('astro:before-preparation', (event: TransitionBeforePreparationEvent) => {
  cancelNavigation();
  const languageChange = isLocaleNavigation(event.from, event.to);
  const pageChange = contentPath(event.from) !== contentPath(event.to);
  const traverse = event.navigationType === 'traverse';
  const scroll = languageChange && !event.to.hash && !traverse ? { x: scrollX, y: scrollY } : null;
  const animate = (languageChange || pageChange) && !traverse;
  let motion: TransitionMotion | null = null;
  let disposed = false;
  let pageLoaded = false;
  let stopWaiting = () => {};

  const restoreScroll = () => {
    if (scroll) window.scrollTo({ left: scroll.x, top: scroll.y, behavior: 'instant' });
  };
  const dispose = () => {
    if (disposed) return;
    disposed = true;
    stopWaiting();
    stopWaiting = () => {};
    motion?.dispose(); motion = null;
    event.signal.removeEventListener('abort', dispose);
    document.removeEventListener('astro:before-swap', beforeSwap);
    document.removeEventListener('astro:after-swap', afterSwap);
    document.removeEventListener('astro:page-load', pageLoad);
    if (cancelNavigation === dispose) cancelNavigation = () => {};
    if (cancelAnimation === finishAnimation) cancelAnimation = () => {};
  };
  const finishAnimation = () => {
    if (disposed) return;
    stopWaiting();
    stopWaiting = () => {};
    motion?.dispose(); motion = null;
    if (pageLoaded) dispose();
  };
  const beforeSwap = (swap: TransitionBeforeSwapEvent) => {
    if (motion && pageChange) swap.newDocument.documentElement.dataset.pageTransition = 'active';
  };
  const afterSwap = () => {
    restoreScroll();
    if (!motion) return;
    const current = motion;
    const locale = document.documentElement.lang;
    let started = false;
    let frame = 0;
    const start = () => {
      // Both persisted islands must commit before foreground and background animate together.
      if (disposed || started || !['main', '.site-nav'].every(selector =>
        document.querySelector(selector)?.getAttribute('lang') === locale)) return;
      started = true;
      observer.disconnect();
      frame = requestAnimationFrame(async () => {
        if (disposed || motion !== current) return;
        restoreScroll();
        try { await current.enter(); }
        catch { /* Readable content takes priority over optional motion. */ }
        finally { finishAnimation(); }
      });
    };
    const observer = new MutationObserver(start);
    observer.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['lang'] });
    // A failed hydration must never leave content hidden.
    const timeout = window.setTimeout(finishAnimation, 2000);
    stopWaiting = () => { observer.disconnect(); cancelAnimationFrame(frame); clearTimeout(timeout); };
    start();
  };
  const pageLoad = () => {
    restoreScroll();
    pageLoaded = true;
    if (pageChange && !traverse) document.getElementById('page-content')?.focus({ preventScroll: true });
    if (!motion) dispose();
  };
  cancelNavigation = dispose;
  cancelAnimation = finishAnimation;
  event.signal.addEventListener('abort', dispose, { once: true });
  document.addEventListener('astro:before-swap', beforeSwap);
  document.addEventListener('astro:after-swap', afterSwap);
  document.addEventListener('astro:page-load', pageLoad);

  const load = event.loader;
  event.loader = async () => {
    try { await load(); }
    catch (error) { dispose(); throw error; }
    if (disposed || event.signal.aborted || event.defaultPrevented) { dispose(); return; }
    const lang = event.newDocument.documentElement.lang;
    const families = lang === 'zh'
      ? ['400 20px StaticCvOppoSans', '400 18px StaticCvFangsong']
      : ['400 20px "Google Sans"', '500 20px "Google Sans"', '400 18px Newsreader', '500 18px Newsreader'];
    const text = event.newDocument.querySelector('main')?.textContent ?? '';
    const animation = !animate || reducedMotion.matches ? Promise.resolve(null) : languageChange
      ? import('@/features/language/transition').then(module => module.createLanguageTransition).catch(() => null)
      : import('@/features/navigation/page-transition').then(module => module.createPageTransition).catch(() => null);
    await Promise.all(families.map(font => document.fonts.load(font, text).catch(() => [])));
    const create = await animation;
    if (disposed || !create || reducedMotion.matches || event.signal.aborted || event.defaultPrevented ||
      !document.querySelector('main') || !event.newDocument.querySelector('main')) return;
    motion = create(event.signal);
    try { await motion.leave(); }
    catch { finishAnimation(); }
  };
});
