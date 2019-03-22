import React, { useState, useMemo, useEffect, useContext } from 'react'
import { transform } from '@babel/standalone'
import Preview from './preview'
import { EditorContext } from './editor'
import Alert from '@uikit/alert'
import Button from '@uikit/button'
import './code-preview.css'

export function useCompiler(source, { watch = true, once = true } = {}) {
  const [component, setComponent] = useState(null)
  const [fallback, setFallback] = useState(null)
  const [error, setError] = useState(null)
  const [counter, setCounter] = useState(0)

  useEffect(
    function compileOnSourceChange() {
      if (watch || (counter === 0 && once)) {
        setCounter(counter + 1)
        try {
          const component = compile(source)

          if (component) {
            const factory = () => component
            setComponent(factory)
            if (!fallback) setFallback(factory)
            setError(null)
          } else if (source) {
            throw new Error(`No component returned by 'compiler'`)
          }
        } catch (error) {
          console.error(error)
          setError(() => error)
        }
      }
    },
    [source]
  )

  function clearError() {
    setError(null)
  }

  return error ? [fallback, error, clearError] : [component, error, clearError]
}

export default function CodePreview({ className, source }) {
  const [component, compilerError, clearError] = useCompiler(source)
  const [error, setError] = useState(null)
  const [key, setKey] = useState(0)

  useEffect(
    function onCompilerErrorChange() {
      if (!compilerError) setError(null)
    },
    [compilerError]
  )

  return (
    <div className={className}>
      {<Button className="code-preview--refresh" icon="sync" title="Refresh" onClick={() => setKey(key + 1)} />}
      {<Preview key={key} component={component} onError={setError} />}
      {compilerError && (
        <Alert type="error" onClose={clearError}>
          {compilerError.message}
        </Alert>
      )}
      {error && (
        <Alert type="error" onClose={() => setError(null)}>
          {error.message}
          <pre>{error.stack}</pre>
        </Alert>
      )}
    </div>
  )
}

function compile(code) {
  if (!code) return null

  code = code.trim()

  if (!code.startsWith('function ') && !code.startsWith('class ')) {
    code = `function Example(props) {\n  ${
      /\breturn\b/.test(code) ? code : code.replace(/<(?:[A-Za-z0-9\.]+(?: [^>]*)?|>)/, tag => `return ` + tag)
    }\n}`
  }

  const identifiers = []
  const output = transform(code, {
    presets: ['es2017', 'react'],
    plugins: [unknownIdentifierPlugin(identifiers)]
  })

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
  } else {
    code = output.code
  }

  const fn = new Function('React', `${code}\nreturn Example`)

  return fn(React)
}

/**
 * @param {string[]} identifiers
 */
function unknownIdentifierPlugin(identifiers) {
  return {
    visitor: {
      JSXOpeningElement(path) {
        const { node, scope } = path

        const name = node.name.object ? node.name.object.name : node.name.name
        const binding = scope.getBinding(name)

        if (!binding) {
          if (/^[A-Z]/.test(name)) {
            if (!identifiers.includes(name) && name !== 'React') {
              identifiers.push(name)
            }
          }
        }
      },
      Identifier(path) {
        const { node, scope } = path

        const name = path.node.name
        const binding = scope.getBinding(name)

        if (!binding) {
          if (/^use[A-Z]/.test(name)) {
            if (!identifiers.includes(name)) {
              identifiers.push(name)
            }
          }
        }
      }
    }
  }
}
