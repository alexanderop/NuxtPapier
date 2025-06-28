<script setup lang="ts">
interface Props {
  labels: string[]
}

const { labels } = defineProps<Props>()
const activeTab = ref(0)

// Use onMounted to ensure DOM is ready
onMounted(() => {
  updateVisibleTab()
})

// Update visible tab when activeTab changes
watch(activeTab, () => {
  updateVisibleTab()
})

const tabsRef = ref<HTMLElement>()

function updateVisibleTab() {
  if (!tabsRef.value)
    return

  const panels = tabsRef.value.querySelector('.tabs-panels')
  if (!panels)
    return

  const children = panels.children
  for (let i = 0; i < children.length; i++) {
    const child = children[i] as HTMLElement
    if (i === activeTab.value) {
      child.style.display = 'block'
    }
    else {
      child.style.display = 'none'
    }
  }
}
</script>

<template>
  <div ref="tabsRef" class="tabs">
    <div class="tabs-header">
      <button
        v-for="(label, index) in labels"
        :key="index"
        :class="{ active: activeTab === index }"
        class="tabs-button"
        @click="activeTab = index"
      >
        {{ label }}
      </button>
    </div>
    <div class="tabs-panels">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.tabs {
  margin: 1.5rem 0;
  border: 1px solid oklch(var(--border));
  border-radius: 0.5rem;
  overflow: hidden;
}

.tabs-header {
  display: flex;
  background: oklch(var(--surface));
  border-bottom: 1px solid oklch(var(--border));
}

.tabs-button {
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 0.875rem;
  color: oklch(var(--text-muted));
  transition: all 0.2s;
  position: relative;
}

.tabs-button:hover {
  color: oklch(var(--text));
}

.tabs-button.active {
  color: oklch(var(--brand-500));
  font-weight: 500;
}

.tabs-button.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: oklch(var(--brand-500));
}

.tabs-panels {
  background: oklch(var(--background));
  padding: 0;
}

/* Remove margins from code blocks */
.tabs-panels :deep(pre),
.tabs-panels :deep(.prose-pre-wrapper) {
  border-radius: 0;
  border: none;
  margin: 0;
}

/* Ensure code blocks fill the panel */
.tabs-panels :deep(> div),
.tabs-panels :deep(> pre),
.tabs-panels :deep(> .prose-pre-wrapper) {
  width: 100%;
}
</style>
