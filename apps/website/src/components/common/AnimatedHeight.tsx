import { useLayoutEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

type AnimatedHeightProps = {
  expanded: boolean;
  children: ReactNode;
  className?: string;
  durationMs?: number;
};

export default function AnimatedHeight({ expanded, children, className = '', durationMs = 320 }: AnimatedHeightProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string | number>(expanded ? 'auto' : 0);

  useLayoutEffect(() => {
    const element = contentRef.current;
    if (!element) return;

    const fullHeight = element.scrollHeight;

    if (expanded) {
      setHeight(fullHeight);
      const timer = window.setTimeout(() => setHeight('auto'), durationMs);
      return () => window.clearTimeout(timer);
    }

    if (height === 'auto') {
      setHeight(fullHeight);
      requestAnimationFrame(() => setHeight(0));
      return;
    }

    setHeight(0);
  }, [expanded, durationMs]);

  return (
    <div
      className={className}
      style={{
        height,
        overflow: 'hidden',
        transition: `height ${durationMs}ms cubic-bezier(0.2, 0, 0, 1)`
      }}
    >
      <div ref={contentRef}>{children}</div>
    </div>
  );
}
