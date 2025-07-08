# Composables Development Guidelines

Composables are modular functions that leverage Vue's reactive features, providing reusable state and logic across components.

## Rules

**Prefix with `use` and follow PascalCase**
- ✅ `useCounter.ts`, `useApiRequest.ts`, `useUserData.ts`
- ❌ `counter.ts`, `APIrequest.ts`, `data.ts`
- Makes composables instantly recognizable

**Use descriptive, specific names**
- ✅ `useUserData`, `useProductSearch`, `useAuthStatus`
- ❌ `useData`, `useSearch`, `useStatus`
- Clear names improve code readability

**Place all composables in `/composables` directory**
```
src/
└── composables/
    ├── useCounter.ts
    ├── useUserData.ts
    └── useProductSearch.ts
```
- Auto-imported by Nuxt
- Centralized location

**Use object arguments for 4+ parameters**
```typescript
// ✅ Good - Multiple params
useUserData({ 
  id: 1, 
  fetchOnMount: true, 
  token: "abc", 
  locale: "en" 
})

// ✅ Good - Few params
useCounter(1, true, "session")

// ❌ Bad - Too many positional args
useUserData(1, true, "abc", "en")
```

**Always expose error state**
```typescript
// ✅ Good
const error = ref<Error | null>(null)
try {
  // operation
} catch (err) {
  error.value = err
}
return { error }

// ❌ Bad - Silent failures
try {
  // operation
} catch (err) {
  console.error(err) // Don't hide errors
}
```

**Keep UI logic out of composables**
```typescript
// ✅ Good - Return error, let component handle UI
export function useUserData() {
  const error = ref(null)
  // ...
  return { error }
}

// Component decides UI behavior
watch(error, (newError) => {
  if (newError) showToast("Error occurred")
})

// ❌ Bad - UI logic in composable
export function useUserData() {
  try {
    // ...
  } catch (e) {
    showToast("Error occurred") // NO!
  }
}
```

**Follow Single Responsibility Principle**
```typescript
// ✅ Good - One purpose
export function useCounter() {
  const count = ref(0)
  const increment = () => count.value++
  const decrement = () => count.value--
  return { count, increment, decrement }
}

// ❌ Bad - Mixed responsibilities
export function useUserAndCounter() {
  // User logic AND counter logic
}
```

## Composable Anatomy

Structure composables with clear sections:

```typescript
export function useUserData(userId: number) {
  // 1. Primary State - Main data
  const user = ref<User | null>(null)
  
  // 2. State Metadata - Supporting state
  const loading = ref(false)
  const error = ref<Error | null>(null)
  
  // 3. Computed Properties
  const hasUser = computed(() => user.value !== null)
  
  // 4. Methods - State manipulation
  const fetchUser = async () => {
    loading.value = true
    error.value = null
    try {
      user.value = await api.getUser(userId)
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }
  
  // 5. Lifecycle Hooks
  onMounted(() => {
    if (userId) fetchUser()
  })
  
  // 6. Watchers
  watch(() => userId, fetchUser)
  
  // 7. Return public API
  return {
    // State
    user: readonly(user),
    loading: readonly(loading),
    error: readonly(error),
    // Computed
    hasUser,
    // Methods
    fetchUser,
    refresh: fetchUser
  }
}
```

## Patterns

### Functional Core, Imperative Shell

Separate pure logic from side effects:

```typescript
// ✅ Good - Pure function core
const calculateTotal = (items: Item[]) => 
  items.reduce((sum, item) => sum + item.price, 0)

export function useCart() {
  const items = ref<Item[]>([])
  
  // Imperative shell uses pure function
  const total = computed(() => calculateTotal(items.value))
  
  const addItem = (item: Item) => {
    items.value.push(item)
    // Side effects here, not in pure function
    localStorage.setItem('cart', JSON.stringify(items.value))
  }
  
  return { items, total, addItem }
}

// ❌ Bad - Mixed concerns
const calculateTotal = (items: Item[]) => {
  const total = items.reduce((sum, item) => sum + item.price, 0)
  console.log('Total:', total) // Side effect in pure function
  return total
}
```

### Consistent Feature Ordering

Maintain this order across all composables:

1. **Imports & Types**
2. **Props/Arguments**
3. **Refs** - Reactive state
4. **Computed** - Derived state
5. **Methods** - Functions
6. **Lifecycle Hooks** - onMounted, etc.
7. **Watchers** - watch, watchEffect
8. **Return Statement**

```typescript
import { ref, computed, onMounted, watch } from 'vue'
import type { User } from '~/types'

export function useExample(userId: number) {
  // Refs
  const data = ref(null)
  const loading = ref(false)
  
  // Computed
  const isReady = computed(() => !loading.value && data.value)
  
  // Methods
  const refresh = async () => { /* ... */ }
  
  // Lifecycle
  onMounted(refresh)
  
  // Watchers
  watch(() => userId, refresh)
  
  // Return
  return { data, loading, isReady, refresh }
}
```

## Testing Strategy

**Test composables in isolation**
```typescript
// useCounter.test.ts
import { useCounter } from './useCounter'

test('increments count', () => {
  const { count, increment } = useCounter()
  expect(count.value).toBe(0)
  
  increment()
  expect(count.value).toBe(1)
})
```

**Mock external dependencies**
```typescript
vi.mock('~/api', () => ({
  getUser: vi.fn(() => Promise.resolve({ id: 1, name: 'Test' }))
}))
```

**Test error states**
```typescript
test('handles API errors', async () => {
  const { error, fetchData } = useApiData()
  
  // Force error
  vi.mocked(api.getData).mockRejectedValue(new Error('Failed'))
  
  await fetchData()
  expect(error.value).toEqual(new Error('Failed'))
})
```

## Best Practices

**Return readonly state when appropriate**
```typescript
return {
  // Prevent external mutations
  user: readonly(user),
  // Allow mutations through methods only
  updateUser
}
```

**Provide clear, minimal public API**
```typescript
// ✅ Good - Expose only what's needed
return { user, loading, refresh }

// ❌ Bad - Exposing internals
return { user, _cache, _retryCount, _lastFetch }
```

**Handle cleanup properly**
```typescript
export function useWebSocket(url: string) {
  const ws = ref<WebSocket>()
  
  onMounted(() => {
    ws.value = new WebSocket(url)
  })
  
  onUnmounted(() => {
    ws.value?.close()
  })
  
  return { ws }
}
```

**Type everything with TypeScript**
```typescript
interface UseCounterOptions {
  initial?: number
  min?: number
  max?: number
}

export function useCounter(options: UseCounterOptions = {}) {
  const { initial = 0, min = -Infinity, max = Infinity } = options
  // ...
}
```