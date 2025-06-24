<script setup lang="ts">
// Props interface
interface Props {
  name: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

// Props destructuring with defaults
const {
  name,
  size = 'md',
} = defineProps<Props>()

// Size classes mapping
const sizeClasses = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
}

// Computed properties
const iconClass = computed(() => sizeClasses[size])
</script>

<template>
  <Icon
    :name="name"
    :class="iconClass"
  />
</template>
