import React from 'react'
import Input from 'unity-uikit/Input'

export default function MyComponent(props) {
  return <div>
    <Input type="text" readOnly {...props} />
    <Input type="email" readOnly {...props} />
    <Input type="url" readOnly {...props} />
    <Input type="password" readOnly {...props} />
    <Input type="tel" readOnly {...props} />
    <Input type="number" required {...props} />
  </div>
}
