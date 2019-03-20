import React from 'react'
import { Alert } from '@myntra/uikit'

export default props => (
  <div>
    Toast here
    <Alert type={'error'}>{'Not Found'}</Alert>
    <Alert type={'error'}>{'Not Found' + 'Again'}</Alert>
  </div>
)


