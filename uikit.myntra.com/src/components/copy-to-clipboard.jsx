import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'

import { Icon } from '@myntra/uikit'
import Copy from '@myntra/uikit-pro-icons/svgs/Copy'

export default function CopyToClipboard({ content, children }) {
  const [isCopied, setCopied] = useState(false)
  const handleCopy = useCallback(() => {
    const activeElement = document.activeElement

    const element = document.createElement('textarea')

    element.style.position = 'fixed'
    element.style.width = '1px'
    element.style.height = '1px'
    element.style.top = '-1000px'
    element.style.left = '-1000px'
    element.value = content

    document.body.appendChild(element)

    element.select()
    document.execCommand('copy')
    document.body.removeChild(element)

    setCopied(true)
    setTimeout(() => setCopied(false), 1000)

    if (activeElement) activeElement.focus && activeElement.focus()
  })

  return (
    <>
      <Icon
        name={Copy}
        title={isCopied ? 'Copied' : 'Copy'}
        onClick={handleCopy}
        style={{ cursor: 'pointer', marginRight: '0.5rem' }}
      />
      {children}
    </>
  )
}

CopyToClipboard.propTypes = {
  content: PropTypes.string.isRequired,
  children: PropTypes.any
}
