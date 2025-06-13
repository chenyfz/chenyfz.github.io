<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { onMounted } from 'vue'

const { t } = useI18n()

const scrollToId = (id: string) => {
  const el = document.querySelector(`#${id}`)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    // 更新地址栏但不产生新历史记录
    history.replaceState(null, '', `#${id}`)
  }
}

const onContentClick = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (target.tagName === 'H4' && target.id) {
    scrollToId(target.id)
  }
}

// 进入页面时，若 URL 已含锚点则滚动到对应位置
onMounted(() => {
  const hash = window.location.hash.replace('#', '')
  if (hash) {
    scrollToId(hash)
  }
})
</script>

<template>
  <div class="portfolio-page">
    <h2 class="heading">{{ t('title') }}</h2>
    <div class="overview">
      <div class="title full-line">{{ t('contentTitle') }}</div>
      <div class="full-line year-title">{{ t('firstYearTitle') }}</div>
      <div class="left">Period 1</div>
      <div class="right" @click="scrollToId('mcsp-title')">{{ t('mcsp.title') }}</div>
      <div class="right" @click="scrollToId('mlhvl-title')">{{ t('mlhvl.title') }}</div>
      <div class="left">Period 2</div>
      <div class="right" @click="scrollToId('mvis-title')">{{ t('mvis.title') }}</div>
      <div class="right" @click="scrollToId('mqlm-title')">{{ t('mqlm.title') }}</div>
      <div class="left">Period 3</div>
      <div class="right" @click="scrollToId('miti-title')">{{ t('miti.title') }}</div>
      <div class="right" @click="scrollToId('mmmi-title')">{{ t('mmmi.title') }}</div>
      <div class="left">Period 4</div>
      <div class="right" @click="scrollToId('mqnm-title')">{{ t('mqnm.title') }}</div>
      <div class="right" @click="scrollToId('mmob-title')">{{ t('mmob.title') }}</div>

      <div class="full-line year-title">{{ t('secondYearTitle') }}</div>
      <div class="left">Period 5</div>
      <div class="right" @click="scrollToId('mdm-title')">{{ t('mdm.title') }}</div>
      <div class="left">Period 6</div>
      <div class="right" @click="scrollToId('mcm-title')">{{ t('mcm.title') }}</div>
      <div class="left">Remaining</div>
      <div class="right" @click="scrollToId('thesis-title')">{{ t('graduationThesis.title') }}</div>
    </div>
    <hr>
    <div class="content" @click.capture="onContentClick">
      <div class="reflection-card">
        <div class="reflection-title">{{ t('reflection.title') }}</div>
        <div class="reflection-content">
          <p>{{ t('reflection.p1Intro') }}</p>
          <ul class="direction-list">
            <li>{{ t('reflection.directionResearch') }}</li>
            <li>{{ t('reflection.directionDataViz') }}</li>
            <li>{{ t('reflection.directionPsychology') }}</li>
            <li>{{ t('reflection.directionInteraction') }}</li>
          </ul>
          <p>{{ t('reflection.foundation') }}</p>
          <p>{{ t('reflection.outlook') }}</p>
        </div>
      </div>
      <div class="title">{{ t('coursesTitle') }}</div>
      <h4 id="mcsp-title" class="first-course-title">{{ t('mcsp.title') }}</h4>
      <p>{{ t('mcsp.description') }}</p>

      <h4 id="mlhvl-title">{{ t('mlhvl.title') }}</h4>
      <p>{{ t('mlhvl.description') }}</p>

      <h4 id="mvis-title">{{ t('mvis.title') }}</h4>
      <p>{{ t('mvis.description') }}</p>
      <a href="https://superfashion.walzen.org/" class="link" target="_blank">{{ t('mvis.linkText') }}</a>
      <img src="/infovis-demo.png" alt="illustration about Information Visualization course project">
      <p class="label">Screenshot of our course project</p>

      <h4 id="mqlm-title">{{ t('mqlm.title') }}</h4>
      <p>{{ t('mqlm.description') }}</p>
      <a href="/Group_30_Final_Paper.pdf" class="link" target="_blank">{{ t('mqlm.linkText') }}</a>

      <h4 id="miti-title">{{ t('miti.title') }}</h4>
      <p>{{ t('miti.description') }}</p>
      <a href="/Reflective_Diary_Yangfan.pdf" class="link" target="_blank">{{ t('miti.linkText') }}</a>

      <h4 id="mmmi-title">{{ t('mmmi.title') }}</h4>
      <p>{{ t('mmmi.description') }}</p>
      <a href="/INFOMMMI_Super_VR_Power_paper.pdf" class="link" target="_blank">{{ t('mmmi.linkText') }}</a>
      <video controls>
        <source src="/infommmi-demo.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <p class="label">The first gesture is by Meta. The second and third gestures are what I implemented</p>

      <h4 id="mqnm-title">{{ t('mqnm.title') }}</h4>
      <p>{{ t('mqnm.description') }}</p>
      <a href="/infomqnm-report.pdf" class="link" target="_blank">{{ t('mqnm.linkText') }}</a>

      <h4 id="mmob-title">{{ t('mmob.title') }}</h4>
      <p>{{ t('mmob.description') }}</p>

      <h4 id="mdm-title">{{ t('mdm.title') }}</h4>
      <p>{{ t('mdm.description') }}</p>
      <a href="/DM-A1-Yangfan-Yilun-Reem.zip" class="link" target="_blank">{{ t('mdm.linkA1') }}</a> |
      <a href="/INFOMDM2024-A2-Yangfan-Yilun-Reem.pdf" class="link" target="_blank">{{ t('mdm.linkA2') }}</a>

      <h4 id="mcm-title">{{ t('mcm.title') }}</h4>
      <p>{{ t('mcm.description') }}</p>

      <h4 id="thesis-title">{{ t('graduationThesis.title') }}</h4>
      <p>{{ t('graduationThesis.description') }}</p>
      <router-link class="link" to="/graduation-thesis">{{ t('graduationThesis.linkText') }}</router-link>
    </div>
  </div>
</template>

<i18n lang="yaml" locale="en">
firstYearTitle: "First Year"
secondYearTitle: "Second Year"

title: "Study Plan for Utrecht University's HCI program"
contentTitle: "Table of Contents"
coursesTitle: "Course detail"
mcsp:
  title: "Advanced cognitive and social psychology for HCI"
  description: |
    This course focused on the fundamentals of social and cognitive psychology and their practical applications within Human-Computer Interaction (HCI). Students engaged in key projects, including designing an interactive class (in a group of five) on "Cognition, Motivation & Emotion" with a focus on Gamification, and collaboratively developing a research proposal on Gamification. The proposal process involved a thorough literature review and detailed outlining of research methods, analysis, and discussion. A final exam contributed to the overall assessment.
mlhvl:
  title: "Machine learning for human vision and language"
  description: |
    This course explored two primary areas: the neuroscience foundations of vision, including its parallels with deep learning networks like CNNs and recurrent visual processing; and the principles of natural language processing using AI networks such as RNNs, Word2Vec, GloVe, LSTM, and encoder-decoder models. Practical application was emphasized through projects requiring students to implement a CNN model in Python from scratch and build an RNN and GloVe model for natural language processing. Learning was assessed through both mid-term and final exams.
mvis:
  title: "Information Visualization"
  description: |
    This course offered a comprehensive introduction to information visualization, covering essential topics such as various data and visualization types, principles of perception and color, task-oriented interaction design, evaluation methodologies, and cognitive considerations. It also explored advanced visualization methods through relevant case studies. The main project challenged us to select a data source and design effective visualizations to enhance understanding; our team chose to visualize the sustainability performance of fast fashion brands, creating two standard charts and one innovative chart to help consumers compare brands and make informed decisions.
  linkText: "Project link (website)"
mqlm:
  title: "Advanced HCI qualitative research methods"
  description: |
    This course provided a thorough grounding in advanced qualitative research methods for HCI. Key topics included various data collection techniques, robust analysis methods for qualitative data, and effective data visualization strategies within qualitative research. The central project involved conducting a complete qualitative research study on a self-selected topic, requiring the application of at least two distinct research methods. Our group investigated user perceptions of smart home cameras, employing focus groups and creative problem-solving methods to understand attitudes and propose solutions for user concerns.
  linkText: "Paper link (PDF)"
mmmi:
  title: "Multimodal Interaction"
  description: |
    This course delved into the physiological basis of multimodal interaction, covering vision, motion perception, auditory, and tactile senses, alongside explorations of VR and AR technologies and the interplay between multimodal interaction and emotion. The core project involved conducting an original study. Our research focused on gesture interaction with distant 2D screens in a VR setting. This two-part study first involved designing remote 2D screen interaction tasks where users employed their preferred gestures, with feedback simulated using the Wizard of Oz technique. Subsequently, we extracted two common gestures and conducted a qualitative comparison against Meta's default interaction methods, utilizing the think-aloud protocol. The accompanying video showcases the gestures implemented in the second part, particularly the second and third gestures we developed.
  linkText: "Paper link (PDF)"
miti:
  title: "Interaction technology innovation"
  description: |
    This hands-on course challenged us to create an "Enchanted Everyday Object". Using the lab's electronics, 3-D printers and workshop tools, we built a pair of connected snow-globes that sense each other's ambient light. When one globe is shaken, both display a shared snowfall scene; users can leave romantic messages that appear inside the partner globe, helping two people in different time zones feel a sense of togetherness. Further details are available in my reflective diary.
  linkText: Reflective Diary (PDF)
mqnm:
  title: "Advanced HCI quantitative research methods"
  description: |
    This course covered advanced quantitative research methods for HCI, contrasting parametric and non-parametric approaches. It explored techniques such as ANOVA, Factorial ANOVA, Randomized Block Designs, Repeated Measurements, ANCOVA, and MANOVA, as well as simple, multiple, and multivariate regression, and General Linear Models (GLM), alongside essential data processing skills. The main project required us to select a given dataset and formulate a research question involving at least two independent and two dependent variables. Our team analyzed the K-EmoPhone dataset (data from 77 participants over one week via smartphones and smart bands) to investigate whether personality traits influence heart rate variability (HRV) and electrodermal activity (EDA) – common stress indicators – during social media usage.
  linkText: "Paper link (PDF)"
mmob:
  title: "Mobile Interaction"
  description: |
    A specialised course on interaction with smartphones, tablets and wearables. Nine lectures each addressed one theme: (1) introduction, (2) enabling technologies, (3) touch screens, (4) human aspects & UI design, (5) evaluation methods, (6) touch interaction & gestures, (7) mobile gaming, (8) 3-D & virtual reality, and (9) augmented reality. Through slides, research papers and demo videos we analysed how hardware capabilities, human factors and context of use shape design choices for mobile interfaces.
mdm:
  title: "Data Mining"
  description: |
    A core course for the Data Science master's programme. Lectures and tutorials cover both theoretical foundations (PAC learning, VC-dimension, bias–variance trade-off, over-fitting, curse of dimensionality) and a toolbox of algorithms such as decision trees, bagging / boosting / random forests, SVMs, logistic regression, Bayesian networks, frequent-pattern mining and text classification. Students learn how to select appropriate algorithms for a given problem and to run comparative experiments in a sound manner. Assessment consists of a digital exam, homework and one or more practical assignments.
  linkA1: "Assignment 1 (ZIP)"
  linkA2: "Assignment 2 (PDF)"
mcm:
  title: "Cognitive Modeling"
  description: |
    This course explores three complementary approaches to cognitive modeling: processing models, machine-learning based models, and probabilistic (Bayesian) models. For each approach we completed a medium-scale assignment to build and evaluate a model, followed by a written exam covering theoretical foundations and practical trade-offs.
graduationThesis:
  title: "Research Project (Graduation Thesis)"
  description: |
    Zoom Pursuit, my ongoing thesis, introduces a radial-zoom stimulus to overcome calibration drift and lets users accurately point with their eyes in any unmodified desktop GUI. The full paper is in preparation and will be linked here upon completion.
  linkText: "> View project page"
reflection:
  title: "Reflection on my study plan"
  p1Intro: |
    Looking back at the courses I have completed or plan to take, I have followed a "breadth-first, depth-later" strategy. Driven by curiosity, I have explored four broad areas:
  directionResearch: |
    Research methods (e.g., Advanced HCI Qualitative & Quantitative Research Methods)
  directionDataViz: |
    Data science and visualisation (Information Visualisation, Machine Learning for Human Vision & Language)
  directionPsychology: |
    Psychology and cognitive science (Advanced Cognitive and Social Psychology for HCI; Cognitive Modeling planned)
  directionInteraction: |
    Interaction design and technology implementation – covering multimodal and mobile interaction, immersive VR/MR experiences, embedded systems, and rapid prototyping with 3D modelling & 3D printing (courses: Multimodal Interaction, Interaction Technology Innovation, Mobile Interaction, etc.)
  foundation: |
    This lateral layout has given me a complementary and solid foundation: I can apply both qualitative and quantitative tools to research, use data-science and visualisation techniques to uncover insights, understand users' psychological and perceptual mechanisms, and translate designs into prototypes through multimodal and embedded technologies. Such multi-faceted training naturally leads me to analyse problems from several perspectives at once and equips me for deeper study.
  outlook: |
    As my studies progress my interest in interaction-innovation research grows stronger, particularly in immersive VR/MR interaction and tangible design that blends the virtual and physical worlds. I hope to pursue this direction in my future PhD or EngD career.
</i18n>

<i18n lang="yaml" locale="zh">
firstYearTitle: "第一年"
secondYearTitle: "第二年"
title: "Utrecht University HCI 项目课程计划"
contentTitle: "目录"
coursesTitle: "课程详情"
mcsp:
  title: "面向HCI的认知与社会心理学 (Advanced cognitive and social psychology for HCI)"
  description: |
    本课程聚焦于社会心理学与认知心理学的基础及其在人机交互（HCI）领域的应用。学生通过重要项目进行实践，包括（五人小组）以"认知、动机与情感"为主题（侧重游戏化）设计一节约30分钟的互动课程，以及（二人小组）合作撰写关于游戏化的研究提案。提案过程包括了详尽的文献回顾，并细化了研究方法、分析方案与讨论环节。期末考试是课程整体评估的一部分。
mlhvl:
  title: "面向人类视觉与语言的机器学习 (Machine learning for human vision and language)"
  description: |
    本课程探讨两大核心领域：首先是视觉的神经科学基础及其与深度学习网络（如CNN和递归视觉处理）的关联；其次是利用人工智能网络（如RNN、Word2Vec、GloVe、LSTM及编解码模型）进行自然语言处理的原理。课程通过实践项目强调知识应用，要求学生从零开始用Python实现CNN模型，并构建用于自然语言处理的RNN和GloVe模型。学习成果通过期中与期末考试进行评估。
mvis:
  title: "信息可视化 (Information Visualization)"
  description: |
    本课程全面介绍了信息可视化，涵盖了数据与可视化类型、感知与颜色原理、任务导向的交互设计、评估方法及认知因素等核心议题，并深入探讨了高级可视化方法及相关案例研究。主要项目要求我们自选数据源并设计有效的可视化方案以增进理解。我们小组选择可视化快时尚品牌在各项可持续性指标上的表现，为此创建了两个标准图表和一个创新图表，旨在帮助消费者比较品牌并做出明智决策。
  linkText: "项目链接（网页）"
mqlm:
  title: "高级HCI定性研究方法 (Advanced HCI qualitative research methods)"
  description: |
    本课程为HCI领域的高级定性研究方法提供了坚实基础。核心内容包括多样的定性数据收集技术、严谨的数据分析方法，以及定性研究中有效的数据可视化策略。中心项目是围绕自选主题进行一项完整的定性研究，并应用至少两种不同的研究方法。我们小组研究了用户对智能家居摄像头的看法，采用了焦点小组和创造性问题解决等方法，以理解用户态度并针对其顾虑提出解决方案。
  linkText: "文章链接（PDF）"
mmmi:
  title: "多模态交互 (Multimodal Interaction)"
  description: |
    本课程深入探讨多模态交互的生理基础（视觉、运动感知、听觉、触觉），辅以对VR、AR技术的探索，以及多模态交互与情感之间关系的分析。核心项目要求完成一项原创研究。我们的研究聚焦于VR环境中与远距离2D屏幕的手势交互。这项研究分两阶段进行：首先，设计远程2D屏幕交互任务，用户使用自认为合理的方式完成，并通过'绿野仙踪'法模拟反馈以观察其偏好手势；随后，我们提取了两种常用手势，并运用出声思维法与Meta的默认交互方式进行了定性对比。附带视频展示了研究第二部分所实现的手势，特别是我们开发的第二和第三个手势。
  linkText: "论文链接（PDF）"
miti:
  title: "交互技术创新 (Interaction technology innovation)"
  description: |
    这门实践性极强的课程要求以"魔法化日常物品"为主题进行设计与原型开发。借助实验室提供的电子元件、3D 打印机等资源，我们制作了一对互联的雪球：两只雪球可感知彼此的环境光；摇动任意一只，双方都会呈现飘雪景象；还可以浪漫地留言，帮助因时区分隔的两个人保持陪伴感。更多细节见我的反思日志。
  linkText: 日志（PDF）
mqnm:
  title: "高级HCI定量研究方法 (Advanced HCI quantitative research methods)"
  description: |
    本课程涵盖了HCI领域的高级定量研究方法，对比了参数化与非参数化方法，探讨了如方差分析（ANOVA）、因子方差分析、随机区组设计、重复测量、协方差分析（ANCOVA）、多变量方差分析（MANOVA）等技术，以及简单回归、多重回归、多变量回归和广义线性模型（GLM），并培养了必要的数据处理技能。主要项目要求我们选用给定数据集，并设计一个至少包含两个自变量和两个因变量的研究问题。我们小组分析了K-EmoPhone数据集（收集自77名参与者为期一周的智能手机与智能手环数据），旨在探究人格特质在使用社交媒体时是否会影响心率变异性（HRV）和皮肤电活动（EDA）这两个常见的压力指标。
  linkText: "论文链接（PDF）"
mmob:
  title: "移动交互 (Mobile Interaction)"
  description: |
    本课程聚焦手机、平板与可穿戴设备的交互设计。九场讲座分别涵盖：1) 概论，2) 支撑技术，3) 触摸屏，4) 人因与界面设计，5) 评估方法，6) 触摸与手势交互，7) 移动游戏，8) 3D 与虚拟现实，9) 增强现实。通过讲义、论文与演示视频，我们讨论了硬件能力、人因特性与使用情境如何共同影响移动界面的设计选择。
mdm:
  title: "数据挖掘 (Data Mining)"
  description: |
    数据科学硕士项目的必修课。课程通过讲座和习题课讲解数据挖掘的理论基础（PAC 学习、VC 维、偏差-方差分解、过拟合与维度灾难等）以及常用算法工具箱，包括决策树、Bagging/Boosting/随机森林、支持向量机、逻辑回归、贝叶斯网络、频繁模式挖掘、文本分类等。学生将学会根据分析任务选择合适算法，并以严谨方式完成对比实验。成绩由数字考试、作业与实践项目构成。
  linkA1: "作业1（ZIP）"
  linkA2: "作业2（PDF）"
mcm:
  title: "认知建模 (Cognitive Modeling)"
  description: |
    这门课程探讨了三种互为补充的认知建模方法：处理模型、基于机器学习的模型，以及概率（贝叶斯）模型。针对每种方法，我们都完成了一个中等规模的建模与评估作业，随后还进行了涵盖理论基础和实际权衡的笔试。
graduationThesis:
  title: "研究项目 (毕业论文)"
  description: |
    毕业论文项目 Zoom Pursuit 通过在当前凝视点触发径向放大动画，实时修正漂移误差，使用户无需改动现有软件即可在任意桌面 GUI 中精准完成凝视指向。论文全文完成后将在此处提供链接。
  linkText: "> 查看项目页面"
reflection:
  title: "学习计划回顾"
  p1Intro: |
    回顾已修及计划修读的课程，我走了一条"先广后深"的路线。出于对不同课题的好奇，我陆续涉猎了四个方向：
  directionResearch: |
    研究方法（Advanced HCI Qualitative & Quantitative Research Methods 等）
  directionDataViz: |
    数据科学与可视化（Information Visualization、Machine Learning for Human Vision & Language）
  directionPsychology: |
    心理学与认知科学（Advanced Cognitive and Social Psychology for HCI；计划修读 Cognitive Modeling）
  directionInteraction: |
    交互设计与技术实现——涵盖多模态与移动交互、沉浸式 VR/MR、嵌入式系统，以及结合三维建模和 3D 打印的快速原型（相关课程：Multimodal Interaction、Interaction Technology Innovation、Mobile Interaction 等）。
  foundation: |
    这种横向布局为我奠定了互补而扎实的基础：我既能运用定性与定量工具开展研究，也能借助数据科学与可视化方法挖掘洞见；同时，我理解用户的心理与感知机制，并能通过多模态及嵌入式技术将设计落地为原型。多角度的训练促使我在分析问题时自然地从多个维度综合思考，这成为我未来聚焦研究的坚实底座。
  outlook: |
    随着学习的深入，我对交互创新研究的兴趣日益浓厚，尤其关注融合虚拟与现实的 VR/MR 沉浸式交互与 tangible design。我希望在未来的 PhD 或 EngD 生涯中延续并深化这一方向。
</i18n>

<style scoped lang="stylus">
.portfolio-page
  padding: 0 var(--page-padding)
  margin: 32px auto 56px auto
  max-width 1200px

h4
  margin-bottom 8px
  margin-top 48px
  scroll-margin-top: 72px;
  cursor pointer
  user-select none

.first-course-title
  margin-top 8px

img
video
  margin-top 24px
  border-radius 8px
  width 100%

hr
  margin: 32px 0

.reflection-card
  width fit-content
  background var(--background-50-transparent)
  border: 1.5px solid var(--border-chat-bubble)
  box-sizing border-box
  backdrop-filter blur(50px)
  padding 24px
  margin-bottom 24px
  border-radius 20px

.reflection-content
  margin-top 8px

.reflection-title
.title
  font-size 20px
  font-weight bold

.year-title
  margin-top 12px
  font-weight bold

.label
  color: var(--text-color-secondary)
  text-align center
  margin-top: 4px
  margin-bottom 24px

.overview
  display grid
  grid-template-columns auto 1fr
  grid-template-rows: auto;
  grid-gap 8px
  column-gap: 10px
  color: var(--text-color-70)

  .full-line
    grid-column 1 / 3
    color: var(--text-color)

  .right
    grid-column 2 / 3
    cursor pointer
    width fit-content
    padding: 0 6px
    position: relative;

    &:hover
      color: var(--text-color)

    &:before
      content: ''
      position: absolute
      left 0
      right 0
      bottom -4px
      top -4px
      border-radius 4px
      transition .1s

    &:hover:before
      background var(--text-color-hightlight)

  .period-title
    margin-top: 8px

@media (min-width: 1200px)
  .portfolio-page
    display grid
    grid-template-columns 320px 1fr
    grid-template-rows: auto;
    grid-gap 8px
    column-gap: 40px

  hr
    display none

  .heading
    grid-column 1 / 3

  .overview
    position sticky
    top 72px
    display grid
    grid-template-columns auto
    grid-template-rows auto
    align-self start
    padding-bottom 32px
    max-height calc(100vh - 64px - 72px)
    overflow auto

    .full-line
      grid-column unset

    .right
      grid-column unset
      width unset
      padding: 0 16px

.reflection-content p
  margin 8px 0
  line-height 1.6

.direction-list
  margin 4px 0 16px 0
  padding 0
  list-style-type disc
  list-style-position inside

  li
    margin 4px 0
</style>