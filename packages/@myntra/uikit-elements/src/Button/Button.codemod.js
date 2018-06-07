import { createHelper } from '@myntra/codemod-utils'

export function updateImportStatement(file, api) {
  const { h } = createHelper(file, api)

  const oldImport = h.findImport('unity-uikit/Button')

  if (oldImport.size()) {
    const name = h.getDefaultImportLocalName(h.first(oldImport))

    oldImport.remove()
    // import { Button as ... } from '@myntra/uikit'
    h.addNamedImport('@myntra/uikit', 'Button', name)

    return h.toSource()
  }
}
