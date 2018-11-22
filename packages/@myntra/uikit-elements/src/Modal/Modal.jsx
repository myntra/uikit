import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Dropdown } from '../index.js'
import { classnames } from '@myntra/uikit-utils'
import ModalLayout from './ModalLayout'
import styles from './Modal.module.css'

import './Modal.css'

/**
 A component to display popup modal.

 @since 0.3.0
 @status EXPERIMENTAL
 @example
 <Modal trigger="Open Modal" title="Example Modal" actions={close => <Button onClick={close}>Okay</Button>}>
   <p>A simple modal with a form.</p>

   <Form.Text label="Name" description="Your name."/>

   <p>You can render anything here!!</p>

   <Image src="//picsum.photos/200" height={200}  width={200} />
 </Modal>
 */
class Modal extends PureComponent {
  static propTypes = {
    /** Contents of the popup modal */
    children: PropTypes.any.isRequired,
    /** @private */
    className: PropTypes.string,
    /** Trigger to open modal */
    trigger: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.element.isRequired]),
    /** Modal title */
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    /** Action buttons */
    actions: PropTypes.oneOfType([PropTypes.func, PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
    /** Dropdown state */
    isOpen: PropTypes.bool,
    /**
     * Event fired when dropdown drawer is displayed
     * @function
     */
    onOpen: PropTypes.func,
    /**
     * Event fired when dropdown drawer is closed
     * @function
     */
    onClose: PropTypes.func,
    /**
     * Render a custom wrapper.
     */
    render: PropTypes.func
  }

  static defaultProps = {
    render: ModalLayout
  }

  state = {
    isOpen: false
  }

  handleOpen = () => {
    this.setState({ isOpen: true })
    this.props.onOpen && this.props.onOpen(true)
  }

  handleClose = () => {
    this.setState({ isOpen: false })
    this.props.onClose && this.props.onClose(false)
  }

  render() {
    const { trigger, children, isOpen, render, title, actions, ...props } = this.props

    const content = (
      <div className={classnames('modal').use(styles)}>
        <div className={classnames('backdrop').use(styles)} onClick={this.handleClose} />
        <div className={classnames('body').use(styles)}>
          <div className={classnames('content').use(styles)}>
            {render({ title, actions, children, close: this.handleClose })}
          </div>

          <Button
            className={classnames('close').use(styles)}
            type="link"
            icon="times"
            title="close"
            onClick={this.handleClose}
          />
        </div>
      </div>
    )

    return trigger ? (
      <Dropdown
        {...props}
        useClickAway={false}
        trigger={typeof trigger === 'string' ? <Button type="primary">{trigger}</Button> : trigger}
        isOpen={typeof isOpen === 'boolean' ? isOpen : this.state.isOpen}
        onOpen={this.handleOpen}
        container
      >
        {content}
      </Dropdown>
    ) : (
      (typeof isOpen === 'boolean' ? isOpen : this.state.isOpen) && content
    )
  }
}

Modal.Layout = ModalLayout

export default Modal
