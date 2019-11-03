import React from 'react'
import { mount } from 'enzyme'

import InputFile from './input-file'
import InputText from '@myntra/uikit-component-input-text'
import Button from '@myntra/uikit-component-button'

describe('input-file', () => {
  it('is a component', () => {
    expect(InputFile).toBeComponent()
  })

  it('should render the component', () => {
    const wrapper = mount(<InputFile />)
    expect(wrapper.find('div.input-file')).toHaveLength(1)
    expect(wrapper.find(InputText)).toHaveLength(1)
    expect(wrapper.find(Button)).toHaveLength(1)
  })
  it('should call the onChange on uploading a file', () => {
    const handler = jest.fn()
    const wrapper = mount(<InputFile onChange={handler} />)
    wrapper
      .find('input')
      .at(1)
      .simulate('change', { target: { files: ['dummyValue.something'] } })
    expect(handler).toHaveBeenCalled()
  })
})
