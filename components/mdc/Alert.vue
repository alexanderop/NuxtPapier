<script setup lang="ts">
const {
  type = 'note',
  title = '',
} = defineProps<{
  /** Type of alert that determines the styling and icon */
  type?: 'note' | 'tip' | 'important' | 'warning' | 'caution'
  /** Custom title for the alert (defaults to the type) */
  title?: string
}>()

const iconMap = {
  caution: 'i-octicon-stop-16',
  important: 'i-octicon-report-16',
  note: 'i-octicon-info-16',
  tip: 'i-octicon-light-bulb-16',
  warning: 'i-octicon-alert-16',
}

const colorMap = {
  caution: 'border-[var(--color-alert-error-border)] bg-[var(--color-alert-error-bg)]',
  important: 'border-[var(--color-alert-note-border)] bg-[var(--color-alert-note-bg)]',
  note: 'border-[var(--color-alert-info-border)] bg-[var(--color-alert-info-bg)]',
  tip: 'border-[var(--color-alert-success-border)] bg-[var(--color-alert-success-bg)]',
  warning: 'border-[var(--color-alert-warning-border)] bg-[var(--color-alert-warning-bg)]',
}

const textColorMap = {
  caution: 'text-[var(--color-alert-error-text)]',
  important: 'text-[var(--color-alert-note-text)]',
  note: 'text-[var(--color-alert-info-text)]',
  tip: 'text-[var(--color-alert-success-text)]',
  warning: 'text-[var(--color-alert-warning-text)]',
}

const icon = computed(() => iconMap[type])
const colorClass = computed(() => colorMap[type])
const textColorClass = computed(() => textColorMap[type])
const displayTitle = computed(() => title || type.charAt(0).toUpperCase() + type.slice(1))
</script>

<template>
  <div
    class="my-4 p-4 border-l-4"
    :class="[colorClass]"
  >
    <div
      class="mb-2 flex gap-2 items-center"
      :class="[textColorClass]"
    >
      <Icon
        :name="icon"
        class="h-4 w-4"
      />

      <p class="text-sm font-medium">
        {{ displayTitle }}
      </p>
    </div>

    <div class="text-sm text-[var(--color-gray-700)] dark:text-[var(--color-gray-300)]">
      <slot />
    </div>
  </div>
</template>
