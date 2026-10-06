import { useRef, useState } from 'react';
import type { Locale } from '@/i18n/config';
import MediaAsset from './MediaAsset';
import MediaViewer from './MediaViewer';
import type { MediaItem } from './types';
import AnimatedHeight from '@/components/common/AnimatedHeight';

export default function MediaGallery({ items, lang, detailsOpen = true }:
  { items: readonly MediaItem[]; lang: Locale; detailsOpen?: boolean }) {
  const [index, setIndex] = useState<number | null>(null);
  const trigger = useRef<HTMLElement>(null);
  return <>
    <div className="media-gallery">
      {items.map((item, i) => <figure key={item.src}>
        <button type="button" aria-label={item.alt} onClick={event => { trigger.current = event.currentTarget; setIndex(i); }}>
          <MediaAsset key={item.src} item={item} lang={lang} preview frameClassName="aspect-[4/3]"
            className="h-full w-full object-cover" />
        </button>
        {item.caption && <figcaption className="page-muted"><AnimatedHeight expanded={detailsOpen}>{item.caption}</AnimatedHeight></figcaption>}
      </figure>)}
    </div>
    <MediaViewer items={items} index={index} lang={lang} onChange={setIndex} onClose={() => setIndex(null)} returnFocus={trigger} />
  </>;
}
