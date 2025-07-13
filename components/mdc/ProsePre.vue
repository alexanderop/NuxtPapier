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

const codeCopied = ref(false)

async function copyCode() {
  if (import.meta.client && code) {
    try {
      await navigator.clipboard.writeText(code)
      codeCopied.value = true
      setTimeout(() => {
        codeCopied.value = false
      }, 3000)
    }
    catch (error) {
      console.error('Error: Unable to copy code.', error)
    }
  }
}

// Get language display name
const languageDisplay = computed(() => {
  const langMap: Record<string, string> = {
    js: 'JavaScript',
    javascript: 'JavaScript',
    ts: 'TypeScript',
    typescript: 'TypeScript',
    vue: 'Vue',
    css: 'CSS',
    html: 'HTML',
    bash: 'Bash',
    shell: 'Shell',
    json: 'JSON',
    md: 'Markdown',
    markdown: 'Markdown',
    yaml: 'YAML',
    yml: 'YAML',
    python: 'Python',
    py: 'Python',
    jsx: 'JSX',
    tsx: 'TSX',
  }
  if (!language)
    return ''
  return langMap[language] || language.toUpperCase()
})
</script>

<template>
  <div class="pre">
    <div class="pre-head">
      <!-- Filename and language -->
      <div class="pre-meta">
        <span v-if="filename" class="filename">
          <i>{{ filename }}</i>
        </span>
        <span v-else-if="languageDisplay" class="language">
          {{ languageDisplay }}
        </span>
      </div>

      <!-- Copy section -->
      <div class="pre-actions">
        <span v-if="codeCopied" class="copy-success">
          <Icon name="mdi:check-circle" class="icon" />
          <i>Copied!</i>
        </span>
        <button type="button" class="copy-btn" @click="copyCode">
          <Icon name="mdi:content-copy" class="icon" />
          Copy
        </button>
      </div>
    </div>
    <pre class="pre-body" :class="className"><slot /></pre>
  </div>
</template>

<style lang="scss" scoped>
.pre {
  overflow-x: hidden;
  border-radius: 8px;
  margin: 1.5rem 0;
  background-color: var(--shiki-default-bg);
  border: 1px solid var(--color-border);

  &-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0.75rem;
    border-bottom: 1px solid var(--color-border);
    background-color: rgba(0, 0, 0, 0.03);
  }

  &-meta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  &-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .filename,
  .language,
  .copy-success,
  .copy-btn {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--color-text-muted);
  }

  .filename {
    font-style: normal;
  }

  .copy-success,
  .copy-btn {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    transition: all 0.2s;
  }

  .copy-success {
    color: rgb(34 197 94);

    .icon {
      width: 14px;
      height: 14px;
    }
  }

  .copy-btn {
    background-color: transparent;
    border: 1px solid var(--color-border);
    color: var(--color-text-muted);
    cursor: pointer;

    .icon {
      width: 14px;
      height: 14px;
    }

    &:hover {
      color: var(--color-text);
      border-color: var(--color-text-muted);
      background-color: var(--color-surface);
    }

    &:active {
      transform: scale(0.95);
    }
  }

  &-body {
    margin: 0;
    padding: 1rem 0;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    overflow-x: auto;
    font-size: 0.875rem;
    line-height: 1.6;

    // Ensure code takes full width and can scroll
    code {
      display: inline-block;
      width: 100%;
      min-width: max-content;
      padding: 0;
    }

    // Style for each line
    :deep(.line) {
      display: block;
      padding: 0 1rem;
      min-height: 1.4rem;

      // Reset any background from spans inside
      span {
        background-color: transparent !important;
      }

      // Line highlighting from {1,3-5} syntax
      &.highlight,
      &.highlighted {
        position: relative;
        background-color: rgba(255, 120, 200, 0.03); // Very subtle pink tint

        // Subtle inner glow/blur effect
        box-shadow:
          inset 0 0 20px rgba(255, 120, 200, 0.05),
          0 0 8px rgba(255, 120, 200, 0.03);

        // Subtle gradient overlay
        &::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(255, 120, 200, 0.06) 0%,
            rgba(255, 120, 200, 0.02) 50%,
            rgba(255, 120, 200, 0.06) 100%
          );
          pointer-events: none;
          mix-blend-mode: multiply;
        }

        // Left accent bar - very subtle
        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, transparent 0%, var(--color-primary) 50%, transparent 100%);
          opacity: 0.3;
        }
      }

      // Diff highlighting
      &.diff {
        position: relative;

        &.remove {
          background-color: rgba(244, 63, 94, 0.05);

          // Subtle red glow
          &::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(to right, rgba(244, 63, 94, 0.1) 0%, transparent 30%);
            pointer-events: none;
            z-index: 0;
          }

          &::before {
            content: '-';
            position: absolute;
            left: 0.5rem;
            color: rgb(244 63 94);
            font-weight: 600;
            opacity: 0.7;
            z-index: 1;
          }
        }

        &.add {
          background-color: rgba(34, 197, 94, 0.05);

          // Subtle green glow
          &::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(to right, rgba(34, 197, 94, 0.1) 0%, transparent 30%);
            pointer-events: none;
            z-index: 0;
          }

          &::before {
            content: '+';
            position: absolute;
            left: 0.5rem;
            color: rgb(34 197 94);
            font-weight: 600;
            opacity: 0.7;
            z-index: 1;
          }
        }
      }
    }

    // Line numbers
    &.line-numbers {
      :deep(.line) {
        position: relative;
        padding-left: 3.5rem;

        &::before {
          content: attr(line);
          position: absolute;
          left: 1rem;
          color: var(--color-text-muted);
          opacity: 0.5;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          user-select: none;
        }
      }
    }

    // Custom scrollbar
    &::-webkit-scrollbar {
      height: 6px;
    }

    &::-webkit-scrollbar-track {
      background: var(--color-surface);
    }

    &::-webkit-scrollbar-thumb {
      background: var(--color-border);
      border-radius: 3px;

      &:hover {
        background: var(--color-text-muted);
      }
    }
  }
}

// Dark mode adjustments
:root.dark .pre {
  // Ensure proper contrast in dark mode
  background-color: var(--shiki-dark-bg, #1e1e1e);

  &-head {
    background-color: rgba(255, 255, 255, 0.05);
  }

  .copy-success {
    color: rgb(74 222 128);
  }

  &-body {
    // Ensure the code background is properly set
    background-color: transparent;

    .line {
      &.highlight,
      &.highlighted {
        // Keep the same subtle highlight style in dark mode
        background-color: rgba(255, 120, 200, 0.06);

        &::after {
          background: radial-gradient(ellipse at center, rgba(255, 120, 200, 0.1) 0%, transparent 80%);
        }
      }

      &.diff {
        &.remove {
          background-color: rgba(244, 63, 94, 0.08);
        }

        &.add {
          background-color: rgba(34, 197, 94, 0.08);
        }
      }
    }
  }
}

// Light mode specific adjustments
:root:not(.dark) .pre {
  // Light mode uses slightly stronger colors
  &-head {
    background-color: rgba(0, 0, 0, 0.02);
  }

  &-body {
    .line {
      &.highlight,
      &.highlighted {
        // Matches the default styling which uses the pink theme color
        background-color: rgba(255, 120, 200, 0.04);
      }

      &.diff {
        &.remove {
          background-color: rgba(244, 63, 94, 0.06);
        }

        &.add {
          background-color: rgba(34, 197, 94, 0.06);
        }
      }
    }
  }
}

// Ensure proper color inheritance from Shiki
.shiki {
  background-color: transparent !important;
}
</style>
