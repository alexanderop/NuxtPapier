# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Nuxt 3 application called "NuxtPapier" built with Vue 3 and TypeScript. The project uses:

- **Nuxt 3.17.5** with compatibility version 4 and devtools enabled
- **Package Manager**: pnpm (specified version 9.9.0)
- **Content Management**: @nuxt/content for content-driven features
- **Styling**: UnoCSS for atomic CSS with dark mode support
- **Icons**: @nuxt/icon for icon management
- **Images**: @nuxt/image for optimized image handling
- **Linting**: ESLint with @antfu/eslint-config (formatters, UnoCSS, and Vue support)
- **Dark Mode**: @nuxtjs/color-mode for theme management

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

### Color System and Styling Guidelines

**IMPORTANT: Always use OKLCH color format for all color definitions in this project.**

- **Never use hex colors** (#222, #f2f2f2, etc.) - convert them to OKLCH format
- **OKLCH provides better perceptual uniformity** and color manipulation capabilities
- **Examples**:
  - `#222` → `oklch(0.25 0.00 0)`
  - `#f2f2f2` → `oklch(0.96 0.00 0)`
  - `#ddd` → `oklch(0.85 0.00 0)`

**UnoCSS Best Practices:**

- **Use UnoCSS shortcuts** defined in `uno.config.ts` instead of inline styles or scoped CSS
- **Define reusable shortcuts** for common patterns (e.g., `article-title`, `nav-link`)
- **Leverage Wind4 preset** with proper dark mode support using `dark:` variants
- **Organize shortcuts** by category: layout, typography, components, etc.

### Component Architecture

This project follows **Atomic Design** principles for component organization:

- **Atoms** (`components/atoms/`): Basic building blocks - buttons, inputs, labels
  - Naming: `Atom[ComponentName].vue` (e.g., `AtomButton.vue`, `AtomDarkModeToggle.vue`)
- **Molecules** (`components/molecules/`): Groups of atoms - form fields, cards, navigation items
  - Naming: `Molecule[ComponentName].vue` (e.g., `MoleculeSearchBar.vue`)
- **Organisms** (`components/organisms/`): Complex UI sections - headers, sidebars, forms
  - Naming: `Organism[ComponentName].vue` (e.g., `OrganismHeader.vue`)
- **Templates** (`components/templates/`): Page layouts
  - Naming: `Template[LayoutName].vue` (e.g., `TemplateBlog.vue`)
- **Pages** (`pages/`): Actual pages/routes
  - Naming: Follow Nuxt conventions

### Dark Mode Implementation

The project uses a class-based dark mode system:

- **UnoCSS**: Configured with `dark: 'class'` for class-based dark mode
- **Color Mode Module**: Handles theme persistence and system preference detection
- **Usage**: Use `dark:` prefix for dark mode styles (e.g., `dark:bg-gray-800`)
- **Shortcuts**: Use predefined shortcuts like `bg-base`, `text-base`, `border-base` for automatic dark mode support

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
