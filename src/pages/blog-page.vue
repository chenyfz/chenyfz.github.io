<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="blog-page">
    <div class="empty-container">
      <div>💭</div>
      <div>{{ t('emptyText') }}</div>
    </div>
  </div>
</template>

<i18n lang="yaml" locale="en">
emptyText: "Apparently this lazybones prefers to swim in fuzzy daydreams..."
</i18n>

<i18n lang="yaml" locale="zh">
emptyText: "看来此人懒惰腐朽更喜欢做白日梦..."
</i18n>


<style scoped lang="stylus">
.blog-page
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

.text
  font-size 17px
  color: var(--text-color-secondary)
</style>