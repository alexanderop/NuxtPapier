<script setup lang="ts">
const {
  zIndex = 1000,
} = defineProps<{
  /** Z-index for modal stacking */
  zIndex?: number
}>()

const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <div
    class="inset-0 fixed overflow-y-auto"
    :style="{ zIndex }"
    @click.self="emit('close')"
  >
    <!-- Backdrop -->
    <div class="bg-black/60 inset-0 fixed backdrop-blur-sm dark:bg-black/80" />

    <!-- Modal Container -->
    <div class="px-4 pt-[10vh] flex min-h-screen items-start justify-center relative">
      <slot />
    </div>
  </div>
</template>
