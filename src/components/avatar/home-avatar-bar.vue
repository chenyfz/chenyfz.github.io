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
      <chat-bubble>{{ t('vision') }}</chat-bubble>
      <chat-bubble>{{ t('engineeringStrength') }}</chat-bubble>
      <chat-bubble>{{ t('hciStrength') }}</chat-bubble>
      <chat-bubble>{{ t('ambition') }}</chat-bubble>
      <chat-bubble>{{ t('transition') }}</chat-bubble>
    </div>
  </div>
</template>

<i18n lang="yaml" locale="en">
greeting: "Hi! I'm Yangfan :D"
vision: "My passion is building novel interactive systems by bridging deep engineering with human-centered design."
engineeringStrength: "My time at WeChat taught me how to build robust, scalable systems. I'm experienced in navigating the complexities of large codebases and delivering high-quality front-end solutions."
hciStrength: "My HCI master's gave me the tools to ground my work in research, from conducting user studies to systematically evaluating new interaction techniques."
ambition: "I'm now seeking a PhD position to combine these skills: create technically sound and meaningful user experiences."
transition: "Let me briefly introduce my experience 👀"
</i18n>

<i18n lang="yaml" locale="zh">
greeting: "Hi！我是陈扬帆 :D"
vision: "我的热情在于通过连接深度工程与人本设计，来构建新颖的交互系统。"
engineeringStrength: "在微信的工作经验让我学会了如何构建稳健、可扩展的系统，使我能熟练驾驭复杂的大型代码库并交付高质量的前端解决方案。"
hciStrength: "而HCI硕士的训练则为我的工作提供了研究的根基，让我掌握了从执行用户研究到系统性地评估新交互技术的全套方法。"
ambition: "我正在寻求博士职位，以结合这些技能——用严谨的研究来指导创造技术上可靠且有意义的用户体验。"
transition: "下面就简单介绍一下我的经历吧 👀"
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