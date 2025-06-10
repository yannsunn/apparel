// Ultra-strict TypeScript configurations

// Branded types for additional type safety
export type ProductId = string & { readonly __brand: unique symbol }
export type SizeId = string & { readonly __brand: unique symbol }
export type ColorId = string & { readonly __brand: unique symbol }
export type CategoryId = string & { readonly __brand: unique symbol }

// Price type with validation
export type Price = number & { readonly __priceTag: unique symbol }

// Strict utility types
export type NonEmptyString = string & { readonly __nonEmpty: unique symbol }
export type PositiveNumber = number & { readonly __positive: unique symbol }

// Type guards
export function isNonEmptyString(value: string): value is NonEmptyString {
  return value.length > 0
}

export function isPositiveNumber(value: number): value is PositiveNumber {
  return value > 0
}

export function isValidPrice(value: number): value is Price {
  return value >= 0 && Number.isFinite(value)
}

// Brand type creators
export function createProductId(id: string): ProductId {
  if (!isNonEmptyString(id)) {
    throw new Error('Product ID must be a non-empty string')
  }
  return id as unknown as ProductId
}

export function createPrice(value: number): Price {
  if (!isValidPrice(value)) {
    throw new Error('Price must be a non-negative finite number')
  }
  return value as unknown as Price
}

// Result type for better error handling
export type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E }

export function success<T>(data: T): Result<T> {
  return { success: true, data }
}

export function failure<E = Error>(error: E): Result<never, E> {
  return { success: false, error }
}

// Async Result type
export type AsyncResult<T, E = Error> = Promise<Result<T, E>>

// Safe array access
export type SafeArray<T> = readonly T[] & { 
  readonly length: number
  readonly [K: number]: T | undefined
}

export function safeArrayAccess<T>(arr: readonly T[], index: number): T | undefined {
  return index >= 0 && index < arr.length ? arr[index] : undefined
}

// Exhaustive switch helper
export function assertNever(x: never): never {
  throw new Error('Unexpected object: ' + x)
}

// Strict object creation
export type StrictRecord<K extends string | number | symbol, V> = Record<K, V> & {
  readonly [P in K]: V
}

// Deep readonly helper
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
}

// Optional with default helper
export type WithDefaults<T, D> = T & {
  readonly [K in keyof D]: K extends keyof T ? T[K] : D[K]
}