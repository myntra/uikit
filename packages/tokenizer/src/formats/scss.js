const cssPrettier = require('tidify')
const { flatten } = require('../utils')

function toString(any) {
  if (Array.isArray(any)) {
    return any.map(it => (/["\s']/.test(it) ? `"${it}"` : it)).join(', ')
  }

  return any
}

module.exports = (content, write) => {
  const payload = Object.entries(flatten(content, '-'))
    .map(([name, value]) => '$' + name + ': ' + toString(value) + ';')
    .join('\n')
  write(cssPrettier(payload))
}
