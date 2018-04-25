import { each } from 'lodash-es'
export function isString(any) {
  return typeof any === 'string'
}

export function isArray(any) {
  return Array.isArray(any)
}

export function isPlainObject(any) {
  return any !== null && typeof any === 'object' // TODO: Complete the implementation.
}

/**
 * @typedef {Array.<string>} StyleClass
 * @property {function(): Array.<string>} use
 */

/**
 * Format CSS class names.
 *
 * @export
 * @param {Array.<string|string[]|Object.<string, boolean>} args
 * @returns {StyleClass}
 */
export function classnames(...args) {
  const classes = []

  classes.use = cssModule => {
    console.log({ args, classes, cssModule })

    return classes.map(it => cssModule[it] || it).join(' ')
  }

  args.forEach(arg => {
    if (isString(arg)) classes.push(arg)
    else if (isArray(arg)) classes.push(...arg.filter(it => isString(it)))
    else if (isPlainObject(arg)) {
      each(arg, (value, key) => {
        if (value) classes.push(key)
      })
    }
  })

  return classes
}
