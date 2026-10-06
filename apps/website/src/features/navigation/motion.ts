export type MotionConfig = {
  width: number;
  height: number;
  x: number;
  startY: number;
  angle: number;
  velocity: number;
  preEnterTime: number;
  enterTime: number;
  duration: number;
  hasPreSlowed: boolean;
  startRotationZ: number;
  startRotationX: number;
  startRotationY: number;
  endRotationZ: number;
  endRotationX: number;
  endRotationY: number;
};

export const GRAVITY = 7500;
const random = (min: number, max: number, step: number) => Math.round((min + Math.random() * (max - min)) / step) * step;
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

export const buildMotionConfig = (args: {
  width: number;
  height: number;
  laneBase: number;
  targetX: number;
  targetY: number;
  sceneBottomY: number;
  enterRatio: number;
  preEnterRatio: number;
}): MotionConfig => {
  const { width, height, laneBase, targetX, targetY, sceneBottomY, enterRatio, preEnterRatio } = args;

  const startY = sceneBottomY + height / 2 + 26 + random(-8, 8, 1);

  // We lock the trajectory apex to layout coordinates so slow-motion aligns with source DOM order.
  const initialVelocityY = -Math.sqrt(Math.max(1, 2 * GRAVITY * (startY - targetY)));
  const apexTime = Math.max(0.12, -initialVelocityY / GRAVITY);

  const lateralAtApex = laneBase * 10 + random(-6, 6, 0.2);
  const initialVelocityX = lateralAtApex / apexTime;
  const startX = targetX - initialVelocityX * apexTime;

  const velocity = Math.sqrt(initialVelocityX * initialVelocityX + initialVelocityY * initialVelocityY);
  const angle = (Math.atan2(initialVelocityY, initialVelocityX) * 180) / Math.PI;

  const duration = Math.max(1.2, solveTimeToY(startY, sceneBottomY + height + 48, initialVelocityY));
  const preEnterTime = apexTime * preEnterRatio;
  const enterTime = apexTime * enterRatio;

  return {
    width,
    height,
    x: startX,
    startY,
    angle,
    velocity,
    preEnterTime,
    enterTime,
    duration,
    hasPreSlowed: false,
    startRotationZ: random(-32, 32, 1),
    startRotationX: random(-26, 12, 1),
    startRotationY: random(-18, 18, 1),
    endRotationZ: random(0, 7, 1),
    endRotationX: random(-0.5, 2.5, 1),
    endRotationY: random(-0.5, 2.5, 1)
  };
};
