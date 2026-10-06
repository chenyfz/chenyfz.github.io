import type { CSSProperties, ReactNode } from 'react';

type AnimatedHeightProps = {
  expanded: boolean;
  children: ReactNode;
  className?: string;
  durationMs?: number;
};
export default function AnimatedHeight({ expanded, children, className = '', durationMs }: AnimatedHeightProps) {
  return (
    <div className={`animated-height ${className}`} aria-hidden={!expanded} inert={!expanded}
      style={{ gridTemplateRows: expanded ? '1fr' : '0fr', '--expand-duration': durationMs === undefined ? undefined : `${durationMs}ms` } as CSSProperties}>
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  );
}
