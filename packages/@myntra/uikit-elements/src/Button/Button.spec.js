import React from 'react'
import { shallow, mount } from 'enzyme'
import { testCodeMod } from '@myntra/codemod-utils'

import Button from './Button'
import Icon from '../Icon/Icon'

testCodeMod(__dirname, 'Button.codemod.js')

it('should render correct tag', () => {
  expect(shallow(<Button />).is('button')).toBe(true)
  expect(shallow(<Button href="/foo" />).is('a')).toBe(true)
  expect(shallow(<Button to="/foo" />).is(Button.RouterLink)).toBe(true)
})

it('warn `to` and `href` should not be used', () => {
  const spy = jest
    .spyOn(console, 'error')
    .mockImplementation(message =>
      expect(message).toEqual(expect.stringContaining('`to` and `href` cannot be used together'))
    )
  expect(shallow(<Button to="/foo" href="/foo" />).is(Button.RouterLink)).toBe(true)
  expect(spy).toHaveBeenCalled()
  spy.mockReset()
  spy.mockRestore()
})

it('should render link with inherit color', () => {
  const w = shallow(<Button type="link.inherit" />)

  expect(w.hasClass('link')).toBe(true)
  expect(w.hasClass('inherit')).toBe(true)
})

it('should render primary icon', () => {
  const w = shallow(<Button icon="alert" />)

  expect(w.find('.left')).toHaveLength(1)

  expect(
    w
      .find(Icon)
      .at(0)
      .props().name
  ).toBe('alert')
})

it('should render secondary icon', () => {
  const w = shallow(<Button secondaryIcon="alert" />)

  expect(w.find('.right')).toHaveLength(1)

  expect(
    w
      .find(Icon)
      .at(0)
      .props().name
  ).toBe('alert')
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
