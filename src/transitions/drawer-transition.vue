<script setup lang="ts">
import {computed} from 'vue'

interface Props {
  durationSecond: number,
  direction?: 'up' | 'down',
}

const props = withDefaults(defineProps<Props>(), {
  durationSecond: 0.3,
  direction: 'down'
})

const durationCssString = computed(() => props.durationSecond + 's')
</script>

<template>
  <Transition :name="`transform-${props.direction}`">
    <slot />
  </Transition>
</template>

<style scoped lang="stylus">
.transform-down-enter-active,
.transform-down-leave-active
  transition v-bind(durationCssString) ease

.transform-down-enter-from,
.transform-down-leave-to
  transform translateY(-100%)
  opacity 0
</style>