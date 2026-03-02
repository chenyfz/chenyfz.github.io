import { forwardRef, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';

type GlassCardContainerUi = {
  root?: string;
  inner?: string;
};

type GlassCardContainerProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  highlighted?: boolean;
  radius?: number | string;
  visualFilter?: string;
  ui?: GlassCardContainerUi;
};

const GlassCardContainer = forwardRef<HTMLDivElement, GlassCardContainerProps>(function GlassCardContainer(
  {
    children,
    highlighted = false,
    radius = 4,
    visualFilter = 'none',
    className = '',
    style,
    ui,
    ...rest
  },
  ref
) {
  const rootUiClass = ui?.root ?? '';
  const innerUiClass = ui?.inner ?? '';
  const hasRadiusClass = rootUiClass.includes('rounded');
  const radiusValue = typeof radius === 'number' ? `${radius}px` : radius;

  const mergedStyle: CSSProperties = {
    borderRadius: hasRadiusClass ? undefined : radiusValue,
    background: highlighted ? 'var(--glass-highlight-gradient)' : 'var(--glass-gradient)',
    backgroundColor: highlighted ? 'var(--glass-highlight-bg-color)' : 'var(--glass-bg-color)',
    borderColor: highlighted ? 'var(--glass-highlight-border-color)' : 'var(--glass-border-color)',
    boxShadow: highlighted ? 'var(--glass-highlight-shadow)' : 'var(--glass-shadow)',
    backdropFilter: 'blur(14px) saturate(170%)',
    WebkitBackdropFilter: 'blur(14px) saturate(170%)',
    filter: visualFilter,
    transitionProperty: 'background-color, border-color, box-shadow, filter',
    transitionDuration: highlighted ? '0ms' : '360ms',
    transitionTimingFunction: highlighted ? 'ease-out' : 'ease-in',
    ...style
  };

  return (
    <div
      ref={ref}
      className={`h-full w-full border ${rootUiClass} ${className}`}
      style={mergedStyle}
      {...rest}
    >
      <div
        className={`h-full w-full overflow-hidden ${innerUiClass}`}
        style={{ borderRadius: hasRadiusClass ? undefined : radiusValue }}
      >
        {children}
      </div>
    </div>
  );
});

export default GlassCardContainer;
