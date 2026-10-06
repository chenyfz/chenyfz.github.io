import { useMemo, useState, type MouseEvent } from 'react';
import type { Locale } from '@/i18n/config';
import type { MastersCoursesPageCopy } from '@/i18n/pages/masters-courses/types';
import { normalizePageHref, shouldAnimateNavigation } from '@/lib/navigation';
import useSectionNavigation from '@/hooks/useSectionNavigation';
import PageFrame from '@/components/common/PageFrame';
import RichText from '@/components/common/RichText';
import CourseMediaGallery from './CourseMediaGallery';

const courseTitle = (title: string) => title.replace(/\s*\(.*?\)\s*/g, '').trim();
export default function MastersCoursesPage({ text, lang }: { text: MastersCoursesPageCopy; lang: Locale }) {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const ids = useMemo(() => text.courses.map(course => course.id), [text.courses]);
  const courses = useMemo(() => new Map(text.courses.map((course, i) => [course.id, { ...course, number: i + 1 }])), [text.courses]);
  const { activeIds, flashId, select } = useSectionNavigation(ids);
  const selectCourse = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (!shouldAnimateNavigation(event)) return;
    event.preventDefault(); select(id);
  };
  return <PageFrame lang={lang} title={text.title} subtitle={text.subtitle}>
    <div className="course-layout">
      <aside className="course-directory">
        <h2>{text.tocTitle}</h2>
        <nav aria-label={text.tocTitle}>
          {text.years.map((year, yearIndex) => <section key={year.title} className="mb-4 last:mb-0">
            <h3 className="page-muted">{lang === 'zh' ? `第${yearIndex + 1}年` : `Year ${yearIndex + 1}`}</h3>
            {year.periods.flatMap(period => period.courseIds).map(id => {
              const course = courses.get(id);
              return course && <a key={id} href={`#${id}`} aria-current={activeIds.includes(id) ? 'location' : undefined}
                onClick={event => selectCourse(event, id)}>{course.number}. {courseTitle(course.title)}</a>;
            })}
          </section>)}
        </nav>
      </aside>
      <section className="course-content page-sections" aria-label={text.detailsTitle}>
        {text.courses.map((course, i) => <article key={course.id} id={course.id} tabIndex={-1}
          className={`course-article ${flashId === course.id ? 'course-flash' : ''}`}>
          <h2>{i + 1}. {courseTitle(course.title)}</h2>
          {course.title.match(/\((.*?)\)/)?.[1] && <p className="page-muted text-sm">({course.title.match(/\((.*?)\)/)?.[1]})</p>}
          <RichText text={course.description} mode="block" className="mt-3" />
          {!!course.links?.length && <div className="mt-3 flex flex-wrap gap-4 text-base">
            {course.links.map(link => <a key={link.href} href={normalizePageHref(link.localized ? `/${lang}${link.href}` : link.href)}
              target={link.external ? '_blank' : undefined} rel={link.external ? 'noreferrer' : undefined}
              className="text-link">{link.label}</a>)}
          </div>}
          {!!course.media?.length && <CourseMediaGallery items={course.media} lang={lang}
            expanded={expandedIds.includes(course.id)} onToggle={() => setExpandedIds(previous => previous.includes(course.id)
              ? previous.filter(id => id !== course.id) : [...previous, course.id])}
            practiceText={course.practice} showLabel={text.showMediaLabel} hideLabel={text.hideMediaLabel} />}
        </article>)}
      </section>
    </div>
  </PageFrame>;
}
