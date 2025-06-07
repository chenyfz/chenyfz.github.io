<script setup lang="ts">

</script>

<template>
  <div class="avatar-image" role="img" aria-label="Photo of Yangfan" />
</template>

<style scoped lang="stylus">
.avatar-image
  width 200px
  height 200px
  border-radius 50%
  box-sizing border-box
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1)
  border: 5px solid transparent
  background-image: url('/photo.webp'), var(--background-transition-border)
  background-size: cover, auto
  background-position: center
  background-origin: border-box
  background-clip: content-box, border-box

@media (max-width: 768px)
  .avatar-image
    width 120px
    height 120px
</style>