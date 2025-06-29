<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, ref } from 'vue'

const props = withDefaults(defineProps<Props>(), {
  template: 'vue',
  editor: 'codemirror',
  theme: 'dark',
  layout: 'horizontal',
  showConsole: false,
  showEditor: true,
  showPreview: true,
})

// Lazy load the VuePlayground component to prevent bundling heavy dependencies
const AsyncVuePlayground = defineAsyncComponent(() =>
  import('~/components/content/VuePlayground.vue'),
)

interface Props {
  code?: string
  template?: 'vue' | 'vue-ts' | 'vanilla' | 'react' | 'solid'
  editor?: 'codemirror' | 'monaco'
  theme?: 'light' | 'dark'
  layout?: 'horizontal' | 'vertical'
  showConsole?: boolean
  showEditor?: boolean
  showPreview?: boolean
}

const isClient = ref(false)
const showPlayground = ref(false)

// Default Vue template if no code provided
const defaultCode = `<template>
  <div class="demo">
    <h1>{{ message }}</h1>
    <button @click="count++">Count: {{ count }}</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('Hello Vue Playground!')
const count = ref(0)
<\/script>

<style scoped>
.demo {
  text-align: center;
  padding: 2rem;
}

button {
  font-size: 1rem;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #3aa876;
}
</style>`

const playgroundCode = computed(() => props.code || defaultCode)

onMounted(() => {
  isClient.value = true
})
</script>

<template>
  <div class="playground-container">
    <div class="playground-header">
      <div class="playground-title">
        <Icon name="logos:vue" />
        <span>Vue Playground</span>
      </div>
      <button
        class="playground-toggle"
        @click="showPlayground = !showPlayground"
      >
        <Icon :name="showPlayground ? 'octicon:chevron-up-16' : 'octicon:play-16'" />
        {{ showPlayground ? 'Hide' : 'Open' }} Playground
      </button>
    </div>

    <div v-if="!showPlayground" class="code-preview">
      <pre class="language-vue"><code>{{ playgroundCode }}</code></pre>
    </div>

    <ClientOnly>
      <div v-if="showPlayground && isClient" class="playground-wrapper">
        <AsyncVuePlayground
          :code="playgroundCode"
          :editor="editor"
          :theme="theme"
          :layout="layout"
          :preview="showPreview"
          :ssr="false"
          :clear-console="true"
        />
      </div>
      <template #fallback>
        <div v-if="showPlayground" class="playground-loading">
          <div class="spinner" />
          <p>Loading playground...</p>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<style scoped>
.playground-container {
  margin: 2rem 0;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  overflow: hidden;
  background: var(--surface-primary);
}

.playground-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: var(--surface-secondary);
  border-bottom: 1px solid var(--border-color);
}

.playground-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: var(--text-color);
}

.playground-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--surface-primary);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.playground-toggle:hover {
  background: var(--brand-color);
  color: white;
  border-color: var(--brand-color);
  transform: translateY(-1px);
}

.playground-toggle:active {
  transform: translateY(0);
}

.code-preview {
  max-height: 400px;
  overflow: auto;
}

.code-preview pre {
  margin: 0;
  padding: 1rem;
  background: var(--surface-secondary);
  border-radius: 0;
}

.playground-wrapper {
  height: 600px;
  background: var(--surface-secondary);
}

.playground-wrapper :deep(.vue-playground) {
  height: 100%;
  margin: 0;
  border: none;
  border-radius: 0;
}

.playground-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  color: var(--text-muted);
}

.spinner {
  width: 2rem;
  height: 2rem;
  border: 2px solid var(--border-color);
  border-top-color: var(--brand-color);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.playground-loading p {
  margin-top: 1rem;
  font-size: 0.875rem;
}

/* Theme variables */
.playground-container {
  --surface-primary: oklch(var(--surface-primary-lightness) var(--surface-primary-chroma) var(--surface-primary-hue));
  --surface-secondary: oklch(
    var(--surface-secondary-lightness) var(--surface-secondary-chroma) var(--surface-secondary-hue)
  );
  --border-color: oklch(var(--border-lightness) var(--border-chroma) var(--border-hue));
  --text-color: oklch(var(--text-lightness) var(--text-chroma) var(--text-hue));
  --text-muted: oklch(var(--muted-lightness) var(--muted-chroma) var(--muted-hue));
  --brand-color: oklch(var(--brand-500));
}

/* Mobile responsive */
@media (max-width: 768px) {
  .playground-container {
    margin: 1rem -1rem;
    border-radius: 0;
  }

  .playground-wrapper {
    height: 500px;
  }
}
</style>
