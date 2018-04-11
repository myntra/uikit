import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import MDXC from 'mdxc'
import { transform } from 'babel-standalone'

const markdown = new MDXC({
  linkify: true,
  typographer: true,
  highlight: false,
  pragma: 'createElement'
})

const DEFAULT_CONTEXT = {
  React: React,
  createElement: React.createElement,
  createFactory: React.createFactory
}

/**
The `<Markdown>` component renders markdown to JSx safely.

__NOTE__: Markdown content should be a string.

@since 0.0.0
@status EXPERIMENTAL
@example
<Markdown>
  {`
  # A heading

  A markdown _paragraph_ written in **JSx**.
  `}
</Markdown>
 */
export default class Markdown extends PureComponent {
  static propTypes = {
    /** Extra globals. */
    context: PropTypes.object,
    /** Markdown string. */
    children: PropTypes.string
  }

  static defaultProps = {
    context: {},
    children: ''
  }

  state = {
    renderer: null
  }

  componentWillMount() {
    this.prepare()
  }

  componentDidCatch(error) {
    this.setState({ error: error.message })

    return false
  }

  componentWillReceiveProps(props) {
    this.prepare()
  }

  /**
   * Create a renderer from markdown.
   * @private
   * @returns {void}
   */
  prepare() {
    const props = this.props
    const exported = {}
    const context = { ...props.context, ...DEFAULT_CONTEXT, exports: exported }
    const source = markdown.render(typeof props.children === 'string' ? props.children : '', context)
    const { code } = transform(source, { presets: ['latest'] })
    const renderer = new Function(...Object.keys(context), code) // eslint-disable-line no-new-func
    try {
      renderer(...Object.values(context))
      this.setState({ renderer: exported.default, error: null })
    } catch (e) {
      this.setState({ renderer: () => null, error: null })
    }
  }

  render() {
    const Renderer = this.state.renderer

    if (this.state.error) {
      return <span>{this.state.error}</span>
    }

    return Renderer ? <Renderer {...this.props.context} /> : null
  }
}
