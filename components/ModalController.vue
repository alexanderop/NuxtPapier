<script setup lang="ts">
const modalStore = useModalStore()
const { topModal, hasModals, closeTopModal } = modalStore

// Global keyboard handling
function handleEscape(e: KeyboardEvent) {
  if (e.key === 'Escape' && hasModals.value) {
    e.preventDefault()
    closeTopModal()
  }
}

// Body scroll management
watch(hasModals, (hasModalValue) => {
  document.body.style.overflow = hasModalValue ? 'hidden' : ''
})

// Focus management - focus the modal when it opens
watch(topModal, async (modal) => {
  if (modal) {
    await nextTick()
    // Find the first focusable element in the modal
    const modalElement = document.querySelector(`[data-modal-id="${modal.id}"]`)
    if (modalElement) {
      const focusableElement = modalElement.querySelector('input, button, [tabindex]:not([tabindex="-1"])')
      if (focusableElement) {
        (focusableElement as HTMLElement).focus()
      }
    }
  }
})

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <BaseModal
        v-if="topModal"
        :key="topModal.id"
        :z-index="1000 + (modalStore.modals.value.length - 1)"
        @close="closeTopModal"
      >
        <div :data-modal-id="topModal.id">
          <component
            :is="topModal.component"
            v-bind="topModal.props"
          />
        </div>
      </BaseModal>
    </Transition>
  </Teleport>
</template>
