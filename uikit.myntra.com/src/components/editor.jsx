import React, { createContext } from 'react'
import PropTypes from 'prop-types'

const MonacoEditor = React.lazy(() =>
  import(
    /* webpackPrefetch: true */
    /* webpackChunkName: 'monaco/editor' */ 'react-monaco-editor'
  ).then(result => {
    setupMonacoEnvironment()

    return result
  })
)

function setupMonacoEnvironment() {
  function testSameOrigin(url) {
    const loc = window.location
    const a = document.createElement('a')
    a.href = url
    return a.hostname === loc.hostname && a.port === loc.port && a.protocol === loc.protocol
  }

  const MonacoEnvironment = window.MonacoEnvironment

  window.MonacoEnvironment = {
    ...MonacoEnvironment,
    getWorkerUrl: (moduleId, label) => {
      const workerUrl = MonacoEnvironment.getWorkerUrl(moduleId, label)
      if (testSameOrigin(workerUrl)) return workerUrl

      let blob

      try {
        blob = new Blob([`importScripts('${workerUrl}');`], { type: 'application/javascript' })
      } catch (e1) {
        const blobBuilder = new (window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder)()
        blobBuilder.append(`importScripts('${workerUrl}');`)
        blob = blobBuilder.getBlob('application/javascript')
      }
      const url = window.URL || window.webkitURL
      const blobUrl = url.createObjectURL(blob)

      return blobUrl
    }
  }
}

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
