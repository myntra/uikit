import React from 'react'
import { mount } from 'enzyme'
import Measure from './Measure'

it('should measure', done => {
  mount(
    <Measure
      bounds
      client
      margin
      offset
      scroll
      onMeasure={value => {
        expect(Object.keys(value.bounds)).toEqual(['top', 'right', 'bottom', 'left', 'width', 'height'])
        expect(Object.keys(value.client)).toEqual(['top', 'left', 'width', 'height'])
        expect(Object.keys(value.margin)).toEqual(['top', 'right', 'bottom', 'left'])
        expect(Object.keys(value.offset)).toEqual(['top', 'left', 'width', 'height'])
        expect(Object.keys(value.scroll)).toEqual(['top', 'left', 'width', 'height'])
        done()
      }}
    >
      <textarea className="target" />
    </Measure>
  )
})

it('should measure only selected dimensions', done => {
  mount(
    <Measure
      bounds
      onMeasure={value => {
        expect(value.bounds).toBeTruthy()
        expect(value.client).toBeFalsy()
        expect(value.margin).toBeFalsy()
        expect(value.offset).toBeFalsy()
        expect(value.scroll).toBeFalsy()
        done()
      }}
    >
      <textarea className="target" />
    </Measure>
  )
})

it('should disconnect on unmount', () => {
  const wrapper = mount(
    <Measure onMeasure={value => {}}>
      <textarea className="target" />
    </Measure>
  )

  const spy = jest.spyOn(wrapper.instance()._observer, 'disconnect')
  const node = wrapper.instance()._node

  wrapper.unmount()

  expect(spy).toHaveBeenCalledWith(node)
})

it('should unmount without error', () => {
  const wrapper = mount(
    <Measure onMeasure={value => {}}>
      <textarea className="target" />
    </Measure>
  )

  const spy = jest.spyOn(wrapper.instance()._observer, 'disconnect')
  wrapper.instance()._node = null

  wrapper.unmount()

  expect(spy).not.toHaveBeenCalled()
})

it('should unobserve when child changes', () => {
  const wrapper = mount(
    <Measure onMeasure={value => {}}>
      <textarea className="target" />
    </Measure>
  )

  const spy = jest.spyOn(wrapper.instance()._observer, 'disconnect')
  const node = wrapper.instance()._node

  wrapper.setProps({ children: <div /> })

  expect(spy).toHaveBeenCalledWith(node)
})

it('should render functional child', () => {
  const wrapper = mount(
    <Measure bounds onMeasure={value => {}}>
      {({ content, ref }) => <textarea className="target" width={content.bounds.width} ref={ref} />}
    </Measure>
  )

  expect(wrapper.find('.target').html()).toEqual(expect.stringContaining('width'))
})

it('should support programmatic usage', () => {
  const wrapper = mount(
    <Measure bounds onMeasure={value => {}}>
      {({ content, ref }) => <textarea className="target" width={content.bounds.width} ref={ref} />}
    </Measure>
  )

  const content = wrapper.instance().measure()

  expect(content).toBeTruthy()
  expect(content.bounds).toBeTruthy()

  wrapper.instance()._node = null

  expect(wrapper.instance().measure()).toBeFalsy()
})
