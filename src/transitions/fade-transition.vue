<script setup lang="ts">
import {computed} from 'vue'

interface Props {
  durationSecond?: number,
  delaySecond?: number
}

const props = withDefaults(defineProps<Props>(), {
  durationSecond: 0.3,
  delaySecond: 0
})

const durationCssString = computed(() => props.durationSecond + 's')
const delayCssString = computed(() => props.delaySecond + 's')
</script>

<template>
  <transition name="fade" mode="out-in">
    <slot />
  </transition>
</template>

<style scoped lang="stylus">
.fade-enter-active,
.fade-leave-active {
  transition: opacity v-bind(durationCssString) v-bind(delayCssString) ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>