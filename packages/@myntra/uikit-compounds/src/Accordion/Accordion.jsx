import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import AccordionItem from './AccordionItem'
import { onlyExtraProps } from '@myntra/uikit-utils'

/**

 @since 0.3.0
 @status EXPERIMENTAL
 @example
 <Accordion>
  <Accordion.Item title={<div>One</div>}>
    <div style={{ margin: '1rem', padding: '3rem 1rem', background: '#cecece' }}>First component</div>
  </Accordion.Item>
  <Accordion.Item title={<div>Two</div>}>
    <div style={{ margin: '1rem', padding: '3rem 1rem', background: '#cecece' }}>Second component</div>
  </Accordion.Item>
  <Accordion.Item title={<span>Three</span>}>
    <div style={{ margin: '1rem', padding: '3rem 1rem', background: '#cecece' }}>Third component</div>
  </Accordion.Item>
 </Accordion>
 */
class Accordion extends PureComponent {
  static propTypes = {
    /** Active child index */
    active: PropTypes.number,
    /** Event fired when active child changes */
    onChange: PropTypes.func,
    children: PropTypes.arrayOf(PropTypes.node),
    /** @private  */
    _validate(props) {
      if ('active' in props && !('onChange' in props)) {
        throw new Error('`onChange` prop is required when using `active` props')
      }
      props.children.forEach(child => {
        if (child.type !== AccordionItem) throw new Error('Only `Accordion.Item` is allowed in `Accordion` component')
      })
    }
  }

  state = {
    active: 0
  }

  static filterAttrs = onlyExtraProps(Accordion.propTypes)

  get attrs() {
    return Accordion.filterAttrs(this.props)
  }

  handleClick = (active, event) => {
    if (this.props.onChange) this.props.onChange(active)
    else this.setState({ active })
  }

  render() {
    const active = typeof this.props.active === 'number' ? this.props.active : this.state.active

    return (
      <div {...this.attrs}>
        {this.props.children.map((child, index) =>
          React.cloneElement(child, {
            key: index,
            show: active === index,
            onClick: event => this.handleClick(index, event)
          })
        )}
      </div>
    )
  }
}

Accordion.Item = AccordionItem

export default Accordion
