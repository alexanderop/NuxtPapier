<script setup lang="ts">
interface Props {
  type?: 'info' | 'warning' | 'error' | 'tip' | 'success'
  title?: string
  icon?: boolean
}

const {
  type = 'info',
  title,
  icon = true,
} = defineProps<Props>()

const alertClasses = computed(() => {
  const baseClasses = 'alert'
  const typeClasses = {
    info: 'alert-info',
    warning: 'alert-warning',
    error: 'alert-error',
    tip: 'alert-tip',
    success: 'alert-success',
  }
  return `${baseClasses} ${typeClasses[type]}`
})

const iconName = computed(() => {
  const icons = {
    info: 'octicon:info-16',
    warning: 'octicon:alert-16',
    error: 'octicon:x-circle-16',
    tip: 'octicon:light-bulb-16',
    success: 'octicon:check-circle-16',
  }
  return icons[type]
})
</script>

<template>
  <div :class="alertClasses">
    <Icon v-if="icon" :name="iconName" class="alert-icon" />
    <div class="alert-content">
      <div v-if="title" class="alert-title">
        {{ title }}
      </div>
      <div class="alert-body">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.alert {
  position: relative;
  margin: 1rem 0;
  padding: 1rem 1rem 1rem 3rem;
  border-radius: 0.375rem;
  border-left: 0.25rem solid;
}

.alert::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0.25rem;
  border-radius: 0.25rem 0 0 0.25rem;
}

.alert-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* When there's a title, adjust icon position */
.alert:has(.alert-title) .alert-icon {
  top: 1.125rem;
  transform: none;
}

.alert-content {
  flex: 1;
  min-width: 0;
}

.alert-title {
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 0.5rem;
}

.alert-body {
  font-size: 0.875rem;
  line-height: 1.6;
}

.alert-body :deep(p) {
  margin: 0;
}

.alert-body :deep(p + p) {
  margin-top: 0.75rem;
}

.alert-body :deep(code) {
  padding: 0.125rem 0.375rem;
  font-size: 0.8125rem;
  font-family: ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace;
  background: oklch(0 0 0 / 0.06);
  border-radius: 0.25rem;
}

.alert-body :deep(em) {
  font-style: italic;
}

/* Light theme base */
.alert {
  background-color: oklch(98% 0 0);
  color: oklch(25% 0 0);
}

/* Dark theme base */
:root.dark .alert {
  background-color: oklch(17% 0 0);
  color: oklch(90% 0 0);
}

:root.dark .alert-body :deep(code) {
  background: oklch(100% 0 0 / 0.06);
}

/* Info (Blue) */
.alert-info {
  border-left-color: oklch(60% 0.2 240);
}

.alert-info .alert-icon {
  color: oklch(60% 0.2 240);
}

:root.dark .alert-info {
  border-left-color: oklch(65% 0.2 240);
}

:root.dark .alert-info .alert-icon {
  color: oklch(65% 0.2 240);
}

/* Warning (Yellow/Amber) */
.alert-warning {
  border-left-color: oklch(70% 0.2 85);
}

.alert-warning .alert-icon {
  color: oklch(65% 0.2 85);
}

:root.dark .alert-warning {
  border-left-color: oklch(75% 0.2 85);
}

:root.dark .alert-warning .alert-icon {
  color: oklch(75% 0.2 85);
}

/* Error (Red) */
.alert-error {
  border-left-color: oklch(60% 0.25 25);
}

.alert-error .alert-icon {
  color: oklch(60% 0.25 25);
}

:root.dark .alert-error {
  border-left-color: oklch(65% 0.25 25);
}

:root.dark .alert-error .alert-icon {
  color: oklch(65% 0.25 25);
}

/* Tip/Success (Green) */
.alert-tip,
.alert-success {
  border-left-color: oklch(65% 0.2 145);
}

.alert-tip .alert-icon,
.alert-success .alert-icon {
  color: oklch(65% 0.2 145);
}

:root.dark .alert-tip,
:root.dark .alert-success {
  border-left-color: oklch(70% 0.2 145);
}

:root.dark .alert-tip .alert-icon,
:root.dark .alert-success .alert-icon {
  color: oklch(70% 0.2 145);
}
</style>
