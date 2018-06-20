import PropTypes from 'prop-types'
import { parse as baseParse, format as baseFormat } from 'date-fns'

export const RE_ISO_DATE = /^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)$/

export const DateType = PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string])

export const DateRangeType = PropTypes.oneOfType([
  PropTypes.shape({
    from: PropTypes.string,
    to: PropTypes.string
  }),
  PropTypes.shape({
    from: PropTypes.instanceOf(Date),
    to: PropTypes.instanceOf(Date)
  })
])

const padStartWithZeros = (value, digits = 2) => `${value}`.padStart(digits, '0')

/**
 * Create date instance.
 *
 * @export
 * @param {number} year
 * @param {number} month
 * @param {number} date
 * @returns {Date}
 */
export function UTCDate(year, month, date) {
  return new Date(
    `${padStartWithZeros(year, 4)}-${padStartWithZeros(month + 1)}-${padStartWithZeros(date)}T00:00:00.000Z`
  )
}

/**
 * Drop time component from Date.
 *
 * @export
 * @param {Date} date
 * @returns {Date}
 */
export function onlyDate(date) {
  if (typeof date.toDate === 'function') {
    date = date.toDate() // dayjs interop.
  }

  return UTCDate(date.getFullYear(), date.getMonth(), date.getDate())
}

export function parse(str, format) {
  if (str instanceof Date) return str
  if (typeof str !== 'string') return null
  if (!format) throw new Error(`'format' is required.`)
  if (RE_ISO_DATE.test(str)) return new Date(str)
  if (str.length !== format.length) throw new Error(`Date parse exception: unequal length`)

  const date = baseParse(str, format, new Date())

  if (date instanceof Date) {
    return onlyDate(date)
  }

  throw new Error(`Date parse exception: '${str}' does not match '${format}'`)
}

export function format(value, pattern) {
  if (!value) return value
  if (!pattern) return value
  if (value instanceof Date) return baseFormat(value, pattern)
  if (typeof value === 'string') return format(parse(value, pattern), pattern)

  const result = {}
  if (value.from) result.from = format(value.from, pattern)
  if (value.to) result.to = format(value.to, pattern)
  return result
}

export function isDateEqual(a, b) {
  if (!(a instanceof Date)) return false
  if (!(b instanceof Date)) return false
  if (a.getTime() === b.getTime()) return true

  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}
