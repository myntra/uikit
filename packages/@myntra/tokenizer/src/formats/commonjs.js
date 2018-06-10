const prettier = require('prettier')
const { camelize } = require('../utils')

module.exports = (content, write) =>
  write(
    prettier.format('module.exports = ' + JSON.stringify(camelize(content), null, 2), {
      parser: 'babylon',
      singleQuote: true,
      semi: false,
      tabWidth: 2
    })
  )
