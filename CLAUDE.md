# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Nuxt 3 application called "NuxtPapier" built with Vue 3 and TypeScript. The project uses:

- **Nuxt 3.17.5** with compatibility version 4 and devtools enabled
- **Package Manager**: pnpm (specified version 9.9.0)
- **Content Management**: @nuxt/content for content-driven features
- **Styling**: UnoCSS for atomic CSS
- **Icons**: @nuxt/icon for icon management
- **Images**: @nuxt/image for optimized image handling
- **Linting**: ESLint with @antfu/eslint-config (formatters, UnoCSS, and Vue support)

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

## Development Guidelines

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
