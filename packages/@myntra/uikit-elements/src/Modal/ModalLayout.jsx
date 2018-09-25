import React from 'react'
import PropTypes from 'prop-types'
import { classnames } from '@myntra/uikit-utils'
import styles from './Modal.module.css'

/**
 @since 0.3.0
 @status EXPERIMENTAL
 @example
 <Modal.Layout title="Example Modal" actions={close => <Button onClick={close}>Okay</Button>}>
   <p>A simple modal with a form.</p>

   <Form.Text label="Name" description="Your name."/>

   <p>You can render anything here!!</p>

   <Image src="//picsum.photos/200" height={200}  width={200} />
 </Modal.Layout>
 */
function ModalLayout({ title, actions, children, close }) {
  return (
    <div className={classnames('wrapper').use(styles)}>
      {title && <h1>{title}</h1>}

      {children}

      {actions && (
        <div className={classnames('actions').use(styles)}>
          {typeof actions === 'function' ? actions(close) : actions}
        </div>
      )}
    </div>
  )
}

ModalLayout.propTypes = {
  /** Contents */
  children: PropTypes.any.isRequired,
  /** Modal title */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /** Action buttons */
  actions: PropTypes.oneOfType([PropTypes.func, PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  /** Trigger close action */
  close: PropTypes.func
}

export default ModalLayout
