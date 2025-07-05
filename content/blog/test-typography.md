---
title: Typography Test - All Markdown Elements
description: A comprehensive test of all typography and markdown elements to showcase the prose styling
date: 2025-01-05
draft: false
---

# Heading Level 1

This is a paragraph with **bold text** and _italic text_. We can also have **_bold italic text_** for extra emphasis. Here's some `inline code` to show how it looks.

## Heading Level 2

Let's test a link: [Visit the Nuxt documentation](https://nuxt.com) to learn more about this amazing framework.

### Heading Level 3

Here's a blockquote to test quote styling:

> "The best way to predict the future is to invent it." - Alan Kay
>
> This is a multi-line blockquote that continues here with more inspirational content about technology and innovation.

#### Heading Level 4

Now let's test an unordered list:

- First item with some text
- Second item with **bold emphasis**
- Third item with `inline code`
  - Nested item one
  - Nested item two
    - Deeply nested item
- Fourth item back at root level

##### Heading Level 5

And here's an ordered list:

1. First step in the process
2. Second step with _italics_
3. Third step with a [link](https://example.com)
   1. Sub-step one
   2. Sub-step two
4. Final step

###### Heading Level 6

This is the smallest heading level. Below is a horizontal rule:

---

## Code Blocks

Here's a JavaScript code block with syntax highlighting:

```javascript
// A simple Vue 3 component
export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const count = ref(0)
    const increment = () => count.value++

    return {
      count,
      increment
    }
  }
})
```

And here's some CSS:

```css
.prose {
  --uno-prose-body: var(--prose-body);
  --uno-prose-headings: var(--prose-headings);
  max-width: 65ch;
  margin: 0 auto;
}
```

## Tables

Let's test table rendering:

| Feature      | Description             | Status      |
| ------------ | ----------------------- | ----------- |
| Typography   | Beautiful prose styling | ✅ Complete |
| Dark Mode    | Full theme support      | ✅ Complete |
| Responsive   | Mobile-friendly         | ✅ Complete |
| Customizable | Easy to modify          | ✅ Complete |

## Images

Here's how images look in prose (using a placeholder):

![A beautiful landscape](https://picsum.photos/800/400)

## Mixed Content

Let's combine multiple elements to see how they work together:

1. **Bold text** in a list with `inline code`
2. A list item with a [link to Nuxt](https://nuxt.com)
3. Another item with _emphasis_

> A blockquote that contains `inline code` and a [link](https://example.com).

Here's a paragraph after the blockquote with some **bold text**, _italic text_, and `inline code`. We can also have longer inline code snippets like `const result = await fetch('/api/data')` to see how they wrap.

### Task List (if supported)

- [x] Install typography preset
- [x] Configure UnoCSS
- [x] Add custom styling
- [ ] Write more content
- [ ] Test in production

## Conclusion

This document tests all major markdown elements to ensure our prose styling is working correctly. The typography should be clean, readable, and beautiful in both light and dark modes.
