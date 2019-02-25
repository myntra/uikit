import React from 'react'
import { InputSelect, interopPropTransformer } from '@myntra/uikit'

const interopPropTransformerInputSelect$0 = interopPropTransformer(
  {
    filterOption: 'filterOptions',
    multi: 'multiple',
    noResultsText: 'noResultsPlaceholder',
    onInputChange: 'onSearch'
  },
  {}
)

export default props => (
  <div>
    My Select Box
    <InputSelect {...interopPropTransformerInputSelect$0(props)} />
  </div>
)
