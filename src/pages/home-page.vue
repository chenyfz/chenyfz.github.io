<script setup lang="ts">

</script>

<template>
  <div class="home-page">
    <p class="with-large-emoji">
      {{ $t('homeMsg.introP1') }}
      <span class="hi-emoji">👋</span>
    </p>
    <p>{{ $t('homeMsg.introP2') }}</p>
    <p>{{ $t('homeMsg.introP3') }}</p>
    <p>{{ $t('homeMsg.introP4') }}</p>
    <p>
      {{ $t('homeMsg.descToCV') }}
      <router-link to="cv" class="link">{{ $t('homeMsg.linkToCV') }}</router-link>
      {{ $t('homeMsg.descBeforeStudyPlan') }}
      <router-link to="portfolio" class="link">{{ $t('homeMsg.linkToStudyPlan') }}</router-link>
      {{ $t('homeMsg.descAfterStudyPlan') }}
    </p>

    <div class="email-button-container">
      <a class="email-button" href="mailto:x.chenyangfan@gmail.com">
        {{ $t('homeMsg.reachOut') }}
      </a>
    </div>
  </div>
</template>

<style scoped lang="stylus">
.home-page
  padding: 0 var(--page-padding)
  margin: 32px auto 56px auto
  max-width 730px
  font-size 18px

p
  margin 16px 0

.with-large-emoji
  line-height 40px

.hi-emoji
  font-size 100px
  position relative

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