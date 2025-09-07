<script setup lang="ts">
import {useWatchColor} from './use-watch-color.ts'
// import {useWatchLanguage} from './use-watch-language.ts' //
import LanguageButton from './language-button.vue'
import DarkModeButton from './dark-mode-button.vue'
import {computed, ref} from 'vue'
import DrawerTransition from '../../transitions/drawer-transition.vue'
import FadeTransition from '../../transitions/fade-transition.vue'
import {useRoute} from 'vue-router'
import { useI18n } from 'vue-i18n'

const { mode, toggleMode } = useWatchColor()
// const { language, toggleLanguage} = useWatchLanguage() //
const { t } = useI18n()

const route = useRoute()

const isMenuOpen = ref(false)
const onClickMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const tabs = [{
  pageName: 'home',
  textKey: 'homeTab',
  name: 'home'
}, {
  pageName: 'graduation-thesis',
  textKey: 'graduationThesisTab',
  name: 'graduation-thesis'
}, {
  pageName: 'masters-courses',
  textKey: 'mastersCoursesTab',
  name: 'masters-courses'
}, {
  pageName: 'cv',
  textKey: 'cvTab',
  name: 'cv'
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
      <router-link v-if="route.params.lang" :to="{ name: 'home', params: { lang: route.params.lang }}">
        chenyfz.github.io
      </router-link>
    </div>

    <language-button
      class="nb-language-button"
    />
    <div class="dmb-container">
      <dark-mode-button :mode="mode" @click="toggleMode" />
    </div>

    <template v-if="route.params.lang">
      <router-link
        v-for="tab in tabs"
        :key="tab.pageName"
        class="nb-button"
        :class="{'nb-button-highlighted': isHighlighted(tab.pageName)}"
        :to="{ name: tab.name, params: { lang: route.params.lang }}"
      >
        {{ t(tab.textKey) }}
      </router-link>
    </template>
  </div>

  <Teleport to="body">
    <drawer-transition :duration-second="0.5" direction="down">
      <div v-if="isMenuOpen" class="nb-side-penal">
        <template v-if="route.params.lang">
          <router-link
            v-for="tab in tabs"
            :key="tab.pageName"
            class="menu-item menu-item-link"
            :class="{'menu-item-highlighted': isHighlighted(tab.pageName)}"
            :to="{ name: tab.name, params: { lang: route.params.lang }}"
            @click="isMenuOpen = false"
          >
            {{ t(tab.textKey) }}
          </router-link>
        </template>
        <div class="menu-item menu-item-switches">
          <language-button
          />
          <dark-mode-button :mode="mode" @click="toggleMode" />
        </div>
      </div>
    </drawer-transition>
    <fade-transition :duration-second="0.5">
      <div v-if="isMenuOpen" class="mask" @click="isMenuOpen = false" />
    </fade-transition>
  </Teleport>
  
</template>

<i18n lang="yaml" locale="en">
homeTab: "About Me"
mastersCoursesTab: "MSc Courses"
cvTab: "CV"
graduationThesisTab: "MSc Thesis"
</i18n>

<i18n lang="yaml" locale="zh">
homeTab: "主页"
mastersCoursesTab: "硕士课程"
cvTab: "简历"
graduationThesisTab: "硕士论文"
</i18n>

<style scoped lang="stylus">
@import "../../styles/stylus-variables.styl";
nb-height = 64px

.nav-bar
  min-height nb-height
  padding 0 var(--page-padding)
  font-size 18px
  font-weight 600
  background-color: transparent
  backdrop-filter blur(20px)
  display grid
  align-items center
  grid-template-columns auto auto 1fr auto auto auto auto auto auto auto
  gap 8px
  position: sticky
  top: 0
  z-index 3
  transition .2s

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
  z-index 1
  transition .2s

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
  backdrop-filter blur(20px)
  background-color: transparent
  z-index 2

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