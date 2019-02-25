/* eslint-disable node/no-extraneous-import  */
import React from 'react'
import * as elements from '@myntra/uikit-elements'
import RenderComponents from './_app/RenderComponents'

export default function ComponentElements(props) {
  return (
    <RenderComponents
      {...props}
      packageName="@myntra/uikit-elements"
      examples={name => import(`@myntra/uikit-elements/src/${name}.md`)}
      components={elements}
    />
  )
}
