import type { MouseEvent } from 'react';

type Props = { isDark: boolean; onToggle: () => void; className?: string };

function ThemeIcon({ moon }: { moon?: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
    {moon ? <path d="M20.5 13.3A8.5 8.5 0 1 1 10.7 3.5a7 7 0 0 0 9.8 9.8z" /> : <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.2M12 19.3v2.2M4.7 4.7l1.6 1.6M17.7 17.7l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.7 19.3l1.6-1.6M17.7 6.3l1.6-1.6" />
    </>}
  </svg>;
}

export default function ThemeGlassSwitch({ isDark, onToggle, className = '' }: Props) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => { event.stopPropagation(); onToggle(); };
  return <button type="button" role="switch" aria-checked={isDark}
    aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`} onClick={handleClick} className={`theme-switch ${className}`}>
    <span className="glass-switch-shine" />
    <span className="glass-switch-thumb" />
    <span className="glass-switch-labels">
      <span data-active={!isDark}><ThemeIcon /></span>
      <span data-active={isDark}><ThemeIcon moon /></span>
    </span>
  </button>;
}
