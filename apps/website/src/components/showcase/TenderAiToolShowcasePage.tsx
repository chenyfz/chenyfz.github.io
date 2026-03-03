import { useEffect, useRef } from 'react';
import type { Locale } from '@/i18n/config';
import { t } from '@/i18n/t';
import tenderAiToolShowcaseEn from '@/i18n/pages/tender-ai-tool-showcase/en';
import tenderAiToolShowcaseZh from '@/i18n/pages/tender-ai-tool-showcase/zh';
import gsap from 'gsap';
import useThemeMode from '@/hooks/useThemeMode';
import {
  StaticCvFontFace,
  getStaticCvBodyFontFamily
} from '@/components/cv/StaticCvTypography';

interface TenderAiToolShowcasePageProps {
  lang: Locale;
}

export default function TenderAiToolShowcasePage({ lang }: TenderAiToolShowcasePageProps) {
  const isDark = useThemeMode() === 'dark';
  const bodyFontFamily = getStaticCvBodyFontFamily(lang);
  const text = t({ en: tenderAiToolShowcaseEn, zh: tenderAiToolShowcaseZh }, lang);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const onWheel = (event: WheelEvent) => {
      if (window.innerWidth < 1024) return;
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

      const max = element.scrollWidth - element.clientWidth;
      if (max <= 0) return;

      event.preventDefault();
      const next = Math.max(0, Math.min(max, element.scrollLeft + event.deltaY));
      gsap.to(element, {
        scrollLeft: next,
        duration: 0.4,
        ease: 'power3.out',
        overwrite: 'auto'
      });
    };

    element.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      element.removeEventListener('wheel', onWheel);
    };
  }, []);

  const cards = [
    { key: 'error', src: '/1cAI/error-demo.png' },
    { key: 'checked', src: '/1cAI/checked-demo.png' },
    { key: 'ui', src: '/1cAI/ui.png' }
  ] as const;

  return (
    <>
      <StaticCvFontFace lang={lang} />
      <main
        className={`relative h-[calc(100vh-4rem)] px-4 py-6 sm:px-5 sm:py-8 ${isDark ? 'text-white' : 'text-neutral-900'}`}
        style={{ fontFamily: bodyFontFamily }}
      >
        <p
          className={`pointer-events-none absolute bottom-10 left-1/2 z-20 -translate-x-1/2 text-[18px] sm:bottom-12 ${isDark ? 'text-white/92' : 'text-neutral-800'}`}
          style={{ fontFamily: '"SimHei", "Heiti SC", "Microsoft YaHei", sans-serif' }}
        >
          {text.caption}
        </p>

        <div className="mx-auto flex h-full w-full max-w-none flex-col justify-center">
          <div
            ref={scrollRef}
            className="min-h-0 flex-1 overflow-x-auto overflow-y-hidden [scrollbar-width:thin]"
          >
            <div className="flex h-full w-max items-center gap-5 px-2 lg:gap-6 lg:px-4">
              {cards.map((card, index) => (
                <img
                  key={card.key}
                  src={card.src}
                  alt="1cAI product screenshot"
                  className={`h-auto shrink-0 border-white ${
                    index === cards.length - 1
                      ? 'w-[min(95vw,1200px)] lg:w-[1200px] lg:min-w-[600px]'
                      : index === 1
                      ? 'w-[min(88vw,700px)] lg:w-[700px] lg:min-w-[700px]'
                      : 'w-[min(92vw,980px)] lg:min-w-[600px]'
                  } ${index === 0 ? 'border-y-[16px] border-x-0' : 'border-[16px]'}`}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
