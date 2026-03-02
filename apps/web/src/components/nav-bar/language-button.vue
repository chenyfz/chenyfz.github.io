<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const currentLang = computed(() => route.params.lang as 'en' | 'zh')

function switchToLang(lang: 'en' | 'zh') {
  if (lang === currentLang.value) return
  router.push({
    name: route.name!,
    params: { ...route.params, lang },
    query: route.query,
    hash: route.hash,
  })
}

import { computed } from 'vue'
</script>

<template>
  <div 
    class="relative flex items-center rounded-full p-1 h-8 w-[68px] cursor-pointer select-none bg-surface-30"
    @click="switchToLang(currentLang === 'en' ? 'zh' : 'en')"
  >
    <!-- 滑动指示器 -->
    <div 
      class="absolute top-1 bottom-1 w-[30px] rounded-full bg-surface-75 shadow-sm transition-all duration-200 ease-out"
      :class="currentLang === 'en' ? 'left-1' : 'left-[34px]'"
    />

    <!-- EN 标签 -->
    <span 
      class="relative z-1 flex-1 text-center text-xs font-medium transition-colors duration-200"
      :class="currentLang === 'en' ? 'text-content' : 'text-muted'"
    >
      EN
    </span>

    <!-- 中文标签 -->
    <span 
      class="relative z-1 flex-1 text-center text-xs font-medium transition-colors duration-200"
      :class="currentLang === 'zh' ? 'text-content' : 'text-muted'"
    >
      中
    </span>
  </div>
</template>
