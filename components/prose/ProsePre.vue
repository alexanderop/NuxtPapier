<script setup lang="ts">
interface Props {
  code?: string
  language?: string
  filename?: string
  highlights?: number[]
  meta?: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  code: '',
  language: '',
  meta: '',
})
</script>

<template>
  <pre
    :class="props.class"
    :data-language="language"
  ><code><slot>{{ code }}</slot></code></pre>
</template>
