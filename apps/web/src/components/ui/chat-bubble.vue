<script lang="ts" setup>
const { type = 'from-system' } = defineProps<{
  type?: 'from-system' | 'from-user' | 'button'
}>()
</script>

<template>
<div
  class="w-fit border-[1.5px] border-chat-border box-border px-4 py-2 rounded-[20px]"
  :class="{
    'bg-chat-system backdrop-blur-[30px]': type === 'from-system',
    'bg-chat-user text-white': type === 'from-user' || type === 'button'
  }"
>
  <slot></slot>
</div>
</template>
