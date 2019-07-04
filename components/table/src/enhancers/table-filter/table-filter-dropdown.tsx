import React, { Component } from 'react'
import Dropdown from '@myntra/uikit-component-dropdown'
import Icon from '@myntra/uikit-component-icon'
import List from '@myntra/uikit-component-list'
import InputText from '@myntra/uikit-component-input-text'
import Field from '@myntra/uikit-component-field'

import classnames from './table-filter-dropdown.module.scss'

export interface Props<V = any, O = { value: any; label: string }> {
  columnId: string
  value: Record<string, V[]>
  options?: O[]
  data: any[]

  onChange(value: Record<string, V[]>): void
  getter(item: O): V
  renderOption?(item: O): JSX.Element
}

export default class TableFilterDropdown extends Component<
  Props,
  {
    isOpen: boolean
    searchText: string
    options: Array<{ value: any; label: string }>
    rawOptions: Array<{ value: any; label: string }>
  }
> {
  static defaultProps = {
    renderOption(item) {
      return item.label
    },
  }

  constructor(props) {
    super(props)

    const options =
      props.options ||
      Array.from(new Set(props.data.map((item) => props.getter(item)))).map(
        (value) => ({ value, label: value })
      )

    this.state = {
      isOpen: false,
      searchText: '',
      options: options,
      rawOptions: options,
    }
  }

  get value() {
    return this.props.value ? this.props.value[this.props.columnId] : null
  }

  // TODO: Refresh options if options change.
  handleChange = (value: any[]) => {
    this.props.onChange({
      ...this.props.value,
      [this.props.columnId]: value,
    })
  }

  idForItem = (item: any) => item.value
  handleOpen = () => this.setState({ isOpen: true })
  handleClose = () => this.setState({ isOpen: false, ...this.onSearch('') })
  handleSearch = (searchText: string) =>
    this.setState(this.onSearch(searchText))

  onSearch(searchText: string) {
    const rawOptions = this.props.options || this.state.rawOptions
    const re = new RegExp(
      searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
      'i'
    )
    const options = !searchText
      ? rawOptions
      : rawOptions.filter((option) => re.test(option.label))

    return {
      searchText,
      options,
    }
  }

  render() {
    return (
      <Dropdown
        isOpen={this.state.isOpen}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
        renderTrigger={(props) => (
          <div
            className={classnames('filter-trigger', {
              active: this.value && this.value.length,
            })}
            {...props}
          >
            <Icon name={this.state.isOpen ? 'chevron-up' : 'chevron-down'} />
          </div>
        )}
        container
      >
        <div className={classnames('filter-container')}>
          <Field className={classnames('search')} title="Filter column">
            <InputText
              value={this.state.searchText}
              onChange={this.handleSearch}
              type="search"
              placeholder="Search..."
            />
          </Field>
          <List
            className={classnames('list')}
            idForItem={this.idForItem}
            multiple
            items={this.state.options}
            value={this.value}
            onChange={this.handleChange}
          >
            {({ item }) => this.props.renderOption(item)}
          </List>
        </div>
      </Dropdown>
    )
  }
}
