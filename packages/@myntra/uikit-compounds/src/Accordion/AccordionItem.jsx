import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Consumer } from './Accordion'

// eslint-disable-next-line
const FragmentWithFallback = Fragment || (({ children }) => <div style={{ display: 'contents' }}>{children}</div>)

/* eslint-disable react/prop-types */
function Item({ active, onChange, register, title, children }) {
  const index = register()
  const handleClick = event => {
    onChange(index)

    title.props && title.props.onClick && title.props.onClick(event)
  }

  return (
    <FragmentWithFallback>
      {React.cloneElement(title, { onClick: handleClick })}
      {active === index && children}
    </FragmentWithFallback>
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
class AccordionItem extends Component {
  static propTypes = {
    /** @private */
    className: PropTypes.string,
    title: PropTypes.node.isRequired,
    children: PropTypes.any.isRequired
  }

  static contextTypes = {
    'UIKit.Accordion': PropTypes.any
  }

  render() {
    if (!React.createContext) {
      if (!this.context['UIKit.Accordion']) return null

      const { register, ...context } = this.context['UIKit.Accordion']

      return <Item {...this.props} {...context} register={() => register(this)} />
    }

    return (
      <Consumer>
        {({ register, ...context }) => {
          return <Item {...this.props} {...context} register={() => register(this)} />
        }}
      </Consumer>
    )
  }
}

export default AccordionItem
