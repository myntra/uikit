import React from 'react'
import { shallow } from 'enzyme'
import Icon from './Icon'

it('should render SVG icon', () => {
  const wrapper = shallow(<Icon name="alert" />)
  const svg = wrapper.find('svg')

  expect(svg.html()).toMatchSnapshot()
})

it('should render title with SVG icon', () => {
  const wrapper = shallow(<Icon name="alert" title="This is dangerous!" />)
  const svg = wrapper.find('svg')

  expect(svg.html()).toMatchSnapshot()
})
