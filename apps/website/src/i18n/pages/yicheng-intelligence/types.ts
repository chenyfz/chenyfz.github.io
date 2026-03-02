export type YichengIntelligenceSectionContent = {
  title?: string;
  description: string;
  muted?: string;
};

export type YichengIntelligenceSection = {
  id: string;
  title: string;
  content: YichengIntelligenceSectionContent[];
};

export type YichengIntelligencePageCopy = {
  meta: {
    title: string;
    description: string;
  };
  title: string;
  subtitle: string;
  detailsTitle: string;
  sections: YichengIntelligenceSection[];
};
