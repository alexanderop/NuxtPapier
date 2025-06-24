# TypeScript Style Guide (Concise)

> **Goal :** keep every TS file easy to read, refactor and review.

## Requirements

- TypeScript ≥ v5
- `typescript-eslint` ≥ v8 (`strict-type-checked`)
- Prettier + import‑sorting plugin

## TL;DR

| Rule                 | Bad                        | Good                                           |          |
| -------------------- | -------------------------- | ---------------------------------------------- | -------- |
| Narrow types         | `const users = new Map();` | `const users = new Map<string, number>();`     |          |
| Immutable data       | `arr.push(3);`             | `const arr = [...arr, 3];`                     |          |
| Discriminated unions | many `?` props             | union of 3 variants                            |          |
| No `any`             | `let x: any`               | `let x: unknown; if (typeof x === 'string') …` |          |
| Pure functions       | mutate arg                 | return new value                               |          |
| Named export         | `export default foo`       | `export const foo = …`                         |          |
| Replace enums        | `enum Role {…}`            | \`type Role = 'admin'                          | 'user'\` |

---

## 1 Types

### 1.1 Inference & Narrowing

```ts
// ❌ BAD – wide types, hidden `any`
const employees = new Map()

// ✅ GOOD – explicit generic keeps keys & values strict
const employees = new Map<string, number>()
```

### 1.2 Immutability

```ts
// ❌ BAD – mutates input
users.splice(0, 1)

// ✅ GOOD – returns new array, accepts ReadonlyArray
const removeFirstUser = (users: ReadonlyArray<User>) => users.slice(1)
```

### 1.3 Required vs Optional

```ts
// ❌ BAD – everything optional
interface User { id?: number, name?: string, email?: string }

// ✅ GOOD – three concrete shapes
interface Guest { kind: 'guest', tempToken: string }
interface Admin { kind: 'admin', id: number, email: string }
 type User = Guest | Admin
```

### 1.4 Type‑Safe Constants

```ts
// ❌ BAD – mutable + invalid member
const ROLES = ['admin', 'owner']

// ✅ GOOD – readonly & validated
const ROLES = ['admin', 'editor'] as const satisfies ReadonlyArray<UserRole>
```

### 1.5 Template Literal Types

```ts
// ❌ BAD – any string allowed
type Version = string

// ✅ GOOD – pattern enforced
type Version = `v${number}.${number}.${number}`
```

### 1.6 Banned Types & Assertions

```ts
// ❌ BAD – hides errors
const data: any = fetchJson()

// ✅ GOOD – use unknown + guard
const data: unknown = fetchJson()
if (!Array.isArray(data))
  throw new Error('expected array')
```

### 1.7 Type Definitions

```ts
// ❌ BAD – interface for union
interface Status { loading: true } // impossible

// ✅ GOOD – type alias everywhere
export type Status = 'idle' | 'loading' | 'error'
```

### 1.8 Array Syntax

```ts
// ❌ BAD
const ids: string[] = []

// ✅ GOOD
const ids: Array<string> = []
```

---

## 2 Functions

```ts
// ❌ BAD – many positional args + side‑effects
function send(to, subj, body, saveDraft = false) {
  db.save(body) // side‑effect
}

// ✅ GOOD – one object arg, pure
function sendEmail({ to, subject, body }: {
  to: string
  subject: string
  body: string
}) {
  return mailLib.send({ to, subject, body })
}
```

- Explicit return types on all **exported** functions; let TS infer inside modules.

---

## 3 Variables & Constants

```ts
// ❌ BAD – enum adds runtime weight
enum Color { Red = '#c00', Blue = '#00c' }

// ✅ GOOD – literal union & const object
export const COLOR = { red: '#c00', blue: '#00c' } as const
export type Color = typeof COLOR[keyof typeof COLOR]
```

---

## 4 Naming Rules

```ts
// variables & functions – camelCase
let averagePrice

// booleans – is/has prefix
const isLoaded = true

// constants – UPPER_SNAKE
const MAX_TIMEOUT_MS = 5_000

// types & generics – PascalCase, T‑prefix
type ProductId = string
function wrap<TValue>(value: TValue) {
  return { value }
}
```

---

## 6 Comments

Prefer code that explains itself; when needed, comment **why**, never **what**.

```ts
// ✅ GOOD – rationale provided
// Business wants UTC, do not localise
const createdAtUtc = toUtc(now())
```

---
