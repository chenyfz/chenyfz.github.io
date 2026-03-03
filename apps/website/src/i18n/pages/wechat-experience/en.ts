import type { WechatExperiencePageCopy } from './types';

const wechatExperienceEn: WechatExperiencePageCopy = {
  meta: {
    title: 'WeChat Experience | Chen Yangfan',
    description: 'Chen Yangfan\'s work experience at WeChat.'
  },
  title: 'WeChat Work Experience',
  subtitle: 'Tencent WeChat Group - Core Product Dept - Design Center - Frontend Refactoring Team',
  detailsTitle: 'Experience Details',
  sections: [
    {
      id: 'search',
      title: 'Weixin Search Frontend Development',
      content: [
        {
          description: 'Owned the Weixin Search frontend refactor and introduced a scalable architecture.',
          muted: 'During peak demand growth in 2020-2021, the scope was sustained with only 2.5 FTE frontend capacity.'
        }
      ]
    },
    {
      id: 'anniversary',
      title: 'WeChat 10th Anniversary Internal Mini Program',
      content: [
        {
          description: 'Led the 3D UI design iteration and implementation for the anniversary internal mini program.',
          muted: 'Delivered a production-ready internal campaign featuring collaborative multi-user interactions.'
        }
      ]
    },
    {
      id: 'video',
      title: 'Video Channels and Live Streaming Frontend Development',
      content: [
        {
          description: 'Supported rapid feature iteration for Video Channels and Live Streaming in 2021-2022.',
          muted: 'Built campaign pages, component-library modules, and creator payment and settlement workflows.'
        }
      ]
    }
  ]
};

export default wechatExperienceEn;
