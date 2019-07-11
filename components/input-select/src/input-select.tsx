import React, { Component, RefObject } from 'react'
import { memoize, toArray } from '@myntra/uikit-utils'

import classnames from './input-select.module.scss'
import Dropdown from '@myntra/uikit-component-dropdown'
import List from '@myntra/uikit-component-list'
import Icon from '@myntra/uikit-component-icon'

import InputSelectValue from './input-select-value'
import InputSelectControl from './input-select-control'

export interface Props<Value = any, Option = any> extends BaseProps {
  /**
   * A list of options for the select element.
   */
  options: Option[]
  /**
   * Selected option value (array of option values for [multiple](#InputSelect-multiple) select element).
   */
  value: Value
  /**
   * The callback function to call when the value changes.
   */
  onChange?(value: Value): void
  /**
   * The handler to call when the user types in search field.
   */
  onSearch?(text: string): void

  /**
   * A render function to display option in options dropdown.
   * @param option - One of the [options](#InputSelect-options) list.
   */
  renderOption?(option: Option): JSX.Element
  /**
   * A render function to display empty state when no options are available.
   * @since 0.11.0
   */
  renderEmptyState?(): JSX.Element

  /**
   * A placeholder message.
   */
  placeholder?: string

  /**
   * Allows multiple option selection.
   */
  multiple?: boolean
  /**
   * Disables all interaction on the select field.
   */
  disabled?: boolean
  /**
   * Allows only previewing selected options.
   */
  readOnly?: boolean
  /**
   *  Makes select field required.
   */
  required?: boolean

  /**
   * Displays a spinner while options are being loaded.
   */
  isLoading?: boolean

  /**
   * Displays a search box for filtering select options.
   */
  searchable?: boolean
  /**
   * List of key names in [option](#InputSelect-options) object use to search select options.
   */
  searchableKeys?: string[]

  /**
   * Name of the property to use as display value (or label) of option.
   */
  labelKey?: string
  /**
   * Name of the property to use as actual value (or label) of option.
   */
  valueKey?: string

  /**
   * A function to filter options with custom filtering logic.
   */
  filterOptions?(option: Option): boolean

  /**
   * @deprecated - Use [renderEmptyState](#InputSelect-renderEmptyState) instead.
   */
  noResultsPlaceholder?: string | JSX.Element
}

let SELECT_COMPONENT_COUNTER = 0

/**
 * A custom implementation of select input element to support option list customization.
 *
 * @since 0.0.0
 * @status READY
 * @category input
 * @see http://uikit.myntra.com/components/input-select
 */
export default class InputSelect<Value = any, Option = any> extends Component<
  Props<Value, Option>,
  {
    isOpen: boolean
    prefix: string
    options: Option[]
  }
> {
  controlRef: RefObject<InputSelectControl>
  listRef: RefObject<List>

  static defaultProps = {
    options: [],
    multiple: false,
    disabled: false,
    required: false,
    isLoading: false,
    readOnly: false,
    searchable: true,
    placeholder: 'Select...',
    labelKey: 'label',
    valueKey: 'value',
    searchableKeys: [],
    renderEmptyState() {
      return <div className={classnames('empty')}>No results found</div>
    },
  }

  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      prefix: `uikit-select-${++SELECT_COMPONENT_COUNTER}`,
      options: props.options,
    }

    this.controlRef = React.createRef()
    this.listRef = React.createRef()
  }

  getOptionsForValue = memoize(({ value, options, valueKey }) => {
    let target = toArray(value).map((it) =>
      options.find((option) => option[valueKey] === it)
    )
    if (target.some((it) => it === undefined || it === null)) {
      target = [] // options not loaded yet.
    }
    return target
  })

  handleOpen = () => this.setState({ isOpen: true })

  handleClose = () => {
    this.setState({ isOpen: false })
    this.controlRef.current && this.controlRef.current.resetSearch()
  }

  handleOptionChange = (options) => this.setState({ options })

  handleKeyDown = (event) => {
    if (!this.state.isOpen) this.setState({ isOpen: true })

    this.listRef.current && this.listRef.current.handleKeyPress(event)
  }

  handleChange = (value) => {
    if (!this.props.multiple) this.handleClose()
    this.props.onChange && this.props.onChange(value)
  }

  render() {
    const { valueKey, labelKey } = this.props
    return (
      <Dropdown
        left
        right
        container
        className={classnames('container', { disabled: this.props.disabled })}
        isOpen={this.state.isOpen}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
        data-test-id="dropdown"
        renderTrigger={(props) => (
          <div className={classnames('trigger')} {...props}>
            <InputSelectControl
              ref={this.controlRef}
              value={this.props.value}
              onChange={this.handleChange}
              options={this.props.options}
              onOptionsChange={this.handleOptionChange}
              labelKey={this.props.labelKey}
              valueKey={this.props.valueKey}
              isOpen={this.state.isOpen}
              searchableKeys={this.props.searchableKeys}
              searchable={this.props.searchable}
              resettable={!this.props.required && !this.props.readOnly}
              renderPlaceholder={() => (
                <InputSelectValue
                  placeholder={this.props.placeholder}
                  disabled={this.props.disabled}
                  value={this.props.value}
                  valueKey={this.props.valueKey}
                  labelKey={this.props.labelKey}
                  hasOverlay={this.state.isOpen}
                  options={this.props.options}
                  data-test-id="value"
                />
              )}
              instancePrefix={this.state.prefix}
              filterOptions={this.props.filterOptions}
              onKeyDown={this.handleKeyDown}
              data-test-id="control"
            >
              <div className={classnames('button')}>
                {this.props.isLoading ? (
                  <Icon
                    className={classnames('state-icon')}
                    name="spinner"
                    title="loading options"
                    spin
                    data-test-id="loading"
                  />
                ) : (
                  <Icon
                    role="button"
                    className={classnames('state-icon')}
                    title={this.state.isOpen ? 'close' : 'open'}
                    name={this.state.isOpen ? 'chevron-up' : 'chevron-down'}
                    onClick={(event) =>
                      this.state.isOpen && event.stopPropagation()
                    }
                    data-test-id="chevron"
                  />
                )}
              </div>
            </InputSelectControl>
          </div>
        )}
      >
        <div className={classnames('selector')}>
          {this.state.options.length ? (
            <List
              className={classnames('list')}
              ref={this.listRef}
              value={this.props.value}
              items={this.state.options}
              onChange={this.handleChange}
              idForItem={(item) => item[valueKey]}
              multiple={this.props.multiple}
              tabIndex={1}
              virtualized={this.props.options.length > 50}
              data-test-id="selector"
              id={`${this.state.prefix}-options`}
            >
              {({ item }) => item[labelKey]}
            </List>
          ) : (
            this.props.noResultsPlaceholder || this.props.renderEmptyState()
          )}
        </div>
      </Dropdown>
    )
  }
}
