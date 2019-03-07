import React from 'react'
import { mount } from 'enzyme'
import { Provider } from './Accordion'
import AccordionItem from './AccordionItem'

function createRegistrar() {
  const m = new WeakMap()
  let index = 0
  return item => (m.has(item) ? m.get(item) : m.set(item, index++).get(item))
}

describe('Accordion.Item', () => {
  it('renders title node & children', () => {
    const wrapper = mount(
      <Provider value={{ active: 0, register: createRegistrar() }}>
        <AccordionItem title={<div className="one">One</div>}>
          <div className="foo">Foo</div>
        </AccordionItem>
      </Provider>
    )

    expect(wrapper.find('.one')).toHaveLength(1)

    expect(wrapper.find('.foo')).toHaveLength(1)
  })

  it('renders title node for unselected', () => {
    const wrapper = mount(
      <Provider value={{ active: 1, register: createRegistrar() }}>
        <AccordionItem title={<div className="one title">One</div>}>
          <div className="foo">Foo</div>
        </AccordionItem>

        <AccordionItem title={<div className="two title">Two</div>}>
          <div className="bar">Bar</div>
        </AccordionItem>
      </Provider>
    )

    expect(wrapper.find('.title')).toHaveLength(2)
  })

  it(`renders only active item's children`, () => {
    const wrapper = mount(
      <div>
        <Provider value={{ active: 0, register: createRegistrar() }}>
          <AccordionItem title={<div className="one">One</div>}>
            <div className="foo">Foo</div>
          </AccordionItem>

          <AccordionItem title={<div className="two">Two</div>}>
            <div className="bar">Bar</div>
          </AccordionItem>
        </Provider>
      </div>
    )

    expect(wrapper.text()).toEqual(expect.stringContaining('Foo'))

    expect(wrapper.text()).not.toEqual(expect.stringContaining('Bar'))
  })

  it(`dispatches click event on click`, () => {
    const spy = jest.fn()
    const wrapper = mount(
      <Provider value={{ active: 1, onChange: spy, register: createRegistrar() }}>
        <div>
          <AccordionItem title={<div className="one">One</div>}>
            <div className="foo">Foo</div>
          </AccordionItem>
        </div>

        <AccordionItem title={<div className="two">Two</div>}>
          <div className="bar">Bar</div>
        </AccordionItem>
      </Provider>
    )

    wrapper.find('.one').simulate('click')

    expect(spy).toHaveBeenCalledWith(0)
  })
})
