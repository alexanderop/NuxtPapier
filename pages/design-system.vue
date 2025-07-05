<script setup lang="ts">
import { onMounted, ref } from 'vue'

// Color definitions matching the CSS variables
const colors = [
  { name: 'Primary', var: '--color-primary', category: 'main' },
  { name: 'Secondary', var: '--color-secondary', category: 'main' },
  { name: 'Background', var: '--color-background', category: 'main' },
  { name: 'Surface', var: '--color-surface', category: 'main' },
  { name: 'Text', var: '--color-text', category: 'main' },
  { name: 'Border', var: '--color-border', category: 'semantic' },
  { name: 'Text Muted', var: '--color-text-muted', category: 'semantic' },
  { name: 'Header BG', var: '--color-header-bg', category: 'semantic' },
  { name: 'Primary Hover', var: '--color-primary-hover', category: 'state' },
  { name: 'Secondary Hover', var: '--color-secondary-hover', category: 'state' },
  { name: 'Success', var: '--color-success', category: 'state' },
  { name: 'Error', var: '--color-error', category: 'state' },
  { name: 'Warning', var: '--color-warning', category: 'state' },
  { name: 'Info', var: '--color-info', category: 'state' },
]

const showCopyNotification = ref(false)
const copiedText = ref('')

// Get computed color values
const colorValues = ref<Record<string, string>>({})

function updateColorValues() {
  const computedStyle = getComputedStyle(document.documentElement)
  const values: Record<string, string> = {}

  colors.forEach((color) => {
    values[color.var] = computedStyle.getPropertyValue(color.var).trim()
  })

  colorValues.value = values
}

// Copy to clipboard function
async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    copiedText.value = text
    showCopyNotification.value = true

    setTimeout(() => {
      showCopyNotification.value = false
    }, 2000)
  }
  catch (err) {
    console.error('Failed to copy:', err)
  }
}

// Update color values on mount and theme change
onMounted(() => {
  updateColorValues()
})

watchEffect(() => {
  // Re-calculate colors when theme changes
  if (process.client) {
    updateColorValues()
  }
})

// Spacing values
const spacingValues = [8, 16, 24, 32, 48]
</script>

<template>
  <div class="design-system-page">
    <!-- Header -->
    <div class="canvas-header">
      <h1 class="canvas-title">
        Design System
      </h1>
    </div>

    <div class="canvas-container">
      <!-- Color Palette Section -->
      <section class="section">
        <h2 class="section-title">
          Color Palette
        </h2>
        <div class="color-grid">
          <div
            v-for="color in colors"
            :key="color.var"
            class="color-card"
          >
            <div
              class="color-preview"
              :style="{ backgroundColor: `var(${color.var})` }"
              @click="copyToClipboard(colorValues[color.var] || '')"
            />
            <div class="color-info">
              <div class="color-name">
                {{ color.name }}
              </div>
              <div class="color-value">
                {{ colorValues[color.var] }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Typography Section -->
      <section class="section">
        <h2 class="section-title">
          Typography
        </h2>
        <div class="typography-samples">
          <div class="type-sample">
            <div class="type-label">
              Heading 1
            </div>
            <h1 class="text-4xl font-bold">
              The quick brown fox jumps over the lazy dog
            </h1>
          </div>
          <div class="type-sample">
            <div class="type-label">
              Heading 2
            </div>
            <h2 class="text-3xl font-semibold">
              The quick brown fox jumps over the lazy dog
            </h2>
          </div>
          <div class="type-sample">
            <div class="type-label">
              Body Text
            </div>
            <p class="text-base leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div class="type-sample">
            <div class="type-label">
              Small Text
            </div>
            <p class="text-sm opacity-80">
              This is smaller text used for captions and secondary information.
            </p>
          </div>
        </div>
      </section>

      <!-- Components Section -->
      <section class="section">
        <h2 class="section-title">
          Components
        </h2>
        <div class="component-grid">
          <div class="component-card">
            <h3 class="text-base font-semibold mb-4">
              Buttons
            </h3>
            <div class="button-examples">
              <button class="btn-primary btn">
                Primary Button
              </button>
              <button class="btn btn-secondary">
                Secondary Button
              </button>
              <button class="btn btn-primary" disabled>
                Disabled
              </button>
            </div>
          </div>
          <div class="component-card">
            <h3 class="text-base font-semibold mb-4">
              Form Elements
            </h3>
            <input
              type="text"
              placeholder="Input field"
              class="input-field"
            >
            <div class="mt-3">
              <label class="checkbox-label">
                <input type="checkbox" class="checkbox">
                <span class="text-sm">Checkbox option</span>
              </label>
            </div>
          </div>
        </div>
      </section>

      <!-- States Section -->
      <section class="section">
        <h2 class="section-title">
          Interactive States
        </h2>
        <div class="states-grid">
          <div class="state-card state-default">
            Default
          </div>
          <div class="state-card state-hover">
            Hover
          </div>
          <div class="state-card state-active">
            Active
          </div>
          <div class="state-card state-disabled">
            Disabled
          </div>
        </div>
      </section>

      <!-- Spacing Section -->
      <section class="section">
        <h2 class="section-title">
          Spacing System
        </h2>
        <div class="spacing-demo">
          <div
            v-for="space in spacingValues"
            :key="space"
            class="spacing-item"
          >
            <div
              class="spacing-box"
              :style="{ height: `${space}px` }"
            />
            <div class="spacing-label">
              {{ space }}px
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Copy notification -->
    <Transition name="notification">
      <div v-if="showCopyNotification" class="copy-notification">
        Copied to clipboard!
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.design-system-page {
  background: #f5f5f5;
  min-height: 100vh;
  padding: 40px 20px;
}

html[data-theme='dark'] .design-system-page {
  background: #1a1a1a;
}

.canvas-header {
  max-width: 1400px;
  margin: 0 auto 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.canvas-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--color-text);
}

.canvas-container {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  gap: 32px;
}

.section {
  background: var(--color-background);
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid var(--color-border);
}

html[data-theme='dark'] .section {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 24px;
  color: var(--color-text);
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-title::before {
  content: '';
  width: 4px;
  height: 24px;
  background: var(--color-primary);
  border-radius: 2px;
}

/* Color Palette */
.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.color-card {
  background: var(--color-surface);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--color-border);
  transition: transform 0.2s;
}

.color-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.color-preview {
  height: 80px;
  position: relative;
  cursor: pointer;
}

.color-info {
  padding: 16px;
}

.color-name {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
}

.color-value {
  font-size: 12px;
  color: var(--color-text-muted);
  font-family: 'Courier New', monospace;
}

/* Typography */
.typography-samples {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.type-sample {
  padding: 20px;
  background: var(--color-surface);
  border-radius: 8px;
  border: 1px solid var(--color-border);
}

.type-label {
  font-size: 12px;
  color: var(--color-text-muted);
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Components */
.component-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.component-card {
  background: var(--color-surface);
  border-radius: 8px;
  padding: 24px;
  border: 1px solid var(--color-border);
}

.button-examples {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.btn {
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: var(--color-primary);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: var(--color-primary-hover);
}

.btn-secondary {
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.btn-secondary:hover {
  background: var(--color-secondary);
  color: white;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-background);
  color: var(--color-text);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.checkbox {
  width: 16px;
  height: 16px;
}

/* States */
.states-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
}

.state-card {
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
}

.state-default {
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.state-hover {
  background: var(--color-primary);
  color: white;
}

.state-active {
  background: var(--color-primary-hover);
  color: white;
}

.state-disabled {
  background: var(--color-surface);
  color: var(--color-text-muted);
  opacity: 0.5;
}

/* Spacing */
.spacing-demo {
  display: flex;
  gap: 24px;
  align-items: flex-end;
}

.spacing-item {
  text-align: center;
}

.spacing-box {
  width: 40px;
  background: var(--color-primary);
  opacity: 0.2;
  border: 2px dashed var(--color-primary);
  margin-bottom: 8px;
}

.spacing-label {
  font-size: 12px;
  color: var(--color-text-muted);
}

/* Copy notification */
.copy-notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: var(--color-primary);
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  pointer-events: none;
}

/* Transition */
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
