<script setup lang="ts">
const {
  shortcut = 'cmd-k',
} = defineProps<{
  /** Keyboard shortcut to display */
  shortcut?: string
}>()

const keys = computed(() => {
  const shortcuts: Record<string, string[]> = {
    'cmd-k': ['⌘', 'K'],
    'ctrl-k': ['Ctrl', 'K'],
    'enter': ['Enter'],
    'escape': ['Esc'],
  }
  return shortcuts[shortcut] || shortcut.split('-').map(k => k.charAt(0).toUpperCase() + k.slice(1))
})
</script>

<template>
  <kbd class="text-xs text-[var(--color-text-muted)] px-2 py-0.5 rounded-md bg-[var(--color-text-muted)]/10 inline-flex gap-0.5 items-center">
    <span
      v-for="(key, index) in keys"
      :key="index"
      :class="{ 'text-[10px]': key === '⌘' }"
    >
      {{ key }}
    </span>
  </kbd>
</template>
