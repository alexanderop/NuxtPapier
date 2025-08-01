Here's a more concise and structured rewrite of your `CLAUDE.md`:

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

### Playwright MCP
Enables Claude to:
* Navigate/interact with pages
* Capture screenshots
* Inspect/manipulate DOM
* Monitor network
* Generate tests
* Manage multiple tabs
* **IMPORTANT**: Never execute the Playwright MCP server yourself, only do it when specifically asked

### ast-grep
Use ast-grep for efficient code searching with structural patterns:

**Common patterns:**
```bash
# Find all ref declarations
ast-grep --pattern 'const $VAR = ref($$$)' --lang ts

# Find defineNuxtConfig
ast-grep --pattern 'defineNuxtConfig($_)' --lang ts

# Find computed properties
ast-grep --pattern 'const $VAR = computed(() => $$$)' --lang ts

# Find composables usage
ast-grep --pattern 'use$NAME($$$)' --lang ts

# Find component imports
ast-grep --pattern 'import { $$ } from "@/components/$$$"' --lang ts

# Find specific function calls
ast-grep --pattern '$OBJ.map($FUNC)' --lang ts

# Find async/await patterns
ast-grep --pattern 'await $PROMISE' --lang ts

# Find error handling patterns
ast-grep --pattern 'try { $$$ } catch' --lang ts

# Find route definitions
ast-grep --pattern 'definePageMeta({ $$$ })' --lang ts
```

**Supported languages:** ts, js, tsx, jsx, css, html, json, yaml

---

## Code Style

* **Imports**: Relative for locals, named preferred
* **Naming** (strictly enforced by ESLint `@typescript-eslint/naming-convention`):

  * **Variables**: 
    * camelCase by default
    * UPPER_SNAKE_CASE for exported/global constants
    * Boolean-named variables must start with `is`, `has`, `can`, `should`, `will`, `did`, `was`, `are`, `were`
      * Exceptions: `loading`, `enabled`, `disabled`, `open`, `closed`, `visible`, `hidden`, `active`, `menuOpen`
  * **Functions**: 
    * strictCamelCase enforced
    * Should start with verbs: `get`, `set`, `fetch`, `load`, `save`, `delete`, `update`, `create`, `handle`, `process`, `validate`, etc.
    * Event handlers must start with `on` or `handle`
    * Composables must start with `use`
  * **Types**: 
    * StrictPascalCase for all type-like constructs (classes, interfaces, types, enums)
    * Interfaces can optionally start with `I`
    * Type parameters: PascalCase with optional `T` prefix (single letters allowed)
    * Enum members: UPPER_CASE
  * **Parameters**: 
    * strictCamelCase required
    * Unused parameters must have underscore prefix `_`
  * **Properties**: 
    * strictCamelCase for object properties and methods
    * Private/protected class members must have underscore prefix `_`
    * Properties with special characters (CSS properties, @context, baseURL, etc.): no restrictions
  * **Imports**: camelCase or PascalCase allowed
* **Avoid**: `any`, `let`, `else`
* **Variables**: Use descriptive names (`searchQuery`, `userProfile`)
* **Comments**: Only for complex logic—favor self-explanatory code
* **Conditional Logic**: Always extract complex conditions to descriptive variables for readability
  * Avoid: `if (a == b && c === z)`
  * Prefer: `const isValidCondition = a == b && c === z; if (isValidCondition) { ... }`

---

## Architecture & Patterns

### Content

* Uses `@nuxt/content v3`
* Markdown files in `/content`
* Collections: `pages`, `posts`
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
* Blog posts: `/posts/[postSlug]`
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

## Error Handling

Use standard JavaScript error handling patterns:

```typescript
// ✅ Good - Use try/catch for async operations
try {
  const response = await fetch('/api/users')
  const users = await response.json()
  // Process users
} catch (error) {
  console.error('Failed to fetch users:', error)
  // Handle error appropriately
}

// ✅ Good - Check for null/undefined
const element = document.getElementById('my-element')
if (!element) {
  // Handle missing element
  return
}

// ✅ Good - Use optional chaining and nullish coalescing
const value = data?.nested?.property ?? 'default'
```

---

## Development Notes

* Use standard try/catch for error handling
* Never use any if you have to use unknown instead

---

## Common Tasks

### Add Blog Post

1. Add `.md` file to `/content/posts/`
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

## Additional Development Notes

* Don't run `pnpm run dev` to test something yourself only do it if I will tell you to do it

---

# Nuxt Content 3 — Cheat Sheet

*A developer‑focused quick reference covering composables, filters, and the REST `_content` endpoint.*

---

## 🗂️ Collections 101

| Concept        | Notes                                                        |
| -------------- | ------------------------------------------------------------ |
| `content/`     | Root directory Nuxt Content scans.                           |
| **Collection** | Declared in `content.config.ts` → key (e.g. `docs`, `blog`). |
| **Path**       | Auto‑generated route from file location.                     |
| **Fields**     | Front‑matter or virtual (`title`, `date`, …).                |
| **Built‑ins**  | `_draft`, `_partial`, `path`, `layout`, `extension`.         |

---

## 🔍 Query Utilities

### 1 · `queryCollection()`

```ts
const posts = await queryCollection('blog')
  .where('published', '=', true)
  .order('date', 'DESC')
  .limit(10)
  .all()
```

| Chain                              | Purpose                |
| ---------------------------------- | ---------------------- |
| `.path(str)`                       | Match by route.        |
| `.select(...f)`                    | Project fields.        |
| `.where(f, op, v?)`                | Filter rows.           |
| `.andWhere(cb)` / `.orWhere(cb)`   | Grouped boolean logic. |
| `.order(f, 'ASC'\|'DESC')`         | Sort.                  |
| `.limit(n)` / `.skip(n)`           | Pagination.            |
| `.all()` / `.first()` / `.count()` | Execute.               |

#### **Operators (`SQLOperator`)**

Supported comparison strings for `where()`:

```
'='   '<>'  '>'  '<'  'IN'  'BETWEEN'  'NOT BETWEEN'
'IS NULL'  'IS NOT NULL'  'LIKE'  'NOT LIKE'
```

Example — *draft filtering & "starts‑with" search using `LIKE`*

```ts
queryCollection('docs')
  .where('_draft', 'IS NULL')           // exclude drafts
  .where('title', 'LIKE', 'Nuxt%')      // titles starting with "Nuxt"
  .all()
```

### 2 · `queryCollectionNavigation()`

```ts
const nav = await queryCollectionNavigation('docs', ['badge'])
  .where('draft', '=', false)
  .order('title', 'ASC')
```

Returns a tree of `ContentNavigationItem` objects (reads `.navigation.yml`).

### 3 · `queryCollectionItemSurroundings()`

```ts
const [prev, next] = await queryCollectionItemSurroundings('docs', '/guide/setup')
```

### 4 · `queryCollectionSearchSections()`

```ts
const sections = await queryCollectionSearchSections('docs', {
  ignoredTags: ['code']
})
```

---

## 🧭 Navigation Helpers (`@nuxt/content/utils`)

| Helper                                       | Returns               |
| -------------------------------------------- | --------------------- |
| `findPageHeadline(nav, path)`                | Parent folder title.  |
| `findPageBreadcrumb(nav, path, { current })` | Breadcrumb array.     |
| `findPageChildren(nav, path)`                | Direct children.      |
| `findPageSiblings(nav, path)`                | Items sharing parent. |

---

## 🌐 Server‑Side / Nitro Pattern

```ts
export default eventHandler(async (event) => {
  return queryCollection(event, 'docs')
    .where('draft', '=', false)
    .all()
})
```

> Add `server/tsconfig.json` extending `.nuxt/tsconfig.server.json` for full types.

---

## 🛰️  REST `_content` Endpoint

Nuxt exposes the same query engine via an HTTP API (handy for CLI tests or external integrations).

**Route** `POST /api/_content/query`

**Request body (JSON)**

```json
{
  "collection": "docs",
  "where": [["published", "=", true]],
  "order": [["date", "DESC"]],
  "limit": 5,
  "debug": true
}
```

Flags:

* `debug: true` → response includes the generated SQLite SQL + params.
* `only` / `without` arrays let you project fields (mirrors `.select()`).

**cURL example**

```bash
curl -X POST http://localhost:3000/api/_content/query \
     -H "Content-Type: application/json" \
     -d '{"collection":"docs","where":[["title","LIKE","Nuxt%"]],"limit":3,"debug":true}'
```

You can also send a `GET` request with query‑string helpers but POST gives a cleaner payload for complex filters.

---

## ⚡ Tips

* **Deterministic cache key**: Use a static string in `useAsyncData()`.
* **Type‑safety everywhere**: Field names are `keyof Collections[T]`.
* **Virtual fields** like `_partial` and `_draft` are filterable.
* **Auto‑imported**: All composables work without manual `import`.

---

### Version

Applies to **Nuxt Content 3.x** (released 2025‑01‑08). Earlier versions differ dramatically.
