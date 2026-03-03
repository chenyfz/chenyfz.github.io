import type { Locale } from '@/i18n/config';
import { t } from '@/i18n/t';
import wechatSearchShowcaseEn from '@/i18n/pages/wechat-search-showcase/en';
import wechatSearchShowcaseZh from '@/i18n/pages/wechat-search-showcase/zh';
import useThemeMode from '@/hooks/useThemeMode';
import {
  StaticCvFontFace,
  getStaticCvBodyFontFamily,
  getStaticCvHeadingFontFamily
} from '@/components/cv/StaticCvTypography';
import SearchServiceCanvasWall from '@/components/wechat-experience/SearchServiceCanvasWall';
import GlassCardContainer from '@/components/GlassCardContainer';

interface WechatSearchShowcasePageProps {
  lang: Locale;
}

export default function WechatSearchShowcasePage({ lang }: WechatSearchShowcasePageProps) {
  const isDark = useThemeMode() === 'dark';
  const headingFontFamily = getStaticCvHeadingFontFamily(lang);
  const bodyFontFamily = getStaticCvBodyFontFamily(lang);
  const text = t({ en: wechatSearchShowcaseEn, zh: wechatSearchShowcaseZh }, lang);

  return (
    <>
      <StaticCvFontFace lang={lang} />
      <main
        className={`relative h-[calc(100vh-4rem)] w-full overflow-hidden ${isDark ? 'text-white' : 'text-neutral-900'}`}
        style={{ fontFamily: bodyFontFamily }}
      >
        <SearchServiceCanvasWall lang={lang} layout="immersive" immersiveFrameClassName="h-full w-full" />

        <div className="pointer-events-none absolute left-3 top-3 z-10 w-fit max-w-[calc(100%-1.5rem)] sm:left-5 sm:top-5 sm:max-w-[calc(100%-2.5rem)]">
          <GlassCardContainer
            className="rounded-2xl"
            ui={{ root: 'rounded-2xl border-white/25', inner: 'rounded-2xl' }}
            style={{ backgroundColor: isDark ? 'rgba(11, 15, 24, 0.48)' : 'rgba(255, 255, 255, 0.42)' }}
          >
            <header className="space-y-1.5 px-3 py-2.5 sm:space-y-2 sm:px-5 sm:py-4">
              <h1 className="text-[16px] leading-tight text-[var(--primary-color)] sm:text-[20px]" style={{ fontFamily: headingFontFamily, fontWeight: 400 }}>
                {text.title}
              </h1>
              <p className={`text-[14px] leading-snug sm:text-[18px] ${isDark ? 'text-white/78' : 'text-neutral-700'}`}>{text.subtitle}</p>
              <p className={`text-[14px] leading-snug sm:text-[18px] ${isDark ? 'text-white/78' : 'text-neutral-700'}`}>{text.hint}</p>
            </header>
          </GlassCardContainer>
        </div>
      </main>
    </>
  );
}
