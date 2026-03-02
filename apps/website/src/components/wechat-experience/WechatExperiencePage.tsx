import { useEffect, useState } from 'react';
import type { Locale } from '@/i18n/config';
import type { WechatExperiencePageCopy } from '@/i18n/pages/wechat-experience/types';
import useThemeMode from '@/hooks/useThemeMode';
import {
  StaticCvFontFace,
  getStaticCvBodyFontFamily,
  getStaticCvHeadingFontFamily
} from '@/components/cv/StaticCvTypography';

interface WechatExperiencePageProps {
  text: WechatExperiencePageCopy;
  lang: Locale;
}

export default function WechatExperiencePage({ text, lang }: WechatExperiencePageProps) {
  const isDark = useThemeMode() === 'dark';
  const headingFontFamily = getStaticCvHeadingFontFamily(lang);
  const bodyFontFamily = getStaticCvBodyFontFamily(lang);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-section-id]'));

    const updateActiveSection = () => {
      let currentSection = '';
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= 100) {
          currentSection = section.dataset.sectionId ?? '';
        } else {
          break;
        }
      }
      setActiveSection(currentSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const mutedTextClass = isDark ? 'text-white/65' : 'text-neutral-600';
  const sectionTitleClass = 'text-xl text-primary-500';
  const sectionActiveClass = isDark ? 'text-primary-400' : 'text-primary-500';
  const sectionIdleClass = isDark ? 'text-white/80' : 'text-neutral-700';

  return (
    <>
      <StaticCvFontFace lang={lang} />
      <main className={`min-h-[calc(100vh-4rem)] px-4 py-8 text-[18px] sm:px-6 sm:py-10 lg:px-10 ${lang === 'zh' ? 'text-justify' : 'text-left'}`} style={{ fontFamily: bodyFontFamily }}>
        <div className="mx-auto w-full max-w-6xl space-y-7">
          <header className="space-y-1">
            <h1 className="text-3xl text-primary-500" style={{ fontFamily: headingFontFamily, fontWeight: 400 }}>{text.title}</h1>
            <p className={mutedTextClass}>{text.subtitle}</p>
          </header>

          <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
            <aside className="self-start lg:sticky lg:top-24">
              <h2 className="text-xl text-primary-500" style={{ fontFamily: headingFontFamily, fontWeight: 400 }}>{text.tocTitle}</h2>
              <div className="mt-3 space-y-4 text-[18px] lg:max-h-[calc(100vh-9.5rem)] lg:overflow-auto lg:pr-2">
                {text.sections.map((section) => (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left py-2 border-b border-gray-200 dark:border-gray-700 transition-colors ${activeSection === section.id ? sectionActiveClass : sectionIdleClass}`}
                    style={{ fontFamily: headingFontFamily, fontWeight: 400 }}
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            </aside>

            <section className="py-1">
              <h2 className="text-xl text-primary-500" style={{ fontFamily: headingFontFamily, fontWeight: 400 }}>{text.detailsTitle}</h2>
              <div className="mt-5 space-y-10">
                {text.sections.map((section) => (
                  <article
                    key={section.id}
                    id={section.id}
                    data-section-id={section.id}
                    className="scroll-mt-24"
                  >
                    <h3 className={sectionTitleClass} style={{ fontFamily: headingFontFamily, fontWeight: 400 }}>
                      {section.title}
                    </h3>
                    <div className="mt-3 space-y-4">
                      {section.content.map((item, index) => (
                        <div key={index} className="space-y-2">
                          {item.title && (
                            <h4 className="text-lg" style={{ fontFamily: headingFontFamily, fontWeight: 400 }}>
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
        </div>
      </main>
    </>
  );
}
