import type { LoadedImage } from './layout';
/** One unavailable asset must not blank the entire wall. Listeners are removed on abort. */
export async function loadImages(paths: readonly string[], signal: AbortSignal, createImage = () => new Image()) {
  const results = await Promise.allSettled(paths.map(src => new Promise<LoadedImage>((resolve, reject) => {
    if (signal.aborted) { reject(signal.reason); return; }
    const image = createImage();
    const cleanup = () => { image.onload = null; image.onerror = null; signal.removeEventListener('abort', abort); };
    const abort = () => { cleanup(); image.src = ''; reject(signal.reason); };
    image.onload = () => { cleanup(); resolve({ image, ratio: Math.max(1, image.naturalWidth) / Math.max(1, image.naturalHeight) }); };
    image.onerror = () => { cleanup(); reject(new Error(`Failed to load image: ${src}`)); };
    image.decoding = 'async';
    signal.addEventListener('abort', abort, { once: true });
    image.src = src;
  })));
  return { images: results.flatMap(result => result.status === 'fulfilled' ? [result.value] : []),
    failed: paths.filter((_, index) => results[index].status === 'rejected') };
}
