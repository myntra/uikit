import React from 'react'
import { mount } from 'enzyme'

import InputSearch from './InputSelectControl'

describe('Input Select Search', () => {
  const handleChange = jest.fn()
  const handleClick = jest.fn()
  const handleFocus = jest.fn()

  const inputSearch = mount(
    <InputSearch value={'Id'} id={'1'} onChange={handleChange} onClick={handleClick} onFocus={handleFocus} />
  )
  it('should render input with value', done => {
    expect(inputSearch.find('input')).toHaveLength(1)
    expect(inputSearch.find('input').props().value).toBe('Id')
    expect(inputSearch.find('input').props().role).toBe('combobox')
    expect(inputSearch.find('input').props().autoComplete).toBe('off')
    expect(inputSearch.find('input').props().id).toBe('1')

    inputSearch.find('input').simulate('change')
    expect(handleChange).toHaveBeenCalled()

    inputSearch.find('input').simulate('focus')
    expect(handleFocus).toHaveBeenCalled()

    inputSearch.simulate('click')
    expect(handleClick).toHaveBeenCalled()

    done()
  })
})
