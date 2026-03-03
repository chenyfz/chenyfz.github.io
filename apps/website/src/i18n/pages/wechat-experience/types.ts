export type WechatExperienceSectionContent = {
  title?: string;
  description: string;
  muted?: string;
};

export type WechatExperienceSection = {
  id: string;
  title: string;
  content: WechatExperienceSectionContent[];
};

export type WechatExperiencePageCopy = {
  meta: {
    title: string;
    description: string;
  };
  title: string;
  subtitle: string;
  detailsTitle: string;
  sections: WechatExperienceSection[];
};
