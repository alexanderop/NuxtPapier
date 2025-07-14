<script setup lang="ts">
const {
  title,
  to = '/',
  size = 'md',
} = defineProps<{
  /** Logo text or site title */
  title: string
  /** Navigation target for logo link */
  to?: string
  /** Size variant of the logo */
  size?: 'sm' | 'md' | 'lg'
}>()

const sizeClasses = computed(() => {
  const sizes = {
    lg: 'text-2xl leading-9 sm:text-3xl sm:leading-none',
    md: 'text-xl leading-8 sm:text-2xl sm:leading-none',
    sm: 'text-lg leading-7 sm:text-xl sm:leading-none',
  }
  return sizes[size]
})

const logoClasses = computed(() => [
  'font-semibold py-1 whitespace-nowrap',
  sizeClasses.value,
])
</script>

<template>
  <NuxtLink
    :to="to"
    :class="logoClasses"
  >
    {{ title }}
  </NuxtLink>
</template>
