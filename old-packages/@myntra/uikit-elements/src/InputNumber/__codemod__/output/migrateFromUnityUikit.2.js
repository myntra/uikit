import React from 'react'
import Input from 'unity-uikit/Input'
import { InputNumber } from '@myntra/uikit'

export default function MyComponent(props) {
  return (
    <div>
      <Input type="text" readOnly {...props} />
      <InputNumber required {...props} />
      <InputNumber disabled {...props} />
    </div>
  )
}
