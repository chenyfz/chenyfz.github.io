<script lang="ts" setup>
const { type = 'from-system' } = defineProps<{
  type?: 'from-system' | 'from-user' | 'button'
}>()
</script>

<template>
<div class="chat-bubble" :class="'chat-bubble-' + type">
  <slot></slot>
</div>
</template>

<style scoped lang="stylus">
.chat-bubble
  width fit-content
  background var(--background-chat-bubble-from-system)
  border: 1.5px solid var(--border-chat-bubble)
  box-sizing border-box
  backdrop-filter blur(50px)
  padding 8px 16px
  border-radius 20px

.chat-bubble-from-system
  background var(--background-chat-bubble-from-system)
  backdrop-filter blur(30px)

.chat-bubble-from-user
  background var(--background-chat-bubble-from-user)
  color: white

.chat-bubble-button
  background var(--background-transition-inner)
  color: white
</style>