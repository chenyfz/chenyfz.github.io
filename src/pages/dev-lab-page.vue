<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="dev-lab-page">
    <div>
      <div class="thinking-emoji">⚠️</div>
      <div class="title">{{ t('emptyTitle') }}</div>
      <div class="subtitle-line-1">{{ t('emptySubtitle1') }}</div>
      <div class="subtitle-line-2">{{ t('emptySubtitle2') }}</div>
    </div>
  </div>
</template>

<i18n lang="yaml" locale="en">
emptyTitle: "CAUTION"
emptySubtitle1: "AREA UNDER"
emptySubtitle2: "CONSTRUCTION"
</i18n>

<i18n lang="yaml" locale="zh">
emptyTitle: "前方施工，注意安全"
emptySubtitle1: ""
emptySubtitle2: ""
</i18n>

<style scoped lang="stylus">
.dev-lab-page
  display flex
  flex-wrap wrap
  align-items center
  justify-content center
  height calc(80vh)

  > div
    max-width 280px
    text-align center

.thinking-emoji
  font-size 200px

.title
  margin-top -24px
  font-size 24px
  font-weight bold
  color: var(--text-color-secondary)

.subtitle-line-1
.subtitle-line-2
  font-weight bold
  color: var(--text-color-secondary)

.subtitle-line-1
  font-size 18px

.subtitle-line-2
  font-size 14px
</style>