import { useRef, useState } from 'react';
import type { Locale } from '@/i18n/config';
import MediaAsset from './MediaAsset';
import MediaViewer from './MediaViewer';
import type { MediaItem } from './types';

export default function MediaFigure({ item, lang, frameClassName = 'aspect-video', className = '' }:
  { item: MediaItem; lang: Locale; frameClassName?: string; className?: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const open = () => { video.current?.pause(); setIndex(0); };
  return <figure className={`media-figure ${className}`}>
    {item.type === 'image' ? <button ref={trigger} type="button" className="media-image-trigger"
      aria-label={`${lang === 'zh' ? '放大查看' : 'Enlarge'}: ${item.alt}`} onClick={open}>
      <MediaAsset key={item.src} item={item} lang={lang} frameClassName={frameClassName} retryEnabled={false} />
    </button> : <>
      <MediaAsset key={item.src} item={item} lang={lang} frameClassName={frameClassName} videoRef={video} />
      <button ref={trigger} type="button" className="media-expand" onClick={open}>
        {lang === 'zh' ? '全屏查看' : 'View full screen'} ↗
      </button>
    </>}
    {item.caption && <figcaption className="page-muted">{item.caption}</figcaption>}
    <MediaViewer items={[item]} index={index} lang={lang} onChange={setIndex} onClose={() => setIndex(null)} returnFocus={trigger} />
  </figure>;
}
