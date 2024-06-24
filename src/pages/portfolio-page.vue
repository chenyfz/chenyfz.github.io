<script setup lang="ts">
const scrollToId = (id: string) => {
  document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div class="portfolio-page">
    <p class="draft">[draft version]</p>
    <h2 class="heading">{{ $t('portfolioMsg.title') }}</h2>
    <div class="overview">
      <div class="title full-line">{{ $t('portfolioMsg.contentTitle') }}</div>
      <div class="full-line year-title">{{ $t('portfolioMsg.firstYearTitle') }}</div>
      <div class="left">Period 1</div>
      <div class="right" @click="scrollToId('mcsp-title')">{{ $t('portfolioMsg.mcspTitle') }}</div>
      <div class="right" @click="scrollToId('mlhvl-title')">{{ $t('portfolioMsg.mlhvlTitle') }}</div>
      <div class="left">Period 2</div>
      <div class="right" @click="scrollToId('mvis-title')">{{ $t('portfolioMsg.mvisTitle') }}</div>
      <div class="right" @click="scrollToId('mqlm-title')">{{ $t('portfolioMsg.mqlmTitle') }}</div>
      <div class="left">Period 3</div>
      <div class="right" @click="scrollToId('miti-title')">{{ $t('portfolioMsg.mitiTitle') }}</div>
      <div class="right" @click="scrollToId('mmmi-title')">{{ $t('portfolioMsg.mmmiTitle') }}</div>
      <div class="left">Period 4</div>
      <div class="right" @click="scrollToId('mqnm-title')">{{ $t('portfolioMsg.mqnmTitle') }}</div>
      <div class="right" @click="scrollToId('mmob-title')">{{ $t('portfolioMsg.mmobTitle') }}</div>

      <div class="full-line year-title">{{ $t('portfolioMsg.secondYearTitle') }}</div>
      <div class="left">Period 5</div>
      <div class="right" @click="scrollToId('mdm-title')">{{ $t('portfolioMsg.mdmTitle') }}</div>
      <div class="right" @click="scrollToId('mr-title')">{{ $t('portfolioMsg.mrTitle') }}</div>
      <div class="left">Period 6</div>
      <div class="right" @click="scrollToId('magr-title')">{{ $t('portfolioMsg.magrTitle') }}</div>
      <div class="left">Period 7</div>
      <div class="right" @click="scrollToId('mcv-title')">{{ $t('portfolioMsg.mcvTitle') }}</div>
    </div>
    <hr>
    <div class="content">
      <div class="title">{{ $t('portfolioMsg.coursesTitle') }}</div>
      <h4 id="mcsp-title">{{ $t('portfolioMsg.mcspTitle') }}</h4>
      <h4 id="mlhvl-title">{{ $t('portfolioMsg.mlhvlTitle') }}</h4>
      <h4 id="mvis-title">{{ $t('portfolioMsg.mvisTitle') }}</h4>
      <h4 id="mqlm-title">{{ $t('portfolioMsg.mqlmTitle') }}</h4>
      <h4 id="miti-title">{{ $t('portfolioMsg.mitiTitle') }}</h4>
      <h4 id="mmmi-title">{{ $t('portfolioMsg.mmmiTitle') }}</h4>
      <h4 id="mqnm-title">{{ $t('portfolioMsg.mqnmTitle') }}</h4>
      <h4 id="mmob-title">{{ $t('portfolioMsg.mmobTitle') }}</h4>
      <h4 id="mdm-title">{{ $t('portfolioMsg.mdmTitle') }}</h4>
      <h4 id="mr-title">{{ $t('portfolioMsg.mrTitle') }}</h4>
      <h4 id="magr-title">{{ $t('portfolioMsg.magrTitle') }}</h4>
      <h4 id="mcv-title">{{ $t('portfolioMsg.mcvTitle') }}</h4>
    </div>
  </div>
</template>

<style scoped lang="stylus">
.portfolio-page
  padding: 0 var(--page-padding)
  margin: 32px auto 56px auto
  max-width 1200px

h4
  margin-bottom 8px
  scroll-margin-top: 72px;

hr
  margin: 32px 0

.title
  font-size 20px
  font-weight bold

.year-title
  margin-top 12px
  font-weight bold

.overview
  display grid
  grid-template-columns auto 1fr
  grid-template-rows: auto;
  grid-gap 8px
  column-gap: 10px
  color: var(--text-color-less-important)

  .full-line
    grid-column 1 / 3
    color: var(--text-color)

  .right
    grid-column 2 / 3
    cursor pointer
    width fit-content
    padding: 0 6px
    position: relative;

    &:hover
      color: var(--text-color)

    &:before
      content: ''
      position: absolute
      left 0
      right 0
      bottom -4px
      top -4px
      border-radius 4px
      transition .1s

    &:hover:before
      background var(--text-color-hightlight)

  .period-title
    margin-top: 8px

@media (min-width: 1200px)
  .portfolio-page
    display grid
    grid-template-columns 320px 1fr
    grid-template-rows: auto;
    grid-gap 8px
    column-gap: 40px

  hr
    display none

  .draft
  .heading
    grid-column 1 / 3

  .overview
    position sticky
    top 72px
    display grid
    grid-template-columns auto
    grid-template-rows auto
    align-self start

    .full-line
      grid-column unset

    .right
      grid-column unset
      width unset
      padding: 0 16px
</style>