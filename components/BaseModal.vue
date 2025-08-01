<script setup lang="ts">
const {
  overlayClass = '',
  contentClass = '',
  ariaLabel = 'Modal dialog',
  ariaLabelledby = '',
  ariaDescribedby = '',
  closeOnEscape = true,
  closeOnBackdrop = true,
  returnFocus = true,
  position = 'center',
  autoFocus = true,
} = defineProps<{
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
  /** Whether to close modal on Escape key */
  closeOnEscape?: boolean
  /** Whether to close modal on backdrop click */
  closeOnBackdrop?: boolean
  /** Whether to return focus to previous element on close */
  returnFocus?: boolean
  /** Modal position: center, top, command-palette */
  position?: 'center' | 'top' | 'command-palette'
  /** Whether to auto-focus first focusable element */
  autoFocus?: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const dialogRef = useTemplateRef<HTMLDialogElement>('dialogRef')
const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
const firstFocusableElement = ref<HTMLElement>()
const previouslyFocusedElement = ref<HTMLElement>()

const positionClasses = computed(() => {
  switch (position) {
    case 'top':
      return 'items-start pt-[10vh]'
    case 'command-palette':
      return 'items-start pt-[20vh]'
    case 'center':
    default:
      return 'items-center'
  }
})

useFocus(firstFocusableElement, {
  initialValue: false,
})

async function openModal() {
  if (!dialogRef.value)
    return

  const { activeElement } = document
  if (activeElement instanceof HTMLElement) {
    previouslyFocusedElement.value = activeElement
  }

  try {
    dialogRef.value.showModal()
  }
  catch {
    // Handle modal opening error silently
  }

  if (autoFocus) {
    await nextTick()
    const focusable = contentRef.value?.querySelector<HTMLElement>(
      'input:not([disabled]), textarea:not([disabled]), select:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    )

    if (focusable) {
      firstFocusableElement.value = focusable
      focusable.focus() // useFocus will automatically update focused.value
    }
  }
}

function closeModal() {
  if (!dialogRef.value)
    return

  dialogRef.value.close()
  emit('close')

  if (returnFocus && previouslyFocusedElement.value) {
    nextTick(() => {
      previouslyFocusedElement.value?.focus()
    })
  }
}

function handleBackdropClick(e: MouseEvent) {
  if (closeOnBackdrop && e.target === dialogRef.value) {
    closeModal()
  }
}

function handleCancel(e: Event) {
  if (!closeOnEscape) {
    e.preventDefault()
    return
  }
  emit('close')
}

onMounted(() => {
  openModal()
})

defineExpose({
  close: closeModal,
  open: openModal,
})
</script>

<template>
  <dialog
    ref="dialogRef"
    class="modal-dialog bg-transparent backdrop:bg-[var(--color-backdrop)] backdrop:backdrop-blur-lg backdrop:backdrop-brightness-110 backdrop:backdrop-saturate-150 dark:backdrop:backdrop-blur-xl dark:backdrop:backdrop-brightness-75"
    :class="overlayClass"
    :aria-label="ariaLabelledby ? undefined : ariaLabel"
    :aria-labelledby="ariaLabelledby || undefined"
    :aria-describedby="ariaDescribedby || undefined"
    @cancel="handleCancel"
  >
    <div
      class="p-4 flex h-full w-full justify-center"
      :class="positionClasses"
      role="presentation"
      @click="handleBackdropClick"
    >
      <div
        ref="contentRef"
        class="animate-in focus-within:ring-primary-500/50 rounded-lg transform transition-all duration-300 ease-out relative focus-within:ring-2"
        :class="contentClass"
        @click.stop
      >
        <slot />
      </div>
    </div>
  </dialog>
</template>

<style scoped>
.modal-dialog {
  padding: 0;
  margin: 0;
  border: none;
  overflow: visible;
  width: 100vw;
  height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-dialog::backdrop {
  background: transparent;
}

.modal-dialog[open] {
  display: flex;
  animation: dialog-show 0.3s ease-out;
}

.modal-dialog[open]::backdrop {
  animation: backdrop-show 0.3s ease-out;
}

@keyframes dialog-show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes backdrop-show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

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

:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}
</style>
