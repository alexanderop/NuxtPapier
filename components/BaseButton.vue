<script setup lang="ts">
const {
  variant = 'primary',
  size = 'md',
  to,
  href,
  disabled = false,
  loading = false,
  type = 'button',
  ariaLabel,
  title,
  icon,
  iconPosition = 'left',
} = defineProps<{
  /** Visual style variant of the button */
  variant?: 'primary' | 'secondary' | 'ghost' | 'link'
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg'
  /** Internal navigation target (for NuxtLink) */
  to?: string
  /** External link URL */
  href?: string
  /** Whether the button is disabled */
  disabled?: boolean
  /** Whether the button is in loading state */
  loading?: boolean
  /** HTML button type attribute */
  type?: 'button' | 'submit' | 'reset'
  /** Accessibility label for screen readers */
  ariaLabel?: string
  /** Tooltip text shown on hover */
  title?: string
  /** Icon name to display */
  icon?: string
  /** Position of the icon relative to text */
  iconPosition?: 'left' | 'right'
}>()

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const isLink = computed(() => !!(to || href))
const component = computed(() => {
  if (to)
    return resolveComponent('NuxtLink')
  if (href)
    return 'a'
  return 'button'
})

const variantClasses = computed(() => {
  const variants = {
    ghost: 'bg-transparent text-[var(--color-text)] hover:bg-[var(--color-surface)] focus:ring-[var(--color-secondary)]',
    link: 'bg-transparent text-[var(--color-primary)] underline-offset-4 hover:underline focus:ring-[var(--color-primary)]',
    primary: 'bg-[var(--color-primary)] text-[var(--color-background)] hover:opacity-90 focus:ring-[var(--color-primary)]',
    secondary: 'bg-[var(--color-surface)] text-[var(--color-text)] hover:opacity-80 focus:ring-[var(--color-secondary)]',
  }
  return variants[variant]
})

const sizeClasses = computed(() => {
  const sizes = {
    lg: 'px-6 py-3 text-lg',
    md: 'px-4 py-2 text-base',
    sm: 'px-3 py-1.5 text-sm',
  }
  return sizes[size]
})

const buttonClasses = computed(() => {
  return [
    'inline-flex items-center justify-center font-medium transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-background)]',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    variantClasses.value,
    sizeClasses.value,
    variant !== 'link' && 'rounded-md',
    loading && 'cursor-wait',
  ]
})

function handleClick(event: MouseEvent) {
  if (!disabled && !loading) {
    emit('click', event)
  }
}
</script>

<template>
  <component
    :is="component"
    :to="to"
    :href="href"
    :type="isLink ? undefined : type"
    :disabled="disabled || loading"
    :aria-label="ariaLabel"
    :title="title"
    :class="buttonClasses"
    @click="handleClick"
  >
    <Icon
      v-if="loading"
      name="i-heroicons-arrow-path-20-solid"
      class="animate-spin"
      :class="[
        size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5',
        $slots.default && 'mr-2',
      ]"
    />
    <Icon
      v-else-if="icon && iconPosition === 'left'"
      :name="icon"
      :class="[
        size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5',
        $slots.default && 'mr-2',
      ]"
    />
    <slot />
    <Icon
      v-if="!loading && icon && iconPosition === 'right'"
      :name="icon"
      :class="[
        size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5',
        $slots.default && 'ml-2',
      ]"
    />
  </component>
</template>
