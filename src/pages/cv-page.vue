<script setup lang="ts">

import FullCv from "../components/cv/full-cv.vue";
</script>

<template>
  <div class="cv-page">
    <full-cv></full-cv>
  </div>
</template>

<style scoped lang="stylus">
.cv-page
  padding: 0 var(--page-padding)
  margin: 32px auto 56px auto
  max-width 730px
</style>