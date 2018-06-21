import React from 'react'
import { shallow } from 'enzyme'
import InputDateValue, { MASKS } from './InputDateValue'
import InputMasked from '../InputMasked/InputMasked'
import Icon from '../Icon/Icon'
import { UTCDate } from './InputDateUtils'

const DATE = UTCDate(2018, 4, 5)
describe('render', () => {
  const date = '2018-05-05'

  test('single', () => {
    const fn = jest.fn()
    const wrapper = shallow(<InputDateValue format="yyyy-MM-dd" value={date} onChange={fn} />)

    expect(wrapper.find(InputMasked)).toHaveLength(1)
    expect(wrapper).toMatchSnapshot()

    wrapper.find(Icon).simulate('click')
    expect(fn).toHaveBeenCalledWith(null)
    fn.mockClear()

    wrapper.find(InputMasked).simulate('change', '2018')

    expect(wrapper.state().value).toBe('2018')
    fn.mockClear()

    wrapper.find(InputMasked).simulate('change', date)

    expect(wrapper.state().value).toBe(null)
    expect(fn).toHaveBeenCalledWith(DATE)
    fn.mockClear()
  })

  test('range', () => {
    const fn = jest.fn()
    const wrapper = shallow(<InputDateValue format="yyyy-MM-dd" onChange={fn} range />)

    expect(wrapper.find(InputMasked)).toHaveLength(2)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('change date', () => {
  const fn = jest.fn()
  const date = '2018-05-05'
  const wrapper = shallow(
    <InputDateValue format="yyyy-MM-dd" onChange={fn} value={{ from: '2018-05-05', to: '2018-05-05' }} range />
  )

  afterEach(() => {
    fn.mockClear()
  })

  it('should render two input masked fields with cross icon', () => {
    expect(wrapper.find(Icon)).toHaveLength(2)
    expect(wrapper.find(InputMasked)).toHaveLength(2)
  })

  it('should clear from date', () => {
    wrapper
      .find(Icon)
      .at(0)
      .simulate('click')
    expect(fn).toHaveBeenCalledWith({ from: null })
  })

  it('should allow typing from date', () => {
    wrapper
      .find(InputMasked)
      .at(0)
      .simulate('change', '2018')
    expect(wrapper.state().value.from).toBe('2018')

    wrapper
      .find(InputMasked)
      .at(0)
      .simulate('blur')
    expect(wrapper.state().value).toBe(null)
  })

  it('should locally store partial changes', () => {
    const wrapper = shallow(<InputDateValue format="MM/dd" onChange={fn} value={{ from: '05/05' }} range />)

    wrapper
      .find(InputMasked)
      .at(0)
      .simulate('change', '12/1')
    expect(wrapper.state().value).toEqual({ from: '12/1' })
  })

  it('should change from date', () => {
    wrapper
      .find(InputMasked)
      .at(0)
      .simulate('change', date)
    expect(wrapper.state().value).toBe(null)
    expect(fn).toHaveBeenCalledWith({ from: DATE })
  })

  it('should clear to date', () => {
    wrapper
      .find(Icon)
      .at(1)
      .simulate('click')
    expect(fn).toHaveBeenCalledWith({ to: null })
  })

  it('should allow typing to date', () => {
    wrapper
      .find(InputMasked)
      .at(1)
      .simulate('change', '2018')
    expect(wrapper.state().value.to).toBe('2018')

    wrapper
      .find(InputMasked)
      .at(1)
      .simulate('blur')
    expect(wrapper.state().value).toBe(null)
  })

  it('should change to date', () => {
    wrapper
      .find(InputMasked)
      .at(1)
      .simulate('change', date)
    expect(wrapper.state().value).toBe(null)
    expect(fn).toHaveBeenCalledWith({ to: DATE })
  })
})

describe('focus from/to date', () => {
  const handleFocus = jest.fn()
  const handleRangeFocus = jest.fn()
  const wrapper = shallow(
    <InputDateValue
      format="yyyy-MM-dd"
      onFocus={handleFocus}
      onRangeFocus={handleRangeFocus}
      value={{ from: '2018-05-05', to: '2018-05-05' }}
      range
      onChange={() => {}}
    />
  )

  afterEach(() => {
    handleFocus.mockClear()
    handleRangeFocus.mockClear()
  })

  test('focus from', () => {
    wrapper
      .find(InputMasked)
      .at(0)
      .simulate('focus')

    expect(handleFocus).toHaveBeenCalled()
    expect(handleRangeFocus).toHaveBeenCalledWith('from')
  })

  test('focus to', () => {
    wrapper
      .find(InputMasked)
      .at(1)
      .simulate('focus')

    expect(handleFocus).toHaveBeenCalled()
    expect(handleRangeFocus).toHaveBeenCalledWith('to')
  })

  test('click from', () => {
    wrapper
      .find(InputMasked)
      .at(0)
      .simulate('click')

    expect(handleFocus).toHaveBeenCalled()
    expect(handleRangeFocus).toHaveBeenCalledWith('from')
  })

  test('click to', () => {
    wrapper
      .find(InputMasked)
      .at(1)
      .simulate('click')

    expect(handleFocus).toHaveBeenCalled()
    expect(handleRangeFocus).toHaveBeenCalledWith('to')
  })
})

describe('MASKS', () => {
  // TODO: Fix masks.
  test('Y', () => {
    expect(MASKS.Y.validate('4')).toBe(true)
    expect(MASKS.Y.validate('z')).toBe(false)
  })
  test('M', () => {
    expect(MASKS.M.validate('4')).toBe(true)
    expect(MASKS.M.validate('z')).toBe(false)
  })
  test('D', () => {
    expect(MASKS.D.validate('4')).toBe(true)
    expect(MASKS.D.validate('z')).toBe(false)
  })
})
