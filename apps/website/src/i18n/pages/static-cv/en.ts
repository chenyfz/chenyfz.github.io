import type { StaticCvPageCopy } from './types';

const staticCvPageEn: StaticCvPageCopy = {
  meta: {
    title: 'Chen Yangfan (陈扬帆) | Static CV',
    description: 'English static CV for Chen Yangfan (陈扬帆).'
  },
  intro: {
    title: 'Resume - Chen Yangfan (陈扬帆)',
    metaItems: [
      {
        label: 'Email',
        value: 'x.chenyangfan@gmail.com',
        href: 'mailto:x.chenyangfan@gmail.com'
      },
      {
        label: 'Version',
        value: '2026.2.26'
      }
    ],
    objectiveLabel: 'Target Role',
    objectiveSeparator: ': ',
    objective: 'Product Engineer (product strategy, design, and implementation) | Technical Product Manager | Frontend Engineer'
  },
  summary: {
    content: 'Engineer with cross-disciplinary experience in software engineering, HCI research, and product/interaction design. Delivered complex WeChat core-product iterations and later built 0-to-1 AI products in an integrated product-design-engineering role. Strong in structured problem framing under constraints, rapid prototyping and validation, and iterative delivery.'
  },
  timelineLabel: 'Experience',
  capabilityLabel: 'Skills',
  experiences: [
    {
      period: '2016.9 - 2020.7',
      logo: '/static-cv/nju-logo.png',
      title: 'B.Eng. in Software Engineering, Nanjing University (南京大学)',
      bullets: [
        'Built strong CS/SE foundations; received university and provincial graduation project team awards.'
      ]
    },
    {
      period: '2020.7 - 2022.5',
      logo: '/static-cv/wechat-logo.png',
      title: 'Frontend Engineer (T8), Frontend Refactoring Team, Design Center, Core Product Dept, Tencent WeChat Group (腾讯微信事业群)',
      bullets: [
        {
          text: 'Weixin Search frontend (搜一搜): owned the frontend refactor and introduced a scalable architecture.',
          muted: 'During peak demand growth in 2020-2021, the scope was sustained with only 2.5 FTE frontend capacity.'
        },
        {
          text: 'WeChat 10th Anniversary internal mini program: led the 3D UI design iteration and implementation.',
          muted: 'Delivered a production-ready internal campaign featuring collaborative multi-user interactions.'
        },
        {
          text: 'Video Channels and Live Streaming frontend (视频号 & 直播): supported rapid feature iteration in 2021-2022.',
          muted: 'Built campaign pages, component-library modules, and creator payment and settlement workflows.'
        },
        'Promoted via fast-track from T6 to T8 (H2 2021).'
      ]
    },
    {
      period: '2023.9 - 2025.8',
      logo: '/static-cv/uu-logo.png',
      title: 'MSc in Human-Computer Interaction, Utrecht University (Cum Laude)',
      layout: 'grid-3',
      bullets: [
        { text: '[Machine Learning](/en/masters-courses#mlhvl)', detail: ' (CV & NLP)' },
        { text: '[Digital Fabrication](/en/masters-courses#miti)', detail: ' (3D modeling & printing)' },
        { text: 'Human-Centered Design' },
        { text: 'Data Science', detail: ' ([mining](/en/masters-courses#mdm) & [visualization](/en/masters-courses#mvis))' },
        { text: '[Multimodal Interaction](/en/masters-courses#mmmi)', detail: ' (XR, visual/audio/haptic/olfactory)' },
        { text: '[Mobile Interaction](/en/masters-courses#mmob)' },
        { text: 'Research Methods', detail: ' ([qual.](/en/masters-courses#mqlm) & [quant.](/en/masters-courses#mqnm))' },
        { text: '[Cognitive & Social Psychology](/en/masters-courses#mcsp)' },
        { text: '[Cognitive Modeling](/en/masters-courses#mcm)' }
      ]
    },
    {
      period: '2025.3 - 2025.8',
      logo: '/static-cv/cwi-logo.png',
      title: 'Research Intern (Master\'s Thesis), CWI (Centrum Wiskunde & Informatica)',
      bullets: [
        'Completed a [master\'s thesis](/en/graduation-thesis) on interaction design for eye-tracking systems.'
      ]
    },
    {
      period: '2025.10 - 2026.1',
      logo: '/static-cv/startup-icon.svg',
      title: '1cAI (一成智能)',
      accentLabel: '(Startup, part-time)',
      accentDetail: 'UI / UX, product design, frontend development, and agent workflow design',
      bullets: [
        {
          text: 'Built AI tooling for bid/tender review: qualification, pricing, commercial, technical, and process compliance checks.',
          muted: 'Reduced manual cross-checking effort for long tender documents and lowered disqualification risk caused by oversight.'
        },
        'Technical scope: long-context (500+ pages) agent workflow design, multimodal document understanding, and RAG.',
        'Design scope: user-needs insight, structured output presentation, and cognitive-load control.'
      ]
    }
  ],
  capabilities: [
    {
      title: 'Programming & Engineering',
      items: [
        'Frontend and full-stack development',
        'C# stack: Windows clients, Unity, MR',
        'Data analysis and machine learning',
        'Strong CS / SE fundamentals',
        'Large-scale codebase maintenance and refactoring'
      ]
    },
    {
      title: 'Interaction / UI Design',
      items: [
        'Figma and Sketch',
        'Code-first design with AI + frontend',
        'Human-centered design methodology',
        'Human factors and multimodal interaction',
        'Cognitive-load-aware design'
      ]
    },
    {
      title: 'Product Design',
      items: [
        'Knowledge across software engineering, mobile internet, AI applications, and multimodal interaction',
        'Strong problem discovery and framing',
        'Requirements engineering and user research'
      ]
    },
    {
      title: 'HCI / Interaction Design / AI Research',
      items: [
        'Graduated with honors (Cum Laude) from a research-focused HCI master program in the Netherlands'
      ]
    }
  ]
};

export default staticCvPageEn;
