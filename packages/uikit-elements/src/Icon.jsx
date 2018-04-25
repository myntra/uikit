import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { classnames } from '@myntra/uikit-utils'

// import Promised from './Promised'

/**
 {describe component}

 @since 0.0.0
 @status EXPERIMENTAL
 @example
 <Icon />
 */
export default class Icon extends PureComponent {
  static propTypes = {
    /** {describe prop} */
    name: PropTypes.string
  }

  render() {
    return <span className={classnames('icon')} alt={this.props.name} />
    // <Promised
    //   fn={() => import(`./icons/${this.props.name}.svg`)}
    //   renderLoading={() => <span className={classnames('icon')} />}
    //   renderError={() => <span className={classnames('icon', 'unknown')} />}
    //   render={({ default: SVG }) => (
    //     <span className={classnames('icon')} alt={this.props.name}>
    //       <SVG />
    //     </span>
    //   )}
    // />
  }
}
