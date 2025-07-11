# Vue 3 Routes and Pages

The pages folder holds all your app's routes. Nuxt uses Vue Router and creates routes based on your file names and folder structure.

## Rules

**Check https://uvr.esm.is/llms.txt for latest info**
- Find updates on topics not covered here

**Never use index.vue files**
- ✅ `(home).vue`, `(blog-list).vue`
- ❌ `index.vue`
- Groups make routes clearer

**Use descriptive route parameters**
- ✅ `userId`, `postSlug`, `productId`
- ❌ `id`, `slug`, `item`

**Use dots for nested paths without folders**
- `users.edit.vue` → `/users/edit`
- Keeps file structure flat

**Use double brackets for optional params**
- `[[paramName]].vue` → param can be present or absent

**Add + for repeating parameters**
- `/posts.[[slug]]+.vue` → matches `/posts/some-post` and `/posts/some/post`

**Use definePage() for route config**
- Set meta, name, path, alias properties
- Type-safe route configuration

**Check typed-router.d.ts for route names**
- Find correct route names and parameters
- Auto-generated by Nuxt

**Navigate with named routes**
```typescript
// ✅ Good
router.push({ name: '/users/[userId]', params: { userId } })

// ❌ Bad
router.push('/users/' + userId)
```

**Pass route name to useRoute()**
```typescript
const route = useRoute('/users/[userId]')
// Better type checking than useRoute()
```

## Examples

### Basic File Structure
```
src/pages/
├── (home).vue         # Groups make routes clearer
├── about.vue
├── [...path].vue      # Catches all unknown routes
├── users.edit.vue     # Dots create paths without nesting
├── users.vue          # Layout for user routes
└── users/
    ├── (user-list).vue
    └── [userId].vue
```

### This Site's Structure
```
pages/
├── (home).vue              # Home page
├── [...path].vue           # Catches all content pages
├── animation-demo.vue      # Shows animations
├── blog/
│   ├── (blog-list).vue     # Lists all blog posts
│   └── [postSlug].vue      # Shows one blog post
├── design-system.vue       # Shows design components
├── design-system-preview.vue
├── design-system-contrast.vue
└── share-demo.vue          # Shows social sharing
```

**Improvements made:**
- Group names like `(home)` clarify purpose
- Clear params like `[postSlug]` beat generic `[slug]`
- Better catch-all `[...path]` instead of `[...slug]`

### Route Groups for Layouts

Groups create layouts without changing URLs:

```
src/pages/
├── (admin).vue      # Layout wraps all admin pages
├── (admin)/
│   ├── dashboard.vue  → /dashboard
│   └── settings.vue   → /settings
└── (user)/
    ├── profile.vue    → /profile
    └── order.vue      → /order
```

## Key Concepts

**File-based routing**
- File structure = URL structure
- Automatic route generation

**Dynamic segments**
- `[param]` → Required parameter
- `[[param]]` → Optional parameter
- `[...param]` → Catch-all route

**Route groups**
- `(name)` → Logical grouping
- No URL impact
- Shared layouts

**Nested routes**
- Parent file = layout wrapper
- Child files = nested views