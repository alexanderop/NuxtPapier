# CLAUDE.md

Always use active voice and easy words
Only use comments when there is no other way to describe something

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Nuxt 3 application called "NuxtPapier" built with Vue 3 and TypeScript. The project uses:
The Goal of this Project is to create a minimalistic Blog Starter For developers

- **Nuxt 3.17.5** with compatibility version 4 and devtools enabled
- **Package Manager**: pnpm (specified version 9.9.0)
- **Content Management**: @nuxt/content for content-driven features
- **Styling**: UnoCSS for atomic CSS
- **Icons**: @nuxt/icon for icon management
- **Images**: @nuxt/image for optimized image handling
- **SEO**: @nuxtjs/seo for sitemap, robots.txt, and OG image generation
- **Linting**: ESLint with @antfu/eslint-config (formatters, UnoCSS, and Vue support)
- **Utilities**: @vueuse/nuxt for Vue composition utilities
- **Feed Generation**: feed package for RSS/Atom/JSON feeds
- **Search**: fuse.js for fuzzy search functionality

## Development Commands

**Install dependencies:**

```bash
pnpm install
```

**Development server:**

```bash
pnpm dev
# Runs on http://localhost:3000
```

**Build for production:**

```bash
pnpm build
```

**Preview production build:**

```bash
pnpm preview
```

**Generate static site:**

```bash
pnpm generate
```

**Lint and fix code:**

```bash
pnpm lint
```

**Type check:**

```bash
pnpm typecheck
```

**Clean content cache:**

```bash
pnpm clean:content
```

## Architecture Notes

- **Entry point**: `app.vue` contains the main application template with `NuxtRouteAnnouncer` and `NuxtWelcome`
- **Configuration**: `nuxt.config.ts` uses compatibility date 2025-05-15 and future compatibility version 4
- **Linting**: Uses Anthony Fu's ESLint config with Vue, UnoCSS, and formatters enabled
- **Server**: Has a dedicated server directory with its own TypeScript configuration
- **Static assets**: Public directory contains favicon and robots.txt
- **VueUse Auto-imports**: VueUse composables are auto-imported in Nuxt 3 and don't require explicit imports. Common functions like `useMagicKeys`, `useActiveElement`, `whenever`, `onKeyStroke`, and many others are available globally throughout the application. This is enabled by the `@vueuse/nuxt` module configured in `nuxt.config.ts`
- **TypeScript Types**: Project includes comprehensive type definitions in `types/content.ts` for blog posts, authors, images, and content queries
- **Component Structure**: Organized into atoms, molecules, content components, prose components, and OgImage templates

## Key Dependencies

- **@nuxt/content**: For content management and markdown processing
- **@nuxt/icon**: Unified icon framework
- **@nuxt/image**: Image optimization and processing
- **@nuxtjs/seo**: SEO optimization with sitemap and robots.txt
- **UnoCSS**: Atomic CSS engine with Wind v4 preset, OKLCH colors, typography, and web fonts (IBM Plex Sans/Mono)
- **Feed**: RSS/Atom/JSON feed generation
- **Fuse.js**: Fuzzy search for blog posts

## MCP Tools Available

This project has access to **Context7** - an MCP (Model Context Protocol) server that provides up-to-date documentation and code examples for libraries and frameworks. Context7 can be used to:

- Get current, version-specific documentation for any library used in this project
- Fetch real code examples and API references directly from source documentation
- Resolve library names to their proper Context7-compatible IDs
- Focus documentation retrieval on specific topics (e.g., "routing", "hooks", "components")

**Usage**: When working with libraries like Nuxt, Vue, UnoCSS, or any other dependencies, Context7 can provide the most current documentation and examples to ensure code implementations follow the latest best practices and API specifications.

## Content Management

This project uses **Nuxt Content v3** for markdown-driven content with custom enhancements:

### Content Hooks

The `content:file:afterParse` hook in `nuxt.config.ts` automatically processes markdown files with:

- **Date formatting**: Converts `date` field to human-readable `formattedDate`
- **Reading time**: Calculates estimated reading time (180 WPM)
- **Excerpt generation**: Auto-generates 200-character excerpt if not provided
- **Tags processing**: Converts comma-separated strings to arrays
- **Slug generation**: Creates URL slug from filename if not provided
- **Author defaults**: Adds site author info if not specified
- **Image processing**: Converts string images to object format
- **Timestamps**: Adds `createdAt` and `updatedAt` ISO timestamps
- **Status**: Sets default status to 'published'
- **Category slugs**: Generates URL-friendly category slugs

### Content Structure

- Blog posts should include frontmatter with `date`, `title`, and `description` fields
- Content is strongly typed with Zod schemas defined in `content.config.ts`
- Enhanced metadata fields available: tags, category, excerpt, status, image, author
- Formatted dates are automatically available as `formattedDate` property
- Content follows Bear Blog's minimal markdown styling approach
- See CONTENT_COMPONENTS.md for available content components

### Puppeteer MCP

This project has access to **Puppeteer** - an MCP (Model Context Protocol) server that provides browser automation capabilities for testing and quality assurance. Puppeteer can be used to:

- Navigate to web pages and take screenshots for visual testing
- Interact with web elements (click, fill forms, hover, etc.)
- Execute JavaScript in the browser context for dynamic testing
- Perform automated browser testing of the application
- Validate UI functionality and user interactions

**Usage**: When you need to test the application functionality, validate UI behavior, or capture screenshots for documentation, Puppeteer MCP provides comprehensive browser automation capabilities.

## Development Guidelines

### TypeScript Style Guide

This project follows strict TypeScript practices. For comprehensive TypeScript guidelines, conventions, and best practices specific to this Nuxt 3 + Vue 3 project, see @.claude/docs/TYPESCRIPT_GUIDE.md

Key highlights:

- Strict TypeScript configuration with no `any` types
- Proper typing for Vue 3 components, props, and emits
- Nuxt 3 specific patterns for server routes, plugins, and middleware
- ESLint integration with `@antfu/eslint-config`
- API response standardization and utility types

### Vue 3.5 Best Practices

This project leverages Vue 3.5's latest features and APIs. For modern Vue patterns and the preferred APIs introduced in Vue 3.5, see @.claude/docs/VUE_STYLE_GUIDE.md

Key highlights:

- Reactive Props Destructure with native default values
- `useTemplateRef()` for type-safe template refs
- `useId()` for SSR-safe unique identifiers
- `onWatcherCleanup()` for proper side effect cleanup
- Lazy hydration strategies for optimal SSR performance
- Modern composition patterns and best practices

### Theme Customization System

This project uses a flexible theming system with OKLCH colors and VueUse for dark mode management. For complete theming and UnoCSS guidance, see @.claude/docs/THEMING_GUIDE.md

Key highlights:

- Quick brand color customization with CSS custom properties
- Semantic color classes for consistent theming
- Automatic dark mode with VueUse integration
- UnoCSS shortcuts and best practices
- OKLCH color system for better accessibility

### Commit Message Convention

This project follows **Conventional Commits** specification for all commit messages. This provides a consistent way to document changes and enables automated changelog generation.

**Format**: `<type>(<scope>): <description>`

**Types**:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

**Examples**:

```
feat(content): migrate to Nuxt Content v3 API
fix(blog): correct post link routing
docs(readme): update installation instructions
chore(deps): update dependencies to latest versions
```

## Site Configuration

The site configuration is centralized in `utils/site.config.ts`. This file contains all site metadata including:

- Site name, title, and description
- URL (must be updated for production)
- Author information
- Social media links
- Logo and favicon paths
- Language settings
- Copyright text

The config is used throughout the application for:

- RSS/Atom/JSON feeds
- SEO meta tags
- Site header and footer
- Open Graph and Twitter cards

To customize the site, update the values in `utils/site.config.ts`.

## SEO Configuration

The site uses `@nuxtjs/seo` module with:

- **Sitemap**: Auto-generated with Nuxt Content pages integration
- **Robots.txt**: Configured with rules and sitemap location
- **OG Images**: Dynamic generation with Chromium renderer (1200x630)
- **Meta tags**: Automatically populated from site config

## Feed Generation

The site generates three feed formats at:

- `/rss.xml` - RSS 2.0 feed
- `/atom.xml` - Atom 1.0 feed
- `/feed.json` - JSON Feed 1.1

Feeds are generated server-side using the `feed` package and include all published blog posts.

## Keyboard Shortcuts System

The project includes a comprehensive keyboard shortcuts system:

### Global Shortcuts (via `useGlobalShortcuts`)

- `cmd+k` / `ctrl+k`: Open search
- `cmd+/` / `ctrl+/`: Show keyboard shortcuts help
- `cmd+shift+d` / `ctrl+shift+d`: Toggle dark mode
- `cmd+shift+t` / `ctrl+shift+t`: Open theme customizer

### Blog Shortcuts (via `useBlogShortcuts`)

- `j` / `k`: Navigate between posts
- `g h`: Go to home
- `g b`: Go to blog
- Additional shortcuts available on blog pages

### Implementation

- `defineShortcuts`: Core utility based on VueUse's `useMagicKeys`
- `useShortcutManager`: Manages registration/unregistration of shortcuts
- Shortcuts are context-aware and properly cleaned up

## Content Components

The project includes enhanced content components for rich blog posts:

- **Alert**: Info, warning, error, tip, success alerts
- **Badge**: Visual tags with variants and sizes
- **Details**: Collapsible accordion sections
- **Tabs**: Code examples in multiple languages/package managers
- **Video**: Lazy-loaded video embeds (YouTube/Vimeo)
- **TableOfContents**: Auto-generated from headings
- **RelatedPosts**: Show related blog posts

See CONTENT_COMPONENTS.md for detailed usage.

## Enhanced Prose Components

- **ProseCode**: Syntax highlighting with copy button
- **ProseImg**: Lazy loading with click-to-zoom
- **ProsePre**: Enhanced code blocks with filenames

## Project Composables

- **useEnhancedContent**: Advanced content querying with filters
- **useTheme**: Theme management and customization
- **useKbd**: Keyboard shortcut utilities
- **defineShortcuts**: Keyboard shortcut definitions
- **useShortcutManager**: Global shortcut management

## Workflow

Always plan first if something from vueUse when something is
related to vue can help you
Always use context7 and get up to date information on the libaries you want to use on how to use them
After you are done with a task always run lint and typecheck and fix the errors

## localhost:3000

you dont need to run localhost:3000 it will always run

## Additional Configuration

### UnoCSS Configuration

- Uses Wind v4 preset with class-based dark mode
- OKLCH color system with CSS variables for theming
- Semantic color classes and shortcuts defined
- IBM Plex Sans/Mono fonts configured
- Typography preset enabled

### Nitro Prerendering

The following routes are pre-rendered at build time:

- `/rss.xml`
- `/atom.xml`
- `/feed.json`
- `/feeds`

### Content Collection

Blog posts are defined as a collection in `content.config.ts` with:

- Zod schema validation
- SEO collection integration
- Type-safe frontmatter
