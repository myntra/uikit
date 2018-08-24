import React from 'react'
import { mount } from 'enzyme'
import FormHelpText from './FormHelpText'

describe('Form HelpText component', () => {
  const formHelpText = mount(<FormHelpText>Info</FormHelpText>)

  it('should render text of type info', () => {
    expect(formHelpText.find('.helptext').text()).toEqual('Info')
  })

  it('should render error text if prop type is error', () => {
    formHelpText.setProps({ type: 'error' })
    expect(formHelpText.find('.helptext-error').text()).toEqual('Info')
  })
})
