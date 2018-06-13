import React from 'react'
import { shallow } from 'enzyme'
import InputCheckBox from './InputCheckBox'

it('should call onChange handler on change', () => {
  const handler = jest.fn()
  const wrapper = shallow(<InputCheckBox onChange={handler} />)
  wrapper.find('input').simulate('change', { target: { checked: true } })
  expect(handler).toHaveBeenCalled()
})

it('should ignore change events if no change handler', () => {
  const wrapper = shallow(<InputCheckBox onChange={null} />)
  wrapper.find('input').simulate('change')
})
