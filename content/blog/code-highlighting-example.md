---
title: Code Highlighting Example
description: Testing Shiki line highlighting with left border
date: 2025-01-26
tags: ["code", "syntax-highlighting", "shiki", "tutorial", "markdown"]
---

# Code Highlighting Example

Here's an example of code with highlighted lines:

```js {2,4}
import { a } from './a.js'
import { b } from './b.js'

const result = a() + b() // 4
console.log(result)
```

You can highlight specific lines by adding `{2,4}` after the language identifier. This will highlight lines 2 and 4 with a special background and left border.

Multiple highlight syntaxes are supported:

```ts {1,3-5}
interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
}
```

The highlighted lines get a subtle background color and a colored left border to draw attention.
