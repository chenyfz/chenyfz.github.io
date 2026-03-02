## 5. Information Visualization
**Focus:** Theoretical principles of data visualization combined with practical web-based implementation (predominantly using D3.js). The course emphasizes augmenting human cognition through external visual representations.

### Core Objectives & Learning Outcomes
- Understand *why* we visualize data: replacing cognition with perception, bandwidth of the human visual system, and avoiding information loss inherent in pure statistical summaries (e.g., Anscombe's Quartet).
- Critically analyze vis design space using Tamara Munzner’s Nested Model (Domain, Abstraction, Idiom, Algorithm).
- Implement interactive, web-based data visualizations from scratch.
- Address computational, display (pixel density), and human limitations (memory, attention).

### Key Topics & Technologies Covered
- **Data & Task Abstraction:** Translating domain-specific questions into visual design actions (Present, Locate, Identify) and targets (Trends, Outliers, Topology).
- **Visualization Idioms:** Visual encodings, interaction design (how to manipulate), SpaceTree vs. TreeJuxtaposer.
- **D3.js Deep Dive:** 
  - Working with DOM elements, SVG, and CSS.
  - Data binding (`enter()`, `update()`, `exit()`), building scales (linear, square root, ordinal, time-based), and mapping data to pixel spaces.
  - Interactive transitions, object constancy, animations (ease, delay, duration).
  - Specialized layouts: Pie, Stack, Force-directed graphs, and Area charts.
- **Geomapping:** Handling TopoJSON/GeoJSON, map projections, choropleth maps, panning, and zooming.

### Detailed Assessment Structure
1. **D3.js Programming Assignments:** Hand-coding visualizations step-by-step from raw JSON/CSV datasets, deploying interactive visual features.
2. **Final Interactive Visualization Project:** Building a complex, multi-view dashboard using D3.js, demonstrating mastery of visual encoding idioms, dynamic filtering, and interactive transitions.
3. **Written Exam:** Assesses theoretical knowledge of perception principles, task abstractions, and the logic of effective visual representations.

---

## 6. Interaction Technology Innovation (INFOMITI)
**Focus:** A practical, fast-paced crash course in end-to-end Interaction Design (IxD), culminating in physical/digital embedded system prototypes. It emphasizes design synthesis over industrial design or software engineering.

### Core Objectives & Learning Outcomes
- Conduct user research and elicit deep user needs.
- Practice rapid iteration, informed design decision-making, and teamwork.
- Master tools and techniques for functional prototyping (Low-Fi to High-Fi).
- Bridge the gap between tangible/embodied interaction and digital systems.

### Key Topics Covered
- **User Research & Ideation:** Concept mapping, creating design research plans, generating "insight patterns" through design synthesis methods.
- **Design Translation:** User scenarios, UI storyboards, wireframing, and customer journey maps.
- **Prototyping Modalities:** Hardware prototyping (Arduino/sensors), digital fabrication, mobile interaction, and tangible UI.
- **Evaluation & Ethics:** Sensor modalities, evaluation strategies, handling user privacy, and ethics in design.

### Detailed Assessment Structure
The course acts as an iterative studio project with formative and summative milestones:
1. **Design Synthesis & Concept Map (Assignment 1):** Submitting a complete design research plan, a concept bubble diagram, and a color-coded AC4D insight combination list.
2. **Iterative Prototyping:**
   - **Wireframes/Scenarios:** Mapping out the logic.
   - **Low-Fi Prototype:** Cardboard/paper prototyping for initial physical testing.
   - **High-Fi Prototype:** Final deliverable integrating real sensors, microcontrollers, and physical fabrication (e.g., an interactive device like "Echoic" memory playback system).
3. **Reflective Diary:** Individual assessment logging personal learning, teamwork challenges, and design decisions throughout the project.
4. **Academic Paper:** A structured paper outlining the prototype, the human-centered methodology applied, and evaluation results.

---

## 7. Multimodal Interaction (INFOMMMI)
**Focus:** Exploring next-generation 3D User Interfaces (3DUIs), specifically focusing on Virtual Reality (VR), Augmented/Mixed Reality (AR/MR), and spatial computing environments. 

### Core Objectives & Learning Outcomes
- Design intuitive selection, manipulation, and spatial navigation interfaces for 3D environments.
- Counteract critical VR physical issues like motion sickness and spatial disorientation.
- Implement specialized interacion metaphors depending on task distance, scale, and degrees-of-freedom.

### Key Topics & Theories Covered
- **3D Selection & Manipulation Metaphors:**
  - *Grasping:* Simple Virtual Hand, Go-Go Interaction, Rigid/Soft-Body fingers, 3D bubble cursor, PRISM.
  - *Pointing:* Ray Casting, Fishing Reel, Flashlight, Aperture Selection, Depth Rays.
  - *Indirect & Hybrid:* World in Miniature (WIM), Voodoo Dolls, Virtual Pad, Scale-World Grab, HOMER (Hand-Centered Object Manipulation Extending Ray-Casting).
  - *Bimanual:* Spindle, Flexible pointer.
- **Spatial Navigation:** Wayfinding in complex digital spaces, locomotion techniques (teleportation vs. continuous movement).
- **Physical Ergonomics:** Hardware differences (HMDs, full-body tracking systems versus hand-operated controllers), tackling vestibular disconnects (motion sickness).

### Detailed Assessment Structure
1. **VR Implementation Project:** A semester-long project building a functional VR/AR application using advanced 3DUI metaphors to solve a specific spatial task or game objective.
2. **Project Logbook / Demo:** Documenting the development process, iterative playtesting, and design changes.

---

## 8. Advance Quantitative Research Methods (INFOMQNM)
**Focus:** The rigorous mathematical underpinning and application of advanced statistical models used to validate Human-Computer Interaction experiments, bridging the gap between SPSS "recipes" and raw statistical theory.

### Core Objectives & Learning Outcomes
- Differentiate between and properly apply univariate analysis (t-test/ANOVA) vs. multivariate analysis (MANOVA).
- Design complex experimental setups (Randomized Block Designs, Repeated Measures).
- Deal with covariates and overlapping variance between independent variables.
- Understand the deep math behind statistical power, Null Hypothesis Significance Testing (NHST), and Type I / Type II errors.

### Key Topics Covered
- **Analysis of Variance (ANOVA):** One-way ANOVA, N-way Factorial ANOVA, Within-Subjects (Repeated Measures) ANOVA. Understanding Sums of Squares (Between-group vs. Within-group variation) and the F-Test.
- **Regression & Correlation:** Pearson’s correlation, Linear regression, Logistic regression (for categorical prediction).
- **Advanced Models:**
  - **ANCOVA:** Analysis of Covariance – adjusting dependent variables for continuous covariates to reduce error variance.
  - **MANOVA:** Multivariate Analysis of Variance – handling experiments with *multiple* dependent variables simultaneously to avoid inflated Type I error risks.
  - **GLM (General Linear Model):** The mathematical foundation linking ANOVA and regression.
- **Data Treatment:** Handling outliers (keep/exclude logic), assumption checking (Shapiro-Wilk for normality, Levene/Brown-Forsythe for homogeneity of variance), and non-parametric alternatives (Kruskal-Wallis, Wilcoxon).

### Detailed Assessment Structure
1. **Statistical Assignments / Labs:** Applying formulas from the course, running analyses in R or SPSS, executing post-hoc corrections (Bonferroni, Holm), and explaining statistical significance vs. effect size ($\eta^2$).
2. **Written Exam (3-hour):** Theoretical test comprising both mathematical derivations and situational logic questions. E.g., interpreting Confidence Intervals, deciding when to keep vs. drop an outlier based on sensor failure vs. natural variation, differentiating requirements for Chi-Square ($\chi^2$) tests, and recognizing correct application fields for factorial ANOVA versus ANCOVA.
