import React from 'react'
import { shallow } from 'enzyme'
import { testCodeMod } from '@myntra/codemod-utils'

import InputSelect from './InputSelect'

testCodeMod(__dirname, 'InputSelect.codemod.js')

describe('InputSelect', () => {
  const options = Array(15)
    .fill(0)
    .map((_, index) => ({ value: index, label: `${index}` }))

  it('renders', () => {
    expect(() => shallow(<InputSelect value={null} options={[]} onChange={() => null} />)).not.toConsoleError()
  })

  it('renders options', () => {
    const wrapper = shallow(<InputSelect value={null} options={options} onChange={() => null} />)

    expect(wrapper.find('[data-test-id="selector"]').prop('options')).toEqual(options)
  })

  it('renders only filtered options', () => {
    const wrapper = shallow(<InputSelect value={null} options={options} onChange={() => null} />)

    wrapper.setState({ isOpen: true })
    wrapper.instance().handleInput('0')

    expect(wrapper.find('[data-test-id="selector"]').prop('options')).toHaveLength(2)
  })

  it('renders selected options at top', () => {
    const wrapper = shallow(<InputSelect value={1} options={options} onChange={() => null} />)

    wrapper.setState({ isOpen: true })

    expect(wrapper.find('[data-test-id="selector"]').prop('options')[0]).toEqual(options[1])
  })

  it('renders selected value', () => {
    const wrapper = shallow(<InputSelect value={1} options={options} onChange={() => null} />)

    expect(
      wrapper
        .find('[data-test-id="dropdown"]')
        .dive()
        .find('[data-test-id="control"]')
        .dive()
        .find('[data-test-id="value"]')
        .prop('optionsForValues')
    ).toEqual([options[1]])
  })

  it('renders multiple selected values', () => {
    const wrapper = shallow(<InputSelect value={[1, 2]} options={options} onChange={() => null} multiple />)

    expect(
      wrapper
        .find('[data-test-id="dropdown"]')
        .dive()
        .find('[data-test-id="control"]')
        .dive()
        .find('[data-test-id="value"]')
        .prop('optionsForValues')
    ).toEqual([options[1], options[2]])
  })

  it('renders clear button', () => {
    const wrapper = shallow(<InputSelect value={1} options={options} onChange={() => null} />)

    expect(
      wrapper
        .find('[data-test-id="dropdown"]')
        .dive()
        .find('[data-test-id="control"]')
        .dive()
        .find('[data-test-id="clear"]')
    ).toBeTag('[role="button"]')
  })

  it('does not renders clear button for required', () => {
    const wrapper = shallow(<InputSelect value={1} options={options} onChange={() => null} required />)

    expect(
      wrapper
        .find('[data-test-id="dropdown"]')
        .dive()
        .find('[data-test-id="control"]')
        .dive()
        .find('[data-test-id="clear"]')
    ).toHaveLength(0)
  })

  it('does not renders clear button for disabled', () => {
    const wrapper = shallow(<InputSelect value={1} options={options} onChange={() => null} disabled />)

    expect(
      wrapper
        .find('[data-test-id="dropdown"]')
        .dive()
        .find('[data-test-id="control"]')
        .dive()
        .find('[data-test-id="clear"]')
    ).toHaveLength(0)
  })

  it('renders loading state', () => {
    const wrapper = shallow(<InputSelect value={1} options={options} onChange={() => null} />)

    expect(
      wrapper
        .find('[data-test-id="dropdown"]')
        .dive()
        .find('[data-test-id="control"]')
        .dive()
        .find('[data-test-id="loading"]')
    ).toHaveLength(0)

    wrapper.setProps({ isLoading: true })

    expect(
      wrapper
        .find('[data-test-id="dropdown"]')
        .dive()
        .find('[data-test-id="control"]')
        .dive()
        .find('[data-test-id="loading"]')
    ).toHaveLength(1)
  })

  describe('behaviour', () => {
    it('calls `onChange` prop if option is selected', () => {
      const fn = jest.fn(value => wrapper.setProps({ value }))
      const wrapper = shallow(<InputSelect value={1} options={options} onChange={fn} />)

      wrapper.find('[data-test-id="selector"]').prop('onOptionSelect')(null, options[2])

      expect(fn).toHaveBeenCalledTimes(1)
      expect(fn).toHaveBeenLastCalledWith(2, options[2])
    })
  })
})

/*
it('should display no value', done => {
    const select = mountSelect()
    expect(select.find(InputSelectValue).props().optionsForValues).toEqual([])
    done()
  })

  it('should render a search field', done => {
    const select = mountSelect()
    expect(select.find(InputSelectControl).props().value).toBe('')
    done()
  })

  it('should open Selector menu on focus', done => {
    const select = mountSelect()
    const input = select
      .find(InputSelectControl)
      .find('input')
      .at(1)

    input.simulate('focus')

    expect(select.state('isOpen')).toBeTruthy()
    done()
  })

  it('should open menu on mousedown', done => {
    const select = mountSelect()
    select.find(InputSelectControl).simulate('click')
    expect(select.state('isOpen')).toBeTruthy()
    done()
  })

  it('should open menu and select next option on Enter key', done => {
    const event = {
      key: 'Enter',
      preventDefault: jest.fn(),
      stopPropagation: jest.fn()
    }
    const select = mountSelect()

    select.setState({ focusedIndex: 0, isOpen: true })
    select.instance().handleKeyDown(event)
    expect(props.onChange).toHaveBeenCalledWith(1, { label: 'One', value: 1 })
    done()
  })

  it('should set search value on change to InputSearch', done => {
    const select = mountSelect()
    const input = select
      .find(InputSelectControl)
      .find('input')
      .at(1)

    input.simulate('change', { target: { value: 'T' } })
    expect(select.state('searchValue')).toBe('T')
    expect(select.state('filteredOptions')).toEqual([{ label: 'Two', value: 2 }])
    done()
  })

  it('should close menu on InputSearch blur', done => {
    const select = mountSelect()
    select.find(InputSelectControl).simulate('blur')
    setTimeout(() => {
      expect(select.state('isOpen')).toBe(false)
      done()
    }, 200)
  })

  it('should get new filtered options on options change', done => {
    const select = mountSelect()
    select.setState({ searchValue: '' })
    select.setProps({ options: [{ label: 'One', value: 1 }, { label: 'Two', value: 2 }, { label: 'Three', value: 3 }] })
    expect(select.state('filteredOptions')).toEqual([
      { label: 'One', value: 1 },
      { label: 'Two', value: 2 },
      { label: 'Three', value: 3 }
    ])
    done()
  })

  // With Value

  describe('Input Search with value', () => {
    beforeEach(() => {
      props = {
        options: [{ label: 'One', value: 1 }, { label: 'Two', value: 2 }],
        onChange: jest.fn(),
        value: 1
      }
      mountedSelect = undefined
    })
    it('should display selected value', done => {
      const select = mountSelect()
      expect(select.find(InputSelectValue).props().optionsForValues).toEqual([{ label: 'One', value: 1 }])
      done()
    })

    it('should remove value on close icon mousedown', done => {
      const select = mountSelect()
      select
        .find('Icon')
        .first()
        .simulate('click')
      expect(props.onChange).toHaveBeenLastCalledWith(null)
      done()
    })

    it('should render a hidden input with selected value', done => {
      const select = mountSelect()
      expect(select.find('InputSelectHidden').props().values).toEqual([1])
      done()
    })
  })

  // Input with multiple option selection

  describe('Input Select Multiple', () => {
    beforeEach(() => {
      props = {
        options: [{ label: 'One', value: 1 }, { label: 'Two', value: 2 }],
        onChange: jest.fn(),
        onFocus: jest.fn(),
        value: [1],
        multiple: true
      }
      mountedSelect = undefined
    })

    it('should display selected value', done => {
      const select = mountSelect()
      expect(select.find(InputSelectValue).props().optionsForValues).toEqual([{ label: 'One', value: 1 }])
      done()
    })

    it('should call onchange handler with multiple values on option select', done => {
      const select = mountSelect()
      select.setState({ isOpen: true })
      select
        .find('Option')
        .at(1)
        .simulate('click')
      expect(props.onChange).toHaveBeenLastCalledWith([1, 2], [{ label: 'One', value: 1 }, { label: 'Two', value: 2 }])

      done()
    })

    it('should remove value and call onchange handler on unselect', done => {
      const select = mountSelect()
      select.setState({ isOpen: true })
      select
        .find(InputSelectOption)
        .at(0)
        .simulate('click')
      expect(props.onChange).toHaveBeenLastCalledWith([], [])

      done()
    })
  })

  // Input disabled
  // TODO: Check this!
  describe('Input Select disabled', () => {
    beforeEach(() => {
      props = {
        options: [{ label: 'One', value: 1 }, { label: 'Two', value: 2 }],
        onChange: jest.fn(),
        onFocus: jest.fn(),
        value: 1,
        disabled: true
      }
      mountedSelect = undefined
    })
    it('should not open menu on click', done => {
      const select = mountSelect()
      select.setState({ isOpen: true })
      select.find(InputSelectControl).simulate('click')
      expect(select.state('isOpen')).not.toBeTruthy()
      done()
    })
    it('should not focus on InputSearch focus', done => {
      const select = mountSelect()
      select
        .find(InputSelectControl)
        .find('input')
        .last()
        .simulate('focus')
      expect(props.onFocus).not.toHaveBeenCalled()
      done()
    })
  })

  // Non Searchable options

  describe('Input Select non searchable', () => {
    beforeEach(() => {
      props = {
        options: [{ label: 'One', value: 1 }, { label: 'Two', value: 2 }],
        onChange: jest.fn(),
        value: 2,
        searchable: false
      }
      mountedSelect = undefined
    })
    it('should sort options based on search value', done => {
      const select = mountSelect()

      select.instance().handleInput('Two')
      expect(select.state('filteredOptions')).toEqual([{ label: 'Two', value: 2 }, { label: 'One', value: 1 }])
      done()
    })

    it('should focus on next option on space key', done => {
      const select = mountSelect()
      const event = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
        key: ' '
      }
      select.setState({ isOpen: true })
      select.instance().handleKeyDown(event)
      expect(props.onChange).toHaveBeenLastCalledWith(2, { label: 'Two', value: 2 })
      done()
    })
  })

  // Required prop

  describe('Input Select required', () => {
    beforeEach(() => {
      props = {
        options: [{ label: 'One', value: 1 }, { label: 'Two', value: 2 }],
        onChange: jest.fn(),
        value: 1,
        required: true
      }
      mountedSelect = undefined
    })

    it('should not remove value if required prop is passed - Single select', done => {
      const select = mountSelect()
      select
        .find('Icon')
        .first()
        .simulate('click')
      expect(props.onChange).not.toHaveBeenCalled()
      done()
    })

    it('should not remove value if required prop is passed - Multi select', done => {
      const select = mountSelect()
      select.setState({ isOpen: true })
      select.setProps({ multiple: true, value: [1] })
      select
        .find(InputSelectOption)
        .first()
        .simulate('click')
      expect(props.onChange).not.toHaveBeenCalled()
      done()
    })
  })
})

describe('Input Search open', () => {
  const options = [{ label: 'One', value: 1 }, { label: 'Two', value: 2 }]
  const handleChange = jest.fn()
  const select = mount(<InputSelect options={options} value={1} onChange={handleChange} />)
  select.setState({ isOpen: true })
  const event = {
    preventDefault: jest.fn(),
    stopPropagation: jest.fn()
  }

  afterEach(() => {
    select.setState({
      isOpen: true,
      searchValue: '',
      focusedIndex: 0
    })
  })

  it('should render options', done => {
    expect(select.find(InputSelectOptions).props().options).toEqual(options)
    done()
  })

  it('should set focusedIndex on option focus', done => {
    select.setState({ isOpen: true })
    select
      .find('Option')
      .at(1)
      .simulate('mouseenter')

    expect(select.state('focusedIndex')).toBe(1)
    done()
  })

  it('should call onchange handler on option select', done => {
    select
      .find(InputSelectOption)
      .at(1)
      .simulate('click')

    expect(handleChange).toHaveBeenLastCalledWith(2, { label: 'Two', value: 2 })
    done()
  })

  // Key down events
  it('should focus next option on arrow down', done => {
    event.key = 'ArrowDown'
    select.instance().handleKeyDown(event)
    expect(select.state('focusedIndex')).toBe(1)
    done()
  })

  it('should focus previous option on arrow up', done => {
    event.key = 'ArrowUp'
    select.instance().handleKeyDown(event)
    expect(select.state('focusedIndex')).toBe(1)
    done()
  })

  it('should focus on last option on end key', done => {
    event.key = 'End'
    select.instance().handleKeyDown(event)
    expect(select.state('focusedIndex')).toBe(1)

    done()
  })

  it('should focus on first option on home key', done => {
    event.key = 'Home'
    select.setState({ focusedIndex: 1 })
    select.instance().handleKeyDown(event)
    expect(select.state('focusedIndex')).toBe(0)

    done()
  })

  it('should close menu on escape key', done => {
    event.key = 'Escape'
    select.instance().handleKeyDown(event)
    expect(select.state('isOpen')).not.toBeTruthy()
    done()
  })

  it('should select focused option on Enter key', done => {
    event.key = null
    event.keyCode = 13
    select.setState({ isOpen: true, focusedIndex: 0 })
    select.instance().handleKeyDown(event)
    expect(handleChange).toHaveBeenLastCalledWith(1, { label: 'One', value: 1 })
    done()
  })
*/
