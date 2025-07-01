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
  variant?: 'primary' | 'secondary' | 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg'
  to?: string
  href?: string
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
  ariaLabel?: string
  title?: string
  icon?: string
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
    primary: 'bg-[var(--color-primary)] text-[var(--color-background)] hover:opacity-90 focus:ring-[var(--color-primary)]',
    secondary: 'bg-[var(--color-surface)] text-[var(--color-text)] hover:opacity-80 focus:ring-[var(--color-secondary)]',
    ghost: 'bg-transparent text-[var(--color-text)] hover:bg-[var(--color-surface)] focus:ring-[var(--color-secondary)]',
    link: 'bg-transparent text-[var(--color-primary)] underline-offset-4 hover:underline focus:ring-[var(--color-primary)]',
  }
  return variants[variant]
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
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
