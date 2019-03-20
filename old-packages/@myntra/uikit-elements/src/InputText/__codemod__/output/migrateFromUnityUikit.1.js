import React from 'react'
import Input from 'unity-uikit/Input'

import { InputText } from '@myntra/uikit'

export default function MyComponent(props) {
  return (
    <div>
      <InputText readOnly {...props} />
      <InputText type="email" readOnly {...props} />
      <InputText type="url" readOnly {...props} />
      <InputText type="password" readOnly {...props} />
      <InputText type="tel" readOnly {...props} />
      <Input type="number" required {...props} />
    </div>
  )
}
