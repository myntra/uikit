const utils = require('loader-utils')

module.exports = function ClassNamesLoader(source, map) {
  this.callback(null, source, map)
}

module.exports.pitch = function(remainingRequest) {
  const uikitUtils = utils.stringifyRequest(
    this,
    require.resolve('@myntra/uikit-utils')
  )
  const file = utils.stringifyRequest(this, '!!' + remainingRequest)

  const code =
    `var utils = require(${uikitUtils});\n` +
    `var locals = require(${file});\n` +
    `function css() { return utils.classnames.apply(null, arguments).use(locals); }\n` +
    `module.exports = css`

  return code
}
