<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@unhead/vue'
import HomeAvatarBar from '../components/avatar/home-avatar-bar.vue'
import ChatBubble from '../components/ui/chat-bubble.vue'
import ShortCv from '../components/cv/short-cv.vue'

const { t } = useI18n()
useHead({
  title: computed(() => t('pageTitle')),
  meta: [{ name: 'description', content: computed(() => t('pageDescription')) }],
})
</script>

<template>
  <div class="home-page">
    <home-avatar-bar />

    <router-link to="/cv" class="card cv-card">
      <short-cv />
      <div class="link">{{ t('cv.viewFullCv') }}</div>
    </router-link>

    <section class="showcase">
      <chat-bubble>{{ t('master.title') }}</chat-bubble>
      <div class="showcase-grid">
        <!-- Graduation Project -->
        <router-link to="/graduation-thesis" class="card showcase-card">
          <div v-if="t('master.graduationProject.badge')" class="badge">
            {{ t('master.graduationProject.badge') }}
          </div>
          <div class="header">
            <h3 class="title">{{ t('master.graduationProject.title') }}</h3>
            <div class="subtitle">{{ t('master.graduationProject.subtitle') }}</div>
          </div>
          <p class="description">{{ t('master.graduationProject.description') }}</p>
          <div class="link">{{ t('master.graduationProject.cta') }}</div>
        </router-link>

        <!-- Prototyping Project -->
        <router-link to="/snow-globe" class="card showcase-card">
          <div class="header">
            <h3 class="title">{{ t('master.prototypingProject.title') }}</h3>
            <div class="subtitle">{{ t('master.prototypingProject.subtitle') }}</div>
          </div>
          <p class="description">{{ t('master.prototypingProject.description') }}</p>
          <div class="link">{{ t('master.prototypingProject.cta') }}</div>
        </router-link>

        <!-- VR/AR/MR Project -->
        <router-link to="/multimodal-interaction" class="card showcase-card">
          <div class="header">
            <h3 class="title">{{ t('master.vrArMrProject.title') }}</h3>
            <div class="subtitle">{{ t('master.vrArMrProject.subtitle') }}</div>
          </div>
          <p class="description">{{ t('master.vrArMrProject.description') }}</p>
          <div class="link">{{ t('master.vrArMrProject.cta') }}</div>
        </router-link>

        <!-- Research Methods -->
        <div class="card showcase-card informational">
          <div class="header">
            <h3 class="title">{{ t('master.researchMethods.title') }}</h3>
            <div class="subtitle" v-if="t('master.researchMethods.subtitle')">{{ t('master.researchMethods.subtitle') }}</div>
          </div>
          <p class="description">{{ t('master.researchMethods.description') }}</p>
          <div class="showcase-links">
            <a class="link" href="/Group_30_Final_Paper.pdf" target="_blank">{{
                t('master.researchMethods.link2')
              }}</a>
            <a class="link" href="/infomqnm-report.pdf" target="_blank">{{
              t('master.researchMethods.link1')
            }}</a>
          </div>
        </div>
        <router-link to="/masters-courses" class="link all-courses-link">
          {{ t('master.viewAllCourses') }}
        </router-link>
      </div>
    </section>

    <section class="showcase">
      <chat-bubble>{{ t('future.title') }}</chat-bubble>
      <div class="card">
        <p>{{ t('future.content') }}</p>
        <div class="interest-list">
          <div class="interest-item">
            <h4>{{ t('future.interest1.title') }}</h4>
            <p>{{ t('future.interest1.description') }}</p>
          </div>
          <div class="interest-item">
            <h4>{{ t('future.interest2.title') }}</h4>
            <p>{{ t('future.interest2.description') }}</p>
          </div>
          <div class="interest-item">
            <h4>{{ t('future.interest3.title') }}</h4>
            <p>{{ t('future.interest3.description') }}</p>
          </div>
          <div class="interest-item">
            <h4>{{ t('future.interest4.title') }}</h4>
            <p>{{ t('future.interest4.description') }}</p>
          </div>
        </div>
      </div>
    </section>

    <div class="code-base">
      {{ t('codebase')
      }}<a
        href="https://github.com/chenyfz/chenyfz.github.io"
        class="link"
        target="_blank"
      >
        https://github.com/chenyfz/chenyfz.github.io
      </a>
    </div>
  </div>
</template>

<i18n lang="yaml" locale="en">
pageTitle: "Chen, Y. (Yangfan) - HCI Researcher"
pageDescription: "Yangfan Chen - HCI Master's graduate seeking PhD. Research interests: XR interaction, Human-AI interaction, accessibility."
cv:
  viewFullCv: "View Full CV"
master:
  title: "You must be curious about what I did during my master's study! 🤔"
  graduationProject:
    title: "Graduation Project"
    subtitle: "ZoomPursuit: Smooth Pursuit Gaze Interaction for General-Purpose GUIs"
    description: "Gaze interaction based on Smooth Pursuit offers high accuracy, robustness, and freedom from calibration, but often requires modifying the user interface to inject dynamic stimuli, limiting its use in general-purpose GUIs. My work extends Smooth Pursuit's core advantages to any 2D GUI by repurposing the system-level magnification function."
    cta: "View Paper & Reflection"
    badge: "Freshly completed!"
  vrArMrProject:
    title: "XR"
    subtitle: "Natural Gestures for Interacting with Distant 2D GUIs in XR"
    description: "2D GUIs will likely persist in XR environments, where interaction gestures may differ from those for 3D objects. We conducted a Wizard of Oz elicitation study, and based on the results, we designed and implemented two novel gestures. Finally, we qualitatively evaluated them against Meta's hand-ray interaction. My graduation project also initially focused on XR."
    cta: "View Study & Reflection"
  prototypingProject:
    title: "Prototyping & Fabrication"
    subtitle: "The Enchanted Snow Globes Course Project"
    description: "In a course, we completed a tangible interaction prototype for enhancing remote social connection. My roles included interaction, industrial, and mechanical design, and I assisted with the ESP32-based embedded development. Through this process, I gained in-depth skills in 3D modeling, 3D printing, and IoT technologies."
    cta: "View Project"
  researchMethods:
    title: "HCI Academic Research Methods"
    subtitle: ""
    description: "Two solid courses on qualitative and quantitative research methods. In the qualitative course, we studied user attitudes towards smart locks and proposed solutions to increase their adoption. In the quantitative course, we used a public dataset to explore the relationship between the Big Five personality model and stress during social media use (based on HRV and EDA signals)."
    link1: "Quantitative Paper ↗"
    link2: "Qualitative Paper ↗"
  viewAllCourses: "View All My Enrolled Master's Courses"
codebase: "Source code of this website: "
future:
  title: "What's Next? 🚀"
  content: "I am currently seeking a PhD position in Human-Computer Interaction / Interaction Design. My main research interests are:"
  interest1:
    title: "XR Interaction Design"
    description: "I am fascinated by the immersion of XR, but current interactions often break this experience, driving me to explore alternatives. My main focus is on a key question: in XR, where the rendered world doesn't have to follow the laws of physics, how can we leverage various sensors and interaction designs to enable users, who are accustomed to the physical world, to transcend physical rules and achieve natural, efficient, and immersive interactions?"
  interest2:
    title: "Human-AI Interaction"
    description: "The rise of LLMs presents vast possibilities. A key change is that the relatively low cost of AI can meet more long-tail needs, improving the quality of life for groups with smaller user populations. Before the rise of LLMs, mainstream needs were automated with costly pre-defined if-then logic, which served users at a low marginal cost due to economies of scale. Niche, long-tail needs lacked this scale and relied on expensive human labor. AI allows better coverage for long-tail needs. Furthermore, Human-AI Interaction may spawn new paradigms beyond current mainstream methods. For instance, AI can act as an 'intermediary' or 'collaborator' between humans and computers, more flexibly understanding user intent, automating complex workflows, and supporting users with special needs through its multimodal and educational capabilities."
  interest3:
    title: "Accessibility"
    description: "My MSc graduation project originally aimed to optimize gaze interaction assistive software for users with motor disabilities. Though the project's scope changed due to practical constraints like recruitment and ethics, the process deepened my understanding of how technology can support users with diverse needs. As an empathetic person, I am motivated by the potential of creating social value and contributing to a more equitable digital world."
  interest4:
    title: "Tangible Design & Specialized Hardware for XR"
    description: "Tasks like efficient text entry remain a challenge in XR, sparking my interest in designing specialized physical hardware to address these gaps. For example, I am thinking about conceptual designs for a portable text-entry device. I believe sophisticated hardware solutions can forge new paths in interaction design."
</i18n>

<i18n lang="yaml" locale="zh">
pageTitle: "陈扬帆 - HCI 研究者"
pageDescription: "陈扬帆 - HCI硕士毕业，正在寻找PhD机会。研究兴趣：XR交互、Human-AI交互、无障碍设计。"
cv:
  viewFullCv: "查看完整的简历"
master:
  title: "你一定好奇我在硕士期间干了什么吧！🤔"
  graduationProject:
    title: "毕业设计"
    subtitle: "ZoomPursuit: Smooth Pursuit-based Gaze Interaction for General-Purpose GUIs"
    description: "基于Smooth Pursuit的眼动交互具有准确度高、鲁棒、免校准等优点，但常因为需要注入动态刺激而无法用于通用GUI中。本工作利用系统级的放大功能，在保留Smooth Pursuit方法的核心优势的同时将其扩展至任意通用2D GUI。"
    cta: "查看论文和一些完成之后的感想"
    badge: "新鲜出炉！"
  vrArMrProject:
    title: "XR"
    subtitle: "XR环境中与远处2D GUI交互的自然手势研究"
    description: "XR环境中2D GUI仍将长期存在，而用户与其交互的手势可能与3D物件交互不同。我们设计了一个 Wizard of Oz的诱导式研究，然后基于结果设计并实现了两种手势，最后将它们与Meta的hand-ray交互一起定性评估。我的毕业设计初期也围绕XR展开。"
    cta: "查看研究与反思"
  prototypingProject:
    title: "原型设计与制造"
    subtitle: "魔法雪球课程项目"
    description: "在一门课程中我们完成了一个旨在增强远程社交联系的实体交互原型。其中我的职责包括交互、工业和机械结构设计，并协助ESP32的嵌入式开发。在此过程中我尤其深入学习了3D建模、3D打印以及IoT技术。"
    cta: "查看项目"
  researchMethods:
    title: "HCI学术研究方法"
    subtitle: ""
    description: "两门扎实的定性与定量研究课程。在定性研究课程中，我们研究用户对智能门锁的态度，并尝试提出提高智能门锁接受度的解决方案。在定量研究课程中，我们使用公开数据集探索Big Five人格模型与社交媒体使用时的压力（基于HRV和EDA信号）的关系。"
    link1: "定量研究论文 ↗"
    link2: "定性研究论文 ↗"
  viewAllCourses: "进一步查看我所选修的硕士课程"
codebase: "网站源代码："
future:
  title: "下一步想做什么？🚀"
  content: "我正在寻找人机交互/交互设计领域的PhD研究机会。我主要的研究兴趣为："
  interest1:
    title: "XR 交互设计"
    description: "我很着迷于XR的沉浸感，但当前XR中的交互却时常打破这种沉浸感，我想探索当前方案之外的交互方式。我主要的思考点在于：XR所渲染的世界并不一定需要遵守现实世界的物理规则，但用户却高度习惯于真实的物理世界。我们是否有可能利用各种传感器以及交互设计，让用户超越物理规则，达成自然、高效又不破坏沉浸感的交互方法？"
  interest2:
    title: "Human-AI Interaction"
    description: "LLM 的兴起带来了巨大的可能性。一个核心的变化是，AI 相对低廉的使用成本能够让更多长尾需求得到满足，从而改善许多小众人群的生活质量。在 AI 出现之前，大众化的需求通常依靠费时费力的 if-then 逻辑来实现自动化，由于具备规模效应，可以以较低的边际成本服务用户；而小众的长尾需求则缺乏这种规模效应，只能依赖昂贵的人力来解决。AI 的出现将改变这一现状，使长尾需求也能得到更好覆盖。更进一步，Human-AI Interaction 中可能催生出新的交互范式，而不仅仅是延续当前主流的交互方式。例如，AI 可以在人与计算机之间扮演“中介”或“合作者”的角色，更灵活地理解用户意图，自动化复杂的工作流，并借助多模态能力与教学潜力为有特殊需求的用户提供支持。"
  interest3:
    title: "Accessibility"
    description: "我的毕业设计最初是想为运动障碍人士优化眼动交互辅助软件。虽然项目因现实因素（招募难度、伦理考量等）调整了方向，但其过程让我深入了解技术可以如何帮助他人。我是一个非常有同理心的人，如果我的研究工作能够产出真实的社会价值，惠及有需要的人群，我会很开心。"
  interest4:
    title: "Tangible Design & XR 专用硬件设计"
    description: "我认为一些交互场景（比如高效的文本输入）在XR中仍然是重大挑战。我一直对设计专用的实体硬件来解决这类问题很感兴趣，并有好多点子想要探索。总的来说，我认为巧妙的硬件或许能够另辟蹊径解决一些XR中的难题。"
</i18n>

<style scoped lang="stylus">
.home-page
  display: grid
  gap: 24px
  max-width: 910px
  margin: 16px auto 64px
  padding: 0 var(--page-padding)

.showcase > .card,
.showcase > .showcase-grid
  margin-top: 16px

.showcase-card .link
  margin-top: 16px

.showcase-grid
  display: grid
  grid-template-columns: 1fr 1fr
  gap: 12px

  h4
    font-size: 16px
    font-weight: 600
    margin-top: 8px
    margin-bottom: 8px
    &:first-child
      margin-top: 0

  p
    color: var(--text-color-70)

  .styled-list
    padding-left: 20px
    color: var(--text-color-70)
    li
      margin-bottom: 8px
      &:last-child
        margin-bottom: 0

.cv-card
  .short-cv
    margin-bottom: 8px

.showcase-card
  .badge
    position: absolute
    top: -1px
    right: -1px
    background: var(--accent-color)
    color: white
    padding: 4px 12px
    border-radius: 0 4px 0 4px
    font-size: 14px
    font-weight: 600

  .header
    margin-bottom: 16px

  .title
    font-size: 18px
    font-weight: 600
    margin-bottom: 4px
    margin-top: 4px

  .subtitle
    color: var(--text-color-secondary)
    font-size: 14px

  .description
    flex-grow: 1
    margin: 0
    font-size: 15px

  .tags
    display: flex
    flex-wrap: wrap
    gap: 8px
    margin-top: 16px
    flex-grow: 1

  .tag
    background: var(--accent-color-transparent)
    padding: 2px 8px
    border-radius: 4px
    font-size: 13px
    font-weight: 500
    color: var(--accent-color)

  &.informational
    background: var(--background-50-transparent)

    &:hover
      background: var(--background-50-transparent)

.all-courses-link
  grid-column: 1 / -1
  color: var(--link-color)
  padding: 4px 0
  margin: 0 4px

.interest-item
  margin-top: 16px

  h4
    font-weight: 600
    margin-top: 0
    margin-bottom: 4px
  p
    margin-top: 0

.showcase-links
  display: flex
  gap: 16px

.code-base
  margin-top: 16px
  font-size: 14px
  color: var(--text-color-secondary)

@media (max-width: 768px)
  .showcase-grid
    grid-template-columns: 1fr
    gap: 16px
</style>