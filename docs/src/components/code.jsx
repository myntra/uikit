import React, { useState, useMemo, useEffect } from 'react'
import MonacoEditor from 'react-monaco-editor'
import { transform } from '@babel/standalone'
import Preview from './preview'
import DTS from '!!raw-loader!../uikit.d.ts'

let installedTypes = false

export default function Code({ preview = false, editor = false, language, tag, children }) {
  const [source, setSource] = useState(children)
  const [component, setComponent] = useState(null)
  const [workingComponent, setWorkingComponent] = useState(null)
  const [error, setError] = useState(null)

  if (editor) preview = editor

  useEffect(
    () => {
      if (preview) {
        try {
          const fn = compile(source)
          if (fn) {
            setComponent(() => fn)
            if (!workingComponent) setWorkingComponent(() => fn)
          }
          if (error !== null) setError(null)
        } catch (error) {
          setError(error)
          setComponent(() => workingComponent)
        }
      }
    },
    [source]
  )

  return (
    <div>
      {preview ? <Preview component={component} onError={setError} /> : null}
      {error ? (
        <div>
          {error.message}
          <pre>{error.stack}</pre>
        </div>
      ) : null}
      {editor ? (
        <MonacoEditor
          language="javascript"
          value={source}
          height="240"
          onChange={source => setSource(source)}
          editorDidMount={(editor, monaco) => {
            editor.getModel().updateOptions({
              tabSize: 2
            })

            monaco.languages.typescript.javascriptDefaults.setCompilerOptions({ noLib: true, allowNonTsExtensions: true });
            if (!installedTypes) {
              installedTypes = true
              monaco.languages.typescript.javascriptDefaults.addExtraLib(
                DTS,
                'file:///global.d.ts'
              )
            }
          }}
          editorWillMount={monaco => {
            return {
              model: monaco.editor.createModel(source, 'javascript', monaco.Uri.parse('file:///example.jsx')),
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
      ) : (
        <pre>
          <code>{children}</code>
        </pre>
      )}
    </div>
  )
}

function compile(code) {
  code = code.trim()

  if (!code) return null

  if (!code.startsWith('function ') && !code.startsWith('class ')) {
    code = `function Example(props) {\n  ${/\breturn\b/.test(code) ? code : code.replace(/<(?:[A-Z]|>)/, tag => `return ` + tag)}\n}`
  }

  const identifiers = []
  let output
  try {
    output = transform(code, {
      presets: ['es2017', 'react'],
      plugins: [unknownIdentifierPlugin(identifiers)]
    })
  } catch (e) {
    return null
  }

  if (identifiers.length) {
    code = output.code.trim()

    if (code.startsWith('function ')) {
      let [, name, args, body] = /^function\s+([^\(]+)\(([^\)]*)\)[^\{]*\{((?:.|\n)*)$/.exec(code)

      args = `props`

      code = `function ${name}(props) {\n  const { ${identifiers.join(', ')} } = props.context\n${body}`
    } else if (code.startsWith('class ')) {
      const [prefix, suffix] = code.split(/render\s*\([^\)]*\)[^\{}]*\{/, 2)

      code = `${prefix}\n  render() {\n    const { ${identifiers.join(', ')} } = this.props.context\n${suffix}`
    }
  }

  return new Function('React', `return ${code}`)(React)
}

function isApplePlatform() {
  return window && window.navigator && window.navigator.platform
    ? window.navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i)
      ? true
      : false
    : true
}

/**
 * @param {string[]} identifiers
 */
function unknownIdentifierPlugin(identifiers) {
  return {
    visitor: {
      JSXIdentifier(path) {
        const name = path.node.name
        if (/^[A-Z]/.test(name)) {
          if (!identifiers.includes(name) && name !== 'React') {
            identifiers.push(name)
          }
        }
      },
      Identifier(path) {
        const name = path.node.name
        if (/^use[A-Z]/.test(name)) {
          if (!identifiers.includes(name)) {
            identifiers.push(name)
          }
        }
      }
    }
  }
}
