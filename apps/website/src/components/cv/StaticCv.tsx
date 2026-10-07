import type { ReactNode } from 'react';
import type { Locale } from '@/i18n/config';
import type { StaticCvPageCopy, StaticCvExperience, StaticCvBullet } from '@/i18n/pages/static-cv/types';
import RichText from '@/components/common/RichText';
import ProjectLink from '@/features/project-preview/ProjectLink';

type Props = { text: StaticCvPageCopy; lang: Locale };

function HeaderSection({ intro, lang }: { intro: StaticCvPageCopy['intro']; lang: Locale }) {
  return <header className="cv-header">
    <h1 className="cv-title">{intro.title}</h1>
    <div className="cv-meta">
      {intro.metaItems.map((item) => <span className="cv-meta-item" key={`${item.label}-${item.value}`}>
        <span className="cv-muted">{item.label}{lang === 'zh' ? '：' : ':'}</span>{lang === 'en' && ' '}
        {item.href ? <a href={item.href}>{item.value}</a> : <span>{item.value}</span>}
      </span>)}
    </div>
  </header>;
}

function BulletContent({ bullet }: { bullet: StaticCvBullet }) {
  if (typeof bullet === 'string') return <RichText text={bullet} linkComponent={ProjectLink} />;
  return <>
    <RichText text={bullet.text} linkComponent={ProjectLink} />
    {bullet.detail && <RichText text={bullet.detail} linkComponent={ProjectLink} />}
  </>;
}

function BulletListItem({ children, fullWidth = false }: { children: ReactNode; fullWidth?: boolean }) {
  return <li className={`cv-bullet${fullWidth ? ' cv-bullet--full-width' : ''}`}>
    <span className="cv-bullet-marker" aria-hidden="true"><span /></span>
    <div className="cv-bullet-content">{children}</div>
  </li>;
}

function BulletList({ bullets, grid = false }: { bullets: StaticCvBullet[]; grid?: boolean }) {
  if (bullets.length === 0) return null;
  return <ul className={`cv-bullets${grid ? ' cv-bullets--grid' : ''}`}>
    {bullets.map((bullet, index) => <BulletListItem key={index} fullWidth={grid && typeof bullet !== 'string' && bullet.fullWidth}><BulletContent bullet={bullet} /></BulletListItem>)}
  </ul>;
}

function ExperienceItem({ experience }: { experience: StaticCvExperience }) {
  return <article className="cv-experience">
    <div className="cv-experience-heading">
      <img src={experience.logo || '/favicon.svg'} alt="" width={20} height={20} />
      <span className="cv-period">{experience.period}</span>
      <div className="cv-experience-details">
        <h2 className="cv-experience-name">{experience.name}</h2>
        <span className="cv-role">{experience.title}</span>
      </div>
    </div>
    {(experience.courses?.length || experience.bullets.length) ? <div className="cv-experience-body">
      {experience.courses && <BulletList bullets={experience.courses} grid />}
      <BulletList bullets={experience.bullets} />
    </div> : null}
  </article>;
}

export default function StaticCv({ text, lang }: Props) {
  return <main className="resume-page" lang={lang}>
    <div className="cv-layout">
      <div className="cv-profile">
        <HeaderSection intro={text.intro} lang={lang} />
        <div className="cv-summary">
          {text.summary.content.map((paragraph, index) => <p key={index}><RichText text={paragraph} /></p>)}
        </div>
      </div>
      <section className="cv-timeline" aria-label={text.timelineLabel}>
        <div className="cv-experiences">
          {text.experiences.map((experience, index) => <ExperienceItem key={index} experience={experience} />)}
        </div>
      </section>
    </div>
  </main>;
}
