import { Fragment, type ReactNode } from 'react';
import type { Locale } from '@/i18n/config';
import type { StaticCvPageCopy, StaticCvExperience, StaticCvCapability, StaticCvBullet } from '@/i18n/pages/static-cv/types';
import RichText from '@/components/common/RichText';

type Props = { text: StaticCvPageCopy; lang: Locale };

function HeaderSection({ intro }: { intro: StaticCvPageCopy['intro'] }) {
  return <header className="cv-header">
    <h1>{intro.title}</h1>
    <div className="cv-meta">
      {intro.metaItems.map((item, index) => <Fragment key={`${item.label}-${item.value}`}>
        <span className="cv-meta-item">
          <span className="cv-muted">{item.label}:</span>{' '}
          {item.href ? <a href={item.href}>{item.value}</a> : <span>{item.value}</span>}
        </span>
        {index < intro.metaItems.length - 1 && <span className="cv-meta-divider" aria-hidden="true">|</span>}
      </Fragment>)}
    </div>
    <p className="cv-objective">
      <span>{intro.objectiveLabel}{intro.objectiveSeparator}</span>
      <RichText text={intro.objective} />
    </p>
  </header>;
}

function BulletContent({ bullet }: { bullet: StaticCvBullet }) {
  if (typeof bullet === 'string') return <RichText text={bullet} />;
  return <>
    <RichText text={bullet.text} />
    {bullet.detail && <RichText text={bullet.detail} />}
    {bullet.muted && <p className="cv-bullet-note cv-muted">{bullet.muted}</p>}
  </>;
}

function BulletListItem({ children }: { children: ReactNode }) {
  return <li className="cv-bullet">
    <span className="cv-bullet-marker" aria-hidden="true"><span /></span>
    <div className="cv-bullet-content">{children}</div>
  </li>;
}

function bulletToInlineText(bullet: StaticCvBullet): string {
  if (typeof bullet === 'string') return bullet.trim();
  const detail = bullet.detail?.trim();
  return `${bullet.text}${detail ? ` ${detail}` : ''}`.trim();
}

function ExperienceItem({ experience, lang }: { experience: StaticCvExperience; lang: Locale }) {
  const isGrid = experience.layout === 'grid-3';
  return <article className="cv-experience">
    <div className="cv-period">{experience.period}</div>
    <div className="cv-experience-body">
      <div className="cv-experience-heading">
        <img src={experience.logo || '/favicon.svg'} alt="" width={20} height={20} />
        <h3>
          {experience.title}
          {experience.accentLabel && <span className="cv-accent"> {experience.accentLabel}</span>}
          {experience.accentDetail && <span> {experience.accentDetail}</span>}
        </h3>
      </div>
      {isGrid && lang === 'en' ? <ul className="cv-bullets">
        <BulletListItem><RichText text={experience.bullets.map(bulletToInlineText).join(', ')} /></BulletListItem>
      </ul> : <ul className={`cv-bullets${isGrid ? ' cv-bullets--grid' : ''}`}>
        {experience.bullets.map((bullet, index) => <BulletListItem key={index}><BulletContent bullet={bullet} /></BulletListItem>)}
      </ul>}
    </div>
  </article>;
}

function CapabilitySection({ capabilities, label }: { capabilities: StaticCvCapability[]; label: string }) {
  return <section className="cv-section">
    <h2>{label}</h2>
    <div className="cv-capabilities">
      {capabilities.map((capability, index) => <article key={index}>
        <h3>{capability.title}</h3>
        <ul className="cv-bullets cv-bullets--compact">
          {capability.items.map((item, itemIndex) => <BulletListItem key={itemIndex}>{item}</BulletListItem>)}
        </ul>
      </article>)}
    </div>
  </section>;
}

export default function StaticCv({ text, lang }: Props) {
  return <main className="resume-page" lang={lang}>
    <div className="cv-layout">
      <div className="cv-intro">
        <HeaderSection intro={text.intro} />
        <p className="cv-summary"><RichText text={text.summary.content} /></p>
      </div>
      <section className="cv-section cv-timeline">
        <h2>{text.timelineLabel}</h2>
        <div className="cv-experiences">
          {text.experiences.map((experience, index) => <ExperienceItem key={index} experience={experience} lang={lang} />)}
        </div>
      </section>
      <aside className="cv-sidebar">
        <CapabilitySection capabilities={text.capabilities} label={text.capabilityLabel} />
      </aside>
    </div>
  </main>;
}
