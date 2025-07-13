<script setup lang="ts">
const modalStore = useModalStore()
const { topModal, closeTopModal } = modalStore
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
      mode="out-in"
    >
      <BaseModal
        v-if="topModal"
        :key="topModal.id"
        :z-index="1000 + (modalStore.modals.value.length - 1)"
        @close="closeTopModal"
      >
        <component
          :is="topModal.component"
          v-bind="topModal.props"
        />
      </BaseModal>
    </Transition>
  </Teleport>
</template>
