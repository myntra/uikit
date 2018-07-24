import { createHelper } from '@myntra/codemod-utils'

/**
 * Replace 'unity-uikit/SelectBox' with '@myntra/uikit'.
 *
 * Renamed Props:
 *  - 'filterOptions' is renamed to 'filterOptions' to better convey it's purpose.
 *  - 'multi' is renamed to 'multiple'
 *  - 'noResultsText' is renamed to 'noResultsPlaceholder' as it can be React node too.
 *  - 'onInputChange' is renamed to 'onSearch'.
 *
 * Unsupported Props:
 * - 'onBlur'
 * - 'onFocus'
 * - 'onOpen'
 * - 'onClose'
 * - 'maxOptions'
 */
export function migrateFromUnityUikit(file, api) {
  const { h } = createHelper(file, api)
  const oldImport = h.findImport('unity-uikit/SelectBox')

  if (oldImport.size()) {
    const name = h.getDefaultImportLocalName(h.first(oldImport))
    oldImport.remove()

    h.addNamedImport('@myntra/uikit', 'InputSelect')
    h.renameProps(name, {
      filterOption: 'filterOptions',
      multi: 'multiple',
      noResultsText: 'noResultsPlaceholder',
      onInputChange: 'onSearch'
    })
    h.removeProps(name, ['onBlur', 'onFocus', 'onOpen', 'onClose', 'maxOptions'])
    h.renameJSxTag(name, 'InputSelect')

    return h.toSource()
  }
}
