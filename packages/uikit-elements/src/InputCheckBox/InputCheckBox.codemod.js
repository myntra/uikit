import { createHelper } from '@myntra/codemod-utils'
/**
 * Replace 'unity-uikit/Input' when used with [type="number"] with '@myntra/uikit'.
 */
export function migrateFromUnityUikit(file, api) {
  const { h } = createHelper(file, api)
  const oldImport = h.findImport('unity-uikit/Input')

  if (oldImport.size()) {
    const name = h.getDefaultImportLocalName(h.first(oldImport))
    const checkboxInputs = h.findComponentWhereProp(name, 'type', 'checkbox')
    const allInputs = h.findComponentWhere(name)

    if (checkboxInputs.size()) {
      if (allInputs.size() === checkboxInputs.size()) oldImport.remove()

      h.addNamedImport('@myntra/uikit', 'InputCheckBox')
      h.removeProp(name, 'type', checkboxInputs)
      h.renameProp(name, 'value', 'htmlValue', checkboxInputs)
      h.renameProp(name, 'checked', 'value', checkboxInputs)
      h.renameJSxTag(name, 'InputCheckBox', checkboxInputs)

      return h.toSource()
    }
  }
}
