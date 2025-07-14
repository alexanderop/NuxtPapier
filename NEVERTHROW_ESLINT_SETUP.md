# ESLint Plugin Neverthrow Setup

## Overview

This document describes the attempt to integrate `eslint-plugin-neverthrow` into the NuxtPapier project and the current status.

## What Was Done

1. **Installation**: Successfully installed `eslint-plugin-neverthrow` and `@typescript-eslint/parser`
2. **Configuration Attempts**: Tried multiple configuration approaches for ESLint flat config
3. **Compatibility Testing**: Discovered compatibility issues with ESLint 9 flat config

## Current Status

⚠️ **eslint-plugin-neverthrow has compatibility issues with ESLint 9 flat config**

The plugin currently cannot be used with the project's ESLint setup due to:
- Issues with TypeScript parser configuration in flat config format
- The plugin expects legacy ESLint configuration format
- Error: "types not available, maybe you need set the parser to @typescript-eslint/parser"

## Alternative Approach

Since the plugin cannot be used currently, the project includes manual guidance:

### Manual neverthrow Result Handling Guidelines

When using neverthrow in this project, ensure all Result types are handled properly:

1. **Always check results**: Use `.isOk()` or `.isErr()` to check the result
2. **Handle results explicitly**: Use `.match()`, `.map()`, `.mapErr()`, or `.andThen()` 
3. **Never ignore Results**: Don't call neverthrow functions without handling the returned Result

### Examples

```typescript
// ✅ Good - Properly handle Result
const result = await fromPromise(fetchData(), error => error as Error)
if (result.isOk()) {
  // Handle success
  const data = result.value
} else {
  // Handle error
  console.error(result.error)
}

// ✅ Good - Use Result methods
const processedResult = result
  .map(data => processData(data))
  .mapErr(error => new ProcessingError(error))

// ❌ Bad - Ignoring Result
fromPromise(fetchData(), error => error as Error) // No handling!
```

## Current Project neverthrow Usage

The project already uses neverthrow successfully in several places:

- `composables/useKeyboardShortcuts.ts`: Using `fromPromise`
- `composables/useTableOfContents.ts`: Using `fromThrowable` 
- `composables/useStaggeredAnimation.ts`: Using `fromThrowable`

These files should be manually reviewed to ensure proper Result handling.

## Future Plans

When `eslint-plugin-neverthrow` adds full ESLint 9 flat config support:

1. Re-install the plugin: `pnpm add -D eslint-plugin-neverthrow`
2. Add to `eslint.config.js`:
   ```javascript
   {
     files: ['**/*.ts', '**/*.tsx'],
     plugins: {
       'neverthrow': neverthrowPlugin,
     },
     rules: {
       'neverthrow/must-use-result': 'error',
     },
   }
   ```

## Resources

- [eslint-plugin-neverthrow GitHub](https://github.com/mdbetancourt/eslint-plugin-neverthrow)
- [neverthrow Documentation](https://github.com/supermacro/neverthrow)
- [ESLint 9 Flat Config Documentation](https://eslint.org/docs/latest/use/configure/configuration-files) 