<script setup lang="ts">
const {
  zIndex = 1000,
  overlayClass = '',
  contentClass = '',
  ariaLabel = 'Modal dialog',
  ariaLabelledby = '',
  ariaDescribedby = '',
  trapFocus = true,
  closeOnEscape = true,
  closeOnBackdrop = true,
} = defineProps<{
  /** Z-index for modal stacking */
  zIndex?: number
  /** Custom overlay CSS classes */
  overlayClass?: string
  /** Custom content container CSS classes */
  contentClass?: string
  /** Accessible label for screen readers */
  ariaLabel?: string
  /** ID of element that labels the modal */
  ariaLabelledby?: string
  /** ID of element that describes the modal */
  ariaDescribedby?: string
  /** Whether to trap focus within modal */
  trapFocus?: boolean
  /** Whether to close modal on Escape key */
  closeOnEscape?: boolean
  /** Whether to close modal on backdrop click */
  closeOnBackdrop?: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

// Modal element reference
const modalRef = ref<HTMLElement>()
const previouslyFocusedElement = ref<HTMLElement>()

// Generate unique IDs for accessibility
const modalId = `modal-${Math.random().toString(36).substr(2, 9)}`

// Focus management
function getFocusableElements(): HTMLElement[] {
  if (!modalRef.value)
    return []

  const focusableSelectors = [
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'a[href]',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]',
  ].join(', ')

  return Array.from(modalRef.value.querySelectorAll(focusableSelectors))
}

function trapFocusHandler(e: KeyboardEvent) {
  if (!trapFocus || e.key !== 'Tab')
    return

  const focusableElements = getFocusableElements()
  if (focusableElements.length === 0)
    return

  const [firstElement] = focusableElements
  const lastElement = focusableElements[focusableElements.length - 1]

  if (e.shiftKey) {
    if (document.activeElement === firstElement) {
      e.preventDefault()
      lastElement.focus()
    }
  }
  else {
    if (document.activeElement === lastElement) {
      e.preventDefault()
      firstElement.focus()
    }
  }
}

function handleEscape(e: KeyboardEvent) {
  if (closeOnEscape && e.key === 'Escape') {
    e.preventDefault()
    emit('close')
  }
}

function handleBackdropClick(e: MouseEvent) {
  if (closeOnBackdrop && e.target === e.currentTarget) {
    emit('close')
  }
}

// Body scroll management
function disableBodyScroll() {
  document.body.style.overflow = 'hidden'
  document.body.setAttribute('aria-hidden', 'true')
}

function enableBodyScroll() {
  document.body.style.overflow = ''
  document.body.removeAttribute('aria-hidden')
}

// Lifecycle management
onMounted(() => {
  // Store previously focused element
  previouslyFocusedElement.value = document.activeElement as HTMLElement

  // Disable body scroll
  disableBodyScroll()

  // Add event listeners
  document.addEventListener('keydown', handleEscape)
  document.addEventListener('keydown', trapFocusHandler)

  // Focus management
  nextTick(() => {
    if (modalRef.value) {
      const focusableElements = getFocusableElements()
      if (focusableElements.length > 0) {
        focusableElements[0].focus()
      }
      else {
        modalRef.value.focus()
      }
    }
  })
})

onUnmounted(() => {
  // Restore body scroll
  enableBodyScroll()

  // Remove event listeners
  document.removeEventListener('keydown', handleEscape)
  document.removeEventListener('keydown', trapFocusHandler)

  // Restore focus
  nextTick(() => {
    previouslyFocusedElement.value?.focus()
  })
})
</script>

<template>
  <div
    :id="modalId"
    ref="modalRef"
    class="inset-0 fixed overflow-y-auto"
    :style="{ zIndex }"
    role="dialog"
    aria-modal="true"
    :aria-label="ariaLabelledby ? undefined : ariaLabel"
    :aria-labelledby="ariaLabelledby || undefined"
    :aria-describedby="ariaDescribedby || undefined"
    tabindex="-1"
    @click.self="handleBackdropClick"
  >
    <!-- Enhanced Backdrop with smooth transitions -->
    <div
      class="bg-black/20 transition-all duration-300 ease-out inset-0 fixed backdrop-blur-lg backdrop-saturate-150 backdrop-brightness-110 dark:bg-black/30 dark:backdrop-blur-xl dark:backdrop-brightness-75" :class="[
        overlayClass,
      ]"
    />

    <!-- Modal Container with enhanced positioning -->
    <div
      class="px-4 py-8 flex min-h-screen transition-all duration-300 ease-out items-center justify-center relative" :class="[
        contentClass,
      ]"
    >
      <!-- Content wrapper with subtle shadow and scale animation -->
      <div class="animate-in scale-100 transform transition-all duration-300 ease-out">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes animate-in {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-in {
  animation: animate-in 0.3s ease-out;
}
</style>
