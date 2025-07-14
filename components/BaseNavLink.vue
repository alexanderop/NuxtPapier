<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

const {
  to,
  href,
  external = false,
  activeClass = 'text-[var(--color-primary)]',
  inactiveClass = '',
  exactMatch = false,
} = defineProps<{
  /** Internal route for NuxtLink */
  to?: RouteLocationRaw
  /** External URL */
  href?: string
  /** Whether external links open in new tab */
  external?: boolean
  /** Classes to apply when link is active */
  activeClass?: string
  /** Classes to apply when link is inactive */
  inactiveClass?: string
  /** Whether to require exact path match for active state */
  exactMatch?: boolean
}>()

const route = useRoute()

const isActive = computed(() => {
  if (!to || href)
    return false

  const targetPath = typeof to === 'string' ? to : to.path || ''
  const currentPath = route.path.endsWith('/') && route.path !== '/'
    ? route.path.slice(0, -1)
    : route.path

  if (exactMatch) {
    return currentPath === targetPath
  }

  // Check if current path starts with target path or if they share the same first segment
  const currentPathArray = currentPath.split('/').filter(p => p.trim())
  const targetPathArray = targetPath.split('/').filter(p => p.trim())

  return currentPath === targetPath
    || (targetPathArray.length > 0 && currentPathArray[0] === targetPathArray[0])
})

const linkProps = computed(() => {
  if (href) {
    return {
      href,
      rel: external ? 'noopener noreferrer' : undefined,
      target: external ? '_blank' : undefined,
    }
  }
  return {
    to,
  }
})

const classes = computed(() => [
  'hover:text-[var(--color-primary)] transition-colors',
  isActive.value ? activeClass : inactiveClass,
])
</script>

<template>
  <NuxtLink
    v-bind="linkProps"
    :class="classes"
    :aria-current="isActive ? 'page' : undefined"
  >
    <slot />
  </NuxtLink>
</template>
