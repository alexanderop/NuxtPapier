<script setup lang="ts">
import type { ShortcutsConfig } from '~/composables/defineShortcuts'
import { defineShortcuts } from '~/composables/defineShortcuts'

// Props interface
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

// Fetch recent blog posts
const { data: recentPosts } = await useAsyncData('recent-blog-posts', () => {
  return queryCollection('blog')
    .order('date', 'DESC')
    .limit(10)
    .orWhere(query =>
      query
        .where('draft', '<>', true)
        .where('draft', 'IS NULL'),
    )
    .all()
})

// Navigation
const router = useRouter()

function navigateToPost(index: number) {
  if (recentPosts.value && recentPosts.value[index]) {
    const post = recentPosts.value[index]
    const path = post.path.startsWith('/blog') ? post.path : `/blog${post.path}`
    router.push(path)
    closeModal()
  }
}

// Quick jump shortcuts when modal is open
const quickJumpShortcuts = computed<ShortcutsConfig>(() => {
  if (!isOpen)
    return {}

  const shortcuts: ShortcutsConfig = {}

  // Number keys 0-9 for quick navigation
  for (let i = 0; i <= 9; i++) {
    shortcuts[i.toString()] = () => navigateToPost(i)
  }

  return shortcuts
})

// Initialize shortcuts
defineShortcuts(quickJumpShortcuts)

// Format date
function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
</script>

<template>
  <BaseModal
    :model-value="isOpen"
    @update:model-value="closeModal"
  >
    <div class="p-6">
      <h2 class="text-lg text-heading font-semibold mb-4">
        Quick Jump to Recent Posts
      </h2>

      <div v-if="recentPosts && recentPosts.length > 0" class="space-y-2">
        <button
          v-for="(post, index) in recentPosts"
          :key="post.path"
          class="p-3 text-left rounded-lg flex gap-3 w-full transition-colors items-start hover:bg-brand-50 dark:hover:bg-brand-900"
          @click="navigateToPost(index)"
        >
          <BaseKbd :keys="[index.toString()]" class="mt-0.5 flex-shrink-0" />
          <div class="flex-1 min-w-0">
            <h3 class="text-body font-medium truncate">
              {{ post.title }}
            </h3>
            <time class="text-sm text-muted">
              {{ formatDate(post.date) }}
            </time>
          </div>
        </button>
      </div>

      <div v-else class="py-8 text-center">
        <p class="text-muted">
          No blog posts available
        </p>
      </div>

      <div class="mt-4 pt-4 text-center border-t border-border">
        <span class="text-xs text-muted">
          Press a number key to jump to a post
        </span>
      </div>
    </div>
  </BaseModal>
</template>
