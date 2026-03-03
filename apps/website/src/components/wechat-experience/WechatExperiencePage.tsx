import type { Locale } from '@/i18n/config';
import type { WechatExperiencePageCopy, WechatExperienceSectionContent } from '@/i18n/pages/wechat-experience/types';
import useThemeMode from '@/hooks/useThemeMode';
import {
  StaticCvFontFace,
  getStaticCvBodyFontFamily,
  getStaticCvHeadingFontFamily
} from '@/components/cv/StaticCvTypography';
import SearchServiceCanvasWall from './SearchServiceCanvasWall';
import WechatAnniversaryAnimation from './WechatAnniversaryAnimation';
import WechatVideoPlaceholder from './WechatVideoPlaceholder';

interface WechatExperiencePageProps {
  text: WechatExperiencePageCopy;
  lang: Locale;
}

export default function WechatExperiencePage({ text, lang }: WechatExperiencePageProps) {
  const isDark = useThemeMode() === 'dark';
  const headingFontFamily = getStaticCvHeadingFontFamily(lang);
  const bodyFontFamily = getStaticCvBodyFontFamily(lang);

  const mutedTextClass = isDark ? 'text-white/65' : 'text-neutral-600';
  const detailTextClass = isDark ? 'text-white/90' : 'text-neutral-800';
  const renderSectionText = (sectionId: string, content: WechatExperienceSectionContent[]) => {
    return (
      <div className="space-y-4">
        {content.map((item, index) => (
          <div key={`${sectionId}-${index}`} className="space-y-1.5">
            {item.title ? (
              <h4 className={`text-[16px] md:text-[18px] ${mutedTextClass}`} style={{ fontFamily: headingFontFamily, fontWeight: 400 }}>
                {item.title}
              </h4>
            ) : null}
            <p className={`leading-relaxed ${detailTextClass}`}>{item.description}</p>
            {item.muted ? <p className={`leading-relaxed ${mutedTextClass}`}>{item.muted}</p> : null}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <StaticCvFontFace lang={lang} />
      <main
        className={`min-h-[calc(100vh-4rem)] px-3 py-8 text-[16px] sm:px-4 sm:py-10 md:text-[18px] lg:px-6 ${lang === 'zh' ? 'text-justify' : 'text-left'}`}
        style={{ fontFamily: bodyFontFamily }}
      >
        <div className="mx-auto w-full max-w-6xl space-y-7">
          <header className="mb-4 space-y-1">
            <h1 className="text-2xl text-[var(--primary-color)]" style={{ fontFamily: headingFontFamily, fontWeight: 400 }}>
              {text.title}
            </h1>
            <p className={mutedTextClass}>{text.subtitle}</p>
          </header>

          <section className="py-1">
            <h2 className="text-xl text-[var(--primary-color)]" style={{ fontFamily: headingFontFamily, fontWeight: 400 }}>
              {text.detailsTitle}
            </h2>

            <div className="mt-5 space-y-10">
              {text.sections.map((section) => (
                <article
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-24 border-b border-neutral-200 py-2 transition-colors dark:border-white/12"
                >
                  <h3 className="text-lg text-[var(--primary-color)]" style={{ fontFamily: headingFontFamily, fontWeight: 400 }}>
                    {section.title}
                  </h3>

                  <div className="mt-2">
                    {section.id === 'search' ? (
                      <div className="grid gap-6 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:items-start">
                        {renderSectionText(section.id, section.content)}
                        <SearchServiceCanvasWall lang={lang} />
                      </div>
                    ) : (
                      renderSectionText(section.id, section.content)
                    )}
                  </div>

                  {section.id === 'anniversary' ? <WechatAnniversaryAnimation /> : null}
                  {section.id === 'video' ? <WechatVideoPlaceholder /> : null}
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
