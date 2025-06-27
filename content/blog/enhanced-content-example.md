---
title: "Enhanced Content Components in NuxtPapier"
description: "Learn how to use the new content components and enhanced metadata features in your blog posts"
date: "2025-01-27"
tags: ["nuxt", "content", "components", "tutorial"]
category: "Development"
image:
  src: "/images/enhanced-content-banner.jpg"
  alt: "NuxtPapier enhanced content components showcase"
author:
  name: "NuxtPapier Team"
  url: "https://github.com/nuxtpapier"
excerpt: "Discover the powerful content components now available in NuxtPapier, including alerts, code groups, videos, and more."
status: "published"
---

# Enhanced Content Components in NuxtPapier

This post demonstrates all the new content components and enhanced features available in NuxtPapier. These components make your content more interactive and engaging while maintaining the minimal design philosophy.

## Alert Components

Use alerts to highlight important information:

::alert{type="info"}
This is an informational alert. Use it for general tips and information.
::

::alert{type="warning" title="Important Note"}
Warning alerts grab attention for important notices. You can also add custom titles!
::

::alert{type="success"}
Success alerts are perfect for positive messages and confirmations.
::

::alert{type="error"}
Error alerts help communicate problems or critical issues.
::

::alert{type="tip" icon=true}
Pro tip: All alert types support optional icons and custom titles!
::

## Code Groups

Show code examples in multiple languages or frameworks:

::tabs{:labels='["npm", "yarn", "pnpm"]'}

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

::

## Enhanced Code Blocks

Code blocks now include copy buttons and language indicators:

```typescript
// TypeScript code with syntax highlighting
interface User {
  id: number
  name: string
  email: string
}

function greetUser(user: User): string {
  return `Hello, ${user.name}!`
}
```

## Collapsible Details

Use details components for FAQ sections or optional content:

::details{title="What is NuxtPapier?"}
NuxtPapier is a minimal blog starter built with Nuxt 3, inspired by Bear Blog's clean design philosophy. It focuses on content, speed, and simplicity.
::

::details{title="How do I customize the theme?" open=true}
You can customize the theme by modifying the CSS custom properties in `assets/css/theme.css`. Change the `--brand-hue` variable to instantly update your brand colors!
::

## Badges

Add visual tags and labels to your content:

Check out these features: ::badge{variant="primary"}New:: ::badge{variant="success" size="sm"}Stable:: ::badge{variant="info" icon="i-ph-rocket"}Fast::

Status indicators: ::badge{variant="warning"}Beta:: ::badge{variant="error"}Deprecated::

## Video Embeds

Embed videos with lazy loading support:

::video{src="https://www.youtube.com/watch?v=dQw4w9WgXcQ" title="Example Video" caption="Videos are lazy-loaded for better performance"}
::

## Table of Contents

For longer articles, use the Table of Contents component. It can be placed inline or as a floating sidebar (see the component in action on the right side of this page on desktop).

## Images with Zoom

Images now support click-to-zoom functionality. Try clicking the image below:

![Example landscape photo with zoom capability](/images/example-landscape.jpg)

## Metadata Enhancements

This post demonstrates the enhanced metadata schema:

- **Tags**: Multiple tags for better categorization
- **Category**: Posts can belong to categories
- **Author**: Rich author information with optional avatar and bio
- **Featured Image**: Structured image data with alt text
- **Excerpt**: Custom or auto-generated excerpts
- **Reading Time**: Automatically calculated (this post: ~3 min)
- **Status**: Draft, published, or archived states

## Using Components in Markdown

All these components can be used directly in your markdown files using the `::component-name` syntax. They integrate seamlessly with your content while maintaining the clean, minimal aesthetic of NuxtPapier.

## Next Steps

1. Explore the component source code in `/components/content/`
2. Customize the styles to match your brand
3. Create your own custom components
4. Check the TypeScript definitions in `/types/content.ts`

Happy blogging with NuxtPapier! 🚀
