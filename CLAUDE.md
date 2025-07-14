Here’s a more concise and structured rewrite of your `CLAUDE.md`:

---

# CLAUDE.md

Guidance for Claude Code (claude.ai/code) when working with this repo.

---

## Project Overview

**NuxtPapier** is a minimal, SEO-friendly Nuxt 3 blog theme focused on content, performance, accessibility, and developer experience.

---

## Development

```bash
pnpm dev         # Start dev server
pnpm build       # Build for production
pnpm generate    # Generate static site
pnpm preview     # Preview production build
pnpm lint        # Run ESLint with auto-fix
pnpm typecheck   # TypeScript type checking
```

---

## Tools

**Playwright MCP** enables Claude to:

* Navigate/interact with pages
* Capture screenshots
* Inspect/manipulate DOM
* Monitor network
* Generate tests
* Manage multiple tabs

---

## Code Style

* **Imports**: Relative for locals, named preferred
* **Naming**:

  * camelCase → vars/functions
  * PascalCase → classes/components
  * UPPER\_SNAKE\_CASE → constants
  * Booleans start with `is` / `has` / `can`
  * Functions: verbNoun (`fetchUserData`)
* **Avoid**: `any`, `let`, `else`, `try/catch` (use neverthrow instead)
* **Variables**: Use descriptive names (`searchQuery`, `userProfile`)
* **Comments**: Only for complex logic—favor self-explanatory code

---

## Architecture & Patterns

### Content

* Uses `@nuxt/content v3`
* Markdown files in `/content`
* Collections: `pages`, `blog`
* Reading time auto-calculated
* Drafts via `published: false`
* Config: `content.config.ts`

### Components

* Located in `/components/`, prefixed with `Base`
* `<script setup lang="ts">`, reactive prop destructuring
* Use TypeScript generics, no `withDefaults()`
* Order: script → template → style
* Styled with UnoCSS only

### Composables

* Prefixed with `use`
* Single-responsibility
* Expose error state
* Return readonly state when needed
* Fully typed

---

## VueUse Style Guide

* Import APIs from `vue`
* Prefer `ref`, use `shallowRef` for large objects
* Accept refs/computed/functions as args
* Use `tryOnUnmounted` for cleanup
* Return `isSupported`, `PromiseLike`, `controls` when relevant
* Allow config options (e.g. `flush`, `immediate`)

---

## Routing

* File-based routing
* Catch-all: `pages/[...path].vue`
* Homepage: `pages/(home).vue`
* Blog posts: `/blog/[postSlug]`
* Custom 404 supported

---

## Styling

* UnoCSS + Wind4 preset
* Typography plugin for prose
* Theming via CSS variables (light/dark)
* Config: `uno.config.ts`

---

## Server Features

* RSS: `/server/routes/rss.xml.ts`
* Sitemap: `/server/routes/sitemap.xml.ts`
* Robots: `/server/routes/robots.txt.ts`
* APIs: `/server/api/`

---

## Key Files

* `app.config.ts`: Site metadata
* `nuxt.config.ts`: Nuxt modules/config
* `uno.config.ts`: CSS config
* `content.config.ts`: Content parsing rules
* `constants.ts`: Constants (social links, etc.)
* `types/index.d.ts`: Shared types

---

## Error Handling with Neverthrow

Use `neverthrow` for functional error handling instead of `try/catch`:

```typescript
// ✅ Good - Use neverthrow
const result = await fromPromise(
  fetch('/api/users'),
  (error) => new Error(`Failed to fetch users: ${error.message}`)
)

if (result.isErr()) {
  console.error(result.error)
  return
}

const users = result.value

// ✅ Good - Chain operations
const processedResult = result
  .map(response => response.json())
  .map(users => users.filter(user => user.active))

// ❌ Bad - Use try/catch
try {
  const response = await fetch('/api/users')
  const users = await response.json()
} catch (error) {
  console.error(error)
}
```

**Auto-imported from neverthrow:**
- `ok`, `err` - Create Results
- `okAsync`, `errAsync` - Create ResultAsync
- `fromPromise`, `fromThrowable` - Wrap operations
- `Result`, `ResultAsync` - Types (type-only imports)
- `isOk`, `isErr` - Type guards

---

## Common Tasks

### Add Blog Post

1. Add `.md` file to `/content/blog/`
2. Include frontmatter: `title`, `description`, `date`, `published`
3. Optional: `tags`, `image`

### Create Component

1. Add file to `/components/` with `Base` prefix
2. Follow rules in `components/CLAUDE.md`

### Add SEO

1. Use `useEnhancedSeoMeta()` and `useStructuredData()`
2. Update `app.config.ts` if global

### Modify Styling

1. Edit variables in `uno.config.ts`
2. Use UnoCSS in components

---
