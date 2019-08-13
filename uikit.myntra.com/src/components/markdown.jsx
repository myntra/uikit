import React, { useMemo } from 'react'
import marked from 'marked'

/* eslint-disable-next-line react/prop-types */
export default function Markdown({ children }) {
  const __html = useMemo(() => marked(children), [children])

  return <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html }} />
}
