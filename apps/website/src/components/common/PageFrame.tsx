import type { ReactNode } from 'react';
import type { Locale } from '@/i18n/config';

type Props = {
  lang: Locale;
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  variant?: 'reading' | 'story' | 'showcase';
  children: ReactNode;
  className?: string;
};

export default function PageFrame({ lang, title, subtitle, eyebrow, variant = 'reading', children, className = '' }: Props) {
  const back = <a className="page-return" href={`/${lang}/`}>← {lang === 'zh' ? '返回简历' : 'Back to Resume'}</a>;
  return <main className={`subpage subpage--${variant} ${className}`} lang={lang}>
    <div className="page-container">
      <header className="page-header">
        {back}
        {eyebrow && <p className="page-muted page-eyebrow">{eyebrow}</p>}
        {title && <h1>{title}</h1>}
        {subtitle && <p className="page-muted">{subtitle}</p>}
      </header>
      <div className="page-body">{children}</div>
    </div>
  </main>;
}
