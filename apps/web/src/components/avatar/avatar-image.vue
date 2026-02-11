<script setup lang="ts">

</script>

<template>
  <div class="avatar-image size-[200px] max-md:size-[120px] rounded-full box-border" role="img" aria-label="Photo of Yangfan" />
</template>

<style scoped>
.avatar-image {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border: 5px solid transparent;
  background-image: url('/photo.webp'), var(--c-gradient-border);
  background-size: cover, auto;
  background-position: center;
  background-origin: border-box;
  background-clip: content-box, border-box;
}
</style>