import { each, isString, isPlainObject, isArray, uniq as unique } from 'lodash-es'

/**
 * Unique values from array.
 *
 * @export
 * @template T
 * @param {Array.<T>} any
 * @return {Array.<T>}
 */
export { unique }

/**
 * Wrap single element to array if required.
 *
 * @export
 * @template T
 * @param {Array.<T>|T} any
 * @return {Array.<T>}
 */
export function toArray(any) {
  return Array.isArray(any) ? any : any === undefined || any === null ? [] : [any]
}

/**
 * Create set from values.
 *
 * @export
 * @template T
 * @param {Array.<T>|T} any
 * @return {Set.<T>}
 */
export function toSet(any) {
  return new Set(toArray(any))
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
  const target = Object.assign({}, source)
  const remove = key => delete target[key]
  ;(Array.isArray(keys) ? keys : Object.keys(keys)).forEach(remove)

  return target
}

/**
 * Extract extra props.
 *
 * @export
 * @template T
 * @param {Object.<string, any>} propTypes
 * @returns {function(Object.<string, T>): Object.<string, T>}
 */
export function onlyExtraProps(propTypes) {
  const keys = Object.keys(propTypes)

  return memoize(props => objectWithoutProperties(props, keys))
}

/**
 * Compare arrays shallowly.
 *
 * @param {Array.<any>} prev
 * @param {Array.<any>} next
 * @param {function(any, any): boolean} [isEqual=(a, b) => a === b]
 * @returns {boolean}
 */
export function isEqualShallow(prev, next, isEqual = (a, b) => a === b) {
  if (!Array.isArray(prev) || !Array.isArray(next)) return false
  if (prev.length !== next.length) {
    return false
  }

  const length = prev.length
  for (let i = 0; i < length; i++) {
    if (!isEqual(prev[i], next[i])) {
      return false
    }
  }

  return true
}

/**
 * Memoize results of a function.
 *
 * @export
 * @template T
 * @param {function(...any): T} func
 * @param {function(any, any): boolean} [isEqual=(a, b) => a === b]
 * @returns {function(...any): T}
 */
export function memoize(func, isEqual = (a, b) => a === b) {
  let lastArgs = null
  let lastResult = null
  return function(...args) {
    if (!isEqualShallow(lastArgs, args, isEqual)) {
      lastResult = func.apply(this, args)
    }

    lastArgs = args

    return lastResult
  }
}
