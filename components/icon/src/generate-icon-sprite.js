#! /usr/bin/env node

/* eslint-disable node/no-unpublished-require */
const path = require('path')
const promised = require('@znck/promised')
const Sprite = require('@myntra/svg')
const fs = promised(require('fs'))
const glob = require('glob')
const camel = require('lodash.camelcase')
const prettier = require('prettier')

let uid = 0
function scopeIds(source) {
  const RE = /\bid="([^"]+)"/g
  const ids = new Map()

  source = source.replace(RE, (_, id) => {
    ids.set(id, uid++)

    return `id="#uikit-i-${ids.get(id)}"`
  })

  if (ids.size) {
    source = Array.from(ids.keys()).reduce(
      (source, id) =>
        source.replace(new RegExp(`#${id}\\b`, 'g'), `#uikit-i-${ids.get(id)}`),
      source
    )
  }

  return source
}

module.exports = async function generateSprite(inputs, output, outputNames) {
  const icons = inputs
    .map((input) =>
      glob
        .sync('**/*.svg', { cwd: input })
        .map((name) => path.resolve(input, name))
    )
    .reduce((acc, item) =>
      Array.isArray(item) ? acc.concat(item) : (acc.push(item), item)
    )
  const sprite = new Sprite({ prefix: 'uikit-i-' })

  await Promise.all(
    icons
      .filter((filename) => /\.svg$/.test(filename))
      .map(async (filename) => {
        const name = path.basename(filename).replace('.svg', '')
        const contents = await fs.readFile(filename)
        sprite.add(name, scopeIds(contents.toString()))
      })
  )

  const names = sprite.names
  const code = {
    names: `export default ${JSON.stringify(Array.from(names))}`,
    types: `
    export interface IconNameGlobal {
      ${Array.from(names)
        .map((name) => `${pascal(name)}: '${name}'`)
        .join('\n')}
    }
    `,
  }

  await fs.writeFile(output, sprite.compile())
  await fs.writeFile(
    outputNames,
    prettier.format(code.names, {
      parser: 'babel',
      singleQuote: true,
      semi: false,
    })
  )
  await fs.writeFile(
    outputNames.replace(/\.js$/, '.d.ts'),
    prettier.format(code.types, {
      parser: 'typescript',
      singleQuote: true,
      semi: false,
    })
  )
}

function pascal(name) {
  name = camel(name)

  if (/^[0-9]/.test(name)) name = '_' + name

  return name[0].toUpperCase() + name.substr(1)
}
