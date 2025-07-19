<script setup lang="ts">
const { items } = defineProps<{
  /** Array of breadcrumb items with name and optional URL */
  items: {
    name: string
    url?: string
  }[]
}>()

// Add breadcrumb structured data
useBreadcrumbStructuredData(items)
</script>

<template>
  <nav
    aria-label="Breadcrumb navigation"
    class="breadcrumbs max-w-full overflow-x-auto"
  >
    <ul class="text-sm flex flex-wrap gap-2 items-center">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="flex gap-2 min-w-0 items-center"
      >
        <template v-if="item.url">
          <NuxtLink
            :to="item.url"
            class="text-[var(--color-text-muted)] max-w-[200px] min-w-0 break-words transition-colors hover:text-[var(--color-primary)] sm:max-w-none"
          >
            {{ item.name }}
          </NuxtLink>
        </template>

        <template v-else>
          <span class="text-[var(--color-text)] max-w-[200px] min-w-0 break-words sm:max-w-none">
            {{ item.name }}
          </span>
        </template>

        <Icon
          v-if="index < items.length - 1"
          name="i-lucide-chevron-right"
          class="text-[var(--color-text-muted)] flex-shrink-0 h-4 w-4"
        />
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.breadcrumbs {
  margin-bottom: 1.5rem;
}
</style>
