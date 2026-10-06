import { useId, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

type Props = {
  expanded: boolean; onToggle: () => void; preview: string; previewLines?: number;
  showLabel: string; hideLabel: string; children: ReactNode;
};

export default function ExpandableContent({ expanded, onToggle, preview, previewLines = 2, showLabel, hideLabel, children }: Props) {
  const id = useId();
  const viewport = useRef<HTMLDivElement>(null);
  const summary = useRef<HTMLParagraphElement>(null);
  const full = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const closingAnchor = useRef<number | null>(null);
  const [height, setHeight] = useState<{ preview: number; full: number } | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      const next = { preview: Math.ceil(summary.current!.getBoundingClientRect().height), full: Math.ceil(full.current!.getBoundingClientRect().height) };
      setHeight(previous => previous?.preview === next.preview && previous.full === next.full ? previous : next);
    };
    const contentObserver = new ResizeObserver(measure);
    contentObserver.observe(summary.current!);
    contentObserver.observe(full.current!);
    const anchorObserver = new ResizeObserver(() => {
      if (closingAnchor.current === null || !button.current) return;
      // Keep an on-screen collapse trigger in place while its content shrinks.
      window.scrollBy({ top: button.current.getBoundingClientRect().top - closingAnchor.current, behavior: 'instant' });
    });
    anchorObserver.observe(viewport.current!);
    const stopAnchoring = () => { closingAnchor.current = null; };
    window.addEventListener('wheel', stopAnchoring, { passive: true });
    window.addEventListener('touchstart', stopAnchoring, { passive: true });
    measure();
    return () => {
      contentObserver.disconnect(); anchorObserver.disconnect();
      window.removeEventListener('wheel', stopAnchoring);
      window.removeEventListener('touchstart', stopAnchoring);
    };
  }, []);

  const toggle = () => {
    const rect = button.current!.getBoundingClientRect();
    closingAnchor.current = expanded && rect.top >= 0 && rect.bottom <= window.innerHeight ? rect.top : null;
    button.current!.focus({ preventScroll: true });
    onToggle();
  };
  return <div className="expandable-content" data-expanded={expanded}>
    <div ref={viewport} className="expandable-viewport" style={{ height: height ? (expanded ? height.full : height.preview) : undefined }}
      onTransitionEnd={event => { if (event.target === viewport.current) closingAnchor.current = null; }}>
      <p ref={summary} className="expandable-preview" aria-hidden={expanded}
        style={{ '--preview-lines': previewLines } as CSSProperties}>{preview}</p>
      <div ref={full} id={id} className="expandable-full" aria-hidden={!expanded} inert={!expanded}>{children}</div>
    </div>
    <button ref={button} type="button" className="page-action mt-3" aria-expanded={expanded} aria-controls={id} onClick={toggle}>
      {expanded ? hideLabel : showLabel}
    </button>
  </div>;
}
