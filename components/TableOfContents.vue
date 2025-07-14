<script setup lang="ts">
import type { TocLink } from '@nuxt/content'
import { tocKey } from './tocKey'
import TocNode from './TocNode.vue'

const { links = [] } = defineProps<{
  /** Array of table of contents links with hierarchy */
  links?: TocLink[]
}>()

const { activeId, scrollToHeading } = useTableOfContents()

function handleClick(event: Event, id: string) {
  event.preventDefault()
  scrollToHeading(id)
}

function isActive(id: string) {
  return activeId.value === id
}

const hasEnoughHeadings = computed(() => links.length >= 1)

provide(tocKey, {
  activeId,
  handleClick,
  isActive,
  scrollToHeading,
  withinToc: true,
})
</script>

<template>
  <nav
    v-if="hasEnoughHeadings"
    class="w-full hidden lg:block"
    aria-label="Table of contents"
  >
    <div class="p-6 rounded-lg bg-[var(--color-bg-secondary)]">
      <h2 class="text-sm text-[var(--color-text)] font-semibold mb-4">
        Table of Contents
      </h2>
      <ul class="text-sm space-y-1.5">
        <TocNode
          v-for="link in links"
          :key="link.id"
          :link="link"
        />
      </ul>
    </div>
  </nav>
</template>
