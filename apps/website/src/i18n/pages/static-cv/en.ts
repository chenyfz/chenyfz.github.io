import type { StaticCvPageCopy } from './types';

const staticCvPageEn: StaticCvPageCopy = {
  meta: {
    title: 'Chen Yangfan (陈扬帆) | Resume',
    description: 'Chen Yangfan’s background in software engineering, human-computer interaction, and product design, and plans for independent creative work.'
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
        value: '2026.10.8'
      }
    ]
  },
  summary: {
    content: [
      'I’m starting an independent business to turn my ideas into software tools, interactive experiences, and games. My background in software engineering, human-computer interaction, and product design allows me to take an idea through design and development.',
      'Working with AI agents expands what I can make on my own. I also want to deepen my understanding of design, art, and games: to understand the choices behind a work, explain why they succeed, and use that knowledge to develop and assess my own ideas. Building this judgment is part of learning to make better work.',
      'I’ll begin by studying these subjects and sharing what I learn through research, case studies, and practical examples. Writing and explaining will help me develop my understanding while making it useful to others. Alongside this, I’ll run small creative experiments and bring what I learn into my own projects. Over time, I hope to make products and games that reflect my ideas and style, and build an income that supports the freedom to keep learning, making, and exploring.'
    ]
  },
  timelineLabel: 'Experience',
  experiences: [
    {
      name: 'Nanjing University',
      period: '2016–2020',
      logo: '/static-cv/nju-logo.png',
      title: 'B.Eng. in Software Engineering',
      bullets: [
        'Computer science and software engineering foundations; university and provincial team awards for the graduation project.'
      ]
    },
    {
      name: 'Tencent WeChat Group',
      period: '2020–2022',
      logo: '/static-cv/wechat-logo.png',
      title: 'Frontend Engineer',
      bullets: [
        '[Weixin Search](/en/#wechat-search): in 2020–2021, refactored the frontend to improve extensibility and reduce staffing needs.',
        '[WeChat 10th anniversary mini program](/en/#wechat-anniversary): contributed to 3D UI, model and animation iterations; independently implemented the 3D UI.',
        'Video Channels & Live Streaming: in 2021–2022, developed frontend features during rapid business growth.',
        'Fast-track promotion in 2021.'
      ]
    },
    {
      name: 'Utrecht University',
      period: '2023–2025',
      logo: '/static-cv/uu-logo.png',
      title: 'MSc in Human-Computer Interaction (cum laude)',
      courses: [
        {
          text: '[Machine Learning](/en/masters-courses#mlhvl)',
          detail: ' (CV & NLP)'
        },
        {
          text: '[Digital Fabrication](/en/masters-courses#miti)',
          detail: ' (3D modeling & printing)'
        },
        {
          text: 'Human-Centered Design'
        },
        {
          text: 'Data Science',
          detail: ' ([mining](/en/masters-courses#mdm) & [visualization](/en/masters-courses#mvis))'
        },
        {
          text: '[Mobile Interaction](/en/masters-courses#mmob)'
        },
        {
          text: 'Research Methods',
          detail: ' ([qualitative](/en/masters-courses#mqlm) & [quantitative](/en/masters-courses#mqnm))'
        },
        {
          text: '[Cognitive & Social Psychology](/en/masters-courses#mcsp)'
        },
        {
          text: '[Cognitive Modeling](/en/masters-courses#mcm)'
        },
        {
          text: '[Multimodal Interaction](/en/masters-courses#mmmi)',
          detail: ' (XR; visual, auditory, haptic & olfactory interaction)',
          fullWidth: true
        }
      ],
      bullets: [
        '[Master’s thesis](/en/graduation-thesis): design and empirical evaluation of a gaze-based interaction technique for accurate pointing without calibration or changes to software GUIs.'
      ]
    },
    {
      name: 'CWI (Centrum Wiskunde & Informatica)',
      period: '03/2025–08/2025',
      logo: '/static-cv/cwi-logo.png',
      title: 'Master’s Thesis Intern',
      bullets: []
    },
    {
      name: '1cAI',
      period: '10/2025–01/2026',
      logo: '/static-cv/startup-icon.svg',
      title: 'Product, design, frontend & agent workflows (part-time)',
      bullets: [
        '[AI tender review](/en/#tender-ai-tool): designed agent workflows using multimodal document understanding and RAG to check compliance across documents of 500+ pages.'
      ]
    },
    {
      name: 'TapNow',
      period: '03/2026–09/2026',
      logo: '/static-cv/tapnow-logo.png',
      title: 'Product, design & engineering',
      bullets: [
        '3D studio: independently handled product, design and engineering.',
        'TapNow CLI: led design and implementation from scratch; contributed to the agent harness architecture.',
        'Infinite canvas: contributed to interaction improvements; led design iterations from August 2026.'
      ]
    }
  ]
};

export default staticCvPageEn;
