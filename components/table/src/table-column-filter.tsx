import React, { ReactElement } from 'react'
import Dropdown from 'components/dropdown/src/dropdown'
import Icon from '@myntra/uikit-component-icon'
import classnames from './table-column-filter.module.scss'
import { TableColumnProps } from './table-column'

export interface TableColumnFilterProps extends BaseProps {
  /** List of options */
  options: Record<string, any>[]
  /** Title for the search filter */
  title: string
  /** Multi select */
  multiple: boolean
  /** Select handler */
  onSelect?(values: any[], options: any[]): void
  /** Label Key */
  labelKey: string
  /** Value Key */
  valueKey: string
  /** Whether filter is searchable */
  searchable: boolean
  /** Selected values in filter dropdown */
  value: (string | number | any)[]

  children: ReactElement<TableColumnProps>
}

/**
 * Column filter for Table
 *
 *  @since 0.3.0
 *  @status EXPERIMENTAL
 **/

export default class TableColumnFilter extends React.PureComponent<
  TableColumnFilterProps,
  {
    filteredOptions: Record<string, any>[]
    focusedIndex: number
    isOpen: boolean
  }
> {
  static defaultProps = {
    multiple: false,
    labelKey: 'label',
    valueKey: 'value',
    searchText: '',
    searchable: false,
    value: [],
    options: [],
  }

  state = {
    filteredOptions: [],
    focusedIndex: -1,
    isOpen: false,
  }

  get filteredOptions() {
    return this.state.filteredOptions
  }

  handleSelect = (event, option) => {
    const values = this.props.value
    const valueIndex = values.findIndex((it) => it === option.value)

    if (!this.props.multiple) {
      this.setState({
        isOpen: false,
      })
      this.props.onSelect && this.props.onSelect([option.value], [option])
      return
    }

    let newValues = []
    if (valueIndex < 0) {
      newValues = values.concat(option.value)
    } else {
      newValues = values.filter((it) => it !== option.value)
    }
    const options = newValues.map((value) => {
      return this.props.options.find((option) => option.value === value)
    })
    this.props.onSelect && this.props.onSelect(newValues, options)
  }

  handleFocus = (event, option, focusedIndex) => {
    if (this.state.focusedIndex !== focusedIndex) {
      this.setState({ focusedIndex, isOpen: true })
    }
  }

  handleSearch = (searchText, { focusedIndex, filteredOptions }) => {
    this.setState({ focusedIndex, filteredOptions })
  }

  handleOpen = () => {
    setTimeout(() => {
      this._search.focus()
    }, 0)
    this.setState({ isOpen: true })
  }

  handleClose = () => {
    this.setState({ isOpen: false })
  }

  handleClear = () => {
    this.setState(
      {
        values: [],
      },
      this.props.onSelect && this.props.onSelect([], [])
    )
  }

  render() {
    return (
      <Dropdown
        container
        isOpen={this.state.isOpen}
        onClose={this.handleClose}
        onOpen={this.handleOpen}
        trigger={
          <div data-test-id="filter-trigger">
            <div className={classnames('trigger')}>
              {this.props.children}
              <Icon name="caret-down" />
            </div>
            {this.props.value.length > 0 && !this.state.isOpen && (
              <Tag title={`${this.props.value.length} Selected`} />
            )}
          </div>
        }
      >
        <div className={classnames('filter')}>
          <div className={classnames('search')}>
            <InputSelect.Search
              ref={(search) => {
                this._search = search
              }}
              hidden={!this.props.searchable}
              searchable={this.props.searchable}
              multiple={this.props.multiple}
              options={this.props.options}
              labelKey={this.props.labelKey}
              valueKey={this.props.valueKey}
              focusedIndex={this.state.focusedIndex}
              placeholder="Type Here"
              onOptionFocus={this.handleFocus}
              onClose={this.handleClose}
              onSearch={this.handleSearch}
              onSelect={this.handleSelect}
              isOpen={this.state.isOpen}
            />
          </div>
          {this.props.value.length ? (
            <div className={classnames('labels')}>
              <div className={classnames('selected')}>{`${
                this.props.value.length
              } Selected`}</div>
              <div className={classnames('clear')} onClick={this.handleClear}>
                Clear All
              </div>
            </div>
          ) : null}
          <InputSelect.Selector
            options={this.filteredOptions}
            values={this.props.value}
            focusedIndex={this.state.focusedIndex}
            onOptionSelect={this.handleSelect}
            onOptionFocus={this.handleFocus}
            multiple={this.props.multiple}
            labelKey={this.props.labelKey}
            valueKey={this.props.valueKey}
            noResultsPlaceholder={<div>No results found</div>}
            data-test-id="filter-options"
          />
        </div>
      </Dropdown>
    )
  }
}
