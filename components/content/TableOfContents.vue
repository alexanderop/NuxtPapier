<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'

interface TocLink {
  id: string
  text: string
  depth: number
  children?: TocLink[]
}

interface Toc {
  title?: string
  links: TocLink[]
}

interface Props {
  toc?: Toc
  title?: string
  floating?: boolean
}

const {
  toc,
  title = 'Table of Contents',
  floating = false,
} = defineProps<Props>()

const { y } = useWindowScroll()
const activeId = ref<string>('')

function updateActiveId() {
  const headings = document.querySelectorAll('h2[id], h3[id]')
  const scrollPosition = y.value + 100

  for (let i = headings.length - 1; i >= 0; i--) {
    const heading = headings[i] as HTMLElement
    if (heading.offsetTop <= scrollPosition) {
      activeId.value = heading.id
      break
    }
  }
}

function scrollToSection(id: string) {
  const element = document.getElementById(id)
  if (element) {
    const offset = 80
    const elementPosition = element.offsetTop - offset
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth',
    })
  }
}

watchThrottled(y, updateActiveId, { throttle: 100 })

onMounted(() => {
  updateActiveId()
})
</script>

<template>
  <nav
    v-if="toc && toc.links && toc.links.length"
    class="toc"
    :class="{ 'toc-floating': floating }"
  >
    <h4 class="toc-title">
      {{ title }}
    </h4>
    <ul class="toc-links">
      <li
        v-for="link in toc.links"
        :key="link.id"
        class="toc-link-item"
      >
        <a
          :href="`#${link.id}`"
          class="toc-link"
          :class="{
            'toc-link-active': activeId === link.id,
            [`toc-link-${link.depth}`]: true,
          }"
          @click="scrollToSection(link.id)"
        >
          {{ link.text }}
        </a>
        <ul v-if="link.children && link.children.length" class="toc-sublinks">
          <li
            v-for="child in link.children"
            :key="child.id"
            class="toc-link-item"
          >
            <a
              :href="`#${child.id}`"
              class="toc-link toc-link-child"
              :class="{ 'toc-link-active': activeId === child.id }"
              @click="scrollToSection(child.id)"
            >
              {{ child.text }}
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.toc {
  padding: 1.5rem;
  background: oklch(var(--surface));
  border: 1px solid oklch(var(--border));
  border-radius: 0.5rem;
  margin-bottom: 2rem;
}

.toc-floating {
  position: sticky;
  top: 5rem;
  max-height: calc(100vh - 6rem);
  overflow-y: auto;
}

.toc-title {
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: oklch(var(--text-muted));
  margin-bottom: 1rem;
}

.toc-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-sublinks {
  list-style: none;
  padding: 0;
  margin: 0;
  margin-left: 1rem;
}

.toc-link-item {
  margin-bottom: 0.25rem;
}

.toc-link {
  display: block;
  padding: 0.375rem 0;
  color: oklch(var(--text-muted));
  text-decoration: none;
  font-size: 0.875rem;
  transition: all 0.2s;
  border-left: 2px solid transparent;
  padding-left: 0.75rem;
  margin-left: -0.75rem;
}

.toc-link:hover {
  color: oklch(var(--text));
}

.toc-link-active {
  color: oklch(var(--brand-500));
  border-left-color: oklch(var(--brand-500));
  font-weight: 500;
}

.toc-link-child {
  font-size: 0.8125rem;
  padding: 0.25rem 0;
}

.toc-link-2 {
  font-weight: 500;
}

.toc-link-3 {
  font-size: 0.8125rem;
}

@media (max-width: 1024px) {
  .toc-floating {
    position: relative;
    top: 0;
    margin-bottom: 2rem;
  }
}
</style>
