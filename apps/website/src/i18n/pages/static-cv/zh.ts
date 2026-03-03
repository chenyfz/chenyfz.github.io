import type { StaticCvPageCopy } from './types';

const staticCvPageZh: StaticCvPageCopy = {
  meta: {
    title: '陈扬帆 | 静态简历',
    description: '陈扬帆的中文静态简历页面。'
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
        value: '2026.2.26'
      }
    ],
    objectiveLabel: '求职意向',
    objectiveSeparator: '：',
    objective: '产品型工程师（产品 + 设计 + 实现落地）或 技术产品经理 或 前端工程师'
  },
  summary: {
    content: '工程技术 + 人机交互研究 + 交互/产品设计复合背景。曾在微信基础产品参与复杂产品迭代；也在 AI 创业场景以产品/设计/开发一体化角色从 0 到 1 构建和迭代产品。擅长在约束条件下拆解问题、快速原型与验证、推进交付并持续迭代；能够将产品、设计与工程决策共同考虑对齐，推动前沿技术应用；高效沟通、提高效率和方案质量。'
  },
  timelineLabel: '经历',
  capabilityLabel: '技能',
  experiences: [
    {
      period: '2016.9 - 2020.7',
      logo: '/static-cv/nju-logo.png',
      title: '南京大学 软件工程 本科',
      bullets: [
        '计算机科学基础和软件工程能力，南京大学、江苏省优秀毕业设计团队奖及其他奖项。'
      ]
    },
    {
      period: '2020.7 - 2022.5',
      logo: '/static-cv/wechat-logo.png',
      title: '腾讯微信事业群 - 基础产品部 - 设计中心 - 前端重构组 前端工程师（T8）',
      bullets: [
        {
          text: '[搜一搜 前端开发](/zh/wechat-search)：主导搜一搜前端项目重构，通过可扩展的设计降低前端开发人力需求。',
          muted: '在 2020、21 年搜一搜需求量大幅增长时，仍保持仅 2.5 个前端开发人力支持所有业务。'
        },
        {
          text: '[微信十周年内部活动小程序](/zh/wechat-anniversary)：牵头推进纪念活动的 3D UI 的设计迭代并落地实现。',
          muted: '员工与 9 名同事通过 3D UI 互换刻有名字的微信地球鲁班锁碎片，最终获得定制纪念品。'
        },
        {
          text: '视频号 & 直播 前端开发：支持 2021、22 年快速发展的视频号的功能迭代。',
          muted: '例如：视频号&视频号直播的运营活动、组件库、创作者相关的支付、结算系统等。'
        },
        '2021 H2：绿色通道晋升（T6 到 T8）。'
      ]
    },
    {
      period: '2023.9 - 2025.8',
      logo: '/static-cv/uu-logo.png',
      title: '乌特勒支大学（Utrecht University）人机交互硕士（Cum Laude 荣誉毕业）',
      layout: 'grid-3',
      bullets: [
        { text: '[机器学习](/zh/masters-courses#mlhvl)', detail: '（CV & NLP）' },
        { text: '[数字制造](/zh/masters-courses#miti)', detail: '（3D 建模、打印）' },
        { text: '人本设计' },
        { text: '数据科学', detail: '（[数据挖掘](/zh/masters-courses#mdm)、[可视化](/zh/masters-courses#mvis)）' },
        { text: '[多模态交互](/zh/masters-courses#mmmi)', detail: '（XR，视听触嗅觉）' },
        { text: '[移动交互](/zh/masters-courses#mmob)' },
        { text: '学术研究方法', detail: '（[定性](/zh/masters-courses#mqlm)、[定量](/zh/masters-courses#mqnm)）' },
        { text: '[认知、社会心理学](/zh/masters-courses#mcsp)' },
        { text: '[认知建模](/zh/masters-courses#mcm)' }
      ]
    },
    {
      period: '2025.3 - 2025.8',
      logo: '/static-cv/cwi-logo.png',
      title: '荷兰国家数学与计算机科学研究中心 硕士毕业论文见习',
      bullets: [
        '研究机构见习，在此期间完成关于眼动追踪创新交互设计的[硕士论文](/zh/graduation-thesis)。'
      ]
    },
    {
      period: '2025.10 - 2026.1',
      logo: '/static-cv/startup-icon.svg',
      title: '一成智能（1cAI，初创公司）',
      accentLabel: '创业兼职',
      accentDetail: 'UI、UX、产品设计 + 前端开发 + Agent 流程设计',
      bullets: [
        {
          text: '[招投标领域 AI 工具](/zh/tender-ai-tool)，使用 AI 检查招标文件资格、报价、商务、技术、流程合规等要求。',
          muted: '目标：降低人工交叉逐项检查大型招、投标文件的成本，规避由疏忽造成的废标风险。'
        },
        '技术挑战：超长上下文（例如 500+ 页）的 Agent 流程设计，多模态文档理解，RAG 等；',
        '设计挑战：用户需求洞察，检查结果信息结构化展示以及认知负载控制。'
      ]
    }
  ],
  capabilities: [
    {
      title: '编程与工程能力',
      items: [
        '精通前端开发，熟悉全栈开发；',
        'C# 技术栈：Windows 客户端、Unity、混合现实；',
        '数据分析、机器学习等；',
        '扎实的计算机与软件工程知识；',
        '大型代码库维护与重构经验，关注可维护、可扩展与长期迭代。'
      ]
    },
    {
      title: '交互 / UI 设计',
      items: [
        'Figma、Sketch；',
        '近期探索跳过 Figma 等设计工具，直接使用代码设计并落地：利用 AI+前端能力快速、高保真设计；',
        '以人为本的设计方法论；',
        '人因、多模态交互；',
        '考虑认知负载做交互与视觉设计。'
      ]
    },
    {
      title: '产品设计',
      items: [
        '软件工程/移动互联网/AI 应用/电子产品设计/多模态交互知识；',
        '敏感、敏锐的问题发现能力；',
        '需求工程、用户研究技能。'
      ]
    },
    {
      title: '人机交互/交互设计/AI 学术研究',
      items: [
        '以优等荣誉学位毕业于荷兰研究型人机交互硕士项目。'
      ]
    }
  ]
};

export default staticCvPageZh;
