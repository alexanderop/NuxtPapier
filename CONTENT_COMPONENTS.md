# Content Components Guide

This guide explains how to use the enhanced content components in NuxtPapier for creating rich, interactive blog posts.

## Table of Contents

- [Alert Component](#alert-component)
- [Code Group Component](#code-group-component)
- [Details/Accordion Component](#detailsaccordion-component)
- [Badge Component](#badge-component)
- [Video Component](#video-component)
- [Table of Contents](#table-of-contents-1)
- [Enhanced Prose Components](#enhanced-prose-components)
- [Enhanced Metadata](#enhanced-metadata)

## Alert Component

Use alerts to highlight important information in your content.

### Syntax

```markdown
::alert{type="info"}
Your alert content here
::
```

### Types

- `info` - General information (blue)
- `warning` - Important notices (amber)
- `error` - Critical issues (red)
- `tip` - Helpful tips (green)
- `success` - Success messages (green)

### Options

- `type` - Alert type (default: "info")
- `title` - Optional title
- `icon` - Show/hide icon (default: true)

### Examples

```markdown
::alert{type="info"}
This is an informational alert.
::

::alert{type="warning" title="Important"}
This is a warning with a custom title.
::

::alert{type="tip" icon=false}
A tip without an icon.
::
```

## Code Tabs Component

Display code examples in multiple languages or package managers.

### Syntax

````markdown
::tabs{:labels='["npm", "yarn", "pnpm"]'}

```bash
npm install package
npm run dev
```

```bash
yarn add package
yarn dev
```

```bash
pnpm add package
pnpm dev
```

::
````

### Options

- `labels` - Array of tab labels (required)

### Examples

**Package Managers:**

````markdown
::tabs{:labels='["npm", "yarn", "pnpm", "bun"]'}

```bash
npm install nuxtpapier
npm run dev
```

```bash
yarn add nuxtpapier
yarn dev
```

```bash
pnpm add nuxtpapier
pnpm dev
```

```bash
bun add nuxtpapier
bun dev
```

::
````

**Different Languages:**

````markdown
::tabs{:labels='["JavaScript", "TypeScript", "Python"]'}

```javascript
const greeting = "Hello World"
console.log(greeting)
```

```typescript
const greeting: string = "Hello World"
console.log(greeting)
```

```python
greeting = "Hello World"
print(greeting)
```

::
````

The component automatically displays each code block as a separate tab. The number of code blocks should match the number of labels.

## Details/Accordion Component

Create collapsible content sections.

### Syntax

```markdown
::details{title="Click to expand"}
Hidden content goes here
::
```

### Options

- `title` - The clickable title
- `open` - Whether initially open (default: false)

### Example

```markdown
::details{title="What is NuxtPapier?" open=true}
NuxtPapier is a minimal blog starter built with Nuxt 3.
::
```

## Badge Component

Add visual tags and labels.

### Syntax

```markdown
::badge{variant="primary"}New Feature::
```

### Variants

- `default` - Gray badge
- `primary` - Brand color
- `success` - Green
- `warning` - Yellow
- `error` - Red
- `info` - Blue

### Sizes

- `sm` - Small
- `md` - Medium (default)
- `lg` - Large

### Example

```markdown
Status: ::badge{variant="success" size="sm"}Active:: ::badge{variant="warning"}Beta::
```

## Video Component

Embed videos with lazy loading.

### Syntax

```markdown
::video{src="https://youtube.com/watch?v=VIDEO_ID" title="Video Title"}
::
```

### Options

- `src` - Video URL (YouTube/Vimeo)
- `title` - Video title
- `caption` - Optional caption
- `poster` - Thumbnail image URL
- `aspectRatio` - Aspect ratio (default: "16/9")
- `provider` - "youtube", "vimeo", or "custom"

### Example

```markdown
::video{
src="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
title="Example Video"
caption="This video demonstrates the feature"
aspectRatio="16/9"
}
::
```

## Table of Contents

The Table of Contents is automatically generated from your headings.

### Usage

The TOC appears automatically on blog posts with 3+ headings. It's displayed as:

- A floating sidebar on desktop (right side)
- Can be manually added anywhere using the component

### Manual Usage

```vue
<TableOfContents :toc="page.toc" :floating="false" />
```

## Enhanced Prose Components

### ProseCode

Code blocks automatically get:

- Syntax highlighting
- Copy button
- Language indicator

### ProseImg

Images automatically get:

- Lazy loading
- Click-to-zoom functionality
- Caption support

### ProsePre

Code blocks with:

- Filename display
- Enhanced copy functionality
- Better styling

## Enhanced Metadata

### Frontmatter Options

```yaml
---
title: Your Post Title
description: Post description
date: 2025-01-27
tags: [tag1, tag2, tag3]
category: Development
excerpt: Custom excerpt for previews
status: published # draft, published, archived
image:
  src: /path/to/image.jpg
  alt: Image description
  caption: Optional caption
author:
  name: Author Name
  url: 'https://author-website.com'
---
```

### Auto-generated Fields

These fields are automatically added:

- `formattedDate` - Human-readable date
- `readingTime` - Estimated reading time
- `slug` - URL slug from filename
- `createdAt` - ISO timestamp
- `updatedAt` - ISO timestamp
- `categorySlug` - URL-friendly category

## Best Practices

1. **Use semantic components** - Choose the right component for your content
2. **Keep it minimal** - Don't overuse components; maintain readability
3. **Test responsiveness** - Ensure components work on all devices
4. **Optimize images** - Use appropriate image formats and sizes
5. **Write accessible content** - Use proper headings and alt text

## Examples

See the example posts for comprehensive demonstrations:

- `/content/blog/enhanced-content-example.md` - All content components
