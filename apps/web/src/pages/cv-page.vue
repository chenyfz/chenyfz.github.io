<script setup lang="ts">
import { useHead } from '@unhead/vue'
import FullCv from "../components/cv/full-cv.vue";

useHead({
  title: 'CV - Yangfan Chen',
  meta: [{ name: 'description', content: 'Curriculum vitae of Yangfan Chen - HCI researcher with software engineering background.' }],
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-page mt-12 mb-14">
    <div class="flex justify-between items-center flex-wrap mb-3">
      <h2 class="m-0">
        CV - Yangfan CHEN, 陈扬帆
      </h2>
      <div class="text-muted text-sm mt-0.5">
        Email: <a href="mailto:x.chenyangfan@gmail.com" class="link">x.chenyangfan@gmail.com</a>
      </div>
    </div>
    <div class="card">
      <full-cv></full-cv>
    </div>
  </div>
</template>
