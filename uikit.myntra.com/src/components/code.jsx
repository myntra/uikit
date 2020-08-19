import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import CodePreview from './code-preview'
import { EditorContext } from './editor'
import { Button } from '@myntra/uikit'
import Prism from 'prismjs'
/* eslint-disable import/no-named-default */
import { default as CodeIcon } from '@myntra/uikit-pro-icons/svgs/Code'

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
      {preview ? (
        <CodePreview source={source}>
          <Button icon={CodeIcon} title="Open in editor" onClick={() => context.setSource(source)} />
        </CodePreview>
      ) : (
        <pre style={{ overflow: 'unset' }}>
          <code dangerouslySetInnerHTML={{ __html: Prism.highlight(source, Prism.languages[language], language) }} />
        </pre>
      )}
    </div>
  )
}

Code.propTypes = {
  preview: PropTypes.bool,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  children: PropTypes.any,
  language: PropTypes.string
}
