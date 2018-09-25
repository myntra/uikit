/* eslint react/no-find-dom-node: 0 */
import { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

let counter = 0

/**
 @since 0.0.0
 @status REVIEWING
 @example
 if (!this.container) {
    this.container = document.createElement('div')
    this.container.style.position = 'absolute'
    this.container.style.top = '40px'
    this.container.style.left = '50%'
    document.body.appendChild(this.container)
 }

 <div onClick={() => this.setState({ value: (this.state.value || 0) + 1 })}>
    <span>This is react controlled root.</span>
    <Portal container={this.container}>
      <span>This is in document body. ({this.state.value || 0} clicks)</span>
    </Portal>
 </div>
 */
class Portal extends PureComponent {
  static isReact15 =
    typeof ReactDOM.createPortal !== 'function' &&
    /* istanbul ignore next: Tests are running with React 16 */
    typeof ReactDOM.unstable_renderSubtreeIntoContainer === 'function'
  static isReact16 = typeof ReactDOM.createPortal === 'function'
  static propTypes = {
    /** Attach child to specific component/element */
    container: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(HTMLElement)]).isRequired, // eslint-disable-line no-undef
    /** React child component */
    children: PropTypes.element.isRequired,
    /** Wrapper <div> */
    wrapper: PropTypes.instanceOf(HTMLElement) // eslint-disable-line no-undef
  }

  constructor(props) {
    super(props)
    this.fallback = document.createElement('div')
    this.fallback.id = `--portal-wrapper-${counter++}--`
  }

  get el() {
    return this.props.wrapper || this.fallback
  }

  get container() {
    return typeof this.props.container === 'string'
      ? document.querySelector(this.props.container)
      : this.props.container
  }

  componentDidMount() {
    this.container.appendChild(this.el)
    if (Portal.isReact15) {
      this.fallbackRenderInPortal()
    }
  }

  componentWillUnmount() {
    const container = this.container
    const el = this.el

    setTimeout(() => container.removeChild(el), 1)
  }

  componentDidUpdate() {
    if (Portal.isReact15) {
      this.fallbackRenderInPortal()
    }
  }

  fallbackRenderInPortal() {
    ReactDOM.unstable_renderSubtreeIntoContainer(this, this.props.children, this.el)
  }

  render() {
    if (Portal.isReact16) {
      return ReactDOM.createPortal(this.props.children, this.el)
    } else if (Portal.isReact15) {
      return null // rendered in componentDidUpdate & componentDidMount
    } else throw new Error('Portal not supported.')
  }
}

export default Portal
