import React from 'react'
import { shallow } from 'enzyme'
import FormAction from './FormAction'

function prepareForTest(props) {
  return shallow(<FormAction {...props} />)
}

it('should render primary button', () => {
  const wrapper = prepareForTest({ type: 'primary' })

  expect(wrapper.prop('type')).toBe('primary')
  expect(wrapper.prop('htmlType')).toBe('submit')
  expect(wrapper.hasClass('primary')).toBeTruthy()
})

it('should render secondary button by default', () => {
  const wrapper = prepareForTest()

  expect(wrapper.prop('type')).toBe('secondary')
  expect(wrapper.prop('htmlType')).toBe('button')
  expect(wrapper.hasClass('primary')).toBeFalsy()
})

it('should preserve button type', () => {
  const wrapper = prepareForTest({ type: 'link' })

  expect(wrapper.prop('type')).toBe('link')
  expect(wrapper.prop('htmlType')).toBe('button')
  expect(wrapper.hasClass('primary')).toBeFalsy()
})
