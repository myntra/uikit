import React from 'react'
import { shallow } from 'enzyme'

import Grid from './Grid'

it('should render grid wrapper', () => {
  const wrapper = shallow(<Grid />)
  expect(wrapper.hasClass('columns')).toBe(true)
  expect(wrapper.html()).toMatchSnapshot()
})

it('should render columns centered', () => {
  const wrapper = shallow(<Grid centered />)

  expect(wrapper.hasClass('columns')).toBe(true)
  expect(wrapper.hasClass('centered')).toBe(true)
  expect(wrapper.html()).toMatchSnapshot()
})

it('should render columns vertically centered', () => {
  const wrapper = shallow(<Grid vcentered />)

  expect(wrapper.hasClass('columns')).toBe(true)
  expect(wrapper.hasClass('vcentered')).toBe(true)
  expect(wrapper.html()).toMatchSnapshot()
})

it('should render columns gapless', () => {
  const wrapper = shallow(<Grid gapless />)

  expect(wrapper.hasClass('columns')).toBe(true)
  expect(wrapper.hasClass('variable-gap')).toBe(true)
  expect(wrapper.hasClass('gap-none')).toBe(true)
  expect(wrapper.html()).toMatchSnapshot()
})

it('should wrap columns', () => {
  const wrapper = shallow(<Grid multiline />)

  expect(wrapper.hasClass('columns')).toBe(true)
  expect(wrapper.hasClass('multiline')).toBe(true)
  expect(wrapper.html()).toMatchSnapshot()
})

it('mixing props', () => {
  const wrapper = shallow(<Grid multiline gapless centered vcentered />)

  expect(wrapper.hasClass('columns')).toBe(true)
  expect(wrapper.hasClass('multiline')).toBe(true)
  expect(wrapper.hasClass('variable-gap')).toBe(true)
  expect(wrapper.hasClass('centered')).toBe(true)
  expect(wrapper.hasClass('vcentered')).toBe(true)
  expect(wrapper.html()).toMatchSnapshot()
})

it('custom gap', () => {
  const wrapper = shallow(<Grid gap="none" />)

  expect(wrapper.hasClass('columns')).toBe(true)
  expect(wrapper.hasClass('variable-gap')).toBe(true)
  expect(wrapper.hasClass('gap-none')).toBe(true)
  expect(wrapper.html()).toMatchSnapshot()
})
