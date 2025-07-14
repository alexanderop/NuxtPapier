<script setup lang="ts">
const {
  to,
  activeClass = 'text-[var(--color-primary)]',
  exactMatch = false,
} = defineProps<{
  /** Navigation target path */
  to: string
  /** CSS class to apply when link is active */
  activeClass?: string
  /** Whether to require exact path match for active state */
  exactMatch?: boolean
}>()

const route = useRoute()

const navLinkClasses = 'hover:text-[var(--color-primary)] transition-colors'

function isActive() {
  const currentPath = route.path.endsWith('/') && route.path !== '/'
    ? route.path.slice(0, -1)
    : route.path

  if (exactMatch) {
    return currentPath === to
  }

  const currentPathArray = currentPath.split('/').filter(p => p.trim())
  const pathArray = to.split('/').filter(p => p.trim())

  return currentPath === to || currentPathArray[0] === pathArray[0]
}

const classes = computed(() => [
  navLinkClasses,
  isActive() ? activeClass : '',
])
</script>

<template>
  <NuxtLink
    :to="to"
    :class="classes"
  >
    <slot />
  </NuxtLink>
</template>
