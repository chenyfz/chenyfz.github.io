<script setup lang="ts">
import NavBar from './components/nav-bar/nav-bar.vue'
import FadeTransition from './transitions/fade-transition.vue'
</script>

<template>
  <nav-bar />
  <fade-transition :duration-second="0.5">
    <router-view />
  </fade-transition>
</template>

<style lang="stylus">

</style>
