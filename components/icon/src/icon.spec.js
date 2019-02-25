import React from 'react'
import { shallow } from 'enzyme'
import Icon from './icon'

it('should render SVG icon', () => {
  const wrapper = shallow(<Icon name="alert" />)
  const svg = wrapper.find('use')

  expect(wrapper.find('use')).toHaveLength(1)
})

it('should render title with SVG icon', () => {
  const wrapper = shallow(<Icon name="alert" title="This is dangerous!" />)

  expect(wrapper.find('title').text()).toBe('This is dangerous!')
})
