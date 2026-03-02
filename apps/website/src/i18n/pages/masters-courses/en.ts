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
  showMediaLabel: 'Expand Full Content',
  hideMediaLabel: 'Collapse',
  closeViewerLabel: 'Close',
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
        `Cognitive and social psychology are used here as explanatory frameworks for human-computer interaction, with a focus on converting psychological mechanisms into defensible design reasoning.

- Self and identity in digital settings: online self-presentation, symbolic interaction, and social information processing.
- Relationship formation and maintenance: uncertainty reduction, expectancy violations, social exchange, and social penetration.
- Emotion and motivation: basic emotion theories, constructed emotion perspectives, appraisal mechanisms, and Yerkes-Dodson style performance relations.
- Social influence and persuasion: informational vs normative influence, conformity/compliance mechanisms, and persuasive technology.
- Group and decision processes: groupthink, social identity effects, cognitive dissonance, and heuristic bias.

Practice work combines literature synthesis, interactive teaching design, and research proposal writing from conceptual framing to methodological justification.`
    },
    {
      id: 'mlhvl',
      title: 'Machine Learning for Human Vision and Language',
      grade: '8.3',
      description:
        `Deep learning is treated as a unified framework across vision and language, with explicit links to cognitive science and neuroscience questions.

- Foundations: representation learning, training dynamics, loss design, optimization, and generalization.
- Vision track: core convolutional mechanisms (filter/convolution, ReLU, pooling, normalization), hierarchical feature formation from low-level structure to high-level semantics, and comparisons between feedforward/recurrent processing in artificial and biological vision systems.
- NLP track: lexical and distributional semantics; vector-space methods and word representations (count-based, predict-based, GloVe, Skip-gram with negative sampling); semantic evaluation (similarity vs relatedness); sequence modeling with RNN/LSTM/GRU; sequence labeling such as POS tagging; encoder-decoder (seq2seq) modeling.
- Cross-disciplinary component: language representations are discussed against brain-imaging-oriented modeling literature to compare explanatory strengths and limits.

Practice includes both vision and language lab work: image-recognition modeling with training/generalization analysis, and NLP implementation work centered on word-vector methods and recurrent sequence models, both documented through analytical reports.`
    },
    {
      id: 'mvis',
      title: 'Information Visualization',
      grade: '9.0',
      description:
        `Information visualization is treated as a task-oriented analytical method: visual representations are designed to help people perform analysis more effectively, not just to produce polished charts.

- Cognition/perception foundation: external visual representations are used to offload internal cognition (replace cognition with perception), leveraging high-bandwidth, parallel, and pre-attentive properties of human vision.
- Information fidelity: statistical summaries alone can hide structure; examples such as Anscombe's Quartet are used to show why distributional detail and outlier patterns must remain visible.
- Resource constraints: design decisions balance computational limits, display limits (pixel density and whitespace trade-offs), and human limits (time, memory, attention).
- Design analysis framework: Munzner's Nested Model (Domain, Abstraction, Idiom, Algorithm) structures the full reasoning chain from user/task context to visual idiom and efficient implementation.
- Abstraction workflow: domain questions are translated into data and task abstractions, with task actions such as Present, Locate, and Identify guiding encoding and interaction choices.
- Perceptual design rules: channel effectiveness/discriminability, pre-attentive features, and Gestalt principles are covered as technical criteria for critiquing visualization quality.
- Implementation and interaction: D3.js-based practice spans DOM/SVG/CSS coordination, enter/update/exit joins, scales/axes, transitions, layouts, and coordinated multi-view interaction.
- Geovisualization: GeoJSON/TopoJSON processing, projections, choropleth mapping, panning, and zooming workflows.

Practice combines progressive coding assignments and a final interactive project, with emphasis on consistency between theoretical rationale and implementation choices.`,
      links: [{ label: 'Project link (website)', href: 'https://superfashion.walzen.org/', external: true }]
    },
    {
      id: 'mqlm',
      title: 'Advanced HCI Qualitative Research Methods',
      grade: '7.8',
      description:
        `Advanced qualitative inquiry in HCI is treated as a rigorous approach for understanding situated experience, meaning-making, and socio-cultural dimensions of technology use.

- Epistemic positions: interpretivist and positivist assumptions and their implications for claims and evidence.
- Data collection: semi-structured and narrative interviewing, focus groups, contextual inquiry, ethnographic observation, diary studies, and cultural probes.
- Analysis: coding workflows, theme development, conceptual consolidation, and evidence organization.
- Research rigor: credibility and consistency controls, reflexivity, and bias management.
- Ethics: informed consent, privacy boundaries, and responsibilities in sensitive settings.

Practice follows a full qualitative pipeline from study design to data collection, analysis, and paper-style reporting.`,
      links: [{ label: 'Paper link (PDF)', href: '/Group_30_Final_Paper.pdf' }]
    },
    {
      id: 'miti',
      title: 'Interaction Technology Innovation',
      grade: '8.3',
      description:
        `A rapid, iterative innovation workflow connects research insight to deployable tangible/digital prototypes; under the Enchanted Everyday Objects theme, the course project converges on a snow-globe system for low-intrusion long-distance connectedness.

- Research and synthesis: design research planning, concept mapping, and structured insight synthesis.
- Translation into design: scenarios, storyboards, wireframes, and journey articulation, including decomposition of connectedness into ambient awareness, signaling, and lightweight communication.
- Prototyping progression: low- to high-fidelity iterations with staged validation, including concept pivots based on instructor/user feedback.
- Technical integration: sensors, microcontroller-based interaction, digital fabrication, and tangible interface construction, including rotational mechanism and airflow-channel implementation.
- Evaluation and ethics: modality selection, interaction assessment strategies, and privacy/ethics constraints.

Practice follows a research-synthesis-prototype-reflection loop, with deliverables including a functional prototype and a reflective diary documenting material, mechanism, and interaction trade-offs.`,
      practice:
        `The practical brief was Enchanted Everyday Objects. Within that frame, our team focused on sustained co-presence in long-distance relationships and designed a tangible object that can communicate connection cues with low interaction burden.

In concept exploration, we compared a lamp-based direction with a snow-globe direction. The design gradually converged on three requirements: cues should remain continuously perceivable, actions should stay lightweight, and feedback should support emotional expression. These constraints led to the final snow-globe form and interaction structure.

The final prototype includes four core interactions:
- Ambient sensing: a top light strip reflects the partner's environmental light;
- Voice message: press to record, then twist the top to play with linked mechanical feedback;
- Weather cue: an independent indicator reports weather at the partner's location;
- Magic signal: shaking one globe triggers a snowstorm effect on the other side.

Implementation covered Fusion 360 structural modeling, 3D printing, airflow and rotational mechanism design, embedded control and circuit integration, and full assembly/debugging. The final delivery was a high-fidelity working prototype plus complete project documentation.`,
      links: [{ label: 'Reflective diary (PDF)', href: '/Reflective_Diary_Yangfan.pdf' }],
      media: [
        {
          type: 'image',
          src: '/snow-ball/snow-globe-final-product.jpg',
          alt: 'Final snow globe prototype',
          caption: 'Final prototype with rotational and snowstorm effects.'
        },
        {
          type: 'image',
          src: '/snow-ball/snow-globe-mechanism-bottom-view.jpg',
          alt: 'Bottom view of mechanism',
          caption: 'Bottom mechanism with ratchet feedback and reset rotation.'
        },
        {
          type: 'image',
          src: '/snow-ball/snow-globe-cad-model.png',
          alt: 'CAD cross-section of snow globe',
          caption: 'Fusion 360 structural design and internal layout.'
        },
        {
          type: 'image',
          src: '/snow-ball/snow-globe-core-assembly.jpg',
          alt: 'Core assembly close-up',
          caption: 'Integrated motor, gear, fan, and electronics assembly.'
        },
        {
          type: 'image',
          src: '/snow-ball/snow-globe-top-component.jpg',
          alt: 'Top functional component',
          caption: 'Top module for diffusion light, sensing, and airflow.'
        }
      ]
    },
    {
      id: 'mmmi',
      title: 'Multimodal Interaction',
      grade: '8.0',
      description:
        `Multimodal interaction is developed from perceptual foundations before applied 3D interface design for VR/AR/MR; the course project focuses on distant 2D screen interaction beyond arm's reach.

- Sensory channels: vision, audition, vestibular sense, proprioception, and touch in coordinated task performance.
- Cross-channel integration: how alignment or conflict between channels shapes orientation, control, cognitive load, and cybersickness risk.
- 3D interaction structure: selection, manipulation, and navigation as a linked design chain.
- Technique families: direct, ray-based, indirect, and hybrid paradigms (e.g., Virtual Hand, Go-Go, Ray Casting, WIM, HOMER).
- Hardware trade-offs: precision, fatigue, learning cost, and reachability differences across head tracking, controllers, and hand-tracking input.

Practice follows a four-stage pipeline: Wizard of Oz elicitation, implementation of tap/pinch gestures, and comparative evaluation against default ray-casting; results indicate strong effects of object size, feedback quality, and prior interaction habits, with fatigue, intuitiveness, and feedback uncertainty as dominant evaluation themes.`,
      practice:
        `The project started from a concrete observation: default ray-casting is workable for distant 2D tasks in VR, but stability in precision, feedback continuity, and operation load varies by task and user. So we did not lock in a gesture first; we began with elicitation and only then moved to implementation and evaluation.

Participants had no prior VR gesture experience. Tasks covered click, swipe, zoom, scroll, and screen repositioning. Stage 1 used Wizard of Oz to collect preferred and alternative gestures and participants' reasons. Stage 2 implemented tap and pinch gestures in Unity and compared them against default ray-casting in think-aloud sessions. The full analysis process is documented in the project paper (8 participants in elicitation, 4 in evaluation).

Findings show gesture preference is strongly shaped by object size, feedback quality, and prior interaction habits. Point-and-pinch patterns were frequent, but users still needed a range from small to large movements for the same task. Main issues in evaluation were fatigue, intuitiveness, and feedback uncertainty; weak feedback directly increased repeated clicks and misjudgment. The final prototype used eye-midpoint plus hand projection for distant targeting, with wrist compensation and decision logic to reduce ambiguity and drift.`,
      links: [{ label: 'Research paper (PDF)', href: '/INFOMMMI_Super_VR_Power_paper.pdf' }],
      media: [
        {
          type: 'video',
          src: '/infommmi-demo-part-1.mp4',
          alt: 'Wizard of Oz elicitation video',
          caption: 'Video 1: Wizard of Oz elicitation session for natural gesture discovery.'
        },
        {
          type: 'video',
          src: '/infommmi-demo.mp4',
          alt: 'Comparative gesture evaluation video',
          caption: 'Video 2: Comparative study of default ray-casting and implemented gestures.'
        }
      ]
    },
    {
      id: 'mqnm',
      title: 'Advanced HCI Quantitative Research Methods',
      grade: '9.4',
      description:
        `Quantitative HCI research is framed around consistency between research questions, experimental design, model choice, and interpretation, rather than tool-centric statistics.

- Variance analysis family: one-way/factorial ANOVA and repeated-measures ANOVA.
- Regression and association: linear modeling for explanatory and predictive use.
- Advanced models: ANCOVA, MANOVA, and their relations within a GLM perspective.
- Inference logic: statistical power, null-hypothesis testing, Type I/II error trade-offs, effect sizes, and confidence intervals.
- Robustness handling: outlier logic, normality and variance checks, and non-parametric alternatives under violated assumptions.

Practice tasks involve multivariable modeling, hypothesis testing, and interpretation in settings with multiple independent and dependent variables.`,
      links: [{ label: 'Paper link (PDF)', href: '/infomqnm-report.pdf' }]
    },
    {
      id: 'mmob',
      title: 'Mobile Interaction',
      grade: '7.9',
      description:
        `Mobile interaction is analyzed through the joint constraints of device capability, perceptual feedback, and real-world context.

- Platform limits: CPU/GPU, memory, energy, and network constraints as design boundary conditions.
- Display and perception: resolution, density, and visual quality criteria in practical interface decisions.
- Interaction paradigms: advanced touch, multi-touch, tilt/pose input, mobile 3D/VR, and mobile AR.
- Human factors in context: grip burden, divided attention, situational interference, and timing/feedback design.

Readings and case analysis are used to compare feasibility, usability, and contextual fit across mobile interaction strategies.`
    },
    {
      id: 'mdm',
      title: 'Data Mining',
      grade: '8.5',
      description:
        `Data mining is taught as an end-to-end methodology for extracting interpretable patterns and predictive structure from large datasets.

- Reasoning boundaries: deduction vs induction, experimental vs observational data, and correlation vs causation.
- Trees and ensembles: decision-tree construction with impurity/error criteria and ensemble extensions such as bagging and random forests.
- Probabilistic graphical models: dependency structure and uncertainty representation via models such as Bayesian and Markov-style formulations.
- Pattern discovery: support/confidence-oriented association mining.
- Text mining: representation and classification workflows for unstructured text.

Practice emphasizes implementation and validation workflows in Python/R across tree-based and text-focused tasks.`,
      links: [
        { label: 'Assignment 1 (ZIP)', href: '/DM-A1-Yangfan-Yilun-Reem.zip' },
        { label: 'Assignment 2 (PDF)', href: '/INFOMDM2024-A2-Yangfan-Yilun-Reem.pdf' }
      ]
    },
    {
      id: 'mcm',
      title: 'Cognitive Modeling',
      grade: '8.3',
      description:
        `Cognitive theories are formalized into computational models to explain and predict behavior, with explicit comparison across major modeling paradigms.

- Symbolic/process models: attention, memory, learning, and task-timing mechanisms.
- Connectionist models: neural representational learning linked to behavioral and brain-related patterns.
- Probabilistic/Bayesian models: uncertainty-aware inference for language, communication, and interpretation.
- Cross-paradigm comparison: interpretability, fit capacity, computational cost, and scope boundaries.

Practice combines model implementation, paper-based analysis, and reproduction-style exercises in R/Python.`
    },
    {
      id: 'thesis',
      title: 'Research Project (Graduation Thesis)',
      grade: '8.7',
      description:
        `The thesis addresses gaze-interaction inaccuracy and calibration drift in standard GUIs, targeting a solution that works without modifying existing applications.

- Method: ZoomPursuit, a smooth-pursuit interaction approach that reuses system-level magnification behavior.
- Implementation: interaction mechanism design plus trajectory-matching prototype logic.
- Empirical validation: two iterative studies comparing automated correction, manual refinement, and combined strategies under drift conditions.
- Final model: a two-stage interaction strategy integrating automatic correction with manual refinement.

Dynamic calibration from an uncalibrated starting state reaches approximately 0.10° final pointing error, supporting transfer of smooth-pursuit interaction toward general desktop GUI usage.`,
      links: [{ label: 'View project page', href: '/graduation-thesis', localized: true }]
    }
  ]
};

export default mastersCoursesEn;
