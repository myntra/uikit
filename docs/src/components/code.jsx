import React, { useContext, useState } from 'react'
import CodePreview from './code-preview'
import { EditorContext } from './editor'
import Button from '@uikit/button'

import './code.css'

export default function Code({ preview = false, language, tag, children: source }) {
  const context = useContext(EditorContext)

  return (
    <div className="code--container">
      {<Button className="code--edit" icon="code" title="Open in editor"  onClick={() => context.setSource(source)} />}
      {preview ? <CodePreview source={source} /> : <pre><code>{source}</code></pre>}
    </div>
  )
}
