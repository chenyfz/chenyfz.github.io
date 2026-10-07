import type { Locale } from '@/i18n/config';
import type { WechatExperiencePageCopy } from '@/i18n/pages/wechat-experience/types';
import PageFrame from '@/components/common/PageFrame';
import SectionText from '@/components/common/SectionText';
import ProjectLink from '@/features/project-preview/ProjectLink';

export default function WechatExperiencePage({ text, lang }: { text: WechatExperiencePageCopy; lang: Locale }) {
  return <PageFrame lang={lang} title={text.title} subtitle={text.subtitle}>
    <section className="page-section">
      <h2>{text.detailsTitle}</h2>
      <div className="page-sections">
        {text.sections.map(section => <article key={section.id} id={section.id} className="page-section page-section--divided">
          <h3 className="mb-3 text-lg text-[var(--primary-color)]">{section.title}</h3>
          <SectionText content={section.content} />
          {(section.id === 'search' || section.id === 'anniversary') && <p className="mt-3">
            <ProjectLink className="text-link" href={`/${lang}/#wechat-${section.id}`}>
              {lang === 'zh' ? '查看案例' : 'View examples'}
            </ProjectLink>
          </p>}
        </article>)}
      </div>
    </section>
  </PageFrame>;
}
