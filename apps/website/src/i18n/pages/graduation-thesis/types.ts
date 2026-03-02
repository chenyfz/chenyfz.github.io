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

export type GraduationThesisPageCopy = {
  meta: {
    title: string;
    description: string;
  };
  heading: string;
  projectInfo: string;
  abstractTitle: string;
  abstractParagraphs: string[];
  reflectionsTitle: string;
  reflectionsParagraphs: string[];
  primaryLinks: GraduationLinkItem[];
  projectsTitle: string;
  projects: GraduationProjectSection[];
};
