import { computed, reactive, readonly, toRefs } from 'vue'

export interface Modal {
  id: number
  component: any
  props?: Record<string, unknown>
}

const state = reactive({
  modals: [] as Modal[],
})

let id = 0

export default function useModalStore() {
  const { modals } = toRefs(state)

  const topModal = computed(() =>
    (modals.value.length > 0
      ? modals.value[modals.value.length - 1]
      : null),
  )

  const hasModals = computed(() => modals.value.length > 0)

  function openModal(
    component: any,
    props: Modal['props'] = {},
  ) {
    state.modals.push({
      id: ++id,
      component,
      props,
    })
  }

  function closeTopModal() {
    if (state.modals.length > 0) {
      state.modals.pop()
    }
  }

  function closeAllModals() {
    state.modals.length = 0
  }

  function closeModalById(modalId: number) {
    const index = state.modals.findIndex(modal => modal.id === modalId)
    if (index !== -1) {
      state.modals.splice(index, 1)
    }
  }

  return {
    modals: readonly(modals),
    topModal: readonly(topModal),
    hasModals: readonly(hasModals),
    openModal,
    closeTopModal,
    closeAllModals,
    closeModalById,
  }
}
