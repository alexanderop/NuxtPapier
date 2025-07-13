<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
  author?: string
  date?: string
  siteName?: string
}>()

function formatDate(dateString?: string) {
  if (!dateString)
    return ''

  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <div
    :style="{
      width: '100%',
      height: '100%',
      background: 'black',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '64px',
    }"
  >
    <h1
      :style="{
        color: 'white',
        fontSize: '72px',
        fontWeight: 'bold',
        lineHeight: 1.2,
        textAlign: 'center',
      }"
    >
      {{ title }}
    </h1>
  </div>
</template>
