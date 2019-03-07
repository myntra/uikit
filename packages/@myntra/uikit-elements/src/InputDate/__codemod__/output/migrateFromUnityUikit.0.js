import React from 'react'
import { InputDate, interopPropTransformer } from '@myntra/uikit'

const interopPropTransformerDatePicker$0 = interopPropTransformer(
  {
    minDate: 'min',
    maxDate: 'max',
    disabledDates: 'disabledRanges'
  },
  {}
)

export default function MyComponent(props) {
  return <InputDate min="2018-06-05" {...interopPropTransformerDatePicker$0(props)} />
}
