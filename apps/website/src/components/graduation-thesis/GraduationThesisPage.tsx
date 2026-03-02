import type { GraduationThesisPageCopy } from '@/i18n/pages/graduation-thesis/types';
import type { Locale } from '@/i18n/config';
import useThemeMode from '@/hooks/useThemeMode';
import {
  StaticCvFontFace,
  getStaticCvBodyFontFamily,
  getStaticCvHeadingFontFamily
} from '@/components/cv/StaticCvTypography';

type GraduationThesisPageProps = {
  text: GraduationThesisPageCopy;
  lang: Locale;
};

export default function GraduationThesisPage({ text, lang }: GraduationThesisPageProps) {
  const isDark = useThemeMode() === 'dark';
  const headingFontFamily = getStaticCvHeadingFontFamily(lang);
  const bodyFontFamily = getStaticCvBodyFontFamily(lang);
  const mutedTextClass = isDark ? 'text-white/65' : 'text-neutral-600';
  const bodyTextClass = isDark ? 'text-white/82' : 'text-neutral-800';
  const chipClass = isDark
    ? 'text-white/85 decoration-white/40 hover:decoration-white/80'
    : 'text-neutral-800 decoration-neutral-400 hover:decoration-neutral-700';

  return (
    <>
      <StaticCvFontFace lang={lang} />
      <main className={`min-h-[calc(100vh-4rem)] px-4 py-8 text-[18px] sm:px-6 sm:py-10 lg:px-10 ${lang === 'zh' ? 'text-justify' : 'text-left'}`} style={{ fontFamily: bodyFontFamily }}>
        <div className="mx-auto w-full max-w-5xl space-y-11">
          <header>
            <h1 className="text-3xl leading-tight text-amber-700" style={{ fontFamily: headingFontFamily, fontWeight: 400 }}>{text.heading}</h1>
            <p className={`mt-3 text-[18px] ${mutedTextClass}`}>{text.projectInfo}</p>
          </header>

          <section className="space-y-3">
            <h2 className="text-2xl text-amber-700" style={{ fontFamily: headingFontFamily, fontWeight: 400 }}>{text.abstractTitle}</h2>
            <div className={`space-y-3 leading-relaxed ${bodyTextClass}`}>
              {text.abstractParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2 pt-2">
              {text.primaryLinks.map((link) => (
                <a
                  key={`${link.label}-${link.href}`}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noreferrer' : undefined}
                  className={`text-[18px] underline underline-offset-4 transition ${chipClass}`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl text-amber-700" style={{ fontFamily: headingFontFamily, fontWeight: 400 }}>{text.reflectionsTitle}</h2>
            <div className={`space-y-3 leading-relaxed ${bodyTextClass}`}>
              {text.reflectionsParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl text-amber-700" style={{ fontFamily: headingFontFamily, fontWeight: 400 }}>{text.projectsTitle}</h2>

            <nav className="flex flex-wrap gap-2 text-[18px]">
              {text.projects.map((project) => (
                <a
                  key={`anchor-${project.id}`}
                  href={`#${project.id}`}
                  className={`underline underline-offset-4 transition ${chipClass}`}
                >
                  {project.title}
                </a>
              ))}
            </nav>

            <div className="space-y-7 pt-2">
              {text.projects.map((project) => (
                <article
                  key={project.id}
                  id={project.id}
                  className="scroll-mt-24 py-3"
                >
                  <h3 className="text-lg text-amber-700" style={{ fontFamily: headingFontFamily, fontWeight: 400 }}>{project.title}</h3>
                  {project.subtitle ? <p className={`mt-1 text-[18px] ${mutedTextClass}`}>{project.subtitle}</p> : null}
                  <p className={`mt-3 leading-relaxed ${bodyTextClass}`}>{project.summary}</p>

                  {project.bullets && project.bullets.length > 0 ? (
                    <ul className={`mt-3 list-disc space-y-1 pl-5 ${bodyTextClass}`}>
                      {project.bullets.map((bullet) => (
                        <li key={`${project.id}-${bullet}`}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}

                  {project.links && project.links.length > 0 ? (
                    <div className="mt-4 flex flex-wrap gap-2.5 text-[18px]">
                      {project.links.map((link) => (
                        <a
                          key={`${project.id}-${link.label}-${link.href}`}
                          href={link.href}
                          target={link.external ? '_blank' : undefined}
                          rel={link.external ? 'noreferrer' : undefined}
                          className={`underline underline-offset-4 transition ${chipClass}`}
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
