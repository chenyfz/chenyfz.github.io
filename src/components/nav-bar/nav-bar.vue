<script setup lang="ts">
import {useWatchColor} from './use-watch-color.ts'
import {useWatchLanguage} from './use-watch-language.ts'
import LanguageButton from './language-button.vue'
import DarkModeButton from './dark-mode-button.vue'
import {computed, ref} from 'vue'
import TransformTransition from '../transitions/transform-transition.vue'
import {useRoute} from 'vue-router'

const { mode, toggleMode } = useWatchColor()
const { language, toggleLanguage} = useWatchLanguage()

const route = useRoute()

const isMenuOpen = ref(false)
const onClickMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
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
    <div class="title">chenyfz.github.io</div>

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
      class="nb-button"
      :class="{'nb-button-highlighted': isHighlighted('labs')}"
      to="/labs"
    >
      {{ $t('navBarMsg.labsTab') }}
    </router-link>
    <router-link
      class="nb-button"
      :class="{'nb-button-highlighted': isHighlighted('photos')}"
      to="/photos"
    >
      {{ $t('navBarMsg.photosTab') }}
    </router-link>
    <router-link
      class="nb-button"
      to="/"
      :class="{'nb-button-highlighted': isHighlighted('about')}"
    >
      {{ $t('navBarMsg.aboutTab') }}
    </router-link>
  </div>

  <Teleport to="body">
    <transform-transition>
      <div v-if="isMenuOpen" class="nb-side-penal">
        <router-link
          class="menu-item menu-item-link"
          :class="{'menu-item-highlighted': isHighlighted('labs')}"
          to="/labs"
          @click="isMenuOpen = false"
        >
          {{ $t('navBarMsg.labsTab') }}
        </router-link>
        <router-link
          class="menu-item menu-item-link"
          :class="{'menu-item-highlighted': isHighlighted('photos')}"
          to="/photos"
          @click="isMenuOpen = false"
        >
          {{ $t('navBarMsg.photosTab') }}
        </router-link>
        <router-link
          class="menu-item menu-item-link"
          :class="{'menu-item-highlighted': isHighlighted('about')}"
          to="/"
          @click="isMenuOpen = false"
        >
          {{ $t('navBarMsg.aboutTab') }}
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

<style scoped lang="stylus">
nb-height = 64px

.nav-bar
  min-height nb-height
  padding 0 var(--page-padding)
  font-size 18px
  font-weight 600
  backdrop-filter blur(16px)
  display grid
  align-items center
  grid-template-columns auto auto 1fr auto auto auto
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


.title
  margin-right 24px

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

@media screen and (max-width: 720px)
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
  backdrop-filter blur(16px)

.menu-item
  display block
  padding: 12px var(--page-padding)
  position relative
  color: var(--text-color-secondary)

  &:first-child
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