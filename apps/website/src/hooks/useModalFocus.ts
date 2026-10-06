import { useEffect, useEffectEvent, type RefObject } from 'react';
import { flushSync } from 'react-dom';
import type { TransitionBeforePreparationEvent } from 'astro:transitions/client';
import { isLocaleNavigation } from '@/i18n/locale-switch';

const focusables = 'a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex="0"]';
/** Owns keyboard focus, background inertness and scroll lock for a body portal. */
export default function useModalFocus(ref: RefObject<HTMLElement | null>, open: boolean, onClose: (reason: 'dismiss' | 'navigation') => void,
  returnFocus?: RefObject<HTMLElement | null>, { persistOnLocaleChange = false }: { persistOnLocaleChange?: boolean } = {}) {
  const close = useEffectEvent(onClose);
  useEffect(() => {
    const dialog = ref.current;
    if (!open || !dialog) return;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const overflow = document.body.style.overflow;
    const background = new Map<HTMLElement, boolean>();
    const unlockBackground = () => {
      background.forEach((inert, element) => { element.inert = inert; });
      document.body.style.overflow = overflow;
    };
    const lockBackground = () => {
      if (!dialog.isConnected) return;
      // Repeated locale swaps replace page nodes while this dialog stays mounted.
      background.forEach((_, element) => { if (!element.isConnected) background.delete(element); });
      for (const element of document.body.children) {
        if (!(element instanceof HTMLElement) || element === dialog || element.contains(dialog)) continue;
        if (!background.has(element)) background.set(element, element.inert);
        element.inert = true;
      }
      document.body.style.overflow = 'hidden';
    };
    lockBackground();
    const getTargets = () => [...dialog.querySelectorAll<HTMLElement>(focusables)].filter((el) => !el.closest('[inert]'));
    (getTargets()[0] ?? dialog).focus({ preventScroll: true });
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); close('dismiss'); }
      if (event.key !== 'Tab') return;
      const targets = getTargets();
      const first = targets[0] ?? dialog;
      const last = targets.at(-1) ?? dialog;
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    };
    dialog.addEventListener('keydown', keydown);
    const beforeNavigation = (event: TransitionBeforePreparationEvent) => {
      if (!persistOnLocaleChange || event.navigationType === 'traverse' || !isLocaleNavigation(event.from, event.to)) {
        // Finish modal cleanup before Astro moves persisted DOM into the next page.
        flushSync(() => close('navigation'));
      }
    };
    document.addEventListener('astro:before-preparation', beforeNavigation);
    if (persistOnLocaleChange) document.addEventListener('astro:after-swap', lockBackground);
    return () => {
      dialog.removeEventListener('keydown', keydown);
      document.removeEventListener('astro:before-preparation', beforeNavigation);
      document.removeEventListener('astro:after-swap', lockBackground);
      unlockBackground();
      background.clear();
      const target = returnFocus?.current ?? (previous?.isConnected ? previous : null);
      target?.focus({ preventScroll: true });
    };
  }, [open, ref, returnFocus, persistOnLocaleChange]);
}
