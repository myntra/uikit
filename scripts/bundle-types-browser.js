const path = require('path')
const { componentsDir, components } = require('./utils')
const typescript = require('typescript')
const fs = require('fs')
const camelCase = require('lodash.camelcase')

const files = components.map(component => path.resolve(
  componentsDir, component, require(
    path.resolve(componentsDir, component, 'package.json')
  ).main
))

const program = typescript.createProgram(files, {
  jsx: typescript.JsxEmit.React,
  module: typescript.ModuleKind.CommonJS,
  target: typescript.ScriptTarget.Latest,
  emitDeclarationOnly: true
})

fs.writeFileSync(
  path.resolve(__dirname, '../docs/src/uikit.d.ts'),
  'declare namespace JSX { interface Element {} }\n' +
  normalize(fs.readFileSync(path.resolve(__dirname, '../types/global.d.ts')).toString()) +
  normalize(fs.readFileSync(path.resolve(__dirname, '../components/icon/src/names.d.ts')).toString()) +
  '\n' + files.map(extractTypes).join('\n')
)

fs.writeFileSync(
  path.resolve(__dirname, '../docs/src/uikit.js'),
  `import React from 'react'\n` + files.map((file, index) => `export const ${componentName(file)} = React.lazy(() => import('@myntra/uikit-component-${components[index]}'))`).join('\n')
)
// Helpers.

function normalize(types) {
  const IMPORTS = /import [^;]*;/g
  const FUNCTION_EXPORTS = /export default function [^;]*;/g
  const CLASS_EXPORTS = /export default class [^\{]*\{\n(?:[ ]+[^\n]+\n)+\}/g
  const NORMAL_EXPORTS = /export \{\};/g
  const REFERENCES = /\/\/\/[^\n]*/g

  return types
    .replace(IMPORTS, '')
    .replace(FUNCTION_EXPORTS, '')
    .replace(CLASS_EXPORTS, '')
    .replace(NORMAL_EXPORTS, '')
    .replace(REFERENCES, '')
    .replace(/\bexport /g, '')
    .replace(/\bdeclare type /g, 'type ')
}

function extractTypes(file) {
  let types = ''

  program.emit(program.getSourceFile(file), (_, content) => types = content, undefined, true)

  // Remove unnecessary stuff.
  types = normalize(types)

  const name = componentName(file)

  return types + `\ndeclare function ${name}(props: ${name}Props): JSX.Element;`
}

function componentName(file) {
  const name = camelCase(path.basename(file).replace(/\.tsx$/, ''))

  return name[0].toUpperCase() + name.slice(1)
}
