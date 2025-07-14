<script setup lang="ts">
const {
  open = false,
  menuIcon = 'i-heroicons-bars-3-20-solid',
  closeIcon = 'i-heroicons-x-mark-20-solid',
  ariaControls,
} = defineProps<{
  /** Whether the menu is open */
  open?: boolean
  /** Icon class for menu state */
  menuIcon?: string
  /** Icon class for close state */
  closeIcon?: string
  /** ID of the element this button controls */
  ariaControls?: string
}>()

const emit = defineEmits<{
  toggle: []
}>()

const buttonLabel = computed(() => (open ? 'Close Menu' : 'Open Menu'))
const currentIcon = computed(() => (open ? closeIcon : menuIcon))
</script>

<template>
  <BaseButton
    variant="ghost"
    size="sm"
    class="self-end sm:hidden"
    :aria-label="buttonLabel"
    :aria-expanded="open.toString()"
    :aria-controls="ariaControls"
    :icon="currentIcon"
    @click="emit('toggle')"
  />
</template>
