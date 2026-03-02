import { useEffect, useMemo, useState } from 'react';
import type { Locale } from '@/i18n/config';
import type { MastersCoursesPageCopy } from '@/i18n/pages/masters-courses/types';
import useThemeMode from '@/hooks/useThemeMode';
import RichText from '@/components/cv/RichText';
import CourseMediaGallery from '@/components/masters-courses/CourseMediaGallery';
import {
  StaticCvFontFace,
  getStaticCvBodyFontFamily,
  getStaticCvHeadingFontFamily
} from '@/components/cv/StaticCvTypography';

type MastersCoursesPageProps = {
  text: MastersCoursesPageCopy;
  lang: Locale;
};

function formatGrade(text: MastersCoursesPageCopy, grade: string): string {
  return `${text.gradePrefix}${grade}${text.gradeSuffix}`;
}

function getLocalizedHref(lang: Locale, href: string, localized?: boolean): string {
  if (!localized) return href;
  return `/${lang}${href}`;
}

function getCourseDisplayTitle(title: string): string {
  return title.replace(/\s*\(.*?\)\s*/g, '').trim();
}

export default function MastersCoursesPage({ text, lang }: MastersCoursesPageProps) {
  const isDark = useThemeMode() === 'dark';
  const headingFontFamily = getStaticCvHeadingFontFamily(lang);
  const bodyFontFamily = getStaticCvBodyFontFamily(lang);
  const [activeIds, setActiveIds] = useState<string[]>([]);
  const [flashId, setFlashId] = useState('');
  const [expandedCourseIds, setExpandedCourseIds] = useState<string[]>([]);
  const [isDesktopToc, setIsDesktopToc] = useState(false);
  const showGrades = false;

  const coursesById = useMemo(() => {
    const map = new Map<string, MastersCoursesPageCopy['courses'][number]>();
    text.courses.forEach((course) => {
      map.set(course.id, course);
    });
    return map;
  }, [text.courses]);

  const courseNumberById = useMemo(() => {
    const map = new Map<string, number>();
    text.courses.forEach((course, index) => {
      map.set(course.id, index + 1);
    });
    return map;
  }, [text.courses]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const updateDesktopToc = () => setIsDesktopToc(mediaQuery.matches);
    updateDesktopToc();

    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-course-id]'));

    const updateActiveByScroll = () => {
      const visibleIds: string[] = [];
      const windowHeight = window.innerHeight;
      
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        // 检查元素是否在视口内
        if (rect.top <= windowHeight && rect.bottom >= 0) {
          const courseId = section.dataset.courseId;
          if (courseId) {
            visibleIds.push(courseId);
          }
        }
      }
      setActiveIds(visibleIds);
    };

    const flashByHash = () => {
      const hash = window.location.hash;
      if (!hash.startsWith('#')) return;
      const id = hash.slice(1);
      if (!id) return;

      setFlashId(id);
      window.setTimeout(() => {
        setFlashId((prev) => (prev === id ? '' : prev));
      }, 1400);
    };

    updateActiveByScroll();
    flashByHash();

    window.addEventListener('scroll', updateActiveByScroll, { passive: true });
    window.addEventListener('hashchange', flashByHash);
    mediaQuery.addEventListener('change', updateDesktopToc);

    return () => {
      window.removeEventListener('scroll', updateActiveByScroll);
      window.removeEventListener('hashchange', flashByHash);
      mediaQuery.removeEventListener('change', updateDesktopToc);
    };
  }, []);

  const mutedTextClass = isDark ? 'text-white/65' : 'text-neutral-600';
  const tocActiveClass = 'text-[var(--primary-color)] hover:underline underline-offset-4';
  const tocIdleClass = isDark
    ? 'text-white/80 hover:text-white hover:underline underline-offset-4'
    : 'text-neutral-700 hover:text-neutral-900 hover:underline underline-offset-4';
  const detailTextClass = isDark ? 'text-white/82' : 'text-neutral-800';
  const detailLinkClass = 'text-[var(--primary-color)] decoration-[var(--primary-color)]/85 hover:text-[var(--primary-hover)] hover:decoration-[var(--primary-hover)]/95';

  const scrollToCourse = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    window.history.replaceState(null, '', `#${id}`);
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setFlashId(id);
  };

  return (
    <>
      <StaticCvFontFace lang={lang} />
      <main className={`min-h-[calc(100vh-4rem)] px-4 py-8 text-[18px] sm:px-6 sm:py-10 lg:px-10 ${lang === 'zh' ? 'text-justify' : 'text-left'}`} style={{ fontFamily: bodyFontFamily }}>
        <div className="mx-auto w-full max-w-6xl space-y-7">
          <header className="space-y-1 mb-4">
            <h1 className="text-2xl text-[var(--primary-color)]" style={{ fontFamily: headingFontFamily, fontWeight: 400 }}>{text.title}</h1>
            <p className={mutedTextClass}>{text.subtitle}</p>
          </header>

          <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_300px]">
              <section className="py-1">
                <div className="space-y-11">
                  {text.courses.map((course) => {
                    const shouldFlash = flashId === course.id;
                    const isExpandable = Boolean(course.media && course.media.length > 0);
                    const isExpanded = expandedCourseIds.includes(course.id);
                    const flashClass = shouldFlash
                      ? isDark
                        ? 'relative isolate before:pointer-events-none before:absolute before:-inset-x-4 before:-inset-y-2 before:-z-10 before:rounded-[8px] before:bg-amber-200/10 before:content-[""]'
                        : 'relative isolate before:pointer-events-none before:absolute before:-inset-x-4 before:-inset-y-2 before:-z-10 before:rounded-[8px] before:bg-amber-100/45 before:content-[""]'
                      : '';
                    const courseNumber = courseNumberById.get(course.id);

                    return (
                      <article
                        key={course.id}
                        id={course.id}
                        data-course-id={course.id}
                        className={`scroll-mt-24 py-2 transition-colors ${flashClass}`}
                      >
                        <div className="space-y-1">
                          <h3 className="text-lg text-[var(--primary-color)]" style={{ fontFamily: headingFontFamily, fontWeight: 400 }}>
                            {courseNumber ? `${courseNumber}. ` : ''}
                            {getCourseDisplayTitle(course.title)}
                            {showGrades ? (
                              <span className={`ml-2 text-[18px] font-medium ${mutedTextClass}`}>{formatGrade(text, course.grade)}</span>
                            ) : null}
                          </h3>
                          {course.title.match(/\((.*?)\)/) && (
                            <p className={`text-[14px] lg:text-[16px] ${mutedTextClass}`}>
                              ({course.title.match(/\((.*?)\)/)?.[1]})
                            </p>
                          )}
                        </div>
                        <RichText text={course.description} isDark={isDark} mode="block" className={`mt-2 ${detailTextClass}`} />
                        {course.links && course.links.length > 0 ? (
                          <div className="mt-3 flex flex-wrap gap-3 text-[18px]">
                            {course.links.map((link) => (
                              <a
                                key={`${course.id}-${link.label}-${link.href}`}
                                href={getLocalizedHref(lang, link.href, link.localized)}
                                target={link.external ? '_blank' : undefined}
                                rel={link.external ? 'noreferrer' : undefined}
                                className={`underline underline-offset-4 transition ${detailLinkClass}`}
                              >
                                {link.label}
                              </a>
                            ))}
                          </div>
                        ) : null}
                        {course.media && course.media.length > 0 ? (
                          <CourseMediaGallery
                            items={course.media}
                            isDark={isDark}
                            expanded={isExpanded}
                            onExpand={() => {
                              setExpandedCourseIds((prev) => (prev.includes(course.id) ? prev : [...prev, course.id]));
                            }}
                            practiceText={course.practice ?? null}
                            showLabel={text.showMediaLabel}
                            closeLabel={text.closeViewerLabel}
                          />
                        ) : null}
                      </article>
                    );
                  })}
                </div>
              </section>

              <aside className="self-start lg:sticky lg:top-24">
                <h2 className="mt-2 text-xl text-[var(--primary-color)]" style={{ fontFamily: headingFontFamily, fontWeight: 400 }}>{text.tocTitle}</h2>
                <div className="mt-3 space-y-4 text-[18px] lg:max-h-[calc(100vh-9.5rem)] lg:overflow-auto lg:pr-2">
                  {text.years.map((year, yearIndex) => (
                    <section key={year.title} className="space-y-2">
                      <h3
                        className={mutedTextClass}
                        style={{ fontFamily: bodyFontFamily, fontWeight: 400 }}
                      >
                        {lang === 'zh' ? `第${yearIndex + 1}年` : `Year ${yearIndex + 1}`}
                      </h3>
                      <div className="ml-4 flex flex-col gap-1.5">
                        {year.periods.flatMap((period) => period.courseIds).map((courseId) => {
                          const course = coursesById.get(courseId);
                          if (!course) return null;
                          const selected = isDesktopToc && activeIds.includes(course.id);

                          return (
                            <button
                              key={course.id}
                              type="button"
                              onClick={() => scrollToCourse(course.id)}
                              className={`w-fit cursor-pointer px-0 py-0.5 text-left transition ${selected ? tocActiveClass : tocIdleClass}`}
                            >
                              {`${courseNumberById.get(course.id) ? `${courseNumberById.get(course.id)}. ` : ''}${getCourseDisplayTitle(course.title)}`}
                            </button>
                          );
                        })}
                      </div>
                    </section>
                  ))}
                </div>
              </aside>
            </div>
        </div>
      </main>
    </>
  );
}
