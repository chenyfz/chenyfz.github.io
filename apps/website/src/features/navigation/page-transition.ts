import { motionDuration } from '@/lib/motion';
import { createTransitionScope, type TransitionMotion } from '@/lib/transition-motion';

export function createPageTransition(signal: AbortSignal): TransitionMotion {
  const scope = createTransitionScope(signal, () => { delete document.documentElement.dataset.pageTransition; });
  return {
    dispose: scope.dispose,
    leave: () => scope.run(timeline => {
      timeline.to('#page-content', { opacity: .25, duration: motionDuration('page-exit'), ease: 'power2.in' });
    }),
    async enter() {
      const content = document.getElementById('page-content');
      if (!content || scope.disposed) return;
      const immersive = !!content.querySelector('.subpage--immersive');
      await scope.run(timeline => {
        timeline.fromTo(content, { opacity: 0, y: immersive ? 0 : 8 },
          { opacity: 1, y: 0, duration: motionDuration('page-enter'), ease: 'power3.out' });
      });
      scope.dispose();
    }
  };
}
