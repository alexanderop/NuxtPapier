<script setup lang="ts">
interface Props {
  title: string
  open?: boolean
}

const { title, open = false } = defineProps<Props>()

const isOpen = ref(open)

function handleClick(event: MouseEvent) {
  event.preventDefault()
  isOpen.value = !isOpen.value
  const target = event.currentTarget as HTMLElement
  const details = target?.parentElement as HTMLDetailsElement
  if (details) {
    details.open = isOpen.value
  }
}
</script>

<template>
  <details class="details" :open="open">
    <summary class="details-summary" @click="handleClick">
      <Icon :name="isOpen ? 'i-ph-caret-down' : 'i-ph-caret-right'" class="details-icon" />
      <span class="details-title">{{ title }}</span>
    </summary>
    <div class="details-content">
      <slot />
    </div>
  </details>
</template>

<style scoped>
.details {
  margin: 1.5rem 0;
  border: 1px solid oklch(var(--border));
  border-radius: 0.5rem;
  overflow: hidden;
  background: oklch(var(--surface));
}

.details-summary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  cursor: pointer;
  user-select: none;
  list-style: none;
  background: oklch(var(--surface));
  transition: background-color 0.2s;
}

.details-summary::-webkit-details-marker {
  display: none;
}

.details-summary:hover {
  background: oklch(var(--surface-secondary));
}

.details-icon {
  flex-shrink: 0;
  font-size: 1.25rem;
  color: oklch(var(--text-muted));
  transition: transform 0.2s;
}

.details[open] .details-icon {
  transform: rotate(0deg);
}

.details-title {
  font-weight: 500;
  color: oklch(var(--text));
}

.details-content {
  padding: 0 1rem 1rem;
  animation: slideDown 0.2s ease-out;
}

.details-content :deep(> *:first-child) {
  margin-top: 0;
}

.details-content :deep(> *:last-child) {
  margin-bottom: 0;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-0.5rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
