<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import HomeAvatarBar from "../components/avatar/home-avatar-bar.vue";
import ChatBubble from "../components/ui/chat-bubble.vue";
import ShortCv from "../components/cv/short-cv.vue";
import {ref} from "vue";
import TransformTransition from "../transitions/transform-transition.vue";
const { t } = useI18n()
const masterTabs = ['graduationProject', 'VR/AR/MR', 'researchMethods', 'prototyping']
const currentMasterTab = ref(masterTabs[0])
</script>

<template>
  <div class="home-page">
    <home-avatar-bar></home-avatar-bar>

    <div class="cv">
      <chat-bubble>{{ t('cv.title') }}</chat-bubble>
      <div class="cv-container">
        <short-cv></short-cv>
        <div class="full-cv-link">
          <router-link class="link" to="/cv"> > {{ t('cv.viewFullCv') }}</router-link>
        </div>
      </div>
    </div>

    <div class="master">
      <div class="bubbles-bar">
        <chat-bubble>{{ t('master.title') }}</chat-bubble>
      </div>
      <div class="master-content-container">
        <div class="master-tabs">
          <div
              class="tab"
              v-for="tab in masterTabs"
              :key="tab"
              :class="{ active: currentMasterTab === tab }"
              @click="currentMasterTab = tab"
          >
            {{ t(`master.tabs.${tab}`) }}
          </div>
        </div>
        <div class="master-content">
          <transform-transition direction="up" :duration-second="0.3">
            <div :key="currentMasterTab" v-if="currentMasterTab === 'graduationProject'">
              <h4 class="sub-title">{{ t('master.content.whatIsIt') }}</h4>
              <p>{{ t('master.content.graduationProjectSummary') }}</p>
              <h4 class="sub-title">{{ t('master.content.whatLearnedTitle') }}</h4>
              <p>{{ t('master.content.whatLearnedContent') }}</p>
              <router-link class="link" to="/graduation-thesis">{{ t('master.content.viewDetails') }}</router-link>
            </div>
            <div :key="currentMasterTab" v-if="currentMasterTab === 'VR/AR/MR'">
            </div>
            <div :key="currentMasterTab" v-if="currentMasterTab === 'researchMethods'">
            </div>
            <div :key="currentMasterTab" v-if="currentMasterTab === 'prototyping'">
            </div>
          </transform-transition>
        </div>
      </div>
    </div>

    <div class="tencent">
      <div class="bubbles-bar">
        <chat-bubble>Wait, I haven't told you about my role in WeChat. 🧐</chat-bubble>
      </div>
      <div class="tencent-content-container">
        todo
      </div>
    </div>

    <div class="skills">
      <div class="bubbles-bar">
        <chat-bubble>Let's summarize my skills and knowledge. 😎</chat-bubble>
      </div>
      <div class="skills-content-container">
        todo
      </div>
    </div>
  </div>
</template>

<i18n lang="yaml" locale="en">
cv:
  title: "Let me briefly introduce my experience 👀"
  viewFullCv: "View Full CV"
master:
  title: "You must be curious about what I did during my master's study! 🤔"
  tabs:
    graduationProject: "Graduation Project"
    "VR/AR/MR": "VR/AR/MR Courses"
    researchMethods: "Research Methods"
    prototyping: "Prototyping"
  content:
    graduationProject: "Content for Graduation Project."
    "VR/AR/MR": "Content for VR/AR/MR Courses."
    researchMethods: "Content for Research Methods."
    prototyping: "Content for Prototyping."
    graduationProjectSummary: "Zoom Pursuit, my ongoing thesis, introduces a radial-zoom stimulus to overcome calibration drift and lets users accurately point with their eyes in any unmodified desktop GUI."
    viewDetails: "> Read more"
    whatIsIt: "What is it about?"
    whatLearnedTitle: "What have I learned?"
    whatLearnedContent: "A full-stack journey covering literature review, requirement discovery, interaction design, iterative prototyping, production-level implementation, and a complete quantitative + qualitative evaluation. "
</i18n>

<i18n lang="yaml" locale="zh">
cv:
  title: "先简要介绍一下我的经历 👀"
  viewFullCv: "查看完整的简历"
master:
  title: "你一定很想知道我在硕士期间干了什么吧！🤔"
  tabs:
    graduationProject: "毕业设计"
    "VR/AR/MR": "VR/AR/MR 课程"
    researchMethods: "研究方法"
    prototyping: "原型设计"
  content:
    graduationProject: "毕业设计的内容。"
    "VR/AR/MR": "VR/AR/MR 相关课程设计的内容。"
    researchMethods: "研究方法的内容。"
    prototyping: "原型设计相关内容。"
    graduationProjectSummary: "正在进行的毕业论文 \"Zoom Pursuit\" 通过径向放大刺激修正校准漂移，使用户在无需修改软件的情况下，于任意桌面界面精准进行凝视指向。"
    viewDetails: "> 查看详情"
    whatIsIt: "项目简介"
    whatLearnedTitle: "我学到了什么？"
    whatLearnedContent: "从文献调研、需求发现、交互设计、迭代试错、形成可用设计，到复杂代码实现，以及完整的定量+定性实验设计与数据分析，全链路实践。"
</i18n>

<style scoped lang="stylus">
.home-page
  max-width 800px
  margin 16px auto 64px
  padding 0 var(--page-padding)

.cv
.master
.tencent
.skills
  margin-bottom 24px

  .cv-container
    z-index 0
    margin -20px -8px 16px
    padding 16px 24px
    border-radius 0 16px 16px 16px
    background var(--background-50-transparent)
    backdrop-filter blur(40px)

.chat-bubble
  position relative
  z-index 2

.full-cv-link
  margin-top 12px

.master-content-container
  margin-top 16px
  display grid
  grid-gap 16px
  grid-template-columns max-content 1fr

.master-tabs
  display grid
  grid-gap 16px
  grid-template-columns 1fr

  .tab
    cursor pointer
    background var(--background-30-transparent)
    border 2px solid var(--border-chat-bubble)
    border-radius 4px
    padding 8px 16px
    transition .2s

    &.active
      background: var(--background-transition-border) center / cover border-box
      &:hover
        background: var(--background-transition-border) center / cover border-box
        filter brightness(1.1)

    &:hover
      background var(--background-50-transparent)
      filter brightness(1.1)


.master-content
  p
    margin 0 0 8px 0
  .link
    margin-top 4px
  .sub-title
    font-weight 600
    margin 0 0 4px 0

@media (max-width: 768px)
  .tab
    font-size 14px

  .master-content-container
    grid-template-columns 1fr

  .master-tabs
    grid-template-columns 1fr 1fr 1fr 1fr

@media (max-width: 500px)
  .master-tabs
    grid-template-columns 1fr 1fr

@media (min-width: 769px)
  .master-content-container
    display grid
    grid-template-columns auto 1fr

</style>