import { forwardRef, type CSSProperties, type HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLDivElement> & {
  highlighted?: boolean;
  radius?: number | string;
  visualFilter?: string;
  innerClassName?: string;
};

const GlassCardContainer = forwardRef<HTMLDivElement, Props>(function GlassCardContainer({
  children, highlighted = false, radius = 4, visualFilter = 'none', innerClassName = '', className = '', style, ...rest
}, ref) {
  const variables = {
    '--glass-radius': typeof radius === 'number' ? `${radius}px` : radius,
    '--glass-filter': visualFilter,
    ...style
  } as CSSProperties;
  return <div ref={ref} className={`glass-card${highlighted ? ' glass-card--highlighted' : ''} ${className}`} style={variables} {...rest}>
    <div className={`glass-card-inner ${innerClassName}`}>{children}</div>
  </div>;
});

export default GlassCardContainer;
