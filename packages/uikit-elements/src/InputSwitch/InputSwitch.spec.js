import React from 'react'
import { shallow } from 'enzyme'

import InputSwitch from './InputSwitch'

it('should call onChange handler on change', () => {
  const handler = jest.fn()
  const wrapper = shallow(<InputSwitch onChange={handler} />)
  wrapper.find('input').simulate('change', { target: { checked: true } })
  expect(handler).toHaveBeenCalled()
})

it('should ignore change events if no change handler', () => {
  const wrapper = shallow(<InputSwitch onChange={null} />)
  wrapper.find('input').simulate('change')
})
