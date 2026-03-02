# Detailed HCI Master Courses Overview

## 1. Advanced Cognitive and Social Psychology for HCI (INFOMCSP)
**Focus:** Merging theoretical constructs from cognitive and social psychology with Human-Computer Interaction, particularly exploring human responses to technology and socially acceptable robotics design.

### Core Objectives & Learning Outcomes
- Apply cognitive and social psychology theories to complex HCI problems.
- Evaluate technological applications based on psychological and cognitive constructs.
- Critically review modern research in domains like Human-Robot Interaction (HRI), affective computing, and video games.
- Develop critical thinking to form academic opinions on theoretical principles.
- Hone academic writing skills for full research proposals.

### Key Topics & Theories Covered
- **The Self:** 3 Domains of Self (Higgins), Symbolic Interactionism (Cooley), Self-Development in Cyberspace (Zhao), Social Information Processing Theory.
- **Social Relationships:** Uncertainty Reduction Theory, Expectation Violation Theory, Social Exchange, Social Penetration, Rich-get-Richer vs. Social Compensation hypothesis in online spaces.
- **Cognition, Motivation & Emotion:** Basic Emotion Theory (Ekman), Theory of Constructed Emotion (Barrett), Two-Factor Theory of Emotion, Cognitive Appraisal Theory, Yerkes-Dodson Law.
- **Social Influence:** Informational vs. Normative influence, Six Principles of Compliance (Cialdini), Obedience (Milgram) & Conformity (Asch), Captology, persuasive technology.
- **Group Dynamics:** Groupthink, Social Identity Theory, Collective Identity, Hierarchy of Needs.
- **Decision-Making:** Expectancy-Value Theories, Affect-Infusion Model, Cognitive Dissonance Theory, Heuristics and Biases.
- **Cognitive Theories of Motivation:** Intrinsically motivated approach/avoidance, Self-Determination Theory.

### Detailed Assessment Structure
1. **Interactive Class Session (25%):**
   - Groups of 4-5 students lead a 30-minute session (10 min presentation + 20 min interactive activity).
   - Must synthesize 4 academic papers: a foundation paper, an empirical paper, a recent paper, and a critical paper attacking the foundation.
   - Evaluated on relevance, effective use of outside materials, facilitation of class engagement, and presentation skills style.
2. **Research Proposal (25%):**
   - A feasible 9-month master thesis project proposal (~2000 words).
   - Involves literature review, framing specific SMART research questions, clear methodological setup, and implications.
   - Evaluated on problem statement, theoretical framework flow, and methodological feasibility.
3. **Written Exam (50%):**
   - 2-hour exhaustive exam consisting mostly of multiple choice, with open questions, and applying psychological theories to realistic scenarios.
   - "Scenario Questions": Example scenario measuring application of specific theories (e.g., Theory of Constructed Emotions vs. Obedience in a group setting) to explain user or human behavior.

---

## 2. ML for Human Vision and Language
**Focus:** Deep learning applications spanning from foundational neural networks to advanced architectures capable of understanding and generating human-like vision (images) and language (text).

### Core Objectives & Learning Outcomes
- Understand the core mathematics and architectures behind Deep Learning, Computer Vision, and Natural Language Processing.
- Implement complex neural networks, optimizing hyperparameters, and handling data augmentation.
- Understand multi-modal learning (Vision + Language).

### Key Topics & Architectures Covered
- **Foundations:** Multilayer Perceptrons (MLPs), computation graphs, backpropagation, optimization methods (SGD, Adam, learning rate schedulers).
- **Computer Vision (CV):**
  - Convolutional Neural Networks (CNNs).
  - Advanced Architectures: ResNet, DenseNet. 
  - Object Detection methodologies (R-CNN, YOLO).
  - Generative Vision: Generative Adversarial Networks (GANs), Variational Autoencoders (VAEs).
- **Natural Language Processing (NLP):**
  - Recurrent Neural Networks (RNNs) and LSTMs for sequential data.
  - Attention Mechanisms.
  - Transformer Architectures (BERT, GPT variants).
  - Self-supervised learning in NLP.
- **Advanced & Multi-modal:** Vision Transformers (ViT), Contrastive Language-Image Pretraining (CLIP), Image Captioning models.

### Detailed Assessment Structure
1. **Programming Labs / Assignments:**
   - Practical implementation of neural networks using PyTorch. Topics involve writing backpropagation from scratch, implementing CNNs for image classification, sequence-to-sequence models for text translation, and multimodal joint embeddings.
2. **Final Project / Advanced Implementation:**
   - Implementing a state-of-the-art model on a custom dataset or replicating a prominent research paper. Emphasizes experimental design and hyperparameter tuning.
3. **Written Exam:**
   - Assesses mathematical derivations of gradient descent, the theoretical motivation behind architectural choices (e.g., why skip connections in ResNet, how dot-product attention works), and recognizing appropriate architectures for specific HCI scenarios.

---

## 3. Concepts of Programming Language Design (INFOMCPD)
**Focus:** Theoretical and practical underpinnings of how programming languages are structured, parsed, compiled, and executed, taught using Haskell and MinHs (a small functional language).

### Core Objectives & Learning Outcomes
- Gain proficiency in functional programming (Haskell).
- Parse and lex custom languages.
- Construct and implement an abstract machine for evaluating code.
- Understand language semantics, scope, and evaluation strategies.

### Key Topics Covered
- **Functional Programming Foundations:** Data types, pattern matching, recursion, lambda calculus, higher-order functions in Haskell.
- **Lexing and Parsing:** Converting string inputs into tokens, handling precedence, parsing expressions into Abstract Syntax Trees (AST).
- **Semantics:**
  - Big-step vs. small-step semantics.
  - Environment semantics versus substitution for evaluating functional programs.
- **Language Features Implementation (MinHs):**
  - Implementing an interpreter mapping variables to values using an environment (e-machine).
  - Lexical scoping, closures, multiple bindings (`let`), primitive operations, recursion (`recfun`), and lazily evaluated infinite lists.

### Detailed Assessment Structure
1. **Assignment 0 (15%): Getting started with Haskell:**
   - **0.1 RPN Calculator (5%):** Building a lexer, parser, and abstract syntax tree evaluator for Reverse Polish Notation.
   - **0.2 Infix Notation (5%):** Upgrading the parser to handle standard infix math operations, adhering to operator precedence and associativity.
   - **0.3 Lambda Calculus Evaluator (5%):** Interpreting a stripped-down Lambda calculus syntax with numbers mapping directly to functional programming models.
2. **Main Assignment (Evaluator / E-Machine):**
   - **Task 1 (60% Base grade):** Implementing an interpreter (evaluator) for 'MinHS' including functions, let bindings, booleans, and list data structures.
   - **Advanced Tasks (40%):** Extending the E-Machine to support partial application of primitive operations, n-ary functions (multiple arguments), nested let-bindings, non-recursive functions, and weak-head normal form evaluation of infinite recursive lists.
3. **Written Exam / Theoretical knowledge:**
   - Involves defining operational semantics, formal proofs of correctness, type systems, and type deduction schemes.

---

## 4. Advanced HCI Qualitative Research Methods
**Focus:** Master-level qualitative methodologies to investigate Human-Computer Interaction contexts, shifting focus from pure usability to deep sociocultural exploration of technology.

### Core Objectives & Learning Outcomes
- Formulate advanced qualitative research designs suited for complex human-technology interactions.
- Apply deeply immersive qualitative methods, moving beyond standard surveys.
- Conduct rigorous contextual data analysis using frameworks like Grounded Theory or Thematic Analysis.
- Address ethical dilemmas specific to qualitative technology research.

### Key Topics Covered
- **Epistemology in HCI:** Interpretivism vs. Positivism. Understanding how subjective human experiences uniquely shape technology use.
- **Data Collection Methods:**
  - In-depth, semi-structured, and narrative interviews.
  - Ethnography and contextual inquiry (observing users 'in the wild').
  - Diary studies and cultural probes.
- **Data Analysis:**
  - Coding processes (open, axial, selective).
  - Thematic Analysis.
  - Constructing narratives and personas from qualitative data.
- **Research Design & Ethics:** Ensuring validity and reliability in qualitative studies. Navigating consent, privacy, and the researcher's bias.

### Detailed Assessment Structure
1. **Qualitative Study Design & Execution:**
   - Define a research problem, design a study protocol, and conduct actual fieldwork or interviews.
2. **Data Analysis Project:**
   - Demonstrate mastery in coding qualitative data (often using software like NVivo or ATLAS.ti) and extracting overarching themes.
3. **Final Paper / Report:**
   - Write a conference-style academic paper presenting the qualitative findings, contextualized within existing HCI literature.

---
` *Part 1 of the synthesis (Courses 1-4). I will process the remaining courses after confirming this level of detail is exactly what you are looking for.*
