<script setup lang="ts">
// Props interface
interface Props {
  modelValue: boolean
  icon?: string
}

// Props destructuring
const {
  modelValue,
  icon,
} = defineProps<Props>()

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

// Methods
function toggle() {
  emit('update:modelValue', !modelValue)
}
</script>

<template>
  <button
    class="appearance-toggle"
    :class="{ active: modelValue }"
    aria-label="Toggle"
    @click="toggle"
  >
    <div class="toggle-track">
      <div class="toggle-thumb">
        <BaseIcon
          v-if="icon"
          :name="icon"
          size="xs"
        />
      </div>
    </div>
  </button>
</template>

<style scoped>
.appearance-toggle {
  @apply relative inline-flex items-center justify-center w-12 h-6 transition-colors duration-200 ease-in-out;
}

.toggle-track {
  @apply w-full h-full bg-surface border border-border rounded-full relative transition-colors duration-200 ease-in-out;
}

.appearance-toggle.active .toggle-track {
  @apply bg-brand-500 border-brand-500;
}

.toggle-thumb {
  @apply absolute left-0.5 top-0.5 w-5 h-5 bg-background rounded-full shadow-sm transition-transform duration-200 ease-in-out flex items-center justify-center text-muted;
}

.appearance-toggle.active .toggle-thumb {
  @apply transform translate-x-6 text-brand-50;
}
</style>
