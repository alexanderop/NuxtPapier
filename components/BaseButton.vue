<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md'
  icon?: string
  iconOnly?: boolean
  title?: string
  animate?: boolean | 'spin' | 'bounce' | 'pulse' | 'wiggle'
}

const {
  variant = 'secondary',
  size = 'md',
  icon,
  iconOnly = false,
  title,
  animate = true,
} = defineProps<Props>()

const variantClasses = {
  primary: 'bg-brand-500 hover:bg-brand-600 text-white',
  secondary: 'bg-surface hover:bg-brand-100 dark:hover:bg-brand-800 text-text border border-border',
  ghost: 'hover:bg-brand-100 dark:hover:bg-brand-800 text-text',
}

const sizeClasses = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-4 py-2',
}

const iconSizeClasses = {
  sm: 'px-1.5 py-1',
  md: 'px-2 py-2',
}

const buttonClass = computed(() => {
  const variantClass = variantClasses[variant]
  const sizeClass = iconOnly ? iconSizeClasses[size] : sizeClasses[size]
  const animateClass = animate && icon ? 'group' : ''
  return `${variantClass} ${sizeClass} ${animateClass} rounded-lg font-medium transition-colors inline-flex items-center justify-center gap-2`
})

const iconClass = computed(() => {
  if (!animate || !icon) return ''
  
  // Default animations based on icon type
  if (animate === true) {
    if (icon.includes('palette') || icon.includes('gear') || icon.includes('settings')) {
      return 'icon-spin'
    }
    if (icon.includes('magnifying') || icon.includes('search')) {
      return 'icon-pulse'
    }
    if (icon.includes('bell') || icon.includes('notification')) {
      return 'icon-wiggle'
    }
    return 'icon-bounce'
  }
  
  // Specific animation type
  return `icon-${animate}`
})
</script>

<template>
  <button
    :class="buttonClass"
    :title="title"
  >
    <BaseIcon
      v-if="icon"
      :name="icon"
      :size="size === 'sm' ? 'sm' : 'md'"
      :class="iconClass"
    />
    <slot v-if="!iconOnly" />
  </button>
</template>
