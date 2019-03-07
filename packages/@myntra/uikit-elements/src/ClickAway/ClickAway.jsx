import { PureComponent } from 'react'
import PropTypes from 'prop-types'

/**
 Watch for clicks outside the target element.

 @since 0.0.0
 @status REVIEWING
 @example
 if (!this.ref) {
  this.ref = React.createRef()
}

 <div>
 <div ref={this.ref}
 style={{ padding: '20px', background: '#eee' }}
 onClick={() => this.setState({ message: 'Clicked Inside.' })}
 > Target: {this.state.message} </div>
 <ClickAway onClickAway={() => this.setState({ message: 'Clicked Outside.' })} target={this.ref} />
 </div>
 */
export default class ClickAway extends PureComponent {
  static propTypes = {
    /** Target element to watch ClickAway events. */
    target: PropTypes.oneOfType([
      PropTypes.shape({
        current: PropTypes.instanceOf(HTMLElement) // eslint-disable-line no-undef
      }),
      PropTypes.func
    ]),
    /**
     * ClickAway event handler function.
     *
     * @type {function(): void}
     */
    onClickAway: PropTypes.func.isRequired,
    domEventName: PropTypes.string
  }

  static defaultProps = {
    domEventName: 'click'
  }

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

  unregister(eventName) {
    document.removeEventListener(eventName || this.props.domEventName, this.handleClickAway)
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
    return null
  }
}
