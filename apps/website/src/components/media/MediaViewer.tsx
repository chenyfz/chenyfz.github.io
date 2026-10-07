import { useEffect, useRef, type RefObject } from 'react';
import type { Locale } from '@/i18n/config';
import MediaDialog from './MediaDialog';
import MediaAsset from './MediaAsset';
import ZoomableImage from './ZoomableImage';
import type { MediaItem } from './types';

type Props = {
  items: readonly MediaItem[];
  index: number | null;
  lang: Locale;
  onClose: () => void;
  onChange: (index: number) => void;
  returnFocus: RefObject<HTMLElement | null>;
  showOriginal?: boolean;
  id?: string;
};

export default function MediaViewer({ items, index, lang, onClose, onChange, returnFocus, showOriginal = false, id }: Props) {
  const dialog = useRef<HTMLDivElement>(null);
  const dismissAfter = useRef(0);
  const item = index === null ? null : items[index];
  useEffect(() => {
    if (item?.type === 'image') dialog.current?.querySelector<HTMLElement>('.image-zoom')?.focus({ preventScroll: true });
  }, [item]);
  if (!item || index === null || typeof document === 'undefined') return null;
  const move = (direction: number) => {
    dismissAfter.current = performance.now() + 200;
    onChange((index + direction + items.length) % items.length);
  };
  return <MediaDialog dialogRef={dialog} id={id} lang={lang} label={item.alt}
    className={item.type === 'image' ? 'media-viewer--image' : ''} returnFocus={returnFocus} onClose={onClose}
    onKeyDown={event => {
      if (event.defaultPrevented || (event.target as HTMLElement).closest('video') || items.length < 2) return;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault(); move(event.key === 'ArrowLeft' ? -1 : 1);
      }
    }}>
    {dismiss => item.type === 'image' ? <ZoomableImage key={item.src} item={item} lang={lang} inset={16}
      onDismiss={() => { if (performance.now() >= dismissAfter.current) dismiss(); }} onNavigate={items.length > 1 ? move : undefined} /> : <div className="media-viewer-panel">
      <div className="media-viewer-toolbar">
        <p aria-live="polite">{item.alt} {items.length > 1 && <span>({index + 1} / {items.length})</span>}</p>
      </div>
      <MediaAsset key={item.src} item={item} lang={lang} autoPlay frameClassName="media-viewer-asset" />
      <div className="media-viewer-footer">
        {items.length > 1 && <button type="button" aria-label={lang === 'zh' ? '上一项' : 'Previous media'} onClick={() => move(-1)}>←</button>}
        <p>{item.caption}{showOriginal && <a className="underline" href={item.src} target="_blank" rel="noreferrer">{lang === 'zh' ? '打开原图 ↗' : 'Open original ↗'}</a>}</p>
        {items.length > 1 && <button type="button" aria-label={lang === 'zh' ? '下一项' : 'Next media'} onClick={() => move(1)}>→</button>}
      </div>
    </div>}
  </MediaDialog>;
}
