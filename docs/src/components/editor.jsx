import React, { useContext, createContext } from 'react'
import MonacoEditor from 'react-monaco-editor'
import DTS from '!!raw-loader!../uikit.d.ts'

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

        monaco.languages.typescript.javascriptDefaults.setCompilerOptions({ lib: true, allowNonTsExtensions: true });
        try {
          monaco.languages.typescript.javascriptDefaults.addExtraLib(
            DTS,
            'file:///global.d.ts'
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
          wordBasedSuggestions: false,
        }
      }}
    />
  )
}
