<script setup lang="ts">
withDefaults(defineProps<{
  tKey: string,
  length: number,
  componentName: 'p' | 'li'
}>(),{
  componentName: 'p'
})
</script>

<template>
  <component :is="componentName" v-for="i in [...Array(length).keys()]" :key="i">
    {{ $t(`${tKey}[${i}]`) }}
  </component>
</template>

<style scoped lang="stylus">

</style>