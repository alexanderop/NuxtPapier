---
title: Advanced Code Syntax Highlighting
description: Demonstrating the enhanced syntax highlighting with line numbers, diff highlighting, and more
date: 2025-01-10
draft: false
---

This post demonstrates our advanced code syntax highlighting features including line numbers, diff highlighting, line highlighting, and a professional copy-to-clipboard functionality.

## JavaScript with Line Highlighting

Here's a modern JavaScript example with specific lines highlighted:

```javascript [utils.js] {3,7-9}
// Modern JavaScript with async/await
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    console.log('User data:', data)
    return data
  } catch (error) {
    console.error('Failed to fetch user:', error)
    throw error
  }
}

// Using the function
fetchUserData(123).then(user => {
  console.log(`Welcome, ${user.name}!`)
})
```

## Code Diff Example

Here's an example showing code changes with diff highlighting:

```typescript [user.service.ts]
interface User {
  id: number
  name: string
  email: string
  roles: string[]
}

class UserService {
  private users: Map<number, User> = new Map()

  addUser(user: User): void {
    console.log('Adding user...') // [!code --]
    console.log(`Adding user: ${user.name}`) // [!code ++]
    this.users.set(user.id, user)
  }

  getUser(id: number): User | undefined {
    return this.users.get(id) // [!code highlight]
  }
}
```

## TypeScript with Filename

TypeScript example with interfaces and generics:

```typescript
interface User {
  id: number
  name: string
  email: string
  roles: string[]
}

class UserService<T extends User> {
  private users: Map<number, T> = new Map()

  addUser(user: T): void {
    this.users.set(user.id, user)
  }

  getUser(id: number): T | undefined {
    return this.users.get(id)
  }

  getUsersByRole(role: string): T[] {
    return Array.from(this.users.values())
      .filter(user => user.roles.includes(role))
  }
}
```

## Vue 3 Component

A complete Vue 3 component with Composition API:

```vue
<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface Todo {
  id: number
  text: string
  completed: boolean
}

const todos = ref<Todo[]>([])
const newTodo = ref('')

const completedCount = computed(() => 
  todos.value.filter(todo => todo.completed).length
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

const toggleTodo = (id: number) => {
  const todo = todos.value.find(t => t.id === id)
  if (todo) {
    todo.completed = !todo.completed
  }
}
</script>

<template>
  <div class="todo-app">
    <h1>Todo List ({{ completedCount }}/{{ todos.length }})</h1>
    
    <form @submit.prevent="addTodo">
      <input 
        v-model="newTodo"
        placeholder="Add a new todo..."
        class="todo-input"
      >
    </form>
    
    <ul class="todo-list">
      <li 
        v-for="todo in todos" 
        :key="todo.id"
        @click="toggleTodo(todo.id)"
        :class="{ completed: todo.completed }"
      >
        {{ todo.text }}
      </li>
    </ul>
  </div>
</template>
```

## CSS with Modern Features

Modern CSS with custom properties and grid:

```css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #10b981;
  --background: #ffffff;
  --text-color: #1f2937;
  --border-radius: 0.5rem;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
}

.card {
  background: var(--background);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #1f2937;
    --text-color: #f3f4f6;
  }
}
```

## Python Example

A Python class with type hints:

```python
from typing import List, Optional, Dict
from dataclasses import dataclass
from datetime import datetime

@dataclass
class Article:
    """Represents a blog article with metadata."""
    title: str
    content: str
    author: str
    published_at: datetime
    tags: List[str]
    views: int = 0
    
    def increment_views(self) -> None:
        """Increment the view count for this article."""
        self.views += 1
    
    def add_tag(self, tag: str) -> None:
        """Add a new tag if it doesn't already exist."""
        if tag not in self.tags:
            self.tags.append(tag)
    
    def to_dict(self) -> Dict[str, any]:
        """Convert the article to a dictionary."""
        return {
            'title': self.title,
            'content': self.content,
            'author': self.author,
            'published_at': self.published_at.isoformat(),
            'tags': self.tags,
            'views': self.views
        }
```

## Bash Script

A useful bash script example:

```bash
#!/bin/bash

# Script to backup a directory with timestamp
BACKUP_DIR="/backup"
SOURCE_DIR="/var/www/html"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="backup_${TIMESTAMP}.tar.gz"

# Create backup directory if it doesn't exist
if [ ! -d "$BACKUP_DIR" ]; then
    mkdir -p "$BACKUP_DIR"
    echo "Created backup directory: $BACKUP_DIR"
fi

# Create the backup
echo "Starting backup of $SOURCE_DIR..."
tar -czf "${BACKUP_DIR}/${BACKUP_NAME}" "$SOURCE_DIR"

# Check if backup was successful
if [ $? -eq 0 ]; then
    echo "✅ Backup completed: ${BACKUP_DIR}/${BACKUP_NAME}"
    
    # Remove backups older than 7 days
    find "$BACKUP_DIR" -name "backup_*.tar.gz" -mtime +7 -delete
    echo "🧹 Cleaned up old backups"
else
    echo "❌ Backup failed!"
    exit 1
fi
```

## JSON Configuration

A sample configuration file:

```json
{
  "name": "nuxt-papier",
  "version": "1.0.0",
  "description": "A modern blog built with Nuxt 3",
  "scripts": {
    "dev": "nuxt dev",
    "build": "nuxt build",
    "preview": "nuxt preview",
    "generate": "nuxt generate"
  },
  "dependencies": {
    "@nuxt/content": "^2.10.0",
    "@nuxt/image": "^1.1.0",
    "nuxt": "^3.9.0"
  },
  "devDependencies": {
    "@unocss/nuxt": "^0.58.0",
    "typescript": "^5.3.3"
  }
}
```

## YAML Example

Docker Compose configuration:

```yaml
version: '3.8'

services:
  web:
    build: 
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      DATABASE_URL: postgresql://user:pass@db:5432/myapp
    depends_on:
      - db
      - redis
    volumes:
      - ./app:/usr/src/app
      - node_modules:/usr/src/app/node_modules

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
  node_modules:
```

## Inline Code

Don't forget that `inline code` also gets styled nicely. You can use it for short snippets like `const x = 42` or command examples like `npm run dev`.

## Conclusion

The syntax highlighting feature supports many popular programming languages and includes a convenient copy button for each code block. The highlighting works seamlessly with both light and dark themes, providing an excellent reading experience for technical content.