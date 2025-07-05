<script setup>
const mainColors = [
  {
    name: 'Primary',
    description: 'Main brand color for CTAs, links, and interactive elements',
    colors: [
      {
        name: 'primary',
        value: 'bg-primary',
        text: 'text-white',
        cssVar: 'var(--color-primary)',
        usage: 'Buttons, links, active states',
      },
      {
        name: 'primary-hover',
        value: 'bg-primary-hover',
        text: 'text-white',
        cssVar: 'var(--color-primary-hover)',
        usage: 'Hover states for primary elements',
      },
    ],
  },
  {
    name: 'Secondary',
    description: 'Supporting color for less prominent actions',
    colors: [
      {
        name: 'secondary',
        value: 'bg-secondary',
        text: 'text-white',
        cssVar: 'var(--color-secondary)',
        usage: 'Secondary buttons, meta text',
      },
      {
        name: 'secondary-hover',
        value: 'bg-secondary-hover',
        text: 'text-white',
        cssVar: 'var(--color-secondary-hover)',
        usage: 'Hover states for secondary elements',
      },
    ],
  },
  {
    name: 'Background',
    description: 'Core background colors for layouts',
    colors: [
      {
        name: 'background',
        value: 'bg-background',
        text: 'text-text',
        cssVar: 'var(--color-background)',
        usage: 'Main page background',
      },
      {
        name: 'surface',
        value: 'bg-surface',
        text: 'text-text',
        cssVar: 'var(--color-surface)',
        usage: 'Cards, modals, elevated surfaces',
      },
      {
        name: 'header-bg',
        value: 'bg-header-bg',
        text: 'text-text',
        cssVar: 'var(--color-header-bg)',
        usage: 'Header and navigation backgrounds',
      },
    ],
  },
  {
    name: 'Text',
    description: 'Typography and content colors',
    colors: [
      {
        name: 'text',
        value: 'bg-text',
        text: 'text-background',
        cssVar: 'var(--color-text)',
        usage: 'Primary text, headings',
      },
      {
        name: 'text-muted',
        value: 'bg-gray-100 dark:bg-gray-700',
        text: 'text-text-muted',
        cssVar: 'var(--color-text-muted)',
        usage: 'Secondary text, captions, hints',
      },
    ],
  },
  {
    name: 'Border',
    description: 'Border and divider colors',
    colors: [
      {
        name: 'border',
        value: 'bg-border',
        text: 'text-text',
        cssVar: 'var(--color-border)',
        usage: 'Borders, dividers, separators',
      },
    ],
  },
  {
    name: 'Semantic',
    description: 'Colors for specific semantic meanings',
    colors: [
      {
        name: 'success',
        value: 'bg-green-500',
        text: 'text-white',
        cssVar: '#10b981',
        usage: 'Success messages, confirmations',
      },
      {
        name: 'warning',
        value: 'bg-yellow-500',
        text: 'text-gray-900',
        cssVar: '#f59e0b',
        usage: 'Warning messages, cautions',
      },
      {
        name: 'error',
        value: 'bg-red-500',
        text: 'text-white',
        cssVar: '#ef4444',
        usage: 'Error messages, destructive actions',
      },
      {
        name: 'info',
        value: 'bg-blue-500',
        text: 'text-white',
        cssVar: '#3b82f6',
        usage: 'Informational messages, tips',
      },
    ],
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
