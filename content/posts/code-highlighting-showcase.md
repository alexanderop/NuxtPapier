---
title: Code Highlighting Showcase
description: A comprehensive showcase of all code highlighting features including line numbers, diff highlighting, and more
date: 2025-01-10
draft: false
---

This post showcases all the advanced code highlighting features available in this blog.

## Line Highlighting

You can highlight specific lines by adding line numbers in curly braces:

```javascript [app.js] {2,4-6}
// Example with line highlighting
const greeting = 'Hello, World!' // This line is highlighted
console.log(greeting)
const users = ['Alice', 'Bob', 'Charlie'] // These lines
users.forEach(user => {                    // are also
  console.log(`Hello, ${user}!`)           // highlighted
})
```

## Inline Code Highlighting

You can also highlight lines using inline comments:

```typescript [types.ts]
interface BlogPost {
  title: string
  content: string
  author: string // [!code highlight]
  publishedAt: Date
  tags: string[]
}
```

## Code Diffs

Show additions and removals in your code:

```vue [Button.vue]
<template>
  <button 
    class="btn"
    :class="variant" // [!code --]
    :class="[variant, size]" // [!code ++]
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  variant?: string
  size?: string // [!code ++]
}>()

function handleClick() {
  console.log('Button clicked') // [!code --]
  emit('click') // [!code ++]
}

const emit = defineEmits<{ // [!code ++]
  click: [] // [!code ++]
}>() // [!code ++]
</script>
```

## Combined Features

You can combine multiple features in a single code block:

```javascript [utils/api.js] {7-10}
async function fetchData(endpoint) {
  const baseURL = 'https://api.example.com' // [!code --]
  const baseURL = process.env.API_URL || 'https://api.example.com' // [!code ++]
  
  try {
    const response = await fetch(`${baseURL}${endpoint}`)
    
    if (!response.ok) { // [!code highlight]
      throw new Error(`HTTP ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Fetch failed:', error)
    throw error
  }
}
```

## Various Languages

### Python

```python [data_processor.py]
import pandas as pd
import numpy as np

def process_data(file_path: str) -> pd.DataFrame:
    """Process CSV data and return cleaned DataFrame."""
    df = pd.read_csv(file_path)
    
    # Remove duplicates
    df = df.drop_duplicates() # [!code highlight]
    
    # Handle missing values
    df['age'].fillna(df['age'].mean(), inplace=True)
    
    return df
```

### CSS with SCSS

```scss [styles/components.scss] {5-8}
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  &-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-text);
  }
}
```

### Bash Scripts

```bash [deploy.sh]
#!/bin/bash

# Build the project
echo "Building project..." # [!code highlight]
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed" # [!code ++]
    echo "Build completed" # [!code --]
else
    echo "❌ Build failed"
    exit 1
fi
```

## Features Summary

- **Line Numbers**: Automatically displayed for all code blocks
- **Filename Display**: Show the filename with `[filename.ext]` syntax
- **Line Highlighting**: Use `{1,3-5}` to highlight specific lines
- **Inline Highlighting**: Use `// [!code highlight]` comment
- **Diff Highlighting**: Show additions with `// [!code ++]` and removals with `// [!code --]`
- **Copy Button**: Every code block has a copy-to-clipboard button
- **Syntax Highlighting**: Powered by Shiki with GitHub themes
- **Dark Mode Support**: Automatic theme switching
- **Responsive Design**: Code blocks scroll horizontally on small screens

All these features work together to create a professional code reading experience!