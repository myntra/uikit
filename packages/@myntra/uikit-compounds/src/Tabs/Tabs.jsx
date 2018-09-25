import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Tab from './Tab'
import { classnames } from '@myntra/uikit-utils'
import styles from './Tabs.module.css'

/**

 @since 0.3.0
 @status EXPERIMENTAL
 @example
 <Tabs>
  <Tab title="Tab 1">
    Anything here
  </Tab>

  <Tab title={<span><Icon name="alert" /> Tab 2</span>}>
    An image.

    <Image src="//picsum.photos/300" width={300} height={300} />
  </Tab>

  <Tab title="Tab 3">
    Content
  </Tab>
 </Tabs>
 */
class Tabs extends PureComponent {
  static propTypes = {
    /** Active child index */
    activeIndex: PropTypes.number,
    /** Event fired when active child changes */
    onChange: PropTypes.func,
    children: PropTypes.arrayOf(PropTypes.node),
    /** @private  */
    _validate(props) {
      if ('active' in props && !('onChange' in props)) {
        throw new Error('`onChange` prop is required when using `active` props')
      }
      props.children.forEach(child => {
        if (child.type !== Tab) throw new Error('Only `Tab` is allowed in `Tabs` component')
      })
    }
  }

  state = {
    activeIndex: 0
  }

  handleClick = activeIndex => {
    if (this.props.onChange) this.props.onChange(activeIndex)
    else this.setState({ activeIndex })
  }

  render() {
    const activeIndex = typeof this.props.activeIndex === 'number' ? this.props.activeIndex : this.state.activeIndex
    const children = React.Children.toArray(this.props.children)
    const content = (children[activeIndex] || children[0]).props.children

    return (
      <div className={classnames('tabs').use(styles)}>
        <div className={classnames('pane').use(styles)}>
          {React.Children.map(this.props.children, (child, index) =>
            React.cloneElement(child, {
              isActive: index === activeIndex,
              onClick: () => this.handleClick(index)
            })
          )}
        </div>
        <div className={classnames('content').use(styles)}>{content}</div>
      </div>
    )
  }
}

export default Tabs
