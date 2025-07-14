// Result type for functional error handling
export type Result<T, E = Error>
  = | { ok: true, value: T }
    | { ok: false, error: E }

// Type guards
export function isOk<T, E>(result: Result<T, E>): result is { ok: true, value: T } {
  return result.ok
}

export function isErr<T, E>(result: Result<T, E>): result is { ok: false, error: E } {
  return !result.ok
}

// Constructor functions
export function ok<T>(value: T): Result<T, never> {
  return { ok: true, value }
}

export function err<E = Error>(error: E): Result<never, E> {
  return { error, ok: false }
}

// Safe execution wrappers
export function trySafe<T>(fn: () => T): Result<T, Error> {
  try {
    return ok(fn())
  }
  catch (error) {
    return err(error instanceof Error ? error : new Error(String(error)))
  }
}

export async function trySafeAsync<T>(fn: () => Promise<T>): Promise<Result<T, Error>> {
  try {
    const value = await fn()
    return ok(value)
  }
  catch (error) {
    return err(error instanceof Error ? error : new Error(String(error)))
  }
}

// Utility functions for working with Results
export function map<T, U, E>(
  result: Result<T, E>,
  fn: (_value: T) => U,
): Result<U, E> {
  return isOk(result) ? ok(fn(result.value)) : result
}

export function mapErr<T, E, F>(
  result: Result<T, E>,
  fn: (_error: E) => F,
): Result<T, F> {
  return isErr(result) ? err(fn(result.error)) : result
}

export function unwrap<T, E>(result: Result<T, E>): T {
  if (isOk(result))
    return result.value
  throw result.error
}

export function unwrapOr<T, E>(result: Result<T, E>, defaultValue: T): T {
  return isOk(result) ? result.value : defaultValue
}

export function unwrapOrElse<T, E>(
  result: Result<T, E>,
  fn: (_error: E) => T,
): T {
  return isOk(result) ? result.value : fn(result.error)
}

// Chain operations on successful results
export function andThen<T, U, E>(
  result: Result<T, E>,
  fn: (_value: T) => Result<U, E>,
): Result<U, E> {
  return isOk(result) ? fn(result.value) : result
}

// Chain operations on error results
export function orElse<T, E, F>(
  result: Result<T, E>,
  fn: (_error: E) => Result<T, F>,
): Result<T, F> {
  return isErr(result) ? fn(result.error) : result
}
