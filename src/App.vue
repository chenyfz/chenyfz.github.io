<script setup lang="ts">
import NavBar from './components/nav-bar/nav-bar.vue'
import FadeTransition from './transitions/fade-transition.vue'
</script>

<template>
  <nav-bar />
  <router-view v-slot="{ Component }">
    <fade-transition :duration-second="0.3">
      <component :is="Component" />
    </fade-transition>
  </router-view>
</template>

<style lang="stylus">

</style>
