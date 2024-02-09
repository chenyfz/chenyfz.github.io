<script setup lang="ts">
const props = defineProps<{ lang: string }>()
const emit = defineEmits(['click:en', 'click:zh'])
</script>

<template>
  <a class="language-switch-button">
    <span
      :class="{ 'selected': props.lang === 'en' }"
      class="lang-button"
      @click="emit('click:en')"
    >EN</span>
    <span>/</span>
    <span
      :class="{ 'selected': props.lang === 'zh' }"
      class="lang-button"
      @click="emit('click:zh')"
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