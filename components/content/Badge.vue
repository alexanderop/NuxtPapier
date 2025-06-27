<script setup lang="ts">
interface Props {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md' | 'lg'
  icon?: string
}

const {
  variant = 'default',
  size = 'md',
  icon,
} = defineProps<Props>()
</script>

<template>
  <span
    class="badge"
    :class="[
      `badge-${variant}`,
      `badge-${size}`,
    ]"
  >
    <Icon v-if="icon" :name="icon" class="badge-icon" />
    <slot />
  </span>
</template>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: 500;
  border-radius: 9999px;
  transition: all 0.2s;
}

.badge-icon {
  flex-shrink: 0;
}

/* Size variants */
.badge-sm {
  padding: 0.125rem 0.5rem;
  font-size: 0.75rem;
}

.badge-md {
  padding: 0.25rem 0.75rem;
  font-size: 0.8125rem;
}

.badge-lg {
  padding: 0.375rem 1rem;
  font-size: 0.875rem;
}

/* Color variants */
.badge-default {
  background: oklch(var(--surface-secondary));
  color: oklch(var(--text));
  border: 1px solid oklch(var(--border));
}

.badge-primary {
  background: oklch(var(--brand-100));
  color: oklch(var(--brand-700));
  border: 1px solid oklch(var(--brand-200));
}

.badge-success {
  background: oklch(92% 0.05 142);
  color: oklch(30% 0.15 142);
  border: 1px solid oklch(85% 0.08 142);
}

.badge-warning {
  background: oklch(92% 0.05 80);
  color: oklch(30% 0.15 80);
  border: 1px solid oklch(85% 0.08 80);
}

.badge-error {
  background: oklch(92% 0.05 25);
  color: oklch(30% 0.15 25);
  border: 1px solid oklch(85% 0.08 25);
}

.badge-info {
  background: oklch(92% 0.05 220);
  color: oklch(30% 0.15 220);
  border: 1px solid oklch(85% 0.08 220);
}

/* Dark mode adjustments */
:root.dark .badge-primary {
  background: oklch(var(--brand-900) / 0.3);
  color: oklch(var(--brand-300));
  border-color: oklch(var(--brand-800));
}

:root.dark .badge-success {
  background: oklch(25% 0.05 142 / 0.3);
  color: oklch(80% 0.15 142);
  border-color: oklch(35% 0.08 142);
}

:root.dark .badge-warning {
  background: oklch(25% 0.05 80 / 0.3);
  color: oklch(80% 0.15 80);
  border-color: oklch(35% 0.08 80);
}

:root.dark .badge-error {
  background: oklch(25% 0.05 25 / 0.3);
  color: oklch(80% 0.15 25);
  border-color: oklch(35% 0.08 25);
}

:root.dark .badge-info {
  background: oklch(25% 0.05 220 / 0.3);
  color: oklch(80% 0.15 220);
  border-color: oklch(35% 0.08 220);
}
</style>
