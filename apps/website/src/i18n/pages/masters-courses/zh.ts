import type { MastersCoursesPageCopy } from './types';

const mastersCoursesZh: MastersCoursesPageCopy = {
  meta: {
    title: '硕士课程概览 | 陈扬帆',
    description: '乌得勒支大学 HCI 硕士期间修读课程与项目概览。'
  },
  title: '硕士修读课程概览',
  subtitle: 'Utrecht University（HCI 硕士项目）',
  tocTitle: '目录',
  detailsTitle: '课程详情',
  gradePrefix: '',
  gradeSuffix: '分',
  years: [
    {
      title: '第一年',
      periods: [
        { label: 'Period 1', courseIds: ['mcsp', 'mlhvl'] },
        { label: 'Period 2', courseIds: ['mvis', 'mqlm'] },
        { label: 'Period 3', courseIds: ['miti', 'mmmi'] },
        { label: 'Period 4', courseIds: ['mqnm', 'mmob'] }
      ]
    },
    {
      title: '第二年',
      periods: [
        { label: 'Period 5', courseIds: ['mdm'] },
        { label: 'Period 6', courseIds: ['mcm'] },
        { label: 'Remaining', courseIds: ['thesis'] }
      ]
    }
  ],
  courses: [
    {
      id: 'mcsp',
      title: '面向 HCI 的认知与社会心理学',
      grade: '7.4',
      description:
        '课程聚焦认知与社会心理学在人机交互中的应用。课程项目包括互动课堂设计以及围绕游戏化主题的完整研究提案。'
    },
    {
      id: 'mlhvl',
      title: '面向人类视觉与语言的机器学习',
      grade: '8.3',
      description:
        '覆盖视觉神经科学与深度学习模型、自然语言处理基础。实践部分实现了 CNN、RNN 以及词向量相关任务。'
    },
    {
      id: 'mvis',
      title: '信息可视化',
      grade: '9.0',
      description:
        '学习从感知到评估的信息可视化设计原则。课程项目围绕快时尚品牌可持续性表现，设计并实现了多种可视化方案。',
      links: [{ label: '项目网站', href: 'https://superfashion.walzen.org/', external: true }]
    },
    {
      id: 'mqlm',
      title: '高级 HCI 定性研究方法',
      grade: '7.8',
      description:
        '围绕智能家居摄像头用户认知开展完整定性研究，覆盖数据收集、分析与结论提炼。',
      links: [{ label: '课程论文（PDF）', href: '/masters/Group_30_Final_Paper.pdf' }]
    },
    {
      id: 'miti',
      title: '交互技术创新',
      grade: '8.3',
      description:
        '课程项目从零构建实体交互系统，实践了交互概念、3D 建模、电子原型与 IoT 固件开发。',
      links: [{ label: '相关项目章节', href: '/graduation-thesis#snow-globe', localized: true }]
    },
    {
      id: 'mmmi',
      title: '多模态交互',
      grade: '8.0',
      description:
        '围绕 XR 场景中的远距离 2D 界面交互完成两阶段研究：先做 Wizard of Oz 诱导，再实现与评估手势方案。',
      links: [{ label: '相关项目章节', href: '/graduation-thesis#multimodal-interaction', localized: true }]
    },
    {
      id: 'mqnm',
      title: '高级 HCI 定量研究方法',
      grade: '9.4',
      description:
        '使用 K-EmoPhone 数据集开展定量分析，研究人格特质与生理压力指标之间的关系。',
      links: [{ label: '课程论文（PDF）', href: '/masters/infomqnm-report.pdf' }]
    },
    {
      id: 'mmob',
      title: '移动交互',
      grade: '7.9',
      description:
        '通过论文与案例分析移动与可穿戴交互设计，重点关注情境因素、硬件约束与人因影响。'
    },
    {
      id: 'mdm',
      title: '数据挖掘',
      grade: '8.5',
      description:
        '系统学习 PAC learning、VC-dimension 与常见机器学习算法，并进行模型选择与实验比较。',
      links: [
        { label: '作业一（ZIP）', href: '/masters/DM-A1-Yangfan-Yilun-Reem.zip' },
        { label: '作业二（PDF）', href: '/masters/INFOMDM2024-A2-Yangfan-Yilun-Reem.pdf' }
      ]
    },
    {
      id: 'mcm',
      title: '认知建模',
      grade: '8.3',
      description:
        '覆盖符号主义、联结主义与概率模型三类认知建模方法，并通过作业完成建模与评估。'
    },
    {
      id: 'thesis',
      title: '研究项目（硕士毕业论文）',
      grade: '8.7',
      description:
        '毕业论文 ZoomPursuit 探索了如何将免校准平滑追视眼动交互扩展到通用 GUI 场景。',
      links: [{ label: '论文与项目页面', href: '/graduation-thesis#zoompursuit', localized: true }]
    }
  ]
};

export default mastersCoursesZh;
