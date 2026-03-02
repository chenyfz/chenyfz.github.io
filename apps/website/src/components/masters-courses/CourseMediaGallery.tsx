import { useEffect, useState } from 'react';
import type { MastersCourseMediaItem } from '@/i18n/pages/masters-courses/types';
import RichText from '@/components/cv/RichText';
import AnimatedHeight from '@/components/common/AnimatedHeight';

type CourseMediaGalleryProps = {
  items: MastersCourseMediaItem[];
  isDark: boolean;
  expanded: boolean;
  onExpand: () => void;
  practiceText?: string | null;
  showLabel: string;
  closeLabel: string;
};

export default function CourseMediaGallery({
  items,
  isDark,
  expanded,
  onExpand,
  practiceText,
  showLabel,
  closeLabel
}: CourseMediaGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const practicePreview = (practiceText ?? '')
    .replace(/\*\*/g, '')
    .replace(/^\s*-\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveIndex(null);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const activeItem = activeIndex !== null ? items[activeIndex] : null;
  const panelClass = isDark ? 'border-sky-300/25 bg-sky-400/10' : 'border-sky-200 bg-sky-50/75';
  const captionClass = isDark ? 'text-white/65' : 'text-neutral-600';
  const bodyTextClass = isDark ? 'text-white/82' : 'text-neutral-800';
  const buttonClass = isDark
    ? 'bg-white/12 text-white/92 hover:bg-white/20'
    : 'bg-neutral-200 text-neutral-900 hover:bg-neutral-300';

  const imageWidthClass = expanded ? 'w-[200px] max-w-[85vw]' : 'w-[100px] max-w-[40vw]';
  const videoWidthClass = expanded ? 'w-[320px] max-w-[85vw]' : 'w-[178px] max-w-[60vw]';
  const mediaHeightClass = expanded ? 'h-[180px]' : 'h-[100px]';

  return (
    <div
      className={`mt-3 rounded-md border p-3 ${panelClass} ${expanded ? '' : 'cursor-pointer'}`}
      onClick={() => {
        if (!expanded) onExpand();
      }}
    >
      <AnimatedHeight expanded={expanded}>
        {practiceText ? <RichText text={practiceText} isDark={isDark} mode="block" className={bodyTextClass} /> : null}
      </AnimatedHeight>

      {!expanded && practiceText ? (
        <div>
          <p
            className={`leading-relaxed ${bodyTextClass}`}
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {practicePreview}
          </p>
          <div className="mt-2">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onExpand();
              }}
              className={`inline-flex h-7 items-center rounded px-2 text-sm leading-relaxed transition ${buttonClass}`}
            >
              {showLabel}
            </button>
          </div>
        </div>
      ) : null}

      <div className="mt-3 flex flex-wrap items-start gap-3">
        {items.map((item, index) => {
          const itemKey = `${item.type}-${item.src}-${index}`;
          const thumbnailWidthClass = item.type === 'video' ? videoWidthClass : imageWidthClass;
          return (
            <figure key={itemKey} className={`inline-flex flex-col gap-1.5 ${thumbnailWidthClass}`}>
              <button
                type="button"
                className={`rounded-md border border-black/10 bg-black/5 p-1 transition hover:border-[var(--primary-color)]/40 ${thumbnailWidthClass}`}
                onClick={(event) => {
                  event.stopPropagation();
                  setActiveIndex(index);
                }}
              >
                {item.type === 'image' ? (
                  <img
                    src={item.thumbnailSrc ?? item.src}
                    alt={item.alt}
                    className={`${mediaHeightClass} w-full rounded object-cover`}
                    loading="lazy"
                  />
                ) : (
                  <div className={`${mediaHeightClass} w-full overflow-hidden rounded bg-black`}>
                    <video
                      className="h-full w-full object-cover"
                      muted
                      playsInline
                      preload="metadata"
                      src={item.thumbnailSrc ?? item.src}
                    />
                  </div>
                )}
              </button>
              {expanded && item.caption ? (
                <figcaption className={`w-full whitespace-normal break-words text-sm leading-relaxed ${captionClass}`}>
                  {item.caption}
                </figcaption>
              ) : null}
            </figure>
          );
        })}
      </div>

      {activeItem ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 px-4 py-6"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative max-h-full max-w-full"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-0 top-0 z-10 -translate-y-11 rounded bg-white/15 px-3 py-1 text-sm text-white transition hover:bg-white/25"
              onClick={() => setActiveIndex(null)}
            >
              {closeLabel}
            </button>

            {activeItem.type === 'image' ? (
              <img src={activeItem.src} alt={activeItem.alt} className="max-h-[82vh] max-w-[92vw] rounded object-contain" />
            ) : (
              <video
                controls
                autoPlay
                playsInline
                className="max-h-[82vh] max-w-[92vw] rounded bg-black object-contain"
                src={activeItem.src}
              />
            )}

            {activeItem.caption ? <p className="mt-2 max-w-[92vw] text-sm leading-relaxed text-white/85">{activeItem.caption}</p> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
