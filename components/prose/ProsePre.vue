<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

interface Props {
  code?: string
  language?: string
  filename?: string
  highlights?: number[]
}

const { code = '', filename } = defineProps<Props>()

const preRef = ref<HTMLPreElement>()
const { copy, copied } = useClipboard({ legacy: true })

function copyCode() {
  const element = preRef.value || document.querySelector('.prose-pre-container pre')
  const codeText = code || element?.textContent || ''
  copy(codeText)
}
</script>

<template>
  <div class="prose-pre-wrapper">
    <div v-if="filename" class="prose-pre-filename">
      <Icon name="i-ph-file-code" />
      {{ filename }}
    </div>
    <div class="prose-pre-container">
      <button
        class="prose-pre-copy"
        :title="copied ? 'Copied!' : 'Copy code'"
        @click="copyCode"
      >
        <Icon :name="copied ? 'i-ph-check' : 'i-ph-copy'" />
        <span class="prose-pre-copy-text">{{ copied ? 'Copied' : 'Copy' }}</span>
      </button>
      <pre v-bind="$attrs"><slot /></pre>
    </div>
  </div>
</template>

<style scoped>
.prose-pre-wrapper {
  margin: 1.5rem 0;
  border-radius: 0.5rem;
  overflow: hidden;
  background: oklch(var(--surface));
  border: 1px solid oklch(var(--border));
}

.prose-pre-filename {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: oklch(var(--text-muted));
  background: oklch(var(--surface-secondary));
  border-bottom: 1px solid oklch(var(--border));
}

.prose-pre-container {
  position: relative;
}

.prose-pre-container pre {
  margin: 0;
  border-radius: 0;
  border: none;
}

.prose-pre-copy {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  background: oklch(var(--surface) / 0.9);
  backdrop-filter: blur(4px);
  border: 1px solid oklch(var(--border));
  border-radius: 0.375rem;
  color: oklch(var(--text-muted));
  font-size: 0.875rem;
  cursor: pointer;
  opacity: 0;
  transition: all 0.2s;
  z-index: 10;
}

.prose-pre-wrapper:hover .prose-pre-copy {
  opacity: 1;
}

.prose-pre-copy:hover {
  color: oklch(var(--text));
  background: oklch(var(--surface-secondary) / 0.9);
}

.prose-pre-copy-text {
  display: none;
}

@media (min-width: 640px) {
  .prose-pre-copy-text {
    display: inline;
  }
}
</style>
