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
        <ul class="styled-list">
          <li>{{ t('future.interest1') }}</li>
          <li>{{ t('future.interest2') }}</li>
          <li>{{ t('future.interest3') }}</li>
          <li>{{ t('future.interest4') }}</li>
        </ul>
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
    description: "By repurposing system-level magnification, I extended the core advantages of Smooth Pursuit interaction—accuracy, robustness, and calibration-free operation—to general-purpose GUIs."
    cta: "View Details & Download Paper"
    badge: "Freshly completed!"
  vrArMrProject:
    title: "VR/AR/MR"
    subtitle: "Natural Gesture in VR: An Elicitation Study and Implementation"
    description: "We conducted a Wizard of Oz elicitation study for natural gestures in VR. Based on the findings, we designed and implemented two novel gestures, then evaluated them in Unity against Meta's default interaction method."
    cta: "View Study & Reflection"
  prototypingProject:
    title: "Prototyping"
    subtitle: "The Enchanted Snow Globes"
    description: "A tangible interaction project aimed at enhancing remote social connection. My main contributions included interaction, industrial, and mechanical design, as well as ESP32-based embedded development."
    cta: "View Project & Reflection"
  researchMethods:
    title: "Foundations"
    subtitle: "HCI Research Methods"
    description: "Through systematic coursework in qualitative and quantitative research, I have applied these methods across various projects."
    link1: "Quantitative Paper ↗"
    link2: "Qualitative Paper ↗"
codebase: "Source code of this website: "
future:
  title: "What's Next? 🚀"
  content: "I am currently seeking a PhD position in Human-Computer Interaction."
  interest1: "VR/AR/MR Interaction"
  interest2: "Tangible & Hardware-based Interaction"
  interest3: "Human-AI Interaction"
  interest4: "Interaction Design for Specialized Hardware"
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
    cta: "查看详情并下载论文"
    badge: "新鲜出炉！"
  vrArMrProject:
    title: "VR/AR/MR"
    subtitle: "VR自然手势的诱导式研究与实现"
    description: "我们进行了一项VR自然手势的 Wizard of Oz 诱导式研究。基于研究发现，我们设计并实现了两种新手势，并最终在Unity中与Meta的默认交互方式进行了对比评估。"
    cta: "查看研究与反思"
  prototypingProject:
    title: "原型设计"
    subtitle: "魔法雪球"
    description: "一个旨在增进远程社交连接的实体交互项目。我的主要贡献包括交互、外形与机械结构设计，以及基于ESP32的嵌入式开发。"
    cta: "查看项目与反思"
  researchMethods:
    title: "基础"
    subtitle: "HCI研究方法"
    description: "通过系统性地学习定性与定量研究课程，我在多个项目中综合运用这些方法，以验证设计并提炼用户洞见。"
    link1: "定量研究论文 ↗"
    link2: "定性研究论文 ↗"
codebase: "网站源代码："
future:
  title: "下一步？🚀"
  content: "我正在寻求人机交互（HCI）领域的博士研究机会。"
  interest1: "VR/AR/MR中的交互"
  interest2: "可触知及基于硬件的交互"
  interest3: "人与AI的交互 (Human-AI Interaction)"
  interest4: "面向专用硬件的交互设计"
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

.showcase-links
  display: flex
  gap: 16px

@media (max-width: 768px)
  .showcase-grid
    grid-template-columns: 1fr
    gap: 16px
</style>