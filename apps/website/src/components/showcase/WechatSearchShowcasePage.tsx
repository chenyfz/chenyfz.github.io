import type { Locale } from '@/i18n/config';
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
  const text = lang === 'zh'
    ? {
        title: '搜一搜前端重构',
        subtitle: '以服务搜索为例（绝大部分为我实现）',
        hint: '拖拽或滚动浏览'
      }
    : {
        title: 'Weixin Search Frontend',
        subtitle: 'Service-search cases (mostly implemented by me)',
        hint: 'Drag or scroll to explore'
      };

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
            <header className="space-y-2 px-4 py-3 sm:px-5 sm:py-4">
              <h1 className="text-[20px] leading-tight text-[var(--primary-color)]" style={{ fontFamily: headingFontFamily, fontWeight: 400 }}>
                {text.title}
              </h1>
              <p className={`text-[18px] leading-snug ${isDark ? 'text-white/78' : 'text-neutral-700'}`}>{text.subtitle}</p>
              <p className={`text-[18px] leading-snug ${isDark ? 'text-white/78' : 'text-neutral-700'}`}>{text.hint}</p>
            </header>
          </GlassCardContainer>
        </div>
      </main>
    </>
  );
}
