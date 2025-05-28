<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="home-page">
    <p class="with-large-emoji">{{ t('introP1') }}<span class="hi-emoji">👋</span></p>
    <p>{{ t('introP2') }}</p>
    <p>{{ t('introP3') }}</p>
    <p>{{ t('introP4') }}</p>
    <p>
      {{ t('descToCV') }}
      <router-link to="cv" class="link">{{ t('linkToCV') }}</router-link>
      {{ t('descBeforeStudyPlan') }}
      <router-link to="portfolio" class="link">{{ t('linkToStudyPlan') }}</router-link>
      {{ t('descAfterStudyPlan') }}
    </p>

    <div class="email-button-container">
      <a class="email-button" href="mailto:x.chenyangfan@gmail.com">
        {{ t('reachOut') }}
      </a>
    </div>
    <swiper-container
      class="mySwiper"
      effect="cards"
      grab-cursor="true"
      swiper-shadow="false"
    >
      <swiper-slide>
        Slide 1
      </swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
    </swiper-container>
  </div>
</template>

<i18n lang="yaml" locale="en">
introP1: "Hi! I am CHEN Yangfan."
introP2: "I am currently a Master's student in Human-Computer Interaction program at Utrecht University. I hold a Bachelor's degree in Software Engineering from Nanjing University. "
introP3: "During my undergraduate studies at Nanjing University, I was attracted by the universality of web UI technology and chose to become a front-end engineer, working at WeChat for two years. However, I gradually realized that the work of a front-end engineer mainly focuses on engineering and efficiency, rather than the interactive technology and experience innovation that truly interested me. Therefore, I decided to continue my studies in Human-Computer Interaction. "
introP4: "Currently, I have a strong interest in Virtual Reality and Mixed Reality (VR/MR) technology, and I hope to pursue it as the next step in my future academic and career development."
descToCV: "You can check my"
linkToCV: "CV"
descBeforeStudyPlan: "and my"
linkToStudyPlan: "Study Plan"
descAfterStudyPlan: "during my Master's program to learn more about me。"
reachOut: "Reach Out by Email"
</i18n>

<i18n lang="yaml" locale="zh">
introP1: "Hi! 在下陈扬帆"
introP2: "我目前在乌特勒支大学（Utrecht University）人机交互硕士项目就读，本科毕业于南京大学软件工程专业。"
introP3: "在南京大学本科期间，我被web UI技术的普适性所吸引，选择成为一名前端工程师并在微信任职了两年。但我渐渐发现，前端工程师的工作主要聚焦于工程化和效率，而不是让我真正感兴趣的交互技术和体验的创新。于是我决定离开微信，重回象牙塔继续学习人机交互。"
introP4: "目前，我对虚拟现实与融合现实（VR/MR）技术非常感兴趣，并希望将其作为我未来学术和职业生涯的下一步发展方向。"
descToCV: "您可查看我的"
linkToCV: "简历"
descBeforeStudyPlan: "和"
linkToStudyPlan: "（硕士期间）课程计划"
descAfterStudyPlan: "来更深入了解我。"
reachOut: "邮箱联系"
</i18n>

<style scoped lang="stylus">
swiper-slide
  width 600px
  height 400px
  backdrop-filter blur(10px)
  background transparent

.home-page
  padding: 0 var(--page-padding)
  margin: 32px auto 56px auto
  max-width 730px
  font-size 18px

p
  margin 16px 0

.email-button
  padding 12px 16px
  font-size 15px
  border 1.5px solid var(--text-color)
  background var(--text-color)
  color var(--background-color)
  position relative

  &:before
    transition .1s
    z-index -1
    left -6px
    right -6px
    bottom -6px
    top -6px
    content ''
    position absolute
    background var(--background-color)

  &:hover:before

    background var(--text-color-hightlight)

.email-button-container
  margin: 24px 0
</style>