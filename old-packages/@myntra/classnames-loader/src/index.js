const utils = require('loader-utils')

module.exports = function ClassNamesLoader(source, map) {
  this.callback(null, source, map)
}

module.exports.pitch = function(remainingRequest) {
  const uikitUtils = utils.stringifyRequest(this, '!' + require.resolve('@myntra/uikit-utils'))
  const file = utils.stringifyRequest(this, '!!' + remainingRequest)

  this.cacheable()

  return (
    `var utils = require(${uikitUtils})\n` +
    `var locals = require(${file})\n` +
    `var css = (...args) => utils.classnames.apply(null, args).use(locals)\n` +
    `for (var key in locals) css[key] = locals[key]\n` +
    `module.exports = css`
  )
}
