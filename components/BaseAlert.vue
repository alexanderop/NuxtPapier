<script setup lang="ts">
const {
  type = 'note',
  title = '',
} = defineProps<{
  type?: 'note' | 'tip' | 'important' | 'warning' | 'caution'
  title?: string
}>()

const iconMap = {
  note: 'i-octicon-info-16',
  tip: 'i-octicon-light-bulb-16',
  important: 'i-octicon-report-16',
  warning: 'i-octicon-alert-16',
  caution: 'i-octicon-stop-16',
}

const colorMap = {
  note: 'border-blue-500 bg-blue-50 dark:bg-blue-900/20',
  tip: 'border-green-500 bg-green-50 dark:bg-green-900/20',
  important: 'border-purple-500 bg-purple-50 dark:bg-purple-900/20',
  warning: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20',
  caution: 'border-red-500 bg-red-50 dark:bg-red-900/20',
}

const textColorMap = {
  note: 'text-blue-600 dark:text-blue-400',
  tip: 'text-green-600 dark:text-green-400',
  important: 'text-purple-600 dark:text-purple-400',
  warning: 'text-yellow-600 dark:text-yellow-400',
  caution: 'text-red-600 dark:text-red-400',
}

const icon = computed(() => iconMap[type])
const colorClass = computed(() => colorMap[type])
const textColorClass = computed(() => textColorMap[type])
const displayTitle = computed(() => title || type.charAt(0).toUpperCase() + type.slice(1))
</script>

<template>
  <div class="my-4 p-4 border-l-4" :class="[colorClass]">
    <div class="mb-2 flex gap-2 items-center" :class="[textColorClass]">
      <Icon :name="icon" class="h-4 w-4" />
      <p class="text-sm font-medium">
        {{ displayTitle }}
      </p>
    </div>
    <div class="text-sm text-gray-700 dark:text-gray-300">
      <slot />
    </div>
  </div>
</template>
