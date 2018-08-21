import React from 'react'
import PropTypes from 'prop-types'
import { Transition } from 'react-transition-group'
import { classnames } from '@myntra/uikit-utils'

import styles from './Accordion.module.css'

/**
 @since 0.3.0
 @status EXPERIMENTAL
 @example
 <Accordion.Item title={<span>Collapsed</span>}>
  <span>Expanded</span>
 </Accordion.Item>
*/
function AccordionItem({ show, children, title, onClick, ...props }) {
  return (
    <div {...props}>
      {React.cloneElement(title, { onClick })}
      <Transition in={show} timeout={350}>
        {state => {
          return (
            state !== 'exited' && (
              <div
                className={classnames({
                  collapse: state !== 'exiting',
                  collapsing: state === 'exiting',
                  show
                }).use(styles)}
              >
                <div>{children}</div>
              </div>
            )
          )
        }}
      </Transition>
    </div>
  )
}

AccordionItem.propTypes = {
  /** @private */
  className: PropTypes.string,
  /** @private */
  onClick: PropTypes.func,
  /** @private */
  show: PropTypes.bool,
  children: PropTypes.any.isRequired,
  title: PropTypes.node.isRequired
}

export default AccordionItem
