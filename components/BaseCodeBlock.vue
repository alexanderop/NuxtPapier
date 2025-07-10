<script setup lang="ts">
const { code = '', language = '', filename = '' } = defineProps<{
  code?: string
  language?: string
  filename?: string
  meta?: string
}>()

// Copy functionality
const copied = ref(false)
async function copyCode() {
  if (import.meta.client && code) {
    await navigator.clipboard.writeText(code)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}

// Get language display name
const languageDisplay = computed(() => {
  const langMap: Record<string, string> = {
    js: 'JavaScript',
    ts: 'TypeScript',
    vue: 'Vue',
    css: 'CSS',
    html: 'HTML',
    bash: 'Bash',
    json: 'JSON',
    md: 'Markdown',
    yaml: 'YAML',
    yml: 'YAML',
    python: 'Python',
    py: 'Python',
    jsx: 'JSX',
    tsx: 'TSX',
  }
  return langMap[language] || language.toUpperCase()
})
</script>

<template>
  <div class="group my-6 border border-border rounded-lg bg-surface-subtle relative overflow-hidden">
    <!-- Header -->
    <div class="px-4 py-2 border-b border-border bg-surface-base flex items-center justify-between">
      <div class="flex gap-2 items-center">
        <!-- Language label -->
        <span v-if="language" class="text-xs text-text-muted font-medium">
          {{ languageDisplay }}
        </span>
        <!-- Filename -->
        <span v-if="filename" class="text-xs text-text-muted">
          {{ filename }}
        </span>
      </div>

      <!-- Copy button -->
      <button
        type="button"
        class="text-xs px-2 py-1 rounded flex gap-1 transition-all items-center focus:outline-none hover:bg-surface-subtle focus:ring-2 focus:ring-primary/50"
        :class="copied ? 'text-green-600 dark:text-green-400' : 'text-text-muted hover:text-text-base'"
        @click="copyCode"
      >
        <Icon
          :name="copied ? 'mdi:check' : 'mdi:content-copy'"
          class="h-3.5 w-3.5"
        />
        <span>{{ copied ? 'Copied!' : 'Copy' }}</span>
      </button>
    </div>

    <!-- Code content -->
    <div class="overflow-x-auto">
      <pre class="!m-0 !border-0 !bg-transparent"><code :class="`language-${language}`">{{ code }}</code></pre>
    </div>
  </div>
</template>
