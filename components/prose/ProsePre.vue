<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

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

const showPlayground = ref(false)

// Check if this is a standard Vue code block or has the meta attribute
const checkVuePlayground = computed(() => {
  // Check for meta in different places
  const metaAttr = props.meta || ''
  const hasPlaygroundMeta = metaAttr.includes('vue-playground') || metaAttr.includes('playground')
  const isVueLanguage = props.language === 'vue'

  // Remove console.log for production
  // console.log('Checking playground:', {
  //   language: props.language,
  //   meta: props.meta,
  //   hasPlaygroundMeta,
  //   isVueLanguage,
  // })

  return isVueLanguage && hasPlaygroundMeta
})

const isVuePlayground = computed(() => checkVuePlayground.value)

const playgroundId = computed(() => `playground-${Math.random().toString(36).substr(2, 9)}`)

// Parse playground options from meta
const playgroundOptions = computed(() => {
  if (!props.meta)
    return {}

  const options: Record<string, any> = {
    editor: 'codemirror',
    theme: 'dark',
    layout: 'horizontal',
  }

  const metaParts = props.meta.split(/\s+/)
  metaParts.forEach((part) => {
    if (part.includes('=')) {
      const [key, value] = part.split('=')
      if (key && value) {
        options[key] = value
      }
    }
  })

  return options
})

// Extract code from slot if not provided as prop
const codeContent = ref('')

onMounted(() => {
  if (!props.code) {
    // Get code from the pre element content
    const preElement = document.querySelector(`[data-playground-id="${playgroundId.value}"]`)
    if (preElement) {
      const codeElement = preElement.querySelector('code')
      codeContent.value = codeElement?.textContent || ''
    }
  }
  else {
    codeContent.value = props.code
  }
})
</script>

<template>
  <div v-if="isVuePlayground" class="vue-playground-wrapper">
    <div class="playground-header">
      <span class="playground-label">Vue Playground</span>
      <button
        class="playground-toggle"
        @click="showPlayground = !showPlayground"
      >
        <Icon :name="showPlayground ? 'octicon:eye-closed-16' : 'octicon:eye-16'" />
        {{ showPlayground ? 'Hide' : 'Show' }} Playground
      </button>
    </div>

    <!-- Show code block by default -->
    <pre
      v-show="!showPlayground"
      :class="props.class"
      :data-language="language"
      :data-playground-id="playgroundId"
    ><code><slot>{{ codeContent || code }}</slot></code></pre>

    <!-- Show playground when toggled -->
    <ClientOnly>
      <VuePlayground
        v-if="showPlayground && (codeContent || code)"
        :code="codeContent || code"
        :editor="playgroundOptions.editor"
        :theme="playgroundOptions.theme"
        :layout="playgroundOptions.layout"
        :preview="playgroundOptions.preview !== 'false'"
        :show-compile-output="playgroundOptions.showCompileOutput === 'true'"
        :show-import-map="playgroundOptions.showImportMap === 'true'"
      />
    </ClientOnly>
  </div>

  <!-- Regular code block -->
  <pre
    v-else
    :class="props.class"
    :data-language="language"
  ><code><slot>{{ code }}</slot></code></pre>
</template>

<style scoped>
.vue-playground-wrapper {
  margin: 1.5rem 0;
}

.playground-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: var(--surface-secondary);
  border: 1px solid var(--border-color);
  border-bottom: 0;
  border-radius: 0.5rem 0.5rem 0 0;
}

.playground-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--brand-color);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.playground-label::before {
  content: '';
  display: inline-block;
  width: 0.875rem;
  height: 0.875rem;
  background: var(--brand-color);
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='currentColor' d='M2 3h3.5L12 15l6.5-12H22L12 21z'/%3E%3C/svg%3E")
    no-repeat center / contain;
}

.playground-toggle {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  background: var(--surface-primary);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.playground-toggle:hover {
  background: var(--surface-secondary);
  border-color: var(--brand-color);
  color: var(--brand-color);
}

.vue-playground-wrapper pre {
  margin: 0;
  border-radius: 0 0 0.5rem 0.5rem;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

/* Theme variables */
.vue-playground-wrapper {
  --surface-primary: oklch(var(--surface-primary-lightness) var(--surface-primary-chroma) var(--surface-primary-hue));
  --surface-secondary: oklch(
    var(--surface-secondary-lightness) var(--surface-secondary-chroma) var(--surface-secondary-hue)
  );
  --border-color: oklch(var(--border-lightness) var(--border-chroma) var(--border-hue));
  --text-color: oklch(var(--text-lightness) var(--text-chroma) var(--text-hue));
  --brand-color: oklch(var(--brand-500));
}
</style>
