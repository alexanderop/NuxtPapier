<script setup lang="ts">
import type { TocLink } from '@nuxt/content'
import { tocKey } from './tocKey'

const { link, depth = 0 } = defineProps<{
  /** The table of contents link object containing id, text, and children */
  link: TocLink
  /** The depth level for indentation (defaults to 0) */
  depth?: number
}>()

const tocProvider = inject(tocKey, {
  activeId: readonly(ref('')),
  handleClick: (_event: Event, _id: string) => {},
  isActive: (_id: string) => false,
  scrollToHeading: (_id: string) => {},
  withinToc: false,
})

if (!tocProvider.withinToc) {
  throw new Error('TocNode must be used within a TableOfContents component')
}

const currentDepth = computed(() => depth)
const indentClass = computed(() => (currentDepth.value > 0 ? `ml-${currentDepth.value * 3}` : ''))
</script>

<template>
  <li class="transition-all duration-200">
    <a
      :href="`#${link.id}`"
      class="text-xs leading-relaxed py-0.5 pl-3 border-l-2 block transition-all duration-200 relative"
      :class="[
        indentClass,
        tocProvider.isActive(link.id)
          ? 'text-[var(--color-primary)] font-medium border-[var(--color-primary)] bg-[var(--color-primary)]/5'
          : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] border-transparent',
      ]"
      @click="tocProvider.handleClick($event, link.id)"
    >
      {{ link.text }}
    </a>
    <ul
      v-if="link.children && link.children.length > 0"
      class="mt-0.5 space-y-0.5"
    >
      <TocNode
        v-for="child in link.children"
        :key="child.id"
        :link="child"
        :depth="currentDepth + 1"
      />
    </ul>
  </li>
</template>
