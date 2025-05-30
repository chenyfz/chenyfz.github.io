<script setup lang="ts">
import {useWatchColor} from './use-watch-color.ts'
import {useWatchLanguage} from './use-watch-language.ts'
import LanguageButton from './language-button.vue'
import DarkModeButton from './dark-mode-button.vue'
import {computed, ref} from 'vue'
import TransformTransition from '../../transitions/transform-transition.vue'
import {useRoute} from 'vue-router'
import { useI18n } from 'vue-i18n'

const { mode, toggleMode } = useWatchColor()
const { language, toggleLanguage} = useWatchLanguage()
const { t } = useI18n()

const route = useRoute()

const isMenuOpen = ref(false)
const onClickMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const tabs = [{
  pageName: 'home',
  textKey: 'homeTab',
  to: '/'
},{
//   pageName: 'portfolio',
//   textKey: 'portfolioTab',
//   to: '/portfolio'
// }, {
//   pageName: 'blog',
//   textKey: 'blogTab',
//   to: '/blog'
// }, {
//   pageName: 'dev-lab',
//   textKey: 'devLabTab',
//   to: '/dev-lab'
// }, {
  pageName: 'study-plan',
  textKey: 'studyPlanTab',
  to: '/study-plan'
}, {
  pageName: 'cv',
  textKey: 'cvTab',
  to: '/cv'
}]

const currentPageName = computed(() => route.name)
const isHighlighted = (pageName: string) => {
  return pageName === currentPageName.value
}
</script>

<template>
  <div class="nav-bar">
    <span
      class="material-symbols-outlined menu-icon"
      :class="{'menu-icon-opened': isMenuOpen}"
      @click="onClickMenu"
    >menu</span>
    <div class="title">
      <router-link to="/">
        chenyfz.github.io
      </router-link>
    </div>

    <language-button
      class="nb-language-button"
      :lang="language"
      @click:zh="toggleLanguage('zh')"
      @click:en="toggleLanguage('en')"
    />
    <div class="dmb-container">
      <dark-mode-button :mode="mode" @click="toggleMode" />
    </div>

    <router-link
      v-for="tab in tabs"
      :key="tab.pageName"
      class="nb-button"
      :class="{'nb-button-highlighted': isHighlighted(tab.pageName)}"
      :to="tab.to"
    >
      {{ t(tab.textKey) }}
    </router-link>
  </div>

  <Teleport to="body">
    <transform-transition :duration-second="0.5" direction="down">
      <!--      <div v-if="isMenuOpen" class="mask" />-->
      <div v-if="isMenuOpen" class="nb-side-penal">
        <router-link
          v-for="tab in tabs"
          :key="tab.pageName"
          class="menu-item menu-item-link"
          :class="{'menu-item-highlighted': isHighlighted(tab.pageName)}"
          :to="tab.to"
          @click="isMenuOpen = false"
        >
          {{ t(tab.textKey) }}
        </router-link>
        <div class="menu-item menu-item-switches">
          <language-button
            :lang="language"
            @click:zh="toggleLanguage('zh')"
            @click:en="toggleLanguage('en')"
          />
          <dark-mode-button :mode="mode" @click="toggleMode" />
        </div>
      </div>
    </transform-transition>
  </Teleport>
</template>

<i18n lang="yaml" locale="en">
homeTab: "Home"
blogTab: "Thoughts"
devLabTab: "DevLab"
studyPlanTab: "Study Plan"
portfolioTab: "Portfolio"
cvTab: "CV"
</i18n>

<i18n lang="yaml" locale="zh">
homeTab: "主页"
blogTab: "随想"
devLabTab: "实验室"
studyPlanTab: "课程计划"
portfolioTab: "作品集"
cvTab: "简历"
</i18n>

<style scoped lang="stylus">
@import "../../styles/stylus-variables.styl";
nb-height = 64px

.nav-bar
  min-height nb-height
  padding 0 var(--page-padding)
  font-size 18px
  font-weight 600
  background-color: var(--background-semi-transparent)
  backdrop-filter blur(40px)
  display grid
  align-items center
  grid-template-columns auto auto 1fr auto auto auto auto auto auto
  gap 8px
  position: sticky
  top: 0
  z-index 2

.nb-button
  padding: 6px 8px
  transition .15s
  border-radius 4px
  color: var(--text-color-secondary)

  &:hover
    background var(--text-color-hightlight)

.nb-button-highlighted
  color: var(--text-color)

.mask
  position: fixed
  left 0
  right 0
  top 0
  bottom 0
  background red

.title
  margin-right 24px
  &:hover
    text-decoration underline

.menu-icon
  display none
  user-select none
  cursor pointer
  border-radius 4px;
  padding: 4px
  margin: -4px

  &:hover
    background var(--text-color-hightlight)

.menu-icon-opened
  background var(--text-color-hightlight)

@media screen and (max-width: $layout-break-point)
  .nb
    grid-template-columns auto 1fr

  .nb-language-button
  .dmb-container
  .nb-button
    display none

  .menu-icon
    display block


.nb-side-penal
  position: fixed
  left 0
  right 0
  top nb-height
  backdrop-filter blur(40px)
  background-color: var(--background-semi-transparent)

.menu-item
  display block
  padding: 12px var(--page-padding)
  position relative
  color: var(--text-color-secondary)

  &:last-child
    &:before
      content ''
      position: absolute;
      top 0
      left var(--page-padding)
      right var(--page-padding)
      border-top: 1px solid var(--text-color-secondary)

.menu-item-highlighted
  color: var(--text-color)

.menu-item-link
  transition .15s
  &:hover
    background var(--text-color-hightlight)

.menu-item-switches
  display grid
  align-items center
  gap: 16px
  padding-top 6px
  margin-left -8px
  grid-template-columns: auto auto 1fr
</style>