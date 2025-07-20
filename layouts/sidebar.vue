<script setup lang="ts">
const { sidebarPosition = 'left' } = defineProps<{
  /** Position of the sidebar */
  sidebarPosition?: 'left' | 'right'
}>()

const variant = computed(() =>
  (sidebarPosition === 'left' ? 'left-sidebar' : 'right-sidebar'),
)
</script>

<template>
  <BaseGridLayout :variant="variant">
    <template
      v-if="sidebarPosition === 'left'"
      #sidebar-left
    >
      <slot name="sidebar" />
    </template>

    <template
      v-if="sidebarPosition === 'right'"
      #sidebar-right
    >
      <slot name="sidebar" />
    </template>

    <slot />
  </BaseGridLayout>
</template>
