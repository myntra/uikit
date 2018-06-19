import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { LiveProvider, LiveEditor, LivePreview, LiveError } from 'react-live'
import tokens from '@myntra/tokens'
import * as prettier from 'prettier/standalone'
import Card from './Card'

const plugins = [require('prettier/parser-babylon')]

const { Provider: PlaygroundProvider, Consumer: PlaygroundConsumer } = React.createContext({})

export { PlaygroundProvider }

/**
The `<Playground>` component renders live editable component.

__NOTE__: The generated JSx is executed in an empty context where only React is accessible. However,
you may use `context` prop, then the JSx would be rendered in context scope.

@since 0.0.0
@status EXPERIMENTAL
@example
<Playground>
  {`<div>Hello World!</div>`}
</Playground>
 */
export default class Playground extends PureComponent {
  static propTypes = {
    /** Extra globals. */
    context: PropTypes.object,
    /** Code string. */
    children: PropTypes.string,
    /** Hide editor */
    hideEditor: PropTypes.bool
  }

  static defaultProps = {
    context: {}
  }

  render() {
    return (
      <PlaygroundConsumer>
        {extra => (
          <LiveProvider
            code={prettier
              .format(this.props.children, { semi: false, singleQuote: true, jsxBracketSameLine: true, plugins })
              .trim()
              .replace(/^;/, '')}
            scope={{ ...this.props.context, ...extra }}
            noInline
            transformCode={code => `class LiveWrapper extends React.Component {
              constructor(props) {
                super(props)
                this.state = {}
              }
              render() {
                ${code.replace(/</i, ';return <')}
              }
            }
            render(<LiveWrapper />)`}
          >
            <Card>
              <LiveError />
              <LivePreview />
            </Card>
            {this.props.hideEditor ? null : (
              <Card padding="none">
                <LiveEditor style={{ padding: tokens.size.medium }} />
              </Card>
            )}
          </LiveProvider>
        )}
      </PlaygroundConsumer>
    )
  }
}
