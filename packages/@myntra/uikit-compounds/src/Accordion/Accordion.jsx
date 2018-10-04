import React, { PureComponent, createContext } from 'react'
import PropTypes from 'prop-types'
import AccordionItem from './AccordionItem'

const { Provider, Consumer } = createContext({
  active: 0,
  onChange: () => {},
  register: () => {}
})

export { Consumer, Provider }

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
    children: PropTypes.arrayOf(PropTypes.node)
  }

  static defaultProps = {
    active: 0
  }

  constructor(props) {
    super(props)

    this.state = {
      active: props.active
    }

    this.itemsCount = 0
    this.itemsToIndex = new WeakMap()
  }

  register = item => {
    if (this.itemsToIndex.has(item)) {
      return this.itemsToIndex.get(item)
    }

    const index = this.itemsCount++

    this.itemsToIndex.set(item, index)

    return index
  }

  handleClick = active => {
    if (this.props.onChange) this.props.onChange(active)
    else this.setState({ active })
  }

  render() {
    const active = typeof this.props.onChange === 'function' ? this.props.active : this.state.active

    return (
      <Provider value={{ active, onChange: this.handleClick, register: this.register }}>{this.props.children}</Provider>
    )
  }
}

Accordion.Item = AccordionItem

export default Accordion
