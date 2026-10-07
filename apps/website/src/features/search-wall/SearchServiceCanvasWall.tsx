import { useEffect, useRef, useState } from 'react';
import type { Locale } from '@/i18n/config';

import usePanZoom from '@/hooks/usePanZoom';
import { buildColumnLayout, clamp, type WallImage, type WallLayout } from './layout';
import { loadImages } from './images';
import { getServiceWallImages } from './assets';

const DPR_CAP = 2;

export default function SearchServiceCanvasWall({ lang }: { lang: Locale }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number | null>(null);

  const viewportRef = useRef({ width: 0, height: 0, dpr: 1 });
  const imagesRef = useRef<WallImage[]>([]);
  const layoutRef = useRef<WallLayout>({ columns: [], worldWidth: 1 });
  const invalidateRef = useRef<() => void>(() => {});
  const view = usePanZoom(canvasRef, { minScale: .5, maxScale: 4, onChange: () => invalidateRef.current() });

  const [isReady, setIsReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const abort = new AbortController();
    let started = false;
    setFailed(false);
    setIsReady(false);
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return;
      started = true;
      observer.disconnect();
      imagesRef.current = getServiceWallImages().map(asset => ({
        image: new Image(), src: asset.thumbnail, ratio: asset.width / asset.height
      }));
      loadImages(imagesRef.current, abort.signal, () => {
        if (abort.signal.aborted) return;
        setIsReady(true);
        invalidateRef.current();
      }).then(loaded => {
        if (abort.signal.aborted) return;
        setFailed(loaded === 0);
      });
    }, { rootMargin: '100px' });
    observer.observe(container);
    return () => { abort.abort(); observer.disconnect(); };
  }, [attempt]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || !isReady) return;

    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));
      const dpr = clamp(window.devicePixelRatio || 1, 1, DPR_CAP);

      viewportRef.current = { width, height, dpr };

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      layoutRef.current = buildColumnLayout(imagesRef.current, width);
      invalidate();
    };

    const draw = () => {
      const viewport = viewportRef.current;
      const { x, y, scale } = view.current;
      const cameraX = viewport.width / 2 - (viewport.width / 2 + x) / scale;
      const cameraY = viewport.height / 2 - (viewport.height / 2 + y) / scale;
      const { columns, worldWidth } = layoutRef.current;

      context.setTransform(viewport.dpr, 0, 0, viewport.dpr, 0, 0);
      context.clearRect(0, 0, viewport.width, viewport.height);
      context.fillStyle = '#ececec';
      context.fillRect(0, 0, viewport.width, viewport.height);

      if (columns.length === 0) return;

      context.setTransform(viewport.dpr * scale, 0, 0, viewport.dpr * scale,
        -cameraX * viewport.dpr * scale, -cameraY * viewport.dpr * scale);

      const padding = 120 / scale;
      const minWorldX = cameraX - padding;
      const maxWorldX = cameraX + viewport.width / scale + padding;
      const minWorldY = cameraY - padding;
      const maxWorldY = cameraY + viewport.height / scale + padding;

      const tileStartX = Math.floor(minWorldX / worldWidth) - 1;
      const tileEndX = Math.floor(maxWorldX / worldWidth) + 1;

      for (let tileX = tileStartX; tileX <= tileEndX; tileX += 1) {
        const tileOffsetX = tileX * worldWidth;
        for (const column of columns) {
          const x = tileOffsetX + column.x;
          if (x + column.width < minWorldX || x > maxWorldX) continue;

          for (const item of column.items) {
            const baseY = item.y + column.phase;
            const yStartWrap = Math.floor((minWorldY - baseY) / column.period) - 1;
            const yEndWrap = Math.floor((maxWorldY - baseY) / column.period) + 1;

            for (let wrapIndex = yStartWrap; wrapIndex <= yEndWrap; wrapIndex += 1) {
              const y = baseY + wrapIndex * column.period;
              if (y + item.height < minWorldY || y > maxWorldY) continue;
              if (item.image.image.complete && item.image.image.naturalWidth > 0) {
                context.drawImage(item.image.image, x, y, column.width, item.height);
              } else {
                context.fillStyle = '#e1e1e1';
                context.fillRect(x, y, column.width, item.height);
              }
            }
          }
        }
      }
    };

    let visible = true;
    const tick = () => {
      frameRef.current = null;
      if (!visible || document.hidden) return;
      draw();
    };
    const invalidate = () => {
      if (visible && !document.hidden && frameRef.current === null) frameRef.current = requestAnimationFrame(tick);
    };
    invalidateRef.current = invalidate;
    const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; invalidate(); });
    visibility.observe(container);
    const visibilityChanged = () => invalidate();
    document.addEventListener('visibilitychange', visibilityChanged);

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    invalidate();

    return () => {
      invalidateRef.current = () => {};
      observer.disconnect();
      visibility.disconnect();
      document.removeEventListener('visibilitychange', visibilityChanged);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [isReady, view]);

  return <div ref={containerRef} className="relative h-full w-full overflow-hidden" aria-busy={!isReady && !failed}>
    <canvas ref={canvasRef} className="h-full w-full cursor-grab touch-none select-none [&.is-panning]:cursor-grabbing"
      tabIndex={0} role="region"
      aria-label={lang === 'zh' ? '搜索服务图片墙：拖动查看，滚轮或双指缩放，按 0 复位' : 'Search services photo wall: drag to pan, wheel or pinch to zoom, press 0 to reset'} />
    {failed && <div role="status" className="absolute inset-0 flex items-center justify-center text-sm">
      <button type="button" className="text-link" onClick={() => setAttempt(value => value + 1)}>
        {lang === 'zh' ? '加载失败，点击重试' : 'Could not load images. Retry'}
      </button>
    </div>}
  </div>;
}
