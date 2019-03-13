import React, { PureComponent, RefObject } from 'react'

export interface ClickAwayProps {
  target?: RefObject<HTMLElement>
  children?: JSX.Element
  onClickAway: () => void
  domEventName?: 'click' | 'mousedown' | 'mouseup'
}

export default class ClickAway extends PureComponent<ClickAwayProps> {
  componentDidUpdate(oldProps) {
    if (oldProps.domEventName !== this.props.domEventName) {
      this.unregister(oldProps.domEventName)
      this.register()
    }
  }

  componentDidMount() {
    this.register()
  }

  componentWillUnmount() {
    this.unregister()
  }

  register() {
    document.addEventListener(this.props.domEventName, this.handleClickAway, { passive: true })
  }

  unregister(eventName: string = this.props.domEventName) {
    document.removeEventListener(eventName, this.handleClickAway)
  }

  handleClickAway = event => {
    if (!this.props.target) return

    const path = event.path || (event.composedPath ? event.composedPath() : undefined)

    if (
      path
        ? path.indexOf(this.props.target.current) < 0
        : event.target !== this.props.target.current && !this.props.target.current.contains(event.target)
    ) {
      this.props.onClickAway()
    }
  }

  render() {
    if (this.props.children) {
      const node = React.Children.only(this.props.children)


    }

    return null
  }
}
