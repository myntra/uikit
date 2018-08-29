import React from 'react'
import { mount } from 'enzyme'
import { withFormGroup } from './FormGroup'
import FormHelpText from './FormHelpText'

describe('Form Group factory component', () => {
  const FormComponent = props => <div>Form Component</div>
  const FormGroup = withFormGroup(FormComponent)

  const formGroup = mount(<FormGroup label="Component" size="one-fifth" error="Error" description="Form component" />)

  it('should render label, Component and helptext', () => {
    expect(formGroup.find('.label').text()).toEqual('Component')

    expect(formGroup.find('FormComponent')).toHaveLength(1)
    expect(
      formGroup
        .find(FormHelpText)
        .at(0)
        .text()
    ).toEqual('Form component')

    expect(
      formGroup
        .find(FormHelpText)
        .at(1)
        .props().type
    ).toEqual('error')
    expect(
      formGroup
        .find(FormHelpText)
        .at(1)
        .text()
    ).toEqual('Error')
  })
})
