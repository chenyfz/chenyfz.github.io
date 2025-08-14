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
      <chat-bubble>{{ t('passion') }}</chat-bubble>
      <chat-bubble>{{ t('ambition') }}</chat-bubble>
      <chat-bubble>{{ t('transition') }}</chat-bubble>
    </div>
  </div>
</template>

<i18n lang="yaml" locale="en">
greeting: "Hi! I'm Yangfan :D"
passion: "I'm passionate about exploring novel interactions, a process that consistently sparks my creativity."
ambition: "I leverage my engineering background from WeChat and HCI research skills from my master's to assess ideas for value and feasibility. My goal is to pursue a PhD, applying an approach that combines creativity with rigorous analysis to envision and build the next generation of interactive systems."
transition: "Below is a brief overview of my journey 👀"
</i18n>

<i18n lang="yaml" locale="zh">
greeting: "Hi！我是陈扬帆 :D"
passion: "我热衷于探索新颖的交互设计，这总能激发我的创造力。"
ambition: "我在微信的工程经验与HCI的学术训练，帮助我严谨地评估这些想法的价值与可行性。我希望攻读博士学位，将这种结合了创造性与严谨分析的模式，用于构想并实现下一代交互系统。"
transition: "以下是我的过往经历简介 👀"
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