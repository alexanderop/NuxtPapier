// Types for the result object with discriminated union
export interface Success<T> {
  data: T
  error: null
}

export interface Failure<E> {
  data: null
  error: E
}

type Result<T, E = Error> = Success<T> | Failure<E>

export async function tryCatch<T, E = Error>(
  promise: Promise<T>,
): Promise<Result<T, E>> {
  try {
    const data = await promise
    return { data, error: null }
  }
  catch (error) {
    return { data: null, error: error as E }
  }
}
