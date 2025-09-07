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
experience: "As a software engineer at WeChat's Design Center, I collaborated with talented product managers, designers, and engineers, gaining firsthand insight into the trade-offs of iterating a product for a massive user base. This experience forged my pragmatic mindset: designing interactions by balancing user, product, and technical perspectives, while solving complex problems incrementally."
philosophy: "I am passionate about exploring novel interaction design ideas. However, I believe that beyond the initial 'wow,' true user adoption requires navigating trade-offs and solving problems under constraints. My key strength is bridging creative thinking with pragmatic problem-solving, a synthesis that fuels my passion for research in interactive systems."
transition: "Feel free to discover more about me below! 👀"
</i18n>

<i18n lang="yaml" locale="zh">
greeting: "Hi！我是陈扬帆。我最近完成了我的HCI硕士项目，正在寻求PhD职位。"
experience: "此前，我曾在微信设计中心做了两年软件工程师，与一群优秀的产品经理、设计师和工程师共事，深入见证了一款国民级产品在迭代中的思考与权衡。这段经历塑造了我务实的思维方式：从用户、产品和技术等角度进行交互设计，循序渐进地逐一解决复杂的问题。"
philosophy: "当然啦，我非常享受探索很酷的新奇的交互设计想法的过程。只是我认为，在大家最初 wow 地赞叹之后，一个设计要真正落地，就必须在各种限制中平衡妥协、处理诸多复杂问题，而这背后的复杂性常常被忽视。我相信我独特的优势就在于：既拥有创造性思维，也具备解决复杂问题的能力。这两者的结合，能帮助我更好地投身到交互系统的研究之中，这也是我的热情所在。"
transition: "往下接着看看我的一些其他信息吧！👀"
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