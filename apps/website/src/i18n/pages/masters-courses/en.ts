import type { MastersCoursesPageCopy } from './types';

const mastersCoursesEn: MastersCoursesPageCopy = {
  meta: {
    title: "Master's Courses Overview | Chen Yangfan",
    description: 'Overview of enrolled MSc courses in Utrecht University HCI program.'
  },
  title: "Overview of Enrolled Master's Courses",
  subtitle: 'Utrecht University (HCI MSc Programme)',
  tocTitle: 'Table of Contents',
  detailsTitle: 'Course Details',
  gradePrefix: 'Grade: ',
  gradeSuffix: '',
  years: [
    {
      title: 'First Year',
      periods: [
        { label: 'Period 1', courseIds: ['mcsp', 'mlhvl'] },
        { label: 'Period 2', courseIds: ['mvis', 'mqlm'] },
        { label: 'Period 3', courseIds: ['miti', 'mmmi'] },
        { label: 'Period 4', courseIds: ['mqnm', 'mmob'] }
      ]
    },
    {
      title: 'Second Year',
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
      title: 'Advanced Cognitive and Social Psychology for HCI',
      grade: '7.4',
      description:
        'Explored applications of cognitive and social psychology in HCI. Group projects included an interactive lecture design and a full research proposal on gamification.'
    },
    {
      id: 'mlhvl',
      title: 'Machine Learning for Human Vision and Language',
      grade: '8.3',
      description:
        'Covered neuroscience-inspired vision models and NLP foundations. Practical work included implementing CNN, RNN, and GloVe-style pipelines.'
    },
    {
      id: 'mvis',
      title: 'Information Visualization',
      grade: '9.0',
      description:
        'Learned visualization principles from perception to evaluation. Team project visualized sustainability performance of fast-fashion brands using multiple chart strategies.',
      links: [{ label: 'Project Website', href: 'https://superfashion.walzen.org/', external: true }]
    },
    {
      id: 'mqlm',
      title: 'Advanced HCI Qualitative Research Methods',
      grade: '7.8',
      description:
        'Conducted a full qualitative study on user perceptions of smart-home cameras, from data collection to analysis and implication synthesis.',
      links: [{ label: 'Final Paper (PDF)', href: '/masters/Group_30_Final_Paper.pdf' }]
    },
    {
      id: 'miti',
      title: 'Interaction Technology Innovation',
      grade: '8.3',
      description:
        'Designed and built a tangible interactive system for social connection, covering interaction concept, 3D modeling, electronics, and IoT firmware.',
      links: [{ label: 'Related Project Section', href: '/graduation-thesis#snow-globe', localized: true }]
    },
    {
      id: 'mmmi',
      title: 'Multimodal Interaction',
      grade: '8.0',
      description:
        'Ran a two-phase study in XR: elicitation with Wizard of Oz and implementation/evaluation of gesture techniques for distant 2D GUI interaction.',
      links: [{ label: 'Related Project Section', href: '/graduation-thesis#multimodal-interaction', localized: true }]
    },
    {
      id: 'mqnm',
      title: 'Advanced HCI Quantitative Research Methods',
      grade: '9.4',
      description:
        'Applied quantitative analysis methods to K-EmoPhone dataset and examined relationships between personality traits and physiological stress indicators.',
      links: [{ label: 'Final Paper (PDF)', href: '/masters/infomqnm-report.pdf' }]
    },
    {
      id: 'mmob',
      title: 'Mobile Interaction',
      grade: '7.9',
      description:
        'Investigated mobile and wearable interaction design through literature and demos, with emphasis on context, hardware constraints, and human factors.'
    },
    {
      id: 'mdm',
      title: 'Data Mining',
      grade: '8.5',
      description:
        'Learned PAC learning basics and key machine-learning algorithms, then practiced model selection and comparative experiments.',
      links: [
        { label: 'Assignment 1 (ZIP)', href: '/masters/DM-A1-Yangfan-Yilun-Reem.zip' },
        { label: 'Assignment 2 (PDF)', href: '/masters/INFOMDM2024-A2-Yangfan-Yilun-Reem.pdf' }
      ]
    },
    {
      id: 'mcm',
      title: 'Cognitive Modeling',
      grade: '8.3',
      description:
        'Built and evaluated symbolic, connectionist, and probabilistic cognitive models through structured assignments.'
    },
    {
      id: 'thesis',
      title: 'Research Project (Graduation Thesis)',
      grade: '8.7',
      description:
        'Thesis project ZoomPursuit addressed gaze interaction drift and inaccuracy for general-purpose GUIs with a calibration-free smooth pursuit approach.',
      links: [{ label: 'Thesis and Project Page', href: '/graduation-thesis#zoompursuit', localized: true }]
    }
  ]
};

export default mastersCoursesEn;
