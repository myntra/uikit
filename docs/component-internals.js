/* eslint-disable node/no-extraneous-import  */
import React from 'react'
import * as internals from '@myntra/uikit-internals'
import RenderComponents from './_app/RenderComponents'

export default function ComponentInternals(props) {
  return (
    <RenderComponents
      {...props}
      packageName="@myntra/uikit-internals"
      examples={name => () => import(`@myntra/uikit-internals/src/${name}.md`)}
      components={internals}
    />
  )
}
