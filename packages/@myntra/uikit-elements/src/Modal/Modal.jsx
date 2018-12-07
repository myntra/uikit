import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Button, Portal } from '../index.js'

import ModalLayout from './ModalLayout'
import classnames from './Modal.module.css'

// eslint-disable-next-line
const FragmentWithFallback = Fragment || (({ children }) => <div style={{ display: 'contents' }}>{children}</div>)

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
    const { trigger, children, isOpen, render, title, actions } = this.props

    const content = (
      <div className={classnames('modal')}>
        <div className={classnames('backdrop')} onClick={this.handleClose} />
        <div className={classnames('body')}>
          <div className={classnames('content')}>{render({ title, actions, children, close: this.handleClose })}</div>

          <Button className={classnames('close')} type="link" icon="times" title="close" onClick={this.handleClose} />
        </div>
      </div>
    )

    return (
      <FragmentWithFallback>
        {typeof trigger === 'string' ? (
          <Button label={trigger} secondaryIcon="chevron-down" onClick={this.handleOpen} />
        ) : trigger ? (
          React.cloneElement(trigger, { onClick: this.handleOpen })
        ) : null}
        {(typeof isOpen === 'boolean' ? isOpen : this.state.isOpen) && <Portal container>{content}</Portal>}
      </FragmentWithFallback>
    )
  }
}

Modal.Layout = ModalLayout

export default Modal
