const utils = require('loader-utils')

module.exports = function ClassNamesLoader(source, map) {
  this.callback(null, source, map)
}

module.exports.pitch = function(remainingRequest) {
  const file = utils.stringifyRequest(this, '!!' + remainingRequest)

  const code =
    `import { classnames } from '@myntra/uikit-utils';\n` +
    `import locals from '${file}';\n` +
    `function css() { return utils.classnames.apply(null, arguments).use(locals); }\n` +
    `export default css`

  return code
}
