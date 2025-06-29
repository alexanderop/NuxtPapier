---
title: "Interactive Vue Playground: Code Examples That Come Alive"
description: "Discover how to use the Vue Playground component to create interactive, editable code examples in your blog posts. Perfect for tutorials and documentation."
date: "2025-01-27"
tags: ["vue", "components", "interactive", "playground", "mdc"]
category: "Development"
image: "/images/vue-playground-showcase.jpg"
---

# Interactive Vue Playground: Code Examples That Come Alive

Static code blocks are useful, but interactive playgrounds take learning to the next level. The Vue Playground component lets you embed fully functional Vue environments directly in your content, allowing readers to experiment with code in real-time.

## Basic Usage

The simplest way to use the Vue Playground is to pass a code prop with your Vue component:

::VuePlayground
---
code: |
  <template>
    <div class="demo">
      <h2>{{ title }}</h2>
      <p>Counter: {{ count }}</p>
      <button @click="increment">Click me!</button>
    </div>
  </template>

  <script setup>
  import { ref } from 'vue'

  const title = ref('My First Vue App')
  const count = ref(0)

  const increment = () => {
    count.value++
  }
  </script>

  <style scoped>
  .demo {
    padding: 2rem;
    text-align: center;
    font-family: system-ui, sans-serif;
  }

  button {
    background: #42b883;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 1rem;
  }

  button:hover {
    background: #369870;
  }
  </style>
---
::

Try modifying the code above! Change the title, add new reactive variables, or experiment with different Vue 3 features.

## Multiple Files Example

For more complex examples, you can work with multiple files:

::VuePlayground
---
files:
  App.vue: |
    <template>
      <div class="app">
        <TodoApp />
      </div>
    </template>

    <script setup>
    import TodoApp from './TodoApp.vue'
    </script>

    <style>
    .app {
      max-width: 400px;
      margin: 0 auto;
      padding: 2rem;
    }
    </style>

  TodoApp.vue: |
    <template>
      <div class="todo-app">
        <h1>Vue Todo App</h1>
        
        <form @submit.prevent="addTodo">
          <input
            v-model="newTodo"
            placeholder="Add a new todo..."
            class="todo-input"
          >
          <button type="submit" :disabled="!newTodo.trim()">
            Add
          </button>
        </form>

        <ul class="todo-list">
          <li
            v-for="todo in todos"
            :key="todo.id"
            :class="{ completed: todo.completed }"
            class="todo-item"
          >
            <input
              type="checkbox"
              v-model="todo.completed"
            >
            <span>{{ todo.text }}</span>
            <button @click="removeTodo(todo.id)" class="remove-btn">
              ×
            </button>
          </li>
        </ul>

        <p class="stats">
          {{ remaining }} of {{ todos.length }} remaining
        </p>
      </div>
    </template>

    <script setup>
    import { ref, computed } from 'vue'

    const newTodo = ref('')
    const todos = ref([
      { id: 1, text: 'Learn Vue 3', completed: false },
      { id: 2, text: 'Build something awesome', completed: false }
    ])

    const remaining = computed(() => 
      todos.value.filter(todo => !todo.completed).length
    )

    const addTodo = () => {
      if (newTodo.value.trim()) {
        todos.value.push({
          id: Date.now(),
          text: newTodo.value,
          completed: false
        })
        newTodo.value = ''
      }
    }

    const removeTodo = (id) => {
      todos.value = todos.value.filter(todo => todo.id !== id)
    }
    </script>

    <style scoped>
    .todo-app {
      font-family: system-ui, sans-serif;
    }

    .todo-input {
      width: 70%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    button {
      background: #42b883;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      margin-left: 0.5rem;
    }

    button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    .todo-list {
      list-style: none;
      padding: 0;
      margin: 1rem 0;
    }

    .todo-item {
      display: flex;
      align-items: center;
      padding: 0.5rem;
      border-bottom: 1px solid #eee;
    }

    .todo-item.completed span {
      text-decoration: line-through;
      opacity: 0.6;
    }

    .todo-item input[type="checkbox"] {
      margin-right: 0.5rem;
    }

    .todo-item span {
      flex: 1;
    }

    .remove-btn {
      background: #e74c3c;
      color: white;
      border: none;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      cursor: pointer;
      font-size: 16px;
      line-height: 1;
    }

    .stats {
      color: #666;
      font-size: 0.9rem;
      margin-top: 1rem;
    }
    </style>
layout: vertical
---
::

This todo app demonstrates component composition, reactive state management, and computed properties. Try adding new features like filtering or editing existing todos!

## Composition API Showcase

Here's an example highlighting Vue 3's Composition API with custom composables:

::VuePlayground
---
files:
  App.vue: |
    <template>
      <div class="demo">
        <h2>Mouse Tracker</h2>
        <p>Mouse Position: {{ x }}, {{ y }}</p>
        
        <h2>Counter with History</h2>
        <div class="counter-section">
          <button @click="decrement">-</button>
          <span class="count">{{ count }}</span>
          <button @click="increment">+</button>
        </div>
        
        <div class="history">
          <h3>History:</h3>
          <button @click="undo" :disabled="!canUndo">Undo</button>
          <button @click="redo" :disabled="!canRedo">Redo</button>
          <ul>
            <li v-for="(value, index) in history" :key="index">
              {{ value }}
            </li>
          </ul>
        </div>
      </div>
    </template>

    <script setup>
    import { useMouse } from './composables/useMouse.js'
    import { useCounter } from './composables/useCounter.js'

    // Mouse tracking
    const { x, y } = useMouse()

    // Counter with undo/redo
    const { 
      count, 
      increment, 
      decrement, 
      history, 
      undo, 
      redo, 
      canUndo, 
      canRedo 
    } = useCounter()
    </script>

    <style scoped>
    .demo {
      padding: 2rem;
      font-family: system-ui, sans-serif;
    }

    .counter-section {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin: 1rem 0;
    }

    .count {
      font-size: 2rem;
      font-weight: bold;
      min-width: 3rem;
      text-align: center;
    }

    button {
      background: #42b883;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
    }

    button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    .history {
      margin-top: 2rem;
      padding: 1rem;
      background: #f5f5f5;
      border-radius: 4px;
    }

    .history ul {
      max-height: 100px;
      overflow-y: auto;
      margin: 1rem 0;
    }
    </style>

  composables/useMouse.js: |
    import { ref, onMounted, onUnmounted } from 'vue'

    export function useMouse() {
      const x = ref(0)
      const y = ref(0)

      function update(event) {
        x.value = event.pageX
        y.value = event.pageY
      }

      onMounted(() => {
        window.addEventListener('mousemove', update)
      })

      onUnmounted(() => {
        window.removeEventListener('mousemove', update)
      })

      return { x, y }
    }

  composables/useCounter.js: |
    import { ref, computed } from 'vue'

    export function useCounter(initialValue = 0) {
      const count = ref(initialValue)
      const history = ref([initialValue])
      const currentIndex = ref(0)

      const canUndo = computed(() => currentIndex.value > 0)
      const canRedo = computed(() => currentIndex.value < history.value.length - 1)

      function addToHistory(value) {
        // Remove any future history if we're not at the end
        history.value = history.value.slice(0, currentIndex.value + 1)
        history.value.push(value)
        currentIndex.value = history.value.length - 1
      }

      function increment() {
        count.value++
        addToHistory(count.value)
      }

      function decrement() {
        count.value--
        addToHistory(count.value)
      }

      function undo() {
        if (canUndo.value) {
          currentIndex.value--
          count.value = history.value[currentIndex.value]
        }
      }

      function redo() {
        if (canRedo.value) {
          currentIndex.value++
          count.value = history.value[currentIndex.value]
        }
      }

      return {
        count,
        increment,
        decrement,
        history,
        undo,
        redo,
        canUndo,
        canRedo
      }
    }
layout: horizontal
---
::

This example shows how to create reusable composables and demonstrates Vue 3's powerful reactivity system.

## Advanced Animation Example

Let's explore Vue transitions and animations:

::VuePlayground
---
code: |
  <template>
    <div class="animation-demo">
      <h2>Vue Animations & Transitions</h2>
      
      <div class="controls">
        <button @click="show = !show">
          {{ show ? 'Hide' : 'Show' }} Box
        </button>
        <button @click="addItem">Add Item</button>
      </div>
      
      <Transition name="fade">
        <div v-if="show" class="box">
          I'm animated!
        </div>
      </Transition>
      
      <TransitionGroup name="list" tag="ul" class="list">
        <li
          v-for="item in items"
          :key="item.id"
          class="list-item"
          @click="removeItem(item.id)"
        >
          {{ item.text }}
          <span class="remove-hint">(click to remove)</span>
        </li>
      </TransitionGroup>
    </div>
  </template>

  <script setup>
  import { ref } from 'vue'

  const show = ref(true)
  const items = ref([
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' },
    { id: 3, text: 'Item 3' }
  ])

  let nextId = 4

  const addItem = () => {
    items.value.push({
      id: nextId++,
      text: `Item ${nextId - 1}`
    })
  }

  const removeItem = (id) => {
    items.value = items.value.filter(item => item.id !== id)
  }
  </script>

  <style scoped>
  .animation-demo {
    padding: 2rem;
    font-family: system-ui, sans-serif;
  }

  .controls {
    margin-bottom: 2rem;
  }

  .controls button {
    background: #42b883;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 1rem;
  }

  .box {
    width: 200px;
    height: 100px;
    background: linear-gradient(45deg, #42b883, #35495e);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    border-radius: 8px;
    margin: 2rem 0;
    font-weight: bold;
  }

  /* Fade transition */
  .fade-enter-active, .fade-leave-active {
    transition: all 0.5s ease;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
    transform: translateY(-30px);
  }

  /* List transitions */
  .list {
    list-style: none;
    padding: 0;
    margin: 2rem 0;
  }

  .list-item {
    background: #f0f0f0;
    padding: 1rem;
    margin: 0.5rem 0;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .list-item:hover {
    background: #e0e0e0;
  }

  .remove-hint {
    font-size: 0.8rem;
    color: #666;
    margin-left: 1rem;
  }

  .list-enter-active, .list-leave-active {
    transition: all 0.5s ease;
  }
  .list-enter-from, .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
  .list-move {
    transition: transform 0.5s ease;
  }
  </style>
layout: horizontal
---
::

Try adding and removing items to see the smooth list transitions in action!

## Configuration Options

The Vue Playground component supports various configuration options:

- **`code`**: Single file Vue component code
- **`files`**: Multiple file setup for complex examples
- **`layout`**: `"horizontal"` (default) or `"vertical"` split
- **`editor`**: `"codemirror"` (default) or `"monaco"`
- **`theme`**: `"dark"` (default) or `"light"`
- **`preview`**: Show/hide preview pane (default: `true`)
- **`ssr`**: Enable server-side rendering mode
- **`clearConsole`**: Clear console on each run
- **`showCompileOutput`**: Show compilation output
- **`showImportMap`**: Show import map editor

## Tips for Great Playground Examples

1. **Keep it focused**: Each playground should demonstrate one concept clearly
2. **Add helpful comments**: Guide readers through complex code
3. **Use realistic examples**: Show practical use cases, not just "hello world"
4. **Style your examples**: Make them visually appealing
5. **Encourage experimentation**: Add comments suggesting modifications

The Vue Playground transforms static documentation into interactive learning experiences. Your readers can experiment, learn, and understand concepts by doing rather than just reading.

Ready to make your content more engaging? Start adding interactive playgrounds to your blog posts and watch your readers dive deeper into the code! 