# Vue 3.5 Style Guide

This guide outlines Vue 3 best practices with emphasis on the new APIs introduced in Vue 3.5 "Tengen Toppa Gurren Lagann". Always prefer these modern patterns for cleaner, more maintainable code.

## 🚀 Vue 3.5 Preferred APIs

### Reactive Props Destructure (Stable in 3.5)

#### ✅ Preferred: Props Destructuring with Defaults

```vue
<script setup lang="ts">
// Modern approach with reactive destructuring
const {
  count = 0,
  title = 'Default Title',
  items = [] as string[]
} = defineProps<{
  count?: number
  title?: string
  items?: string[]
}>()
</script>
```

#### ❌ Avoid: withDefaults

```vue
<script setup lang="ts">
// Old pattern - more verbose
const props = withDefaults(
  defineProps<{
    count?: number
    title?: string
    items?: string[]
  }>(),
  {
    count: 0,
    title: 'Default Title',
    items: () => []
  }
)
</script>
```

### Important Notes on Reactive Props Destructure

1. **Watching Destructured Props**: Always wrap in a getter

   ```ts
   // ❌ Wrong
   watch(count, (newCount) => {})

   // ✅ Correct
   watch(() => count, (newCount) => {})
   ```

2. **Passing to Composables**: Use getters or toValue()

   ```ts
   // Composable should handle with toValue()
   function useCounter(count: MaybeRefOrGetter<number>) {
     const value = toValue(count)
     // ...
   }

   // Usage
   useCounter(() => count)
   ```

### Template Refs with useTemplateRef()

#### ✅ Preferred: useTemplateRef

```vue
<script setup lang="ts">
import { useTemplateRef } from 'vue'

const inputRef = useTemplateRef<HTMLInputElement>('input')
const componentRef = useTemplateRef<ComponentInstance>('myComponent')

// Dynamic refs
const dynamicRef = useTemplateRef<HTMLElement>(() => `item-${activeId.value}`)
</script>

<template>
  <input ref="input">
  <MyComponent ref="myComponent" />
  <div :ref="`item-${activeId}`" />
</template>
```

#### ❌ Avoid: Plain refs matching template names

```vue
<script setup lang="ts">
// Old pattern - limited to static refs
const input = ref<HTMLInputElement>()
</script>
```

### Unique IDs with useId()

#### ✅ Preferred: For SSR-safe unique IDs

```vue
<script setup lang="ts">
import { useId } from 'vue'

const formId = useId()
const inputId = useId()
</script>

<template>
  <form :id="formId">
    <label :for="inputId">Email:</label>
    <input :id="inputId" type="email">
  </form>
</template>
```

### Watcher Cleanup with onWatcherCleanup()

#### ✅ Preferred: Clean side effects in watchers

```vue
<script setup lang="ts">
import { onWatcherCleanup, watch } from 'vue'

watch(() => props.userId, async (userId) => {
  const controller = new AbortController()

  onWatcherCleanup(() => {
    controller.abort()
  })

  try {
    const response = await fetch(`/api/users/${userId}`, {
      signal: controller.signal
    })
    // Handle response
  }
  catch (e) {
    if (e.name !== 'AbortError') {
      console.error(e)
    }
  }
})
</script>
```

### Deferred Teleport

#### ✅ Use defer for elements rendered after teleport

```vue
<template>
  <!-- Teleport to an element that appears later -->
  <Teleport defer target="#modal-container">
    <ModalContent />
  </Teleport>

  <!-- This container is rendered after the teleport -->
  <div id="modal-container" />
</template>
```

## 📋 General Vue 3 Best Practices

### Composition API Patterns

#### ✅ Preferred: Script Setup

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)

function increment() {
  count.value++
}
</script>
```

### Component Props Typing

#### ✅ Preferred: TypeScript Interface with Destructuring

```vue
<script setup lang="ts">
interface Props {
  user: User
  isActive?: boolean
  onUpdate?: (user: User) => void
}

const {
  user,
  isActive = false,
  onUpdate
} = defineProps<Props>()
</script>
```

### Emits Declaration

#### ✅ Preferred: Type-based declaration

```vue
<script setup lang="ts">
const emit = defineEmits<{
  'update': [value: string]
  'delete': [id: number]
  'update:modelValue': [value: boolean]
}>()
</script>
```

### Composables Structure

#### ✅ Preferred Pattern

```ts
// composables/useCounter.ts
export function useCounter(initial: MaybeRefOrGetter<number> = 0) {
  const count = ref(toValue(initial))

  function increment() {
    count.value++
  }

  function decrement() {
    count.value--
  }

  return {
    count: readonly(count),
    increment,
    decrement
  }
}
```

### Async Components with Lazy Hydration (SSR)

#### ✅ For SSR applications

```ts
import { defineAsyncComponent, hydrateOnIdle, hydrateOnVisible } from 'vue'

// Hydrate when visible
const LazyChart = defineAsyncComponent({
  loader: () => import('./Chart.vue'),
  hydrate: hydrateOnVisible()
})

// Hydrate when idle
const LazyFooter = defineAsyncComponent({
  loader: () => import('./Footer.vue'),
  hydrate: hydrateOnIdle()
})
```

### SSR Hydration Mismatch Handling

#### ✅ Use data-allow-mismatch for expected differences

```vue
<template>
  <!-- Date will differ between server and client -->
  <time data-allow-mismatch>{{ new Date().toLocaleString() }}</time>

  <!-- Specific mismatch types -->
  <div data-allow-mismatch="class style">
    <!-- Content with dynamic classes/styles -->
  </div>
</template>
```

## 🎯 Component Organization

### Recommended SFC Order

```vue
<script setup lang="ts">
import type { User } from '~/types'
// 1. Imports
import { computed, ref } from 'vue'

// 2. Props interface
interface Props {
  user: User
}

// 3. Props destructuring
const { user } = defineProps<Props>()

// 4. Emits
const emit = defineEmits<{
  update: [user: User]
}>()

// 5. Template refs
const formRef = useTemplateRef<HTMLFormElement>('form')

// 6. Reactive state
const isEditing = ref(false)

// 7. Computed properties
const fullName = computed(() => `${user.firstName} ${user.lastName}`)

// 8. Watchers
watch(() => user.id, () => {
  isEditing.value = false
})

// 9. Lifecycle hooks
onMounted(() => {
  console.log('Component mounted')
})

// 10. Methods
function handleSubmit() {
  emit('update', user)
}
</script>

<template>
  <!-- Template content -->
</template>

<style scoped>
/* Scoped styles */
</style>
```

## 🚨 Anti-Patterns to Avoid

1. **Don't use `reactive()` for primitives**

   ```ts
   // ❌ Wrong
   const count = reactive(0)

   // ✅ Correct
   const count = ref(0)
   ```

2. **Don't destructure reactive objects**

   ```ts
   // ❌ Wrong - loses reactivity
   const { name, email } = reactive(user)

   // ✅ Correct
   const user = reactive({ name: '', email: '' })
   // Or use toRefs()
   const { name, email } = toRefs(user)
   ```

3. **Don't forget cleanup in watchers**

   ```ts
   // ❌ Wrong - memory leak
   watch(source, () => {
     const timer = setInterval(() => {}, 1000)
   })

   // ✅ Correct
   watch(source, () => {
     const timer = setInterval(() => {}, 1000)
     onWatcherCleanup(() => clearInterval(timer))
   })
   ```

## 🔧 Nuxt 3 Specific Patterns

### Auto-imported Composables

```vue
<script setup lang="ts">
// No need to import these - auto-imported by Nuxt
const route = useRoute()
const router = useRouter()
const { $api } = useNuxtApp()

// VueUse composables are also auto-imported
const { ctrl, shift } = useMagicKeys()
</script>
```

### Async Data Fetching

```vue
<script setup lang="ts">
// Use Nuxt's data fetching composables
const { data: posts, pending, error } = await useFetch('/api/posts')

// With transform
const { data: user } = await useFetch('/api/user', {
  transform: data => ({
    ...data,
    fullName: `${data.firstName} ${data.lastName}`
  })
})
</script>
```

## 📚 Resources

- [Vue 3.5 Release Notes](https://blog.vuejs.org/posts/vue-3-5)
- [Vue 3 Documentation](https://vuejs.org/guide/)
- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [VueUse Documentation](https://vueuse.org/)
