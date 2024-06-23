<script setup lang="ts">
import {computed} from 'vue'

interface Props {
  durationSecond: number
}

const props = withDefaults(defineProps<Props>(), {
  durationSecond: 0.3
})

const durationCssString = computed(() => props.durationSecond + 's')
</script>

<template>
  <transition name="fade" mode="out-in">
    <slot />
  </transition>
</template>

<style scoped lang="stylus">
.fade-enter-active,
.fade-leave-active {
  transition: opacity v-bind(durationCssString) ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>