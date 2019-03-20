const path = require('path')
const { componentsDir, components } = require('./utils')
const typescript = require('typescript')
const babel = require('@babel/core')
const docgen = require('@myntra/docgen')
const fs = require('fs')
const camelCase = require('lodash.camelcase')
const glob = require('glob')
const prettier = require('prettier')

writeUIKitAsyncImports(components.map(getMainFile))
writeUIKitTypesForDocsEditor(components)

// Helpers.
function getMainFile(component) {
  return path.resolve(componentsDir, component, getPackageJSON(component).main)
}

function getSourceDir(component) {
  return path.resolve(componentsDir, component, 'src')
}

function getPackageJSON(component) {
  return require(path.resolve(componentsDir, component, 'package.json'))
}

function getComponents(component) {
  const pkg = getPackageJSON(component)
  const name = componentName(component)
  const re = new RegExp(`^${name}`)

  return {
    name,
    file: path.resolve(componentsDir, component, pkg.main),
    namespaced: (pkg.components || []).map(filename => {
      const file = path.resolve(componentsDir, component, filename)

      return {
        name: componentName(file).replace(re, ''),
        file,
      }
    })
  }
}

function getDeclaredTypes() {
  return (
    `\n// -----------[[React]]----------//\n` +
    fs.readFileSync(path.resolve(__dirname, './types/react-browser.d.ts')).toString() +
    `\n// -----------[[JSX]]----------//\n` +
    fs.readFileSync(path.resolve(__dirname, './types/jsx-browser.d.ts')).toString() +
    `\n// -----------[[UIKitGlobal]]----------//\n` +
    normalize(fs.readFileSync(path.resolve(__dirname, '../types/api.d.ts')).toString()) +
    `\n// -----------[[IconNames]]----------//\n` +
    normalize(fs.readFileSync(path.resolve(__dirname, '../components/icon/src/names.d.ts')).toString()) +
    '\n'
  )
}

function writeUIKitTypesForDocsEditor(components) {
  const files = components.map(component => glob.sync(`${getSourceDir(component)}/**/*.{ts,tsx}`)).flat()
  const program = typescript.createProgram(files, {
    jsx: typescript.JsxEmit.React,
    module: typescript.ModuleKind.CommonJS,
    target: typescript.ScriptTarget.Latest,
    emitDeclarationOnly: true
  })

  let code = ''

  for (component of components) {
    const { name, file, namespaced } = getComponents(component)

    code += `\n\n// -----------[[${name}]]--------------- //\n`
    code += extractTypes(file) + `\ndeclare function ${name}(props: ${name}Props): JSX.Element;\n`

    if (namespaced.length) {
      code += `declare namespace ${name} {\n`
      const namespace = name

      namespaced.forEach(({ name, file }) => {
        code += extractTypes(file) + `\ndeclare function ${name}(props: ${namespace}${name}Props): JSX.Element;\n`
      })

      code += `\n}\n`
    }
  }

  code += '\n\n\n\n// ----------[[DeclaredTypes]]---------- //\n' + getDeclaredTypes()

  fs.writeFileSync(
    path.resolve(__dirname, '../docs/src/uikit.d.ts'),
    prettier.format(code, { parser: 'typescript'  })
  )

  function extractTypes(file) {
    let types = ''

    program.emit(program.getSourceFile(file), (_, content) => types = content, undefined, true)

    return normalize(types)
  }
}

function writeUIKitAsyncImports(files) {
  const META = []

  files.forEach((file, index) => {
    const docs = docgen(file)

    META.push({
      name: componentName(file),
      since: docs.since,
      status: docs.status,
      path: '/components/' + components[index]
    })
  })

  fs.writeFileSync(
    path.resolve(__dirname, '../docs/src/uikit.js'),
    // `import React from 'react'\n` +
    files.map((file, index) => `export { default as ${componentName(file)} } from '@myntra/uikit-component-${components[index]}'`).join('\n') + `\nexport const META = ${JSON.stringify(META, null, 2)}`
  )
}

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

function componentName(file) {
  const name = camelCase(path.basename(file).replace(/\.tsx$/, ''))

  return name[0].toUpperCase() + name.slice(1)
}
