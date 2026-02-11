<script setup lang="ts">
import { useHead } from '@unhead/vue'
import FullCv from "../components/cv/full-cv.vue";

useHead({
  title: 'CV - Yangfan Chen',
  meta: [{ name: 'description', content: 'Curriculum vitae of Yangfan Chen - HCI researcher with software engineering background.' }],
})
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
    <div class="card">
      <full-cv></full-cv>
    </div>
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
  .cv-name
    margin: 0
  .contact-info
    color: var(--text-color-secondary)
    font-size: 14px
    margin-top: 2px
</style>