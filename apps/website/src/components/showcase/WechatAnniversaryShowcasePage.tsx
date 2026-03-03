import type { Locale } from '@/i18n/config';
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
  const text = lang === 'zh'
    ? {
        eyebrow: '微信经历',
        title: '微信十周年内部活动',
        line1: '3D 交互界面用于多人协作拼合纪念道具。',
        line2: '从视觉迭代到前端实现，完整落地到内部活动。',
        demoTitle: '实机展示效果'
      }
    : {
        eyebrow: 'WeChat Experience',
        title: 'WeChat 10th Anniversary Internal Campaign',
        line1: 'A 3D interaction interface for collaborative puzzle exchange.',
        line2: 'Delivered from design iteration to production implementation.',
        demoTitle: 'Live Device Demo'
      };

  return (
    <>
      <StaticCvFontFace lang={lang} />
      <main
        className={`h-[calc(100vh-4rem)] overflow-hidden px-4 py-5 sm:px-6 sm:py-6 ${isDark ? 'text-white' : 'text-neutral-900'}`}
        style={{ fontFamily: bodyFontFamily }}
      >
        <section className="mx-auto grid h-full w-full max-w-7xl grid-cols-1 place-items-center gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="min-h-0 w-full max-w-[860px] space-y-4 text-center">
            <div className="text-center">
              <p className={`text-[12px] tracking-[0.12em] ${isDark ? 'text-white/55' : 'text-neutral-500'}`}>{text.eyebrow}</p>
              <h1 className="mt-1 text-[22px] leading-tight text-[var(--primary-color)] sm:text-[28px]" style={{ fontFamily: headingFontFamily, fontWeight: 400 }}>
                {text.title}
              </h1>
            </div>

            <div className="mx-auto h-[min(60vh,560px)] min-h-[300px] w-full max-w-[560px]">
              <WechatAnniversaryAnimation className="h-full max-h-full max-w-none" />
            </div>

            <div className="space-y-1 text-center">
              <p className={`text-[14px] sm:text-[16px] ${isDark ? 'text-white/82' : 'text-neutral-700'}`}>{text.line1}</p>
              <p className={`text-[14px] sm:text-[16px] ${isDark ? 'text-white/65' : 'text-neutral-600'}`}>{text.line2}</p>
            </div>
          </div>

          <div className="min-h-0 w-full space-y-2 text-center">
            <div className="mx-auto w-full max-w-[380px]">
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
