export type GraduationLinkItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type GraduationProjectSection = {
  id: string;
  title: string;
  subtitle?: string;
  summary: string;
  bullets?: string[];
  links?: GraduationLinkItem[];
};

export type GraduationThesisMetric = {
  label: string;
  value: string;
  note?: string;
};

export type GraduationThesisMedia = {
  type: 'image' | 'video';
  src: string;
  alt: string;
  caption?: string;
  poster?: string;
};

export type GraduationThesisNarrativeSection = {
  id: string;
  kicker?: string;
  title: string;
  lead?: string;
  points?: string[];
  quote?: string;
  metrics?: GraduationThesisMetric[];
  media?: GraduationThesisMedia[];
};

export type GraduationThesisPageCopy = {
  meta: {
    title: string;
    description: string;
  };
  heading: string;
  projectInfo: string | {
    type: string;
    duration: string;
    supervisor: string;
    supervisorLabel?: string;
  };
  abstractTitle: string;
  abstractParagraphs: string[];
  narrativeTitle: string;
  narrativeSections: GraduationThesisNarrativeSection[];
  reflectionsTitle: string;
  reflectionsParagraphs: string[];
  primaryLinks: GraduationLinkItem[];
  projectsTitle: string;
  projects: GraduationProjectSection[];
};
