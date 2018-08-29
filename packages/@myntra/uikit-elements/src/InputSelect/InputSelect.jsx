import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { classnames, memoize, isEqual, findIndex } from '@myntra/uikit-utils'

import styles from './InputSelect.module.css'
import { toArray, createSearchIndex, executeFilterSearch, sortOptions } from './helpers'
import Value from './InputSelectValue'
import Icon from '../Icon/Icon'
import InputProxy from './InputSelectHidden'
import Control from './InputSelectControl'
import Selector from './InputSelectOptions'
import { Dropdown } from '..'

/**
 {describe component}

 @since 0.0.0
 @status REVIEWING
 @example
 <InputSelect options={[{ label: 'One', value: 1}, { label: 'Two', value: 2}]}
    value={this.state.value}
    onChange={(value, option) => this.setState({value})}
  />
 */
export default class InputSelect extends Component {
  static propTypes = {
    /** List of options */
    options: PropTypes.array.isRequired,
    /** Value(s) of selected option(s) */
    value: PropTypes.any,
    /** Event fired when value changes */
    onChange: PropTypes.func.isRequired,
    /** Select multiple options */
    multiple: PropTypes.bool,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    /** Displays options loading indicator */
    isLoading: PropTypes.bool,
    /** Display value of option */
    labelKey: PropTypes.string,
    /** Input value of option */
    valueKey: PropTypes.string,
    // -- Search Customization --
    /**
     * Custom filter logic.
     * @function
     * @param {object} option
     * @returns {boolean}
     */
    filterOptions: PropTypes.func,
    /** Filter options as user types */
    searchable: PropTypes.bool,
    /** List of keys in options object matched for search */
    searchableKeys: PropTypes.arrayOf(PropTypes.string),
    /** Option  */
    renderOption: PropTypes.func,
    noResultsPlaceholder: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    /** Event fired when search text changes */
    onSearch: PropTypes.func,
    /** @private */
    className: PropTypes.string
  }
  static defaultProps = {
    multiple: false,
    disabled: false,
    required: false,
    searchable: true,
    isLoading: false,
    labelKey: 'label',
    placeholder: 'Select...',
    valueKey: 'value',
    searchableKeys: [],
    noResultsPlaceholder: <div className={classnames('no-results').use(styles)}>No results found</div>
  }

  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      searchValue: '',
      prefix: `select-${Date.now()}`,
      focusedIndex: props.disabled ? -1 : 0,
      filteredOptions: []
    }
  }

  componentDidMount() {
    this.setState({
      filteredOptions: this.getFilteredOptions('')
    })
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.options, this.props.options)) {
      this.setState({
        filteredOptions: this.getFilteredOptions(this.searchValue)
      })
    }
  }

  getSearchOptions = memoize(({ labelKey, searchableKeys, filterOptions }) => {
    return {
      searchableKeys: [labelKey, ...searchableKeys],
      sortBy: labelKey,
      sortOrder: 'asc',
      filterOptions: filterOptions
    }
  })

  getSifter = memoize(({ options }) => {
    return createSearchIndex(options)
  })

  getOptionsForValue = memoize(({ value, options, valueKey }) => {
    let target = toArray(value).map(it => options.find(option => option[valueKey] === it))
    if (target.some(it => it === undefined || it === null)) {
      target = [] // options not loaded yet.
    }
    return target
  })

  getFilteredOptions(searchValue) {
    if (!this.props.searchable) {
      return sortOptions(this.props.options, searchValue, this.props.labelKey)
    } else {
      return executeFilterSearch(this.sifter, this.props.options, searchValue, this.searchOptions)
    }
  }

  get searchOptions() {
    return this.getSearchOptions(this.props)
  }

  get sifter() {
    return this.getSifter(this.props)
  }

  get filteredOptions() {
    return this.state.filteredOptions
  }

  get optionsForValue() {
    return this.getOptionsForValue(this.props)
  }

  get searchValue() {
    return this.state.searchValue
  }

  handleOpen = () => {
    this.setState({ isOpen: true, focusedIndex: -1 })
  }

  handleClose = () => {
    this.setState({ isOpen: false, searchValue: '' })
  }

  focusPreviousOption() {
    const count = this.filteredOptions.length

    this.setState({
      focusedIndex: (count + (this.state.focusedIndex - 1)) % count
    })
  }

  focusNextOption() {
    const count = this.filteredOptions.length

    this.setState({
      focusedIndex: (count + (this.state.focusedIndex + 1)) % count
    })
  }

  focusEndOption() {
    const index = this.filteredOptions.length - 1
    if (this.state.focusedIndex !== index) {
      this.setState({
        focusedIndex: index
      })
    }
  }

  focusStartOption() {
    const index = 0
    if (this.state.focusedIndex !== index) {
      this.setState({
        focusedIndex: index
      })
    }
  }

  selectFocusedOption() {
    const option = this.filteredOptions[this.state.focusedIndex]

    if (option) {
      this.selectValue(option)
    }
  }

  selectValue(option) {
    if (this.props.multiple) {
      if (findIndex(this.optionsForValue, option) < 0) {
        const value = toArray(this.props.value).slice()
        const values = this.optionsForValue.slice()

        value.push(option[this.props.valueKey])
        values.push(option)

        this.props.onChange(value, values)
      } else {
        this.handleRemove(option)
      }
    } else {
      this.props.onChange(option[this.props.valueKey], option)
      this.handleClose()
    }
  }

  handleRemove = option => {
    if (this.props.multiple) {
      const selected = toArray(this.props.value).slice()
      if (this.props.required && selected.length === 1) return
      if (!option) {
        return this.props.onChange([], [])
      }

      const value = option[this.props.valueKey]
      const newSelected = selected.filter(it => it !== value)
      const newOptions = this.optionsForValue.filter(it => it[this.props.valueKey] !== value)

      this.props.onChange(newSelected, newOptions)
    } else if (!this.props.required) {
      this.props.onChange(null)
    }
  }

  handleClearValue = event => {
    if (!this.props.multiple) {
      const options = this.optionsForValue

      if (options.length) {
        event.stopPropagation()
        event.preventDefault()

        this.handleRemove(options[0])
      }
    }
  }

  handleKeyDown = event => {
    switch (event.key || event.keyCode) {
      case 'Tab':
      case 9:
        if (event.shiftKey || !this.state.isOpen) break
        if (!this.props.disabled) {
          this.selectFocusedOption()
        }
        break
      case 'Enter':
      case 13:
        event.preventDefault()
        event.stopPropagation()
        if (this.state.isOpen && !this.props.disabled) {
          this.selectFocusedOption()
        } else {
          this.focusNextOption()
        }
        break
      case 'Escape':
      case 27:
        event.preventDefault()
        if (this.state.isOpen) {
          this.handleClose()
          event.stopPropagation()
        }
        break
      case ' ':
      case 32: // space
        if (this.props.searchable || !this.state.isOpen) break
        event.preventDefault()
        event.stopPropagation()
        this.selectFocusedOption()
        break
      case 'ArrowUp':
      case 38: // up
        event.preventDefault()
        this.focusPreviousOption()
        break
      case 'ArrowDown':
      case 40: // down
        event.preventDefault()
        this.focusNextOption()
        break
      case 'End':
      case 35: // end key
        if (event.shiftKey) break
        event.preventDefault()
        this.focusEndOption()
        break
      case 'Home':
      case 36: // home key
        if (event.shiftKey) break
        event.preventDefault()
        this.focusStartOption()
        break
      default:
        break
    }
  }

  handleInput = searchValue => {
    if (searchValue !== this.searchValue) {
      this.setState({
        searchValue,
        focusedIndex: -1,
        filteredOptions: this.getFilteredOptions(searchValue)
      })
    }

    if (this.props.onSearch) this.props.onSearch(searchValue)
  }

  handleOptionFocus = (event, option, focusedIndex) => {
    if (this.state.focusedIndex !== focusedIndex) {
      this.setState({ focusedIndex })
    }
  }

  handleOptionSelect = (event, option) => this.selectValue(option)

  render() {
    const values = toArray(this.props.value)
    const { multiple, noResultsPlaceholder, renderOption, valueKey, labelKey } = this.props

    return (
      <Dropdown
        left
        right
        className={classnames('select', { disabled: this.props.disabled }).use(styles)}
        isOpen={this.state.isOpen}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
        trigger={
          <Control
            multiple={this.props.multiple}
            placeholder={values.length ? null : this.props.placeholder}
            value={this.state.searchValue}
            onChange={this.handleInput}
            onKeyDown={this.handleKeyDown}
            disabled={this.props.disabled}
            slotValue={
              <Value
                optionsForValues={this.optionsForValue}
                labelKey={this.props.labelKey}
                disabled={this.props.disabled}
                underlay={this.state.isOpen}
                onRemove={this.handleRemove}
              />
            }
          >
            <InputProxy values={values} {...this.props} />
            {!(this.props.disabled || this.props.required || this.props.multiple) &&
              values.length > 0 && (
                <div className={classnames('button').use(styles)} role="button" onClick={this.handleClearValue}>
                  <Icon name="cross" title="clear value" />
                </div>
              )}
            <div className={classnames('button').use(styles)}>
              {this.props.isLoading ? (
                <Icon className={classnames('state-icon').use(styles)} name="spinner" title="loading options" spin />
              ) : (
                <Icon
                  role="button"
                  className={classnames('state-icon').use(styles)}
                  title={this.state.isOpen ? 'close' : 'open'}
                  name={this.state.isOpen ? 'chevron-up' : 'chevron-down'}
                />
              )}
            </div>
          </Control>
        }
      >
        <Selector
          instancePrefix={this.state.prefix}
          focusedIndex={this.state.focusedIndex}
          onOptionFocus={this.handleOptionFocus}
          onOptionSelect={this.handleOptionSelect}
          options={this.filteredOptions}
          values={values}
          multiple={multiple}
          renderOption={renderOption}
          valueKey={valueKey}
          labelKey={labelKey}
          noResultsPlaceholder={noResultsPlaceholder}
        />
      </Dropdown>
    )
  }
}
