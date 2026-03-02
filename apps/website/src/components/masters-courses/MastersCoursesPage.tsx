import { useEffect, useMemo, useState } from 'react';
import type { Locale } from '@/i18n/config';
import type { MastersCoursesPageCopy } from '@/i18n/pages/masters-courses/types';
import useThemeMode from '@/hooks/useThemeMode';
import {
  StaticCvFontFace,
  getStaticCvBodyFontFamily,
  getStaticCvHeadingFontFamily
} from '@/components/cv/StaticCvTypography';

type MastersCoursesPageProps = {
  text: MastersCoursesPageCopy;
  lang: Locale;
};

const NAV_OFFSET = 88;

function formatGrade(text: MastersCoursesPageCopy, grade: string): string {
  return `${text.gradePrefix}${grade}${text.gradeSuffix}`;
}

function getLocalizedHref(lang: Locale, href: string, localized?: boolean): string {
  if (!localized) return href;
  return `/${lang}${href}`;
}

export default function MastersCoursesPage({ text, lang }: MastersCoursesPageProps) {
  const isDark = useThemeMode() === 'dark';
  const headingFontFamily = getStaticCvHeadingFontFamily(lang);
  const bodyFontFamily = getStaticCvBodyFontFamily(lang);
  const [activeId, setActiveId] = useState('');
  const [flashId, setFlashId] = useState('');

  const coursesById = useMemo(() => {
    const map = new Map<string, MastersCoursesPageCopy['courses'][number]>();
    text.courses.forEach((course) => {
      map.set(course.id, course);
    });
    return map;
  }, [text.courses]);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-course-id]'));

    const updateActiveByScroll = () => {
      let currentId = '';
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= NAV_OFFSET + 8) {
          currentId = section.dataset.courseId ?? '';
        } else {
          break;
        }
      }
      setActiveId(currentId);
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

    return () => {
      window.removeEventListener('scroll', updateActiveByScroll);
      window.removeEventListener('hashchange', flashByHash);
    };
  }, []);

  const mutedTextClass = isDark ? 'text-white/65' : 'text-neutral-600';
  const tocActiveClass = isDark
    ? 'text-amber-300 underline decoration-amber-300/85'
    : 'text-amber-700 underline decoration-amber-700/70';
  const tocIdleClass = isDark
    ? 'text-white/80 underline decoration-transparent hover:decoration-white/55'
    : 'text-neutral-700 underline decoration-transparent hover:decoration-neutral-500';
  const detailTextClass = isDark ? 'text-white/82' : 'text-neutral-800';
  const detailLinkClass = isDark
    ? 'text-white/85 decoration-white/40 hover:decoration-white/80'
    : 'text-neutral-800 decoration-neutral-400 hover:decoration-neutral-700';

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
          <header className="space-y-1">
            <h1 className="text-3xl text-amber-700" style={{ fontFamily: headingFontFamily, fontWeight: 400 }}>{text.title}</h1>
            <p className={mutedTextClass}>{text.subtitle}</p>
          </header>

          <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
              <aside className="self-start lg:sticky lg:top-24">
                <h2 className="text-xl text-amber-700" style={{ fontFamily: headingFontFamily, fontWeight: 400 }}>{text.tocTitle}</h2>
                <div className="mt-3 space-y-4 text-[18px] lg:max-h-[calc(100vh-9.5rem)] lg:overflow-auto lg:pr-2">
                  {text.years.map((year) => (
                    <section key={year.title} className="space-y-2">
                      <h3 className="text-amber-700" style={{ fontFamily: headingFontFamily, fontWeight: 400 }}>
                        {year.title}
                      </h3>
                      <div className="space-y-2">
                        {year.periods.map((period) => (
                          <div key={`${year.title}-${period.label}`} className="grid grid-cols-[92px_minmax(0,1fr)] gap-2">
                            <div className={mutedTextClass}>{period.label}</div>
                            <div className="flex flex-col gap-1.5">
                              {period.courseIds.map((courseId) => {
                                const course = coursesById.get(courseId);
                                if (!course) return null;
                                const selected = activeId === course.id;

                                return (
                                  <button
                                    key={course.id}
                                    type="button"
                                    onClick={() => scrollToCourse(course.id)}
                                    className={`w-fit px-0 py-0.5 text-left underline underline-offset-4 transition ${
                                      selected ? tocActiveClass : tocIdleClass
                                    }`}
                                  >
                                    {course.title}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </aside>

              <section className="py-1">
                <h2 className="text-xl text-amber-700" style={{ fontFamily: headingFontFamily, fontWeight: 400 }}>{text.detailsTitle}</h2>
                <div className="mt-5 space-y-7">
                  {text.courses.map((course) => {
                    const shouldFlash = flashId === course.id;
                    const flashClass = shouldFlash
                      ? isDark
                        ? 'rounded-[4px] bg-amber-200/10 px-2'
                        : 'rounded-[4px] bg-amber-100/45 px-2'
                      : '';

                    return (
                      <article
                        key={course.id}
                        id={course.id}
                        data-course-id={course.id}
                        className={`scroll-mt-24 py-2 transition-colors ${flashClass}`}
                      >
                        <h3 className="text-lg text-amber-700" style={{ fontFamily: headingFontFamily, fontWeight: 400 }}>
                          {course.title}
                          <span className={`ml-2 text-[18px] font-medium ${mutedTextClass}`}>{formatGrade(text, course.grade)}</span>
                        </h3>
                        <p className={`mt-2 leading-relaxed ${detailTextClass}`}>{course.description}</p>
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
                      </article>
                    );
                  })}
                </div>
              </section>
            </div>
        </div>
      </main>
    </>
  );
}
