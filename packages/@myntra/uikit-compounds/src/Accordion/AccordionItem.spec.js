import React from 'react'
import { mount } from 'enzyme'
import AccordionItem from './AccordionItem'

function prepareForTest(props) {
  return mount(
    <AccordionItem {...props} title={<div className="title">Title</div>}>
      <div className="body">Body</div>
    </AccordionItem>
  )
}

it('should render title', () => {
  expect(
    prepareForTest()
      .find('.title')
      .get(0)
  ).toBeTruthy()
})

it('should always render title', () => {
  expect(
    prepareForTest({ show: false })
      .find('.title')
      .get(0)
  ).toBeTruthy()
})

it('should forward props as attrs', () => {
  expect(
    prepareForTest({ className: 'foo' })
      .find('.foo')
      .get(0)
  ).toBeTruthy()
})

it('should hide body content', () => {
  expect(
    prepareForTest()
      .find('.body')
      .get(0)
  ).toBeFalsy()
})

it('should show body content', () => {
  expect(
    prepareForTest({ show: true })
      .find('.body')
      .get(0)
  ).toBeTruthy()
})

it('should trigger onClick', () => {
  const spy = jest.fn()
  const wrapper = prepareForTest({ onClick: spy })

  wrapper.find('.title').simulate('click')

  expect(spy).toHaveBeenCalled()
})

it('should transition body exit', done => {
  const wrapper = prepareForTest({ show: true })

  expect(wrapper.find('.body').get(0)).toBeTruthy()

  wrapper.setProps({ show: false })

  expect(wrapper.find('.body').get(0)).toBeTruthy()

  setTimeout(() => {
    expect(wrapper.html()).not.toEqual(expect.stringContaining('class="body"'))
    expect(wrapper.html()).toMatchSnapshot()
    done()
  }, 360)
})
