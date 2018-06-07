import debug from 'debug'
import prettier from 'prettier'

const d = debug('@myntra/codemod-utils')

export function createHelper(file, api) {
  const j = api.jscodeshift
  const root = j(file.source)
  const h = helpers(j, root)

  return { j, h, root }
}

export default function helpers(j, root) {
  function first(nodes) {
    if (!nodes || nodes.size() === 0) return

    d('first: ' + 0 + ' of ' + nodes.size())

    return nodes.paths()[0]
  }

  function findLastNonRelativeImportStatement() {
    const result = root.find(
      j.Statement,
      node => node.type === 'ImportDeclaration' && !node.source.value.startsWith('.')
    )

    if (result.size()) return result.paths()[result.size() - 1]
  }

  function findFirstNonImportStatement() {
    const result = root.find(j.Statement, node => node.type !== 'ImportDeclaration')

    if (result.size()) return first(result)
  }

  function findImport(source) {
    return root.find(j.ImportDeclaration).filter(decl => decl.value.source.value === source)
  }

  function insertAtEnd(node) {
    root
      .find(j.Program)
      .get()
      .value.body.push(node)
  }

  function insertAfterImports(node) {
    const pos = findFirstNonImportStatement()

    if (pos) {
      j(pos).insertBefore(node)
    } else {
      insertAtEnd(node)
    }
  }

  function insertAfterNonRelativeImports(node) {
    const pos = findLastNonRelativeImportStatement()

    if (pos) {
      j(pos).insertAfter(node)
    } else {
      insertAtEnd(node)
    }
  }

  function addImport(source, name, local, named = false) {
    const existing = first(findImport(source))

    const globalCollisions = root
      .find(j.Identifier, n => n.name === local && n.type !== (named ? 'ImportSpecifier' : 'ImportDefaultSpecifier'))
      .paths()
      .filter(
        n =>
          j(n)
            .closestScope()
            .get().value.type === 'Program'
      )

    if (globalCollisions.length) {
      throw Error(local + ' is already defined in scope.')
    }

    if (!existing) {
      insertAfterNonRelativeImports(
        j.importDeclaration(
          [
            named
              ? j.importSpecifier(j.identifier(name), j.identifier(local))
              : j.importDefaultSpecifier(j.identifier(local))
          ],
          j.literal(source)
        )
      )

      return // inserted. return early.
    }

    const specifier = named
      ? existing.value.specifiers.find(s => s.type === 'ImportSpecifier' && s.imported.name === local)
      : existing.value.specifiers.find(s => s.type === 'ImportDefaultSpecifier')

    if (!specifier) {
      // import <default>, { name as local, ... } from source
      existing.value.specifiers.push(
        named
          ? j.importSpecifier(j.identifier(name), j.identifier(local || name))
          : j.importDefaultSpecifier(j.identifier(local || name))
      )
    } else if (specifier.local.name !== local) {
      insertAfterImports(
        j.variableDeclaration('const', [j.variableDeclarator(j.identifier(name), j.identifier(specifier.local.name))])
      )
    }
  }

  /**
   * Add named import.
   * e.g. import { name as local } from 'source'
   *
   * @param {string} source
   * @param {string} name
   * @param {string} [local]
   * @returns {void}
   */
  function addNamedImport(source, name, local) {
    addImport(source, name, local || name, true)
  }

  /**
   * Add default import.
   * e.g. import local from 'source'
   *
   * @param {string} source
   * @param {string} local
   * @return {void}
   */
  function addDefaultImport(source, local) {
    addImport(source, undefined, local, false)
  }

  function getPropInteropNode(localComponentName) {
    const name = 'interopPropTransformer' + localComponentName + '$0'
    const result = root.find(j.VariableDeclaration, node => node.declarations[0].id.name === name)

    if (result.size()) return first(result).value

    addNamedImport('@myntra/uikit', 'interopPropTransformer')

    const interop = j.variableDeclaration('const', [
      j.variableDeclarator(
        j.identifier(name),
        j.callExpression(j.identifier('interopPropTransformer'), [j.objectExpression([]), j.objectExpression([])])
      )
    ])

    insertAfterImports(interop)

    return interop
  }

  function addPropInteropMapping(node, from, to) {
    const decl = node.declarations[0]
    const mapping = decl.init.arguments[0]

    const existing = mapping.properties.find(it => it.key.name === from)

    if (!existing) {
      mapping.properties.push(j.objectProperty(j.identifier(from), j.literal(to)))
    }
  }

  function addPropInteropCoercion(node, from, fn) {
    const decl = node.declarations[0]
    const coercions = decl.init.arguments[1]

    const existing = coercions.properties.find(it => it.key.name === from)

    if (!existing) {
      coercions.properties.push(
        j.objectProperty(j.identifier(from), first(j('const foo = ' + fn.toString()).find(j.FunctionExpression)).value)
      )
    }
  }

  function renameProp(localComponentName, oldPropName, newPropName) {
    root
      .find(j.JSXOpeningElement, { name: { type: 'JSXIdentifier', name: localComponentName } })
      .replaceWith(nodePath => {
        nodePath.node.attributes.forEach((attribute, index) => {
          if (attribute.type === 'JSXAttribute' && attribute.name.name === oldPropName) {
            nodePath.node.attributes.splice(index, 1, j.jsxAttribute(j.jsxIdentifier(newPropName), attribute.value))
          } else if (attribute.type === 'JSXSpreadAttribute') {
            const interop = getPropInteropNode(localComponentName)
            const name = interop.declarations[0].id.name

            if (!(attribute.argument.type === 'CallExpression' && attribute.argument.callee.name === name)) {
              attribute.argument = j.callExpression(j.identifier(name), [attribute.argument])
            }

            addPropInteropMapping(interop, oldPropName, newPropName)
          }
        })

        return nodePath.node
      })
  }

  function coerceProp(localComponentName, prop, fn) {
    root
      .find(j.JSXOpeningElement, { name: { type: 'JSXIdentifier', name: localComponentName } })
      .replaceWith(nodePath => {
        nodePath.node.attributes.forEach((attribute, index) => {
          if (
            attribute.type === 'JSXSpreadAttribute' ||
            (attribute.type === 'JSXAttribute' && attribute.name.name === prop)
          ) {
            const interop = getPropInteropNode(localComponentName)
            const name = interop.declarations[0].id.name
            addPropInteropCoercion(interop, prop, fn)

            if (attribute.type === 'JSXAttribute') {
              attribute.value = j.jsxExpressionContainer(
                j.callExpression(
                  j.memberExpression(
                    j.memberExpression(j.identifier(name), j.identifier('coercions')),
                    j.identifier(prop)
                  ),
                  [attribute.value.type === 'JSXExpressionContainer' ? attribute.value.expression : attribute.value]
                )
              )
            } else if (!(attribute.argument.type === 'CallExpression' && attribute.argument.callee.name === name)) {
              attribute.argument = j.callExpression(j.identifier(name), [attribute.argument])
            }

            addPropInteropCoercion(interop, prop, fn)
          }
        })

        return nodePath.node
      })
  }

  function renameProps(localComponentName, propNames) {
    Object.entries(propNames).forEach(([from, to]) => renameProp(localComponentName, from, to))
  }

  function getDefaultImportLocalName(node) {
    const defaultSpecifier = node.value.specifiers.find(specifier => specifier.type === 'ImportDefaultSpecifier')

    if (defaultSpecifier) return defaultSpecifier.local.name

    throw new Error('No default import found')
  }

  return {
    first,
    findImport,
    findLastNonRelativeImportStatement,
    findFirstNonImportStatement,
    addNamedImport,
    addDefaultImport,
    renameProp,
    renameProps,
    coerceProp,
    getDefaultImportLocalName,
    toSource: () =>
      prettier.format(root.toSource({ quote: 'single', wrapColumn: 120, tabWidth: 2 }), {
        semi: false,
        singleQuote: true,
        parser: 'babylon'
      })
  }
}

/**
 *
 * @export
 * @param {string} dir
 * @param {string[]} filename
 * @param {any} [options={}]
 */
export function testCodeMod(dir, filename, options = {}) {
  const path = require('path')
  const glob = require('glob')
  const fs = require('fs')
  const file = path.resolve(dir, filename)
  const inputDir = path.resolve(dir, '__codemod__/input')
  const outputDir = path.resolve(dir, '__codemod__/output')
  const codemods = require(file)

  describe(filename, () => {
    function read(f) {
      return fs.readFileSync(f, 'utf8').toString()
    }
    for (const name in codemods) {
      describe(name, () => {
        const fixtures = glob.sync(name + '*.js', { cwd: inputDir })

        fixtures.forEach(fixture => {
          it(fixture, () => {
            const isNegative = fixture.includes('.fail.')
            const inputPath = path.resolve(inputDir, fixture)
            const outputPath = path.resolve(outputDir, fixture)

            const transform = codemods[name]
            let jscodeshift = require('jscodeshift/src/core')
            if (transform.parser) {
              jscodeshift = jscodeshift.withParser(transform.parser)
            }

            try {
              const output = transform(
                {
                  path: inputPath,
                  source: read(inputPath)
                },
                { jscodeshift, stats: () => {} },
                options || {}
              )
              if (isNegative) {
                expect(output).toBeFalsy()
              } else {
                expect(output.trim()).toEqual(read(outputPath).trim())
              }
            } catch (e) {
              if (!isNegative) throw e
            }
          })
        })
      })
    }
  })
}
