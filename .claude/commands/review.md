# Review Last Commit

Analyze the last commit for potential bugs and style guide violations based on the CLAUDE.md files.

## Steps

1. Run `git log -1 --pretty=format:"%H %an <%ae>%n%s%n%b"` to get the last commit details
2. Run `git diff HEAD~1 HEAD --name-only` to get the list of changed files
3. Run `git show HEAD` to see the actual changes in the last commit
4. Read all CLAUDE.md files to understand the project's style guidelines:
   - `/CLAUDE.md` for general project guidelines
   - `/components/CLAUDE.md` for Vue component rules
   - `/composables/CLAUDE.md` for composable patterns
5. Analyze each changed file for:
   
   **Style Guide Violations:**
   - Use of `else` statements (should be avoided)
   - Use of `try/catch` blocks (prefer Result patterns)
   - Use of `any` type in TypeScript
   - Use of `let` instead of `const`
   - Console statements left in code
   - Component naming (should start with `Base`)
   - Composable naming (should start with `use`)
   - Missing error state in async composables
   - Wrong section order in Vue files (should be script → template → style)
   - Use of `withDefaults()` in Vue components
   
   **Potential Bugs:**
   - Loose equality checks (`==` or `!=` instead of `===` or `!==`)
   - Array length comparisons without explicit 0 check
   - Using `async` with `forEach` (doesn't work as expected)
   - Empty array `.includes()` checks
   - Missing null/undefined checks
   - Unhandled promise rejections

6. Generate a detailed report showing:
   - Files reviewed
   - Style violations found (with line numbers if possible)
   - Potential bugs detected
   - Suggestions for improvement
   - Overall code quality assessment

Remember: Focus on the specific guidelines defined in the CLAUDE.md files. Be constructive and provide actionable feedback.