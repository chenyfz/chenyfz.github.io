<script setup lang="ts">
import I18nParagraphs from '../components/i18n-paragraphs/i18n-paragraphs.vue'

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
      <div class="left">Period 6</div>
      <div class="right" @click="scrollToId('mcm-title')">{{ $t('portfolioMsg.mcmTitle') }}</div>
      <div class="left">Remaining</div>
      <div class="right" @click="scrollToId('thesis-title')">{{ $t('portfolioMsg.thesisTitle') }}</div>
    </div>
    <hr>
    <div class="content">
      <div class="title">{{ $t('portfolioMsg.coursesTitle') }}</div>
      <h4 id="mcsp-title" class="first-course-title">{{ $t('portfolioMsg.mcspTitle') }}</h4>
      <i18n-paragraphs :length="5" t-key="portfolioMsg.mcspParagraphs" />

      <h4 id="mlhvl-title">{{ $t('portfolioMsg.mlhvlTitle') }}</h4>

      <i18n-paragraphs :length="6" t-key="portfolioMsg.mlhvlParagraphs" />
      <h4 id="mvis-title">{{ $t('portfolioMsg.mvisTitle') }}</h4>
      <i18n-paragraphs :length="5" t-key="portfolioMsg.mvisParagraphs" />
      <a href="https://superfashion.walzen.org/" class="link" target="_blank">{{ $t('portfolioMsg.mvisParagraphs[5]') }}</a>
      <img src="/infovis-demo.png" alt="illustration about Information Visualization course project">
      <p class="label">Screenshot of our course project</p>

      <h4 id="mqlm-title">{{ $t('portfolioMsg.mqlmTitle') }}</h4>
      <i18n-paragraphs :length="7" t-key="portfolioMsg.mqlmParagraphs" />
      <a href="/Group_30_Final_Paper.pdf" class="link" target="_blank">{{ $t('portfolioMsg.mqlmParagraphs[7]') }}</a>

      <h4 id="miti-title">{{ $t('portfolioMsg.mitiTitle') }}</h4>
      <i18n-paragraphs :length="1" t-key="portfolioMsg.mitiParagraphs" />
      <a href="/Reflective_Diary_Yangfan.pdf" class="link" target="_blank">{{ $t('portfolioMsg.mitiParagraphs[1]') }}</a>

      <h4 id="mmmi-title">{{ $t('portfolioMsg.mmmiTitle') }}</h4>
      <i18n-paragraphs :length="9" t-key="portfolioMsg.mmmiParagraphs" />
      <a href="/INFOMMMI_Super_VR_Power_paper.pdf" class="link" target="_blank">{{ $t('portfolioMsg.mmmiParagraphs[9]') }}</a>
      <video controls>
        <source src="/infommmi-demo.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <p class="label">The first gesture is by Meta. The second and third gestures are what I implemented</p>

      <h4 id="mqnm-title">{{ $t('portfolioMsg.mqnmTitle') }}</h4>
      <i18n-paragraphs :length="8" t-key="portfolioMsg.mqnmParagraphs" />
      <a href="/infomqnm-report.pdf" class="link" target="_blank">{{ $t('portfolioMsg.mqnmParagraphs[8]') }}</a>

      <h4 id="mmob-title">{{ $t('portfolioMsg.mmobTitle') }}</h4>
      <i18n-paragraphs :length="1" t-key="portfolioMsg.mmobParagraphs" />

      <h4 id="mdm-title">{{ $t('portfolioMsg.mdmTitle') }}</h4>
      <i18n-paragraphs :length="1" t-key="portfolioMsg.mdmParagraphs" />

      <h4 id="mcm-title">{{ $t('portfolioMsg.mcmTitle') }}</h4>
      <i18n-paragraphs :length="1" t-key="portfolioMsg.mcmParagraphs" />

      <h4 id="thesis-title">{{ $t('portfolioMsg.thesisTitle') }}</h4>
      <i18n-paragraphs :length="1" t-key="portfolioMsg.thesisParagraphs" />
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
  margin-top 48px
  scroll-margin-top: 72px;

.first-course-title
  margin-top 8px

img
video
  margin-top 24px
  border-radius 8px
  width 100%

hr
  margin: 32px 0

.title
  font-size 20px
  font-weight bold

.year-title
  margin-top 12px
  font-weight bold

.label
  color: var(--text-color-secondary)
  text-align center
  margin-top: 4px
  margin-bottom 24px

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
    padding-bottom 32px
    max-height calc(100vh - 64px - 72px)
    overflow auto

    .full-line
      grid-column unset

    .right
      grid-column unset
      width unset
      padding: 0 16px
</style>