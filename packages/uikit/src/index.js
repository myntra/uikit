import * as tokens from '@myntra/tokens'
import * as u from '@myntra/uikit-utils'

export * from '@myntra/uikit-elements'
export * from '@myntra/uikit-compounds'
export * from '@myntra/uikit-patterns'

const { ThemeProvider } = tokens
export { tokens, u, ThemeProvider }

/**
 * Function creator that accepts a propMap and returns a method which accepts a set of props
 * and renames props present in inputProps to new propName present in the propMap
 *
 * @template T
 * @param {Object.<string, string>} mapping Props object having a map of old names to new ones
 * @param {Object.<string, string>} coercions Transform values.
 * @returns {function(Object.<string, T>): Object.<string, T>}
 */
export function interopPropTransformer(mappings, coercions = {}) {
  const hasMappings = Object.keys(mappings).length > 0
  const hasCoercions = Object.keys(coercions).length > 0
  const fn = props => {
    const target = { ...props }

    if (hasMappings) {
      Object.entries(([from, to]) => {
        if (from in props) target[to] = props[from]
      })
    }
    if (hasCoercions) {
      Object.entries(([name, fn]) => {
        if (name in props) target[name] = fn(target[name])
      })
    }

    return target
  }

  fn.mappings = mappings
  fn.coercions = coercions

  return fn
}
