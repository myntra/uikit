/* eslint-disable node/no-extraneous-import  */
import React from 'react'
import * as compounds from '@myntra/uikit-compounds'
import RenderComponents from './_app/RenderComponents'

export default function ComponentCompounds(props) {
  return (
    <RenderComponents
      {...props}
      packageName="@myntra/uikit-compounds"
      examples={name => import(`@myntra/uikit-compounds/src/${name}.md`)}
      components={compounds}
    />
  )
}
