type MotionToken = 'control' | 'page-exit' | 'page-enter' | 'language-enter';

/** CSS owns the timings; the production optimizer may convert ms into s. */
export const motionDuration = (token: MotionToken) => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(`--motion-${token}`).trim();
  return (parseFloat(value) || 0) / (value.endsWith('ms') ? 1000 : 1);
};
