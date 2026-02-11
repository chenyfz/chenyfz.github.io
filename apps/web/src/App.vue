<script setup lang="ts">
import { onMounted } from 'vue'
import NavBar from './components/nav-bar/nav-bar.vue'
import FadeTransition from './transitions/fade-transition.vue'

onMounted(() => {
  document.body.style.transition = '0.2s'
})
</script>

<template>
  <nav-bar />
  <router-view v-slot="{ Component }">
    <fade-transition :duration-second="0.3">
      <component :is="Component" />
    </fade-transition>
  </router-view>
</template>

