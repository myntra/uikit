const { createFilter } = require('rollup-pluginutils')

module.exports = function ClassNames(options = {
  include: '*.module.scss'
}) {
  const shouldTransform = createFilter(options.include, options.exclude)

  return {
    name: 'classnames',
    transform(code, id) {
      if (!shouldTransform(id)) return

      const output = {
        code:
          `import { classnames } from '@myntra/uikit-utils'\n` +
          `${code.replace('export default', 'const locals =')}\n` +
          `export default (function() {\n` +
          `  return classnames.apply(null, arguments).use(locals)\n` +
          `})\n`,
        map: { mappings: '' }
      }

      return output
    }
  }
}
