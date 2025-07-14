# CLAUDE.md
This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
## Project Overview

NuxtPapier is a minimal, responsive, and SEO-friendly Nuxt 3 blog theme built with modern web technologies. It's a content-driven blog platform with a focus on performance, accessibility, and developer experience.

## Development Commands

```bash
# Development
pnpm dev              # Start dev server on http://localhost:3000

# Build & Deploy
pnpm build           # Build for production
pnpm generate        # Generate static site
pnpm preview         # Preview production build

# Code Quality - Run these after making changes
pnpm lint            # Run ESLint with auto-fix
pnpm typecheck       # TypeScript type checking
```

## Available Tools

### Playwright MCP
Claude has access to Playwright MCP (Model Context Protocol) for browser automation and testing. This enables:
- Browser navigation and interaction
- Screenshot capture
- Page element inspection and manipulation
- Network request monitoring
- Automated testing generation
- Multi-tab management

## Architecture & Key Patterns

## Code Style

- **Imports**: Use relative imports for local modules, named imports preferred
- **Naming**: camelCase for variables/functions, PascalCase for classes/namespaces
- **Error handling**: Use Result patterns, avoid throwing exceptions in tools

## IMPORTANT

- Try to keep things in one function unless composable or reusable
- DO NOT use `else` statements unless necessary
- DO NOT use `try`/`catch` if it can be avoided
- AVOID `try`/`catch` where possible
- AVOID `else` statements
- AVOID using `any` type
- AVOID `let` statements
- PREFER single word variable names where possible
- **Code Comments**:
  - Only save comments when they are really necessary
  - Try to write readable code by using descriptive variables instead of comments

### Content Management
- Uses @nuxt/content v3 with strongly-typed collections: `pages` and `blog`
- Content stored in `/content` directory as Markdown files
- Automatic reading time calculation for blog posts
- Draft post support via `published` field in frontmatter
- The collection definition for nuxt content is under @content.config.ts 


### Component Development Rules
Components follow strict conventions (see components/CLAUDE.md):
- Prefix with `Base` (e.g., `BaseButton`, `BaseHeader`)
- Use `<script setup lang="ts">` with reactive prop destructuring (Vue 3.5+)
- Define props using generic syntax without `withDefaults()`
- Order: script → template → style
- Style exclusively with UnoCSS utility classes

### Composable Development Rules
Composables follow specific patterns (see composables/CLAUDE.md):
- Prefix with `use` (e.g., `useCounter`, `useSeo`)
- Single responsibility principle
- Always expose error state
- Return readonly state when appropriate
- TypeScript-first approach with comprehensive typing

### Routing & Pages
- File-based routing with dynamic catch-all route at `pages/[...path].vue`
- Blog posts at `/blog/[postSlug]`
- Homepage at `pages/(home).vue`
- Custom 404 handling

### Styling
- UnoCSS with Wind4 preset for utility-first CSS
- Typography plugin for prose styling
- CSS variables for theming (light/dark mode)
- Theme colors defined in `uno.config.ts`

### Server-Side Features
- RSS feed generation at `/server/routes/rss.xml.ts`
- Sitemap at `/server/routes/sitemap.xml.ts`
- Robots.txt at `/server/routes/robots.txt.ts`
- API endpoints in `/server/api/`

## Key Files & Their Purposes

- `app.config.ts` - Runtime configuration (site metadata, social links)
- `nuxt.config.ts` - Build-time configuration and module setup
- `uno.config.ts` - UnoCSS configuration and theme
- `content.config.ts` - Content parsing configuration (reading time, etc.)
- `constants.ts` - Application constants (social links, etc.)
- `types/index.d.ts` - TypeScript type definitions

## Common Tasks

### Adding a New Blog Post
1. Create a new `.md` file in `/content/blog/`
2. Include required frontmatter: title, description, date, published
3. Optional: tags, image, readingTime (auto-calculated)

### Creating a New Component
1. Create file in `/components/` with `Base` prefix
2. Follow component structure rules from components/CLAUDE.md
3. Use TypeScript and UnoCSS utilities

### Adding SEO Meta Tags
1. Use `useEnhancedSeoMeta()` composable in pages
2. Structured data via `useStructuredData()` for articles/breadcrumbs
3. Update `app.config.ts` for site-wide metadata

### Modifying Theme/Styling
1. Edit CSS variables in `uno.config.ts`
2. Use UnoCSS utilities in components
3. Dark mode automatically handled via color-mode module
