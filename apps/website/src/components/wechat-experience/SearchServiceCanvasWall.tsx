import { useEffect, useRef, useState } from 'react';
import type { Locale } from '@/i18n/config';

type LoadedImage = {
  image: HTMLImageElement;
  ratio: number;
};

type ColumnItem = {
  image: LoadedImage;
  y: number;
  height: number;
};

type ColumnLayout = {
  x: number;
  width: number;
  period: number;
  phase: number;
  items: ColumnItem[];
};

type WallLayout = {
  columns: ColumnLayout[];
  worldWidth: number;
};

type SearchServiceCanvasWallProps = {
  lang: Locale;
};

const SERVICE_IMAGE_PATHS = Array.from({ length: 70 }, (_, index) => {
  const id = String(index + 1).padStart(3, '0');
  return `/search/services/service-${id}.png`;
});

const TILE_GAP = 8;
const DPR_CAP = 2;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function loadImages(srcList: string[]) {
  return Promise.all(
    srcList.map(
      (src) =>
        new Promise<LoadedImage>((resolve, reject) => {
          const image = new Image();
          image.decoding = 'async';
          image.loading = 'eager';
          image.src = src;

          image.onload = () => {
            const width = Math.max(1, image.naturalWidth);
            const height = Math.max(1, image.naturalHeight);
            resolve({ image, ratio: width / height });
          };

          image.onerror = () => reject(new Error(`Failed to load image: ${src}`));
        })
    )
  );
}

function buildColumnLayout(images: LoadedImage[], viewportWidth: number): WallLayout {
  if (images.length === 0 || viewportWidth <= 0) {
    return { columns: [], worldWidth: Math.max(1, viewportWidth) };
  }

  const isDesktop = viewportWidth >= 1024;
  const desiredColumnWidth = isDesktop ? 340 : clamp(viewportWidth / 3.1, 170, 300);
  const columnCount = isDesktop
    ? 3
    : clamp(Math.round((viewportWidth + TILE_GAP) / (desiredColumnWidth + TILE_GAP)), 2, 4);
  const columnWidth = isDesktop
    ? desiredColumnWidth
    : (viewportWidth - TILE_GAP * (columnCount - 1)) / columnCount;

  const step = 9;
  const columns: ColumnLayout[] = [];

  for (let columnIndex = 0; columnIndex < columnCount; columnIndex += 1) {
    const items: ColumnItem[] = [];
    let y = 0;
    const offset = (columnIndex * 7) % images.length;

    for (let i = 0; i < images.length; i += 1) {
      const imageIndex = (offset + i * step) % images.length;
      const image = images[imageIndex];
      const height = columnWidth / Math.max(0.001, image.ratio);
      items.push({ image, y, height });
      y += height + TILE_GAP;
    }

    const period = Math.max(1, y);
    const phase = (columnIndex * 0.173 + 0.07) % 1;

    columns.push({
      x: columnIndex * (columnWidth + TILE_GAP),
      width: columnWidth,
      period,
      phase: period * phase,
      items
    });
  }

  return {
    columns,
    worldWidth: columnCount * (columnWidth + TILE_GAP)
  };
}

export default function SearchServiceCanvasWall({ lang }: SearchServiceCanvasWallProps) {
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

  const viewportRef = useRef({ width: 0, height: 0, dpr: 1 });
  const imagesRef = useRef<LoadedImage[]>([]);
  const layoutRef = useRef<WallLayout>({ columns: [], worldWidth: 1 });

  const [isReady, setIsReady] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    loadImages(SERVICE_IMAGE_PATHS)
      .then((images) => {
        if (cancelled) return;
        imagesRef.current = images;
        setIsReady(true);
      })
      .catch(() => {
        if (cancelled) return;
        setIsReady(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isFullscreen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = prev;
    };
  }, [isFullscreen]);

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

      if (cameraXRef.current === 0 && cameraYRef.current === 0) {
        cameraXRef.current = layoutRef.current.worldWidth * 0.5 - width * 0.5;
        cameraYRef.current = height * 0.35;
      }
    };

    const draw = (deltaSec: number) => {
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

    const tick = (timestamp: number) => {
      const last = (tick as unknown as { _lastTime?: number })._lastTime ?? timestamp;
      const deltaSec = clamp((timestamp - last) / 1000, 0.001, 0.05);
      (tick as unknown as { _lastTime?: number })._lastTime = timestamp;

      draw(deltaSec);
      frameRef.current = window.requestAnimationFrame(tick);
    };

    const onPointerDown = (event: PointerEvent) => {
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
    };

    const releasePointer = (event: PointerEvent) => {
      if (pointerIdRef.current !== event.pointerId) return;
      draggingRef.current = false;
      pointerIdRef.current = null;
      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
      }
    };

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', releasePointer);
    canvas.addEventListener('pointercancel', releasePointer);

    frameRef.current = window.requestAnimationFrame(tick);

    return () => {
      observer.disconnect();
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', releasePointer);
      canvas.removeEventListener('pointercancel', releasePointer);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [isReady, isFullscreen]);

  const toggleLabel = isFullscreen
    ? (lang === 'zh' ? '退出全屏' : 'Exit full screen')
    : (lang === 'zh' ? '全屏查看' : 'Full screen');
  const dragHint = lang === 'zh' ? '鼠标拖拽浏览' : 'Drag to explore';
  const loadingHint = lang === 'zh' ? '加载中...' : 'Loading...';

  return (
    <div className={isFullscreen ? 'fixed inset-0 z-[90] bg-black' : 'relative'}>
      <div
        ref={containerRef}
        className={
          isFullscreen
            ? 'relative h-full w-full overflow-hidden'
            : 'relative h-[23rem] w-full overflow-hidden rounded-lg border border-black/10 dark:border-white/12'
        }
      >
        <canvas
          ref={canvasRef}
          className="h-full w-full cursor-grab touch-none active:cursor-grabbing"
          role="img"
          aria-label="Search services photo wall"
        />

        <button
          type="button"
          onClick={() => setIsFullscreen((prev) => !prev)}
          className="absolute right-3 top-3 rounded-md bg-black/55 px-3 py-1.5 text-xs text-white transition hover:bg-black/75"
        >
          {toggleLabel}
        </button>

        <div className="pointer-events-none absolute bottom-3 left-3 text-xs text-white/75">
          {isReady ? dragHint : loadingHint}
        </div>
      </div>
    </div>
  );
}
