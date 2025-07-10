<script setup lang="ts">
import type { TocLink } from '~/composables/useTableOfContents'

const { links = [] } = defineProps<{
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
</script>

<template>
  <nav
    v-if="hasEnoughHeadings"
    class="hidden lg:block"
    aria-label="Table of contents"
  >
    <div>
      <h2 class="text-sm text-[var(--color-text)] font-semibold mb-4">
        Table of Contents
      </h2>
      <ul class="text-sm space-y-1.5">
        <li
          v-for="link in links"
          :key="link.id"
          class="transition-all duration-200"
        >
          <a
            :href="`#${link.id}`"
            class="text-xs leading-relaxed py-0.5 pl-3 border-l-2 block transition-all duration-200 relative" :class="[
              isActive(link.id)
                ? 'text-[var(--color-primary)] font-medium border-[var(--color-primary)] bg-[var(--color-primary)]/5'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] border-transparent',
            ]"
            @click="handleClick($event, link.id)"
          >
            {{ link.text }}
          </a>
          <ul
            v-if="link.children && link.children.length > 0"
            class="mt-0.5 space-y-0.5"
          >
            <li
              v-for="child in link.children"
              :key="child.id"
              class="ml-3"
            >
              <a
                :href="`#${child.id}`"
                class="text-xs leading-relaxed ml-3 py-0.5 pl-3 border-l-2 block transition-all duration-200 relative" :class="[
                  isActive(child.id)
                    ? 'text-[var(--color-primary)] font-medium border-[var(--color-primary)] bg-[var(--color-primary)]/5'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] border-transparent',
                ]"
                @click="handleClick($event, child.id)"
              >
                {{ child.text }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>
