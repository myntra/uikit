import { createHelper } from '../../src'

/**
 * Replace 'unity-uikit/Icon/<Element>' with '@myntra/uikit'.
 * Transform props from unity-uikit to uikit supported.
 *
 * New property
 * - name
 *
 *
 */
export function migrateFromUnityUikit(file, api, { themeName }) {
  const { h, j } = createHelper(file, api)
  const oldImport = h.findImport(null, 'unity-uikit/Icon')
  if (oldImport.size()) {
    const name = h.getDefaultImportLocalName(h.first(oldImport))
    console.log('name: ', name)
    oldImport.remove()
    h.addNamedImport(`@myntra/uikit-theme-${themeName}`, 'Icon')
    h.findComponentWhere(name, undefined)
      .find(j.JSXOpeningElement)
      .replaceWith((element) => {
        element.node.attributes.push(
          j.jsxAttribute(
            j.jsxIdentifier('name'),
            j.stringLiteral(name.toLowerCase())
          )
        )
        return element.node
      })
    h.renameJSxTag(name, 'Icon')
    return h.toSource()
  }
}
