<script setup lang="ts">
import type { TocLink } from '@nuxt/content'

const {
  link,
  depth = 0,
} = defineProps<{
  /** Table of contents link object */
  link: TocLink
  /** Current depth level for nested styling */
  depth?: number
}>()

// Inject the context from parent TableOfContents
const tocContext = inject(tableOfContentsKey)

if (!tocContext) {
  throw new Error('BaseTocLink must be used within a TableOfContents component')
}

const { activeId, scrollToHeading } = tocContext

function handleClick(event: Event, id: string) {
  event.preventDefault()
  scrollToHeading(id)
}

const isActive = computed(() => activeId.value === link.id)

const linkClasses = computed(() => [
  'text-xs leading-relaxed py-0.5 border-l-2 block transition-all duration-200 relative',
  depth > 0 ? 'ml-3 pl-3' : 'pl-3',
  isActive.value
    ? 'text-[var(--color-primary)] font-medium border-[var(--color-primary)] bg-[var(--color-primary)]/5'
    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] border-transparent',
])
</script>

<template>
  <li class="transition-all duration-200">
    <a
      :href="`#${link.id}`"
      :class="linkClasses"
      @click="handleClick($event, link.id)"
    >
      {{ link.text }}
    </a>
    <ul
      v-if="link.children && link.children.length > 0"
      class="mt-0.5 space-y-0.5"
    >
      <BaseTocLink
        v-for="child in link.children"
        :key="child.id"
        :link="child"
        :depth="depth + 1"
      />
    </ul>
  </li>
</template>
