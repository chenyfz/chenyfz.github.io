import { useEffect, useRef, useState, type RefObject } from 'react';
import type { Locale } from '@/i18n/config';
import type { MediaItem } from './types';

type Props = {
  item: MediaItem;
  lang: Locale;
  preview?: boolean;
  autoPlay?: boolean;
  className?: string;
  frameClassName?: string;
  videoRef?: RefObject<HTMLVideoElement | null>;
  retryEnabled?: boolean;
};

export default function MediaAsset({ item, lang, preview = false, autoPlay = false,
  className = 'h-full w-full object-contain', frameClassName = '', videoRef, retryEnabled = !preview }: Props) {
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const frame = useRef<HTMLDivElement>(null);
  const src = preview ? item.thumbnailSrc ?? item.poster ?? item.src : item.src;
  const image = item.type === 'image' || (preview && src !== item.src && !/\.(mp4|webm|mov)(?:[?#]|$)/i.test(src));
  useEffect(() => {
    // Cached media can finish loading before React attaches its event handlers.
    if (attempt > 0) return;
    const asset = frame.current?.querySelector('img, video');
    if (asset instanceof HTMLImageElement && asset.complete) {
      if (asset.naturalWidth > 0) setReady(true); else setFailed(true);
    } else if (asset instanceof HTMLVideoElement) {
      if (asset.error || asset.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) setFailed(true);
      else if (asset.readyState >= HTMLMediaElement.HAVE_METADATA) setReady(true);
    }
  }, [src, attempt]);
  return <div ref={frame} className={`media-asset ${frameClassName}`} tabIndex={retryEnabled ? -1 : undefined} aria-busy={!ready && !failed}>
    {failed ? <div role="status" className="media-status">
      <span>{lang === 'zh' ? '媒体加载失败' : 'Could not load media'}</span>
      {retryEnabled && <button type="button" onClick={event => {
        event.stopPropagation(); frame.current?.focus({ preventScroll: true });
        setFailed(false); setReady(false); setAttempt(value => value + 1);
      }}>{lang === 'zh' ? '重试' : 'Retry'}</button>}
    </div> : image ? <img key={`${src}-${attempt}`} src={src} alt={item.alt}
      className={className} loading="lazy" decoding="async" onLoad={() => setReady(true)} onError={() => setFailed(true)} /> :
      <video key={`${src}-${attempt}`} ref={videoRef} src={src} poster={item.poster}
        aria-label={item.alt} className={className} controls={!preview} muted={preview}
        tabIndex={preview ? -1 : 0} autoPlay={autoPlay} playsInline preload="metadata"
        onLoadedMetadata={() => setReady(true)} onError={() => setFailed(true)} />}
    {!ready && !failed && <span className="media-loading" aria-hidden="true">{lang === 'zh' ? '加载中…' : 'Loading…'}</span>}
    {preview && item.type === 'video' && !failed && <span className="media-play" aria-hidden="true">▶</span>}
  </div>;
}
