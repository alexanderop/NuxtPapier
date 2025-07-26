<script setup lang="ts">
const { code = '', language = '', filename = '' } = defineProps<{
  /** The code content to display */
  code?: string
  /** Programming language for syntax highlighting */
  language?: string
  /** Optional filename to display in the header */
  filename?: string
}>()

// Copy functionality
const { copy, copied, isSupported } = useClipboard({ source: code })

// Get language display name
const languageDisplay = computed(() => {
  const langMap: Record<string, string> = {
    bash: 'Bash',
    css: 'CSS',
    html: 'HTML',
    js: 'JavaScript',
    json: 'JSON',
    jsx: 'JSX',
    md: 'Markdown',
    py: 'Python',
    python: 'Python',
    ts: 'TypeScript',
    tsx: 'TSX',
    vue: 'Vue',
    yaml: 'YAML',
    yml: 'YAML',
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
        <span
          v-if="language"
          class="text-xs text-text-muted font-medium"
        >
          {{ languageDisplay }}
        </span>
        <!-- Filename -->
        <span
          v-if="filename"
          class="text-xs text-text-muted"
        >
          {{ filename }}
        </span>
      </div>

      <!-- Copy button -->
      <button
        v-if="isSupported"
        type="button"
        class="text-xs px-2 py-1 rounded flex gap-1 transition-all items-center focus:outline-none hover:bg-surface-subtle focus:ring-2 focus:ring-primary/50"
        :class="copied ? 'text-[var(--color-success)]' : 'text-text-muted hover:text-text-base'"
        @click="copy()"
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
