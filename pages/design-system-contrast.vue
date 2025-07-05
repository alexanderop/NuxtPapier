<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

// Color definitions
const colors = [
  { name: 'Primary', var: '--color-primary' },
  { name: 'Secondary', var: '--color-secondary' },
  { name: 'Background', var: '--color-background' },
  { name: 'Surface', var: '--color-surface' },
  { name: 'Text', var: '--color-text' },
  { name: 'Border', var: '--color-border' },
  { name: 'Text Muted', var: '--color-text-muted' },
]

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

// Convert hex to RGB
function hexToRgb(hex: string): { r: number, g: number, b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: Number.parseInt(result[1], 16),
        g: Number.parseInt(result[2], 16),
        b: Number.parseInt(result[3], 16),
      }
    : null
}

// Calculate relative luminance
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((val) => {
    val = val / 255
    return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

// Calculate contrast ratio
function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)

  if (!rgb1 || !rgb2)
    return 0

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b)
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b)

  const brightest = Math.max(lum1, lum2)
  const darkest = Math.min(lum1, lum2)

  return (brightest + 0.05) / (darkest + 0.05)
}

// WCAG compliance levels
function getWCAGLevel(ratio: number, isLargeText: boolean = false): string {
  if (isLargeText) {
    if (ratio >= 4.5)
      return 'AAA'
    if (ratio >= 3)
      return 'AA'
  }
  else {
    if (ratio >= 7)
      return 'AAA'
    if (ratio >= 4.5)
      return 'AA'
  }
  return 'FAIL'
}

// Contrast tests
const contrastTests = computed(() => {
  const bg = colorValues.value['--color-background']
  const surface = colorValues.value['--color-surface']

  return [
    {
      name: 'Text on Background',
      color1: colorValues.value['--color-text'],
      color2: bg,
      description: 'Main text readability',
    },
    {
      name: 'Text Muted on Background',
      color1: colorValues.value['--color-text-muted'],
      color2: bg,
      description: 'Secondary text readability',
    },
    {
      name: 'Primary on Background',
      color1: colorValues.value['--color-primary'],
      color2: bg,
      description: 'Links and primary actions',
    },
    {
      name: 'Text on Surface',
      color1: colorValues.value['--color-text'],
      color2: surface,
      description: 'Text on cards/panels',
    },
    {
      name: 'Text Muted on Surface',
      color1: colorValues.value['--color-text-muted'],
      color2: surface,
      description: 'Secondary text on cards',
    },
    {
      name: 'White on Primary',
      color1: '#ffffff',
      color2: colorValues.value['--color-primary'],
      description: 'Button text readability',
    },
    {
      name: 'Surface on Background',
      color1: surface,
      color2: bg,
      description: 'Card/panel visibility',
    },
  ]
})

// Color improvement suggestions
const improvedColors = ref({
  light: {
    '--color-text-muted': '#4b5563', // Darker gray for better contrast
  },
  dark: {
    '--color-text-muted': '#a8a9b3', // Lighter for better contrast
    '--color-surface': '#4a4b55', // Lighter surface for better separation
    '--color-border': '#5a5b65', // Adjusted border
    '--color-primary': '#ff8bd4', // Slightly brighter pink
    '--color-secondary': '#9b7a8e', // Lighter secondary
  },
})

// Theme detection
const isDark = computed(() => {
  return document.documentElement.getAttribute('data-theme') === 'dark'
})

onMounted(() => {
  updateColorValues()
})

watchEffect(() => {
  if (process.client) {
    updateColorValues()
  }
})
</script>

<template>
  <div class="contrast-analysis-page">
    <div class="mx-auto px-4 py-8 container max-w-6xl">
      <h1 class="text-3xl font-bold mb-8">
        Color Contrast Analysis
      </h1>

      <!-- Current Contrast Ratios -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold mb-6">
          Current Contrast Ratios
        </h2>
        <div class="contrast-grid">
          <div
            v-for="test in contrastTests"
            :key="test.name"
            class="contrast-card"
          >
            <div class="contrast-header">
              <h3 class="font-medium">
                {{ test.name }}
              </h3>
              <p class="text-sm opacity-75">
                {{ test.description }}
              </p>
            </div>

            <div class="contrast-preview">
              <div
                class="color-sample"
                :style="{ backgroundColor: test.color2 }"
              >
                <span :style="{ color: test.color1 }">Sample Text</span>
              </div>
            </div>

            <div class="contrast-info">
              <div class="contrast-ratio">
                {{ test.color1 && test.color2 ? getContrastRatio(test.color1, test.color2).toFixed(2) : 'N/A' }}:1
              </div>
              <div class="wcag-badges">
                <span
                  class="wcag-badge"
                  :class="{
                    'wcag-pass': getWCAGLevel(getContrastRatio(test.color1 || '', test.color2 || '')) !== 'FAIL',
                    'wcag-fail': getWCAGLevel(getContrastRatio(test.color1 || '', test.color2 || '')) === 'FAIL',
                  }"
                >
                  Normal: {{ getWCAGLevel(getContrastRatio(test.color1 || '', test.color2 || '')) }}
                </span>
                <span
                  class="wcag-badge"
                  :class="{
                    'wcag-pass': getWCAGLevel(getContrastRatio(test.color1 || '', test.color2 || ''), true) !== 'FAIL',
                    'wcag-fail': getWCAGLevel(getContrastRatio(test.color1 || '', test.color2 || ''), true) === 'FAIL',
                  }"
                >
                  Large: {{ getWCAGLevel(getContrastRatio(test.color1 || '', test.color2 || ''), true) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Recommendations -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold mb-6">
          Recommended Improvements
        </h2>
        <div class="recommendations">
          <div class="recommendation-card">
            <h3 class="font-medium mb-4">
              {{ isDark ? 'Dark Mode' : 'Light Mode' }} Adjustments
            </h3>
            <div class="color-suggestions">
              <div
                v-for="(value, key) in isDark ? improvedColors.dark : improvedColors.light"
                :key="key"
                class="suggestion-item"
              >
                <span class="suggestion-label">{{ key.replace('--color-', '').replace('-', ' ') }}</span>
                <div class="suggestion-colors">
                  <div class="color-comparison">
                    <div
                      class="color-box"
                      :style="{ backgroundColor: colorValues[key] }"
                    />
                    <span class="color-value">{{ colorValues[key] }}</span>
                  </div>
                  <span class="arrow">→</span>
                  <div class="color-comparison">
                    <div
                      class="color-box"
                      :style="{ backgroundColor: value }"
                    />
                    <span class="color-value">{{ value }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="guidelines-card">
            <h3 class="font-medium mb-4">
              WCAG Guidelines
            </h3>
            <ul class="guidelines-list">
              <li><strong>Normal text:</strong> Minimum 4.5:1 for AA, 7:1 for AAA</li>
              <li><strong>Large text (18pt+):</strong> Minimum 3:1 for AA, 4.5:1 for AAA</li>
              <li><strong>UI components:</strong> Minimum 3:1 against adjacent colors</li>
              <li><strong>Focus indicators:</strong> Minimum 3:1 against background</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Key Issues -->
      <section>
        <h2 class="text-2xl font-semibold mb-6">
          Key Contrast Issues
        </h2>
        <div class="issues-grid">
          <div class="issue-card">
            <h3 class="font-medium" style="color: var(--color-error)">
              Dark Mode Issues
            </h3>
            <ul class="issue-list">
              <li>Surface color (#86436b) is too similar to background (#353640)</li>
              <li>Muted text (#715566) has poor contrast on dark background</li>
              <li>Secondary color needs better differentiation</li>
            </ul>
          </div>
          <div class="issue-card">
            <h3 class="font-medium" style="color: var(--color-warning)">
              Light Mode Issues
            </h3>
            <ul class="issue-list">
              <li>Text muted (#6b7280) is borderline for small text</li>
              <li>Consider darker shade for better readability</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.contrast-analysis-page {
  min-height: 100vh;
  background: var(--color-background);
  color: var(--color-text);
}

.contrast-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.contrast-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 20px;
}

.contrast-header {
  margin-bottom: 16px;
}

.contrast-preview {
  margin-bottom: 16px;
}

.color-sample {
  padding: 20px;
  border-radius: 4px;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
}

.contrast-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.contrast-ratio {
  font-size: 24px;
  font-weight: bold;
  color: var(--color-primary);
}

.wcag-badges {
  display: flex;
  gap: 8px;
}

.wcag-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.wcag-pass {
  background: var(--color-success);
  color: white;
}

.wcag-fail {
  background: var(--color-error);
  color: white;
}

.recommendations {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

@media (max-width: 768px) {
  .recommendations {
    grid-template-columns: 1fr;
  }
}

.recommendation-card,
.guidelines-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 24px;
}

.color-suggestions {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.suggestion-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.suggestion-label {
  font-weight: 500;
  text-transform: capitalize;
}

.suggestion-colors {
  display: flex;
  align-items: center;
  gap: 12px;
}

.color-comparison {
  display: flex;
  align-items: center;
  gap: 8px;
}

.color-box {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid var(--color-border);
}

.color-value {
  font-family: monospace;
  font-size: 14px;
}

.arrow {
  font-size: 20px;
  color: var(--color-text-muted);
}

.guidelines-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.guidelines-list li {
  padding-left: 20px;
  position: relative;
}

.guidelines-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--color-primary);
}

.issues-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.issue-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 20px;
}

.issue-list {
  list-style: none;
  padding: 0;
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.issue-list li {
  padding-left: 20px;
  position: relative;
  font-size: 14px;
}

.issue-list li::before {
  content: '⚠';
  position: absolute;
  left: 0;
}
</style>
