const runner = require('./runner')
const path = require('path')
const fs = require('fs-extra')
const hash = require('string-hash')

function DocGenPlugin(dirs) {
  this.params = dirs.map(dir => ({
    targetDir: path.join(dir, 'dist'),
    patterns: [dir + '/src/**/*.jsx', dir + '/src/*.jsx']
  }))
}

DocGenPlugin.prototype.apply = function(compiler) {
  const history = {}
  compiler.hooks.emit.tapAsync('DocGenPlugin', async (compilation, done) => {
    await Promise.all(
      this.params.map(async ({ targetDir, patterns }) => {
        const results = await runner(process.cwd(), targetDir, patterns, false)

        await Promise.all(
          results.map(async ({ name, content }) => {
            const id = hash(name + content)

            if (history[name] !== id) {
              history[name] = id
              compilation.assets[name] = {
                size: () => content.length,
                source: () => content
              }
              const file = path.resolve(process.cwd(), name)
              await fs.writeFile(file, content)
            }
          })
        )
      })
    )
    done()
  })
}

module.exports = DocGenPlugin
