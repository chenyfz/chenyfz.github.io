<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="portfolio-page">
    <p>{{ t('homeTab') }}</p>
    <p>Portfolio page is still under construction.</p>
  </div>
</template>

<i18n lang="yaml" locale="en">
homeTab: "Home"
</i18n>

<i18n lang="yaml" locale="zh">
homeTab: "主页"
</i18n>

<style scoped lang="stylus">
.portfolio-page
  padding: 0 var(--page-padding)
  margin: 32px auto 56px auto
  max-width 800px
</style>