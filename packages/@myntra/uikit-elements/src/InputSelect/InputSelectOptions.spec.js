import React from 'react'
import { mount } from 'enzyme'
import InputSelectOptions from './InputSelectOptions'

describe('InputSelect.Options', () => {
  it('renders', () => {
    expect(() => mount(<InputSelectOptions options={[]} noResultsPlaceholder="No results" />)).not.toConsoleError()
  })
})
