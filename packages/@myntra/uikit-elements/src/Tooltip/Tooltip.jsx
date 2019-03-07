import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from '../index'

import classnames from './Tooltip.module.css'

/**
 * Tooltip component.
 * @since 0.6.0
 * @status EXPERIMENTAL
 * @example
 * <Tooltip render={<div>Hello</div>} dark triggerOn='click'><Icon name='info-circle'/></Tooltip>
 */
export default class Tooltip extends React.PureComponent {
  static propTypes = {
    /** Position with relative to children */
    position: PropTypes.oneOf(['up', 'down', 'left', 'right']),
    /** Event to display the tooltip */
    triggerOn: PropTypes.oneOf(['hover', 'click', 'focus']),
    /** Displays a tooltip with dark background */
    dark: PropTypes.bool,
    /** Content of the tooltip */
    render: PropTypes.element,
    children: PropTypes.any
  }

  static defaultProps = {
    triggerOn: 'hover',
    position: 'up'
  }

  state = {
    open: false
  }

  render() {
    const positionProps = {
      up: this.props.position === 'up',
      down: this.props.position === 'down',
      left: ['up', 'down', 'left'].includes(this.props.position),
      right: ['up', 'down', 'right'].includes(this.props.position)
    }
    return (
      <Dropdown
        isOpen={this.state.open}
        onClose={() => {
          this.setState({ open: false })
        }}
        onOpen={() => {
          this.setState({ open: true })
        }}
        trigger={this.props.children}
        triggerOn={this.props.triggerOn}
        data-test-id="tooltip-trigger"
        {...positionProps}
      >
        <div className={classnames('tooltip', this.props.position)} data-test-id="tooltip">
          <div
            className={classnames('tooltip-content', this.props.position, this.props.dark ? 'dark' : 'light')}
            data-test-id="content"
          >
            {this.props.render}
          </div>
          <div className={classnames('arrow', this.props.position, this.props.dark ? 'dark' : 'light')} />
        </div>
      </Dropdown>
    )
  }
}
