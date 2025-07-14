# Contributing to NuxtPapier

Thank you for your interest in contributing to NuxtPapier! This document provides guidelines and instructions for contributing.

## Commit Message Convention

This project enforces the [Conventional Commits](https://www.conventionalcommits.org/) specification. This leads to more readable messages that are easy to follow when looking through the project history and enables automatic generation of the changelog.

### Commit Message Format

Each commit message consists of a **header**, a **body**, and a **footer**. The header has a special format that includes a **type**, a **scope**, and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

### Type

Must be one of the following:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to our CI configuration files and scripts
- **chore**: Other changes that don't modify src or test files
- **revert**: Reverts a previous commit

### Examples

```bash
feat: add blog post search functionality
fix: correct RSS feed generation for posts with special characters
docs: update README with new configuration options
style: format components with prettier
refactor: simplify blog post fetching logic
perf: optimize image loading with lazy loading
test: add tests for dark mode toggle
build: update nuxt to version 3.17.5
ci: add commit linting to GitHub Actions
chore: update dependencies
```

### Breaking Changes

Breaking changes should be indicated by adding `BREAKING CHANGE:` in the footer:

```bash
feat: change blog post URL structure

BREAKING CHANGE: Blog posts now use /articles/ instead of /blog/ in URLs
```

## Making Commits

### Option 1: Using Commitizen (Recommended)

We've set up Commitizen to help you write proper commit messages:

```bash
pnpm commit
# or
npm run commit
```

This will start an interactive prompt that guides you through creating a properly formatted commit message.

### Option 2: Manual Commits

If you prefer to write commits manually, make sure they follow the conventional format. The commit will be automatically validated by Commitlint.

```bash
git commit -m "feat: add new blog layout"
```

## Commit Validation

- **Local**: Husky will run Commitlint on every commit to ensure it follows the convention
- **CI**: GitHub Actions will validate all commits in pull requests

If your commit doesn't follow the convention, it will be rejected with an error message explaining what needs to be fixed.

## Pull Request Process

1. Fork the repository and create your branch from `main`
2. Make your changes following the code style guidelines in CLAUDE.md
3. Commit your changes using the conventional format
4. Push to your fork and submit a pull request
5. Ensure all CI checks pass

## Getting Help

If you have questions about contributing, feel free to:
- Open an issue for discussion
- Check existing issues and pull requests
- Review the codebase documentation in CLAUDE.md

Thank you for contributing! 🎉