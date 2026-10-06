import gsap from 'gsap';

export type TransitionMotion = { leave: () => Promise<void>; enter: () => Promise<void>; dispose: () => void };

/** One navigation owns its timelines and always restores styles on interruption. */
export function createTransitionScope(signal: AbortSignal, cleanup: () => void) {
  const contexts: gsap.Context[] = [];
  let settle: (() => void) | null = null;
  let disposed = false;
  const dispose = () => {
    if (disposed) return;
    disposed = true;
    // Entrance snapshots may include exit styles, so unwind in reverse order.
    for (let index = contexts.length - 1; index >= 0; index--) contexts[index].revert();
    cleanup();
    signal.removeEventListener('abort', dispose);
    settle?.(); settle = null;
  };
  signal.addEventListener('abort', dispose, { once: true });
  if (signal.aborted) dispose();
  return {
    dispose,
    get disposed() { return disposed; },
    run: (build: (timeline: gsap.core.Timeline) => void) => new Promise<void>(resolve => {
      if (disposed) { resolve(); return; }
      settle = resolve;
      const context = gsap.context(() => {});
      contexts.push(context);
      context.add(() => build(gsap.timeline({ onComplete: () => { settle = null; resolve(); } })));
    })
  };
}
