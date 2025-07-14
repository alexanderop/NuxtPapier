<script setup lang="ts">
defineEmits<{
  close: []
}>()

const model = defineModel<string>()
const inputRef = useTemplateRef<HTMLInputElement>('inputRef')

onMounted(() => {
  inputRef.value?.focus()
})
</script>

<template>
  <div class="border-b border-[var(--color-border)] flex items-center">
    <Icon
      name="i-heroicons-magnifying-glass"
      class="text-[var(--color-text-muted)] ml-4 h-5 w-5"
    />
    <input
      ref="inputRef"
      v-model="model"
      type="text"
      placeholder="Type to search..."
      aria-label="Search"
      class="text-[var(--color-text)] px-4 py-4 bg-transparent flex-1 placeholder:text-[var(--color-text-muted)] focus:outline-none"
    >
    <button
      type="button"
      class="text-[var(--color-text-muted)] p-4 transition-colors hover:text-[var(--color-text)]"
      @click="$emit('close')"
    >
      <Icon name="i-heroicons-x-mark" class="h-5 w-5" />
    </button>
  </div>
</template>
