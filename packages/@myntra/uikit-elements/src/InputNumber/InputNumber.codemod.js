import { createHelper } from '@myntra/codemod-utils'
/**
 * Replace 'unity-uikit/Input' when used with [type="number"] with '@myntra/uikit'.
 */
export function migrateFromUnityUikit(file, api) {
  const { h } = createHelper(file, api)
  const oldImport = h.findImport('unity-uikit/Input')

  if (oldImport.size()) {
    const name = h.getDefaultImportLocalName(h.first(oldImport))
    const textInputs = h.findComponentWhereProp(name, 'type', 'number')
    const allInputs = h.findComponentWhere(name)

    if (textInputs.size()) {
      if (allInputs.size() === textInputs.size()) oldImport.remove()

      h.addNamedImport('@myntra/uikit', 'InputNumber')
      h.removeProp(name, 'type', textInputs)
      h.renameJSxTag(name, 'InputNumber', textInputs)

      return h.toSource()
    }
  }
}
