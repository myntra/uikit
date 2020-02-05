import React from 'react'
import { mount } from 'enzyme'

import InputAzureFile from './input-azure-file'
import InputText from '@myntra/uikit-component-input-text'

describe('InputAzureFile', () => {
  it('is a component', () => {
    expect(InputAzureFile).toBeComponent()
  })

  it('should render the component', () => {
    const wrapper = mount(<InputAzureFile />)
    expect(wrapper.find(InputText)).toHaveLength(1)
    expect(wrapper.find('[data-test-id="target"]')).toHaveLength(1)
  })
})
