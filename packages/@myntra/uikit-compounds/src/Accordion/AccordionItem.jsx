import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Consumer } from './Accordion'

/* eslint-disable react/prop-types */
function Item({ active, onChange, register, title, children }) {
  const index = register()
  const handleClick = event => {
    onChange(index)

    title.props && title.props.onClick && title.props.onClick(event)
  }

  return (
    <Fragment>
      {React.cloneElement(title, { onClick: handleClick })}
      {active === index && children}
    </Fragment>
  )
}
/* eslint-enable react/prop-types */

/**
 @since 0.3.0
 @status EXPERIMENTAL
 @example
 <Accordion.Item title={<span>Collapsed</span>}>
  <span>Expanded</span>
 </Accordion.Item>
*/
class AccordionItem extends PureComponent {
  static propTypes = {
    /** @private */
    className: PropTypes.string,
    title: PropTypes.node.isRequired,
    children: PropTypes.any.isRequired
  }

  render() {
    return (
      <Consumer>
        {({ register, ...context }) => <Item {...this.props} {...context} register={() => register(this)} />}
      </Consumer>
    )
  }
}

export default AccordionItem
