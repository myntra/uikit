import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { classnames } from '@myntra/uikit-utils'

import styles from './Icon.css'

import Promised from './Promised'

/**
 General purpose SVG icon.

 @since 0.0.0
 @status EXPERIMENTAL
 @example <Icon name="alert" />
 */
export default class Icon extends PureComponent {
  static propTypes = {
    /** Icon name. */
    name: PropTypes.string
  }

  render() {
    const { name } = this.props

    return (
      <Promised
        fn={() => import(`./icons/${name}.svg`).then(m => m.default)}
        renderLoading={() => <span className={classnames('icon', 'loading').use(styles)} />}
        renderError={() => <span className={classnames('icon', 'unknown').use(styles)} />}
        render={SvgIcon => (
          <span className={classnames('icon').use(styles)} alt={name}>
            <SvgIcon className={classnames('svg').use(styles)} />
          </span>
        )}
      />
    )
  }
}
