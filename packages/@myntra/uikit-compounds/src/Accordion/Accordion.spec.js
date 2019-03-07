import React from 'react'
import { mount } from 'enzyme'
import Accordion from './Accordion'
import AccordionItem from './AccordionItem'

function prepareForTest(props) {
  return mount(
    <div>
      <Accordion {...props}>
        <AccordionItem title={<div className="title">1</div>}>one body</AccordionItem>
        <AccordionItem title={<div className="title">2</div>}>two body</AccordionItem>
        <AccordionItem title={<div className="title">3</div>}>three body</AccordionItem>
      </Accordion>
    </div>
  )
}

it('should render all titles', () => {
  const text = prepareForTest().text()

  expect(text).toEqual(expect.stringContaining('1'))
  expect(text).toEqual(expect.stringContaining('2'))
  expect(text).toEqual(expect.stringContaining('3'))
})

it('should expand first item', () => {
  const text = prepareForTest().text()

  expect(text).toEqual(expect.stringContaining('one body'))
  expect(text).not.toEqual(expect.stringContaining('two body'))
  expect(text).not.toEqual(expect.stringContaining('three body'))
})

it('should expand second item', () => {
  const spy = jest.fn()
  const wrapper = prepareForTest({ active: 1, onChange: spy })
  const text = wrapper.text()

  expect(text).not.toEqual(expect.stringContaining('one body'))
  expect(text).toEqual(expect.stringContaining('two body'))
  expect(text).not.toEqual(expect.stringContaining('three body'))
  expect(spy).not.toHaveBeenCalled()

  wrapper
    .find('.title')
    .last()
    .simulate('click')

  expect(spy).toHaveBeenCalled()
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
