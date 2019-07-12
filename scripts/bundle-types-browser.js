const path = require('path')
const { componentsDir, components, getShortName } = require('./utils')
const typescript = require('typescript')
const docgen = require('@myntra/docgen')
const fs = require('fs')
const camelCase = require('lodash.camelcase')
const glob = require('glob')
const prettier = require('prettier')

writeUIKitAsyncImports(components)
writeUIKitTypesForDocsEditor(components)

// Helpers.
function getComponentFile(component) {
  return path.resolve(componentsDir, component, 'src', component + '.tsx')
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
  return {
    pkg: pkg.name,
    name,
    file: path.resolve(componentsDir, component, 'src/' + component + '.tsx'),
  }
}

function getDeclaredTypes() {
  return (
    `\n// -----------[[Form]]----------//\n` +
    fs.readFileSync(path.resolve(__dirname, './types/form.d.ts')).toString() +
    `\n// -----------[[React]]----------//\n` +
    fs
      .readFileSync(path.resolve(__dirname, './types/react-browser.d.ts'))
      .toString() +
    `\n// -----------[[JSX]]----------//\n` +
    fs
      .readFileSync(path.resolve(__dirname, './types/jsx-browser.d.ts'))
      .toString() +
    `\n// -----------[[UIKitGlobal]]----------//\n` +
    normalize(
      fs.readFileSync(path.resolve(__dirname, '../@types/api.d.ts')).toString()
    ) +
    `\n// -----------[[IconNames]]----------//\n` +
    normalize(
      fs
        .readFileSync(
          path.resolve(__dirname, '../components/icon/src/names.d.ts')
        )
        .toString()
    ) +
    '\n'
  )
}

function getComponentTypes(name, file, extractTypes) {
  const source = extractTypes(file)
  const { types, comment } = normalizeComponent(source, (relative) =>
    extractTypes(
      relative.startsWith('.')
        ? path.resolve(path.dirname(file), relative)
        : relative
    )
  )

  return `
    // -----------[[${name}]]--------------- //
    ${comment}
    declare function ${name}(props: ${name}.Props): JSX.Element;
    declare namespace ${name} {
      ${types}
    }
    `
}

function writeUIKitTypesForDocsEditor(components) {
  const files = components
    .map((component) => glob.sync(`${getSourceDir(component)}/**/*.{ts,tsx}`))
    .reduce(
      (acc, item) =>
        Array.isArray(item) ? acc.concat(item) : (acc.push(item), acc),
      []
    )
  const program = typescript.createProgram(files, {
    jsx: typescript.JsxEmit.React,
    module: typescript.ModuleKind.CommonJS,
    target: typescript.ScriptTarget.Latest,
    emitDeclarationOnly: true,
  })

  let code = ''

  for (const component of components) {
    const { name, file } = getComponents(component)
    // console.log(`${name} - ./${path.relative(process.cwd(), file)}`)
    code += getComponentTypes(name, file, extractTypes)
  }

  code +=
    '\n\n\n\n// ----------[[DeclaredTypes]]---------- //\n' + getDeclaredTypes()

  fs.writeFileSync(
    path.resolve(__dirname, '../docs/src/uikit.d.ts'),
    prettier.format(code, {
      parser: 'typescript',
      singleQuote: true,
      semi: false,
      trailingComma: 'es5',
      printWidth: 120,
    })
  )

  function extractTypes(file) {
    if (!/\.tsx?$/.test(file)) return ''
    let types = ''
    const typeFile = file.replace(/\.tsx?$/, '.d.ts')

    if (typeFile in extractTypes) return extractTypes[typeFile]

    program.emit(
      program.getSourceFile(file),
      (f, content) => {
        extractTypes[f] = content
        if (f === typeFile) {
          types = content
        }
      },
      undefined,
      true
    )

    return types
  }
}

function writeUIKitAsyncImports(components) {
  const META = []

  components.forEach((component, index) => {
    const file = getComponentFile(component)
    try {
      const docs = docgen(file)

      META.push({
        name: componentName(file),
        since: docs.since,
        status: docs.status,
        path: '/components/' + components[index],
      })
    } catch (error) {
      console.error(`In ${component}: ${file}`)
      console.error(error)
    }
  })

  fs.writeFileSync(
    path.resolve(__dirname, '../packages/uikit/src/components.ts'),
    prettier.format(
      components
        .map((component, index) => {
          const pkg = getPackageJSON(component)

          return `export { default as  ${componentName(component)} ${
            pkg.exports ? ', ' + pkg.exports.join(', ') : ''
          } } from '@myntra/uikit-component-${component}'`
        })
        .join('\n'),
      {
        parser: 'babel',
        singleQuote: true,
        semi: false,
        trailingComma: 'es5',
      }
    )
  )

  fs.writeFileSync(
    path.resolve(__dirname, '../docs/src/uikit.js'),
    prettier.format(
      `
      import { lazy } from 'react'
      function asyncComponent(factory) {
        const Component = lazy(factory)
        const cache = {}

        return new Proxy(Component, {
          get(target, name) {
            if (typeof name === 'string' && /^[A-Z]/.test(name)) {
              // const result = Component._result

              return (
                cache[name] ||
                (cache[name] = lazy(async () => {
                  const { default: Component } = await factory()

                  return { __esModule: true, default: Component[name] }
                }))
              )
            }

            return target[name]
          }
        })
      }
      ` +
        components
          .map(
            (component) =>
              `export const ${componentName(
                component
              )} = asyncComponent(() => import(/* webpackChunkName: 'components/${component}' */ '@myntra/uikit-component-${component}'))`
          )
          .join('\n') +
        '\n' +
        components
          .map((component) => [component, getPackageJSON(component).exports])
          .filter(([, namedExports]) => !!namedExports)
          .map(([component, namedExports]) =>
            namedExports
              .filter((name) => /^[A-Z]/.test(name))
              .map(
                (name) =>
                  `export const ${name} = asyncComponent(() => import('@myntra/uikit-component-${component}').then(m => ({ default: m.${name}, __esModule: true })))`
              )
              .join('\n')
          )
          .join('\n') +
        '\n' +
        `\nexport const META = ${JSON.stringify(META, null, 2)}`,
      {
        parser: 'babel',
        singleQuote: true,
        semi: false,
        trailingComma: 'es5',
        printWidth: 120,
      }
    )
  )
}

function normalize(code) {
  return normalizeComponent(code).types
}

function normalizeComponent(code, extractTypes) {
  /** @type {import('typescript').CompilerHost} */
  const compilerHost = {
    fileExists: () => true,
    getCanonicalFileName: (filename) => filename,
    getCurrentDirectory: () => '',
    getDefaultLibFileName: () => 'lib.d.ts',
    getNewLine: () => '\n',
    getSourceFile: (filename) => {
      return typescript.createSourceFile(
        filename,
        code,
        typescript.ScriptTarget.Latest,
        true
      )
    },
    readFile: () => null,
    useCaseSensitiveFileNames: () => true,
    writeFile: () => null,
  }

  const program = typescript.createProgram(
    ['types.d.ts'],
    { noResolve: true },
    compilerHost
  )
  const ast = program.getSourceFile('types.d.ts')

  let types = ast.statements
    .filter(
      (statement) =>
        typescript.isInterfaceDeclaration(statement) ||
        typescript.isTypeAliasDeclaration(statement)
    )
    .map((statement) => statement.getFullText())
    .join('\n')

  const component = ast.statements.find(
    (statement) =>
      (typescript.isFunctionDeclaration(statement) ||
        typescript.isClassDeclaration(statement)) &&
      (statement.modifiers.length === 2 &&
        statement.modifiers[0].kind === typescript.SyntaxKind.ExportKeyword &&
        statement.modifiers[1].kind === typescript.SyntaxKind.DefaultKeyword)
  )

  if (extractTypes) {
    const subComponents = {}

    if (component && typescript.isClassDeclaration(component)) {
      component.members
        .filter(
          (member) =>
            typescript.isPropertyDeclaration(member) &&
            member.modifiers &&
            member.modifiers.some(
              (modifier) =>
                modifier.kind === typescript.SyntaxKind.StaticKeyword
            )
        )
        .forEach((property) => {
          const name = property.name.getText().trim()

          if (/^[A-Z]/.test(name) && property.type)
            subComponents[
              property.type
                .getText()
                .replace(/typeof\s/, '')
                .trim()
            ] = name
        })
    }

    ast.statements.forEach((statement) => {
      if (typescript.isImportDeclaration(statement)) {
        const source = statement.moduleSpecifier
          .getText()
          .replace(/^['"`]|["'`]$/g, '')

        if (source.startsWith('.')) {
          // Using default import?
          if (statement.importClause && statement.importClause.name) {
            const name = statement.importClause.name.getText().trim()

            if (name in subComponents) {
              types += getComponentTypes(
                subComponents[name],
                source + '.tsx',
                extractTypes
              )
            }
          }
        }
        if (source.startsWith('@myntra/uikit-component-')) {
          if (statement.importClause && statement.importClause.namedBindings) {
            let [pkg, file] = source.split('/src/')
            const shortName = getShortName(pkg)
            let component = componentName(shortName)

            if (file) {
              if (file.startsWith(shortName))
                file = file.substr(shortName.length + 1)

              component +=
                '.' +
                file
                  .split('/')
                  .map((name) => componentName(name))
                  .join('.')
            }

            if (
              typescript.isNamedImports(statement.importClause.namedBindings)
            ) {
              statement.importClause.namedBindings.elements.forEach(
                (element) => {
                  const name = element.propertyName
                    ? element.propertyName.getText()
                    : element.name.getText()
                  const localName = element.name.getText()

                  types += `\ntype ${localName} = ${component}.${name}`
                }
              )
            }
          }
        }
      }
    })
  }

  let comment = '/**\n *\n */'

  if (component && component.jsDoc) {
    comment = component.jsDoc[0].getFullText()
  }

  return {
    types:
      types
        .replace(/\/\/\/[^\n]*/g, '')
        .replace(/\bexport /g, '')
        .replace(/\bdeclare type /g, 'type ') + '\n',
    comment,
  }
}

function componentName(file) {
  const name = camelCase(path.basename(file).replace(/\.(?:t|j)sx$/, ''))

  return name[0].toUpperCase() + name.slice(1)
}
