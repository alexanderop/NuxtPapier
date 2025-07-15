<script setup lang="ts">
const {
  currentPage,
  totalPages,
  hasPrevious,
  hasNext,
  goToPrevious,
  goToNext,
} = defineProps<{
  /** Current page number */
  currentPage: number
  /** Total number of pages */
  totalPages: number
  /** Whether there is a previous page */
  hasPrevious: boolean
  /** Whether there is a next page */
  hasNext: boolean
  /** Function to navigate to previous page */
  goToPrevious: () => void
  /** Function to navigate to next page */
  goToNext: () => void
}>()
</script>

<template>
  <div class="flex items-center justify-between">
    <!-- Previous Button -->
    <BaseButton
      variant="ghost"
      :disabled="!hasPrevious"
      icon="i-heroicons-arrow-left-20-solid"
      @click="goToPrevious"
    >
      Previous
    </BaseButton>

    <!-- Page Info -->
    <span class="text-sm text-[var(--color-text-muted)]">
      Page {{ currentPage }} of {{ totalPages }}
    </span>

    <!-- Next Button -->
    <BaseButton
      variant="ghost"
      :disabled="!hasNext"
      icon="i-heroicons-arrow-right-20-solid"
      icon-position="right"
      @click="goToNext"
    >
      Next
    </BaseButton>
  </div>
</template>
