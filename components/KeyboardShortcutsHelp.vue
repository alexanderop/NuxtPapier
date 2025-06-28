<script setup lang="ts">
interface Props {
  isOpen: boolean
}

// Props destructuring
const { isOpen } = defineProps<Props>()

// Emits
const emit = defineEmits<{
  'update:isOpen': [value: boolean]
}>()

// Methods
function closeModal() {
  emit('update:isOpen', false)
}

// Keyboard shortcuts data
const shortcuts = [
  {
    category: 'Search',
    items: [
      { keys: ['slash'], description: 'Open search' },
      { keys: ['meta', 'k'], description: 'Open search' },
    ],
  },
  {
    category: 'Navigation',
    items: [
      { keys: ['g', 'h'], description: 'Go to home' },
      { keys: ['g', 'b'], description: 'Go to blog' },
      { keys: ['g', 's'], description: 'Open theme settings' },
      { keys: ['g', 'j'], description: 'Quick jump to recent posts' },
      { keys: ['g', 'r'], description: 'Go to most recent post' },
    ],
  },
  {
    category: 'Blog Navigation',
    items: [
      { keys: ['1-9'], description: 'Jump to nth post (on blog index)' },
      { keys: ['h'], description: 'Previous post (on post page)' },
      { keys: ['l'], description: 'Next post (on post page)' },
      { keys: ['b'], description: 'Back to blog index (on post page)' },
    ],
  },
  {
    category: 'Scrolling',
    items: [
      { keys: ['j'], description: 'Scroll down' },
      { keys: ['k'], description: 'Scroll up' },
      { keys: ['g', 'g'], description: 'Scroll to top' },
      { keys: ['shift', 'g'], description: 'Scroll to bottom' },
    ],
  },
  {
    category: 'Theme',
    items: [
      { keys: ['meta', 'd'], description: 'Toggle dark mode' },
    ],
  },
  {
    category: 'General',
    items: [
      { keys: ['?'], description: 'Show keyboard shortcuts' },
      { keys: ['escape'], description: 'Close modal' },
    ],
  },
]
</script>

<template>
  <BaseModal
    :model-value="isOpen"
    @update:model-value="closeModal"
  >
    <div class="p-6">
      <h2 class="text-lg text-heading font-semibold mb-4">
        Keyboard Shortcuts
      </h2>
      <div class="space-y-6">
        <div
          v-for="section in shortcuts"
          :key="section.category"
          class="space-y-2"
        >
          <h3 class="text-sm text-heading font-semibold">
            {{ section.category }}
          </h3>
          <div class="space-y-1">
            <div
              v-for="(item, index) in section.items"
              :key="index"
              class="py-1.5 flex items-center justify-between"
            >
              <span class="text-sm text-body">{{ item.description }}</span>
              <BaseKbd :keys="item.keys" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseModal>
</template>
