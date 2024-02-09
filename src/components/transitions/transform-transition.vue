<script setup lang="ts">
const props = withDefaults(
    defineProps<{ direction?: 'up' | 'down' }>(),
    {direction: 'down'}
)
</script>

<template>
  <Transition :name="`transform-${props.direction}`">
    <slot />
  </Transition>
</template>

<style scoped lang="stylus">
.transform-down-enter-active,
.transform-down-leave-active
  transition .15s

.transform-down-enter-from,
.transform-down-leave-to
  transform translateY(-100%)
  opacity 0
</style>