import React from 'react'
import Prism from 'prismjs'

import 'prismjs/themes/prism.css'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-jsx'

import CodePreview from './code-preview'

export default function Code({ preview = false, align = 'center', children: source, language = 'jsx' }) {
  return (
    <div>
      {preview ? (
        <CodePreview source={source} />
      ) : (
        <pre style={{ overflow: 'unset' }}>
          <code dangerouslySetInnerHTML={{ __html: Prism.highlight(source, Prism.languages[language], language) }} />
        </pre>
      )}
    </div>
  )
}
