export function isStringDate(
  value: undefined | string | Date | DateRange | StringDateRange,
  format?: string
): value is undefined | string | StringDateRange {
  return typeof format === 'string'
}

export function isDate(
  value: undefined | string | Date | DateRange | DateRange,
  format?: string
): value is undefined | Date | DateRange {
  return typeof format !== 'string'
}

export function isDateRange(
  value: undefined | string | Date | DateRange | StringDateRange,
  range?: boolean
): value is undefined | DateRange | StringDateRange {
  return range === true
}

export interface DateRange {
  from?: Date
  to?: Date
}
export interface StringDateRange {
  from?: string
  to?: string
}

export function is<T>(value: any, condition: boolean): value is T {
  return condition
}
