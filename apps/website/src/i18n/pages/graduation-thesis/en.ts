import type { GraduationThesisPageCopy } from './types';

const graduationThesisEn: GraduationThesisPageCopy = {
  meta: {
    title: 'MSc Thesis and Course Projects | Chen Yangfan',
    description: 'ZoomPursuit thesis and selected MSc course projects.'
  },
  heading: 'ZoomPursuit: Smooth Pursuit-based Gaze Interaction for General-Purpose GUIs',
  projectInfo: {
    type: "Master's Graduation Thesis (Utrecht University)",
    duration: "Feb 2025 - Aug 2025",
    supervisor: "Lynda Hardman",
    supervisorLabel: "Supervisor: "
  },
  abstractTitle: 'Abstract',
  abstractParagraphs: [
    'Gaze interaction in general-purpose GUIs is limited by its inaccuracy and calibration requirements. Smooth pursuit-based methods offer a calibration-free alternative but often demand modified user interfaces. We present ZoomPursuit, a technique that adapts smooth pursuit for unmodified GUIs by repurposing system-level magnification functionality.',
    'A baseline evaluation (N=16) established that under simulated calibration drift, ZoomPursuit achieved the accuracy of a manual refinement method with the speed of a simpler automated zoom-based technique. However, the study also revealed a conflict between its imperceptible automation and users\' sense of control. A follow-up study (N=7) resolved this with a two-stage model integrating automated correction with manual refinement. This design achieved a final pointing accuracy of 0.10° while dynamically calibrating on the fly from an uncalibrated state.',
    'This work details the design evolution of a pursuit-based interaction technique for general GUIs. The final design demonstrates a model that is both technically effective and preserves user agency.'
  ],
  narrativeTitle: 'Defense Slides Narrative',
  narrativeSections: [
    {
      id: 'slide-0-teaser',
      kicker: 'Preview',
      title: 'Gaze Tracking Auto-correction Interaction',
      lead: 'If users keep looking at the target before and after zoom, the system removes most gaze offset during zoom; a gesture refine step then finalizes precision.',
      points: [
        'In every trial shown in the video, the target is the letter o.',
        'The black circle is measured gaze; initial mismatch comes from eye-tracking inaccuracy and drift.',
        'After zoom starts, ZoomPursuit removes most offset in stage 1 automatically, which is the key technical contribution of this work.',
        'With continued use, dynamic calibration reduces residual offset further, and stage 2 gesture refine confirms the final target.'
      ],
      media: [
        { type: 'video', src: '/thesis/0303.mp4', alt: 'ZoomPursuit teaser demonstration video', caption: 'Demo video: each trial targets the letter o; the black circle indicates the system-estimated gaze position.' }
      ]
    },
    {
      id: 'slide-1-background-gap',
      kicker: 'Problem Framing',
      title: 'Opportunity and Gap: Smooth Pursuit Is Not Yet General-GUI Ready',
      lead: 'This family of methods is robust to drift and can reduce calibration burden, but it is still hard to apply directly to unmodified general GUIs.',
      points: [
        'Known strengths: calibration-free operation, drift robustness, and dynamic calibration potential.',
        'Main gap: most methods rely on interface-level motion injection, so unmodified GUIs remain hard to support.',
        'Research question: keep these strengths while enabling arbitrary general GUIs.'
      ],
      media: [
        { type: 'image', src: '/thesis/figures/related-work-pursuit-methods.png', alt: 'Smooth pursuit principle diagram', caption: 'Figure 1: Smooth pursuit in brief—users track a moving target and the system selects by trajectory matching.' }
      ]
    },
    {
      id: 'slide-2-mechanism',
      kicker: 'Method Core',
      title: 'ZoomPursuit: Use System Zoom to Generate Pursuit Stimuli',
      lead: 'Zoom creates unique pixel-wise motion vectors around the zoom center, which allows estimation of target offset and computation of a correction vector.',
      points: [
        'The diagrams show corresponding states before zoom (1×) and after zoom (2×).',
        'Under the same zoom center, different pixels produce different displacement vectors (both direction and magnitude).',
        'The system uses these unique vector signatures to match gaze trajectory and estimate offset.',
        'It runs on system-level zoom APIs without GUI modification; for derivation details, see the MSc Thesis (Section 3).'
      ],
      media: [
        { type: 'image', src: '/thesis/figures/mechanism-before.png', alt: 'Mechanism before zoom at 1x', caption: 'Before zoom (1×): relative positions are measured from the zoom center.' },
        { type: 'image', src: '/thesis/figures/mechanism-after.png', alt: 'Mechanism after zoom at 2x', caption: 'After zoom (2×): each screen point has a unique feature vector (displacement and direction).' }
      ]
    },
    {
      id: 'slide-3-two-stage-workflow',
      kicker: 'Interaction Design',
      title: 'Two-stage Workflow: Automatic Correction + Gesture Refinement',
      lead: 'Stage 1 rapidly removes large offset, and stage 2 provides controlled fine adjustment to preserve user agency.',
      points: [
        'Stage 1 (automatic correction): estimate a correction vector during zoom to remove most offset.',
        'Stage 2 (gesture refine): user takes over and confirms the final target location.',
        'Usage rule: small offset can stop at stage 1; large offset proceeds to stage 2.'
      ],
      media: [
        { type: 'image', src: '/thesis/figures/zoom-pursuit-with-gaze&pinch.png', alt: 'Two-stage Gaze + Pinch workflow', caption: 'Two-stage interaction flow: automatic correction first, gesture refinement second.' }
      ]
    },
    {
      id: 'slide-4-evidence',
      kicker: 'Empirical Evidence',
      title: 'Study 1 + Study 2: Consolidated Evidence on Speed, Accuracy, and Control',
      lead: 'This section consolidates the key empirical findings from Study 1 and Study 2.',
      points: [
        'Study 1 (design): under simulated 1° and 3° error conditions (mild vs severe offset), we compared ZoomPursuit against two baselines.',
        'The two baselines represent two common strategies: static center magnification with target reacquisition, and directional panning via a gaze-driven pad.',
        'Study 1 results: under the simulated 3° condition, ZoomPursuit achieved higher accuracy and faster completion time.',
        'Study 2 results: stage 1 removed 62% initial error; two-stage precision reached 1.47° -> 0.56° -> 0.10°; calibration error dropped 1.89° -> 0.84° after 20 interactions.',
        'If you want full protocol, statistics, and significance analysis, please see the empirical studies section in the thesis.'
      ],
      media: [
        { type: 'image', src: '/thesis/figures/study-1-target-and-methods.png', alt: 'Study 1 design overview', caption: 'Figure caption: task and method flow by phase. Phase 1 fixate target; Phase 2 press key for 2× zoom; Phase 3 differs by method—(a) ZoomPursuit estimates and applies correction from smooth pursuit, (b) ZoomCenter shows static center zoom for reacquisition, (c) ZoomDPad shows directional pad for gaze-controlled panning; Phase 4 release key to confirm. For ZoomPursuit and ZoomCenter, holding the key >3s triggers an additional 2×->4× zoom and repeats Phase 2-3.' }
      ]
    },
    {
      id: 'slide-7-conclusion',
      kicker: 'Conclusion',
      title: 'Conclusion: A Two-stage Correction Strategy for General GUIs',
      lead: 'Key takeaway: use stage 1 for mild offset, and move to stage 2 for larger offset.',
      points: [
        'Stage 1 (automatic correction): remove most offset during zoom.',
        'Mild drift: stage 1 is usually sufficient.',
        'Large offset: stage 2 gesture refinement is more reliable.'
      ],
      media: [
        { type: 'image', src: '/thesis/figures/teaser-figure.png', alt: 'ZoomPursuit overview and stage-based usage summary', caption: 'Summary diagram: switch between stage 1 and stage 2 according to offset magnitude in general GUI interaction.' }
      ]
    }
  ],
  reflectionsTitle: 'Some Thoughts',
  reflectionsParagraphs: [
    'Note: I wrote this in Chinese and had Gemini translate it into English. A human (me :p) has proofread it.',
    'My thesis project began with my supervisor\'s [DatAR](https://www.projects.science.uu.nl/ics-datar/) project, which helps neuroscientists discover research opportunities by visualizing data from literature on brain regions and diseases. I joined the project for a simple reason: I wanted to work with the HoloLens 2 for my graduation project. Released in 2019, the headset impressed me, sparking many ideas for mixed-reality interactions that I had imagined over the years and could finally implement.',
    'My initial idea was to extend DatAR from a standalone AR system into a cross-device, cross-reality system. Since the DatAR system and the HoloLens 2 ecosystem were not yet mature, they couldn\'t provide the sophisticated workflows neuroscientists were accustomed to on desktops. Traditional keyboard and mouse were still better for text processing and precision tasks. Therefore, integrating AR into the existing workflow as an extension seemed an effective way to improve productivity. In this concept, gaze was the key: it would naturally indicate the user\'s focus, allowing the system to coordinate input switching between hand gestures in AR and keyboard/mouse on the desktop. The goal was to leverage each device\'s strengths for suitable tasks, creating a seamless exchange of information between them.',
    'However, my supervisor, Lynda, pointed out that this approach resembled an engineering project, where I would spend most of my time refactoring the DatAR codebase. She encouraged me to step outside the DatAR context and explore other topics. So, I returned to reading literature broadly for new ideas—a process I enjoy.',
    'My next idea addressed a key design challenge in DatAR: selection under heavy occlusion. To select a target from a dense, overlapping cluster of virtual objects, users had to reach in and \'pinch\' it. The problem was that the HoloLens 2\'s hand-depth estimation was often unreliable. It would frequently misjudge the Z-order of the real hand and virtual objects, resulting in rendering that contradicted the user\'s perception. The confusing visuals and lack of tactile feedback made depth perception difficult, and thus, simple selections became time-consuming and frustrating. My literature review showed that virtually all existing solutions still relied on the classic paradigm of physical controllers. Yet, new devices increasingly supported controller-free gesture and gaze input. Having read extensively on Gaze Interaction, I was interested in the field and wanted to design a highly usable selection method for occluded environments by combining eye and hand input.',
    'I thought of a two-step selection technique: a user first gazes at a target, triggers a perspective shift (e.g., object rotation or camera orbit), and then gazes at it again. The intersection of the two gaze cones would significantly reduce potential targets, allowing for fine-grained selection by hand gesture from a much smaller set of potential targets. After some initial thought, however, I realized this method offered no clear advantage over existing techniques (like using two controllers to cast intersecting rays) and was unsuitable for XR scenarios with real-world objects, as it required object rotation. I continued surveying the literature, searching for a new direction that would give this approach an advantage in certain contexts.',
    'The breakthrough came from my reading on the Smooth Pursuit method, which cleverly uses the eye\'s natural ability to track moving objects. By comparing an object\'s motion trajectory with the user\'s gaze trajectory, the system can determine the target. This gave me an idea for the occlusion problem: during a perspective shift, the user\'s eye would naturally follow their target. The system could match the pursuit trajectory to the object\'s motion path to identify the selection. In scenarios with moderate occlusion, the interaction becomes direct: trigger a motion, follow the target with your eyes, and the selection is made. It requires no secondary confirmation and is more robust against eye-tracking inaccuracies. I built a 3D demo on the HoloLens 2 to validate the concept, and it worked well. But a practical question still lingered: in what specific scenario would this method have a distinct advantage?',
    'While exploring application scenarios, I began considering 2D interfaces. I reasoned that efficient, user-friendly 2D GUIs would remain a vital part of the future MR experience (a music player, for instance, is unlikely to use a complex 3D interface). I began to consider how Smooth Pursuit could be applied in new ways to 2D GUIs. Since rotation is not a suitable stimulus in 2D, I chose magnification as the motion trigger. After building and testing another demo on the HoloLens 2, I found potential in this \'magnification-triggered smooth pursuit\'. It could reliably select a target from a group without calibration. More importantly, with a slight shift in thinking, I realized that magnification applies motion to *all* pixels on the screen. Trajectory matching could, in theory, apply to any pixel, not just a finite set of known objects. This realization was a turning point. Existing Smooth Pursuit techniques lack universality because they require perceiving and modifying GUI content, a difficult task given the diversity of GUI frameworks and binary-distributed applications. This limitation has largely confined the technology to laboratory settings with custom interfaces. My approach, using magnification as a system-level API to create motion, avoids this problem. Its key feature is its ability to bring the benefits of Smooth Pursuit—calibration-free operation, high robustness to drift, and on-the-fly dynamic calibration—to any GUI, opening new possibilities for accessibility.',
    'Out of personal interest in creating mouse-alternative tools for Windows, I purchased a commercial eye tracker (the Tobii Eye Tracker 5). A technical exploration confirmed my idea was feasible on a standard desktop. My supervisor\'s HoloLens 2 was a shared resource, making long-term development difficult. Moreover, the technique\'s accessibility advantages were more impactful in a desktop context. Therefore, I decided to shift my project\'s focus to the desktop, using an eye tracker instead of an MR headset. I liked the idea that my design might one day benefit the accessibility community.',
    'I then defined the principles of the ZoomPursuit technique, implemented a prototype, and began to explore its potential from an accessibility perspective. However, HCI research in accessibility is challenging, particularly under the timeline and ethical constraints of a Master\'s thesis (participant recruitment, for instance, is a significant hurdle). A superficial study would not be meaningful. Therefore, I decided to frame and validate ZoomPursuit as a novel interaction technique for a general audience. This work ultimately became my Master\'s thesis. Unfortunately, its potential in the accessibility field could not be fully explored.',
    'In 2019, at the suggestion of a professor, Guihuan Feng, I volunteered at the Human-Computer Interaction Summer School at Nanjing University. This gave me the chance to attend many academic talks. The lectures were eye-opening and left a strong impression on me. Hearing Professor Chun Yu present his work on projects like EarTouch, I felt for the first time how interesting research in computer science could be. It was a world where ideas that seem like \'a flash of inspiration\' could be forged into real designs that might change the lives of thousands. As someone who has always followed consumer electronics and often has new ideas, I began to feel the HCI field could be a good fit for me. At the time, however, I had already accepted a job offer from WeChat, and I thought my academic journey was over. But now, with this thesis, I bring my HCI Master\'s program to a close, and once again, I am thinking about what\'s next. Six years ago, could the student attending those lectures have imagined I\'d be here, writing these reflections in bed? And now I find myself contemplating the future: where will I be, and what will I be doing, six years from now?',
    'Thanks for reading!'
  ],
  primaryLinks: [
    { label: 'Download Paper', href: '/thesis/250805-Yangfan-MScThesis-ZoomPursuit-Submission.pdf' },
    { label: 'View Repository on GitHub', href: 'https://github.com/chenyfz/GazeControl', external: true },
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
        { label: 'Thesis PDF', href: '/thesis/250805-Yangfan-MScThesis-ZoomPursuit-Submission.pdf' },
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
