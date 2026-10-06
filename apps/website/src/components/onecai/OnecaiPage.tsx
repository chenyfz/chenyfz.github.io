import type { Locale } from '@/i18n/config';
import type { OnecaiPageCopy } from '@/i18n/pages/onecai/types';
import PageFrame from '@/components/common/PageFrame';
import SectionText from '@/components/common/SectionText';

export default function OnecaiPage({ text, lang }: { text: OnecaiPageCopy; lang: Locale }) {
  return <PageFrame lang={lang} title={text.title} subtitle={text.subtitle}>
    <section className="page-section">
      <h2>{text.detailsTitle}</h2>
      <div className="page-sections">
        {text.sections.map(section => <article key={section.id} id={section.id} className="page-section page-section--divided">
          <h3 className="mb-3 text-lg text-[var(--primary-color)]">{section.title}</h3>
          <SectionText content={section.content} />
        </article>)}
      </div>
    </section>
  </PageFrame>;
}
