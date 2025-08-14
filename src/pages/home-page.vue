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

    <section class="card cv-card">
      <short-cv />
      <router-link class="link" to="/cv">{{ t('cv.viewFullCv') }}</router-link>
    </section>

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
    description: "I present a technique that extends smooth pursuit to any GUI by repurposing system magnification, retaining its high accuracy, robustness, and calibration-free nature."
    cta: "View Details & Download Paper"
    badge: "Freshly completed!"
  vrArMrProject:
    title: "VR/AR/MR"
    subtitle: "Natural Gesture in VR: An Elicitation Study and Implementation"
    description: "We conducted a 'Wizard of Oz' user study to elicit and collect user-defined natural gestures, then designed and implemented two novel gestures based on the findings. These were evaluated in Unity against Meta's default interaction method."
    cta: "View Study & Reflection"
  prototypingProject:
    title: "Prototyping"
    subtitle: "The Enchanted Snow Globes"
    description: "A tangible interaction project to enhance social connection. I contributed to its development, including 3D modeling and printing, ESP32-based electronics, and embedded programming."
    cta: "View Project & Reflection"
  researchMethods:
    title: "Foundations"
    subtitle: "HCI Research Methods"
    description: "Applied qualitative and quantitative methods in various projects to validate designs and uncover user insights."
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
    description: "我提出了一种将平滑追视技术扩展到任意GUI的方法，它通过复用系统级放大功能，保留了平滑追视高精度、高鲁棒性和免校准的优点。"
    cta: "查看详情并下载论文"
    badge: "新鲜出炉！"
  vrArMrProject:
    title: "VR/AR/MR"
    subtitle: "VR自然手势的诱导式研究与实现"
    description: "我们通过“Wizard of Oz”方法诱导并收集用户定义的自然手势，并基于此设计、实现了两种新手势。最终，在Unity中将它们与Meta的默认交互方式进行对比验证。"
    cta: "查看研究与反思"
  prototypingProject:
    title: "原型设计"
    subtitle: "魔法雪球"
    description: "一个旨在增进远程社交连接的实体交互项目。我参与了3D建模与打印、基于ESP32的电路原型、以及嵌入式开发等工作。"
    cta: "查看项目与反思"
  researchMethods:
    title: "基础"
    subtitle: "HCI研究方法"
    description: "在多个项目中综合运用定性与定量方法，以验证设计并洞察用户需求。"
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
  transition: background 0.2s ease

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
    background: var(--background-30-transparent)

  &:hover
    background: var(--background-75-transparent)

  &.informational:hover
    background: var(--background-30-transparent)

.showcase-links
  display: flex
  gap: 16px

@media (max-width: 768px)
  .showcase-grid
    grid-template-columns: 1fr
    gap: 16px
</style>