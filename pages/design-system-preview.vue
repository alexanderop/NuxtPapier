<script setup lang="ts">
import { computed, ref } from 'vue'

// Current colors
const currentColors = {
  light: {
    '--color-primary': '#3b82f6',
    '--color-secondary': '#6b7280',
    '--color-background': '#ffffff',
    '--color-surface': '#f3f4f6',
    '--color-text': '#111827',
    '--color-border': '#e5e7eb',
    '--color-text-muted': '#6b7280',
    '--color-header-bg': '#fafbfc',
    '--color-primary-hover': '#2563eb',
    '--color-secondary-hover': '#4b5563',
  },
  dark: {
    '--color-primary': '#ff78c8',
    '--color-secondary': '#715566',
    '--color-background': '#353640',
    '--color-surface': '#86436b',
    '--color-text': '#e9edf1',
    '--color-border': '#86436b',
    '--color-text-muted': '#715566',
    '--color-header-bg': '#3a3b45',
    '--color-primary-hover': '#ff9dd9',
    '--color-secondary-hover': '#86667a',
  },
}

// Improved colors
const improvedColors = {
  light: {
    '--color-primary': '#3b82f6',
    '--color-secondary': '#6b7280',
    '--color-background': '#ffffff',
    '--color-surface': '#f3f4f6',
    '--color-text': '#111827',
    '--color-border': '#e5e7eb',
    '--color-text-muted': '#4b5563', // Darker for better contrast
    '--color-header-bg': '#fafbfc',
    '--color-primary-hover': '#2563eb',
    '--color-secondary-hover': '#4b5563',
  },
  dark: {
    '--color-primary': '#ff8bd4', // Brighter pink
    '--color-secondary': '#9b7a8e', // Lighter secondary
    '--color-background': '#353640',
    '--color-surface': '#4a4b55', // Much lighter surface
    '--color-text': '#e9edf1',
    '--color-border': '#5a5b65', // Adjusted border
    '--color-text-muted': '#a8a9b3', // Much lighter muted text
    '--color-header-bg': '#3f404a', // Adjusted header
    '--color-primary-hover': '#ffa0dc', // Adjusted hover
    '--color-secondary-hover': '#b090a4', // Adjusted hover
  },
}

const selectedTheme = ref<'light' | 'dark'>('dark')
const showImproved = ref(false)

const activeColors = computed(() => {
  const theme = selectedTheme.value
  return showImproved.value ? improvedColors[theme] : currentColors[theme]
})
</script>

<template>
  <div class="preview-page">
    <div class="controls">
      <h1 class="text-2xl font-bold mb-4">
        Color Scheme Preview
      </h1>
      <div class="control-group">
        <div class="theme-selector">
          <button
            :class="{ active: selectedTheme === 'light' }"
            @click="selectedTheme = 'light'"
          >
            Light Mode
          </button>
          <button
            :class="{ active: selectedTheme === 'dark' }"
            @click="selectedTheme = 'dark'"
          >
            Dark Mode
          </button>
        </div>
        <label class="toggle-improved">
          <input
            v-model="showImproved"
            type="checkbox"
          >
          <span>Show Improved Colors</span>
        </label>
      </div>
    </div>

    <div class="preview-container">
      <!-- Current Colors Preview -->
      <div class="preview-section">
        <h2 class="section-title">
          {{ showImproved ? 'Improved' : 'Current' }} Colors
        </h2>
        <div
          id="preview-current"
          class="preview-box"
          :style="activeColors"
        >
          <div class="preview-header">
            <h3>Sample Application</h3>
            <button class="preview-button">
              Action
            </button>
          </div>

          <div class="preview-content">
            <div class="preview-card">
              <h4>Card Title</h4>
              <p>This is regular body text that should be easily readable.</p>
              <p class="muted">
                This is muted text for secondary information.
              </p>
              <a href="#" class="preview-link">This is a link</a>
            </div>

            <div class="preview-card">
              <h4>Form Example</h4>
              <input type="text" placeholder="Enter text here" class="preview-input">
              <div class="button-group">
                <button class="btn-primary">
                  Primary
                </button>
                <button class="btn-secondary">
                  Secondary
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Comparison Table -->
      <div class="comparison-section">
        <h2 class="section-title">
          Color Values
        </h2>
        <table class="comparison-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Current</th>
              <th>Improved</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(value, key) in currentColors[selectedTheme]" :key="key">
              <td>{{ key.replace('--color-', '') }}</td>
              <td>
                <div class="color-cell">
                  <span
                    class="color-swatch"
                    :style="{ background: value }"
                  />
                  {{ value }}
                </div>
              </td>
              <td>
                <div class="color-cell">
                  <span
                    class="color-swatch"
                    :style="{ background: improvedColors[selectedTheme][key] }"
                  />
                  {{ improvedColors[selectedTheme][key] }}
                </div>
              </td>
              <td>
                <span v-if="value !== improvedColors[selectedTheme][key]" class="changed">Changed</span>
                <span v-else class="unchanged">Same</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.preview-page {
  min-height: 100vh;
  padding: 2rem;
  background: var(--color-background);
  color: var(--color-text);
}

.controls {
  max-width: 1200px;
  margin: 0 auto 2rem;
}

.control-group {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.theme-selector {
  display: flex;
  gap: 0.5rem;
}

.theme-selector button {
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
  border-radius: 4px;
  cursor: pointer;
}

.theme-selector button.active {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.toggle-improved {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.toggle-improved input {
  width: 20px;
  height: 20px;
}

.preview-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 2rem;
}

.preview-section,
.comparison-section {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1.5rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.preview-box {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
  background: var(--color-background);
}

.preview-header {
  background: var(--color-header-bg);
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.preview-header h3 {
  margin: 0;
  color: var(--color-text);
}

.preview-button {
  background: var(--color-primary);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.preview-button:hover {
  background: var(--color-primary-hover);
}

.preview-content {
  padding: 1.5rem;
  display: grid;
  gap: 1.5rem;
}

.preview-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 1.25rem;
}

.preview-card h4 {
  margin: 0 0 0.75rem;
  color: var(--color-text);
}

.preview-card p {
  margin: 0.5rem 0;
  color: var(--color-text);
}

.preview-card .muted {
  color: var(--color-text-muted);
  font-size: 0.875rem;
}

.preview-link {
  color: var(--color-primary);
  text-decoration: none;
}

.preview-link:hover {
  color: var(--color-primary-hover);
  text-decoration: underline;
}

.preview-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: var(--color-background);
  color: var(--color-text);
  margin-bottom: 1rem;
}

.button-group {
  display: flex;
  gap: 0.75rem;
}

.btn-primary,
.btn-secondary {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
}

.btn-primary {
  background: var(--color-primary);
  color: white;
}

.btn-primary:hover {
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

.comparison-table {
  width: 100%;
  border-collapse: collapse;
}

.comparison-table th,
.comparison-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
}

.comparison-table th {
  font-weight: 600;
  background: var(--color-surface);
}

.color-cell {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: monospace;
  font-size: 0.875rem;
}

.color-swatch {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 1px solid var(--color-border);
}

.changed {
  color: var(--color-success);
  font-weight: 500;
}

.unchanged {
  color: var(--color-text-muted);
}
</style>
