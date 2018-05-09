import React from 'react'
import { shallow, mount } from 'enzyme'

import Button from './Button'
import Icon from '../Icon/Icon'

it('should render correct tag', () => {
  expect(shallow(<Button />).is('button')).toBe(true)
  expect(shallow(<Button href="/foo" />).is('a')).toBe(true)
  expect(shallow(<Button to="/foo" />).is(Button.RouterLink)).toBe(true)
})

it('should prefer `to` over `href`', () => {
  expect(shallow(<Button to="/foo" href="/foo" />).is(Button.RouterLink)).toBe(true)
})

it('should render primary icon', () => {
  const w = shallow(<Button icon="name" />)

  expect(w.find('.left')).toHaveLength(1)

  expect(
    w
      .find(Icon)
      .at(0)
      .props().name
  ).toBe('name')
})

it('should render secondary icon', () => {
  const w = shallow(<Button secondaryIcon="name" />)

  expect(w.find('.right')).toHaveLength(1)

  expect(
    w
      .find(Icon)
      .at(0)
      .props().name
  ).toBe('name')
})

it('should render label as children', () => {
  expect(shallow(<Button label="foo" />).text()).toBe('foo')
})

it('should render children', () => {
  expect(shallow(<Button>foo</Button>).text()).toBe('foo')
})

it('should prefer children over label', () => {
  expect(shallow(<Button label="bar">foo</Button>).text()).toBe('foo')
})

it('should forward props to defined RouterLink', () => {
  expect(
    mount(<Button to="/foo" data-custom-prop="foo" />)
      .find('a')
      .at(0)
      .getDOMNode()
      .getAttribute('data-custom-prop')
  ).toBe('foo')
})

it('should call onClick handler on click', () => {
  const handler = jest.fn()
  const wrapper = mount(<Button onClick={handler} />)

  wrapper.find('button').simulate('click')

  expect(handler).toHaveBeenCalled()
})

it('should ignore click events if no click handler', () => {
  const wrapper = mount(<Button onClick={null} />)

  wrapper.find('button').simulate('click')
})

it('should ignore click event if disabled', () => {
  const handler = jest.fn()
  const preventDefault = jest.fn()
  const wrapper = mount(<Button disabled onClick={handler} />)

  wrapper.simulate('click')

  expect(handler).not.toHaveBeenCalled()
  handler.mockClear()

  wrapper.instance().handleClick({ preventDefault }) // enzyme cannot send event on disabled button.
  expect(handler).not.toHaveBeenCalled()
  expect(preventDefault).toHaveBeenCalled()
})
