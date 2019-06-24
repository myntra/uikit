import React, { PureComponent } from 'react'

export interface Props extends BaseProps {
  onScroll(event: UIEvent): void
}

export default class ScrollObserver extends PureComponent<Props> {
  targetRef: { current: HTMLElement | null } = { current: null }

  componentWillUnmount() {
    this.unregister()
  }

  register() {
    if (this.targetRef.current)
      this.targetRef.current.addEventListener('scroll', this.handleScroll, {
        passive: true,
      })
  }

  unregister() {
    if (this.targetRef.current)
      this.targetRef.current.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = (event) => {
    this.props.onScroll(event)
  }

  handleRef = (target: HTMLElement | null) => {
    if (this.targetRef.current !== target) {
      this.unregister()
      this.targetRef.current = target
      this.register()
    }

    const node = React.Children.only(this.props.children)
    if (typeof node.ref === 'function') {
      node.ref(target)
    }
  }

  render() {
    return React.cloneElement(React.Children.only(this.props.children), {
      ref: this.handleRef,
    })
  }
}
