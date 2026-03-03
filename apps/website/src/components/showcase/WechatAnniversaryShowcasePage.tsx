import type { Locale } from '@/i18n/config';
import { t } from '@/i18n/t';
import wechatAnniversaryShowcaseEn from '@/i18n/pages/wechat-anniversary-showcase/en';
import wechatAnniversaryShowcaseZh from '@/i18n/pages/wechat-anniversary-showcase/zh';
import useThemeMode from '@/hooks/useThemeMode';
import {
  StaticCvFontFace,
  getStaticCvBodyFontFamily,
  getStaticCvHeadingFontFamily
} from '@/components/cv/StaticCvTypography';
import WechatAnniversaryAnimation from '@/components/wechat-experience/WechatAnniversaryAnimation';

interface WechatAnniversaryShowcasePageProps {
  lang: Locale;
}

const ANNIVERSARY_VIDEO_SRC = '/wechat-anniversary/v.mp4';

export default function WechatAnniversaryShowcasePage({ lang }: WechatAnniversaryShowcasePageProps) {
  const isDark = useThemeMode() === 'dark';
  const headingFontFamily = getStaticCvHeadingFontFamily(lang);
  const bodyFontFamily = getStaticCvBodyFontFamily(lang);
  const text = t({ en: wechatAnniversaryShowcaseEn, zh: wechatAnniversaryShowcaseZh }, lang);

  return (
    <>
      <StaticCvFontFace lang={lang} />
      <main
        className={`h-[calc(100vh-4rem)] overflow-y-auto px-4 py-5 sm:px-6 sm:py-6 lg:overflow-hidden ${isDark ? 'text-white' : 'text-neutral-900'}`}
        style={{ fontFamily: bodyFontFamily }}
      >
        <section className="mx-auto grid h-auto min-h-full w-full max-w-7xl grid-cols-1 items-start gap-6 pb-4 lg:h-full lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:place-items-center lg:pb-0">
          <div className="min-h-0 w-full max-w-[860px] space-y-4 text-center">
            <div className="text-center">
              <p className={`text-[12px] tracking-[0.12em] ${isDark ? 'text-white/55' : 'text-neutral-500'}`}>{text.eyebrow}</p>
              <h1 className="mt-1 text-[22px] leading-tight text-[var(--primary-color)] sm:text-[28px]" style={{ fontFamily: headingFontFamily, fontWeight: 400 }}>
                {text.title}
              </h1>
            </div>

            <div className="mx-auto h-[min(44vh,420px)] min-h-[220px] w-full max-w-[420px] sm:h-[min(50vh,520px)] sm:min-h-[260px] sm:max-w-[520px] lg:h-[min(60vh,560px)] lg:min-h-[300px] lg:max-w-[560px]">
              <WechatAnniversaryAnimation className="h-full max-h-full max-w-none" />
            </div>

            <div className="space-y-1 text-center">
              <p className={`text-[14px] sm:text-[16px] ${isDark ? 'text-white/82' : 'text-neutral-700'}`}>{text.line1}</p>
              <p className={`text-[14px] sm:text-[16px] ${isDark ? 'text-white/65' : 'text-neutral-600'}`}>{text.line2}</p>
            </div>
          </div>

          <div className="min-h-0 w-full space-y-2 pb-2 text-center">
            <div className="mx-auto w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[380px]">
              <video
                src={ANNIVERSARY_VIDEO_SRC}
                controls
                playsInline
                className="aspect-[1170/2532] w-full rounded-xl border border-black/10 object-cover dark:border-white/12"
              />
            </div>
            <p className={`text-[12px] ${isDark ? 'text-white/60' : 'text-neutral-500'}`}>{text.demoTitle}</p>
          </div>
        </section>
      </main>
    </>
  );
}
