import { createHelper } from '@myntra/codemod-utils'

/**
 * Replace 'unity-uikit/Pagination' with '@myntra/uikit'.
 *
 */
export function migrateFromUnityUikit(file, api) {
  const { h } = createHelper(file, api)
  const oldImport = h.findImport('unity-uikit/Pagination')

  if (oldImport.size()) {
    const name = h.getDefaultImportLocalName(h.first(oldImport))

    oldImport.remove()
    h.addNamedImport('@myntra/uikit', 'Pagination', name)

    return h.toSource()
  }
}
