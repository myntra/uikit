import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { LiveProvider, LiveEditor, LivePreview, LiveError } from 'react-live'
import tokens from '@myntra/tokens'

import Card from './Card'

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
    children: PropTypes.string
  }

  static defaultProps = {
    context: {}
  }

  render() {
    return (
      <PlaygroundConsumer>
        {extra => (
          <LiveProvider code={this.props.children} scope={{ ...this.props.context, ...extra }}>
            <Card>
              <LiveError />
              <LivePreview />
            </Card>
            <Card padding="none">
              <LiveEditor style={{ padding: tokens.size.medium }} />
            </Card>
          </LiveProvider>
        )}
      </PlaygroundConsumer>
    )
  }
}
