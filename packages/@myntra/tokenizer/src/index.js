const yaml = require('./yaml')
const fs = require('fs')
const path = require('path')

module.exports = function(filename) {
  if (!fs.existsSync(filename)) {
    console.log('No tokens.yml file found.')
    process.exit(0)
  }

  const dir = path.dirname(filename)
  const data = yaml.parse(fs.readFileSync(filename))

  const formats = {
    js: require('./formats/commonjs'),
    'esm.js': require('./formats/esm'),
    scss: require('./formats/scss'),
    css: require('./formats/css')
  }

  Object.entries(formats).forEach(([ext, handler]) => {
    handler(data, content => fs.writeFileSync(path.resolve(dir, 'tokens.' + ext), content))
  })
}
