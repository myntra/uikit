import { createHelper } from '@myntra/codemod-utils'

/**
 * Replace 'unity-uikit/Button' with '@myntra/uikit'.
 * Transform props from unity-uikit to uikit supported.
 *
 * Renamed Props:
 *  - 'modifier' is now 'type'
 *
 * Unsupported Props:
 *  - 'block'
 *  - 'round'
 *  - 'large'
 *  - 'flat'
 *  - 'preview'
 */
export function migrateFromUnityUikit(file, api) {
  const { h } = createHelper(file, api)

  const oldImport = h.findImport('unity-uikit/Button')

  if (oldImport.size()) {
    const name = h.getDefaultImportLocalName(h.first(oldImport))

    oldImport.remove()
    // import { Button as ... } from '@myntra/uikit'
    h.addNamedImport('@myntra/uikit', 'Button', name)
    h.renameProp(name, 'modifier', 'type')
    h.removeProps(name, ['block', 'round', 'large', 'flat', 'preview'])

    return h.toSource()
  }
}
