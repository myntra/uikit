import React from 'react'
import { mount } from 'enzyme'
import TopBar from './TopBar'

it('renders a div tag with class head', () => {
  const wrapper = mount(<TopBar title={'Partners'} />)
  expect(
    wrapper
      .find('div')
      .at(0)
      .hasClass('head')
  ).toBe(true)
})

it('renders title properly', () => {
  const wrapper = mount(<TopBar title={'Partners'} />)
  expect(wrapper.find('.title').text()).toBe('Partners')
})

it('should render Item if passed as children', () => {
  const wrapper = mount(
    <TopBar title={'Partners'}>
      <TopBar.Item icon={'user'} onClick={() => {}} altText={'hello'} />
    </TopBar>
  )
  expect(wrapper.find('.item')).toHaveLength(1)
})

it('should call onClick for menu item', () => {
  const handler = jest.fn()
  const wrapper = mount(
    <TopBar title={'Partners'}>
      <TopBar.Item icon={'user'} onClick={handler} altText={'hello'} />
    </TopBar>
  )
  wrapper
    .find('.item')
    .at(0)
    .simulate('click')
  expect(handler).toHaveBeenCalled()
})

it('menu item should render children', () => {
  const handler = jest.fn()
  const wrapper = mount(
    <TopBar title={'Partners'}>
      <TopBar.Item icon={'user'} onClick={handler} altText={'hello'}>
        <a className="test-class">test</a>
      </TopBar.Item>
    </TopBar>
  )
  expect(
    wrapper
      .find('.item')
      .at(0)
      .find('a')
      .at(0)
      .hasClass('test-class')
  ).toBe(true)
})
