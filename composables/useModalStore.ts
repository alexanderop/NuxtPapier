export interface Modal {
  id: number
  component: Component
  props?: Record<string, unknown>
}

const modals = ref<Modal[]>([])
let id = 0

export default function useModalStore() {
  const topModal = computed(() =>
    (modals.value.length > 0
      ? modals.value[modals.value.length - 1]
      : null),
  )

  const hasModals = computed(() => modals.value.length > 0)

  function openModal(
    component: Component,
    props: Modal['props'] = {},
  ) {
    modals.value.push({
      component,
      id: ++id,
      props,
    })
  }

  function closeTopModal() {
    if (modals.value.length > 0) {
      modals.value.pop()
    }
  }

  function closeAllModals() {
    modals.value = []
  }

  function closeModalById(modalId: number) {
    const index = modals.value.findIndex(modal => modal.id === modalId)
    if (index !== -1) {
      modals.value.splice(index, 1)
    }
  }

  return {
    closeAllModals,
    closeModalById,
    closeTopModal,
    hasModals: readonly(hasModals),
    modals: readonly(modals),
    openModal,
    topModal: readonly(topModal),
  }
}
