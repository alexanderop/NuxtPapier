<script setup lang="ts">
const mainColors = [
  {
    colors: [
      {
        cssVar: 'var(--color-primary)',
        name: 'primary',
        text: 'text-white',
        usage: 'Buttons, links, active states',
        value: 'bg-primary',
      },
      {
        cssVar: 'var(--color-primary-hover)',
        name: 'primary-hover',
        text: 'text-white',
        usage: 'Hover states for primary elements',
        value: 'bg-primary-hover',
      },
    ],
    description: 'Main brand color for CTAs, links, and interactive elements',
    name: 'Primary',
  },
  {
    colors: [
      {
        cssVar: 'var(--color-secondary)',
        name: 'secondary',
        text: 'text-white',
        usage: 'Secondary buttons, meta text',
        value: 'bg-secondary',
      },
      {
        cssVar: 'var(--color-secondary-hover)',
        name: 'secondary-hover',
        text: 'text-white',
        usage: 'Hover states for secondary elements',
        value: 'bg-secondary-hover',
      },
    ],
    description: 'Supporting color for less prominent actions',
    name: 'Secondary',
  },
  {
    colors: [
      {
        cssVar: 'var(--color-background)',
        name: 'background',
        text: 'text-text',
        usage: 'Main page background',
        value: 'bg-background',
      },
      {
        cssVar: 'var(--color-surface)',
        name: 'surface',
        text: 'text-text',
        usage: 'Cards, modals, elevated surfaces',
        value: 'bg-surface',
      },
      {
        cssVar: 'var(--color-header-bg)',
        name: 'header-bg',
        text: 'text-text',
        usage: 'Header and navigation backgrounds',
        value: 'bg-header-bg',
      },
    ],
    description: 'Core background colors for layouts',
    name: 'Background',
  },
  {
    colors: [
      {
        cssVar: 'var(--color-text)',
        name: 'text',
        text: 'text-background',
        usage: 'Primary text, headings',
        value: 'bg-text',
      },
      {
        cssVar: 'var(--color-text-muted)',
        name: 'text-muted',
        text: 'text-text-muted',
        usage: 'Secondary text, captions, hints',
        value: 'bg-gray-100 dark:bg-gray-700',
      },
    ],
    description: 'Typography and content colors',
    name: 'Text',
  },
  {
    colors: [
      {
        cssVar: 'var(--color-border)',
        name: 'border',
        text: 'text-text',
        usage: 'Borders, dividers, separators',
        value: 'bg-border',
      },
    ],
    description: 'Border and divider colors',
    name: 'Border',
  },
  {
    colors: [
      {
        cssVar: '#10b981',
        name: 'success',
        text: 'text-white',
        usage: 'Success messages, confirmations',
        value: 'bg-green-500',
      },
      {
        cssVar: '#f59e0b',
        name: 'warning',
        text: 'text-gray-900',
        usage: 'Warning messages, cautions',
        value: 'bg-yellow-500',
      },
      {
        cssVar: '#ef4444',
        name: 'error',
        text: 'text-white',
        usage: 'Error messages, destructive actions',
        value: 'bg-red-500',
      },
      {
        cssVar: '#3b82f6',
        name: 'info',
        text: 'text-white',
        usage: 'Informational messages, tips',
        value: 'bg-blue-500',
      },
    ],
    description: 'Colors for specific semantic meanings',
    name: 'Semantic',
  },
]
</script>

<template>
  <div class="w-full space-y-10">
    <div v-for="group in mainColors" :key="group.name" class="space-y-4">
      <div>
        <h3 class="text-xl font-semibold mb-1">
          {{ group.name }}
        </h3>
        <p class="text-sm text-text-muted">
          {{ group.description }}
        </p>
      </div>
      <div class="gap-4 grid grid-cols-1 lg:grid-cols-2">
        <div
          v-for="color in group.colors"
          :key="color.name"
          class="p-4 border border-border rounded-lg transition-all hover:shadow-md"
        >
          <div class="flex gap-4 items-start">
            <div
              v-if="!color.name.startsWith('text')"
              class="border border-border rounded-md shrink-0 h-24 w-24 shadow-sm"
              :class="[color.value]"
            />
            <div
              v-else
              class="border border-border rounded-md bg-surface flex shrink-0 h-24 w-24 shadow-sm items-center justify-center"
            >
              <span class="text-2xl font-semibold" :class="color.text">Aa</span>
            </div>
            <div class="flex-1 space-y-2">
              <div>
                <h4 class="text-base font-medium">
                  {{ color.name }}
                </h4>
                <code class="text-xs text-text-muted font-mono">
                  {{ color.cssVar }}
                </code>
              </div>
              <p class="text-sm text-text-muted">
                {{ color.usage }}
              </p>
              <div class="mt-3 flex flex-wrap gap-2">
                <code class="text-xs px-2 py-1 rounded bg-surface">
                  {{ color.value }}
                </code>
                <code class="text-xs px-2 py-1 rounded bg-surface">
                  {{ color.text }}
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
