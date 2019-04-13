import React, { createContext } from 'react'
import PropTypes from 'prop-types'

const MonacoEditor = React.lazy(() =>
  import(
    /* webpackPrefetch: true */
    /* webpackChunkName: 'monaco/editor' */ 'react-monaco-editor'
  )
)

export const EditorContext = createContext({
  /** @type {string} */
  source: null,
  /** @param {string} source */
  setSource(source) {
    throw new Error('No provider for editor context.')
  }
})

export default function Editor({ value: source, onChange, ...props }) {
  return (
    <MonacoEditor
      {...props}
      language="javascript"
      value={source}
      onChange={source => onChange(source)}
      editorDidMount={(editor, monaco) => {
        editor.getModel().updateOptions({
          tabSize: 2
        })

        monaco.languages.typescript.javascriptDefaults.setCompilerOptions({ lib: true, allowNonTsExtensions: true })
        try {
          import(/* webpackPrefetch: true */ /* webpackChunkName: 'monaco/types' */ '!!raw-loader!../uikit.d.ts').then(
            ({ default: DTS }) => monaco.languages.typescript.javascriptDefaults.addExtraLib(DTS, 'file:///global.d.ts')
          )
        } catch (e) {
          // duplicate lib error.
        }
      }}
      editorWillMount={monaco => {
        const uri = monaco.Uri.parse(`file:///example.jsx`)

        if (monaco.editor.getModel(uri)) {
          monaco.editor.getModel(uri).dispose()
        }

        const model = monaco.editor.createModel(source, 'javascript', uri)

        return {
          model,
          minimap: {
            enabled: false
          },
          automaticLayout: true,
          formatOnPaste: true,
          fontSize: 16,
          lineHeight: 24,
          renderWhitespace: 'all',
          scrollBeyondLastLine: false,
          scrollBeyondLastColumn: false,
          wordBasedSuggestions: false
        }
      }}
    />
  )
}

Editor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
}
