import React, { useContext } from 'react'
import CodePreview from './code-preview'
import { EditorContext } from './editor'
import Button from '@uikit/button'
import Prism from 'prismjs'

import 'prismjs/themes/prism.css'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-jsx'

import './code.css'

export default function Code({ preview = false, align = 'center', children: source, language = 'jsx' }) {
  const context = useContext(EditorContext)

  return (
    <div className={`code--container ${preview ? `code--align-${align}` : ''}`}>
      {<Button className="code--edit" icon="code" title="Open in editor" onClick={() => context.setSource(source)} />}
      {preview ? (
        <CodePreview source={source} />
      ) : (
        <pre style={{ overflow: 'unset' }}>
          <code dangerouslySetInnerHTML={{__html: Prism.highlight(source, Prism.languages[language], language) }} />
        </pre>
      )}
    </div>
  )
}
