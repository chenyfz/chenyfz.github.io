import type { Locale } from '@/i18n/config';
import { t } from '@/i18n/t';
import en from '@/i18n/pages/wechat-anniversary-showcase/en';
import zh from '@/i18n/pages/wechat-anniversary-showcase/zh';
import PageFrame from '@/components/common/PageFrame';
import MediaFigure from '@/components/media/MediaFigure';
import WechatAnniversaryAnimation from '@/components/wechat-experience/WechatAnniversaryAnimation';

export default function WechatAnniversaryShowcasePage({ lang }: { lang: Locale }) {
  const text = t({ en, zh }, lang);
  return <PageFrame lang={lang} title={text.title} eyebrow={text.eyebrow} variant="showcase">
    <section className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,.8fr)]">
      <div className="space-y-5 text-center">
        <WechatAnniversaryAnimation className="max-w-[32rem]" />
        <p>{text.line1}</p><p className="page-muted">{text.line2}</p>
      </div>
      <MediaFigure item={{ type: 'video', src: '/wechat-anniversary/v.mp4', alt: text.demoTitle, caption: text.demoTitle }}
        lang={lang} frameClassName="aspect-[1170/2532]" className="mx-auto w-full max-w-[22rem]" />
    </section>
  </PageFrame>;
}
