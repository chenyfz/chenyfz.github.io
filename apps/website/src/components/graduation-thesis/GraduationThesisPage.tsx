import { useState } from 'react';
import type { GraduationThesisPageCopy } from '@/i18n/pages/graduation-thesis/types';
import type { Locale } from '@/i18n/config';
import useThemeMode from '@/hooks/useThemeMode';
import RichText from '@/components/cv/RichText';
import AnimatedHeight from '@/components/common/AnimatedHeight';
import {
  StaticCvFontFace,
  getStaticCvBodyFontFamily,
  getStaticCvHeadingFontFamily
} from '@/components/cv/StaticCvTypography';

function withBaseUrl(path: string): string {
  if (!path.startsWith('/')) return path;
  return `../..${path}`;
}

function getMediaFrameClass(src: string): string {
  if (src.includes('mechanism-before.png')) return 'aspect-[827/528]';
  if (src.includes('mechanism-after.png')) return 'aspect-[822/524]';
  if (src.includes('study-1-target-and-methods.png')) return 'aspect-[4199/2150]';
  if (src.includes('study2-calibration-result.png')) return 'aspect-[2376/813]';
  if (src.includes('error-distribution-all-condition.png')) return 'aspect-[2100/900]';
  if (src.includes('related-work-pursuit-methods.png')) return 'aspect-[7356/1112]';
  if (src.includes('zoom-pursuit-method.png')) return 'aspect-[3244/836]';
  if (src.includes('zoom-pursuit-with-gaze&pinch.png')) return 'aspect-[3659/1162]';
  if (src.includes('teaser-figure.png')) return 'aspect-[5888/1082]';
  return 'aspect-video';
}

export default function GraduationThesisPage({ text, lang }: { text: GraduationThesisPageCopy; lang: Locale; }) {
  const isDark = useThemeMode() === 'dark';
  const headingFontFamily = getStaticCvHeadingFontFamily(lang);
  const bodyFontFamily = getStaticCvBodyFontFamily(lang);

  // High-contrast, elegant typography colors
  const mutedTextClass = isDark ? 'text-white/60' : 'text-neutral-500';
  const bodyTextClass = isDark ? 'text-white/90' : 'text-neutral-800';
  const headingTextClass = isDark ? 'text-white' : 'text-neutral-900';
  const tagFontFamily = '"SimHei", "Heiti SC", "Microsoft YaHei", "PingFang SC", sans-serif';

  // Soft container for metric blocks
  const glassClass = isDark
    ? 'bg-white/6 backdrop-blur-md'
    : 'bg-white/70 backdrop-blur-md';
  const reflectionsPanelClass = isDark ? 'bg-sky-900/28' : 'bg-sky-50';
  const expandButtonClass = isDark
    ? 'bg-white/14 text-white/92 hover:bg-white/24'
    : 'bg-neutral-200 text-neutral-900 hover:bg-neutral-300';

  const [expanded, setExpanded] = useState(false);

  const filteredLinks = text.primaryLinks.filter(link =>
    !link.label.includes('返回') && !link.label.includes('Back to')
  );

  const previewText = text.reflectionsParagraphs[0]
    ?.replace(/\*\*/g, '')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim() || '';

  return (
    <>
      <StaticCvFontFace lang={lang} />
      <main
        className={`min-h-screen text-[17px] md:text-[19px] overflow-x-hidden text-left ${isDark ? 'bg-[#0f0f0f]' : 'bg-[#fafafa]'}`}
        style={{ fontFamily: bodyFontFamily }}
      >
        {/* Intro Header */}
        <section className="relative flex flex-col px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto pt-14 md:pt-16 pb-8 md:pb-10">
          <div
            data-intro-item
            className={`text-[17px] md:text-[19px] font-semibold mb-6 ${isDark ? 'text-[#8ab4f8]' : 'text-[#1a73e8]'}`}
            style={{ fontFamily: tagFontFamily, fontWeight: 700 }}
          >
            {typeof text.projectInfo === 'string' ? text.projectInfo : text.projectInfo.type}
          </div>
          <h1
            data-intro-item
            className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-[1.15] ${headingTextClass}`}
            style={{ fontFamily: headingFontFamily, fontWeight: 500 }}
          >
            {text.heading}
          </h1>
          <p data-intro-item className={`mt-5 md:mt-6 text-[17px] md:text-[19px] max-w-4xl leading-[1.5] font-light ${mutedTextClass}`}>
            {typeof text.projectInfo === 'string'
              ? text.projectInfo
              : `${text.projectInfo.duration} | ${text.projectInfo.supervisorLabel || 'Supervisor: '} ${text.projectInfo.supervisor}`}
          </p>
          <div data-intro-item className="mt-7 md:mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {filteredLinks.map((link) => (
              <a
                key={`${link.label}-${link.href}`}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noreferrer' : undefined}
                className={`group flex items-center gap-3 text-[17px] md:text-[19px] font-medium transition-colors ${isDark ? 'text-white hover:text-white/70' : 'text-neutral-900 hover:text-neutral-600'
                  }`}
              >
                <div className={`h-[2px] w-8 transition-all duration-300 group-hover:w-16 ${isDark ? 'bg-white' : 'bg-neutral-900'}`} />
                {link.label}
              </a>
            ))}
          </div>
        </section>

        {/* Narrative Slides */}
        <div className="w-full">
          {text.narrativeSections.map((section) => {
            const shouldRenderMedia = Boolean(section.media?.length);

            return (
            <article
              key={section.id}
              data-slide
              className="relative isolate w-full my-16 md:my-20 px-5 sm:px-8 lg:px-16"
            >
              <div className="max-w-7xl mx-auto w-full space-y-8 md:space-y-10">

                {/* Text Content */}
                <div
                  className={[
                    'space-y-5 md:space-y-6'
                  ].join(' ')}
                  style={{ zIndex: 10 }}
                >
                  <div data-slide-header>
                    {section.kicker && (
                      <div
                        className={`text-[17px] md:text-[19px] font-semibold mb-2 ${isDark ? 'text-[#8ab4f8]' : 'text-[#1a73e8]'}`}
                        style={{ fontFamily: tagFontFamily, fontWeight: 700 }}
                      >
                        {section.kicker}
                      </div>
                    )}
                    <h2
                      className={`text-[21px] sm:text-[22px] md:text-[24px] lg:text-[26px] leading-[1.35] ${headingTextClass}`}
                      style={{ fontFamily: headingFontFamily, fontWeight: 400 }}
                    >
                      {section.title}
                    </h2>
                  </div>
                </div>

                {/* Media Content */}
                {shouldRenderMedia ? (
                  <div
                    className={[
                      'grid',
                      section.media && section.media.length > 1 ? 'grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5' : 'grid-cols-1',
                      'relative'
                    ].join(' ')}
                  >
                    {section.media!.map((media, mIdx) => (
                      <div
                        key={mIdx}
                        className={`rounded-[2px] overflow-hidden ${section.media!.length === 3 && mIdx === 2 ? 'sm:col-span-2' : ''}`}
                      >
                        <div
                          className={[
                            'w-full flex items-center justify-center',
                            getMediaFrameClass(media.src),
                            media.type === 'image' ? 'p-4 bg-white' : ''
                          ].join(' ')}
                        >
                          {media.type === 'video' ? (
                            <video
                              src={withBaseUrl(media.src)}
                              poster={media.poster ? withBaseUrl(media.poster) : undefined}
                              controls
                              preload="auto"
                              playsInline
                              className="w-full h-full object-contain"
                            >
                              Your browser does not support the video tag.
                            </video>
                          ) : (
                            <img
                              src={withBaseUrl(media.src)}
                              alt={media.alt}
                              className="w-full h-full object-contain"
                              loading="lazy"
                            />
                          )}
                        </div>
                        {media.caption && (
                          <div className={`pt-3 text-[17px] md:text-[19px] font-light text-left ${isDark ? 'text-white/70' : 'text-black/70'}`}>
                            {media.caption}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : null}

                <div className="space-y-5 md:space-y-6">
                  {section.lead && (
                    <p data-slide-lead className={`w-full text-[17px] md:text-[19px] leading-[1.55] font-light ${bodyTextClass}`}>
                      {section.lead}
                    </p>
                  )}

                  {section.quote && (
                    <blockquote data-slide-quote className={`text-[18px] md:text-[20px] leading-[1.45] italic font-light pl-1 py-1 ${isDark ? 'text-white/90' : 'text-neutral-800'}`}>
                      "{section.quote}"
                    </blockquote>
                  )}

                  {section.points?.length ? (
                    <ul className={`space-y-3 ${bodyTextClass}`}>
                      {section.points.map((point) => (
                        <li key={`${section.id}-${point}`} className="flex items-start gap-4 text-[17px] md:text-[19px] opacity-95 font-light">
                          <span className={`mt-3 block w-2 h-2 rounded-full shrink-0 ${isDark ? 'bg-[#8ab4f8]' : 'bg-[#1a73e8]'}`} />
                          <span className="leading-[1.55]">{point}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {section.metrics?.length ? (
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      {section.metrics.map(metric => (
                          <div key={metric.label} data-slide-metric className={`p-5 rounded-2xl ${glassClass}`}>
                          <div className={`text-[17px] md:text-[19px] font-semibold mb-2 ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>{metric.label}</div>
                          <div className={`text-3xl tracking-tight ${headingTextClass}`} style={{ fontFamily: headingFontFamily }}>{metric.value}</div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </article>
          );
          })}
        </div>

        {/* Reflections Section */}
        <section className="py-16 md:py-20 px-6 sm:px-10 lg:px-16 w-full max-w-6xl mx-auto">
          <div
            className={`p-6 md:p-8 rounded-[4px] ${reflectionsPanelClass} transition-[filter] duration-300 ${!expanded ? 'cursor-pointer hover:[filter:contrast(0.985)_saturate(0.92)] dark:hover:[filter:brightness(1.04)_saturate(0.9)]' : ''}`}
            onClick={() => { if (!expanded) setExpanded(true); }}
          >
            <h2 className={`text-[19px] sm:text-[20px] md:text-[22px] lg:text-[23px] leading-[1.35] mb-5 md:mb-6 ${headingTextClass}`} style={{ fontFamily: headingFontFamily, fontWeight: 400 }}>
              {text.reflectionsTitle}
            </h2>

            <AnimatedHeight expanded={expanded}>
              <div className={`space-y-5 text-[17px] md:text-[19px] font-light leading-relaxed ${bodyTextClass}`}>
                {text.reflectionsParagraphs.map((paragraph, index) => (
                  <RichText
                    key={paragraph + index}
                    text={paragraph}
                    isDark={isDark}
                    mode="block"
                    className="leading-relaxed"
                  />
                ))}
              </div>
            </AnimatedHeight>

            {!expanded && (
              <div>
                <p
                  className={`text-[17px] md:text-[19px] font-light leading-relaxed ${bodyTextClass}`}
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {previewText}
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpanded(true);
                  }}
                  className={`mt-3 inline-flex h-8 items-center gap-2 rounded-[4px] px-3 text-[15px] md:text-[17px] transition ${expandButtonClass}`}
                  style={{ fontFamily: tagFontFamily, fontWeight: 700 }}
                >
                  {lang === 'zh' ? '阅读全文' : 'Read Full Reflection'}
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
              </div>
            )}

            {expanded && (
              <button
                onClick={(e) => { e.stopPropagation(); setExpanded(false); }}
                className={`mt-8 inline-flex h-8 items-center gap-2 rounded-[4px] px-3 text-[15px] md:text-[17px] transition ${expandButtonClass}`}
                style={{ fontFamily: tagFontFamily, fontWeight: 700 }}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path></svg>
                {lang === 'zh' ? '收起' : 'Show Less'}
              </button>
            )}
          </div>
        </section>

      </main>
    </>
  );
}
