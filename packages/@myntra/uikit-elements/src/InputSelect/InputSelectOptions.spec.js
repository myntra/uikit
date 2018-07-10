import React from 'react'
import { mount } from 'enzyme'

import InputSelector from './InputSelectOptions'
import Option from './InputSelectOption'

describe('Input Selector', () => {
  const options = [{ move: 'Thunder bolt', id: 1 }, { move: 'Water gun', id: 2 }]
  const values = [1]
  const labelKey = 'move'
  const valueKey = 'id'
  const handleOptionSelect = jest.fn()
  const handleOptionFocus = jest.fn()
  const handleMouseDown = jest.fn()
  const inputSelector = mount(
    <InputSelector
      options={options}
      values={values}
      labelKey={labelKey}
      instancePrefix={'select'}
      valueKey={valueKey}
      onOptionFocus={handleOptionFocus}
      onOptionSelect={handleOptionSelect}
      onMouseDown={handleMouseDown}
      focusedIndex={1}
      noResultsPlaceholder={'No results found'}
    />
  )

  it('should render options', done => {
    expect(inputSelector.find('.options')).toHaveLength(1)
    expect(inputSelector.find('.options').children()).toHaveLength(2)

    expect(
      inputSelector
        .find('.options')
        .childAt(0)
        .type()
    ).toBe(Option)

    expect(
      inputSelector
        .find('.options')
        .childAt(1)
        .type()
    ).toBe(Option)

    expect(
      inputSelector
        .find('Option')
        .at(0)
        .props().option.move
    ).toEqual('Thunder bolt')

    expect(
      inputSelector
        .find('Option')
        .at(1)
        .props().option.move
    ).toEqual('Water gun')

    done()
  })

  it('should render div containing no results text', done => {
    inputSelector.setProps({ options: [] })
    expect(inputSelector.find('.options').text()).toBe('No results found')
    done()
  })
})
