import { useRef } from 'react';
import type { Locale } from '@/i18n/config';
import usePanZoom from '@/hooks/usePanZoom';
import MediaAsset from './MediaAsset';
import type { MediaItem } from './types';

type Props = { item: MediaItem; lang: Locale; inset?: number; onDismiss?: () => void; onNavigate?: (direction: number) => void };

export default function ZoomableImage({ item, lang, inset = 0, onDismiss, onNavigate }: Props) {
  const viewport = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const dragged = useRef(false);
  const view = usePanZoom(viewport, {
    onNavigate,
    constrain: (view, size) => {
      const image = viewport.current?.querySelector('img');
      const width = image?.naturalWidth || size.width;
      const height = image?.naturalHeight || size.height;
      const fit = Math.min(Math.max(1, size.width - inset * 2) / width, Math.max(1, size.height - inset * 2) / height);
      const limitX = Math.max(0, (width * fit * view.scale - size.width) / 2);
      const limitY = Math.max(0, (height * fit * view.scale - size.height) / 2);
      return { ...view, x: Math.max(-limitX, Math.min(limitX, view.x)), y: Math.max(-limitY, Math.min(limitY, view.y)) };
    },
    onChange: ({ x, y, scale }) => {
      if (content.current) content.current.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
    }
  });
  const dismissBackground = (x: number, y: number) => {
    const element = viewport.current;
    const image = element?.querySelector('img');
    if (!onDismiss || !element || !image?.naturalWidth || dragged.current) return;
    const rect = element.getBoundingClientRect();
    const fit = Math.min((rect.width - inset * 2) / image.naturalWidth, (rect.height - inset * 2) / image.naturalHeight);
    const { x: panX, y: panY, scale } = view.current;
    const halfWidth = image.naturalWidth * fit * scale / 2;
    const halfHeight = image.naturalHeight * fit * scale / 2;
    const centerX = rect.left + rect.width / 2 + panX;
    const centerY = rect.top + rect.height / 2 + panY;
    if (Math.abs(x - centerX) > halfWidth || Math.abs(y - centerY) > halfHeight) onDismiss();
  };
  return <div ref={viewport} className="image-zoom" role="region" tabIndex={0}
    onPointerDownCapture={event => {
      if (!event.isPrimary) { dragged.current = true; return; }
      pointerStart.current = { x: event.clientX, y: event.clientY }; dragged.current = false;
    }}
    onPointerMoveCapture={event => {
      const start = pointerStart.current;
      if (start && Math.hypot(event.clientX - start.x, event.clientY - start.y) > 5) dragged.current = true;
    }}
    onPointerCancel={() => { dragged.current = true; }}
    onClick={event => { if (!(event.target instanceof Element && event.target.closest('button, a'))) dismissBackground(event.clientX, event.clientY); }}
    aria-label={(lang === 'zh' ? `${item.alt}；滚轮或双指缩放，拖动查看，按 0 复位` : `${item.alt}; wheel or pinch to zoom, drag to pan, press 0 to reset`)
      + (onNavigate ? (lang === 'zh' ? '，原始比例下左右滑动或按方向键切换' : '; swipe or use arrow keys at initial size to switch images') : '')}>
    <div ref={content} className="image-zoom-content" style={{ inset }}>
      <MediaAsset item={item} lang={lang} frameClassName="h-full w-full" />
    </div>
  </div>;
}
