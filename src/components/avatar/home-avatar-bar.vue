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
      <chat-bubble>{{ t('introduction') }}</chat-bubble>
      <chat-bubble>{{ t('summary') }}</chat-bubble>
      <chat-bubble>{{ t('interests') }}</chat-bubble>
      <chat-bubble>{{ t('lookingFor') }}</chat-bubble>
      <chat-bubble>{{ t('cvTitle') }}</chat-bubble>
    </div>
  </div>
</template>

<i18n lang="yaml" locale="en">
introduction: "Hi! I'm Yangfan :D"
summary: "I love bridging the gap between deep engineering and human-centered design. My experience at WeChat taught me how to build robust, scalable systems, while my HCI Master's gave me the tools to rigorously research and create novel interactions."
interests: "This passion drives my work on future interfaces. For my thesis, ZoomPursuit, I developed a novel eye-tracking technique that works on any standard computer—a small step toward making interaction more natural and immersive."
lookingFor: "Now, I'm looking for a PhD or EngD position where I can tackle these kinds of challenges head-on."
cvTitle: "Let me briefly introduce my experience 👀"
</i18n>

<i18n lang="yaml" locale="zh">
introduction: "Hi！我是陈扬帆 :D"
summary: "我热衷于在深度工程实现与人本设计之间搭建桥梁。在微信的经历教会我如何构建稳健、可扩展的系统，而人机交互硕士的训练则让我掌握了严谨研究并创造新颖交互的方法。"
interests: "这份热情驱动着我对未来交互的探索。我的硕士论文项目 ZoomPursuit 就是一个例子：我独立研发了一种适用于任何普通电脑的眼动追踪新技术——这是我为实现更自然、更沉浸的交互所迈出的一小步。"
lookingFor: "现在，我正在积极寻找相关的博士（PhD）或工程博士（EngD）的机会，希望能直面这些领域的挑战。"
cvTitle: "先简要介绍一下我的经历 👀"
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