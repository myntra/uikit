const path = require('path')
const { componentsDir, components } = require('./utils')
const typescript = require('typescript')
const babel = require('@babel/core')
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

function normalize(code) {
  /** @type {import('typescript').CompilerHost} */
  const compilerHost = {
    fileExists: () => true,
    getCanonicalFileName: filename => filename,
    getCurrentDirectory: () => '',
    getDefaultLibFileName: () => 'lib.d.ts',
    getNewLine: () => '\n',
    getSourceFile: filename => {
      return typescript.createSourceFile(filename, code, typescript.ScriptTarget.Latest, true);
    },
    readFile: () => null,
    useCaseSensitiveFileNames: () => true,
    writeFile: () => null,
  }

  const program = typescript.createProgram(['types.d.ts'], { noResolve: true }, compilerHost)
  const ast = program.getSourceFile('types.d.ts')

  let types = ast.statements.filter(
    statement =>
      typescript.isInterfaceDeclaration(statement) ||
      typescript.isTypeAliasDeclaration(statement)
  ).map(
    statement => statement.getFullText()
  ).join('\n')

  const component = ast.statements.find(
    statement =>
      (
        typescript.isFunctionDeclaration(statement) ||
        typescript.isClassDeclaration(statement)
      ) && (
        statement.jsDoc && statement.jsDoc.length
      )
  )

  if (component) {
    const comment = component.jsDoc[0]

    types += '\n' + comment.getFullText()
  }

  return types
    .replace(/\/\/\/[^\n]*/g, '')
    .replace(/\bexport /g, '')
    .replace(/\bdeclare type /g, 'type ') + '\n'
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
