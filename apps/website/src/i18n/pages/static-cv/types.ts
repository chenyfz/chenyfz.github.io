export type StaticCvBullet = string | {
  text: string;
  detail?: string;
  muted?: string;
};

export type StaticCvExperience = {
  period: string;
  logo?: string;
  title: string;
  bullets: StaticCvBullet[];
  accentLabel?: string;
  accentDetail?: string;
  layout?: 'list' | 'grid-3';
};

export type StaticCvCapability = {
  title: string;
  items: string[];
};

export type StaticCvMetaItem = {
  label: string;
  value: string;
  href?: string;
};

export type StaticCvPageCopy = {
  meta: {
    title: string;
    description: string;
  };
  intro: {
    title: string;
    metaItems: StaticCvMetaItem[];
    objectiveLabel: string;
    objectiveSeparator: string;
    objective: string;
  };
  summary: {
    content: string;
  };
  timelineLabel: string;
  capabilityLabel: string;
  experiences: StaticCvExperience[];
  capabilities: StaticCvCapability[];
};
