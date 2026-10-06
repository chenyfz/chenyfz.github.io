import { useEffect, useRef, useState } from 'react';
import useReducedMotion from '@/hooks/useReducedMotion';
import type { createAnniversaryScene } from '@/features/anniversary/scene';

export default function WechatAnniversaryAnimation({ className = '' }: { className?: string }) {
  const mount = useRef<HTMLDivElement>(null);
  const controller = useRef<ReturnType<typeof createAnniversaryScene> | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [attempt, setAttempt] = useState(0);
  const reducedMotion = useReducedMotion();
  const preference = useRef(reducedMotion); preference.current = reducedMotion;
  useEffect(() => { controller.current?.setReducedMotion(reducedMotion); }, [reducedMotion]);
  useEffect(() => {
    const element = mount.current;
    if (!element) return;
    let disposed = false;
    let visible = false;
    let starting = false;
    setStatus('loading');
    const observer = new IntersectionObserver(async ([entry]) => {
      visible = entry.isIntersecting;
      if (controller.current) { controller.current.setActive(visible); return; }
      if (!visible || starting) return;
      starting = true;
      try {
        const { createAnniversaryScene } = await import('@/features/anniversary/scene');
        if (disposed) return;
        const scene = createAnniversaryScene(element, { reducedMotion: preference.current });
        controller.current = scene;
        scene.setActive(visible);
        await scene.ready;
        if (!disposed) setStatus('ready');
      } catch (error) {
        if (!disposed) { controller.current?.dispose(); controller.current = null; setStatus('error'); console.error('Anniversary animation failed', error); }
      }
    }, { rootMargin: '100px' });
    observer.observe(element);
    return () => { disposed = true; observer.disconnect(); controller.current?.dispose(); controller.current = null; };
  }, [attempt]);
  return (
    <div className={`relative mx-auto aspect-square w-full max-w-[26rem] overflow-hidden rounded-xl border border-black/10 dark:border-white/12 ${className}`}>
      <div ref={mount} className="h-full w-full" role="button" tabIndex={0} aria-label="Toggle WeChat anniversary 3D animation"
        aria-busy={status === 'loading'} onKeyDown={event => {
          if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); controller.current?.toggle(); }
        }} />
      {status === 'error' && <div role="status" className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center text-sm">
        <span>3D 暂不可用 / 3D unavailable</span><button type="button" className="underline" onClick={() => setAttempt(value => value + 1)}>重试 / Retry</button>
      </div>}
    </div>
  );
}
