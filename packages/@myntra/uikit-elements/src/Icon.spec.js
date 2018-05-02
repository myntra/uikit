import React from 'react'
import { mount } from 'enzyme'
import Icon from './Icon'

it('should render SVG icon', done => {
  const wrapper = mount(<Icon name="alert" />)

  setTimeout(() => {
    const span = wrapper.find('span')
    expect(span.getDOMNode().className).toBe('icon')
    expect(span.children).toHaveLength(1)
    expect(span.html()).toMatchSnapshot()
    done()
  }, 250)
})

it('should render placeholder icon until icon is loaded', () => {
  const wrapper = mount(<Icon name="xxxxx" />)

  expect(wrapper.find('span').getDOMNode().className).toBe('icon loading')
})

it('should render placeholder icon for missing SVG', done => {
  const wrapper = mount(<Icon name="xxxxxxxxxxxx" />)

  setTimeout(() => {
    expect(wrapper.find('span').getDOMNode().className).toBe('icon unknown')
    done()
  }, 50)
})
