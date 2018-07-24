import { createHelper } from '@myntra/codemod-utils'

/**
 * Replace 'unity-uikit/DatePicker' with '@myntra/uikit'.
 *
 * Renamed Props:
 *  - 'minDate' is now 'min'
 *  - 'maxDate' is now 'max'
 *  - 'disabledDates' is now 'disabledRanges'
 *
 * Unsupported Props:
 *  - 'onOpen'
 *  - 'onClose'
 */
export function migrateFromUnityUikit(file, api) {
  const { h } = createHelper(file, api)
  const oldImport = h.findImport('unity-uikit/DatePicker')

  if (oldImport.size()) {
    const name = h.getDefaultImportLocalName(h.first(oldImport))
    oldImport.remove()

    h.addNamedImport('@myntra/uikit', 'InputDate')
    h.renameProps(name, { minDate: 'min', maxDate: 'max', disabledDates: 'disabledRanges' })
    h.removeProps(name, ['onOpen', 'onClose'])
    h.renameJSxTag(name, 'InputDate')

    return h.toSource()
  }
}
