<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const activeId = ref('')

const scrollToId = (id: string) => {
  router.replace({ hash: `#${id}` })
}

watch(
  () => route.hash,
  (newHash) => {
    if (newHash) {
      // Use a timeout to ensure the element is available after navigation
      setTimeout(() => {
        const element = document.querySelector(newHash)
        if (element) {
          element.classList.add('highlighted')
          setTimeout(() => {
            element.classList.remove('highlighted')
          }, 5000) // Animation duration
        }
      }, 100)
    }
  },
  { immediate: true }
)

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

onMounted(() => {
  elements = Array.from(document.querySelectorAll('.content .course-section[id]'))

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
    <div class="heading-subtitle">{{ t('title-subtitle') }}</div>
    <div class="card main-content-card">
      <div class="overview">
        <div class="title full-line">{{ t('contentTitle') }}</div>
        <div class="full-line year-title">{{ t('firstYearTitle') }}</div>
        <div class="left">Period 1</div>
        <div class="right" :class="{ active: activeId === 'mcsp' }" @click="scrollToId('mcsp')">
          {{ t('mcsp.title') }}
        </div>
        <div class="right" :class="{ active: activeId === 'mlhvl' }" @click="scrollToId('mlhvl')">
          {{ t('mlhvl.title') }}
        </div>
        <div class="left">Period 2</div>
        <div class="right" :class="{ active: activeId === 'mvis' }" @click="scrollToId('mvis')">
          {{ t('mvis.title') }}
        </div>
        <div class="right" :class="{ active: activeId === 'mqlm' }" @click="scrollToId('mqlm')">
          {{ t('mqlm.title') }}
        </div>
        <div class="left">Period 3</div>
        <div class="right" :class="{ active: activeId === 'miti' }" @click="scrollToId('miti')">
          {{ t('miti.title') }}
        </div>
        <div class="right" :class="{ active: activeId === 'mmmi' }" @click="scrollToId('mmmi')">
          {{ t('mmmi.title') }}
        </div>
        <div class="left">Period 4</div>
        <div class="right" :class="{ active: activeId === 'mqnm' }" @click="scrollToId('mqnm')">
          {{ t('mqnm.title') }}
        </div>
        <div class="right" :class="{ active: activeId === 'mmob' }" @click="scrollToId('mmob')">
          {{ t('mmob.title') }}
        </div>

        <div class="full-line year-title">{{ t('secondYearTitle') }}</div>
        <div class="left">Period 5</div>
        <div class="right" :class="{ active: activeId === 'mdm' }" @click="scrollToId('mdm')">
          {{ t('mdm.title') }}
        </div>
        <div class="left">Period 6</div>
        <div class="right" :class="{ active: activeId === 'mcm' }" @click="scrollToId('mcm')">
          {{ t('mcm.title') }}
        </div>
        <div class="left">Remaining</div>
        <div class="right" :class="{ active: activeId === 'thesis' }" @click="scrollToId('thesis')">
          {{ t('graduationThesis.title') }}
        </div>
      </div>
      <hr>
      <div class="content">
        <div class="title">{{ t('coursesTitle') }}</div>
        <div id="mcsp" class="course-section">
          <h4>{{ t('mcsp.title') }}
            <span class="grade" v-if="$i18n.locale === 'en'">{{ t('gradeLabel') }}{{ t('mcsp.grade') }}</span>
            <span class="grade" v-else-if="$i18n.locale === 'zh'">{{ t('mcsp.grade') }}{{ t('gradeLabel') }}</span>
          </h4>
          <p>{{ t('mcsp.description') }}</p>
        </div>
        <div id="mlhvl" class="course-section">
          <h4>{{ t('mlhvl.title') }}
            <span class="grade" v-if="$i18n.locale === 'en'">{{ t('gradeLabel') }}{{ t('mlhvl.grade') }}</span>
            <span class="grade" v-else-if="$i18n.locale === 'zh'">{{ t('mlhvl.grade') }}{{ t('gradeLabel') }}</span>
          </h4>
          <p>{{ t('mlhvl.description') }}</p>
        </div>
        <div id="mvis" class="course-section">
          <h4>{{ t('mvis.title') }}
            <span class="grade" v-if="$i18n.locale === 'en'">{{ t('gradeLabel') }}{{ t('mvis.grade') }}</span>
            <span class="grade" v-else-if="$i18n.locale === 'zh'">{{ t('mvis.grade') }}{{ t('gradeLabel') }}</span>
          </h4>
          <p>{{ t('mvis.description') }}</p>
          <a href="https://superfashion.walzen.org/" class="link" target="_blank">{{ t('mvis.linkText') }}</a>
        </div>
        <div id="mqlm" class="course-section">
          <h4>{{ t('mqlm.title') }}
            <span class="grade" v-if="$i18n.locale === 'en'">{{ t('gradeLabel') }}{{ t('mqlm.grade') }}</span>
            <span class="grade" v-else-if="$i18n.locale === 'zh'">{{ t('mqlm.grade') }}{{ t('gradeLabel') }}</span>
          </h4>
          <p>{{ t('mqlm.description') }}</p>
          <a href="/Group_30_Final_Paper.pdf" class="link" target="_blank">{{ t('mqlm.linkText') }}</a>
        </div>
        <div id="miti" class="course-section">
          <h4>{{ t('miti.title') }}
            <span class="grade" v-if="$i18n.locale === 'en'">{{ t('gradeLabel') }}{{ t('miti.grade') }}</span>
            <span class="grade" v-else-if="$i18n.locale === 'zh'">{{ t('miti.grade') }}{{ t('gradeLabel') }}</span>
          </h4>
          <p>{{ t('miti.description') }}</p>
          <router-link to="/snow-globe" class="link">{{ t('miti.linkText') }}</router-link>
        </div>
        <div id="mmmi" class="course-section">
          <h4>{{ t('mmmi.title') }}
            <span class="grade" v-if="$i18n.locale === 'en'">{{ t('gradeLabel') }}{{ t('mmmi.grade') }}</span>
            <span class="grade" v-else-if="$i18n.locale === 'zh'">{{ t('mmmi.grade') }}{{ t('gradeLabel') }}</span>
          </h4>
          <p>{{ t('mmmi.description') }}</p>
          <router-link to="/multimodal-interaction" class="link">{{ t('mmmi.linkText') }}</router-link>
        </div>
        <div id="mqnm" class="course-section">
          <h4>{{ t('mqnm.title') }}
            <span class="grade" v-if="$i18n.locale === 'en'">{{ t('gradeLabel') }}{{ t('mqnm.grade') }}</span>
            <span class="grade" v-else-if="$i18n.locale === 'zh'">{{ t('mqnm.grade') }}{{ t('gradeLabel') }}</span>
          </h4>
          <p>{{ t('mqnm.description') }}</p>
          <a href="/infomqnm-report.pdf" class="link" target="_blank">{{ t('mqnm.linkText') }}</a>
        </div>
        <div id="mmob" class="course-section">
          <h4>{{ t('mmob.title') }}
            <span class="grade" v-if="$i18n.locale === 'en'">{{ t('gradeLabel') }}{{ t('mmob.grade') }}</span>
            <span class="grade" v-else-if="$i18n.locale === 'zh'">{{ t('mmob.grade') }}{{ t('gradeLabel') }}</span>
          </h4>
          <p>{{ t('mmob.description') }}</p>
        </div>
        <div id="mdm" class="course-section">
          <h4>{{ t('mdm.title') }}
            <span class="grade" v-if="$i18n.locale === 'en'">{{ t('gradeLabel') }}{{ t('mdm.grade') }}</span>
            <span class="grade" v-else-if="$i18n.locale === 'zh'">{{ t('mdm.grade') }}{{ t('gradeLabel') }}</span>
          </h4>
          <p>{{ t('mdm.description') }}</p>
          <a href="/DM-A1-Yangfan-Yilun-Reem.zip" class="link" target="_blank">{{ t('mdm.linkA1') }}</a> |
          <a href="/INFOMDM2024-A2-Yangfan-Yilun-Reem.pdf" class="link" target="_blank">{{ t('mdm.linkA2') }}</a>
        </div>
        <div id="mcm" class="course-section">
          <h4>{{ t('mcm.title') }}
            <span class="grade" v-if="$i18n.locale === 'en'">{{ t('gradeLabel') }}{{ t('mcm.grade') }}</span>
            <span class="grade" v-else-if="$i18n.locale === 'zh'">{{ t('mcm.grade') }}{{ t('gradeLabel') }}</span>
          </h4>
          <p>{{ t('mcm.description') }}</p>
        </div>
        <div id="thesis" class="course-section">
          <h4>{{ t('graduationThesis.title') }}
            <span class="grade" v-if="$i18n.locale === 'en'">{{ t('gradeLabel') }}{{ t('graduationThesis.grade') }}</span>
            <span class="grade" v-else-if="$i18n.locale === 'zh'">{{ t('graduationThesis.grade') }}{{ t('gradeLabel') }}</span>
          </h4>
          <p>{{ t('graduationThesis.description') }}</p>
          <router-link class="link" to="/graduation-thesis">{{ t('graduationThesis.linkText') }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<i18n lang="yaml" locale="en">
firstYearTitle: "First Year"
secondYearTitle: "Second Year"
title: "Overview of Enrolled Master's Courses"
title-subtitle: "Utrecht University (HCI MSc Programme)"
intro:
  title: "My Coursework in HCI"
  description: "This page details the courses I completed during my HCI Master's at Utrecht University. I've included summaries and links to final projects or papers, reflecting my foundational knowledge and practical skills in the field."
contentTitle: "Table of Contents"
coursesTitle: "Course Details"
gradeLabel: "Grade: "
mcsp:
  title: "Advanced Cognitive and Social Psychology for HCI"
  grade: "7.4"
  description: |
    This course explored the application of social and cognitive psychology in HCI. In a group of five, we designed a 3D-minute interactive lecture on "Cognition, Motivation & Emotion," focusing on gamification. I also collaborated with a partner to develop a full research proposal on Gamification, which included a comprehensive literature review, research methods, and an analysis plan. Assessment was based on these projects and a final exam.
mlhvl:
  title: "Machine Learning for Human Vision and Language"
  grade: "8.3"
  description: |
    This course covered two main areas: the neuroscience of vision and its parallels with deep learning networks like CNNs, and the principles of NLP using models such as RNNs, Word2Vec, and LSTMs. Practical assignments required implementing a CNN from scratch in Python and building separate RNN and GloVe models for NLP tasks. The course was assessed via mid-term and final exams.
mvis:
  title: "Information Visualization"
  grade: "9.0"
  description: |
    This course introduced the principles of information visualization, from data types and perception to interaction design and evaluation. For the main project, our team chose to visualize the sustainability performance of fast fashion brands. We designed and implemented three visualizations—two standard charts and one innovative chart—to help consumers understand and compare the brands.
  linkText: "Project link (website)"
mqlm:
  title: "Advanced HCI Qualitative Research Methods"
  grade: "7.8"
  description: |
    This course covered advanced qualitative research methods, including data collection, analysis, and visualization. The main project involved conducting a complete qualitative study. Our group investigated user perceptions of smart home cameras, using focus groups and creative problem-solving to understand their attitudes and propose solutions to alleviate their concerns.
  linkText: "Paper link (PDF)"
mmmi:
  title: "Multimodal Interaction"
  grade: "8.0"
  description: |
    This course explored multimodal interaction, from its physiological basis (vision, motion, etc.) to VR/AR technologies and its interplay with emotion. My main project was a two-part study on gesture interaction with distant 2D screens in VR. First, I used the Wizard of Oz method to elicit user-defined gestures. Second, I implemented two of the most common gestures and conducted a qualitative comparison against Meta's default interaction using the think-aloud protocol.
  linkText: "View Project Details"
miti:
  title: "Interaction Technology Innovation"
  grade: "8.3"
  description: |
    In this project-based course, I designed and built a tangible interactive system for social connection. The project provided hands-on experience across the full prototyping stack: 3D modeling, ESP32-based electronics, and IoT firmware development.
  linkText: "View Project Details"
mqnm:
  title: "Advanced HCI Quantitative Research Methods"
  grade: "9.4"
  description: |
    This course covered advanced quantitative research methods, from parametric and non-parametric approaches (e.g., ANOVA, regression) to General Linear Models (GLM). For the main project, we were required to analyze a given dataset to answer a research question with at least two independent and two dependent variables. Our team analyzed the K-EmoPhone dataset to investigate whether personality traits influence physiological stress indicators (HRV, EDA) during social media use.
  linkText: "Paper link (PDF)"
mmob:
  title: "Mobile Interaction"
  grade: "7.9"
  description: |
    This course examined interaction with smartphones, tablets, and wearables, covering enabling technologies, UI design, evaluation, gestures, and mobile AR/VR. Through papers and demos, we analyzed how hardware, human factors, and context shape mobile interface design.
mdm:
  title: "Data Mining"
  grade: "8.5"
  description: |
    A core course in the Data Science master's program, covering theoretical foundations (PAC learning, VC-dimension) and key algorithms (decision trees, SVMs, logistic regression). I learned to select appropriate algorithms for given problems and conduct comparative experiments.
  linkA1: "Assignment 1 (ZIP)"
  linkA2: "Assignment 2 (PDF)"
mcm:
  title: "Cognitive Modeling"
  grade: "8.3"
  description: |
    This course explored three cognitive modeling approaches: symbolic (processing) models, connectionist (machine-learning) models, and probabilistic (Bayesian) models. For each, I completed an assignment to build and evaluate a model.
graduationThesis:
  title: "Research Project (Graduation Thesis)"
  grade: "8.7"
  description: |
    My thesis, "ZoomPursuit," addresses the inaccuracy and calibration drift that limit gaze interaction in standard GUIs. I designed and evaluated a novel technique that adapts calibration-free smooth pursuit to any unmodified application by repurposing system magnification. Through two sequential user studies (N=16 and N=7), I developed and refined a two-stage model integrating automated correction with manual refinement. The final design achieves a high pointing accuracy (0.10° error) from an uncalibrated state.
  linkText: "View project page"
</i18n>

<i18n lang="yaml" locale="zh">
firstYearTitle: "第一年"
secondYearTitle: "第二年"
title: "硕士修读课程概览"
title-subtitle: "Utrecht University (HCI硕士项目)"
intro:
  title: "我的HCI课程"
  description: "本页面详细介绍了我在乌得勒支大学HCI硕士期间完成的课程。我包含了课程总结和最终项目或论文的链接，反映了我在该领域的基础知识和实践技能。"
contentTitle: "目录"
coursesTitle: "课程详情"
gradeLabel: "分"
mcsp:
  title: "面向HCI的认知与社会心理学 (Advanced Cognitive and Social Psychology for HCI)"
  grade: "7.4"
  description: |
    本课程探讨社会与认知心理学在人机交互（HCI）领域的应用。我们以5人小组的形式，设计了一节以“认知、动机与情感”为主题的30分钟互动课程，并重点探讨了游戏化。我还与一位同学合作，完成了一份关于游戏化的完整研究提案，涵盖了文献综述、研究方法及分析讨论。课程评估包括这些项目和一次期末考试。
mlhvl:
  title: "面向人类视觉与语言的机器学习 (Machine Learning for Human Vision and Language)"
  grade: "8.3"
  description: |
    本课程涵盖两大领域：视觉的神经科学基础及其与CNN等深度学习网络的关联；自然语言处理的原理，包括RNNs、Word2Vec及LSTM等模型。实践作业要求我从零开始用Python实现一个CNN模型，并分别为自然语言处理任务构建了RNN和GloVe模型。课程通过期中和期末考试进行评估。
mvis:
  title: "信息可视化 (Information Visualization)"
  grade: "9.0"
  description: |
    本课程介绍了信息可视化的核心原则，从数据类型、人类感知到交互设计与评估方法。在主要项目中，我们小组选择可视化快时尚品牌的可持续性表现，为此设计并实现了三种图表——两种常规图表和一种创新图表，以帮助消费者理解和比较各个品牌。
  linkText: "项目链接（网页）"
mqlm:
  title: "高级HCI定性研究方法 (Advanced HCI Qualitative Research Methods)"
  grade: "7.8"
  description: |
    本课程涵盖了高级定性研究方法，包括数据收集、分析与可视化。主要项目是进行一项完整的定性研究。我们小组选择了“用户对智能家居摄像头的看法”为主题，采用焦点小组和创造性问题解决方法，深入探究了用户的态度，并为缓解他们的顾虑提出了相应的设计方案。
  linkText: "文章链接（PDF）"
mmmi:
  title: "多模态交互 (Multimodal Interaction)"
  grade: "8.0"
  description: |
    本课程探讨了多模态交互，从其生理基础（视觉、运动等）到VR/AR技术及其与情感的关联。我的主要项目是一项关于VR中与远处2D屏幕进行手势交互的两阶段研究。首先，我采用“Wizard of Oz”方法来诱导用户自定义手势。然后，我实现了两种最常见的手势，并运用“Think-aloud”方法，将它们与Meta的默认交互方式进行了定性对比研究。
  linkText: "查看项目详情"
miti:
  title: "交互技术创新 (Interaction Technology Innovation)"
  grade: "8.3"
  description: |
    在这门以项目为导向的课程中，我设计并实现了一个用于增进社交连接的实体交互系统。项目提供了全面的全栈原型技能实践：3d建模、基于esp32的电子原型开发，以及物联网固件开发。
  linkText: "查看项目详情"
mqnm:
  title: "高级HCI定量研究方法 (Advanced HCI Quantitative Research Methods)"
  grade: "9.4"
  description: |
    本课程涵盖高级定量研究方法，内容从参数化与非参数化方法（如方差分析、回归分析）到广义线性模型（GLM）。主要项目要求我们为给定的数据集提出一个研究问题（至少包含两个自变量和两个因变量）并进行分析。我们小组分析了K-EmoPhone数据集，旨在探究当人们使用社交媒体时，其人格特特质是否会影响心率变异性（HRV）和皮肤电活动（EDA）等生理压力指标。
  linkText: "论文链接（PDF）"
mmob:
  title: "移动交互 (Mobile Interaction)"
  grade: "7.9"
  description: |
    本课程探讨智能手机、平板和可穿戴设备的交互，涵盖了支撑技术、ui设计、评估方法、手势、移动游戏及ar/vr。我们通过分析论文与产品，学习硬件、人因和使用情境如何共同影响移动界面设计。
mdm:
  title: "数据挖掘 (Data Mining)"
  grade: "8.5"
  description: |
    数据科学硕士项目的核心课程，涵盖理论基础（如pac学习、vc维）与核心算法（如决策树、svm、逻辑回归）。我学习了为给定问题选择合适算法并进行对比实验。
  linkA1: "作业1（ZIP）"
  linkA2: "作业2（PDF）"
mcm:
  title: "认知建模 (Cognitive Modeling)"
  grade: "8.3"
  description: |
    本课程探讨了三种认知建模方法：符号（处理）模型、联结（机器学习）模型与概率（贝叶斯）模型。我为每种方法构建并评估了一个模型。
graduationThesis:
  title: "研究项目 (毕业论文)"
  grade: "8.7"
  description: |
    我的毕业论文《ZoomPursuit》旨在解决标准GUI中眼动交互的定位不准与校准漂移问题。我设计并评估了一种新颖的交互技术，它通过复用系统级放大功能，将免校准的平滑追视交互扩展至任意未经修改的应用程序。通过两项连续的用户研究（N=16与N=7），我开发并迭代出一个整合了自动校正和手动微调的两阶段模型。最终设计从未校准状态实现了高指向精度（0.10°误差）。
  linkText: "查看项目页面"
</i18n>

<style scoped lang="stylus">
.portfolio-page
  padding: 0 var(--page-padding)
  margin: 32px auto 56px auto
  max-width 1280px

.heading
  margin-bottom: 4px

.heading-subtitle
  color: var(--text-color-secondary)
  font-size: 18px
  font-weight: 600
  margin-bottom: 16px

.card
  padding-top: 24px
  padding-bottom: 24px

.course-section
  position: relative
  margin-top: 32px
  scroll-margin-top: 72px

.course-section.highlighted::before
  content: ''
  position: absolute
  top: -16px
  left: -16px
  right: -16px
  bottom: -16px
  z-index: -1
  border-radius: 12px
  background-color: transparent
  animation: highlight-fade 5s ease-out

h4
  margin-bottom: 0
  margin-top: 16px
  cursor: pointer
  user-select: none
  .grade
    font-size: 15px
    font-weight: 500
    color: var(--text-color-secondary)
    margin-left: 8px

hr
  margin: 32px 0

@keyframes highlight-fade
  0%
    background-color: transparent
  10%
    background-color: var(--accent-background)
  90%
    background-color: var(--accent-background)
  100%
    background-color: transparent

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

.content
  margin-bottom 32px


@media (min-width: 1200px)
  .main-content-card
    display grid
    grid-template-columns 360px 1fr
    grid-gap 8px
    column-gap: 40px

  hr
    display none

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

    &::-webkit-scrollbar
      width 8px
    &::-webkit-scrollbar-track
      background transparent
    &::-webkit-scrollbar-thumb
      background var(--text-color-hightlight)
      border-radius 4px

    .full-line
      grid-column unset

    .right
      grid-column unset
      width unset
      padding: 4px 16px
      margin-right 8px
</style>