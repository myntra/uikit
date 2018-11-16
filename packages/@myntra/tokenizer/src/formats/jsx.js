module.exports = (content, write) =>
  write(
    `import React from 'react'
import styles from './tokens.module.css'

// eslint-disable-next-line react/prop-types
/**
 * @since 0.3.0
 * @status READY
 */
export default class ThemeProvider extends React.PureComponent {
  static childContextTypes = {
    theme () {
      return null
    }
  }

  getChildContext() {
    return { theme: styles.theme }
  }

  render() {
    return <div className={styles.theme}>{this.props.children}</div>
  }
}
`
  )
