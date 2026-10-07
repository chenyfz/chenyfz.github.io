import { useEffect, useId, useRef, useState, type ComponentProps, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import type { Locale } from '@/i18n/config';
import SearchServiceCanvasWall from '@/features/search-wall/SearchServiceCanvasWall';
import { getServiceWallImages } from '@/features/search-wall/assets';
import MediaAsset from '@/components/media/MediaAsset';
import MediaViewer from '@/components/media/MediaViewer';
import MediaDialog from '@/components/media/MediaDialog';
import TenderPreview, { TENDER_IMAGE, tenderImage } from './TenderPreview';
import useReducedMotion from '@/hooks/useReducedMotion';

type Project = 'wechat-search' | 'wechat-anniversary' | 'tender-ai-tool';
type Preview = { kind: 'hover'; position: CSSProperties } | { kind: 'dialog' };
const HOVER_QUERY = '(min-width: 640px) and (any-hover: hover) and (any-pointer: fine)';
const ANNIVERSARY_POSTER = '/wechat-anniversary/video-poster.webp';
const VIDEO_RATIO = 1125 / 2436; // iPhone X portrait display.

const labels = {
  zh: { 'wechat-search': '搜一搜界面案例', 'wechat-anniversary': '微信十周年小程序演示', 'tender-ai-tool': '招投标 AI 工具案例' },
  en: { 'wechat-search': 'Weixin Search screens', 'wechat-anniversary': 'WeChat anniversary mini program demo', 'tender-ai-tool': 'AI tender review tool screenshots' }
};

function hoverPosition(trigger: HTMLElement, project: Project): CSSProperties {
  const rect = trigger.getBoundingClientRect();
  const margin = 12;
  const gap = 8;
  const video = project === 'wechat-anniversary';
  let height = Math.min(video ? 660 : 620, window.innerHeight * (video ? 0.88 : 0.72));
  let width = video ? height * VIDEO_RATIO : Math.min(project === 'tender-ai-tool' ? 960 : 840, window.innerWidth - margin * 2);
  const below = window.innerHeight - rect.bottom - margin - gap;
  const above = rect.top - margin - gap;
  const right = window.innerWidth - rect.right - margin - gap;
  const left = rect.left - margin - gap;
  // Keep the trigger uncovered so a click can promote the hover preview to a dialog.
  if (Math.max(above, below) < height && Math.max(left, right) >= (video ? width : 480)) {
    width = Math.min(width, Math.max(left, right));
    if (video) height = width / VIDEO_RATIO;
    return { width, height,
      maxHeight: window.innerHeight - margin * 2,
      left: right >= left ? rect.right + gap : rect.left - width - gap,
      top: Math.max(margin, Math.min(rect.top - height / 2, window.innerHeight - height - margin)) };
  }
  height = Math.min(height, Math.max(above, below));
  if (video) width = height * VIDEO_RATIO;
  return { width, height, maxHeight: height,
    top: below >= height ? rect.bottom + gap : rect.top - height - gap,
    left: Math.max(margin, Math.min(rect.left, window.innerWidth - width - margin)) };
}

function AnniversaryVideo({ lang }: { lang: Locale }) {
  const reducedMotion = useReducedMotion();
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => { if (reducedMotion) video.current?.pause(); }, [reducedMotion]);
  useEffect(() => {
    const element = video.current;
    return () => { element?.pause(); };
  }, []);
  return <MediaAsset lang={lang} videoRef={video} controls={false} muted loop autoPlay={!reducedMotion}
    frameClassName="h-full" item={{ type: 'video', src: '/wechat-anniversary/v.mp4',
      poster: ANNIVERSARY_POSTER, alt: lang === 'zh' ? '微信十周年小程序演示视频' : 'WeChat anniversary mini program demo' }} />;
}

function ProjectPreview({ project, lang, children, className, title }: ComponentProps<'a'> & { project: Project; lang: Locale }) {
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverResumeAt = useRef(0);
  const id = useId();
  const [preview, setPreview] = useState<Preview | null>(null);
  const dialog = preview?.kind === 'dialog';
  const clearTimer = () => { if (timer.current !== null) clearTimeout(timer.current); timer.current = null; };
  const close = () => {
    clearTimer();
    // Removing a dialog can put the pointer back on its trigger; do not immediately reopen it.
    hoverResumeAt.current = performance.now() + 200;
    setPreview(null);
  };
  const open = (kind: Preview['kind']) => {
    if (!trigger.current) return;
    clearTimer();
    document.dispatchEvent(new CustomEvent('project-preview:open', { detail: id }));
    setPreview(kind === 'dialog' ? { kind } : { kind, position: hoverPosition(trigger.current, project) });
  };
  const leave = () => {
    clearTimer();
    if (!dialog) timer.current = setTimeout(close, 150);
  };

  useEffect(() => {
    const element = trigger.current;
    if (!element) return;
    let images: HTMLImageElement[] = [];
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || !window.matchMedia(HOVER_QUERY).matches) return;
      const sources = project === 'wechat-search' ? getServiceWallImages().slice(0, 8).map(image => image.thumbnail)
        : project === 'tender-ai-tool' ? [TENDER_IMAGE] : [ANNIVERSARY_POSTER];
      images = sources.map(src => {
        const image = new Image(); image.decoding = 'async'; image.fetchPriority = 'low'; image.src = src;
        return image;
      });
      observer.disconnect();
    }, { rootMargin: '200px' });
    observer.observe(element);
    return () => {
      observer.disconnect(); clearTimer();
      images.forEach(image => { if (!image.complete) image.src = ''; });
    };
  }, [project]);

  useEffect(() => { close(); }, [lang]);
  useEffect(() => {
    if (!preview) return;
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') { event.preventDefault(); close(); } };
    const outside = (event: Event) => {
      if (event.target instanceof Node && !panel.current?.contains(event.target) && !trigger.current?.contains(event.target)) close();
    };
    const scroll = (event: Event) => { if (!(event.target instanceof Node) || !panel.current?.contains(event.target)) close(); };
    const another = (event: Event) => { if ((event as CustomEvent<string>).detail !== id) close(); };
    const hidden = () => { if (document.hidden) close(); };
    document.addEventListener('project-preview:open', another);
    document.addEventListener('visibilitychange', hidden);
    document.addEventListener('astro:before-preparation', close);
    if (!dialog) {
      document.addEventListener('keydown', escape);
      document.addEventListener('pointerdown', outside);
      document.addEventListener('focusin', outside);
      window.addEventListener('scroll', scroll, true);
      window.addEventListener('resize', close);
    }
    return () => {
      document.removeEventListener('project-preview:open', another);
      document.removeEventListener('visibilitychange', hidden);
      document.removeEventListener('astro:before-preparation', close);
      document.removeEventListener('keydown', escape);
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('focusin', outside);
      window.removeEventListener('scroll', scroll, true);
      window.removeEventListener('resize', close);
    };
  }, [preview, dialog, id]);

  const search = project === 'wechat-search';
  const tender = project === 'tender-ai-tool';
  const content = (dismiss = close) => preview && <div ref={panel} id={dialog ? undefined : id} lang={lang}
    className={`project-preview${search ? ' project-preview--search' : tender ? ' project-preview--tender' : ' project-preview--video'}${dialog ? ' project-preview--dialog' : ''}`}
    style={{ '--project-video-ratio': VIDEO_RATIO, ...(preview.kind === 'hover' ? preview.position : {}) } as CSSProperties}
    role={dialog ? undefined : 'region'} aria-label={dialog ? undefined : labels[lang][project]}
    onPointerEnter={clearTimer} onPointerLeave={leave} onFocus={clearTimer}
    onClick={event => { if (dialog && event.target === event.currentTarget) dismiss(); }}>
    <div className="project-preview-content">
      {search ? <SearchServiceCanvasWall lang={lang} /> : tender ? <TenderPreview lang={lang} /> : <AnniversaryVideo lang={lang} />}
    </div>
  </div>;
  return <>
    <button type="button" ref={trigger} id={project} title={title} className={`project-trigger ${className ?? ''}`}
      aria-haspopup="dialog" aria-expanded={!!preview} aria-controls={preview ? id : undefined}
      onPointerEnter={event => { if (event.pointerType === 'mouse' && !dialog && performance.now() >= hoverResumeAt.current && window.matchMedia(HOVER_QUERY).matches && window.innerHeight >= 500) open('hover'); }}
      onPointerLeave={leave} onClick={() => open('dialog')}
      onKeyDown={event => { if (event.key === 'ArrowDown') { event.preventDefault(); open('dialog'); } }}>
      {children}
    </button>
    {dialog && tender ? <MediaViewer id={id} items={[tenderImage(lang)]} index={0} lang={lang}
      onClose={close} onChange={() => {}} returnFocus={trigger} /> : dialog ? <MediaDialog id={id} lang={lang}
      label={labels[lang][project]} className="project-preview-overlay" returnFocus={trigger} onClose={close}>
      {dismiss => content(dismiss)}
    </MediaDialog> : preview && createPortal(content(), document.body)}
  </>;
}

export default function ProjectLink(props: ComponentProps<'a'>) {
  const match = props.href?.match(/^\/(zh|en)\/#(wechat-search|wechat-anniversary|tender-ai-tool)$/);
  return match ? <ProjectPreview {...props} lang={match[1] as Locale} project={match[2] as Project} /> : <a {...props} />;
}
