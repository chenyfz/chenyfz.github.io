<script setup lang="ts">

import FullCv from "../components/cv/full-cv.vue";
</script>

<template>
  <div class="cv-page">
    <div class="cv-header">
      <h2 class="cv-name">
        CV - Yangfan CHEN, 陈扬帆
      </h2>
      <div class="contact-info">
        Email: <a href="mailto:x.chenyangfan@gmail.com" class="link">x.chenyangfan@gmail.com</a>
      </div>
    </div>
    <full-cv></full-cv>
  </div>
</template>

<style scoped lang="stylus">
.cv-page
  padding: 0 var(--page-padding)
  margin: 48px auto 56px auto
  max-width 910px

.cv-header
  display: flex
  justify-content: space-between
  align-items: center
  flex-wrap: wrap
  margin-bottom: 12px
  padding: 0 24px
  .cv-name
    margin: 0
  .contact-info
    color: var(--text-color-secondary)
    font-size: 14px
    margin-top: 2px

.full-cv
  background var(--background-50-transparent)
  border 1.5px solid var(--border-chat-bubble)
  border-radius 4px
  padding 8px 24px
</style>