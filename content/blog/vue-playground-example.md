---
title: Interactive Vue Playgrounds with @vue/repl
description: Learn how to use interactive Vue playgrounds in your blog posts using the official Vue REPL component
date: 2025-01-28
tags: [vue, playground, interactive, tutorial]
category: Features
---

# Interactive Vue Playgrounds with @vue/repl

This blog now supports interactive Vue playgrounds powered by the official `@vue/repl` component - the same technology that powers the Vue SFC Playground!

## Basic Example

Here's a simple interactive Vue component:

::alert{type="info"}
This is a test to see if MDC components work at all.
::

## Composition API Example

Let's create a more complex example with the Composition API:

::playground
---
code: |
  <script setup>
  import { computed, ref } from 'vue'

  const newTodo = ref('')
  const todos = ref([
    { id: 1, text: 'Learn Vue 3', completed: true },
    { id: 2, text: 'Build an app', completed: false }
  ])
  const currentFilter = ref('all')
  const filters = ['all', 'active', 'completed']

  const filteredTodos = computed(() => {
    switch (currentFilter.value) {
      case 'active':
        return todos.value.filter(todo => !todo.completed)
      case 'completed':
        return todos.value.filter(todo => todo.completed)
      default:
        return todos.value
    }
  })

  const remaining = computed(() =>
    todos.value.filter(todo => !todo.completed).length
  )

  const completed = computed(() =>
    todos.value.filter(todo => todo.completed).length
  )

  function addTodo() {
    todos.value.push({
      id: Date.now(),
      text: newTodo.value,
      completed: false
    })
    newTodo.value = ''
  }

  function removeTodo(id) {
    const index = todos.value.findIndex(todo => todo.id === id)
    todos.value.splice(index, 1)
  }

  function clearCompleted() {
    todos.value = todos.value.filter(todo => !todo.completed)
  }
  </script>

  <template>
  <div class="todo-app">
    <h2>Vue 3 Todo App</h2>

    <form @submit.prevent="addTodo">
      <input
        v-model="newTodo"
        placeholder="What needs to be done?"
        required
      >
      <button type="submit">
        Add Todo
      </button>
    </form>

    <div class="filters">
      <button
        v-for="filter in filters"
        :key="filter"
        :class="{ active: currentFilter === filter }"
        @click="currentFilter = filter"
      >
        {{ filter }}
      </button>
    </div>

    <transition-group v-if="filteredTodos.length" name="list" tag="ul">
      <li v-for="todo in filteredTodos" :key="todo.id">
        <input
          v-model="todo.completed"
          type="checkbox"
        >
        <span :class="{ completed: todo.completed }">
          {{ todo.text }}
        </span>
        <button class="delete" @click="removeTodo(todo.id)">
          ×
        </button>
      </li>
    </transition-group>

    <p v-else class="empty">
      No todos to show
    </p>

    <footer v-if="todos.length">
      <span>{{ remaining }} {{ remaining === 1 ? 'item' : 'items' }} left</span>
      <button v-if="completed > 0" @click="clearCompleted">
        Clear completed
      </button>
    </footer>

  </div>
</template>

<style scoped>
.todo-app {
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

h2 {
  text-align: center;
  color: #42b883;
  margin-bottom: 2rem;
}

form {
  display: flex;
  margin-bottom: 1rem;
}

input[type='text'] {
  flex: 1;
  padding: 0.75rem;
  font-size: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 4px 0 0 4px;
  outline: none;
}

input[type='text']:focus {
  border-color: #42b883;
}

form button {
  padding: 0.75rem 1.5rem;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  font-size: 1rem;
}

form button:hover {
  background: #3aa876;
}

.filters {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.filters button {
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.filters button:hover {
  border-color: #42b883;
}

.filters button.active {
  background: #42b883;
  color: white;
  border-color: #42b883;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
}

li {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  transition: all 0.3s;
}

li:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

input[type='checkbox'] {
  margin-right: 0.75rem;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.completed {
  text-decoration: line-through;
  opacity: 0.6;
}

.delete {
  margin-left: auto;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.delete:hover {
  background: #ff5252;
}

.empty {
  text-align: center;
  color: #999;
  padding: 2rem;
}

footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #666;
}

footer button {
  background: none;
  border: none;
  color: #42b883;
  cursor: pointer;
  text-decoration: underline;
}

/* Transitions */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
  </style>
---
::

## Component with Props

Here's an example showing component composition:

::playground
---
theme: light
code: |
  <script setup>
  import { ref } from 'vue'

  // Card Component
  const Card = {
  props: {
    title: String,
    color: {
      type: String,
      default: '#42b883'
    }
  },
  template: `
    <div class="card" :style="{ borderColor: color }">
      <h3 :style="{ color }">{{ title }}</h3>
      <slot />
    </div>
  `
}

// UserProfile Component
const UserProfile = {
  props: {
    user: Object
  },
  emits: ['update'],
  template: `
    <div class="user-profile">
      <input
        v-model="localUser.name"
        @input="$emit('update', localUser)"
        placeholder="Name"
      />
      <input
        v-model="localUser.email"
        @input="$emit('update', localUser)"
        placeholder="Email"
      />
      <p>Member since: {{ user.joinDate }}</p>
    </div>
  `,
  setup(props) {
    const localUser = ref({ ...props.user })
    return { localUser }
  }
}

// Main component data
const primaryColor = ref('#42b883')
const currentUser = ref({
  name: 'John Doe',
  email: 'john@example.com',
  joinDate: '2024-01-01'
})

function updateUser(newUser) {
  currentUser.value = { ...newUser }
}
</script>

<template>
  <div class="app">
    <h2>Component Composition Example</h2>

    <Card title="User Profile" :color="primaryColor">
      <UserProfile
        :user="currentUser"
        @update="updateUser"
      />
    </Card>

    <Card title="Settings" color="#ff6b6b">
      <label>
        Primary Color:
        <input v-model="primaryColor" type="color">
      </label>
    </Card>

  </div>
</template>

<style>
.app {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.card {
  background: white;
  border: 2px solid;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card h3 {
  margin: 0 0 1rem 0;
}

.user-profile input {
  display: block;
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
}

.user-profile input:focus {
  outline: none;
  border-color: #42b883;
}

.user-profile p {
  color: #666;
  font-size: 0.9rem;
}

label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

input[type='color'] {
  width: 50px;
  height: 30px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
  </style>
---
::

## Vertical Layout Example

Use `layout=vertical` for a different view:

::playground
---
layout: vertical
code: |
  <script setup>
  import { computed, ref } from 'vue'

  const color1 = ref('#667eea')
  const color2 = ref('#764ba2')
const angle = ref(135)
const gradientType = ref('linear')

const gradientCSS = computed(() => {
  if (gradientType.value === 'linear') {
    return `linear-gradient(${angle.value}deg, ${color1.value} 0%, ${color2.value} 100%)`
  }
  else {
    return `radial-gradient(circle, ${color1.value} 0%, ${color2.value} 100%)`
  }
})

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(gradientCSS.value)
    alert('Copied to clipboard!')
  }
  catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>

<template>
  <div class="gradient-generator">
    <h2>CSS Gradient Generator</h2>

    <div class="controls">
      <div class="color-inputs">
        <label>
          Color 1:
          <input v-model="color1" type="color">
        </label>
        <label>
          Color 2:
          <input v-model="color2" type="color">
        </label>
      </div>

      <label>
        Angle: {{ angle }}°
        <input
          v-model="angle"
          type="range"
          min="0"
          max="360"
          step="1"
        >
      </label>

      <label>
        Type:
        <select v-model="gradientType">
          <option value="linear">Linear</option>
          <option value="radial">Radial</option>
        </select>
      </label>
    </div>

    <div
      class="preview"
      :style="{ background: gradientCSS }"
    />

    <div class="output">
      <code>{{ gradientCSS }}</code>
      <button @click="copyToClipboard">
        Copy
      </button>
    </div>

  </div>
</template>

<style scoped>
.gradient-generator {
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

h2 {
  text-align: center;
  margin-bottom: 2rem;
}

.controls {
  background: #f5f5f5;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.color-inputs {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 1rem;
  font-weight: 500;
}

input[type='color'] {
  margin-left: 0.5rem;
  width: 50px;
  height: 30px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type='range'] {
  width: 100%;
  margin-top: 0.5rem;
}

select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
}

.preview {
  height: 200px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.output {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

code {
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  color: #333;
}

button {
  padding: 0.5rem 1rem;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

button:hover {
  background: #3aa876;
}
  </style>
---
::

## Advanced Options

You can customize the playground with various options:

- `editor=monaco` - Use Monaco editor (VS Code editor) instead of CodeMirror
- `theme=light` - Use light theme
- `layout=vertical` - Stack editor and preview vertically
- `preview=false` - Hide the preview pane
- `showCompileOutput=true` - Show compiled JavaScript output
- `showImportMap=true` - Show import map configuration

Example with Monaco editor:

::playground
---
editor: monaco
code: |

  <script setup lang="ts">
  import { ref } from 'vue'

  const message = ref<string>('Click for TypeScript support!')

  function showMessage() {
    message.value = 'Monaco provides full TypeScript support!'
  }
  </script>

  <template>
  <div class="monaco-example">
    <h3>Monaco Editor with IntelliSense</h3>
    <p>
      This playground uses Monaco editor which provides:
      - Autocomplete
      - Type checking
      - IntelliSense
      - Better syntax highlighting
    </p>
    <button @click="showMessage">
      {{ message }}
    </button>
  </div>
</template>

<style scoped>
.monaco-example {
  padding: 2rem;
  text-align: center;
}

button {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  background: #007acc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #005a9e;
}
  </style>
---
::

## Usage in Your Blog Posts

To add a Vue playground to your blog posts, use the MDC (Markdown Components) syntax:

```markdown
::playground
---
code: |
<template>

<!-- Your Vue template -->
</template>

  <script setup>
  // Your Vue script
  </script>

  <style>
  /* Your styles */
  </style>
---
::
```

### Available Options

You can customize the playground by adding options in the MDC frontmatter:

```markdown
::playground
---
editor: monaco       # 'codemirror' (default) or 'monaco'
theme: light # 'dark' (default) or 'light'
layout: vertical # 'horizontal' (default) or 'vertical'
showPreview: false # true (default) or false
showConsole: true # false (default) or true
code: |

  <!-- Your code here -->
---
::
```

## Benefits

1. **Official Vue Component** - Uses the same technology as play.vuejs.org
2. **Live Editing** - Changes are reflected instantly
3. **Full Vue 3 Support** - Composition API, `<script setup>`, and all Vue 3 features
4. **TypeScript Support** - With Monaco editor
5. **Lightweight Option** - CodeMirror editor for faster loading
6. **Customizable** - Themes, layouts, and display options

Start creating interactive Vue tutorials and documentation with live code examples!
