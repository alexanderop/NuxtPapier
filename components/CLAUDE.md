### 1  Naming & File Structure
* **All component names must be multi-word** (except root App components) to avoid clashes with native HTML elements.
* Use **`Base`** prefix only for pure UI components (presentational, dumb, or pure components) that apply app-specific styling and conventions (e.g., `BaseButton`, `BaseInput`, `BaseCard`).
* Use **`The`** prefix for single-instance components that should only ever have one active instance (e.g., `TheHeader`, `TheSidebar`).
* Use **parent component name as prefix** for tightly coupled child components (e.g., `TodoList` → `TodoListItem` → `TodoListItemButton`).
* Keep component names in source code PascalCase.
* Name files in PascalCase (`UserProfile.vue`) or kebab-case (`user-profile.vue`).
* Compose file names general → specific (`SearchButtonClear.vue`).

### 2  SFC Layout & Script Setup
* Order sections **`script → template → style`** in every Vue SFC.
* Always start with `<script setup lang="ts">` (Composition API).

### 3  Reactivity Patterns
* Reach for `shallowRef()` / `shallowReactive()` with very large, mostly-immutable data.
* Prefer `watchEffect()` over `watch()` for automatic dependency tracking.

### 4  Props, Emits & v-model
* Destructure props reactively (Vue 3.5+); never use `withDefaults()`.
* Define props and emits with explicit TypeScript generics for full type safety.
* Implement every `v-model` (single or multiple) with `defineModel()`—supports modifiers, defaults, transforms.
* Use camelCase in JavaScript and kebab-case in templates for both props and events.
* Apply prop shorthand when the variable name matches the prop (`:count`).
* Use slot shorthand `#default` (and other named slots) inside explicit `<template>` tags.


### 6  Styling
* Style exclusively with **UnoCSS** utility classes—avoid inline styles.

### 8  SSR & Hydration

* Defer hydration with strategies such as `hydrateOnVisible()` / `hydrateOnIdle()` in `defineAsyncComponent()`.
* Generate stable server/client IDs with `useId()` to avoid hydration mismatches.
* Suppress inevitable server-client differences (e.g., timestamps) with `data-allow-mismatch`.

### 11  Composable & API Design Best Practices

* Give each composable a single responsibility.
* Return `readonly` state when exposing reactive data.
* Expose only a minimal, deliberate public API.
* Type everything with TypeScript.

define props like

const { items } = defineProps<{
  items: {
    name: string
    url?: string
  }[]
}>()