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
 * @typedef object ClassNames
 * @property {function(Object.<string, string>): string} use Load class names from CSS modules mapping.
 */

/**
 * Format CSS class names.
 *
 * @export
 * @param {...string|string[]|Object.<string, boolean>} args
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
/**
 * Create object from [source] without [keys].
 *
 * @export
 * @template T
 * @param {Object.<string, T>} source
 * @param {string[]|Object.<string, any>} keys
 * @returns {Object.<string, T>}
 */
export function objectWithoutProperties(source, keys) {
  keys = new Set(Array.isArray(keys) ? keys : Object.keys(keys))
  const target = {}
  for (const key in source) {
    if (!Object.prototype.hasOwnProperty.call(source, key)) continue
    if (keys.has(key)) continue
    target[key] = source[key]
  }
  return target
}
