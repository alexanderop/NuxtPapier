<script setup lang="ts">
import { computed, onMounted, ref, shallowRef } from 'vue'
import { tryCatch } from '~/utils/tryCatch'

interface Props {
  code?: string
  files?: Record<string, string>
  ssr?: boolean
  preview?: boolean
  editor?: 'codemirror' | 'monaco'
  theme?: 'light' | 'dark'
  previewOptions?: {
    headHTML?: string
    bodyHTML?: string
    customCode?: {
      importCode?: string
      useCode?: string
    }
  }
  layout?: 'horizontal' | 'vertical'
  clearConsole?: boolean
  showCompileOutput?: boolean
  showImportMap?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  editor: 'codemirror',
  theme: 'dark',
  layout: 'horizontal',
  preview: true,
  ssr: false,
  clearConsole: true,
  showCompileOutput: false,
  showImportMap: false,
})

const store = shallowRef<any>()
const Repl = shallowRef<any>()
const editorComponent = shallowRef<any>()
const isLoading = ref(true)
const isDark = computed(() => props.theme === 'dark')

// Default Vue 3 code if none provided
const defaultCode = `<template>
  <div class="app">
    <h1>{{ greeting }}</h1>
    <button @click="count++">Count is: {{ count }}</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const greeting = ref('Hello Vue Playground!')
const count = ref(0)
<\/script>

<style scoped>
.app {
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 2rem;
}

button {
  font-size: 1rem;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #3aa876;
}
</style>`

onMounted(async () => {
  // Dynamic imports to prevent SSR issues
  const loadModules = async () => {
    const replModule = await import('@vue/repl')
    const editorModule = props.editor === 'monaco'
      ? await import('@vue/repl/monaco-editor')
      : await import('@vue/repl/codemirror-editor')

    Repl.value = replModule.Repl
    editorComponent.value = editorModule.default

    // Create the store
    const { useStore } = replModule
    store.value = useStore()

    // Set default Vue runtime
    if (store.value.vueVersion) {
      store.value.vueVersion.value = 'latest'
    }

    // Set initial files
    if (props.files) {
      // If files are provided, use them
      const files: Record<string, string> = {}
      for (const [name, content] of Object.entries(props.files)) {
        files[name] = content
      }
      await store.value.setFiles(files)
    }
    else {
      // Otherwise use the code prop or default
      await store.value.setFiles({
        'App.vue': props.code || defaultCode,
      })
    }

    // Set options
    if (store.value.options) {
      store.value.options.showCompileOutput = props.showCompileOutput
      store.value.options.showImportMap = props.showImportMap
    }
  }

  const result = await tryCatch(loadModules())

  if (result.error) {
    console.error('Failed to load Vue REPL:', result.error)
  }

  isLoading.value = false
})
</script>

<template>
  <div class="vue-playground">
    <ClientOnly>
      <component
        :is="Repl"
        v-if="store && Repl && editorComponent && !isLoading"
        :store="store"
        :editor="editorComponent"
        :ssr="ssr"
        :preview="preview"
        :layout="layout"
        :clear-console="clearConsole"
        :theme="isDark ? 'dark' : 'light'"
        :preview-options="previewOptions"
      />
      <div v-else class="loading">
        <div class="spinner" />
        <p>Loading Vue Playground...</p>
      </div>

      <template #fallback>
        <div class="loading">
          <div class="spinner" />
          <p>Loading Interactive Playground...</p>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<style>
.vue-playground {
  height: 500px;
  margin: 1.5rem 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: var(--vp-c-bg);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--vp-c-divider);
  border-top-color: var(--vp-c-brand);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading p {
  margin-top: 1rem;
  color: var(--vp-c-text-2);
}

/* Override Repl styles for better integration */
.vue-repl {
  height: 100% !important;
  --color-branding: var(--vp-c-brand) !important;
  --color-branding-dark: var(--vp-c-brand-dark) !important;
}

/* Theme integration */
.vue-playground {
  --vp-c-bg: var(--bg-color);
  --vp-c-bg-soft: var(--surface-primary);
  --vp-c-divider: var(--border-color);
  --vp-c-text-1: var(--text-color);
  --vp-c-text-2: var(--text-muted);
  --vp-c-brand: oklch(var(--brand-500));
  --vp-c-brand-dark: oklch(var(--brand-600));

  --bg-color: oklch(var(--bg-lightness) var(--bg-chroma) var(--bg-hue));
  --surface-primary: oklch(var(--surface-primary-lightness) var(--surface-primary-chroma) var(--surface-primary-hue));
  --border-color: oklch(var(--border-lightness) var(--border-chroma) var(--border-hue));
  --text-color: oklch(var(--text-lightness) var(--text-chroma) var(--text-hue));
  --text-muted: oklch(var(--muted-lightness) var(--muted-chroma) var(--muted-hue));
}

/* Dark mode adjustments */
:root.dark .vue-playground {
  --vp-c-bg: #1a1a1a;
  --vp-c-bg-soft: #242424;
}

/* Responsive */
@media (max-width: 768px) {
  .vue-playground {
    height: 600px;
    margin: 1rem -1rem;
    border-radius: 0;
  }
}
</style>
