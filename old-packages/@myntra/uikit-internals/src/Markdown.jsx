import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import MDXC from 'mdxc'
import { transform } from 'babel-standalone'
import { highlight as prism, languages } from 'prismjs/components/prism-core'

import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-markup'
// -- ^ load clike and markup first. Order is important here.
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-css-extras'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-yaml'
import 'prismjs/themes/prism-tomorrow.css'

import Playground from './Playground'

import classnames from './Markdown.module.css'

const { Provider: MarkdownProvider, Consumer: MarkdownConsumer } = React.createContext({})

export { MarkdownProvider }

const aliases = {
  js: 'javascript',
  html: 'markup'
}
function highlight(str, lang) {
  if (!lang || lang.includes('render')) {
    return str
  } else {
    lang = lang.trim()
    lang = aliases[lang] || lang

    if (languages[lang]) {
      return prism(str, languages[lang])
    } else {
      return str
    }
  }
}

const markdown = new MDXC({
  linkify: true,
  typographer: true,
  highlight,
  pragma: 'createElement'
})

const fence = markdown.renderer.rules.fence
markdown.renderer.rules.fence = (tokens, idx, options, env, slf) => {
  if (tokens[idx].info && tokens[idx].info.trim().startsWith('jsx render')) {
    let content = tokens[idx].content.trim()

    if (tokens[idx].info.includes('editor')) {
      content = `<Playground>{${JSON.stringify(content)}}</Playground>`
    } else if (tokens[idx].info.includes('preview')) {
      content = `<Playground hideEditor>{${JSON.stringify(content)}}</Playground>`
    } else {
      content = `<div>${content}</div>`
    }

    const parsed = transform(content, {
      plugins: [['transform-react-jsx', { pragma: 'createElement', useBuiltIns: true }]]
    }).code.replace(/;$/, '')

    return slf.indent(parsed)
  }

  return fence(tokens, idx, options, env, slf)
}

/**
 * @function parseStyles
 * Parses a string of inline styles into a javascript object with casing for react
 *
 * @param {string} styles
 * @returns {Object}
 */
const parseStyles = styles =>
  styles
    .split(';')
    .filter(style => style.split(':')[0] && style.split(':')[1])
    .map(style => [
      style
        .split(':')[0]
        .trim()
        .replace(/-./g, c => c.substr(1).toUpperCase()),
      style.split(':')[1].trim()
    ])
    .reduce(
      (styleObj, style) => ({
        ...styleObj,
        [style[0]]: style[1]
      }),
      {}
    )

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
@status REVIEWING
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
    code: null
  }

  componentDidCatch(error) {
    this.setState({ error: error.message })

    return false
  }

  render() {
    const wrapper = React.createFactory('div')
    const { children } = this.props

    const Renderer = props => {
      const context = {
        ...props,
        ...DEFAULT_CONTEXT,
        exports: {}
      }

      const source = markdown
        .render(typeof children === 'string' ? children : '', context)
        .replace(/"style": "((?:[^"\\]|\\.)*)"/gi, (_, css) => '"style": ' + JSON.stringify(parseStyles(css)))
      const { code } = transform(source, { presets: ['latest'] })

      const renderer = new Function(...Object.keys(context), 'context', code.replace('exports.default =', 'return')) // eslint-disable-line no-new-func

      const render = renderer(...Object.values(context), context)

      return render({
        factories: {
          wrapper: (_, ...args) => wrapper({ className: classnames('markdown') }, ...args)
        }
      })
    }

    if (this.state.error) {
      return <span>{this.state.error}</span>
    }

    return Renderer ? (
      <MarkdownConsumer>{context => <Renderer {...this.props.context} {...context} />}</MarkdownConsumer>
    ) : null
  }
}
