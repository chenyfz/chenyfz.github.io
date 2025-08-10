<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { onMounted, onUnmounted, ref } from 'vue'

const { t } = useI18n()
const activeId = ref('')

const scrollToId = (id: string) => {
  const el = document.querySelector(`#${id}`)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    // 更新地址栏但不产生新历史记录
    history.replaceState(null, '', `${window.location.pathname}#${id}`)
  }
}

const onContentClick = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (target.tagName === 'H4' && target.id) {
    scrollToId(target.id)
  }
}

let elements: HTMLElement[] = []
const handleScroll = () => {
  const scrollOffset = 72 // nav-bar height
  let currentId = ''
  for (const el of elements) {
    if (el.getBoundingClientRect().top <= scrollOffset + 8) {
      currentId = el.id
    } else {
      break
    }
  }
  activeId.value = currentId
}

// 进入页面时，若 URL 已含锚点则滚动到对应位置
onMounted(() => {
  const hash = window.location.hash.replace('#', '')
  if (hash) {
    scrollToId(hash)
  }
  elements = Array.from(document.querySelectorAll('.content h4[id]'))

  handleScroll() // set initial state
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="portfolio-page">
    <h2 class="heading">{{ t('title') }}</h2>
    <div class="overview">
      <div class="title full-line">{{ t('contentTitle') }}</div>
      <div class="full-line year-title">{{ t('firstYearTitle') }}</div>
      <div class="left">Period 1</div>
      <div class="right" :class="{ active: activeId === 'mcsp' }" @click="scrollToId('mcsp')">{{ t('mcsp.title') }}</div>
      <div class="right" :class="{ active: activeId === 'mlhvl' }" @click="scrollToId('mlhvl')">{{ t('mlhvl.title') }}</div>
      <div class="left">Period 2</div>
      <div class="right" :class="{ active: activeId === 'mvis' }" @click="scrollToId('mvis')">{{ t('mvis.title') }}</div>
      <div class="right" :class="{ active: activeId === 'mqlm' }" @click="scrollToId('mqlm')">{{ t('mqlm.title') }}</div>
      <div class="left">Period 3</div>
      <div class="right" :class="{ active: activeId === 'miti' }" @click="scrollToId('miti')">{{ t('miti.title') }}</div>
      <div class="right" :class="{ active: activeId === 'mmmi' }" @click="scrollToId('mmmi')">{{ t('mmmi.title') }}</div>
      <div class="left">Period 4</div>
      <div class="right" :class="{ active: activeId === 'mqnm' }" @click="scrollToId('mqnm')">{{ t('mqnm.title') }}</div>
      <div class="right" :class="{ active: activeId === 'mmob' }" @click="scrollToId('mmob')">{{ t('mmob.title') }}</div>

      <div class="full-line year-title">{{ t('secondYearTitle') }}</div>
      <div class="left">Period 5</div>
      <div class="right" :class="{ active: activeId === 'mdm' }" @click="scrollToId('mdm')">{{ t('mdm.title') }}</div>
      <div class="left">Period 6</div>
      <div class="right" :class="{ active: activeId === 'mcm' }" @click="scrollToId('mcm')">{{ t('mcm.title') }}</div>
      <div class="left">Remaining</div>
      <div class="right" :class="{ active: activeId === 'thesis' }" @click="scrollToId('thesis')">{{ t('graduationThesis.title') }}</div>
    </div>
    <hr>
    <div class="content" @click.capture="onContentClick">
      <div class="title">{{ t('coursesTitle') }}</div>
      <h4 id="mcsp" class="first-course-title">{{ t('mcsp.title') }}</h4>
      <p>{{ t('mcsp.description') }}</p>

      <h4 id="mlhvl">{{ t('mlhvl.title') }}</h4>
      <p>{{ t('mlhvl.description') }}</p>

      <h4 id="mvis">{{ t('mvis.title') }}</h4>
      <p>{{ t('mvis.description') }}</p>
      <a href="https://superfashion.walzen.org/" class="link" target="_blank">{{ t('mvis.linkText') }}</a>

      <h4 id="mqlm">{{ t('mqlm.title') }}</h4>
      <p>{{ t('mqlm.description') }}</p>
      <a href="/Group_30_Final_Paper.pdf" class="link" target="_blank">{{ t('mqlm.linkText') }}</a>

      <h4 id="miti">{{ t('miti.title') }}</h4>
      <p>{{ t('miti.description') }}</p>
      <router-link to="/snow-globe" class="link">{{ t('miti.linkText') }}</router-link>

      <h4 id="mmmi">{{ t('mmmi.title') }}</h4>
      <p>{{ t('mmmi.description') }}</p>
      <router-link to="/multimodal-interaction" class="link">{{ t('mmmi.linkText') }}</router-link>

      <h4 id="mqnm">{{ t('mqnm.title') }}</h4>
      <p>{{ t('mqnm.description') }}</p>
      <a href="/infomqnm-report.pdf" class="link" target="_blank">{{ t('mqnm.linkText') }}</a>

      <h4 id="mmob">{{ t('mmob.title') }}</h4>
      <p>{{ t('mmob.description') }}</p>

      <h4 id="mdm">{{ t('mdm.title') }}</h4>
      <p>{{ t('mdm.description') }}</p>
      <a href="/DM-A1-Yangfan-Yilun-Reem.zip" class="link" target="_blank">{{ t('mdm.linkA1') }}</a> |
      <a href="/INFOMDM2024-A2-Yangfan-Yilun-Reem.pdf" class="link" target="_blank">{{ t('mdm.linkA2') }}</a>

      <h4 id="mcm">{{ t('mcm.title') }}</h4>
      <p>{{ t('mcm.description') }}</p>

      <h4 id="thesis">{{ t('graduationThesis.title') }}</h4>
      <p>{{ t('graduationThesis.description') }}</p>
      <router-link class="link" to="/graduation-thesis">{{ t('graduationThesis.linkText') }}</router-link>
    </div>
  </div>
</template>

<i18n lang="yaml" locale="en">
firstYearTitle: "First Year"
secondYearTitle: "Second Year"

title: "Master's Courses at Utrecht University"
contentTitle: "Table of Contents"
coursesTitle: "Course Details"
mcsp:
  title: "Advanced cognitive and social psychology for HCI"
  description: |
    This course focused on social and cognitive psychology and their applications in HCI. Key projects included designing an interactive class on "Cognition, Motivation & Emotion" with a focus on Gamification, and developing a research proposal on Gamification. The proposal involved a literature review and outlining research methods, analysis, and discussion. A final exam contributed to the assessment.
mlhvl:
  title: "Machine learning for human vision and language"
  description: |
    This course covered two primary areas: the neuroscience foundations of vision, including its parallels with deep learning networks (e.g., CNNs); and the principles of natural language processing using AI networks (e.g., RNNs, Word2Vec, LSTM). Practical projects required implementing a CNN from scratch and building an RNN/GloVe model for NLP. Assessment included mid-term and final exams.
mvis:
  title: "Information Visualization"
  description: |
    This course introduced information visualization, covering data types, perception, color, interaction design, and evaluation. The main project involved designing effective visualizations for a chosen dataset. Our team chose to visualize the sustainability performance of fast fashion brands, creating two standard charts and one innovative chart to help consumers compare brands.
  linkText: "Project link (website)"
mqlm:
  title: "Advanced HCI qualitative research methods"
  description: |
    This course provided a grounding in advanced qualitative research methods for HCI, covering data collection, analysis, and visualization. The central project involved a complete qualitative study on a self-selected topic. Our group investigated user perceptions of smart home cameras, using focus groups and creative problem-solving to understand attitudes and propose solutions.
  linkText: "Paper link (PDF)"
mmmi:
  title: "Multimodal Interaction"
  description: |
    This course covered the physiological basis of multimodal interaction (vision, motion, auditory, tactile), VR/AR technologies, and the interplay between interaction and emotion. The core project was an original study on gesture interaction with distant 2D screens in VR. The study first used the Wizard of Oz technique to elicit user-preferred gestures, then implemented two common gestures for a qualitative comparison against Meta's default interaction, using the think-aloud protocol. The video shows the gestures we developed.
  linkText: "View Project Details"
miti:
  title: "Interaction technology innovation"
  description: |
    This hands-on course challenged us to create an "Enchanted Everyday Object". Using lab equipment, we built a pair of connected snow globes that sense each other's ambient light. Shaking one globe triggers a shared snowfall effect in both; users can also exchange voice messages. The project aimed to help people in different time zones feel connected.
  linkText: "View Project Details"
mqnm:
  title: "Advanced HCI quantitative research methods"
  description: |
    This course covered advanced quantitative research methods for HCI, contrasting parametric and non-parametric approaches (e.g., ANOVA, regression, GLM). The main project required us to formulate a research question for a given dataset. Our team analyzed the K-EmoPhone dataset (data from 77 participants over one week via smartphones/bands) to investigate whether personality traits influence stress indicators (HRV, EDA) during social media use.
  linkText: "Paper link (PDF)"
mmob:
  title: "Mobile Interaction"
  description: |
    A course on interaction with smartphones, tablets, and wearables. Lectures covered enabling technologies, touch screens, UI design, evaluation, gestures, mobile gaming, and VR/AR. Through papers and demos, we analyzed how hardware, human factors, and context shape mobile interface design.
mdm:
  title: "Data Mining"
  description: |
    A core course for the Data Science master's program. It covered theoretical foundations (PAC learning, VC-dimension) and algorithms (decision trees, SVMs, logistic regression, etc.). Students learned to select appropriate algorithms and run comparative experiments. Assessment included an exam, homework, and practical assignments.
  linkA1: "Assignment 1 (ZIP)"
  linkA2: "Assignment 2 (PDF)"
mcm:
  title: "Cognitive Modeling"
  description: |
    This course explored three approaches to cognitive modeling: processing models, machine-learning models, and probabilistic (Bayesian) models. For each, we completed an assignment to build and evaluate a model, followed by a written exam on theory and trade-offs.
graduationThesis:
  title: "Research Project (Graduation Thesis)"
  description: |
    My thesis, Zoom Pursuit, introduces a radial-zoom stimulus to overcome calibration drift, enabling accurate gaze pointing in any unmodified desktop GUI.
  linkText: "> View project page"
</i18n>

<i18n lang="yaml" locale="zh">
firstYearTitle: "第一年"
secondYearTitle: "第二年"
title: "乌得勒支大学硕士课程"
contentTitle: "目录"
coursesTitle: "课程详情"
mcsp:
  title: "面向HCI的认知与社会心理学 (Advanced cognitive and social psychology for HCI)"
  description: |
    本课程聚焦于社会与认知心理学及其在人机交互（HCI）领域的应用。主要项目包括：以“认知、动机与情感”为主题（侧重游戏化）设计一节互动课程；合作撰写关于游戏化的研究提案，包含文献回顾、研究方法、分析方案与讨论。期末考试是课程评估的一部分。
mlhvl:
  title: "面向人类视觉与语言的机器学习 (Machine learning for human vision and language)"
  description: |
    本课程探讨两大领域：视觉的神经科学基础及其与深度学习网络（如CNN）的关联；利用AI网络（如RNN、Word2Vec、LSTM）进行自然语言处理的原理。实践项目要求从零实现CNN模型，并构建用于自然语言处理的RNN/GloVe模型。通过期中、期末考试评估。
mvis:
  title: "信息可视化 (Information Visualization)"
  description: |
    本课程介绍信息可视化，涵盖数据类型、感知、色彩、交互设计与评估。主要项目要求为自选数据集设计有效的可视化方案。我们小组选择可视化快时尚品牌的可持续性表现，创建了两个标准图表和一个创新图表以帮助消费者比较品牌。
  linkText: "项目链接（网页）"
mqlm:
  title: "高级HCI定性研究方法 (Advanced HCI qualitative research methods)"
  description: |
    本课程为HCI领域的高级定性研究方法提供基础，涵盖数据收集、分析与可视化。核心项目是围绕自选主题进行一项完整的定性研究。我们小组研究了用户对智能家居摄像头的看法，采用焦点小组和创造性问题解决方法，以理解用户态度并提出解决方案。
  linkText: "文章链接（PDF）"
mmmi:
  title: "多模态交互 (Multimodal Interaction)"
  description: |
    本课程探讨多模态交互的生理基础（视觉、运动、听觉、触觉）、VR/AR技术，以及交互与情感的关系。核心项目是一项关于VR中远距离2D屏幕手势交互的原创研究。研究首先用“绿野仙踪”法诱导用户偏好的手势，随后实现了两种常见手势，并运用出声思维法与Meta的默认交互进行定性对比。视频展示了我们开发的手势。
  linkText: "查看项目详情"
miti:
  title: "交互技术创新 (Interaction technology innovation)"
  description: |
    这门实践课程要求我们创造一个“魔法化的日常物品”。我们用实验室设备制作了一对互联雪球，可感知彼此环境光。摇动其中一个，两边会同步飘雪；用户还可交换语音信息。项目旨在帮助身处不同时区的人感受连接。
  linkText: "查看项目详情"
mqnm:
  title: "高级HCI定量研究方法 (Advanced HCI quantitative research methods)"
  description: |
    本课程涵盖HCI高级定量研究方法，对比参数化与非参数化方法（如方差分析、回归、GLM）。主要项目要求为给定数据集设计研究问题。我们小组分析了K-EmoPhone数据集（77名参与者一周的智能手机/手环数据），探究人格特质在使用社交媒体时是否影响压力指标（HRV、EDA）。
  linkText: "论文链接（PDF）"
mmob:
  title: "移动交互 (Mobile Interaction)"
  description: |
    一门关于智能手机、平板和可穿戴设备交互的课程。讲座涵盖了支撑技术、触摸屏、UI设计、评估、手势、移动游戏和VR/AR。通过论文和演示，我们分析了硬件、人因和使用情境如何影响移动界面设计。
mdm:
  title: "数据挖掘 (Data Mining)"
  description: |
    数据科学硕士项目的核心课程。涵盖理论基础（PAC学习、VC维）和算法（决策树、SVM、逻辑回归等）。学生学习为给定问题选择合适算法并进行对比实验。评估包括考试、作业和实践项目。
  linkA1: "作业1（ZIP）"
  linkA2: "作业2（PDF）"
mcm:
  title: "认知建模 (Cognitive Modeling)"
  description: |
    本课程探讨三种认知建模方法：处理模型、机器学习模型和概率（贝叶斯）模型。我们为每种方法完成一个建模与评估作业，并通过笔试考察理论与权衡。
graduationThesis:
  title: "研究项目 (毕业论文)"
  description: |
    我的毕业论文 Zoom Pursuit 提出一种径向缩放刺激来克服校准漂移，实现了在任何未经修改的桌面GUI中的精确凝视指向。
  linkText: "> 查看项目页面"
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

hr
  margin: 32px 0

.title
  font-size 20px
  font-weight bold

.year-title
  margin-top 12px
  font-weight bold

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
    border-radius 4px
    transition .1s

    &.active,
    &:hover
      color: var(--text-color)
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
      padding: 4px 16px
</style>