import { motionDuration } from '@/lib/motion';
import { createTransitionScope, type TransitionMotion } from '@/lib/transition-motion';
import { THEME_CHANGE_EVENT } from '@/styles/theme';
import { revealText } from './motion';
import { createTextSnapshot } from './text-snapshot';

export function createLanguageTransition(signal: AbortSignal): TransitionMotion {
  let snapshot: ReturnType<typeof createTextSnapshot> | null = null;
  let resize: ResizeObserver | null = null;
  let main: HTMLElement | null = null;
  const stop = () => scope.dispose();
  const scope = createTransitionScope(signal, () => {
    snapshot?.dispose();
    resize?.disconnect();
    main?.removeEventListener('pointerdown', stop, true);
    window.removeEventListener('scroll', stop, true);
    window.removeEventListener('resize', stop);
    window.removeEventListener(THEME_CHANGE_EVENT, stop);
  });
  return {
    dispose: scope.dispose,
    // Keep the old language readable until the translated content is ready.
    leave: () => Promise.resolve(),
    async enter() {
      main = document.querySelector('main');
      if (!main || scope.disposed) return;
      snapshot = createTextSnapshot(main);
      const titles = [...snapshot.titles, ...document.querySelectorAll<HTMLElement>('[data-language-text="title"] > span')];
      const bodies = [...snapshot.bodies, ...document.querySelectorAll<HTMLElement>('[data-language-text="body"] > span')];
      if (!titles.length && !bodies.length) return;

      // Any layout change or interaction makes the measured text positions stale.
      const bounds = main.getBoundingClientRect();
      resize = new ResizeObserver(() => {
        const next = main!.getBoundingClientRect();
        if (next.width !== bounds.width || next.height !== bounds.height) stop();
      });
      resize.observe(main);
      main.addEventListener('pointerdown', stop, { capture: true, once: true });
      window.addEventListener('scroll', stop, { capture: true, passive: true });
      window.addEventListener('resize', stop, { once: true });
      window.addEventListener(THEME_CHANGE_EVENT, stop, { once: true });
      try {
        await scope.run(timeline => {
          snapshot!.show();
          const duration = motionDuration('language-enter');
          revealText(timeline, titles, duration);
          revealText(timeline, bodies, duration * .8, true);
        });
      } finally { scope.dispose(); }
    }
  };
}
