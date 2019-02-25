import { createHelper } from '@myntra/codemod-utils'

/**
 * Replace 'unity-uikit/Flex' with '@myntra/uikit'.
 * Transform props from unity-uikit to uikit supported.
 *
 */
export function migrateFromUnityUikit(file, api) {
  const { h } = createHelper(file, api)

  const oldImport = h.findImport('unity-uikit/Flex')

  if (oldImport.size()) {
    const name = h.getDefaultImportLocalName(h.first(oldImport))

    oldImport.remove()
    h.addNamedImport('@myntra/uikit', 'Flex', name)

    return h.toSource()
  }
}
