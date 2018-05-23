import React from 'react'
import * as internals from '@myntra/uikit-internals'
import RenderComponents from './_app/RenderComponents'

export default function ComponentInternals(props) {
  return (
    <RenderComponents
      {...props}
      meta={name => () => import(`@myntra/uikit-internals/dist/${name}.json`)}
      packageName="@myntra/uikit-internals"
      examples={name => () => import(`@myntra/uikit-internals/src/${name}/${name}.md`)}
      components={internals}
    />
  )
}
