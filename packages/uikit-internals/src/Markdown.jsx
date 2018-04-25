import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import MDXC from 'mdxc'
import { transform } from 'babel-standalone'
import Playground from './Playground'

const { Provider: MarkdownProvider, Consumer: MarkdownConsumer } = React.createContext({})

export { MarkdownProvider }

const markdown = new MDXC({
  linkify: true,
  typographer: true,
  highlight: false,
  pragma: 'createElement'
})

const fence = markdown.renderer.rules.fence
const HTML_ESCAPES = { '<': '&lt;', '>': '&gt;', '"': '&quot;' }
markdown.renderer.rules.fence = (tokens, idx, options, env, slf) => {
  if (tokens[idx].info && tokens[idx].info.trim().startsWith('jsx render')) {
    let content = tokens[idx].content.trim()

    if (tokens[idx].info.includes('preview')) {
      content = `<Playground>{${JSON.stringify(content)}}</Playground>`
    } else {
      content = `<div>${content}</div>`
    }

    const parsed = transform(content, {
      plugins: [['transform-react-jsx', { pragma: 'createElement', useBuiltIns: true }]]
    }).code.replace(/;$/, '')

    return slf.indent(parsed)
  }
  tokens[idx].content = tokens[idx].content.replace(/[<>"]/g, m => HTML_ESCAPES[m])
  return fence(tokens, idx, options, env, slf)
}

const DEFAULT_CONTEXT = {
  Playground,
  React: React,
  createElement: React.createElement,
  createFactory: React.createFactory
}

/**
The `<Markdown>` component renders markdown to JSx safely.

__NOTE__: The markdown content should be a string.

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
    const context = {
      ...props.context,
      ...DEFAULT_CONTEXT,
      exports: exported
    }
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

    return Renderer ? (
      <MarkdownConsumer>{context => <Renderer {...this.props.context} {...context} />}</MarkdownConsumer>
    ) : null
  }
}
