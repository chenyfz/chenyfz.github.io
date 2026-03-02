import type { GraduationThesisPageCopy } from './types';

const graduationThesisEn: GraduationThesisPageCopy = {
  meta: {
    title: 'MSc Thesis and Course Projects | Chen Yangfan',
    description: 'ZoomPursuit thesis and selected MSc course projects.'
  },
  heading: 'ZoomPursuit: Smooth Pursuit-based Gaze Interaction for General-Purpose GUIs',
  projectInfo: "Master's Graduation Thesis (Utrecht University) | Feb 2025 - Aug 2025 | Supervisor: Lynda Hardman",
  abstractTitle: 'Abstract',
  abstractParagraphs: [
    'Gaze interaction in general-purpose GUIs is limited by its inaccuracy and calibration requirements. Smooth pursuit-based methods offer a calibration-free alternative but often demand modified user interfaces. We present ZoomPursuit, a technique that adapts smooth pursuit for unmodified GUIs by repurposing system-level magnification functionality.',
    'A baseline evaluation (N=16) established that under simulated calibration drift, ZoomPursuit achieved the accuracy of a manual refinement method with the speed of a simpler automated zoom-based technique. However, the study also revealed a conflict between its imperceptible automation and users\' sense of control. A follow-up study (N=7) resolved this with a two-stage model integrating automated correction with manual refinement. This design achieved a final pointing accuracy of 0.10 degrees while dynamically calibrating on the fly from an uncalibrated state.',
    'This work details the design evolution of a pursuit-based interaction technique for general GUIs. The final design demonstrates a model that is both technically effective and preserves user agency.'
  ],
  reflectionsTitle: 'Some Thoughts',
  reflectionsParagraphs: [
    'My thesis project began with my supervisor\'s DatAR project, which helps neuroscientists discover research opportunities by visualizing data from literature on brain regions and diseases. I joined the project for a simple reason: I wanted to work with the HoloLens 2 for my graduation project.',
    'My initial idea was to extend DatAR from a standalone AR system into a cross-device, cross-reality system. Traditional keyboard and mouse were still better for text processing and precision tasks, so I wanted to integrate AR into existing desktop workflows and use gaze as the coordination signal across devices.',
    'After broad literature exploration, the key breakthrough came from smooth pursuit. By comparing the target motion trajectory with gaze trajectory, the system can infer intent robustly without classic calibration assumptions.',
    'I then shifted the interaction trigger from 3D perspective shift to 2D magnification. Magnification introduces motion over all pixels, which means pursuit matching can in principle be generalized to unmodified GUI content rather than a finite known object set.',
    'I later validated feasibility on a standard desktop with a consumer eye tracker (Tobii Eye Tracker 5). Given development practicality and accessibility impact, I moved the project focus from HoloLens to desktop and designed ZoomPursuit as a general interaction technique.',
    'Within a Master\'s timeline, accessibility participant recruitment and ethics constraints are hard to fully satisfy. I therefore positioned the thesis around a general-audience interaction technique with rigorous iterative validation while keeping accessibility as a key long-term motivation.',
    'Thanks for reading.'
  ],
  primaryLinks: [
    { label: 'Download Thesis PDF', href: '/masters/250805-Yangfan-MScThesis-ZoomPursuit-Submission.pdf' },
    { label: 'GitHub Repository', href: 'https://github.com/chenyfz/GazeControl', external: true },
    { label: 'Back to MSc Course Overview', href: '/en/masters-courses' }
  ],
  projectsTitle: 'Course Projects',
  projects: [
    {
      id: 'zoompursuit',
      title: 'ZoomPursuit (Graduation Thesis)',
      subtitle: 'Smooth Pursuit-based Gaze Interaction for General-Purpose GUIs',
      summary:
        'Focused on making gaze interaction practical in unmodified desktop interfaces, especially under calibration drift and noisy eye-tracking conditions.',
      bullets: [
        'Research internship at CWI during thesis period.',
        'Designed and evaluated a two-stage interaction model with dynamic calibration effect.'
      ],
      links: [
        { label: 'Thesis PDF', href: '/masters/250805-Yangfan-MScThesis-ZoomPursuit-Submission.pdf' },
        { label: 'Code Repository', href: 'https://github.com/chenyfz/GazeControl', external: true }
      ]
    },
    {
      id: 'snow-globe',
      title: 'The Enchanted Snow Globes',
      subtitle: 'Interaction Technology Innovation Course Project',
      summary:
        'A tangible interaction project designed for remote social connection. The implementation combined interaction design, mechanical structure design, 3D printing, and embedded prototyping.',
      bullets: ['Built an end-to-end prototype with hardware, firmware, and interaction scenario validation.']
    },
    {
      id: 'multimodal-interaction',
      title: 'Natural Gestures for Distant 2D GUI in XR',
      subtitle: 'Multimodal Interaction Course Project',
      summary:
        'Conducted elicitation and comparative qualitative evaluation for gesture techniques in XR when interacting with distant 2D interfaces.',
      bullets: [
        'Wizard of Oz elicitation study.',
        "Implemented selected gestures and compared against Meta's default interaction."
      ]
    }
  ]
};

export default graduationThesisEn;
