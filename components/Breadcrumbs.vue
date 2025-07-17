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
    class="breadcrumbs"
  >
    <ul class="text-sm flex flex-wrap gap-2 items-center">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="flex gap-2 items-center"
      >
        <template v-if="item.url">
          <NuxtLink
            :to="item.url"
            class="text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-primary)]"
          >
            {{ item.name }}
          </NuxtLink>
        </template>

        <template v-else>
          <span class="text-[var(--color-text)]">
            {{ item.name }}
          </span>
        </template>

        <Icon
          v-if="index < items.length - 1"
          name="i-lucide-chevron-right"
          class="text-[var(--color-text-muted)] h-4 w-4"
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
