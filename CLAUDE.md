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
- **Linting**: ESLint with @antfu/eslint-config (formatters, UnoCSS, and Vue support)
- **Utilities**: @vueuse/nuxt for Vue composition utilities

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

## Architecture Notes

- **Entry point**: `app.vue` contains the main application template with `NuxtRouteAnnouncer` and `NuxtWelcome`
- **Configuration**: `nuxt.config.ts` uses compatibility date 2025-05-15 and future compatibility version 4
- **Linting**: Uses Anthony Fu's ESLint config with Vue, UnoCSS, and formatters enabled
- **Server**: Has a dedicated server directory with its own TypeScript configuration
- **Static assets**: Public directory contains favicon and robots.txt
- **VueUse Auto-imports**: VueUse composables are auto-imported in Nuxt 3 and don't require explicit imports. Common functions like `useMagicKeys`, `useActiveElement`, `whenever`, `onKeyStroke`, and many others are available globally throughout the application. This is enabled by the `@vueuse/nuxt` module configured in `nuxt.config.ts`

## Key Dependencies

- **@nuxt/content**: For content management and markdown processing
- **@nuxt/icon**: Unified icon framework
- **@nuxt/image**: Image optimization and processing
- **UnoCSS**: Atomic CSS engine with Nuxt integration

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

- **Date formatting** is handled automatically via `content:file:afterParse` hook in `nuxt.config.ts`
- **Custom properties** are added to content files during build time
- **No client-side date formatting** needed - all formatting happens at build time

### Content Structure

- Blog posts should include frontmatter with `date`, `title`, and `description` fields
- Formatted dates are automatically available as `formattedDate` property
- Content follows Bear Blog's minimal markdown styling approach

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

## Workflow

Always plan first if something from vueUse when something is
related to vue can help you
Always use context7 and get up to date information on the libaries you want to use on how to use them
After you are done with a task always run lint and typecheck and fix the errors

## localhost:3000

you dont need to run localhost:3000 it will always run
