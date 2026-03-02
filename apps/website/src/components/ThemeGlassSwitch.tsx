import type { KeyboardEvent, MouseEvent, PointerEvent } from 'react';

type ThemeGlassSwitchProps = {
  isDark: boolean;
  onToggle: () => void;
  className?: string;
};

const SHELL_CLASS = 'relative block h-full w-full touch-manipulation rounded-full transition-colors duration-300';
const THUMB_CLASS = 'pointer-events-none absolute left-2 top-2 h-12 w-12 rounded-full shadow-[0_5px_16px_rgba(0,0,0,0.24)] transition-all duration-300 ease-out';

function SunIcon({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-5 w-5 transition ${active ? 'opacity-100' : 'opacity-45'}`}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.2M12 19.3v2.2M4.7 4.7l1.6 1.6M17.7 17.7l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.7 19.3l1.6-1.6M17.7 6.3l1.6-1.6" />
    </svg>
  );
}

function MoonIcon({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-5 w-5 transition ${active ? 'opacity-100' : 'opacity-45'}`}
      aria-hidden="true"
    >
      <path d="M20.5 13.3A8.5 8.5 0 1 1 10.7 3.5a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}

export default function ThemeGlassSwitch({ isDark, onToggle, className = '' }: ThemeGlassSwitchProps) {
  const shellToneClass = isDark ? 'bg-gradient-to-b from-white/14 to-white/6' : 'bg-gradient-to-b from-white/38 to-stone-200/20';

  const stopBubble = (event: MouseEvent | KeyboardEvent | PointerEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  };

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    stopBubble(event);
    onToggle();
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    stopBubble(event);
    if (event.detail === 0) {
      onToggle();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    stopBubble(event);
    onToggle();
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
      onMouseDown={stopBubble}
      onKeyDown={handleKeyDown}
      className={`${SHELL_CLASS} ${shellToneClass} ${className}`}
    >
      <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-white/14 to-white/0" />
      <span
        className={`${THUMB_CLASS} ${
          isDark ? 'translate-x-16 bg-slate-900/78' : 'translate-x-0 bg-white/85'
        }`}
      />

      <span className="pointer-events-none relative z-10 grid h-full w-full grid-cols-2 items-center">
        <span className={`pointer-events-none justify-self-center ${isDark ? 'text-white/65' : 'text-amber-500'}`}>
          <SunIcon active={!isDark} />
        </span>
        <span className={`pointer-events-none justify-self-center ${isDark ? 'text-cyan-100' : 'text-slate-500'}`}>
          <MoonIcon active={isDark} />
        </span>
      </span>
    </button>
  );
}
