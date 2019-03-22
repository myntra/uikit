import React from 'react'
import { mount } from 'enzyme'

import InputOption from './InputSelectOption'
import InputCheckBox from '../../../../../node_modules/@myntra/uikit-elements/src/InputCheckBox/InputCheckBox'

describe('Input Select Option', () => {
  const handleSelect = jest.fn()
  const handleFocus = jest.fn()
  const option = { name: 'Idly', value: 1 }
  const inputOption = mount(
    <InputOption option={option} labelKey="name" id={'1'} onSelect={handleSelect} onFocus={handleFocus} index={1} />
  )
  it('should render option', done => {
    expect(inputOption.find('.option')).toHaveLength(1)
    expect(inputOption.find('.option').text()).toBe('Idly')
    done()
  })

  it('should focus on mouse enter', done => {
    inputOption.find('.option').simulate('mouseenter')
    expect(handleFocus).toHaveBeenCalledWith(expect.anything(), option, 1)
    done()
  })

  it('should focus on mouse move', done => {
    inputOption.find('.option').simulate('mousemove')
    expect(handleFocus).toHaveBeenCalledWith(expect.anything(), option, 1)
    done()
  })

  it('should select on click', done => {
    inputOption.find('.option').simulate('click')
    expect(handleSelect).toHaveBeenCalledWith(expect.anything(), option, 1)
    done()
  })

  it('should select on touch end', done => {
    inputOption.find('.option').simulate('touchmove')
    inputOption.find('.option').simulate('touchstart')
    inputOption.find('.option').simulate('touchend')
    expect(handleSelect).toHaveBeenCalledWith(expect.anything(), option, 1)
    done()
  })

  it('should have checkbox if hasCheckBox prop is passed', done => {
    inputOption.setProps({ hasCheckBox: true })
    expect(inputOption.find(InputCheckBox)).toHaveLength(1)
    expect(inputOption.find(InputCheckBox).props().value).toBeFalsy()

    inputOption.setProps({ isSelected: true })
    expect(inputOption.find(InputCheckBox).props().value).toBe(true)
    done()
  })

  it('should render using renderOption is the prop is passed', done => {
    const renderOption = jest.fn()
    inputOption.setProps({ renderOption })
    expect(renderOption).toHaveBeenCalledWith(option)
    done()
  })
})
