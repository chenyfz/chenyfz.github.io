<template>
  <span v-for="(part, index) in parts" :key="index">
    <router-link v-if="part.link && !part.isExternal" :to="part.link" class="link">{{ part.text }}</router-link>
    <a v-else-if="part.link && part.isExternal" :href="part.link" target="_blank" class="link">{{ part.text }}</a>
    <strong v-else-if="part.bold">{{ part.text }}</strong>
    <template v-else>{{ part.text }}</template>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ text: string }>()

const parts = computed(() => {
  const text = props.text
  const result: { text: string; link?: string; bold: boolean; isExternal?: boolean }[] = []
  let lastIndex = 0

  const regex = /(\[.*?\]\(.*?\))|(\*\*.*?\*\*)/g
  let match

  while ((match = regex.exec(text)) !== null) {
    // Plain text before the match
    if (match.index > lastIndex) {
      result.push({ text: text.substring(lastIndex, match.index), bold: false })
    }

    const matchedStr = match[0]
    // Check if it's a link
    const linkMatch = matchedStr.match(/\[(.*?)\]\((.*?)\)/)
    if (linkMatch) {
      const isExternal = linkMatch[2].startsWith('http')
      result.push({ text: linkMatch[1], link: linkMatch[2], bold: false, isExternal })
    }
    // Check if it's bold
    else if (matchedStr.startsWith('**') && matchedStr.endsWith('**')) {
      result.push({ text: matchedStr.substring(2, matchedStr.length - 2), bold: true })
    }

    lastIndex = regex.lastIndex
  }

  // Remaining plain text
  if (lastIndex < text.length) {
    result.push({ text: text.substring(lastIndex), bold: false })
  }

  return result
})
</script>
