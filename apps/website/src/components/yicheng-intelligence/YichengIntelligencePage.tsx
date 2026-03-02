import { useState } from 'react';
import type { Locale } from '@/i18n/config';
import type { YichengIntelligencePageCopy } from '@/i18n/pages/yicheng-intelligence/types';
import useThemeMode from '@/hooks/useThemeMode';
import {
  StaticCvFontFace,
  getStaticCvBodyFontFamily,
  getStaticCvHeadingFontFamily
} from '@/components/cv/StaticCvTypography';

interface YichengIntelligencePageProps {
  text: YichengIntelligencePageCopy;
  lang: Locale;
}

export default function YichengIntelligencePage({ text, lang }: YichengIntelligencePageProps) {
  const isDark = useThemeMode() === 'dark';
  const headingFontFamily = getStaticCvHeadingFontFamily(lang);
  const bodyFontFamily = getStaticCvBodyFontFamily(lang);

  const mutedTextClass = isDark ? 'text-white/65' : 'text-neutral-600';

  return (
    <>
      <StaticCvFontFace lang={lang} />
      <main className={`min-h-[calc(100vh-4rem)] px-4 py-8 text-[18px] sm:px-6 sm:py-10 lg:px-10 ${lang === 'zh' ? 'text-justify' : 'text-left'}`} style={{ fontFamily: bodyFontFamily }}>
        <div className="mx-auto w-full max-w-6xl space-y-7">
          <header className="space-y-1">
            <h1 className="text-3xl text-primary-500" style={{ fontFamily: headingFontFamily, fontWeight: 400 }}>{text.title}</h1>
            <p className={mutedTextClass}>{text.subtitle}</p>
          </header>

          <section className="py-1">
            <h2 className="text-xl text-primary-500" style={{ fontFamily: headingFontFamily, fontWeight: 400 }}>{text.detailsTitle}</h2>
            <div className="mt-5 space-y-6">
              {text.sections.map((section) => (
                <article key={section.id} className="space-y-3">
                  <h3 className="text-lg text-primary-500" style={{ fontFamily: headingFontFamily, fontWeight: 400 }}>
                    {section.title}
                  </h3>
                  <div className="space-y-2">
                    {section.content.map((item, index) => (
                      <div key={index} className="space-y-1">
                        {item.title && (
                          <h4 className="text-md" style={{ fontFamily: headingFontFamily, fontWeight: 400 }}>
                            {item.title}
                          </h4>
                        )}
                        <p className={isDark ? 'text-white/95' : 'text-neutral-800'}>
                          {item.description}
                        </p>
                        {item.muted && (
                          <p className={mutedTextClass}>
                            {item.muted}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
