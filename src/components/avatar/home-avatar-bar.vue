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
      <chat-bubble>{{ t('experience') }}</chat-bubble>
      <chat-bubble>{{ t('philosophy') }}</chat-bubble>
      <chat-bubble>{{ t('transition') }}</chat-bubble>
    </div>
  </div>
</template>

<i18n lang="yaml" locale="en">
greeting: "Hi! I'm Yangfan Chen, an HCI Master's graduate currently seeking a PhD position."
experience: "Before my master's, I was a software engineer at WeChat's Design Center. I collaborated with talented product managers, designers, and engineers, gaining firsthand insight into the trade-offs of iterating a product for a massive user base. This experience forged my pragmatic mindset: designing interactions by balancing user, product, and technical perspectives under constraints."
philosophy: "I always have many interaction design ideas and hope to spend my PhD exploring some of them in depth over several years. I believe that beyond the 'wow' moment, for an idea to be truly valuable, it must be developed by navigating trade-offs and constraints, and by identifying, breaking down, and incrementally solving complex problems. My key strength is bridging creative thinking with pragmatic problem-solving."
transition: "Feel free to discover more about me below! 👀"
</i18n>

<i18n lang="yaml" locale="zh">
greeting: "你好！我是陈扬帆。我刚刚HCI硕士毕业，正在寻找PhD机会。"
experience: "读硕士之前，我曾经是微信设计中心的软件工程师，与一群优秀的产品经理、设计师和工程师共事。期间，我深入见证了一款国民级产品在迭代中的思考与权衡。这段经历尤其强化了我务实的思维方式：在用户、产品和技术等视角下，在限制和冲突中思考交互设计。"
philosophy: "我总会有各种新奇的交互设计想法，希望PhD阶段有机会以几年的时间跨度长期深入地思考并落地一些想法。我还认为：一个新奇的很酷的点子在 “wow” 之后如果想要真正落地，就必须在各种限制中平衡、妥协，并能识别、拆分、循序渐进解决复杂问题。我独特的优势就在于同时拥有创造性思维和解决复杂问题的能力。"
transition: "看看我的一些信息吧！👀"
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
  max-width 670px

@media (max-width: 768px)
  .home-avatar-bar
    display grid
    grid-gap unset
    grid-template-columns auto

  .home-avatar
    justify-self self-end

  .hi-emoji
    position absolute
    left -8px
    top 66px
    font-size 36px
</style>