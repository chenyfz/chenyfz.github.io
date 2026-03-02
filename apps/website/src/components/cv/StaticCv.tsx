import React from 'react';
import type { Locale } from '@/i18n/config';
import useThemeMode from '@/hooks/useThemeMode';
import type { ThemeMode } from '@/styles/theme';
import type {
  StaticCvPageCopy,
  StaticCvExperience,
  StaticCvCapability,
  StaticCvBullet
} from '@/i18n/pages/static-cv/types';
import RichText from './RichText';

interface StaticCvProps {
  text: StaticCvPageCopy;
  lang: Locale;
}

const headingFontFamilyZh = `'StaticCvOppoSans', "PingFang SC", "Microsoft YaHei", "Source Han Sans SC", "Noto Sans SC", sans-serif`;
const headingFontFamilyEn = `'Google Sans', 'Google Sans Text', 'DM Sans', 'Noto Sans', "PingFang SC", "Microsoft YaHei", "Source Han Sans SC", sans-serif`;
const bodyFontFamilyZh = `'StaticCvFangsong', 'Noto Serif SC', 'Source Han Serif SC', 'STSong', 'SimSun', serif`;
const bodyFontFamilyEn = `'Newsreader', 'StaticCvFangsong', 'STSong', 'SimSun', 'Iowan Old Style', 'Times New Roman', serif`;

function FontFace({ lang }: { lang: Locale }) {
  const locale = lang === 'zh' ? 'zh' : 'en';

  if (locale === 'en') {
    return (
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500&family=Newsreader:opsz,wght@6..72,400;6..72,500&display=swap');

        @font-face {
          font-family: 'StaticCvFangsong';
          src: url('/fonts/subsets/zhuque-fangsong-400-zh.woff2') format('woff2'),
               url('/fonts/ZhuqueFangsong-Regular.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
      `}</style>
    );
  }

  return (
    <style>{`
      @font-face {
        font-family: 'StaticCvOppoSans';
        src: url('/fonts/subsets/oppo-sans-400-${locale}.woff2') format('woff2'),
             url('/fonts/OPPO%20Sans%204.0.ttf') format('truetype');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }

      @font-face {
        font-family: 'StaticCvFangsong';
        src: url('/fonts/subsets/zhuque-fangsong-400-${locale}.woff2') format('woff2'),
             url('/fonts/ZhuqueFangsong-Regular.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
      }
    `}</style>
  );
}

function HeaderSection({ intro, theme, headingFontFamily }: { intro: StaticCvPageCopy['intro']; theme: ThemeMode; headingFontFamily: string }) {
  const isDark = theme === 'dark';

  return (
    <header className="space-y-4">
      <h1
        className="leading-tight text-[var(--primary-color)] text-[18px] md:text-[20px]"
        style={{ fontFamily: headingFontFamily, fontWeight: 400 }}
      >
        {intro.title}
      </h1>

      <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 ${isDark ? 'text-white/80' : 'text-neutral-700'}`}>
        {intro.metaItems.map((item, index) => (
          <React.Fragment key={`${item.label}-${item.value}`}>
            <span className={isDark ? 'text-white/55' : 'text-neutral-500'}>{item.label}:</span>
            {item.href ? (
              <a href={item.href} className={`underline underline-offset-4 ${isDark ? 'decoration-white/50' : 'decoration-neutral-400'}`}>
                {item.value}
              </a>
            ) : (
              <span>{item.value}</span>
            )}
            {index < intro.metaItems.length - 1 && <span className={isDark ? 'text-white/35' : 'text-neutral-300'}>|</span>}
          </React.Fragment>
        ))}
      </div>

      <p className="leading-relaxed">
        <span>{intro.objectiveLabel}{intro.objectiveSeparator}</span>
        <RichText text={intro.objective} isDark={isDark} />
      </p>
    </header>
  );
}

function BulletContent({ bullet, theme }: { bullet: StaticCvBullet; theme: ThemeMode }) {
  const isDark = theme === 'dark';

  if (typeof bullet === 'string') {
    return <RichText text={bullet} isDark={isDark} />;
  }

  return (
    <>
      <RichText text={bullet.text} isDark={isDark} />
      {bullet.detail && <RichText text={bullet.detail} isDark={isDark} />}
      {bullet.muted && <p className={`mt-1 ${isDark ? 'text-white/60' : 'text-neutral-500'}`}>{bullet.muted}</p>}
    </>
  );
}

function BulletItem({ bullet, theme }: { bullet: StaticCvBullet; theme: ThemeMode }) {
  return (
    <BulletListItem theme={theme}>
      <BulletContent bullet={bullet} theme={theme} />
    </BulletListItem>
  );
}

function bulletToInlineText(bullet: StaticCvBullet): string {
  if (typeof bullet === 'string') return bullet.trim();

  const detail = bullet.detail ? bullet.detail.trim() : '';
  return `${bullet.text}${detail ? ` ${detail}` : ''}`.trim();
}

function BulletListItem({ theme, children }: { theme: ThemeMode; children: React.ReactNode }) {
  const isDark = theme === 'dark';

  return (
    <li className={`flex items-start gap-3 leading-relaxed ${isDark ? 'text-white/95' : 'text-neutral-800'}`}>
      <span className="mt-[0.25em] inline-flex h-5 w-5 shrink-0 items-center justify-center" aria-hidden="true">
        <span className={`inline-block h-1 w-1 rounded-full ${isDark ? 'bg-white/55' : 'bg-neutral-500'}`} />
      </span>
      <div className="min-w-0">{children}</div>
    </li>
  );
}

function ExperienceItem({ experience, theme, headingFontFamily, useZhGridLayout }: { experience: StaticCvExperience; theme: ThemeMode; headingFontFamily: string; useZhGridLayout: boolean }) {
  const isDark = theme === 'dark';
  const iconSrc = experience.logo || '/favicon.svg';
  const isGrid = experience.layout === 'grid-3';
  const gridLayoutClass = useZhGridLayout
    ? 'md:grid-cols-2 xl:grid-cols-[300px_300px_minmax(0,1fr)]'
    : 'md:grid-cols-2 xl:grid-cols-2';

  return (
    <article className="grid gap-4 lg:grid-cols-[140px_1fr]">
      {/* Time column - only on wide screens */}
      <div
        className={`hidden self-start lg:block leading-snug ${isDark ? 'text-white/90' : 'text-neutral-700'}`}
        style={{ fontFamily: headingFontFamily, fontWeight: 400 }}
      >
        {experience.period}
      </div>
      
      {/* Content column */}
      <div className="space-y-3">
        {/* Time inline for narrow screens */}
        <div
          className={`lg:hidden ${isDark ? 'text-white/90' : 'text-neutral-700'}`}
          style={{ fontFamily: headingFontFamily, fontWeight: 400 }}
        >
          {experience.period}
        </div>

        <div className="flex items-start gap-3">
          <img 
            src={iconSrc} 
            alt="" 
            className="h-5 w-5 shrink-0 object-contain mt-0.5" 
            width={20} 
            height={20} 
          />
          <h3
            className="leading-snug"
            style={{ fontFamily: headingFontFamily, fontWeight: 400 }}
          >
            {experience.title}
            {experience.accentLabel && (
              <span className={isDark ? 'text-[#60a5fa]' : 'text-sky-700'}> {experience.accentLabel}</span>
            )}
            {experience.accentDetail && (
              <span> {experience.accentDetail}</span>
            )}
          </h3>
        </div>

        {isGrid && !useZhGridLayout ? (
          <ul className="list-none">
            <BulletListItem theme={theme}>
              {experience.bullets.map(bulletToInlineText).join(', ')}
            </BulletListItem>
          </ul>
        ) : isGrid ? (
          <ul className={`grid list-none gap-y-2 gap-x-3 xl:mr-4 ${gridLayoutClass}`}>
            {experience.bullets.map((bullet, index) => (
              <BulletItem key={index} bullet={bullet} theme={theme} />
            ))}
          </ul>
        ) : (
          <ul className="list-none space-y-2">
            {experience.bullets.map((bullet, index) => (
              <BulletItem key={index} bullet={bullet} theme={theme} />
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

function CapabilitySection({ capabilities, label, theme, headingFontFamily }: { capabilities: StaticCvCapability[]; label: string; theme: ThemeMode; headingFontFamily: string }) {
  return (
    <section className="space-y-3">
      <h2
        className="text-[var(--primary-color)] text-[18px] md:text-[20px]"
        style={{ fontFamily: headingFontFamily, fontWeight: 400 }}
      >
        {label}
      </h2>

      <div className="grid grid-cols-1 gap-6">
        {capabilities.map((capability, index) => (
          <article key={index} className="space-y-2">
            <h3 style={{ fontFamily: headingFontFamily, fontWeight: 400 }}>{capability.title}</h3>
            <ul className="list-none space-y-1.5">
              {capability.items.map((item, itemIndex) => (
                <BulletListItem key={itemIndex} theme={theme}>{item}</BulletListItem>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function StaticCv({ text, lang }: StaticCvProps) {
  const theme = useThemeMode();
  const isDark = theme === 'dark';
  const useZhGridLayout = lang === 'zh';
  const headingFontFamily = lang === 'zh' ? headingFontFamilyZh : headingFontFamilyEn;
  const bodyFontFamily = lang === 'zh' ? bodyFontFamilyZh : bodyFontFamilyEn;
  const pageGridClass = useZhGridLayout
    ? '2xl:grid-cols-[920px_330px]'
    : '2xl:grid-cols-[1020px_330px]';

  return (
    <>
      <FontFace lang={lang} />
      <main
        className={`min-h-[calc(100vh-4rem)] px-4 py-8 sm:px-6 sm:py-10 lg:px-10 ${
          lang === 'en' ? 'text-left' : 'text-justify'
        } ${
          isDark ? 'text-white' : 'text-neutral-900'
        }`}
        style={{ fontFamily: bodyFontFamily }}
      >
        <div className={`w-full space-y-10 xl:grid xl:justify-center ${pageGridClass} xl:gap-x-14 xl:gap-y-12 xl:space-y-0`}>
          <div className="space-y-0 xl:col-span-2">
            <HeaderSection intro={text.intro} theme={theme} headingFontFamily={headingFontFamily} />
            <p className={`max-w-[1100px] leading-relaxed ${isDark ? 'text-white/95' : 'text-neutral-800'}`}>
              <RichText text={text.summary.content} isDark={isDark} />
            </p>
          </div>

          <section className="space-y-3 xl:col-start-1">
            <h2
              className="text-[var(--primary-color)] text-[18px] md:text-[20px]"
              style={{ fontFamily: headingFontFamily, fontWeight: 400 }}
            >
              {text.timelineLabel}
            </h2>
            <div className="space-y-8">
              {text.experiences.map((experience, index) => (
                <ExperienceItem
                  key={index}
                  experience={experience}
                  theme={theme}
                  headingFontFamily={headingFontFamily}
                  useZhGridLayout={useZhGridLayout}
                />
              ))}
            </div>
          </section>

          <aside className="xl:col-start-2 xl:row-start-2">
            <CapabilitySection
              capabilities={text.capabilities}
              label={text.capabilityLabel}
              theme={theme}
              headingFontFamily={headingFontFamily}
            />
          </aside>
        </div>

      </main>
    </>
  );
}
