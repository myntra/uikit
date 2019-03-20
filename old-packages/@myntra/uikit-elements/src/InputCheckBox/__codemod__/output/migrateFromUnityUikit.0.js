import React from 'react'
import { InputCheckBox, interopPropTransformer } from '@myntra/uikit'

const interopPropTransformerInput$0 = interopPropTransformer(
  {
    value: 'htmlValue',
    checked: 'value'
  },
  {}
)

export default function MyComponent(props) {
  return <InputCheckBox {...interopPropTransformerInput$0(props)} />
}
