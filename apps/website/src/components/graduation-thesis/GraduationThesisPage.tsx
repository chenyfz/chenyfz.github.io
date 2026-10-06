import { useState } from 'react';
import type { GraduationThesisPageCopy } from '@/i18n/pages/graduation-thesis/types';
import type { Locale } from '@/i18n/config';
import { normalizePageHref } from '@/lib/navigation';
import PageFrame from '@/components/common/PageFrame';
import RichText from '@/components/common/RichText';
import ExpandableContent from '@/components/common/ExpandableContent';
import MediaFigure from '@/components/media/MediaFigure';

function getMediaFrameClass(src: string): string {
  if (src.includes('mechanism-before.png')) return 'aspect-[827/528]';
  if (src.includes('mechanism-after.png')) return 'aspect-[822/524]';
  if (src.includes('study-1-target-and-methods.png')) return 'aspect-[4199/2150]';
  if (src.includes('study2-calibration-result.png')) return 'aspect-[2376/813]';
  if (src.includes('error-distribution-all-condition.png')) return 'aspect-[2100/900]';
  if (src.includes('related-work-pursuit-methods.png')) return 'aspect-[7356/1112]';
  if (src.includes('zoom-pursuit-method.png')) return 'aspect-[3244/836]';
  if (src.includes('zoom-pursuit-with-gaze&pinch.png')) return 'aspect-[3659/1162]';
  if (src.includes('teaser-figure.png')) return 'aspect-[5888/1082]';
  return 'aspect-video';
}


export default function GraduationThesisPage({ text, lang }: { text: GraduationThesisPageCopy; lang: Locale }) {
  const [expanded, setExpanded] = useState(false);
  const info = text.projectInfo;
  const preview = text.reflectionsParagraphs[0]?.replace(/\*\*/g, '').replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1').replace(/\s+/g, ' ').trim() ?? '';
  return <PageFrame lang={lang} title={text.heading} variant="story"
    eyebrow={typeof info === 'string' ? info : info.type}
    subtitle={typeof info === 'string' ? undefined : `${info.duration} | ${info.supervisorLabel || 'Supervisor: '} ${info.supervisor}`}>
    <div className="mb-12 flex flex-wrap gap-x-6 gap-y-3">
      {text.primaryLinks.map(link => <a key={link.href} href={normalizePageHref(link.href)}
        target={link.external ? '_blank' : undefined} rel={link.external ? 'noreferrer' : undefined}
        className="text-link">{link.label} ↗</a>)}
    </div>
    <div className="space-y-14 md:space-y-20">
      {text.narrativeSections.map(section => <article key={section.id} id={section.id} className="page-section space-y-6">
        <header>
          {section.kicker && <p className="page-eyebrow page-muted mb-2">{section.kicker}</p>}
          <h2 className="text-xl md:text-2xl">{section.title}</h2>
        </header>
        {!!section.media?.length && <div className={`grid gap-5 ${section.media.length > 1 ? 'sm:grid-cols-2' : ''}`}>
          {section.media.map((media, index) => <MediaFigure key={media.src} item={media} lang={lang}
            frameClassName={getMediaFrameClass(media.src)}
            className={section.media!.length === 3 && index === 2 ? 'sm:col-span-2' : ''} />)}
        </div>}
        {section.lead && <p className="leading-relaxed">{section.lead}</p>}
        {section.quote && <blockquote className="border-l-2 border-[var(--primary-color)] pl-5 italic">“{section.quote}”</blockquote>}
        {!!section.points?.length && <ul className="list-disc space-y-3 pl-6">{section.points.map(point => <li key={point}>{point}</li>)}</ul>}
        {!!section.metrics?.length && <dl className="grid gap-4 sm:grid-cols-2">
          {section.metrics.map(metric => <div key={metric.label} className="rounded-xl bg-black/5 dark:bg-white/6 p-5">
            <dt className="page-muted text-base">{metric.label}</dt><dd className="mt-2 text-3xl">{metric.value}</dd>
            {metric.note && <dd className="page-muted mt-2 text-sm">{metric.note}</dd>}
          </div>)}
        </dl>}
      </article>)}
    </div>
    <section className="page-section course-practice mt-14 md:mt-20">
      <h2>{text.reflectionsTitle}</h2>
      <ExpandableContent expanded={expanded} onToggle={() => setExpanded(value => !value)} preview={preview} previewLines={4}
        showLabel={lang === 'zh' ? '阅读全文' : 'Read full reflection'} hideLabel={lang === 'zh' ? '收起' : 'Show less'}>
        <div className="space-y-5">
          {text.reflectionsParagraphs.map((paragraph, index) => <RichText key={index} text={paragraph} mode="block" />)}
        </div>
      </ExpandableContent>
    </section>
  </PageFrame>;
}
