import React from 'react'
import { mount } from 'enzyme'
import Tabs from './Tabs'
import Tab from './Tab'

function prepareForTest(props) {
  return mount(
    <Tabs {...props}>
      <Tab title={<div className="title">1</div>}>one body</Tab>
      <Tab title={<div className="title">2</div>}>two body</Tab>
      <Tab title={<div className="title">3</div>}>three body</Tab>
    </Tabs>
  )
}

it('should render all titles', () => {
  const text = prepareForTest().text()

  expect(text).toEqual(expect.stringContaining('1'))
  expect(text).toEqual(expect.stringContaining('2'))
  expect(text).toEqual(expect.stringContaining('3'))
})

it('should expand first item', () => {
  const text = prepareForTest()
    .find('.content')
    .text()

  expect(text).toEqual(expect.stringContaining('one body'))
  expect(text).not.toEqual(expect.stringContaining('two body'))
  expect(text).not.toEqual(expect.stringContaining('three body'))
})

it('should expand second item', () => {
  const spy = jest.fn()
  const wrapper = prepareForTest({ activeIndex: 1, onChange: spy })
  const text = wrapper.find('.content').text()

  expect(text).not.toEqual(expect.stringContaining('one body'))
  expect(text).toEqual(expect.stringContaining('two body'))
  expect(text).not.toEqual(expect.stringContaining('three body'))
  expect(spy).not.toHaveBeenCalled()

  wrapper
    .find('Tab')
    .last()
    .simulate('click')

  expect(spy).toHaveBeenCalled()
})

it('should expand invalid item', () => {
  const wrapper = prepareForTest({ activeIndex: -1, onChange: jest.fn() })
  const text = wrapper.find('.content').text()

  expect(text).toEqual(expect.stringContaining('one body'))
  expect(text).not.toEqual(expect.stringContaining('two body'))
  expect(text).not.toEqual(expect.stringContaining('three body'))
})

it('should work without props', done => {
  const wrapper = prepareForTest()
  const text = wrapper.text()

  expect(text).toEqual(expect.stringContaining('one body'))
  expect(text).not.toEqual(expect.stringContaining('two body'))
  expect(text).not.toEqual(expect.stringContaining('three body'))

  wrapper
    .find('.title')
    .last()
    .simulate('click')

  setTimeout(() => {
    const text = wrapper.text()

    expect(text).not.toEqual(expect.stringContaining('one body'))
    expect(text).not.toEqual(expect.stringContaining('two body'))
    expect(text).toEqual(expect.stringContaining('three body'))
    done()
  }, 360)
})

it('should enforce onChange prop when active prop is used', () => {
  const spy = jest.spyOn(console, 'error').mockImplementation(() => {})
  prepareForTest({ active: 1 })
  expect(spy).toHaveBeenCalledWith(expect.stringContaining('`onChange` prop is required'))
})

it('should enforce child nodes to be Tab', () => {
  const spy = jest.spyOn(console, 'error').mockImplementation(() => {})
  mount(
    <Tabs>
      <div />
      <div />
    </Tabs>
  )
  expect(spy).toHaveBeenCalledWith(expect.stringContaining('Only `Tab` is allowed'))
})
