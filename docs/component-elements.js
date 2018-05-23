import React from 'react'
import * as elements from '@myntra/uikit-elements'
import RenderComponents from './_app/RenderComponents'

export default function ComponentElements(props) {
  return (
    <RenderComponents
      {...props}
      meta={name => import(`@myntra/uikit-elements/dist/${name}.json`)}
      packageName="@myntra/uikit-elements"
      examples={name => import(`@myntra/uikit-elements/src/${name}/${name}.md`)}
      components={elements}
    />
  )
}
