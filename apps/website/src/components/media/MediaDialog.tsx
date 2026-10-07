import { useCallback, useLayoutEffect, useRef, type KeyboardEventHandler, type ReactNode, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import type { Locale } from '@/i18n/config';
import useModalFocus from '@/hooks/useModalFocus';

type Props = {
  lang: Locale;
  label: string;
  id?: string;
  className?: string;
  dialogRef?: RefObject<HTMLDivElement | null>;
  returnFocus: RefObject<HTMLElement | null>;
  onClose: () => void;
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
  children: (dismiss: () => void) => ReactNode;
};

/** Keeps focus and scroll locked until the closing animation finishes. */
export default function MediaDialog({ lang, label, id, className = '', dialogRef, returnFocus, onClose, onKeyDown, children }: Props) {
  const ownRef = useRef<HTMLDivElement>(null);
  const dialog = dialogRef ?? ownRef;
  const backdrop = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const animation = useRef<gsap.core.Timeline | null>(null);
  const closing = useRef(false);
  const finish = useRef(onClose);
  useLayoutEffect(() => { finish.current = onClose; }, [onClose]);
  const dismiss = useCallback(() => {
    if (closing.current || !dialog.current) return;
    closing.current = true;
    animation.current?.kill();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    gsap.set(dialog.current, { pointerEvents: 'none' });
    animation.current = gsap.timeline({ onComplete: () => finish.current() })
      .to(closeButton.current, { opacity: 0, duration: .08, ease: 'none' }, 0)
      .to(content.current, { opacity: 0, duration: reduced ? .08 : .14, ease: 'power1.out' }, 0)
      .to(backdrop.current, { opacity: 0, duration: reduced ? .08 : .22, ease: 'power2.out' }, reduced ? 0 : .04);
  }, [dialog]);
  useModalFocus(dialog, true, reason => reason === 'navigation' ? finish.current() : dismiss(), returnFocus);
  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    closing.current = false;
    // Fade attention between the page and the media without moving the viewing surface.
    animation.current = gsap.timeline()
      .fromTo(backdrop.current, { opacity: 0 }, { opacity: 1, duration: reduced ? .08 : .3, ease: 'power2.out' }, 0)
      .fromTo(content.current, { opacity: 0 }, { opacity: 1, duration: reduced ? .08 : .24, ease: 'power2.out' }, reduced ? 0 : .04)
      .fromTo(closeButton.current, { opacity: 0 }, { opacity: 1, duration: reduced ? .08 : .18, ease: 'power2.out' }, reduced ? 0 : .12);
    return () => { animation.current?.kill(); };
  }, [dialog]);
  if (typeof document === 'undefined') return null;
  return createPortal(<div ref={dialog} id={id} lang={lang} className={`media-viewer ${className}`}
    role="dialog" aria-modal="true" aria-label={label} tabIndex={-1}
    onClick={event => { if ([event.currentTarget, content.current, backdrop.current].includes(event.target as HTMLDivElement)) dismiss(); }}
    onKeyDown={event => { if (!closing.current) onKeyDown?.(event); }}>
    <div ref={backdrop} className="media-dialog-backdrop" aria-hidden="true" />
    <div ref={content} className="media-dialog-content">{children(dismiss)}</div>
    <button ref={closeButton} type="button" className="media-dialog-close" onClick={dismiss}
      aria-label={lang === 'zh' ? '关闭预览' : 'Close preview'}>
      <svg aria-hidden="true" focusable="false" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="m6 6 12 12M18 6 6 18" />
      </svg>
    </button>
  </div>, document.body);
}
