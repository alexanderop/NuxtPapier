# Component Development Guidelines

Components are the building blocks of your application, combining template, logic, and styling into reusable units.

## Rules

**Always use multi-word names with Base prefix**
- ✅ `BaseContainer`, `BaseButton`, `BaseCard`
- ❌ `Container`, `Button`, `Card`
- Prevents conflicts with HTML elements

**Name files consistently**
- ✅ PascalCase: `UserProfile.vue` OR kebab-case: `user-profile.vue`
- Always use PascalCase for component names in source code
- Compose from general to specific: `SearchButtonClear.vue` not `ClearSearchButton.vue`

**Order Vue SFC sections: script → template → style**
```vue
<script setup lang="ts">
// Logic first
</script>

<template>
  <!-- UI second -->
</template>

<style>
/* Styling last (if needed) */
</style>
```

**Always use `<script setup lang="ts">`**
- Modern Vue 3 composition API
- Better TypeScript integration

**Prefer `watchEffect` over `watch`**
- Automatic dependency tracking
- Cleaner code

**Use reactive props destructuring (Vue 3.5+)**
```typescript
const {
  variant = 'primary',
  size = 'md',
  disabled = false
} = defineProps<{
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}>()
```
- Never use `withDefaults()`
- Don't use `const props =` unless accessing props in script
- Always define props with TypeScript types

**Define emits with TypeScript**
```typescript
const emit = defineEmits<{
  eventName: [argOne: string]
  otherEvent: []
}>()
```
- Provides full type safety for events

**Use camelCase in JS, kebab-case in templates**
- JS: `modelValue`, `userName`
- Template: `model-value`, `user-name`
- Applies to both props and events

**Use prop shorthand when possible**
- ✅ `<MyComponent :count />`
- ❌ `<MyComponent :count="count" />`
- Only when prop name matches variable name

**Use slot shorthand**
- ✅ `<template #default>`
- ❌ `<template v-slot:default>`
- Always use explicit `<template>` tags for all slots

**Use defineModel for v-model bindings**
```typescript
// Simple two-way binding
const title = defineModel<string>()

// With options
const [value, modifiers] = defineModel<string>({
  default: 'default value',
  required: true,
  get: (value) => value.trim(),
  set: (value) => modifiers.capitalize 
    ? value.charAt(0).toUpperCase() + value.slice(1)
    : value
})

// Multiple models
const firstName = defineModel<string>('firstName')
const age = defineModel<number>('age')
```
- Avoids manual `modelValue` prop and `update:modelValue` event
- Supports multiple v-model bindings with named models
- Built-in support for modifiers and transformations

**Style with UnoCSS utilities**
- ✅ `class="flex items-center gap-2"`
- ❌ `style="display: flex; align-items: center;"`

## Architecture Patterns

### Functional Core, Imperative Shell

Split complex components into three layers:

1. **Pure Logic** (`pureComponentLogic.ts`)
   - Business logic functions
   - No Vue imports
   - No side effects
   - Unit testable

2. **Composable** (`useComponentLogic.ts`)
   - Vue reactivity (ref, computed)
   - Calls pure functions
   - Manages side effects

3. **Component** (`ComponentName.vue`)
   - Template and user interaction
   - Uses composable for state
   - Minimal logic

**Example:**
```typescript
// pureGameLogic.ts
export function calculateScore(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.value, 0)
}

// useGame.ts
export function useGame() {
  const items = ref<Item[]>([])
  const score = computed(() => calculateScore(items.value))
  return { items, score }
}

// GameComponent.vue
<script setup lang="ts">
import { useGame } from './useGame'
const { items, score } = useGame()
</script>
```

## Composables

**Name with `use` prefix**
- ✅ `useCounter`, `useAuth`, `useGameState`
- ❌ `counter`, `auth`, `gameState`

**Structure template:**
```typescript
export function useExample() {
  // State
  const state = ref(initialValue)
  
  // Computed
  const derived = computed(() => state.value * 2)
  
  // Methods
  const update = () => { state.value++ }
  
  // Lifecycle
  onMounted(() => { /* setup */ })
  
  // Return public API
  return {
    state: readonly(state), // prevent external mutations
    derived,
    update
  }
}
```

**Best practices:**
- Single responsibility per composable
- Return readonly state when appropriate
- Expose minimal public API
- Type everything with TypeScript

## Testing Strategy

**Layer approach:**
1. **Pure functions** → Simple unit tests
2. **Composables** → Test reactivity and state
3. **Components** → Test user interactions

**Benefits:**
- Pure functions test instantly (no Vue overhead)
- Each layer tested independently
- Tests focus on specific functionality
- Business logic survives framework changes

## v-model Usage

### Using v-model in parent components

```vue
<!-- Single v-model -->
<UserInput v-model="userName" />

<!-- Multiple named models -->
<UserForm 
  v-model:first-name="user.firstName" 
  v-model:age="user.age" 
/>

<!-- With modifiers -->
<UserInput v-model.capitalize="userName" />
```

### Implementing v-model in child components

```vue
<script setup lang="ts">
// Basic v-model
const modelValue = defineModel<string>()

// Named models for multiple bindings
const firstName = defineModel<string>('firstName')
const lastName = defineModel<string>('lastName')

// With transformations
const [value, modifiers] = defineModel<string>({
  get(value) {
    return value?.trim()
  },
  set(value) {
    if (modifiers.capitalize) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
    return value
  }
})
</script>

<template>
  <input v-model="modelValue" />
</template>
```

