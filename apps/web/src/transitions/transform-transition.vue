<script setup lang="ts">
import {computed} from 'vue'

interface Props {
  durationSecond?: number,
  direction?: 'up' | 'down',
}

const props = withDefaults(defineProps<Props>(), {
  durationSecond: 0.3,
  direction: 'down'
})

const durationCssString = computed(() => props.durationSecond + 's')
</script>

<template>
  <Transition :name="`transform-${props.direction}`" mode="out-in">
    <slot />
  </Transition>
</template>

<style scoped>
.transform-down-enter-active,
.transform-down-leave-active {
  transition: v-bind(durationCssString) ease;
  transform: translateY(0);
}

.transform-down-enter-from {
  transform: translateY(-30px);
  opacity: 0;
}

.transform-down-leave-to {
  transform: translateY(0);
  opacity: 0;
}

.transform-up-enter-active,
.transform-up-leave-active {
  transition: v-bind(durationCssString) ease;
  transform: translateY(0);
}

.transform-up-enter-from {
  transform: translateY(30px);
  opacity: 0;
}

.transform-up-leave-to {
  transform: translateY(0);
  opacity: 0;
}
</style>