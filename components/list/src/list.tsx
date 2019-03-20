import React, { PureComponent } from 'react'
import classnames from './list.module.scss'

export interface ListProps<T = any> extends BaseProps {
  /**
   * An array of items to render in the list.
   */
  items: T[]

  /**
   * Renders markup for displaying a list item.
   */
  children(props: { index: number; id: string | number | T; item: T }): void

  /**
   * The selected value in the list.
   */
  value?: T | T[]

  /**
   * The callback fired when a list item is selected or unselected.
   */
  onChange?(value: T | T[]): void

  /**
   * A getter function to get unique ID of a list item.
   */
  idForItem?(item: T): T | number | string

  /**
   * Checks if the item is disabled or not.
   */
  isItemDisabled?(item: T): boolean

  /**
   * Sets selection mode to multiple.
   */
  multiple?: boolean
}

/**
 * An accessible list of item.
 *
 * @since 0.10.0
 * @status READY
 * @category basic
 * @see http://uikit.myntra.com/components/list
 */
export default class List extends PureComponent<ListProps, { activeIndex: number }> {
  static defaultProps = {
    idForItem: item => item,
    isItemDisabled: () => false
  }

  idPrefix: string
  isMac: boolean
  ref: React.RefObject<HTMLUListElement>

  state = {
    activeIndex: -1
  }

  constructor(props) {
    super(props)

    this.idPrefix = `list-${Date.now()}`
    this.isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
    this.ref = React.createRef()
  }

  componentDidUpdate() {
    if (this.ref.current && this.state.activeIndex >= 0) {
      // TODO: ScrollIntoView if required.
    }
  }

  get activeItemHTMLId() {
    if (this.state.activeIndex >= 0) return `${this.idPrefix}-option-${this.state.activeIndex}`

    return null
  }

  computeSelectedIds() {
    return this.props.value != null
      ? new Set((Array.isArray(this.props.value) ? this.props.value : [this.props.value]).map(this.props.idForItem))
      : new Set()
  }

  updateValueById(id: any) {
    if (!id) return
    if (!this.props.onChange) return

    if (!this.props.multiple) {
      return this.props.onChange(id === this.props.value ? null : id)
    }

    const ids = this.computeSelectedIds()

    let value = this.props.value ? (this.props.value as Array<any>).slice() : []

    if (ids.has(id)) {
      const index = value.indexOf(id)

      value.splice(index, 1)
    } else {
      value.push(id)
    }

    return this.props.onChange(value)
  }

  updateValueByRange(start: number, end: number, toggle: boolean = true) {
    if (!this.props.multiple) return
    if (!this.props.onChange) return

    const { idForItem, items, isItemDisabled } = this.props
    const ids = this.computeSelectedIds()

    let value = this.props.value ? (this.props.value as Array<any>).slice() : []

    for (let index = start; index <= end; ++index) {
      const id = idForItem(items[index])
      

      if (ids.has(id)) {
        if (toggle) value.splice(value.indexOf(id), 1)
      } else {
        value.push(id)
      }
    }

    this.props.onChange(value)
  }

  updateValueByIndex(index: number) {
    return this.updateValueById(this.props.idForItem(this.props.items[index]))
  }

  handleClick = ({ id }: { id: any; index: number }) => this.updateValueById(id)

  handleKeyPress = (event: KeyboardEvent) => {
    const N = this.props.items.length
    const { activeIndex } = this.state
    const { multiple } = this.props
    const isCMD = this.isMac ? event.metaKey : event.ctrlKey
    const isShift = event.shiftKey

    let preventDefault = true
    let key = event.key

    if (isCMD) {
      switch (key) {
        case 'ArrowDown':
          key = 'End'
          break
        case 'ArrowUp':
          key = 'Home'
          break
      }
    }

    switch (key) {
      case 'A':
        if (isCMD && multiple) {
          this.updateValueByRange(0, N - 1, false)
        } else {
          preventDefault = false
        }
        break
      case ' ':
      case 'Space':
        if (activeIndex >= 0) {
          event.stopPropagation()

          this.updateValueByIndex(this.state.activeIndex)
        }
        break
      case 'ArrowDown':
        const nextIndex = (activeIndex + 1) % N
        this.setState({
          activeIndex: nextIndex
        })
        if (isShift) {
          this.updateValueByIndex(activeIndex)
        }
        break
      case 'ArrowUp':
        const prevIndex = (((activeIndex - 1) % N) + N) % N
        this.setState({
          activeIndex: prevIndex
        })
        if (isShift) {
          this.updateValueByIndex(activeIndex)
        }
        break
      case 'Home':
        this.setState({
          activeIndex: 0
        })

        if (isShift && multiple) {
          this.updateValueByRange(0, activeIndex, false)
        }
        break
      case 'End':
        this.setState({
          activeIndex: N - 1
        })

        if (isShift && multiple) {
          this.updateValueByRange(activeIndex, N - 1, false)
        }
        break
      default:
        preventDefault = false
    }

    if (preventDefault) event.preventDefault()
  }

  handleFocus = () => {
    const { multiple, value, idForItem, items } = this.props
    const selectedIDs = this.computeSelectedIds()

    if (!value || (multiple && !value.length)) {
      this.setState({ activeIndex: 0 })

      return // Done.
    }

    this.setState({
      activeIndex: Math.max(0, items.findIndex(item => selectedIDs.has(idForItem(item))))
    })
  }

  handleBlur = () => {
    this.resetActiveIndex()
  }

  resetActiveIndex = () => {
    this.setState({ activeIndex: -1 })
  }

  render() {
    const { items, className, children, idForItem, isItemDisabled, value, onChange, multiple, ...props } = this.props
    const { activeIndex } = this.state
    const selectedIDs = this.computeSelectedIds()

    return (
      <ul
        {...props}
        ref={this.ref}
        className={classnames('list', className, { 'is-single-selectable': !multiple })}
        role="listbox"
        aria-readonly={!onChange}
        aria-required={props.required}
        aria-multiselectable={multiple}
        aria-activedescendant={this.activeItemHTMLId}
        tabIndex={0}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onKeyDown={this.handleKeyPress as any}
        onKeyPress={this.handleKeyPress as any}
      >
        {items.map((item, index) => {
          const id = idForItem(item)
          const isSelected = selectedIDs.has(id)
          const isActive = index === activeIndex
          const isDisabled = isItemDisabled(item)

          return (
            <li
              key={id}
              role="option"
              aria-selected={isSelected}
              id={`${this.idPrefix}-option-${index}`}
              data-index={index}
              data-id={id}
              className={classnames('item', { 'is-selected': isSelected, 'is-active': isActive, 'is-disabled': isDisabled })}
              onMouseEnter={this.resetActiveIndex}
              onClick={() => !isDisabled && this.handleClick({ id, index })}
            >
              <input
                className={classnames('checkbox')}
                type="checkbox"
                checked={isSelected}
                tabIndex={-1}
                readOnly
                hidden={!multiple}
                disabled={isDisabled}
              />
              {children({ index, id, item })}
            </li>
          )
        })}
      </ul>
    )
  }
}
