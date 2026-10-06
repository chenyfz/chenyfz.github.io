import { useEffect, useRef } from 'react';
import type { Locale } from '@/i18n/config';
import { t } from '@/i18n/t';
import en from '@/i18n/pages/tender-ai-tool-showcase/en';
import zh from '@/i18n/pages/tender-ai-tool-showcase/zh';
import gsap from 'gsap';
import useReducedMotion from '@/hooks/useReducedMotion';
import PageFrame from '@/components/common/PageFrame';
import MediaFigure from '@/components/media/MediaFigure';

const screenshots = ['/1cAI/error-demo.png', '/1cAI/checked-demo.png', '/1cAI/ui.png'];
export default function TenderAiToolShowcasePage({ lang }: { lang: Locale }) {
  const text = t({ en, zh }, lang);
  const scroll = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    const element = scroll.current;
    if (!element) return;
    let target = element.scrollLeft;
    const onWheel = (event: WheelEvent) => {
      if (window.innerWidth < 1024 || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? element.clientWidth : 1;
      const max = element.scrollWidth - element.clientWidth;
      if (max <= 0 || (event.deltaY > 0 && target >= max) || (event.deltaY < 0 && target <= 0)) return;
      event.preventDefault();
      target = Math.max(0, Math.min(max, target + event.deltaY * unit));
      gsap.to(element, { scrollLeft: target, duration: reducedMotion ? 0 : .35, ease: 'power3.out', overwrite: 'auto' });
    };
    const sync = () => { if (!gsap.isTweening(element)) target = element.scrollLeft; };
    element.addEventListener('wheel', onWheel, { passive: false });
    element.addEventListener('scroll', sync, { passive: true });
    return () => { element.removeEventListener('wheel', onWheel); element.removeEventListener('scroll', sync); gsap.killTweensOf(element); };
  }, [reducedMotion]);
  return <PageFrame lang={lang} title={text.caption} variant="showcase">
    <div ref={scroll} className="tender-scroll" role="region" tabIndex={0} aria-label={text.caption}>
      <div>{screenshots.map((src, index) => <MediaFigure key={src} lang={lang}
        item={{ type: 'image', src, alt: `${text.caption} (${index + 1} / ${screenshots.length})` }} frameClassName="" />)}</div>
    </div>
  </PageFrame>;
}
