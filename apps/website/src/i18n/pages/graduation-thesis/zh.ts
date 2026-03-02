import type { GraduationThesisPageCopy } from './types';

const graduationThesisZh: GraduationThesisPageCopy = {
  meta: {
    title: '硕士论文与课程项目 | 陈扬帆',
    description: 'ZoomPursuit 毕业论文与硕士课程项目介绍。'
  },
  heading: 'ZoomPursuit: 面向通用 GUI 的平滑追视眼动交互',
  projectInfo: '硕士毕业设计（Utrecht University）| 2025年2月 - 2025年8月 | 导师：Lynda Hardman',
  abstractTitle: '摘要（中文版仅供参考）',
  abstractParagraphs: [
    '眼动交互在通用图形用户界面中的应用，因其固有的不精确性及对硬件校准的依赖而受限。基于平滑追视的交互方法提供了免校准的替代方案，但通常要求修改用户界面。我们为此提出了 ZoomPursuit：一种通过复用操作系统级放大功能，将平滑追视交互扩展至任意 GUI 的方法。',
    '初步评估（N=16）表明，在模拟校准漂移时，ZoomPursuit 的准确性媲美手动微调，速度则接近自动缩放方案。然而研究也揭示了其隐式自动修正与用户控制感之间的冲突。为此我们开展第二轮研究（N=7），并设计出整合自动校正与手动微调的两阶段模型。最终该设计在无初始校准的情况下实现了 0.10 度的指向精度，并在交互过程中动态校准。',
    '本研究详细阐述了一种面向通用 GUI 的平滑追视交互技术的设计演化。最终设计验证了一个既能保证技术效率，又能保留用户能动性的交互模型。'
  ],
  reflectionsTitle: '一些随想',
  reflectionsParagraphs: [
    '我的毕业设计起点是导师的 DatAR 项目。我最初想围绕 HoloLens 2 做跨设备、跨现实交互，希望让眼动成为不同输入方式之间的协调信号。',
    '后续在发散阅读中，我从 Smooth Pursuit 研究中获得关键启发：通过对比目标运动轨迹与凝视轨迹，可以在不依赖传统校准前提下更鲁棒地识别目标意图。',
    '我把刺激方式从三维视角变化转向二维放大。放大会对屏幕像素整体施加运动，这使追视匹配有机会应用到通用 GUI，而不要求修改具体应用界面。',
    '在桌面端结合消费级眼动仪（Tobii Eye Tracker 5）进行技术验证后，我将毕设重心从 HoloLens 转到桌面环境，也更贴近无障碍应用场景。',
    '受限于硕士阶段时间周期与伦理流程，无障碍方向难以在当期做充分深挖，因此我把论文定位为面向一般用户的新型交互技术，并用两轮研究完成了迭代验证。',
    '以上是完成毕业设计背后的一些思考。感谢阅读。'
  ],
  primaryLinks: [
    { label: '下载论文 PDF', href: '/masters/250805-Yangfan-MScThesis-ZoomPursuit-Submission.pdf' },
    { label: 'GitHub 代码仓库', href: 'https://github.com/chenyfz/GazeControl', external: true },
    { label: '返回硕士课程总览', href: '/zh/masters-courses' }
  ],
  projectsTitle: '课程项目',
  projects: [
    {
      id: 'zoompursuit',
      title: 'ZoomPursuit（毕业论文）',
      subtitle: '面向通用 GUI 的 Smooth Pursuit 眼动交互',
      summary: '聚焦解决眼动交互在通用桌面界面中的漂移与精度问题，探索免校准前提下的可用交互方案。',
      bullets: ['毕业阶段在 CWI 完成研究见习。', '通过两轮用户研究迭代并验证两阶段模型。'],
      links: [
        { label: '论文 PDF', href: '/masters/250805-Yangfan-MScThesis-ZoomPursuit-Submission.pdf' },
        { label: '代码仓库', href: 'https://github.com/chenyfz/GazeControl', external: true }
      ]
    },
    {
      id: 'snow-globe',
      title: '魔法雪球（The Enchanted Snow Globes）',
      subtitle: '交互技术创新课程项目',
      summary:
        '一个面向远程社交联系的实体交互项目，覆盖交互概念、机械结构、3D 打印与嵌入式原型实现。',
      bullets: ['完成了软硬件一体的端到端原型与交互场景验证。']
    },
    {
      id: 'multimodal-interaction',
      title: 'XR 中远距离 2D GUI 的自然手势交互',
      subtitle: '多模态交互课程项目',
      summary: '围绕 XR 中远处 2D 界面交互，完成了手势诱导研究与定性对比评估。',
      bullets: ['完成 Wizard of Oz 诱导式研究。', '实现候选手势并与 Meta 默认交互方式进行对比。']
    }
  ]
};

export default graduationThesisZh;
