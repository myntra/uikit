/* eslint-disable node/no-extraneous-import  */
import React from 'react'
import * as patterns from '@myntra/uikit-patterns'
import RenderComponents from './_app/RenderComponents'

export default function ComponentPatterns(props) {
  return (
    <RenderComponents
      {...props}
      meta={name => () => import(`@myntra/uikit-patterns/dist/${name}.json`)}
      packageName="@myntra/uikit-patterns"
      examples={name => () => import(`@myntra/uikit-patterns/src/${name}/${name}.md`)}
      components={patterns}
    />
  )
}
