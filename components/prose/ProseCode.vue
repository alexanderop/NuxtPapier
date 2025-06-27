<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

interface Props {
  code?: string
  language?: string
  filename?: string
  highlights?: number[]
}

const { code = '', language } = defineProps<Props>()

const { copy, copied } = useClipboard({ legacy: true })

function copyCode() {
  const codeText = code || document.querySelector('.prose-code code')?.textContent || ''
  copy(codeText)
}
</script>

<template>
  <div class="prose-code">
    <span v-if="language" class="prose-code-lang">{{ language }}</span>
    <button
      class="prose-code-copy"
      :title="copied ? 'Copied!' : 'Copy code'"
      @click="copyCode"
    >
      <Icon :name="copied ? 'i-ph-check' : 'i-ph-copy'" />
    </button>
    <code v-bind="$attrs">
      <slot />
    </code>
  </div>
</template>

<style scoped>
.prose-code {
  position: relative;
  display: inline-block;
  width: 100%;
}

.prose-code-lang {
  position: absolute;
  top: 0.5rem;
  right: 3rem;
  font-size: 0.75rem;
  color: oklch(var(--text-muted));
  background: oklch(var(--surface));
  padding: 0.125rem 0.5rem;
  border-radius: 0.25rem;
  z-index: 10;
}

.prose-code-copy {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.375rem;
  background: oklch(var(--surface));
  border: 1px solid oklch(var(--border));
  border-radius: 0.375rem;
  color: oklch(var(--text-muted));
  cursor: pointer;
  opacity: 0;
  transition: all 0.2s;
  z-index: 10;
}

.prose-code:hover .prose-code-copy {
  opacity: 1;
}

.prose-code-copy:hover {
  color: oklch(var(--text));
  background: oklch(var(--surface-secondary));
}
</style>
