import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { LiveProvider, LiveEditor, LivePreview, LiveError } from 'react-live'

/**
The `<Playground>` component renders live editable component.

*NOTE*: The generated JSx is executed in an empty context where only React is accessible. However,
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
      <LiveProvider code={this.props.children} scope={this.props.context}>
        <div style={{ margin: '16px 0', boxShadow: '0 0 5px 0 rgba(0, 0, 0, .5)', padding: '16px' }}>
          <LiveError />
          <LivePreview />
        </div>
        <LiveEditor />
      </LiveProvider>
    )
  }
}
