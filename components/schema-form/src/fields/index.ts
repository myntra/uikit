import React from 'react'

const Field = React.lazy(() => import('./field'))
const FieldArray = React.lazy(() => import('./array'))
const FieldObject = React.lazy(() => import('./object'))

export default {
  field: Field,
  array: FieldArray,
  object: FieldObject,
}
