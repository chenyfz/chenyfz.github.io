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
    </div>
  </div>
</template>

<i18n lang="yaml" locale="en">
introduction: "Hi! I am Yangfan :D"
summary: "I have a background in software engineering. My strength is working within real-world constraints to find the best balance and deliver reliable, thoughtful products."
interests: "I love innovating in interaction tech, especially in fields like mixed reality, eye-tracking, and tangible interaction. My goal is to combine deep technical skills with a human-centered approach to create more natural and immersive experiences."
lookingFor: "I'm looking for PhD or EngD opportunities right now."
</i18n>

<i18n lang="yaml" locale="zh">
introduction: "Hi！我是陈扬帆 :D"
summary: "我拥有软件工程的背景，擅长在各种现实条件的约束下，寻找最佳平衡点，最终交付出可靠又经过深思熟虑的好产品。"
interests: "我着迷于交互技术的创新，尤其是混合现实、眼动追踪和实体交互等方向。我希望将技术深度与以人为本的设计理念相结合，去创造更自然、更沉浸的体验。"
lookingFor: "我正在找PhD或者EngD的岗位。"
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