<script setup lang="ts">

</script>

<template>
  <div class="blog-page">
    <div>
      <div class="thinking-emoji">💤</div>
      <div class="text">{{ $t('blogMsg.emptyText') }}</div>
    </div>
  </div>
</template>

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