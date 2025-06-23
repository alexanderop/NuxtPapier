<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const { brandHue, chromaMultiplier, resetTheme } = useTheme()
const isDark = useDark()
const toggleDark = useToggle(isDark)

const huePresets = [
  { name: 'Red', hue: 0 },
  { name: 'Orange', hue: 25 },
  { name: 'Yellow', hue: 60 },
  { name: 'Green', hue: 142 },
  { name: 'Teal', hue: 180 },
  { name: 'Blue', hue: 220 },
  { name: 'Purple', hue: 275 },
  { name: 'Pink', hue: 320 },
]

function setHuePreset(hue: number) {
  brandHue.value = hue
}

function getPreviewColor(shade: number) {
  const lightness = shade === 200 ? '89%' : shade === 500 ? '59%' : '40%'
  const chromaBase = 0.15
  const chroma = shade === 200 ? chromaBase * 0.45 : shade === 500 ? chromaBase * 1.2 : chromaBase * 0.95
  return `oklch(${lightness} ${chroma * chromaMultiplier.value} ${brandHue.value})`
}
</script>

<template>
  <div class="theme-customizer">
    <div class="customizer-header">
      <h3 class="text-sm text-heading font-medium">
        Theme Customizer
      </h3>
      <button
        class="text-xs btn-secondary px-2 py-1"
        title="Reset to default theme"
        @click="resetTheme"
      >
        Reset
      </button>
    </div>

    <div class="customizer-controls space-y-4">
      <div class="control-group">
        <label class="control-label">
          Appearance
        </label>
        <div class="flex items-center justify-between">
          <span class="text-sm text-muted">
            {{ isDark ? 'Dark Mode' : 'Light Mode' }}
          </span>
          <button
            class="appearance-toggle"
            :class="{ active: isDark }"
            aria-label="Toggle dark mode"
            @click="toggleDark()"
          >
            <div class="toggle-track">
              <div class="toggle-thumb">
                <Icon
                  :name="isDark ? 'lucide:moon' : 'lucide:sun'"
                  class="h-3 w-3"
                />
              </div>
            </div>
          </button>
        </div>
      </div>

      <div class="control-group">
        <label class="control-label">
          Brand Hue: {{ brandHue }}°
        </label>
        <input
          v-model.number="brandHue"
          type="range"
          min="0"
          max="360"
          step="1"
          class="range-slider"
        >
        <div class="hue-presets">
          <button
            v-for="preset in huePresets"
            :key="preset.name"
            class="hue-preset"
            :class="{ active: brandHue === preset.hue }"
            :style="{ backgroundColor: `oklch(60% 0.18 ${preset.hue})` }"
            :title="preset.name"
            @click="setHuePreset(preset.hue)"
          />
        </div>
      </div>

      <div class="control-group">
        <label class="control-label">
          Chroma Intensity: {{ chromaMultiplier.toFixed(2) }}
        </label>
        <input
          v-model.number="chromaMultiplier"
          type="range"
          min="0.5"
          max="2"
          step="0.05"
          class="range-slider"
        >
        <div class="chroma-labels">
          <span class="text-xs text-muted">Subtle</span>
          <span class="text-xs text-muted">Vibrant</span>
        </div>
      </div>

      <div class="color-preview">
        <div class="preview-label text-xs text-muted mb-2">
          Color Preview
        </div>
        <div class="preview-swatches">
          <div
            v-for="shade in [200, 500, 700]"
            :key="shade"
            class="swatch"
            :style="{ backgroundColor: getPreviewColor(shade) }"
            :title="`Brand ${shade}`"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.theme-customizer {
  @apply bg-surface border border-border rounded-lg p-4 shadow-sm;
  min-width: 280px;
}

.customizer-header {
  @apply flex items-center justify-between mb-4;
}

.customizer-controls {
  @apply space-y-4;
}

.control-group {
  @apply space-y-2;
}

.control-label {
  @apply block text-sm font-medium text-text;
}

.range-slider {
  @apply w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer;
  background: linear-gradient(to right, oklch(var(--brand-200)), oklch(var(--brand-500)), oklch(var(--brand-700)));
}

.range-slider::-webkit-slider-thumb {
  @apply appearance-none w-4 h-4 bg-brand-500 rounded-full cursor-pointer;
  box-shadow: 0 0 0 2px oklch(var(--color-background));
}

.range-slider::-moz-range-thumb {
  @apply w-4 h-4 bg-brand-500 rounded-full cursor-pointer border-0;
  box-shadow: 0 0 0 2px oklch(var(--color-background));
}

.hue-presets {
  @apply flex gap-2 flex-wrap;
}

.hue-preset {
  @apply w-6 h-6 rounded-full border-2 border-transparent cursor-pointer transition-all;
}

.hue-preset:hover,
.hue-preset.active {
  @apply border-border scale-110;
}

.chroma-labels {
  @apply flex justify-between;
}

.color-preview {
  @apply pt-2 border-t border-border;
}

.preview-swatches {
  @apply flex gap-2;
}

.swatch {
  @apply w-8 h-8 rounded-lg border border-border;
}

.appearance-toggle {
  @apply relative inline-flex items-center justify-center w-12 h-6 transition-colors duration-200 ease-in-out;
}

.toggle-track {
  @apply w-full h-full bg-surface border border-border rounded-full relative transition-colors duration-200 ease-in-out;
}

.appearance-toggle.active .toggle-track {
  @apply bg-brand-500 border-brand-500;
}

.toggle-thumb {
  @apply absolute left-0.5 top-0.5 w-5 h-5 bg-background rounded-full shadow-sm transition-transform duration-200 ease-in-out flex items-center justify-center text-muted;
}

.appearance-toggle.active .toggle-thumb {
  @apply transform translate-x-6 text-brand-50;
}
</style>
