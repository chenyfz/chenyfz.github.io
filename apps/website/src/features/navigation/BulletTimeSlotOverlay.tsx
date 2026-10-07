import { Children, isValidElement, useEffect, useLayoutEffect, useRef, useState, type ReactElement, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { navigate } from 'astro:transitions/client';
import { shouldAnimateNavigation } from '@/lib/navigation';
import GlassCardContainer from '@/components/common/GlassCardContainer';
import useReducedMotion from '@/hooks/useReducedMotion';
import useModalFocus from '@/hooks/useModalFocus';
import { animateMenu } from './animation';

type ItemConfig = { surface?: 'glass' | 'none'; interactive?: boolean; glassRadius?: number | string };
type Props = {
  isOpen: boolean; keyboardActivated?: boolean; onClose: () => void; children: ReactNode;
  layoutClassName?: string; layoutItemClassNames?: string[]; itemConfigs?: ItemConfig[];
  maskTintColor?: string; debug?: boolean; debugShowLayout?: boolean; label?: string; closeLabel?: string;
};
export default function BulletTimeSlotOverlay({ isOpen, keyboardActivated = false, onClose, children, layoutClassName = 'grid grid-cols-4 gap-4',
  layoutItemClassNames, itemConfigs, maskTintColor = 'rgba(0,0,0,0)', debug = false, debugShowLayout = false,
  label = 'Navigation', closeLabel = 'Close menu' }: Props) {
  const scene = useRef<HTMLElement>(null);
  const mask = useRef<HTMLDivElement>(null);
  const elements = useRef<(HTMLDivElement | null)[]>([]);
  const surfaces = useRef<(HTMLDivElement | null)[]>([]);
  const animation = useRef<ReturnType<typeof animateMenu> | null>(null);
  const close = useRef(onClose); close.current = onClose;
  const reducedMotion = useReducedMotion();
  const staticMenu = reducedMotion || keyboardActivated;
  const keyboardMode = useRef(false);
  const [viewport, setViewport] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const items = Children.toArray(children).filter((child): child is ReactElement => isValidElement(child));
  useEffect(() => {
    if (!isOpen) return;
    const resize = () => setViewport(value => value + 1);
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [isOpen]);
  useLayoutEffect(() => {
    if (!isOpen || !scene.current || !mask.current || !items.length) return;
    setSelected(null);
    if (staticMenu || keyboardMode.current || debug) {
      mask.current.style.backdropFilter = debug ? 'none' : 'blur(9px)';
      mask.current.style.backgroundColor = maskTintColor;
      return;
    }
    const context = gsap.context(() => {
      animation.current = animateMenu(scene.current!, elements.current.filter((el): el is HTMLDivElement => !!el), surfaces.current,
        mask.current!, maskTintColor, () => close.current());
    }, scene);
    return () => { animation.current?.dispose(); animation.current = null; context.revert(); };
  }, [isOpen, items.length, staticMenu, debug, viewport]);
  useEffect(() => {
    if (!isOpen) keyboardMode.current = false;
    if (mask.current) mask.current.style.backgroundColor = maskTintColor;
  }, [isOpen, maskTintColor]);
  const requestClose = () => { if (animation.current) animation.current.release(null, true); else close.current(); };
  useModalFocus(scene, isOpen, reason => reason === 'navigation' ? close.current() : requestClose(),
    undefined, { persistOnLocaleChange: true });
  if (!isOpen || typeof document === 'undefined') return null;
  return createPortal(
    <section ref={scene} id="navigation-overlay" role="dialog" aria-modal="true" aria-label={label} tabIndex={-1}
      className="fixed inset-0 z-[60] select-none overflow-hidden [perspective:1100px]"
      onPointerDownCapture={() => animation.current?.refreshIdleTimeout()}
      onKeyDownCapture={() => { keyboardMode.current = true; animation.current?.keepOpenForKeyboard(); }}
      onPointerDown={event => { if (event.target === event.currentTarget) requestClose(); }}>
      <div ref={mask} className="pointer-events-none absolute inset-0" />
      <button type="button" aria-label={closeLabel} className="navigation-close"
        onClick={requestClose}>×</button>
      <div className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${layoutClassName}`}>
        {items.map((item, index) => (
          <div key={item.key ?? index} ref={el => { elements.current[index] = el; }}
            className={`pointer-events-auto relative [transform-style:preserve-3d] ${layoutItemClassNames?.[index] ?? ''} ${debugShowLayout ? 'outline outline-emerald-300' : ''}`}
            style={{ zIndex: index + 1 }} onClick={event => {
              if (itemConfigs?.[index]?.interactive === false || !((event.target as HTMLElement).closest('a,button'))) return;
              const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a');
              if (link && shouldAnimateNavigation(event, link.target, link.hasAttribute('download'))) {
                event.preventDefault();
                const href = link.href;
                const go = () => { void navigate(href, { sourceElement: link }); };
                if (animation.current) animation.current.release(index, false, go);
                else { close.current(); go(); }
              } else if (!event.defaultPrevented) {
                animation.current?.release(index);
              }
              setSelected(index);
            }}>
            {itemConfigs?.[index]?.surface === 'none' ? item :
              <GlassCardContainer ref={el => { surfaces.current[index] = el; }} highlighted={selected === index}
                radius={itemConfigs?.[index]?.glassRadius ?? 4}>{item}</GlassCardContainer>}
          </div>
        ))}
      </div>
    </section>, document.getElementById('navigation-portal')!
  );
}
