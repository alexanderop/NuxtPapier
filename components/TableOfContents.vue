<script setup lang="ts">
interface Props {
  toc?: {
    title?: string
    links: any[]
  }
  floating?: boolean
}

const { toc, floating = false } = defineProps<Props>()

const activeId = ref('')

// Track scroll position and update active heading
function useActiveHeading() {
  const observer = ref<IntersectionObserver | null>(null)

  onMounted(() => {
    const headings = document.querySelectorAll('h2, h3, h4, h5, h6')

    if (headings.length === 0)
      return

    observer.value = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeId.value = entry.target.id
          }
        })
      },
      {
        rootMargin: '-100px 0px -60% 0px',
      },
    )

    headings.forEach((heading) => {
      if (heading.id) {
        observer.value?.observe(heading)
      }
    })
  })

  onBeforeUnmount(() => {
    observer.value?.disconnect()
  })
}

// Smooth scroll to heading
function scrollToHeading(id: string) {
  const element = document.getElementById(id)
  if (element) {
    const y = element.getBoundingClientRect().top + window.pageYOffset - 120
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

// Render TOC tree recursively
function renderTocTree(links: any[], level = 0): any[] {
  return links.map(link => ({
    ...link,
    level,
    hasChildren: link.children && link.children.length > 0,
    children: link.children ? renderTocTree(link.children, level + 1) : [],
  }))
}

const tocTree = computed(() => {
  if (!toc?.links)
    return []
  return renderTocTree(toc.links)
})

// Initialize active heading tracking
useActiveHeading()
</script>

<template>
  <div
    v-if="toc?.links && toc.links.length > 0"
    class="toc-container" :class="[
      floating ? 'toc-floating' : 'toc-inline',
    ]"
  >
    <div class="toc-header">
      <h3 class="text-sm text-heading tracking-wide font-semibold uppercase">
        {{ toc.title || 'Table of Contents' }}
      </h3>
    </div>

    <nav class="toc-nav">
      <ul class="toc-list">
        <li
          v-for="link in tocTree"
          :key="link.id"
          class="toc-item" :class="[
            `toc-depth-${link.depth}`,
            { 'toc-active': activeId === link.id },
          ]"
        >
          <button
            class="toc-link" :class="[
              { 'toc-link-active': activeId === link.id },
            ]"
            @click="scrollToHeading(link.id)"
          >
            {{ link.text }}
          </button>

          <!-- Render children recursively -->
          <ul v-if="link.children && link.children.length > 0" class="toc-children">
            <li
              v-for="child in link.children"
              :key="child.id"
              class="toc-item" :class="[
                `toc-depth-${child.depth}`,
                { 'toc-active': activeId === child.id },
              ]"
            >
              <button
                class="toc-link" :class="[
                  { 'toc-link-active': activeId === child.id },
                ]"
                @click="scrollToHeading(child.id)"
              >
                {{ child.text }}
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.toc-container {
  @apply text-sm;
}

.toc-floating {
  @apply sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto;
  @apply border border-border rounded-lg bg-surface p-4;
  @apply shadow-sm;
}

.toc-inline {
  @apply mb-8 p-4 border border-border rounded-lg bg-surface;
}

.toc-header {
  @apply mb-3 pb-2 border-b border-border;
}

.toc-nav {
  @apply space-y-1;
}

.toc-list {
  @apply space-y-1;
}

.toc-item {
  @apply list-none;
}

.toc-link {
  @apply block w-full text-left px-2 py-1 rounded text-muted;
  @apply transition-colors duration-200 hover:text-brand-500 hover:bg-brand-50;
  @apply dark:hover:bg-brand-950;
}

.toc-link-active {
  @apply text-brand-600 bg-brand-50 font-medium;
  @apply dark:text-brand-400 dark:bg-brand-950;
}

/* Depth-based indentation */
.toc-depth-2 .toc-link {
  @apply pl-2;
}

.toc-depth-3 .toc-link {
  @apply pl-4;
}

.toc-depth-4 .toc-link {
  @apply pl-6;
}

.toc-depth-5 .toc-link {
  @apply pl-8;
}

.toc-depth-6 .toc-link {
  @apply pl-10;
}

.toc-children {
  @apply mt-1 space-y-1;
}

/* Scrollbar styling for floating TOC */
.toc-floating::-webkit-scrollbar {
  @apply w-2;
}

.toc-floating::-webkit-scrollbar-track {
  @apply bg-surface;
}

.toc-floating::-webkit-scrollbar-thumb {
  @apply bg-border rounded-full;
}

.toc-floating::-webkit-scrollbar-thumb:hover {
  @apply bg-muted;
}

/* Hide scrollbar for Firefox */
.toc-floating {
  scrollbar-width: thin;
  scrollbar-color: oklch(var(--color-border)) transparent;
}
</style>
