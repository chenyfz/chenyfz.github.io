import type { WallImage } from './layout';

/** Load the first row first, then fill the wall without moving its reserved layout. */
export async function loadImages(images: WallImage[], signal: AbortSignal, onLoad: () => void) {
  let next = 0;
  let loaded = 0;
  const worker = async () => {
    while (next < images.length && !signal.aborted) {
      const { image, src } = images[next++];
      await new Promise<void>(resolve => {
        if (signal.aborted) { resolve(); return; }
        const cleanup = () => { image.onload = null; image.onerror = null; signal.removeEventListener('abort', abort); };
        const abort = () => { cleanup(); image.src = ''; resolve(); };
        image.onload = () => { cleanup(); loaded += 1; onLoad(); resolve(); };
        image.onerror = () => { cleanup(); resolve(); };
        image.decoding = 'async';
        signal.addEventListener('abort', abort, { once: true });
        image.src = src;
      });
    }
  };
  await Promise.all(Array.from({ length: Math.min(6, images.length) }, worker));
  return loaded;
}
