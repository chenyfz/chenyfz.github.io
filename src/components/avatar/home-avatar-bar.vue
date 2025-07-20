<script setup lang="ts">
import AvatarImage from "./avatar-image.vue";
import {useI18n} from "vue-i18n";
import ChatBubble from "../ui/chat-bubble.vue";

const { t } = useI18n()
</script>

<template>
  <div class="home-avatar-bar">
    <div class="home-avatar">
      <avatar-image></avatar-image>
      <div class="hi-emoji">👋</div>
    </div>

    <div>
      <chat-bubble>{{ t('greeting') }}</chat-bubble>
      <chat-bubble>{{ t('coreStrength') }}</chat-bubble>
      <chat-bubble>{{ t('ambition') }}</chat-bubble>
      <chat-bubble>{{ t('transition') }}</chat-bubble>
    </div>
  </div>
</template>

<i18n lang="yaml" locale="en">
greeting: "Hi! I'm Yangfan :D"
coreStrength: "I bring two key strengths to my work: experience in building large-scale, robust systems from my time at WeChat, and a foundation in human-centered design and research from my HCI studies."
ambition: "My goal is to combine these skills—to not only design novel user experiences but also bring them to life with effective engineering. I'm now seeking a PhD position where I can apply this integrated approach to challenges in tangible and immersive interaction."
transition: "Let me show you some of my work 👀"
</i18n>

<i18n lang="yaml" locale="zh">
greeting: "Hi！我是陈扬帆 :D"
coreStrength: "我的工作立足于两大优势：其一是在微信锻炼出的大规模、稳健的系统构建经验，其二是HCI学习所奠定的人本设计与研究方法的基础。"
ambition: "我的目标是结合这两种技能——不仅能设计出新颖的用户体验，更能通过高效的工程技术将其实现。我正在寻求博士职位，以应用这种整合的思路来应对实体及沉浸式交互领域的挑战。"
transition: "下面就带你看看我的项目吧 👀"
</i18n>

<style scoped lang="stylus">
.home-avatar-bar
  display grid
  grid-template-columns auto 1fr
  grid-gap 32px
  padding 20px 0 8px
  align-items self-end

.home-avatar
  position relative
  user-select none
  margin-bottom 8px

.hi-emoji
  position absolute
  left -12px
  bottom 0
  font-size 56px

.chat-bubble
  margin-top 6px
  max-width 640px

@media (max-width: 768px)
  .home-avatar-bar
    display grid
    grid-gap unset
    grid-template-columns auto

  .home-avatar
    justify-self self-end
    margin-bottom -48px

  .hi-emoji
    position absolute
    left -8px
    top 66px
    font-size 36px
</style>