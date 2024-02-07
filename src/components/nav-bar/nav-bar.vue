<script setup lang="ts">
import {useWatchColor} from './use-watch-color.ts'
import {useWatchLanguage} from './use-watch-language.ts'
import LanguageButton from './language-button.vue'
import DarkModeButton from './dark-mode-button.vue'

const { mode, toggleMode } = useWatchColor()
const { language, toggleLanguage} = useWatchLanguage()
</script>

<template>
  <div class="nav-bar">
    <div class="title">ohyangfan.github.io</div>

    <language-button
      :lang="language"
      @click:zh="toggleLanguage('zh')"
      @click:en="toggleLanguage('en')"
    />
    <dark-mode-button :mode="mode" @click="toggleMode" />

    <div />

    <router-link class="nav-bar-button" to="/labs">{{ $t('navBarMsg.labsTab') }}</router-link>
    <router-link class="nav-bar-button" to="/photos">{{ $t('navBarMsg.photosTab') }}</router-link>
    <router-link class="nav-bar-button" to="/">{{ $t('navBarMsg.aboutTab') }}</router-link>
  </div>
</template>

<style scoped lang="stylus">
.nav-bar
  min-height 64px
  padding 0 32px
  font-size 18px
  font-weight 600
  backdrop-filter blur(2px)
  display grid
  align-items center
  grid-template-columns auto auto auto 1fr auto auto auto
  gap 16px

.nav-bar-button
  color var(--text-color)
  text-decoration none
  padding: 6px 12px
  transition .2s
  border-radius 4px

  &:hover
    background: var(--text-color-hightlight)

.title
  margin-right 24px
</style>