import type { Locale } from '@/i18n/config';
import { t } from '@/i18n/t';
import en from '@/i18n/pages/wechat-search-showcase/en';
import zh from '@/i18n/pages/wechat-search-showcase/zh';
import PageFrame from '@/components/common/PageFrame';
import SearchServiceCanvasWall from '@/features/search-wall/SearchServiceCanvasWall';
import GlassCardContainer from '@/components/common/GlassCardContainer';

export default function WechatSearchShowcasePage({ lang }: { lang: Locale }) {
  const text = t({ en, zh }, lang);
  return <PageFrame lang={lang} variant="immersive">
    <SearchServiceCanvasWall lang={lang} layout="immersive" immersiveFrameClassName="h-full w-full" />
    <div className="pointer-events-none absolute left-3 top-3 z-10 max-w-[calc(100%-1.5rem)] sm:left-5 sm:top-5">
      <GlassCardContainer radius={16} className="bg-[var(--app-bg)]/85">
        <header className="space-y-2 px-4 py-3">
          <h1 className="text-lg text-[var(--primary-color)] sm:text-xl">{text.title}</h1>
          <p className="text-sm">{text.subtitle}</p><p className="page-muted text-sm">{text.hint}</p>
        </header>
      </GlassCardContainer>
    </div>
  </PageFrame>;
}
