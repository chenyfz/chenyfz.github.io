import type { ReactNode } from 'react';

type IndexSectionShellProps = {
  id: string;
  title: string;
  subtitle?: string;
  isDark: boolean;
  headingFontFamily: string;
  children: ReactNode;
};

export default function IndexSectionShell({ id, title, subtitle, isDark, headingFontFamily, children }: IndexSectionShellProps) {
  const bodyClass = isDark ? 'text-white/90' : 'text-neutral-900';
  const subtitleClass = isDark ? 'text-white/70' : 'text-neutral-600';

  return (
    <section
      id={id}
      className={`scroll-mt-24 py-1 transition-colors sm:py-2 ${bodyClass}`}
    >
      <header className="mb-4">
        <h2 className="text-2xl text-amber-700" style={{ fontFamily: headingFontFamily, fontWeight: 400 }}>{title}</h2>
        {subtitle ? <p className={`mt-1 text-[18px] ${subtitleClass}`} style={{ fontFamily: headingFontFamily, fontWeight: 400 }}>{subtitle}</p> : null}
      </header>
      <div className="space-y-3 text-[18px] leading-relaxed">{children}</div>
    </section>
  );
}
