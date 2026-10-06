import { useEffect, useRef, useState } from 'react';
import type { Locale } from '@/i18n/config';
import gsap from 'gsap';

import { createPortal } from 'react-dom';
import useModalFocus from '@/hooks/useModalFocus';
import useReducedMotion from '@/hooks/useReducedMotion';
import { buildColumnLayout, clamp, type LoadedImage, type WallLayout } from './layout';
import { loadImages } from './images';

type SearchServiceCanvasWallProps = {
  lang: Locale;
  layout?: 'inline' | 'immersive';
  immersiveFrameClassName?: string;
};

const SERVICE_IMAGE_PATHS = Array.from({ length: 70 }, (_, index) => {
  const id = String(index + 1).padStart(3, '0');
  return `/search/services/service-${id}.png`;
});

const DPR_CAP = 2;

export default function SearchServiceCanvasWall({
  lang,
  layout = 'inline',
  immersiveFrameClassName = ''
}: SearchServiceCanvasWallProps) {
  const fullscreenToggle = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number | null>(null);

  const cameraXRef = useRef(0);
  const cameraYRef = useRef(0);
  const velocityXRef = useRef(0);
  const velocityYRef = useRef(0);
  const pointerIdRef = useRef<number | null>(null);
  const draggingRef = useRef(false);
  const lastPointerXRef = useRef(0);
  const lastPointerYRef = useRef(0);
  const lastPointerTimeRef = useRef(0);
  const smoothWheelRef = useRef({ x: 0, y: 0 });

  const viewportRef = useRef({ width: 0, height: 0, dpr: 1 });
  const imagesRef = useRef<LoadedImage[]>([]);
  const layoutRef = useRef<WallLayout>({ columns: [], worldWidth: 1 });

  const [isReady, setIsReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const abort = new AbortController();
    let started = false;
    setFailed(false);
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return;
      started = true;
      observer.disconnect();
      loadImages(SERVICE_IMAGE_PATHS, abort.signal).then(({ images }) => {
        if (abort.signal.aborted) return;
        imagesRef.current = images;
        setFailed(images.length === 0);
        setIsReady(images.length > 0);
      });
    }, { rootMargin: '100px' });
    observer.observe(container);
    return () => { abort.abort(); observer.disconnect(); };
  }, [attempt]);

  useModalFocus(modalRef, isFullscreen && layout === 'inline', () => setIsFullscreen(false), fullscreenToggle);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || !isReady) return;

    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;

    const wheelState = smoothWheelRef.current;
    let lastWheelX = wheelState.x;
    let lastWheelY = wheelState.y;
    const smoothWheelX = gsap.quickTo(wheelState, 'x', { duration: reducedMotion ? 0 : 0.34, ease: 'power3.out', onUpdate: () => invalidate() });
    const smoothWheelY = gsap.quickTo(wheelState, 'y', { duration: reducedMotion ? 0 : 0.34, ease: 'power3.out', onUpdate: () => invalidate() });

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

      if (cameraXRef.current === 0 && cameraYRef.current === 0) {
        cameraXRef.current = layoutRef.current.worldWidth * 0.5 - width * 0.5;
        cameraYRef.current = height * 0.35;
      }
    };

    const draw = (deltaSec: number) => {
      const wheelDeltaX = wheelState.x - lastWheelX;
      const wheelDeltaY = wheelState.y - lastWheelY;
      if (wheelDeltaX !== 0 || wheelDeltaY !== 0) {
        cameraXRef.current += wheelDeltaX;
        cameraYRef.current += wheelDeltaY;
        lastWheelX = wheelState.x;
        lastWheelY = wheelState.y;
      }

      const viewport = viewportRef.current;
      const { columns, worldWidth } = layoutRef.current;

      context.clearRect(0, 0, viewport.width, viewport.height);
      context.fillStyle = '#0a0d12';
      context.fillRect(0, 0, viewport.width, viewport.height);

      if (columns.length === 0) return;

      if (!draggingRef.current) {
        const friction = Math.exp(-3.6 * deltaSec);
        if (Math.abs(velocityXRef.current) > 0.02 || Math.abs(velocityYRef.current) > 0.02) {
          cameraXRef.current += velocityXRef.current * deltaSec;
          cameraYRef.current += velocityYRef.current * deltaSec;
          velocityXRef.current *= friction;
          velocityYRef.current *= friction;
        } else {
          velocityXRef.current = 0;
          velocityYRef.current = 0;
        }
      }

      const padding = 120;
      const minWorldX = cameraXRef.current - padding;
      const maxWorldX = cameraXRef.current + viewport.width + padding;
      const minWorldY = cameraYRef.current - padding;
      const maxWorldY = cameraYRef.current + viewport.height + padding;

      const tileStartX = Math.floor(minWorldX / worldWidth) - 1;
      const tileEndX = Math.floor(maxWorldX / worldWidth) + 1;

      for (let tileX = tileStartX; tileX <= tileEndX; tileX += 1) {
        const tileOffsetX = tileX * worldWidth;
        for (const column of columns) {
          const x = tileOffsetX + column.x - cameraXRef.current;
          if (x + column.width < -padding || x > viewport.width + padding) continue;

          for (const item of column.items) {
            const baseY = item.y + column.phase;
            const yStartWrap = Math.floor((minWorldY - baseY) / column.period) - 1;
            const yEndWrap = Math.floor((maxWorldY - baseY) / column.period) + 1;

            for (let wrapIndex = yStartWrap; wrapIndex <= yEndWrap; wrapIndex += 1) {
              const y = baseY + wrapIndex * column.period - cameraYRef.current;
              if (y + item.height < -padding || y > viewport.height + padding) continue;
              context.drawImage(item.image.image, x, y, column.width, item.height);
            }
          }
        }
      }
    };

    let lastTime = 0;
    let visible = true;
    const tick = (timestamp: number) => {
      frameRef.current = null;
      if (!visible || document.hidden) return;
      const deltaSec = clamp((timestamp - (lastTime || timestamp - 16)) / 1000, 0.001, 0.05);
      lastTime = timestamp;
      draw(deltaSec);
      if (!reducedMotion && (Math.abs(velocityXRef.current) > 0.02 || Math.abs(velocityYRef.current) > 0.02)) invalidate();
    };
    const invalidate = () => {
      if (visible && !document.hidden && frameRef.current === null) frameRef.current = requestAnimationFrame(tick);
    };
    const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; lastTime = 0; invalidate(); });
    visibility.observe(container);
    const visibilityChanged = () => { lastTime = 0; invalidate(); };
    document.addEventListener('visibilitychange', visibilityChanged);

    const onPointerDown = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0) return;
      pointerIdRef.current = event.pointerId;
      draggingRef.current = true;
      lastPointerXRef.current = event.clientX;
      lastPointerYRef.current = event.clientY;
      lastPointerTimeRef.current = event.timeStamp;
      velocityXRef.current = 0;
      velocityYRef.current = 0;
      canvas.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!draggingRef.current || pointerIdRef.current !== event.pointerId) return;

      const dx = event.clientX - lastPointerXRef.current;
      const dy = event.clientY - lastPointerYRef.current;
      const dtSec = Math.max(0.001, (event.timeStamp - lastPointerTimeRef.current) / 1000);

      cameraXRef.current -= dx;
      cameraYRef.current -= dy;
      velocityXRef.current = -dx / dtSec;
      velocityYRef.current = -dy / dtSec;

      lastPointerXRef.current = event.clientX;
      lastPointerYRef.current = event.clientY;
      lastPointerTimeRef.current = event.timeStamp;
      invalidate();
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      velocityXRef.current = 0; velocityYRef.current = 0;
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? viewportRef.current.height : 1;
      const nextX = wheelState.x + event.deltaX * unit;
      const nextY = wheelState.y + event.deltaY * unit;
      smoothWheelX(nextX);
      smoothWheelY(nextY);
    };

    const releasePointer = (event: PointerEvent) => {
      if (pointerIdRef.current !== event.pointerId) return;
      draggingRef.current = false;
      if (reducedMotion) { velocityXRef.current = 0; velocityYRef.current = 0; }
      invalidate();
      pointerIdRef.current = null;
      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
      }
    };

    const keydown = (event: KeyboardEvent) => {
      const delta: Record<string, [number, number]> = { ArrowLeft: [-80, 0], ArrowRight: [80, 0], ArrowUp: [0, -80], ArrowDown: [0, 80] };
      if (!delta[event.key]) return;
      event.preventDefault();
      cameraXRef.current += delta[event.key][0]; cameraYRef.current += delta[event.key][1]; invalidate();
    };
    canvas.addEventListener('keydown', keydown);
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', releasePointer);
    canvas.addEventListener('pointercancel', releasePointer);
    canvas.addEventListener('wheel', onWheel, { passive: false });

    invalidate();

    return () => {
      observer.disconnect();
      visibility.disconnect();
      document.removeEventListener('visibilitychange', visibilityChanged);
      smoothWheelX.tween.kill(); smoothWheelY.tween.kill();
      canvas.removeEventListener('keydown', keydown);
      draggingRef.current = false; pointerIdRef.current = null;
      velocityXRef.current = 0; velocityYRef.current = 0;
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', releasePointer);
      canvas.removeEventListener('pointercancel', releasePointer);
      canvas.removeEventListener('wheel', onWheel);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [isReady, isFullscreen, layout, reducedMotion]);

  const toggleLabel = isFullscreen
    ? (lang === 'zh' ? '退出全屏' : 'Exit full screen')
    : (lang === 'zh' ? '全屏查看' : 'Full screen');
  const dragHint = lang === 'zh' ? '鼠标拖拽浏览' : 'Drag to explore';
  const loadingHint = lang === 'zh' ? '加载中...' : 'Loading...';
  const isImmersive = layout === 'immersive';

  const wall = (
    <div ref={modalRef} role={isFullscreen ? 'dialog' : undefined} aria-modal={isFullscreen ? true : undefined} aria-label={isFullscreen ? toggleLabel : undefined} className={isFullscreen && !isImmersive ? 'fixed inset-0 z-[90] bg-black' : 'relative h-full w-full'}>
      <div
        ref={containerRef}
        className={
          isImmersive
            ? `relative h-full w-full overflow-hidden ${immersiveFrameClassName}`
            : isFullscreen
            ? 'relative h-full w-full overflow-hidden'
            : 'relative h-[23rem] w-full overflow-hidden rounded-lg border border-black/10 dark:border-white/12'
        }
      >
        <canvas
          ref={canvasRef}
          className="h-full w-full cursor-grab touch-none active:cursor-grabbing"
          tabIndex={0}
          role="region"
          aria-label={lang === 'zh' ? '搜索服务图片墙：拖拽或方向键浏览' : 'Search services photo wall: drag or use arrow keys'}
        />

        {failed && <div role="status" className="absolute inset-0 flex items-center justify-center bg-black text-sm text-white">
          <button type="button" className="underline" onClick={() => setAttempt(value => value + 1)}>{lang === 'zh' ? '加载失败，点击重试' : 'Could not load images. Retry'}</button>
        </div>}
        {!isImmersive ? (
          <button
            type="button"
            ref={fullscreenToggle}
            onClick={() => setIsFullscreen((prev) => !prev)}
            className="absolute right-3 top-3 rounded-md bg-black/55 px-3 py-1.5 text-xs text-white transition hover:bg-black/75"
          >
            {toggleLabel}
          </button>
        ) : null}

        <div className="pointer-events-none absolute bottom-3 left-3 text-xs text-white/75">
          {isReady ? dragHint : failed ? '' : loadingHint}
        </div>
      </div>
    </div>
  );
  return isFullscreen && !isImmersive && typeof document !== 'undefined' ? createPortal(wall, document.body) : wall;
}
