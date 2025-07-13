<script setup lang="ts">
const { title } = defineProps<{
  /** The title to display in the OG image */
  title?: string
}>()
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
        fontSize: '80px',
        fontWeight: 'bold',
        lineHeight: 1.2,
        textAlign: 'center',
      }"
    >
      {{ title }}
    </h1>
  </div>
</template>
