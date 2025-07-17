<script setup lang="ts">
defineEmits<{
  click: []
}>()
</script>

<template>
  <button
    type="button"
    class="px-2 py-1 flex gap-3 transition-colors items-center hover:text-[var(--color-primary)]"
    @click="$emit('click')"
  >
    <span class="tracking-wider">Search</span>

    <BaseKbd shortcut="cmd-k" />
  </button>
</template>
