<script setup lang="ts">
const {
  code = '',
  language = null,
  filename = null,
  class: className = null,
} = defineProps<{
  /** The code content to display */
  code?: string
  /** Programming language for syntax highlighting */
  language?: string | null
  /** Optional filename to display in the header */
  filename?: string | null
  /** Additional CSS classes to apply to the pre element */
  class?: string | null
}>()

const { copy, copied: codeCopied, isSupported } = useClipboard({
  copiedDuring: 3000,
  source: code, // 3 seconds timeout to match original behavior
})

// Get language display name
const languageDisplay = computed(() => {
  const langMap: Record<string, string> = {
    bash: 'Bash',
    css: 'CSS',
    html: 'HTML',
    javascript: 'JavaScript',
    js: 'JavaScript',
    json: 'JSON',
    jsx: 'JSX',
    markdown: 'Markdown',
    md: 'Markdown',
    py: 'Python',
    python: 'Python',
    shell: 'Shell',
    ts: 'TypeScript',
    tsx: 'TSX',
    typescript: 'TypeScript',
    vue: 'Vue',
    yaml: 'YAML',
    yml: 'YAML',
  }
  if (!language)
    return ''
  return langMap[language] || language.toUpperCase()
})
</script>

<template>
  <div class="prose-pre">
    <div class="prose-pre-head">
      <!-- Filename and language -->
      <div class="flex gap-2 items-center">
        <span
          v-if="filename"
          class="text-xs text-text-muted font-mono"
        >
          <i class="not-italic">{{ filename }}</i>
        </span>

        <span
          v-else-if="languageDisplay"
          class="text-xs text-text-muted font-mono"
        >
          {{ languageDisplay }}
        </span>
      </div>

      <!-- Copy section -->
      <div class="flex gap-2 items-center">
        <span
          v-if="codeCopied"
          class="text-xs text-green-500 font-mono px-2 py-1 rounded flex gap-1 items-center dark:text-green-400"
        >
          <Icon
            name="mdi:check-circle"
            class="h-3.5 w-3.5"
          />

          <i class="not-italic">Copied!</i>
        </span>

        <button
          v-if="isSupported"
          type="button"
          class="text-xs text-text-muted font-mono px-2 py-1 rounded flex gap-1 transition-all duration-200 items-center hover:text-text hover:bg-white/5 active:scale-95"
          @click="copy()"
        >
          <Icon
            name="mdi:content-copy"
            class="h-3.5 w-3.5"
          />
          Copy
        </button>
      </div>
    </div>

    <pre
      class="prose-pre-body"
      :class="className"
    ><slot /></pre>
  </div>
</template>
