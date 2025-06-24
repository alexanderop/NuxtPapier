<script setup lang="ts">
// Props interface
interface Props {
  modelValue: boolean
  position?: 'center' | 'right'
}

// Props destructuring with defaults
const {
  modelValue,
  position = 'center',
} = defineProps<Props>()

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

// Methods
function handleBackdropClick(e: MouseEvent) {
  if (e.target === e.currentTarget) {
    emit('update:modelValue', false)
  }
}

// Computed properties
const overlayClass = computed(() => {
  if (position === 'right') {
    return 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-end p-4'
  }
  return 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20 px-4'
})

const containerClass = computed(() => {
  if (position === 'right') {
    return 'relative mt-16 mr-4'
  }
  return 'w-full max-w-2xl bg-surface rounded-lg shadow-2xl overflow-hidden'
})
</script>

<template>
  <Teleport to="body">
    <Transition :name="`modal-${position}`">
      <div
        v-if="modelValue"
        :class="overlayClass"
        @click="handleBackdropClick"
      >
        <div
          :class="containerClass"
          @click.stop
        >
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Center modal transitions */
.modal-center-enter-active,
.modal-center-leave-active {
  transition: opacity 0.2s ease;
}

.modal-center-enter-from,
.modal-center-leave-to {
  opacity: 0;
}

.modal-center-enter-active > div,
.modal-center-leave-active > div {
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

.modal-center-enter-from > div,
.modal-center-leave-to > div {
  transform: translateY(-20px);
  opacity: 0;
}

/* Right panel transitions */
.modal-right-enter-active,
.modal-right-leave-active {
  transition: opacity 0.3s ease;
}

.modal-right-enter-from,
.modal-right-leave-to {
  opacity: 0;
}

.modal-right-enter-active > div,
.modal-right-leave-active > div {
  transition: transform 0.3s ease;
}

.modal-right-enter-from > div,
.modal-right-leave-to > div {
  transform: translateX(100%);
}
</style>
