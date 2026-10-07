import type { StaticCvPageCopy } from './types';

const staticCvPageZh: StaticCvPageCopy = {
  meta: {
    title: '陈扬帆 | 简历',
    description: '陈扬帆的独立创作与创业方向，以及软件工程、人机交互和产品设计经历。'
  },
  intro: {
    title: '简历 - 陈扬帆',
    metaItems: [
      {
        label: '邮箱',
        value: 'x.chenyangfan@gmail.com',
        href: 'mailto:x.chenyangfan@gmail.com'
      },
      {
        label: '版本',
        value: '2026.10.8'
      }
    ]
  },
  summary: {
    content: [
      '我正在独立创业，希望有更多机会从自己的兴趣和想法出发，做一些值得投入时间的东西。过去在工程与设计方面的经历，让我能够把构思做成实际可用的产品；现在，我想更主动地决定做什么、做成什么样，也通过创作接触自己还不熟悉的领域。',
      '与 AI Agents 协作，让我能够尝试更广泛的创作，也让我越来越在意自己的判断。一个想法是否有趣，一种表达是否贴切，一个作品为什么打动人，都值得仔细琢磨。我想深入学习设计、艺术与游戏，理解不同风格和作品背后的选择，能够准确地表达自己的意图，也知道该怎样继续改进。',
      '我打算先把这段探索整理成可以分享的内容：从感兴趣的问题和作品出发，查资料、做尝试，再把理解清楚的东西讲出来。与此同时，持续做一些工具、交互实验和小游戏，让学习中的想法有机会变成具体的作品。我希望在反复尝试和打磨中，逐渐形成自己的审美与表达，做出真正承载自己想法的产品和游戏。'
    ]
  },
  timelineLabel: '经历',
  experiences: [
    {
      name: '南京大学',
      period: '2016–2020',
      logo: '/static-cv/nju-logo.png',
      title: '软件工程本科',
      bullets: [
        '计算机科学基础和软件工程能力，南京大学、江苏省优秀毕业设计团队奖及其他奖项。'
      ]
    },
    {
      name: '腾讯微信事业群',
      period: '2020–2022',
      logo: '/static-cv/wechat-logo.png',
      title: '基础产品部 · 设计中心 · 前端重构组，前端工程师 (T8)',
      bullets: [
        '[搜一搜前端开发](/zh/#wechat-search)：2020–2021 年负责前端开发与系统重构，提升可扩展性、降低开发人力需求，支撑业务快速增长。',
        '[微信十周年内部活动小程序](/zh/#wechat-anniversary)：参与 3D UI、模型与动画的设计迭代，并独立实现 3D UI。',
        '视频号与直播前端开发：2021–2022 年负责前端开发，支持业务快速发展期间的功能迭代。',
        '连续获得 4 星绩效，2021 H2 经绿色通道由 T6 晋升至 T8。'
      ]
    },
    {
      name: '乌特勒支大学 (Utrecht University)',
      period: '2023–2025',
      logo: '/static-cv/uu-logo.png',
      title: '人机交互硕士 (Cum Laude 荣誉毕业)',
      courses: [
        {
          text: '[机器学习](/zh/masters-courses#mlhvl)',
          detail: ' (CV & NLP)'
        },
        {
          text: '[数字制造](/zh/masters-courses#miti)',
          detail: ' (3D 建模、打印)'
        },
        {
          text: '人本设计'
        },
        {
          text: '数据科学',
          detail: ' ([数据挖掘](/zh/masters-courses#mdm)、[可视化](/zh/masters-courses#mvis))'
        },
        {
          text: '[多模态交互](/zh/masters-courses#mmmi)',
          detail: ' (XR，视听触嗅觉)'
        },
        {
          text: '[移动交互](/zh/masters-courses#mmob)'
        },
        {
          text: '学术研究方法',
          detail: ' ([定性](/zh/masters-courses#mqlm)、[定量](/zh/masters-courses#mqnm))'
        },
        {
          text: '[认知、社会心理学](/zh/masters-courses#mcsp)'
        },
        {
          text: '[认知建模](/zh/masters-courses#mcm)'
        }
      ],
      bullets: [
        '[硕士毕业论文](/zh/graduation-thesis)：一种无需校准、无需修改软件 GUI 的高准确度眼控交互方案及其实证研究。'
      ]
    },
    {
      name: '荷兰国家数学与计算机科学研究中心',
      period: '2025.03–2025.08',
      logo: '/static-cv/cwi-logo.png',
      title: '硕士毕业论文实习',
      bullets: []
    },
    {
      name: '一成智能',
      period: '2025.10–2026.01',
      logo: '/static-cv/startup-icon.svg',
      title: '产品、设计、前端工程、Agent 流程设计 (兼职，初创团队)',
      bullets: [
        '[招投标 AI 工具](/zh/#tender-ai-tool)：面向超长文档 (如 500+ 页) 设计 Agent 流程，结合多模态文档理解与 RAG，检查资格、报价、商务、技术及流程合规要求，辅助跨文件核查，降低人工漏检导致的废标风险。'
      ]
    },
    {
      name: '添科智能 (TapNow)',
      period: '2026.03–2026.09',
      logo: '/static-cv/tapnow-logo.png',
      title: '产品、设计与工程',
      bullets: [
        '3D 片场：独立全权负责产品、设计与工程实现。',
        'TapNow CLI：主导从 0 到 1 的设计与实现，并参与 Agent Harness 架构设计。',
        '画布交互：参与常规交互迭代，并自 2026 年 8 月起主导 TapNow 无限画布形态迭代。'
      ]
    }
  ]
};

export default staticCvPageZh;
