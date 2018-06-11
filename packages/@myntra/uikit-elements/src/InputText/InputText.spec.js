import React from 'react'
import { shallow, mount } from 'enzyme'
import InputText from './InputText'

it('renders a text <input> by default', () => {
  expect(
    shallow(<InputText type="number" />)
      .find('input')
      .at(0)
      .props().type
  ).toBe('text')
})

it('renders a placeholder <input> by default', () => {
  expect(
    shallow(<InputText placeholder="Type" />)
      .find('input')
      .at(0)
      .prop('placeholder')
  ).toBe('Type')
})

it('should call onChange handler on text enter', () => {
  const handler = jest.fn()
  const wrapper = shallow(<InputText onChange={handler} />)

  wrapper
    .find('input')
    .at(0)
    .simulate('change')
  expect(handler).toHaveBeenCalled()
})

describe('classes', () => {
  it('should render with custom class name', () => {
    expect(
      shallow(<InputText className="c-name" />)
        .find('div')
        .at(0)
        .props().className
    ).toEqual(expect.stringContaining('c-name'))
  })
})

it('focuses the element on mount', () => {
  const wrapper = mount(<InputText autoFocus id="test" />)
  expect(
    wrapper
      .find('input')
      .at(0)
      .props().id
  ).toBe(document.activeElement.id)
})

describe('disabled', () => {
  it('Check input element ', () => {
    expect(
      shallow(<InputText disabled />)
        .find('input')
        .at(0)
        .props().disabled
    ).toBe(true)

    expect(
      shallow(<InputText disabled={false} />)
        .find('input')
        .at(0)
        .props().disabled
    ).toBe(false)
  })
})
