const utils = require('loader-utils')

module.exports = function ClassNamesLoader(source, map) {
  this.callback(null, source, map)
}

module.exports.pitch = function(remainingRequest) {
  const uikitUtils = utils.stringifyRequest(this, '!' + require.resolve('@myntra/uikit-utils'))
  const file = utils.stringifyRequest(this, '!!' + remainingRequest)

  return (
    `var utils = require(${uikitUtils})\n` +
    `var locals = require(${file})\n` +
    `function css() { return utils.classnames.apply(null, arguments).use(locals) }\n` +
    `for (var key in locals) css[key] = locals[key]\n` +
    `module.exports = css`
  )
}
