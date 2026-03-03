import type { WechatExperiencePageCopy } from './types';

const wechatExperienceZh: WechatExperiencePageCopy = {
  meta: {
    title: '微信经历 | 陈扬帆',
    description: '陈扬帆在微信的工作经历。'
  },
  title: '微信工作经历',
  subtitle: '腾讯微信事业群 - 基础产品部 - 设计中心 - 前端重构组',
  detailsTitle: '经历详情',
  sections: [
    {
      id: 'search',
      title: '搜一搜 前端开发',
      content: [
        {
          description: '主导搜一搜前端项目重构，通过可扩展的设计降低前端开发人力需求。',
          muted: '在 2020、21 年搜一搜需求量大幅增长时，仍保持仅 2.5 个前端开发人力支持所有业务。'
        }
      ]
    },
    {
      id: 'anniversary',
      title: '微信十周年内部活动小程序',
      content: [
        {
          description: '牵头推进纪念活动的 3D UI 的设计迭代并落地实现。',
          muted: '员工与 9 名同事通过 3D UI 互换刻有名字的微信地球鲁班锁碎片，最终获得定制纪念品。'
        }
      ]
    },
    {
      id: 'video',
      title: '视频号 & 直播 前端开发',
      content: [
        {
          description: '支持 2021、22 年快速发展的视频号的功能迭代。',
          muted: '例如：视频号&视频号直播的运营活动、组件库、创作者相关的支付、结算系统等。'
        }
      ]
    }
  ]
};

export default wechatExperienceZh;
