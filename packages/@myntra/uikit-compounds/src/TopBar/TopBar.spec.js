import React from 'react'
import { mount } from 'enzyme'
import TopBar from './TopBar'
import BreadCrumb from '../BreadCrumb/BreadCrumb.jsx'

it('renders a div tag with class head', () => {
  const wrapper = mount(<TopBar title={'Partners'} />)
  expect(wrapper.find('.head')).toHaveLength(1)
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

it('should render slots in middle with remaining width', () => {
  const wrapper = mount(
    <TopBar title={'Partners'}>
      <a href="link">link</a>
      <TopBar.Item icon={'user'} onClick={() => {}} altText={'hello'} />
    </TopBar>
  )
  expect(
    wrapper
      .find('.embeds')
      .find('a')
      .at(0)
      .prop('href')
  ).toEqual('link')
})

it('should render Icons in content-right', () => {
  const wrapper = mount(
    <TopBar title={'Partners'} slot={<a href="link">link</a>}>
      <TopBar.Item icon={'user'} className={'my-class'} onClick={() => {}} altText={'hello'}>
        <a href="link">link</a>
      </TopBar.Item>
    </TopBar>
  )

  expect(
    wrapper
      .find('.content-right')
      .find('a')
      .at(0)
      .prop('href')
  ).toEqual('link')
})

it('should render Breadcrumbs & title in content-left', () => {
  const wrapper = mount(
    <TopBar title={'Partners'}>
      <BreadCrumb>
        <BreadCrumb.Item>
          <a href="link">Second</a>
        </BreadCrumb.Item>
      </BreadCrumb>
    </TopBar>
  )
  expect(
    wrapper
      .find('.content-left')
      .find('.title')
      .text()
  ).toBe('Partners')
  expect(
    wrapper
      .find('.content-left')
      .find('a')
      .at(0)
      .prop('href')
  ).toEqual('link')
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

it('should render components other than crumb and item inside embeds', () => {
  const wrapper = mount(
    <TopBar title={'Partners'}>
      <a href="link">a</a>
    </TopBar>
  )
  expect(
    wrapper
      .find('.embeds')
      .find('a')
      .at(0)
      .prop('href')
  ).toEqual('link')
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
