import { useRef, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import type { Locale } from '@/i18n/config';
import useModalFocus from '@/hooks/useModalFocus';
import MediaAsset from './MediaAsset';
import type { MediaItem } from './types';

type Props = {
  items: readonly MediaItem[];
  index: number | null;
  lang: Locale;
  onClose: () => void;
  onChange: (index: number) => void;
  returnFocus: RefObject<HTMLElement | null>;
};

export default function MediaViewer({ items, index, lang, onClose, onChange, returnFocus }: Props) {
  const dialog = useRef<HTMLDivElement>(null);
  const item = index === null ? null : items[index];
  useModalFocus(dialog, !!item, onClose, returnFocus);
  if (!item || index === null || typeof document === 'undefined') return null;
  const move = (direction: number) => onChange((index + direction + items.length) % items.length);
  return createPortal(<div ref={dialog} className="media-viewer" role="dialog" aria-modal="true"
    aria-label={item.alt} tabIndex={-1}
    onClick={event => { if (event.target === event.currentTarget) onClose(); }}
    onKeyDown={event => {
      if ((event.target as HTMLElement).closest('video') || items.length < 2) return;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault(); move(event.key === 'ArrowLeft' ? -1 : 1);
      }
    }}>
    <div className="media-viewer-panel">
      <div className="media-viewer-toolbar">
        <p aria-live="polite">{item.alt} {items.length > 1 && <span>({index + 1} / {items.length})</span>}</p>
        <button type="button" onClick={onClose}>{lang === 'zh' ? '关闭预览' : 'Close preview'} ×</button>
      </div>
      <MediaAsset key={item.src} item={item} lang={lang} autoPlay={item.type === 'video'}
        frameClassName="media-viewer-asset" className="max-h-full max-w-full object-contain" />
      <div className="media-viewer-footer">
        {items.length > 1 && <button type="button" aria-label={lang === 'zh' ? '上一项' : 'Previous media'} onClick={() => move(-1)}>←</button>}
        <p>{item.caption}</p>
        {items.length > 1 && <button type="button" aria-label={lang === 'zh' ? '下一项' : 'Next media'} onClick={() => move(1)}>→</button>}
      </div>
    </div>
  </div>, document.body);
}
