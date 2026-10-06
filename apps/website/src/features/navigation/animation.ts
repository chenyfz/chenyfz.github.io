import gsap from 'gsap';
import { Physics2DPlugin } from 'gsap/Physics2DPlugin';
import { buildMotionConfig, GRAVITY } from './motion';

gsap.registerPlugin(Physics2DPlugin);
/** Every tween, delayed call and ticker belongs to this one menu opening. */
export function animateMenu(scene: HTMLElement, elements: HTMLElement[], surfaces: (HTMLElement | null)[], mask: HTMLElement, tint: string, onClose: () => void) {
  const owned: gsap.core.Animation[] = [];
  const own = <T extends gsap.core.Animation>(animation: T): T => { owned.push(animation); return animation; };
  const rect = scene.getBoundingClientRect();
  const targets = elements.map((el, index) => {
    const box = el.getBoundingClientRect();
    return { width: box.width, height: box.height, laneBase: index - (elements.length - 1) / 2,
      targetX: box.left + box.width / 2 - rect.left - rect.width / 2,
      targetY: box.top + box.height / 2 - rect.top - rect.height / 2 };
  });
  const minY = Math.min(...targets.map(target => target.targetY));
  const spanY = Math.max(1, Math.max(...targets.map(target => target.targetY)) - minY);
  const configs = targets.map(target => buildMotionConfig({ ...target, sceneBottomY: rect.height / 2, enterRatio: 0.45,
    preEnterRatio: gsap.utils.clamp(0.24, 0.45, 0.45 - (target.targetY - minY) / spanY * 0.2) }));
  const maxEnterTime = Math.max(...configs.map(config => config.enterTime));
  const motion = elements.map((element, index) => {
    const config = configs[index];
    gsap.set(element, { x: config.x - targets[index].targetX, y: config.startY - targets[index].targetY,
      rotationZ: config.startRotationZ, rotationX: config.startRotationX, rotationY: config.startRotationY });
    const surface = surfaces[index];
    if (surface) {
      gsap.set(surface, { filter: 'blur(20px)' });
      own(gsap.to(surface, { filter: 'blur(0px)', delay: 0.1, duration: Math.max(0.18, maxEnterTime * 0.52), ease: 'none' }));
    }
    return own(gsap.to(element, { duration: config.duration, ease: 'none',
      physics2D: { velocity: config.velocity, angle: config.angle, gravity: GRAVITY },
      rotationZ: config.endRotationZ, rotationX: config.endRotationX, rotationY: config.endRotationY,
      onComplete: () => { element.style.visibility = 'hidden'; } }));
  });
  gsap.set(mask, { backdropFilter: 'blur(0px)', backgroundColor: 'rgba(0,0,0,0)' });
  const preBlur = own(gsap.to(mask, { backdropFilter: 'blur(5.2px)', backgroundColor: tint, delay: 0.25,
    duration: Math.max(0.2, maxEnterTime * 0.82), ease: 'none' }));
  const transient: gsap.core.Animation[] = [];
  let entered = false;
  let released = false;
  let keyboard = false;
  let autoRelease: gsap.core.Tween | undefined;
  const release = (selected: number | null, closeAfter = false, afterClose?: () => void) => {
    if (released) { if (closeAfter) onClose(); return; }
    released = true;
    if (keyboard) {
      onClose(); afterClose?.();
      return;
    }
    preBlur.kill();
    transient.forEach(animation => animation.kill());
    autoRelease?.kill();
    const exit = own(gsap.timeline({ onComplete: () => { onClose(); afterClose?.(); } }));
    motion.forEach((tween, index) => exit.to(tween, { timeScale: 1, duration: 0.36, ease: 'none' }, selected === index ? 0.42 : 0));
    elements.forEach(el => { el.style.pointerEvents = 'none'; el.inert = true; });
    exit.to(mask, { backdropFilter: 'blur(0px)', backgroundColor: 'rgba(0,0,0,0)', duration: 0.3, ease: 'none' }, 0.4);
    surfaces.forEach(surface => { if (surface) exit.to(surface, { filter: 'blur(20px)', duration: 0.3, ease: 'none' }, selected === null ? 0.4 : 0.82); });
    // Close after all drop animations, including a modified/new-tab activation.
  };
  const detect = () => {
    if (entered || released) return;
    motion.forEach((tween, index) => {
      const config = configs[index];
      if (config.hasPreSlowed || tween.time() < config.preEnterTime) return;
      config.hasPreSlowed = true;
      transient.push(own(gsap.to(tween, { timeScale: 0.72, duration: 0.12, ease: 'power2.out' })));
    });
    if (!motion.every((tween, index) => tween.time() >= configs[index].enterTime)) return;
    entered = true;
    preBlur.kill();
    motion.forEach(tween => transient.push(own(gsap.timeline()
      .to(tween, { timeScale: 0.46, duration: 0.14, ease: 'power2.out' })
      .to(tween, { timeScale: 0.18, duration: 0.28, ease: 'power2.out' })
      .to(tween, { timeScale: 0.05, duration: 0.9, ease: 'expo.out' })
      .to(tween, { timeScale: 0.0048, duration: 6.8, ease: 'expo.out' }))));
    if (!keyboard) autoRelease = own(gsap.delayedCall(5, () => release(null, true)));
    transient.push(own(gsap.timeline()
      .to(mask, { backdropFilter: 'blur(7px)', backgroundColor: tint, duration: 0.2, ease: 'none' })
      .to(mask, { backdropFilter: 'blur(9px)', backgroundColor: tint, duration: 0.36, ease: 'none' })));
  };
  const keepOpenForKeyboard = () => {
    if (keyboard || released) return;
    keyboard = true; entered = true;
    owned.forEach(animation => animation.kill());
    gsap.set(elements, { x: 0, y: 0, rotationZ: 0, rotationX: 0, rotationY: 0 });
    gsap.set(surfaces.filter(Boolean), { filter: 'blur(0px)' });
    gsap.set(mask, { backdropFilter: 'blur(9px)', backgroundColor: tint });
  };
  gsap.ticker.add(detect);
  const refreshIdleTimeout = () => { if (!released) autoRelease?.restart(true); };
  return { release, keepOpenForKeyboard, refreshIdleTimeout, dispose: () => {
    gsap.ticker.remove(detect);
    owned.forEach(animation => animation.kill());
    elements.forEach(el => { el.inert = false; el.style.pointerEvents = ''; el.style.visibility = ''; });
  } };
}
