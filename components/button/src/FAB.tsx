import React, { PureComponent, ReactNode, Children } from 'react'
import Icons, { IconName } from '@myntra/uikit-component-icon'
import Dropdown from '@myntra/uikit-component-dropdown'
import Button from './button'
import classnames from './FAB.module.scss'
import { KIND } from './constants'

export interface Props extends BaseProps {
  direction: 'up' | 'left' | 'down' | 'right'
  /**
   * Disables the button (changes visual style and ignores button interactions).
   */
  disabled?: boolean
  /**
   * Event to trigger dropdown
   */
  triggerOn?: 'hover' | 'click' | 'focus'
  /** The handler to call when the button is clicked. */
  onClick?(event: MouseEvent): void
  className: string
  icon: IconName
}

export default class FAB extends PureComponent<
  Props,
  {
    isOpen: boolean
  }
> {
  static propTypes = {
    __$validation({ children }) {
      if (Children.toArray(children).length < 2)
        throw new Error(
          `Floating action button should have more than 1 action button`
        )
    },
  }

  state = {
    isOpen: false,
  }

  static defaultProps = {
    direction: 'up',
    triggerOn: 'click',
    disabled: false,
  }

  handleDropdownOpen = () => this.setState({ isOpen: true })
  handleDropdownClose = () => this.setState({ isOpen: false })

  getReactNodes(nodes) {
    const { direction } = this.props
    return nodes.map((item: any, index) => (
      <li className={classnames('fab-list__item', direction)}>
        {React.cloneElement(item, { type: KIND.text, key: index })}
      </li>
    ))
  }

  render() {
    const {
      direction,
      disabled,
      onClick,
      children,
      className,
      triggerOn,
      icon,
      ...props
    } = this.props

    const { isOpen } = this.state

    const nodes = Children.toArray(children)
    const reactNodes = this.getReactNodes(nodes)
    return (
      <Dropdown
        up={direction === 'up'}
        left={direction === 'left'}
        down={direction === 'down'}
        right={direction === 'right'}
        container={true}
        trigger={<Button icon="ellipsis-v" />}
        isOpen={isOpen}
        onOpen={this.handleDropdownOpen}
        onClose={this.handleDropdownClose}
        triggerOn={triggerOn}
        wrapperClassName="no-shadow"
        {...props}
      >
        <ul className={classnames('fab-list', direction)}>
          {['down', 'left'].includes(direction)
            ? reactNodes.reverse()
            : reactNodes}
        </ul>
      </Dropdown>
    )
  }
}
