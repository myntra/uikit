const prettier = require('prettier')
const { camelize } = require('../utils')

module.exports = (content, write) =>
  write(
    prettier.format('export default ' + JSON.stringify(camelize(content), null, 2), {
      singleQuote: true,
      semi: false,
      tabWidth: 2
    })
  )
