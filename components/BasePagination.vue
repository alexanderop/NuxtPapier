<script setup lang="ts">
const {
  currentPage,
  totalPages,
  hasPrevious,
  hasNext,
  goToPrevious,
  goToNext,
} = defineProps<{
  currentPage: number
  totalPages: number
  hasPrevious: boolean
  hasNext: boolean
  goToPrevious: () => void
  goToNext: () => void
}>()

const appConfig = useAppConfig()
const { showPageNumbers } = appConfig.site.pagination
</script>

<template>
  <div class="flex items-center justify-between">
    <!-- Previous Button -->
    <button
      :disabled="!hasPrevious"
      class="px-4 py-2 border rounded-md transition-colors duration-200"
      :class="[
        hasPrevious
          ? 'border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white'
          : 'border-[var(--color-border)] text-[var(--color-text-muted)] cursor-not-allowed',
      ]"
      @click="goToPrevious"
    >
      ← Previous
    </button>

    <!-- Page Info -->
    <span class="text-sm text-[var(--color-text-muted)]">
      Page {{ currentPage }} of {{ totalPages }}
    </span>

    <!-- Next Button -->
    <button
      :disabled="!hasNext"
      class="px-4 py-2 border rounded-md transition-colors duration-200"
      :class="[
        hasNext
          ? 'border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white'
          : 'border-[var(--color-border)] text-[var(--color-text-muted)] cursor-not-allowed',
      ]"
      @click="goToNext"
    >
      Next →
    </button>
  </div>
</template>
