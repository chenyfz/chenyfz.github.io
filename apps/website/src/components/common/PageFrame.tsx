import type { ReactNode } from 'react';
import type { Locale } from '@/i18n/config';

type Props = {
  lang: Locale;
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  variant?: 'reading' | 'story' | 'showcase' | 'immersive';
  children: ReactNode;
};

export default function PageFrame({ lang, title, subtitle, eyebrow, variant = 'reading', children }: Props) {
  const back = <a className="page-return" href={`/${lang}/`}>← {lang === 'zh' ? '返回简历' : 'Back to CV'}</a>;
  return <main className={`subpage subpage--${variant}`} lang={lang}>
    {variant === 'immersive' ? <>{children}<div className="page-return-float">{back}</div></> :
      <div className="page-container">
        <header className="page-header">
          {back}
          {eyebrow && <p className="page-muted page-eyebrow">{eyebrow}</p>}
          {title && <h1>{title}</h1>}
          {subtitle && <p className="page-muted">{subtitle}</p>}
        </header>
        <div className="page-body">{children}</div>
      </div>}
  </main>;
}
