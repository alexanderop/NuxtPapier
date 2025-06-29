---
title: "Setting Up a Blog with Nuxt Content"
description: "A practical guide to creating a content-driven blog using Nuxt 3 and Nuxt Content module."
date: "2024-01-25"
tags: ["nuxt", "nuxt-content", "tutorial", "markdown", "blog"]
---

Creating a blog with Nuxt 3 and the Content module is surprisingly straightforward. Here's how I built this very blog you're reading.

## Why Nuxt Content?

Nuxt Content turns your markdown files into a powerful CMS. Benefits include:

- **File-based** - Write in markdown, manage with Git
- **No database** - Content lives in your repository
- **Full-text search** - Built-in search capabilities
- **Syntax highlighting** - Code blocks look great out of the box
- **Vue components** - Use Vue components inside markdown

## Installation

First, add the Content module to your Nuxt project:

```bash
npm install @nuxt/content
```

Then add it to your `nuxt.config.ts`:

```javascript
export default defineNuxtConfig({
  modules: [
    '@nuxt/content'
  ]
})
```

## Project Structure

Here's how I organized the content:

```
content/
  blog/
    welcome-to-nuxtpapier.md
    minimal-web-design.md
    nuxt-content-setup.md
```

## Frontmatter

Each markdown file starts with frontmatter containing metadata:

```yaml
---
title: Your Post Title
description: A brief description for SEO and previews
date: 2024-01-25
---
```

## Pages Setup

Create these pages to handle your blog:

### Home Page (`pages/index.vue`)

Shows recent posts and site intro.

### Blog Index (`pages/blog/index.vue`)

Lists all blog posts.

### Dynamic Post Page (`pages/blog/[...slug].vue`)

Renders individual blog posts.

## Key Components

The most important part is using Content components:

```vue
<!-- List posts -->
<ContentList path="/blog" v-slot="{ list }">
  <div v-for="article in list" :key="article._path">
    <h3>{{ article.title }}</h3>
    <p>{{ article.description }}</p>
  </div>
</ContentList>

<!-- Render content -->
<ContentRenderer :value="data" />
```

## Styling Content

Content gets wrapped in `.prose` class automatically, making it easy to style:

```css
.prose h1 {
  font-size: 2rem;
}
.prose p {
  margin-bottom: 1rem;
}
.prose code {
  background: #f5f5f5;
}
```

## Development Workflow

My writing workflow is simple:

1. Create a new `.md` file in `content/blog/`
2. Write in markdown with frontmatter
3. Save and see changes instantly in dev mode
4. Commit to Git when ready to publish

## Advanced Features

Nuxt Content offers many advanced features:

- **Search** - Full-text search across all content
- **Navigation** - Auto-generated navigation from content
- **Components** - Use Vue components in markdown
- **Transformers** - Custom content processing

## Conclusion

Nuxt Content strikes the perfect balance between simplicity and power. You get the ease of markdown with the flexibility of Vue.js.

The result? A fast, maintainable blog that's a joy to write for and pleasant to read.
