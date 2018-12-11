/* eslint-disable node/no-extraneous-import  */
import React from 'react'
import * as patterns from '@myntra/uikit-patterns'
import RenderComponents from './_app/RenderComponents'

export default function ComponentPatterns(props) {
  return (
    <RenderComponents
      {...props}
      packageName="@myntra/uikit-patterns"
      examples={name => import(`@myntra/uikit-patterns/src/${name}.md`)}
      components={patterns}
    />
  )
}
