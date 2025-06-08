<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import HomeAvatarBar from "../components/avatar/home-avatar-bar.vue";
import ChatBubble from "../components/ui/chat-bubble.vue";
import ShortCv from "../components/cv/short-cv.vue";
import {ref} from "vue";
import TransformTransition from "../transitions/transform-transition.vue";

const { t } = useI18n()
const masterTabs = ['graduationProject', 'vrMrCourses', 'researchMethods', 'others']
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
            <div :key="currentMasterTab">
              <p>{{ t(`master.content.${currentMasterTab}`) }}</p>
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
    vrMrCourses: "VR/MR Courses"
    researchMethods: "Research Methods"
    others: "Others"
  content:
    graduationProject: "Content for Graduation Project."
    vrMrCourses: "Content for VR/MR Courses."
    researchMethods: "Content for Research Methods."
    others: "Content for Others."
</i18n>

<i18n lang="yaml" locale="zh">
cv:
  title: "先简要介绍一下我的经历 👀"
  viewFullCv: "查看完整的简历"
master:
  title: "你一定很想知道我在硕士期间干了什么吧！🤔"
  tabs:
    graduationProject: "毕业设计"
    vrMrCourses: "VR/MR课程"
    researchMethods: "研究方法"
    others: "其他"
  content:
    graduationProject: "毕业设计的内容。"
    vrMrCourses: "VR/MR相关课程设计的内容。"
    researchMethods: "研究方法的内容。"
    others: "其他内容。"
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
  color  red

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