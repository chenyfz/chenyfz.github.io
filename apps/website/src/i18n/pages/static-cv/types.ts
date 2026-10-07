export type StaticCvBullet = string | {
  text: string;
  detail?: string;
  fullWidth?: boolean;
};

export type StaticCvExperience = {
  name: string;
  period: string;
  logo?: string;
  title: string;
  bullets: StaticCvBullet[];
  courses?: StaticCvBullet[];
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
  };
  summary: {
    content: string[];
  };
  timelineLabel: string;
  experiences: StaticCvExperience[];
};
