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
  <a class="select-none cursor-pointer text-base text-muted">
    <span
      :class="{ 'text-content': route.params.lang === 'en' }"
      class="p-1 mx-0.5 rounded transition duration-150 hover:bg-highlight"
      @click="switchToLang('en')"
    >EN</span>
    <span class="transition duration-150">/</span>
    <span
      :class="{ 'text-content': route.params.lang === 'zh' }"
      class="p-1 mx-0.5 rounded transition duration-150 hover:bg-highlight"
      @click="switchToLang('zh')"
    >中文</span>
  </a>
</template>
