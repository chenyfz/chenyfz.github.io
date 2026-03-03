export type OnecaiSectionContent = {
  title?: string;
  description: string;
  muted?: string;
};

export type OnecaiSection = {
  id: string;
  title: string;
  content: OnecaiSectionContent[];
};

export type OnecaiPageCopy = {
  meta: {
    title: string;
    description: string;
  };
  title: string;
  subtitle: string;
  detailsTitle: string;
  sections: OnecaiSection[];
};
