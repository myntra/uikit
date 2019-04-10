export function memoize<T>(fn: T, isEqual?: (a: any, b: any) => boolean): T
export function classnames(
  ...args: any[]
): {
  use(mapping: any): string
}
