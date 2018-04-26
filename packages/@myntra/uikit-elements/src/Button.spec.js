import React from 'react'
import { shallow } from 'enzyme'

import Button from './Button'
import Icon from './Icon'

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
