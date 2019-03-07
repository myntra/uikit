import { createHelper } from '@myntra/codemod-utils'

/**
 * Replace deprecated 'GridColumn' component with 'Grid.Column'.
 */
export function useColumnFromCompound(file, api) {
  const { h } = createHelper(file, api)

  const uikit = h.first(h.findImport('@myntra/uikit'))

  if (h.hasNamedImport('@myntra/uikit', 'GridColumn')) {
    const GridColumnLocalName = h.getNamedImportLocalName(uikit, 'GridColumn')
    const GridLocalName = h.hasNamedImport('@myntra/uikit', 'Column')
      ? h.getNamedImportLocalName(uikit, 'Grid')
      : 'Grid'

    h.addNamedImport('@myntra/uikit', 'Grid', GridLocalName)
    h.renameJSxTag(GridColumnLocalName, `${GridLocalName}.Column`)

    uikit.value.specifiers = uikit.value.specifiers.filter(specifier => specifier.imported.name !== 'GridColumn')

    return h.toSource()
  }
}
