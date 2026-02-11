<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'

const route = useRoute()
const lang = computed(() => (route.params.lang as string) || 'en')

useHead({
  htmlAttrs: { lang },
})
</script>

<template>
  <router-view />
</template>
