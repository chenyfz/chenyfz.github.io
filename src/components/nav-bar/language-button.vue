<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

function switchToLang(lang: 'en' | 'zh') {
  router.push({
    name: route.name!,
    params: { ...route.params, lang },
    query: route.query,
    hash: route.hash,
  })
}
</script>

<template>
  <a class="language-switch-button">
    <span
      :class="{ 'selected': route.params.lang === 'en' }"
      class="lang-button"
      @click="switchToLang('en')"
    >EN</span>
    <span>/</span>
    <span
      :class="{ 'selected': route.params.lang === 'zh' }"
      class="lang-button"
      @click="switchToLang('zh')"
    >中文</span>
  </a>
</template>

<style scoped lang="stylus">
.language-switch-button
  user-select none
  cursor pointer
  font-size 16px

  span
    color: var(--text-color-secondary)
    transition .15s

  .lang-button
    padding: 4px
    margin: 0 2px
    transition .15s
    border-radius 4px

    &:hover
      background: var(--text-color-hightlight)

  .selected
    color: var(--text-color)
</style>