#!/usr/bin/env node

const parse = require('./index')
const fs = require('fs-extra')
const glob = require('glob')
const path = require('path')
const commonPrefix = require('common-prefix')

/**
 * Exec DocGen on given patterns.
 * @param {string} workDir
 * @param {string} targetDir
 * @param {string[]} patterns
 */
module.exports = async function runner(workDir, targetDir, patterns, write = true) {
  const files = new Set(patterns.reduce((acc, pattern) => acc.concat(glob.sync(pattern)), []))
  targetDir = path.resolve(workDir, targetDir)
  if (!(await fs.exists(targetDir))) await fs.mkdirp(targetDir)

  return Promise.all(
    Array.from(files).map(async file => {
      try {
        const filename = path.resolve(workDir, file)
        const source = (await fs.readFile(filename)).toString()
        const meta = parse(filename, source)

        const prefix = commonPrefix([targetDir, filename])
        let suffix = filename
          .substr(prefix.length)
          .replace(/^[/\\]?src[/\\]?/, '')
          .replace(/\.jsx?$/, '.json')

        const content = JSON.stringify(meta, null, 2)
        const targetFile = path.join(targetDir, path.basename(suffix))

        if (write) await fs.writeFile(targetFile, content)

        return { name: targetFile.substr(workDir.length + 1), content }
      } catch (e) {
        console.log('file: ', file, e.loc, e)
      }
    })
  )
}
