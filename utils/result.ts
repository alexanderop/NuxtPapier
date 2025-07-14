/**
 * Result type for functional error handling - represents either a successful value or an error.
 * This is similar to Rust's Result type, providing a type-safe way to handle operations that might fail.
 *
 * @template T The type of the successful value
 * @template E The type of the error (defaults to Error)
 *
 * @example
 * ```typescript
 * const success: Result<string, Error> = { ok: true, value: "Hello" }
 * const failure: Result<string, Error> = { ok: false, error: new Error("Failed") }
 * ```
 */
export type Result<T, E = Error>
  = | { ok: true, value: T }
    | { ok: false, error: E }

/**
 * Type guard to check if a Result represents a successful value.
 *
 * @template T The type of the successful value
 * @template E The type of the error
 * @param result The Result to check
 * @returns True if the result is successful, false otherwise
 *
 * @example
 * ```typescript
 * const result = ok("Hello")
 * if (isOk(result)) {
 *   console.log(result.value) // TypeScript knows this is string
 * }
 * ```
 */
export function isOk<T, E>(result: Result<T, E>): result is { ok: true, value: T } {
  return result.ok
}

/**
 * Type guard to check if a Result represents an error.
 *
 * @template T The type of the successful value
 * @template E The type of the error
 * @param result The Result to check
 * @returns True if the result is an error, false otherwise
 *
 * @example
 * ```typescript
 * const result = err(new Error("Failed"))
 * if (isErr(result)) {
 *   console.log(result.error.message) // TypeScript knows this is an error
 * }
 * ```
 */
export function isErr<T, E>(result: Result<T, E>): result is { ok: false, error: E } {
  return !result.ok
}

/**
 * Creates a successful Result containing the given value.
 *
 * @template T The type of the value
 * @param value The successful value to wrap
 * @returns A Result representing success
 *
 * @example
 * ```typescript
 * const result = ok("Hello World")
 * console.log(result.value) // "Hello World"
 * ```
 */
export function ok<T>(value: T): Result<T, never> {
  return { ok: true, value }
}

/**
 * Creates an error Result containing the given error.
 *
 * @template E The type of the error
 * @param error The error to wrap
 * @returns A Result representing failure
 *
 * @example
 * ```typescript
 * const result = err(new Error("Something went wrong"))
 * console.log(result.error.message) // "Something went wrong"
 * ```
 */
export function err<E = Error>(error: E): Result<never, E> {
  return { error, ok: false }
}

/**
 * Safely executes a function that might throw, returning a Result instead of throwing.
 * This is useful for wrapping potentially unsafe operations in a type-safe way.
 *
 * @template T The return type of the function
 * @param fn The function to execute safely
 * @returns A Result containing either the function's return value or any error it threw
 *
 * @example
 * ```typescript
 * const result = trySafe(() => JSON.parse('{"valid": "json"}'))
 * if (isOk(result)) {
 *   console.log(result.value) // Parsed JSON object
 * } else {
 *   console.log(result.error.message) // Parse error message
 * }
 * ```
 */
export function trySafe<T>(fn: () => T): Result<T, Error> {
  try {
    return ok(fn())
  }
  catch (error) {
    return err(error instanceof Error ? error : new Error(String(error)))
  }
}

/**
 * Safely executes an async function that might reject, returning a Promise<Result> instead of rejecting.
 * This is the async version of trySafe for handling Promise-based operations.
 *
 * @template T The resolved type of the Promise
 * @param fn The async function to execute safely
 * @returns A Promise that resolves to a Result containing either the function's result or any error
 *
 * @example
 * ```typescript
 * const result = await trySafeAsync(() => fetch('/api/data').then(r => r.json()))
 * if (isOk(result)) {
 *   console.log(result.value) // API response data
 * } else {
 *   console.log(result.error.message) // Network or parsing error
 * }
 * ```
 */
export async function trySafeAsync<T>(fn: () => Promise<T>): Promise<Result<T, Error>> {
  try {
    const value = await fn()
    return ok(value)
  }
  catch (error) {
    return err(error instanceof Error ? error : new Error(String(error)))
  }
}

/**
 * Transforms the successful value of a Result using the provided function.
 * If the Result is an error, it passes through unchanged.
 *
 * @template T The original successful value type
 * @template U The transformed value type
 * @template E The error type
 * @param result The Result to transform
 * @param fn The transformation function to apply to successful values
 * @returns A new Result with the transformed value or the original error
 *
 * @example
 * ```typescript
 * const result = ok(5)
 * const doubled = map(result, x => x * 2)
 * console.log(doubled.value) // 10
 * ```
 */
export function map<T, U, E>(
  result: Result<T, E>,
  fn: (_value: T) => U,
): Result<U, E> {
  return isOk(result) ? ok(fn(result.value)) : result
}

/**
 * Transforms the error of a Result using the provided function.
 * If the Result is successful, it passes through unchanged.
 *
 * @template T The successful value type
 * @template E The original error type
 * @template F The transformed error type
 * @param result The Result to transform
 * @param fn The transformation function to apply to errors
 * @returns A new Result with the original value or the transformed error
 *
 * @example
 * ```typescript
 * const result = err(new Error("Failed"))
 * const withContext = mapErr(result, e => `Operation failed: ${e.message}`)
 * ```
 */
export function mapErr<T, E, F>(
  result: Result<T, E>,
  fn: (_error: E) => F,
): Result<T, F> {
  return isErr(result) ? err(fn(result.error)) : result
}

/**
 * Extracts the value from a successful Result or throws the error.
 * Use this when you're confident the Result is successful or when you want to propagate errors.
 *
 * @template T The successful value type
 * @template E The error type
 * @param result The Result to unwrap
 * @returns The successful value
 * @throws The error if the Result represents failure
 *
 * @example
 * ```typescript
 * const result = ok("Hello")
 * const value = unwrap(result) // "Hello"
 *
 * const errorResult = err(new Error("Failed"))
 * const value2 = unwrap(errorResult) // Throws Error("Failed")
 * ```
 */
export function unwrap<T, E>(result: Result<T, E>): T {
  if (isOk(result))
    return result.value
  throw result.error
}

/**
 * Extracts the value from a Result or returns a default value if it's an error.
 * This is a safe way to get a value without throwing.
 *
 * @template T The successful value type
 * @template E The error type
 * @param result The Result to unwrap
 * @param defaultValue The value to return if the Result is an error
 * @returns The successful value or the default value
 *
 * @example
 * ```typescript
 * const success = ok("Hello")
 * const value1 = unwrapOr(success, "Default") // "Hello"
 *
 * const failure = err(new Error("Failed"))
 * const value2 = unwrapOr(failure, "Default") // "Default"
 * ```
 */
export function unwrapOr<T, E>(result: Result<T, E>, defaultValue: T): T {
  return isOk(result) ? result.value : defaultValue
}

/**
 * Extracts the value from a Result or computes a default using the error.
 * This allows you to handle errors by transforming them into valid values.
 *
 * @template T The successful value type
 * @template E The error type
 * @param result The Result to unwrap
 * @param fn Function that transforms the error into a default value
 * @returns The successful value or the computed default value
 *
 * @example
 * ```typescript
 * const result = err(new Error("Network timeout"))
 * const value = unwrapOrElse(result, error => `Error: ${error.message}`)
 * console.log(value) // "Error: Network timeout"
 * ```
 */
export function unwrapOrElse<T, E>(
  result: Result<T, E>,
  fn: (_error: E) => T,
): T {
  return isOk(result) ? result.value : fn(result.error)
}

/**
 * Chains operations on successful Results (also known as flatMap or bind).
 * If the Result is successful, applies the function; if it's an error, passes through unchanged.
 * This is useful for composing multiple operations that might fail.
 *
 * @template T The original successful value type
 * @template U The new successful value type
 * @template E The error type
 * @param result The Result to chain from
 * @param fn Function that takes the successful value and returns a new Result
 * @returns The new Result or the original error
 *
 * @example
 * ```typescript
 * const parseAndDouble = (str: string) =>
 *   trySafe(() => parseInt(str)).pipe(
 *     result => andThen(result, num => ok(num * 2))
 *   )
 *
 * const result = andThen(ok("5"), str => trySafe(() => parseInt(str)))
 * ```
 */
export function andThen<T, U, E>(
  result: Result<T, E>,
  fn: (_value: T) => Result<U, E>,
): Result<U, E> {
  return isOk(result) ? fn(result.value) : result
}

/**
 * Chains operations on error Results (error recovery).
 * If the Result is an error, applies the recovery function; if it's successful, passes through unchanged.
 * This is useful for providing fallback operations when the primary operation fails.
 *
 * @template T The successful value type
 * @template E The original error type
 * @template F The new error type
 * @param result The Result to recover from
 * @param fn Function that takes the error and returns a recovery Result
 * @returns The original successful Result or the recovery Result
 *
 * @example
 * ```typescript
 * const primaryOperation = err(new Error("Primary failed"))
 * const recovered = orElse(primaryOperation, error => {
 *   console.log(`Primary failed: ${error.message}, trying fallback`)
 *   return ok("fallback value")
 * })
 * ```
 */
export function orElse<T, E, F>(
  result: Result<T, E>,
  fn: (_error: E) => Result<T, F>,
): Result<T, F> {
  return isErr(result) ? fn(result.error) : result
}
