<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import HomeAvatarBar from '../components/avatar/home-avatar-bar.vue'
import ChatBubble from '../components/ui/chat-bubble.vue'
import ShortCv from '../components/cv/short-cv.vue'
const { t } = useI18n()
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
            <div class="subtitle">{{ t('master.researchMethods.subtitle') }}</div>
          </div>
          <p class="description">{{ t('master.researchMethods.description') }}</p>
          <div class="showcase-links">
            <a class="link" href="/infomqnm-report.pdf" target="_blank">{{
              t('master.researchMethods.link1')
            }}</a>
            <a class="link" href="/Group_30_Final_Paper.pdf" target="_blank">{{
              t('master.researchMethods.link2')
            }}</a>
          </div>
        </div>
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
cv:
  viewFullCv: "View Full CV"
master:
  title: "You must be curious about what I did during my master's study! 🤔"
  graduationProject:
    title: "Graduation Project"
    subtitle: "ZoomPursuit: Smooth Pursuit-based Gaze Interaction for General-Purpose GUIs"
    description: "I extended the core advantages of Smooth Pursuit interaction (accuracy, robustness, and calibration-free) to general-purpose GUIs by repurposing system-level magnification."
    cta: "View Paper & Reflection"
    badge: "Freshly completed!"
  vrArMrProject:
    title: "VR/AR/MR"
    subtitle: "Natural Gesture in VR: An Elicitation Study and Implementation"
    description: "We conducted a Wizard of Oz elicitation study for natural gestures in VR. Based on our findings, we designed, implemented, and evaluated two novel gestures against Meta's default interaction method."
    cta: "View Study & Reflection"
  prototypingProject:
    title: "Prototyping"
    subtitle: "The Enchanted Snow Globes"
    description: "I lead a tangible interaction project for enhancing remote social connection. My roles spanned interaction, industrial, and mechanical design, through which I developed expertise in 3D modeling and 3D printing."
    cta: "View Project & Reflection"
  researchMethods:
    title: "Foundations"
    subtitle: "HCI Research Methods"
    description: "I learned qualitative and quantitative HCI research methods through systematic coursework, and applied them across various projects."
    link1: "Quantitative Paper ↗"
    link2: "Qualitative Paper ↗"
codebase: "Source code of this website: "
future:
  title: "What's Next? 🚀"
  content: "I am currently seeking a PhD position in Human-Computer Interaction. My main research interests are:"
  interest1:
    title: "XR Interaction Design"
    description: "I am fascinated by the immersion of XR, an experience often broken by clunky interaction. This fuels my interest in how to design magical interactions that transcend physical rules yet remain intuitive for users accustomed to the physical world."
  interest2:
    title: "Human-AI Interaction"
    description: "The rise of LLMs offers new opportunities in interaction design. My interest lies in exploring AI's potential as a collaborative partner. I am particularly interested in how this new paradigm can enable systems to flexibly understand user intent, automate workflows, and support diverse needs through multi-modal and educational capabilities."
  interest3:
    title: "Accessibility"
    description: "My MSc graduation project originally aimed to optimize gaze interaction for users with motor disabilities. Though the project's scope changed due to time and ethical constraints, the process of literature review and interaction design deepened my understanding of how technology can support users with diverse needs. As an empathetic person, I am motivated by the potential of creating social value and contributing to a more equitable digital world."
  interest4:
    title: "Tangible Design & Specialized Hardware for XR"
    description: "Tasks like efficient text entry remain a challenge in XR, sparking my interest in designing specialized physical hardware to address these gaps. For example, I am thinking about conceptual designs for a portable text-entry device. I believe sophisticated hardware solutions can forge new paths in interaction design."
</i18n>

<i18n lang="yaml" locale="zh">
cv:
  viewFullCv: "查看完整的简历"
master:
  title: "你一定很想知道我在硕士期间干了什么吧！🤔"
  graduationProject:
    title: "毕业设计"
    subtitle: "ZoomPursuit: 基于平滑追视的通用GUI眼动交互"
    description: "通过复用系统级放大功能，我将 Smooth Pursuit 交互的核心优点（精度高、鲁棒性强、免校准）扩展至任意通用2D GUI。"
    cta: "查看论文和一些想法"
    badge: "新鲜出炉！"
  vrArMrProject:
    title: "VR/AR/MR"
    subtitle: "VR自然手势的诱导式研究与实现"
    description: "我们进行了一项VR自然手势的 Wizard of Oz 诱导式研究。基于研究发现，我们设计并实现了两种新手势，并最终在Unity中与Meta的默认交互方式进行了对比评估。"
    cta: "查看研究与反思"
  prototypingProject:
    title: "原型设计"
    subtitle: "魔法雪球"
    description: "我主导了一个旨在增强远程社交联系的实体交互项目。我的职责包括交互、工业与机械结构设计，以及基于ESP32的嵌入式开发。我在此过程中尤其深入学习了3D建模与3D打印技能。"
    cta: "查看项目与反思"
  researchMethods:
    title: "基础"
    subtitle: "HCI研究方法"
    description: "我系统性地通过课程学习了定性与定量的HCI研究方法，并将它们应用到了多个项目中。"
    link1: "定量研究论文 ↗"
    link2: "定性研究论文 ↗"
codebase: "网站源代码："
future:
  title: "下一步？🚀"
  content: "我正在寻求人机交互（HCI）领域的博士研究机会。我的主要研究兴趣如下："
  interest1:
    title: "XR 交互设计"
    description: "XR 的沉浸感令我着迷，但当前的交互设计却时常打破这种体验。这让我一直思考一个问题：在 XR 这个可以超越物理规则的世界里，我们该如何为已经习惯于物理世界规则的用户，设计出真正直观、高效且不破坏沉浸感的交互方法？"
  interest2:
    title: "Human-AI Interaction"
    description: "LLM 的兴起提供了新的交互设计的机会。例如，我感兴趣的是，AI 能否在人与计算机之间扮演一个中介或者伙伴的角色，形成新的交互范式？我想探索这种模式如何能更灵活地理解用户意图（而非限制于费时费力预先设定的程序逻辑）、自动化复杂工作流，并为有特殊需求的用户提供帮助（利用AI的多模态能力以及在教学方面的潜力）等。"
  interest3:
    title: "Accessibility"
    description: "我的毕业设计最初是想为运动障碍人士优化眼动交互。虽然项目因现实因素（招募难度、伦理考量等）调整了方向，但其过程让我深入了解技术可以如何帮助他人。我是一个非常有同理心的人，如果我的研究工作能够产出真实的社会价值，惠及有需要的人群，会让我很开心。"
  interest4:
    title: "Tangible Design & XR 专用硬件设计"
    description: "我认为一些交互，比如高效的文本输入，在XR中仍然是重大的挑战。我一直对设计专用的实体硬件来解决这类问题很感兴趣，并有一些关于便携式文本输入设备的想法想要探索。总的来说，我认为巧妙的硬件设计能够另辟蹊径。"
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

.showcase .link
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

@media (max-width: 768px)
  .showcase-grid
    grid-template-columns: 1fr
    gap: 16px
</style>