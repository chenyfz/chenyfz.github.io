## 9. Mobile Interaction (INFOMMOB)
**Focus:** A deep dive into the engineering and interaction design specifics of mobile computing devices. It explores the unique constraints of mobile form factors (battery, display, sensing) and the advanced paradigms used to overcome them.

### Core Objectives & Learning Outcomes
- Understand the technical foundations of mobile platforms (CPU/GPU limits, memory constraints, energy vs. processing power tradeoffs).
- Critically evaluate mobile display technologies (resolution, DPI calculations, "Retina" logic, and subjective vs. objective visual qualities).
- Design and evaluate novel mobile interaction techniques beyond simple touch interfaces.

### Key Topics Covered
- **Enabling Technologies:** CPU vs Battery growth, Network capacities, Display physics, and the implications of Moore’s and Kryder's Law in a constrained physical space.
- **Advanced Interaction Modalities:** 
  - Complex Touch & Multitouch
  - Device Gestures and Tilting (Accelerometer/Gyroscope usage)
  - Mobile 3D and Virtual Reality (VR)
  - Mobile Augmented Reality (AR)
- **Mobile Gaming & Human Factors:** Understanding ergonomic constraints, cognitive load during mobile use, and specific mobile gaming paradigms.

### Detailed Assessment Structure
1. **Scientific Project (50%):** A massive, 6-week group project researching a novel mobile interaction problem. Includes building an implementation (e.g., a tilting vs. joystick game interface, environment-aware notifications) and running a rigorous user evaluation. Includes intermediate pitches, peer reviews, and writing a scientific paper.
2. **Written Exam (50%):** A closed-book, on-campus exam testing theoretical knowledge of limits, technologies, and academic literature from the lectures.

---

## 10. Algorithmic Data Analysis
**Focus:** The rigorous mathematical and theoretical foundations of Machine Learning and Data Mining algorithms. It focuses heavily on definitions, theorems, and mathematical proofs rather than applied coding.

### Core Objectives & Learning Outcomes
- Understand the theoretical limits of what can be learned or computed.
- Master probability theory as the fundamental logic of uncertainty in data.
- Develop a deep understanding of information theory, coding schemes, and complexity.

### Key Topics & Theories Covered
- **Probability Theory:** Kolmogorov Axioms, Union Bound, Conditional Probabilities, and an extensive focus on Bayes' Theorem (Bayesian vs. Frequentist logic, Bernoulli's Fallacy).
- **Information & Coding Theory:** 
  - Prefix Codes and Self-delimiting codes.
  - Universal Codes for Integers (Elias $\omega$ Coding, Rissanen).
  - Kraft's Inequality and its mathematical proof linking coding lengths to probability distributions (Shannon-Fano coding).
- **Computability & Complexity:** Turing machines, Prefix Turing machines, and Kolmogorov Complexity (algorithmic information theory).

### Detailed Assessment Structure
The primary assessment is an **Essay-based Exam**. Instead of memorizing formulas, students must demonstrate deep comprehension by explaining complex algorithmic and probabilistic results and theorems in plain language ("with as little math as possible").

---

## 11. Data Mining
**Focus:** Practical and algorithmic techniques for extracting models and patterns from large databases, sitting at the intersection of statistics and computer science.

### Core Objectives & Learning Outcomes
- Differentiate between deductive and inductive reasoning, and experimental vs. observational data (understanding why correlation $\neq$ causality).
- Implement foundational data mining algorithms from scratch in Python or R.
- Evaluate the quality of predictive models using impurity measures and validation techniques.

### Key Topics Covered
- **Decision Trees & Ensembles:** Building Classification Trees from scratch. Understanding node impurity functions (Resubstitution error, Gini-index, Entropy). Progressing to Bagging and Random Forests.
- **Graphical Models:** Undirected graphical models (Markov Random Fields) and Directed graphical models (Bayesian Networks).
- **Frequent Pattern Mining:** Discovering association rules (e.g., Diapers $\rightarrow$ Beer) using Support and Confidence metrics.
- **Text Mining:** Processing unstructured text data for classification (e.g., detecting fake reviews).

### Detailed Assessment Structure
1. **Practical Assignment 1 (30%):** Implementing a custom Classification Tree and Random Forest algorithm from scratch in Python/R to solve a bug prediction dataset.
2. **Practical Assignment 2 (20%):** A Text Mining project focused on predicting whether hotel reviews are genuine or fake.
3. **Digital Exam in Remindo (50%):** Testing theoretical concepts of model building, impurity math, and data mining paradigms.
4. **Homework Sets:** Optional exercises conferring up to 5% bonus on the final grade.

---

## 12. Advanced Graphics (INFOMAGR)
**Focus:** The advanced mathematics and physics of rendering, specifically focusing on Ray Tracing techniques rather than real-time rasterization.

### Core Objectives & Learning Outcomes
- Understand the physical basis of light transport and how to simulate it via backwards ray tracing.
- Analyze algorithmic complexity of rendering and implement structures to radically speed up ray-primitive intersections.

### Key Topics & Technologies Covered
- **Whitted-Style Ray Tracing:** Simulating Direct and Indirect Illumination. Calculating perfect specular reflections and handling Dielectrics (refraction) using Snell's Law and Critical Angles.
- **Acceleration Structures:** 
  - Dealing with algorithmic bottlenecks (e.g., tracing millions of rays against thousands of polygons).
  - Spatial subdivision techniques: Grids, Octrees, kD-Trees, and BSP Trees.
  - **Bounding Volume Hierarchies (BVH):** Constructing object hierarchies to minimize intersection tests (including advanced heuristics like Surface Area Heuristic - SAH).

### Detailed Assessment Structure
1. **Renderer Engineering Assignment:** Integrating an Acceleration Structure (specifically a BVH) into a Ray Tracer. 
   - *Task:* Rendering high-polygon meshes (>10,000 triangles).
   - *Analysis:* Profiling the algorithm by tracking traversal steps and ray-triangle intersection counts across different camera angles and ray distributions (ambient occlusion, shadow rays).

---

## 13. Cognitive Modeling (INFOMCM)
**Focus:** Implementing formal computational models of human cognition and behavior to test psychological theories and build intelligent user-adaptive systems (AI).

### Core Objectives & Learning Outcomes
- Implement cognitive mechanisms as functional computer simulations using R or Python.
- Survey and evaluate the broad spectrum of modeling paradigms used in neuroscience and psychology.
- Critically dissect and present scientific modeling literature.

### Key Topics & Modeling Paradigms Covered
- **Processing Models:** Symbolic architectures representing human cognitive bottlenecks (e.g., ACT-R, SOAR). Used for understanding multitasking, learning, and human-computer timing.
- **Machine Learning Models:** Using biologically inspired ML and Neural Networks to correlate computational representations with human brain activity (Computational Cognitive Neuroscience).
- **Probabilistic & Bayesian Models:** Compositional cognitive models addressing uncertainty, communication, and pragmatics (e.g., Rational Speech Act models).

### Detailed Assessment Structure
1. **Computer Labs (30%):** Practical coding assignments implementing specific cognitive models in Python or R spanning the three paradigms.
2. **Poster Presentation & Scientific Critique (20%):** A mini-conference. Students select a complex, peer-reviewed modeling paper, create a scientific poster, and present it. Conversely, they act as active "discussants" to deeply critique peer posters.
3. **Written Exam (50%):** Theoretical exam covering the mathematical/computational details of the models and the cognitive psychology theories they represent.
