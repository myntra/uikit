import { each, isString, isPlainObject, isArray } from 'lodash-es'

/**
 * Unique values from array.
 *
 * @export
 * @template T
 * @param {Array.<T>} any
 * @return {Array.<T>}
 */
export function unique(any) {
  return Array.from(new Set(any))
}

/**
 * @typedef ClassNames
 * @property {function(Object.<string, string>): string} use Load class names from CSS modules mapping.
 */

/**
 * Format CSS class names.
 *
 * @export
 * @param {Array.<string|string[]|Object.<string, boolean>} args
 * @returns {ClassNames & Array.<string>}
 */
export function classnames(...args) {
  const classes = []

  classes.use = cssModule => {
    return unique(classes.map(it => cssModule[it]).filter(isString)).join(' ')
  }

  classes.toString = () => {
    return unique(classes.filter(isString)).join(' ')
  }

  args.forEach(arg => {
    if (isString(arg)) classes.push(arg)
    else if (isArray(arg)) classes.push(...arg)
    else if (isPlainObject(arg)) {
      each(arg, (value, key) => {
        if (value) classes.push(key)
      })
    }
  })

  return classes
}
