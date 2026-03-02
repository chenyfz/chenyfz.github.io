import { Children, isValidElement, useMemo, useRef, useState, type MouseEvent, type ReactElement, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { Physics2DPlugin } from 'gsap/Physics2DPlugin';
import GlassCardContainer from '@/components/GlassCardContainer';

gsap.registerPlugin(Physics2DPlugin, useGSAP);

type MotionConfig = {
  width: number;
  height: number;
  x: number;
  startY: number;
  angle: number;
  velocity: number;
  enterTime: number;
  duration: number;
  startRotationZ: number;
  startRotationX: number;
  startRotationY: number;
  endRotationZ: number;
  endRotationX: number;
  endRotationY: number;
};

type OverlayItemConfig = {
  surface?: 'glass' | 'none';
  interactive?: boolean;
  glassUi?: {
    root?: string;
    inner?: string;
  };
};

type BulletTimeSlotOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  layoutClassName?: string;
  layoutItemClassNames?: string[];
  itemConfigs?: OverlayItemConfig[];
  maskTintColor?: string;
  debug?: boolean;
  debugShowLayout?: boolean;
};

const GRAVITY = 7500;
const BULLET_ENTER_RATIO = 0.45;
const MASK_BLUR_APPEAR_DELAY = 0.25;
const MASK_BLUR_DISAPPEAR_DELAY = 0.4;
const SELECTED_DROP_EXTRA_DELAY = 0.42;
const CARD_FILTER_START = 'blur(20px)';
const CARD_FILTER_END = 'blur(0px)';
const CARD_FOCUS_APPEAR_DELAY = 0.1;
const CARD_FOCUS_DURATION_RATIO = 0.52;
const MASK_BLUR_PRE_BULLET = 'blur(5.2px)';
const MASK_BLUR_BULLET_NEAR = 'blur(7px)';
const MASK_BLUR_BULLET_FAR = 'blur(9px)';
const AUTO_RELEASE_SECONDS = 5;

const solveTimeToY = (startY: number, targetY: number, initialVelocityY: number) => {
  const a = 0.5 * GRAVITY;
  const b = initialVelocityY;
  const c = startY - targetY;
  const disc = b * b - 4 * a * c;

  if (disc <= 0) return 0.35;

  const sqrtDisc = Math.sqrt(disc);
  const t1 = (-b - sqrtDisc) / (2 * a);
  const t2 = (-b + sqrtDisc) / (2 * a);

  if (t1 > 0) return t1;
  if (t2 > 0) return t2;
  return 0.35;
};

const buildMotionConfig = (args: {
  width: number;
  height: number;
  laneBase: number;
  targetX: number;
  targetY: number;
  sceneBottomY: number;
}): MotionConfig => {
  const { width, height, laneBase, targetX, targetY, sceneBottomY } = args;

  const startY = sceneBottomY + height / 2 + 26 + gsap.utils.random(-8, 8, 1);

  // We lock the trajectory apex to layout coordinates so slow-motion aligns with source DOM order.
  const initialVelocityY = -Math.sqrt(Math.max(1, 2 * GRAVITY * (startY - targetY)));
  const apexTime = Math.max(0.12, -initialVelocityY / GRAVITY);

  const lateralAtApex = laneBase * 10 + gsap.utils.random(-6, 6, 0.2);
  const initialVelocityX = lateralAtApex / apexTime;
  const startX = targetX - initialVelocityX * apexTime;

  const velocity = Math.sqrt(initialVelocityX * initialVelocityX + initialVelocityY * initialVelocityY);
  const angle = (Math.atan2(initialVelocityY, initialVelocityX) * 180) / Math.PI;

  const duration = Math.max(1.2, solveTimeToY(startY, sceneBottomY + height + 48, initialVelocityY));
  const enterTime = apexTime * BULLET_ENTER_RATIO;

  return {
    width,
    height,
    x: startX,
    startY,
    angle,
    velocity,
    enterTime,
    duration,
    startRotationZ: gsap.utils.random(-32, 32, 1),
    startRotationX: gsap.utils.random(-26, 12, 1),
    startRotationY: gsap.utils.random(-18, 18, 1),
    endRotationZ: gsap.utils.random(0, 7, 1),
    endRotationX: gsap.utils.random(-0.5, 2.5, 1),
    endRotationY: gsap.utils.random(-0.5, 2.5, 1)
  };
};

export default function BulletTimeSlotOverlay({
  isOpen,
  onClose,
  children,
  layoutClassName = 'grid grid-cols-4 gap-4',
  layoutItemClassNames,
  itemConfigs,
  maskTintColor = 'rgba(0, 0, 0, 0)',
  debug = false,
  debugShowLayout = false
}: BulletTimeSlotOverlayProps) {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const blurMaskRef = useRef<HTMLDivElement | null>(null);
  const layoutItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const motionItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const glassItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const motionConfigsRef = useRef<MotionConfig[]>([]);
  const motionTweensRef = useRef<gsap.core.Tween[]>([]);
  const bulletSlowTweensRef = useRef<gsap.core.Animation[]>([]);
  const preBlurTweenRef = useRef<gsap.core.Tween | null>(null);
  const blurTimelineRef = useRef<gsap.core.Animation | null>(null);
  const dismissCallRef = useRef<gsap.core.Tween | null>(null);
  const autoReleaseCallRef = useRef<gsap.core.Tween | null>(null);
  const focusTweensRef = useRef<gsap.core.Tween[]>([]);

  const hasEnteredBulletRef = useRef(false);
  const hasReleasedRef = useRef(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  const items = useMemo(
    () =>
      Children.toArray(children).filter((child): child is ReactElement => {
        return isValidElement(child);
      }),
    [children]
  );

  const resolvedItemConfigs = useMemo(() => itemConfigs ?? [], [itemConfigs]);

  const killTransientAnimations = () => {
    bulletSlowTweensRef.current.forEach((animation) => animation.kill());
    preBlurTweenRef.current?.kill();
    blurTimelineRef.current?.kill();
    dismissCallRef.current?.kill();
    autoReleaseCallRef.current?.kill();
  };

  const cleanupAnimations = () => {
    killTransientAnimations();
    focusTweensRef.current.forEach((tween) => tween.kill());
    motionTweensRef.current.forEach((tween) => tween?.kill());
    if (blurMaskRef.current) {
      gsap.killTweensOf(blurMaskRef.current);
    }
  };

  useGSAP(
    () => {
      if (!isOpen || items.length === 0) return;

      motionTweensRef.current = [];
      bulletSlowTweensRef.current = [];
      focusTweensRef.current = [];
      hasEnteredBulletRef.current = false;
      hasReleasedRef.current = false;
      setHighlightedIndex(null);

      const scene = sceneRef.current;
      if (!scene) return;

      const sceneRect = scene.getBoundingClientRect();
      const sceneCenterX = sceneRect.left + sceneRect.width / 2;
      const sceneCenterY = sceneRect.top + sceneRect.height / 2;
      const sceneBottomY = sceneRect.height / 2;

      if (debug) {
        motionItemRefs.current.forEach((itemEl, index) => {
          if (!itemEl) return;

          const layoutEl = layoutItemRefs.current[index];
          const rect = layoutEl?.getBoundingClientRect();
          const width = rect?.width ?? 150;
          const height = rect?.height ?? 150;
          const targetX = rect ? rect.left + rect.width / 2 - sceneCenterX : (index - (items.length - 1) / 2) * 64;
          const targetY = rect ? rect.top + rect.height / 2 - sceneCenterY : 0;

          gsap.set(itemEl, {
            width,
            height,
            x: targetX,
            y: targetY,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            autoAlpha: 1,
            pointerEvents: 'auto'
          });
        });

        glassItemRefs.current.forEach((glassEl) => {
          if (!glassEl) return;
          gsap.set(glassEl, { filter: CARD_FILTER_END });
        });

        if (blurMaskRef.current) {
          gsap.set(blurMaskRef.current, { backdropFilter: 'blur(0px)', backgroundColor: 'rgba(0, 0, 0, 0)' });
        }

        return () => {
          cleanupAnimations();
        };
      }

      motionConfigsRef.current = items.map((_, index) => {
        const laneBase = index - (items.length - 1) / 2;
        const layoutEl = layoutItemRefs.current[index];

        if (!layoutEl) {
          return buildMotionConfig({
            width: 150,
            height: 150,
            laneBase,
            targetX: laneBase * 64,
            targetY: 0,
            sceneBottomY
          });
        }

        const rect = layoutEl.getBoundingClientRect();
        return buildMotionConfig({
          width: rect.width,
          height: rect.height,
          laneBase,
          targetX: rect.left + rect.width / 2 - sceneCenterX,
          targetY: rect.top + rect.height / 2 - sceneCenterY,
          sceneBottomY
        });
      });

      const maxEnterTime = Math.max(...motionConfigsRef.current.map((config) => config.enterTime));

      motionItemRefs.current.forEach((itemEl, index) => {
        if (!itemEl) return;
        const config = motionConfigsRef.current[index];
        if (!config) return;

        gsap.set(itemEl, {
          width: config.width,
          height: config.height,
          x: config.x,
          y: config.startY,
          rotationZ: config.startRotationZ,
          rotationX: config.startRotationX,
          rotationY: config.startRotationY,
          autoAlpha: 1,
          pointerEvents: 'auto'
        });

        const glassEl = glassItemRefs.current[index];
        if (glassEl) {
          gsap.set(glassEl, { filter: CARD_FILTER_START });
          const focusTween = gsap.to(glassEl, {
            filter: CARD_FILTER_END,
            delay: CARD_FOCUS_APPEAR_DELAY,
            duration: Math.max(0.18, maxEnterTime * CARD_FOCUS_DURATION_RATIO),
            ease: 'none'
          });
          focusTweensRef.current.push(focusTween);
        }

        const motionTween = gsap.to(itemEl, {
          duration: config.duration,
          ease: 'none',
          physics2D: {
            velocity: config.velocity,
            angle: config.angle,
            gravity: GRAVITY
          },
          rotationZ: config.endRotationZ,
          rotationX: config.endRotationX,
          rotationY: config.endRotationY
        });

        motionTween.eventCallback('onComplete', () => {
          gsap.set(itemEl, { autoAlpha: 0 });
        });

        motionTweensRef.current[index] = motionTween;
      });

      if (blurMaskRef.current) {
        gsap.set(blurMaskRef.current, { backdropFilter: 'blur(0px)', backgroundColor: 'rgba(0, 0, 0, 0)' });
        preBlurTweenRef.current = gsap.to(blurMaskRef.current, {
          backdropFilter: MASK_BLUR_PRE_BULLET,
          backgroundColor: maskTintColor,
          delay: MASK_BLUR_APPEAR_DELAY,
          duration: Math.max(0.2, maxEnterTime * 0.82),
          ease: 'none'
        });
      }

      const detectBulletTime = () => {
        if (hasEnteredBulletRef.current || hasReleasedRef.current) return;

        // Enter bullet-time only when all cards reach their own pre-apex checkpoint.
        const allReachedEnterTime = motionTweensRef.current.every(
          (tween, index) => tween && tween.time() >= motionConfigsRef.current[index].enterTime
        );
        if (!allReachedEnterTime) return;

        hasEnteredBulletRef.current = true;
        preBlurTweenRef.current?.kill();

        motionTweensRef.current.forEach((tween) => {
          if (!tween) return;
          const slowTimeline = gsap
            .timeline()
            .to(tween, { timeScale: 0.46, duration: 0.14, ease: 'power2.out' })
            .to(tween, { timeScale: 0.18, duration: 0.28, ease: 'power2.out' })
            .to(tween, { timeScale: 0.05, duration: 0.9, ease: 'expo.out' })
            .to(tween, { timeScale: 0.0048, duration: 6.8, ease: 'expo.out' });
          bulletSlowTweensRef.current.push(slowTimeline);
        });

        autoReleaseCallRef.current = gsap.delayedCall(AUTO_RELEASE_SECONDS, () => {
          if (hasReleasedRef.current) return;
          handleDrop(null, true);
        });

        if (blurMaskRef.current) {
          blurTimelineRef.current = gsap
            .timeline()
            .to(blurMaskRef.current, {
              backdropFilter: MASK_BLUR_BULLET_NEAR,
              backgroundColor: maskTintColor,
              duration: 0.2,
              ease: 'none'
            })
            .to(blurMaskRef.current, {
              backdropFilter: MASK_BLUR_BULLET_FAR,
              backgroundColor: maskTintColor,
              duration: 0.36,
              ease: 'none'
            });
        }
      };

      gsap.ticker.add(detectBulletTime);

      return () => {
        gsap.ticker.remove(detectBulletTime);
        cleanupAnimations();
      };
    },
    { dependencies: [isOpen, items.length, debug] }
  );

  const handleDrop = (clickedIndex: number | null, closeAfter = false) => {
    if (hasReleasedRef.current) {
      if (closeAfter) onClose();
      return;
    }
    hasReleasedRef.current = true;
    setHighlightedIndex(clickedIndex);

    if (debug) {
      if (closeAfter) onClose();
      return;
    }

    killTransientAnimations();

    motionTweensRef.current.forEach((tween, index) => {
      if (!tween) return;
      const selectedDelay = clickedIndex !== null && index === clickedIndex ? SELECTED_DROP_EXTRA_DELAY : 0;
      gsap.to(tween, {
        timeScale: 1,
        delay: selectedDelay,
        duration: 0.36,
        ease: 'none'
      });
    });

    motionItemRefs.current.forEach((item) => {
      if (!item) return;
      gsap.set(item, { pointerEvents: 'none' });
    });

    if (blurMaskRef.current) {
      gsap.to(blurMaskRef.current, {
        backdropFilter: 'blur(0px)',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        delay: MASK_BLUR_DISAPPEAR_DELAY,
        duration: 0.3,
        ease: 'none'
      });
    }

    const reblurDelay = clickedIndex !== null ? MASK_BLUR_DISAPPEAR_DELAY + SELECTED_DROP_EXTRA_DELAY : MASK_BLUR_DISAPPEAR_DELAY;

    glassItemRefs.current.forEach((glassEl) => {
      if (!glassEl) return;
      gsap.to(glassEl, {
        filter: CARD_FILTER_START,
        delay: reblurDelay,
        duration: 0.3,
        ease: 'none'
      });
    });

    if (closeAfter) {
      dismissCallRef.current = gsap.delayedCall(0.9, onClose);
    }
  };

  const handleMaskMouseDown = (event: MouseEvent<HTMLElement>) => {
    if (event.target !== event.currentTarget) return;
    handleDrop(null, true);
  };

  if (!isOpen) return null;

  return (
    <section
      ref={sceneRef}
      className="fixed inset-0 z-[60] select-none overflow-hidden [perspective:1100px]"
      onMouseDown={handleMaskMouseDown}
    >
      <div ref={blurMaskRef} className="pointer-events-none absolute inset-0 backdrop-blur-[0px]" />

      <div className="absolute left-1/2 top-1/2">
        {items.map((item, index) => {
          const itemConfig = resolvedItemConfigs[index];
          const interactive = itemConfig?.interactive ?? true;
          const shellClass = interactive ? 'cursor-pointer' : 'cursor-default';

          return (
            <div
              key={`motion-${index}`}
              ref={(el) => {
                motionItemRefs.current[index] = el;
              }}
              role={interactive ? 'button' : undefined}
              tabIndex={interactive ? 0 : -1}
              onClick={interactive ? () => handleDrop(index) : undefined}
              onKeyDown={
                interactive
                  ? (event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        handleDrop(index);
                      }
                    }
                  : undefined
              }
              className={`absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d] ${shellClass}`}
              style={{ zIndex: index + 1 }}
              aria-label={`Drop card ${index + 1}`}
            >
              {itemConfig?.surface === 'none' ? (
                item
              ) : (
                <GlassCardContainer
                  ref={(el) => {
                    glassItemRefs.current[index] = el;
                  }}
                  highlighted={highlightedIndex === index}
                  ui={itemConfig?.glassUi}
                  radius={4}
                  visualFilter={CARD_FILTER_END}
                >
                  {item}
                </GlassCardContainer>
              )}
            </div>
          );
        })}
      </div>

      <div
        className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${
          debugShowLayout ? 'z-50 opacity-70' : 'opacity-0'
        }`}
      >
        <div className={layoutClassName}>
          {items.map((item, index) => (
            <div
              key={`layout-${index}`}
              ref={(el) => {
                layoutItemRefs.current[index] = el;
              }}
              className={`${debugShowLayout ? 'rounded-[4px] outline outline-1 outline-emerald-300/90' : 'rounded-[4px]'} ${layoutItemClassNames?.[index] ?? ''}`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
