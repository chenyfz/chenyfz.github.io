import type { Locale } from '@/i18n/config';
import type { WechatExperiencePageCopy } from '@/i18n/pages/wechat-experience/types';
import PageFrame from '@/components/common/PageFrame';
import SectionText from '@/components/common/SectionText';
import SearchServiceCanvasWall from '@/features/search-wall/SearchServiceCanvasWall';
import WechatAnniversaryAnimation from './WechatAnniversaryAnimation';

export default function WechatExperiencePage({ text, lang }: { text: WechatExperiencePageCopy; lang: Locale }) {
  return <PageFrame lang={lang} title={text.title} subtitle={text.subtitle}>
    <section className="page-section">
      <h2>{text.detailsTitle}</h2>
      <div className="page-sections">
        {text.sections.map(section => <article key={section.id} id={section.id} className="page-section page-section--divided">
          <h3 className="mb-3 text-lg text-[var(--primary-color)]">{section.title}</h3>
          {section.id === 'search' ? <div className="grid gap-6 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)]">
            <SectionText content={section.content} /><SearchServiceCanvasWall lang={lang} />
          </div> : <SectionText content={section.content} />}
          {section.id === 'anniversary' && <WechatAnniversaryAnimation className="mt-6" />}
        </article>)}
      </div>
    </section>
  </PageFrame>;
}
