import React from 'react'
import { shallow } from 'enzyme'
import Picker from './Picker'
import Month from './Month'
import { UTCDate, onlyDate } from '../InputDateUtils'

describe('render', () => {
  it('should render', () => {
    const wrapper = shallow(<Picker openToDate={UTCDate(2018, 5, 1)} />)

    expect(wrapper.find(Month)).toHaveLength(1)
    expect(wrapper).toMatchSnapshot()
  })

  it('should render children', () => {
    const wrapper = shallow(
      <Picker openToDate={UTCDate(2018, 5, 1)}>
        <span className="test-child">foo</span>
      </Picker>
    )

    expect(wrapper.find('.test-child')).toHaveLength(1)
    expect(wrapper).toMatchSnapshot()
  })

  it('should render value', () => {
    const wrapper = shallow(
      <Picker openToDate={UTCDate(2018, 5, 1)} value={UTCDate(2018, 5, 5)} monthsToDisplay={2}>
        <span className="test-child">foo</span>
      </Picker>
    )
    const months = wrapper.find(Month)

    expect(months.at(0).props().selected).toEqual({ from: 5, to: 5 })
    expect(months.at(1).props().selected).toBeFalsy()
    expect(wrapper).toMatchSnapshot()
  })

  it('should render value range (start/end)', () => {
    const wrapper = shallow(
      <Picker
        openToDate={UTCDate(2018, 5, 1)}
        value={{ from: UTCDate(2018, 5, 5), to: UTCDate(2018, 5, 7) }}
        monthsToDisplay={2}
        range
      >
        <span className="test-child">foo</span>
      </Picker>
    )

    {
      const months = wrapper.find(Month)
      expect(months.at(0).props().selected).toEqual({ from: 5, to: 7 })
      expect(months.at(1).props().selected).toBeFalsy()
      expect(wrapper).toMatchSnapshot()
    }

    // Focus a date.
    wrapper.setState({ focused: UTCDate(2018, 4, 15) })

    {
      const months = wrapper.find(Month)
      expect(months.at(0).props().selected).toEqual({ from: 5, to: 7 })
      expect(months.at(1).props().selected).toBeFalsy()
      expect(wrapper).toMatchSnapshot()
    }
  })
})

describe('date selection', () => {
  const DATE = UTCDate(2018, 4, 5)

  test('open to same month', () => {
    const wrapper = shallow(<Picker openToDate={DATE} value={DATE} />)
    const months = wrapper.find(Month)

    expect(months.props().selected).toEqual({ from: 5, to: 5 })
  })

  test('open to different month', () => {
    const wrapper = shallow(<Picker openToDate={UTCDate(2018, 5, 1)} value={DATE} />)
    const months = wrapper.find(Month)

    expect(months.props().selected).toEqual(null)
  })
})

describe('date range selection', () => {
  const DATE = UTCDate(2018, 4, 5)

  test('null', () => {
    const wrapper = shallow(<Picker openToDate={DATE} value={null} range />)
    const months = wrapper.find(Month)

    expect(months.props().selected).toEqual(null)
  })

  test('null (focusing) selecting from', () => {
    const wrapper = shallow(<Picker openToDate={DATE} value={null} active="from" range />)

    expect(wrapper.find(Month).props().selected).toEqual(null)

    wrapper.setState({ focused: UTCDate(2018, 4, 2) })
    expect(wrapper.find(Month).props().selected).toEqual(null)
  })

  test('null (focusing) while selecting to', () => {
    const wrapper = shallow(<Picker openToDate={DATE} value={null} active="to" range />)

    expect(wrapper.find(Month).props().selected).toEqual(null)

    wrapper.setState({ focused: UTCDate(2018, 4, 2) })
    expect(wrapper.find(Month).props().selected).toEqual(null)
  })

  test('{}', () => {
    const wrapper = shallow(<Picker openToDate={DATE} value={{}} range />)
    const months = wrapper.find(Month)

    expect(months.props().selected).toEqual(null)
  })

  test('{} (focusing) selecting from', () => {
    const wrapper = shallow(<Picker openToDate={DATE} value={{}} active="from" range />)

    expect(wrapper.find(Month).props().selected).toEqual(null)

    wrapper.setState({ focused: UTCDate(2018, 4, 2) })
    expect(wrapper.find(Month).props().selected).toEqual(null)
  })

  test('{} (focusing) while selecting to', () => {
    const wrapper = shallow(<Picker openToDate={DATE} value={{}} active="to" range />)

    expect(wrapper.find(Month).props().selected).toEqual(null)

    wrapper.setState({ focused: UTCDate(2018, 4, 2) })
    expect(wrapper.find(Month).props().selected).toEqual(null)
  })

  test('simple range on same month', () => {
    const wrapper = shallow(<Picker openToDate={DATE} value={{ from: DATE, to: UTCDate(2018, 4, 10) }} range />)
    const months = wrapper.find(Month)

    expect(months.props().selected).toEqual({ from: 5, to: 10 })
  })

  test('simple range on different month', () => {
    const wrapper = shallow(
      <Picker openToDate={UTCDate(2018, 5, 1)} value={{ from: DATE, to: UTCDate(2018, 4, 10) }} range />
    )
    const months = wrapper.find(Month)

    expect(months.props().selected).toEqual(null)
  })

  test('simple range on same month (months displayed > 1)', () => {
    const wrapper = shallow(
      <Picker openToDate={DATE} value={{ from: DATE, to: UTCDate(2018, 4, 10) }} range monthsToDisplay={2} />
    )
    const months = wrapper.find(Month)

    expect(months.at(0).props().selected).toEqual({ from: 5, to: 10 })
    expect(months.at(1).props().selected).toEqual(null)
  })

  test('simple range on different month (months displayed > 1)', () => {
    const wrapper = shallow(
      <Picker
        openToDate={UTCDate(2018, 3, 1)}
        value={{ from: DATE, to: UTCDate(2018, 4, 10) }}
        range
        monthsToDisplay={2}
      />
    )
    const months = wrapper.find(Month)

    expect(months.at(0).props().selected).toEqual(null)
    expect(months.at(1).props().selected).toEqual({ from: 5, to: 10 })
  })

  test('only from on same month', () => {
    const wrapper = shallow(<Picker openToDate={DATE} value={{ from: DATE }} range />)
    const months = wrapper.find(Month)

    expect(months.props().selected).toEqual({ from: 5, to: 32 })
  })

  test('only from on different month', () => {
    const wrapper = shallow(<Picker openToDate={UTCDate(2018, 5, 1)} value={{ from: DATE }} range />)
    const months = wrapper.find(Month)

    expect(months.props().selected).toEqual({ from: 0, to: 31 })
  })

  test('only from on same month (months displayed > 1)', () => {
    const wrapper = shallow(<Picker openToDate={DATE} value={{ from: DATE }} range monthsToDisplay={2} />)
    const months = wrapper.find(Month)

    expect(months.at(0).props().selected).toEqual({ from: 5, to: 32 })
    expect(months.at(1).props().selected).toEqual({ from: 0, to: 31 })
  })

  test('only from on different month (months displayed > 1)', () => {
    const wrapper = shallow(
      <Picker openToDate={UTCDate(2018, 3, 1)} value={{ from: DATE }} range monthsToDisplay={2} />
    )
    const months = wrapper.find(Month)

    expect(months.at(0).props().selected).toEqual(null)
    expect(months.at(1).props().selected).toEqual({ from: 5, to: 32 })
  })

  test('only from on same month (focusing)', () => {
    const wrapper = shallow(<Picker openToDate={DATE} value={{ from: DATE }} range />)

    expect(wrapper.find(Month).props().selected).toEqual({ from: 5, to: 32 })

    wrapper.setState({ focused: UTCDate(2018, 4, 10) })
    expect(wrapper.find(Month).props().selected).toEqual({ from: 5, to: 10 })

    wrapper.setState({ focused: UTCDate(2018, 4, 20) })
    expect(wrapper.find(Month).props().selected).toEqual({ from: 5, to: 20 })

    wrapper.setState({ focused: UTCDate(2018, 4, 2) })
    expect(wrapper.find(Month).props().selected).toEqual({ from: 2, to: 5 })
  })

  test('only from on same month (focusing) selecting from', () => {
    const wrapper = shallow(<Picker openToDate={DATE} value={{ from: DATE }} active="from" range />)

    expect(wrapper.find(Month).props().selected).toEqual({ from: 5, to: 32 })

    wrapper.setState({ focused: UTCDate(2018, 4, 2) })
    expect(wrapper.find(Month).props().selected).toEqual({ from: 5, to: 32 })

    wrapper.setState({ focused: UTCDate(2018, 4, 1) })
    expect(wrapper.find(Month).props().selected).toEqual({ from: 5, to: 32 })

    wrapper.setState({ focused: UTCDate(2018, 4, 10) })
    expect(wrapper.find(Month).props().selected).toEqual({ from: 5, to: 32 })
  })

  test('only from on same month (focusing) while selecting to', () => {
    const wrapper = shallow(<Picker openToDate={DATE} value={{ from: DATE }} active="to" range />)

    expect(wrapper.find(Month).props().selected).toEqual({ from: 5, to: 32 })

    wrapper.setState({ focused: UTCDate(2018, 4, 2) })
    expect(wrapper.find(Month).props().selected).toEqual({ from: 2, to: 5 })

    wrapper.setState({ focused: UTCDate(2018, 4, 1) })
    expect(wrapper.find(Month).props().selected).toEqual({ from: 1, to: 5 })

    wrapper.setState({ focused: UTCDate(2018, 4, 10) })
    expect(wrapper.find(Month).props().selected).toEqual({ from: 5, to: 10 })
  })

  // ---

  test('only to on same month', () => {
    const wrapper = shallow(<Picker openToDate={DATE} value={{ to: DATE }} range />)
    const months = wrapper.find(Month)

    expect(months.props().selected).toEqual({ from: 0, to: 5 })
  })

  test('only to on different month', () => {
    const wrapper = shallow(<Picker openToDate={UTCDate(2018, 3, 1)} value={{ to: DATE }} range />)
    const months = wrapper.find(Month)

    expect(months.props().selected).toEqual({ from: 0, to: 31 })
  })

  test('only to on same month (months displayed > 1)', () => {
    const wrapper = shallow(<Picker openToDate={DATE} value={{ to: DATE }} range monthsToDisplay={2} />)
    const months = wrapper.find(Month)

    expect(months.at(0).props().selected).toEqual({ from: 0, to: 5 })
    expect(months.at(1).props().selected).toEqual(null)
  })

  test('only to on different month (months displayed > 1)', () => {
    const wrapper = shallow(<Picker openToDate={UTCDate(2018, 3, 1)} value={{ to: DATE }} range monthsToDisplay={2} />)
    const months = wrapper.find(Month)

    expect(months.at(0).props().selected).toEqual({ from: 0, to: 31 })
    expect(months.at(1).props().selected).toEqual({ from: 0, to: 5 })
  })

  test('only to on same month (focusing)', () => {
    const wrapper = shallow(<Picker openToDate={DATE} value={{ to: DATE }} range />)

    expect(wrapper.find(Month).props().selected).toEqual({ from: 0, to: 5 })

    wrapper.setState({ focused: UTCDate(2018, 4, 2) })
    expect(wrapper.find(Month).props().selected).toEqual({ from: 2, to: 5 })

    wrapper.setState({ focused: UTCDate(2018, 4, 1) })
    expect(wrapper.find(Month).props().selected).toEqual({ from: 1, to: 5 })

    wrapper.setState({ focused: UTCDate(2018, 4, 10) })
    expect(wrapper.find(Month).props().selected).toEqual({ from: 5, to: 10 })
  })

  test('only to on same month (focusing) selecting from', () => {
    const wrapper = shallow(<Picker openToDate={DATE} value={{ to: DATE }} active="from" range />)

    expect(wrapper.find(Month).props().selected).toEqual({ from: 0, to: 5 })

    wrapper.setState({ focused: UTCDate(2018, 4, 2) })
    expect(wrapper.find(Month).props().selected).toEqual({ from: 2, to: 5 })

    wrapper.setState({ focused: UTCDate(2018, 4, 1) })
    expect(wrapper.find(Month).props().selected).toEqual({ from: 1, to: 5 })

    wrapper.setState({ focused: UTCDate(2018, 4, 10) })
    expect(wrapper.find(Month).props().selected).toEqual({ from: 5, to: 10 })
  })

  test('only to on same month (focusing) while selecting to', () => {
    const wrapper = shallow(<Picker openToDate={DATE} value={{ to: DATE }} active="to" range />)

    expect(wrapper.find(Month).props().selected).toEqual({ from: 0, to: 5 })

    wrapper.setState({ focused: UTCDate(2018, 4, 2) })
    expect(wrapper.find(Month).props().selected).toEqual({ from: 0, to: 5 })

    wrapper.setState({ focused: UTCDate(2018, 4, 1) })
    expect(wrapper.find(Month).props().selected).toEqual({ from: 0, to: 5 })

    wrapper.setState({ focused: UTCDate(2018, 4, 10) })
    expect(wrapper.find(Month).props().selected).toEqual({ from: 0, to: 5 })
  })
})

test('open to date', () => {
  const today = onlyDate(new Date())
  const wrapper = shallow(<Picker />)

  // Default to today.
  {
    const { year, month } = wrapper.find(Month).props()
    expect(year).toEqual(today.getFullYear())
    expect(month).toEqual(today.getMonth())
  }

  // Can be overridden by state.
  {
    const openToDate = UTCDate(2018, 4, 1)
    wrapper.setState({ openToDate })
    const { year, month } = wrapper.find(Month).props()
    expect(year).toEqual(2018)
    expect(month).toEqual(4)
  }

  // Can be overridden by props.
  {
    const openToDate = UTCDate(2019, 5, 1)
    wrapper.setProps({ openToDate })
    const { year, month } = wrapper.find(Month).props()
    expect(year).toEqual(2019)
    expect(month).toEqual(5)
  }
})

describe('disabled range', () => {
  const DATE = UTCDate(2018, 4, 5)
  test('single', () => {
    const disabledDates = [{ from: DATE, to: DATE }]
    const wrapper = shallow(<Picker openToDate={DATE} disabledDates={disabledDates} />)

    expect(wrapper.find(Month).props().disabled).toEqual([{ from: 5, to: 5 }])

    wrapper.setProps({ disabledDates, openToDate: UTCDate(2018, 5, 5) })

    expect(wrapper.find(Month).props().disabled).toEqual([])
  })

  test('range', () => {
    const disabledDates = [{ from: DATE, to: UTCDate(2018, 4, 10) }]
    const wrapper = shallow(<Picker openToDate={DATE} disabledDates={disabledDates} />)

    expect(wrapper.find(Month).props().disabled).toEqual([{ from: 5, to: 10 }])

    wrapper.setProps({ disabledDates, openToDate: UTCDate(2018, 5, 5) })

    expect(wrapper.find(Month).props().disabled).toEqual([])
  })

  test('range multi month', () => {
    const disabledDates = [{ from: DATE, to: UTCDate(2018, 5, 10) }]
    const wrapper = shallow(<Picker openToDate={DATE} disabledDates={disabledDates} />)

    expect(wrapper.find(Month).props().disabled).toEqual([{ from: 5, to: 32 }])

    wrapper.setProps({ disabledDates, openToDate: UTCDate(2018, 5, 5) })

    expect(wrapper.find(Month).props().disabled).toEqual([{ from: 0, to: 10 }])
  })

  test('only from', () => {
    const disabledDates = [{ from: DATE }]
    const wrapper = shallow(<Picker openToDate={DATE} disabledDates={disabledDates} />)

    expect(wrapper.find(Month).props().disabled).toEqual([{ from: 5, to: 32 }])

    wrapper.setProps({ disabledDates, openToDate: UTCDate(2018, 5, 5) })
    expect(wrapper.find(Month).props().disabled).toEqual([{ from: 0, to: 31 }])

    wrapper.setProps({ disabledDates, openToDate: UTCDate(2018, 3, 5) })
    expect(wrapper.find(Month).props().disabled).toEqual([])
  })

  test('only to', () => {
    const disabledDates = [null, { to: DATE }]
    const wrapper = shallow(<Picker openToDate={DATE} disabledDates={disabledDates} />)

    expect(wrapper.find(Month).props().disabled).toEqual([{ from: 0, to: 5 }])

    wrapper.setProps({ disabledDates, openToDate: UTCDate(2018, 5, 5) })
    expect(wrapper.find(Month).props().disabled).toEqual([])

    wrapper.setProps({ disabledDates, openToDate: UTCDate(2018, 3, 5) })
    expect(wrapper.find(Month).props().disabled).toEqual([{ from: 0, to: 31 }])
  })
})

describe('validation', () => {
  const DATE = UTCDate(2018, 4, 5)
  test('simple', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {})
    shallow(<Picker value={{}} />)
    expect(consoleError).toHaveBeenCalledWith(expect.stringContaining('instance of date'))
    consoleError.mockReset()
  })
  test('range', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {})
    shallow(<Picker value={DATE} range />)
    expect(consoleError).toHaveBeenCalledWith(expect.stringContaining('should be a plain object'))
    consoleError.mockReset()
  })
})

describe('month jumper', () => {
  const DATE = UTCDate(2018, 4, 5)
  test('open to jumped month', () => {
    const wrapper = shallow(<Picker />)

    expect(wrapper.instance().referenceDate).toEqual(onlyDate(new Date()))

    wrapper.instance().handleJump(DATE)

    expect(wrapper.instance().referenceDate).toEqual(DATE)
  })

  it('should propagate jump event', () => {
    const fn = jest.fn()
    const wrapper = shallow(<Picker onOpenToDateChange={fn} />)

    wrapper.instance().handleJump(DATE)

    expect(fn).toHaveBeenCalledWith(DATE)
  })
})

describe('range selection ux', () => {
  const DATE = UTCDate(2018, 4, 5)
  it('should ignore when disabled', () => {
    const wrapper = shallow(<Picker disabled />)

    wrapper.instance().handleDateFocus(5, DATE)

    expect(wrapper.state().focused).toEqual(null)
  })

  it('should focus date', () => {
    const wrapper = shallow(<Picker range />)

    wrapper.instance().handleDateFocus(5, DATE)

    expect(wrapper.state().focused).toEqual(DATE)
  })

  it('should delay blur when selecting to', done => {
    const wrapper = shallow(<Picker value={{ from: DATE }} range />)

    wrapper.instance().handleDateFocus(5, DATE)
    expect(wrapper.state().focused).toEqual(DATE)

    wrapper.instance().handleDateFocus(null, null)
    expect(wrapper.state().focused).toEqual(DATE)

    setTimeout(() => {
      expect(wrapper.state().focused).toEqual(null)
      done()
    }, 1100)
  })

  it('should clear timer on unmount', () => {
    const wrapper = shallow(<Picker value={{ from: DATE }} range />)

    wrapper.instance().handleDateFocus(5, DATE)
    expect(wrapper.state().focused).toEqual(DATE)

    wrapper.instance().handleDateFocus(null, null)
    expect(wrapper.state().focused).toEqual(DATE)

    const id = wrapper.instance().focusClearTimer
    const fn = jest.spyOn(window, 'clearTimeout')
    wrapper.unmount()

    expect(fn).toHaveBeenCalledWith(id)
    fn.mockReset()
  })

  it('should delay blur when selecting from', done => {
    const wrapper = shallow(<Picker value={{ to: DATE }} range />)

    wrapper.instance().handleDateFocus(5, DATE)
    expect(wrapper.state().focused).toEqual(DATE)

    wrapper.instance().handleDateFocus(null, null)
    expect(wrapper.state().focused).toEqual(DATE)

    setTimeout(() => {
      expect(wrapper.state().focused).toEqual(null)
      done()
    }, 1100)
  })

  it('should not blur when not selecting', () => {
    const wrapper = shallow(<Picker value={{ from: DATE, to: DATE }} range />)

    wrapper.instance().handleDateFocus(5, DATE)
    expect(wrapper.state().focused).toEqual(DATE)

    wrapper.instance().handleDateFocus(null, null)
    expect(wrapper.state().focused).toEqual(null)
  })
})

describe('picking date', () => {
  const DATE = UTCDate(2018, 4, 5)
  it('should work without onChange handler', () => {
    const wrapper = shallow(<Picker />)

    expect(() => wrapper.instance().handleDateSelect(5, DATE)).not.toThrow()
  })

  it('should work without onChange handler (range)', () => {
    const wrapper = shallow(<Picker range />)

    expect(() => wrapper.instance().handleDateSelect(5, DATE)).not.toThrow()
  })

  it('should not select date if disabled', () => {
    const fn = jest.fn()
    const wrapper = shallow(<Picker onChange={fn} disabled />)

    wrapper.instance().handleDateSelect(5, DATE)

    expect(fn).not.toHaveBeenCalled()
  })

  it('should select date (no initial value)', () => {
    const fn = jest.fn()
    const wrapper = shallow(<Picker onChange={fn} />)

    wrapper.instance().handleDateSelect(5, DATE)

    expect(fn).toHaveBeenCalledWith(DATE)
  })

  it('should select date', () => {
    const fn = jest.fn()
    const wrapper = shallow(<Picker onChange={fn} value={UTCDate(2018, 10, 10)} />)

    wrapper.instance().handleDateSelect(5, DATE)

    expect(fn).toHaveBeenCalledWith(DATE)
  })

  it('should select date range (no initial value)', () => {
    const fn = jest.fn()
    const wrapper = shallow(<Picker onChange={fn} range />)

    wrapper.instance().handleDateSelect(5, DATE)

    expect(fn).toHaveBeenCalledWith({ from: DATE })
  })

  it('should select date range (empty initial value)', () => {
    const fn = jest.fn()
    const wrapper = shallow(<Picker onChange={fn} value={{}} range />)

    wrapper.instance().handleDateSelect(5, DATE)

    expect(fn).toHaveBeenCalledWith({ from: DATE })
  })

  it('should select date range (from selected)', () => {
    const fn = jest.fn()
    const wrapper = shallow(<Picker onChange={fn} value={{ from: DATE }} range />)

    wrapper.instance().handleDateSelect(5, DATE)

    expect(fn).toHaveBeenCalledWith({ from: DATE, to: DATE })
  })

  it('should select date range (from selected, force from)', () => {
    const fn = jest.fn()
    const wrapper = shallow(<Picker onChange={fn} value={{ from: DATE }} active="from" range />)

    const date = UTCDate(2018, 4, 3)
    wrapper.instance().handleDateSelect(date.getDate(), date)

    expect(fn).toHaveBeenCalledWith({ from: date })
  })

  it('should swap dates if to is before from and to is not selected (from selected, force to)', () => {
    const fn = jest.fn()
    const wrapper = shallow(<Picker onChange={fn} value={{ from: DATE }} active="to" range />)

    const date = UTCDate(2018, 4, 3)
    wrapper.instance().handleDateSelect(date.getDate(), date)

    expect(fn).toHaveBeenCalledWith({ from: date, to: DATE })
  })

  it('should reset date if to is before from and to is selected (from selected, force to)', () => {
    const fn = jest.fn()
    const wrapper = shallow(<Picker onChange={fn} value={{ from: DATE, to: UTCDate(2018, 5, 5) }} active="to" range />)

    const date = UTCDate(2018, 4, 3)
    wrapper.instance().handleDateSelect(date.getDate(), date)

    expect(fn).toHaveBeenCalledWith({ from: date })
  })

  it('should select date range (to selected)', () => {
    const fn = jest.fn()
    const wrapper = shallow(<Picker onChange={fn} value={{ to: DATE }} range />)

    wrapper.instance().handleDateSelect(5, DATE)

    expect(fn).toHaveBeenCalledWith({ from: DATE, to: DATE })
  })

  it('should select date range (to selected, force to)', () => {
    const fn = jest.fn()
    const wrapper = shallow(<Picker onChange={fn} value={{ to: DATE }} active="to" range />)

    const date = UTCDate(2018, 4, 3)
    wrapper.instance().handleDateSelect(date.getDate(), date)

    expect(fn).toHaveBeenCalledWith({ to: date })
  })

  it('should reset date if from is after to (to selected, force from)', () => {
    const fn = jest.fn()
    const wrapper = shallow(<Picker onChange={fn} value={{ to: DATE }} active="from" range />)

    const date = UTCDate(2018, 4, 7)
    wrapper.instance().handleDateSelect(date.getDate(), date)

    expect(fn).toHaveBeenCalledWith({ from: date })
  })

  it('should should fire range start & end selected', () => {
    const start = jest.fn()
    const end = jest.fn()
    const wrapper = shallow(
      <Picker value={{ from: DATE }} onRangeStartSelected={start} onRangeEndSelected={end} range />
    )

    const date = UTCDate(2018, 4, 3)
    wrapper.instance().handleDateSelect(date.getDate(), date)

    expect(start).toHaveBeenCalledWith(date)
    expect(end).toHaveBeenCalledWith(DATE)
  })

  it('should select date range (range selected)', () => {
    const fn = jest.fn()
    const wrapper = shallow(<Picker onChange={fn} value={{ from: DATE, to: DATE }} range />)

    const date = UTCDate(2018, 4, 3)
    wrapper.instance().handleDateSelect(date.getDate(), date)

    expect(fn).toHaveBeenCalledWith({ from: date, to: DATE })
  })
})
